import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Phone, Mic, MicOff, Video, VideoOff, ScreenShare, ScreenShareOff, PhoneOff } from "lucide-react";
import "./VideoCall.css";

// Connect to the single backend server on port 8000
const socket = io("http://localhost:8000");

export default function VideoCall({ sessionId, collaboratorName }) {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnection = useRef(null);
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);

  const [joined, setJoined] = useState(false);
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [remoteOffline, setRemoteOffline] = useState(true);
  const [emojis, setEmojis] = useState([]);

  const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
  const roomId = sessionId;

  const joinMeeting = async () => {
    try {
      peerConnection.current = new RTCPeerConnection(servers);

      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = localStream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
      localStream.getTracks().forEach((t) =>
        peerConnection.current.addTrack(t, localStream)
      );

      peerConnection.current.ontrack = (e) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = e.streams[0];
          setRemoteOffline(false);
        }
      };

      peerConnection.current.onicecandidate = (e) => {
        if (e.candidate)
          socket.emit("ice-candidate", { roomId, candidate: e.candidate });
      };

      socket.emit("join-room", roomId);
      setJoined(true);
    } catch (error) {
      console.error("Error joining meeting:", error);
      alert("Could not start video call. Please check camera/microphone permissions.");
    }
  };

  useEffect(() => {
    socket.on("user-joined", async () => {
      if (peerConnection.current) {
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.emit("offer", { roomId, offer });
      }
    });

    socket.on("offer", async ({ offer }) => {
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.emit("answer", { roomId, answer });
      }
    });

    socket.on("answer", async ({ answer }) => {
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      }
    });

    socket.on("ice-candidate", async (candidate) => {
      if (peerConnection.current) {
        try {
          await peerConnection.current.addIceCandidate(
            new RTCIceCandidate(candidate)
          );
        } catch (e) {
          console.error("Error adding received ice candidate", e);
        }
      }
    });

    socket.on("user-left", () => {
      if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
        remoteVideoRef.current.srcObject.getTracks().forEach((t) => t.stop());
        remoteVideoRef.current.srcObject = null;
      }
      setRemoteOffline(true);
    });

    socket.on("emoji-reaction", ({ icon }) => {
      showEmoji(icon);
    });

    // Clean up on component unmount
    return () => {
      endCall(false); // Don't emit leave-room on unmount, only on explicit end call
      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("user-left");
      socket.off("emoji-reaction");
    };
  }, [roomId]);

  const toggleShare = async () => {
    if (!peerConnection.current) return;
    if (!sharing) {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];
      const sender = peerConnection.current.getSenders().find((s) => s.track.kind === "video");
      sender.replaceTrack(screenTrack);
      screenStreamRef.current = screenStream;
      localVideoRef.current.srcObject = screenStream;
      setSharing(true);
      screenTrack.onended = () => stopShare();
    } else {
      stopShare();
    }
  };

  const stopShare = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    }
    if (localStreamRef.current) {
      const camTrack = localStreamRef.current.getVideoTracks()[0];
      const sender = peerConnection.current.getSenders().find((s) => s.track.kind === "video");
      sender.replaceTrack(camTrack);
      localVideoRef.current.srcObject = localStreamRef.current;
    }
    setSharing(false);
  };

  const toggleMute = () => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
    setMuted((m) => !m);
  };

  const toggleCamera = () => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getVideoTracks().forEach((t) => (t.enabled = !t.enabled));
    setCameraOn((c) => !c);
  };

  const endCall = (emitLeave = true) => {
    if (emitLeave) {
      socket.emit("leave-room", roomId);
    }
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    }

    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    
    setJoined(false);
    setMuted(false);
    setCameraOn(true);
    setSharing(false);
    setRemoteOffline(true);
  };

  const showEmoji = (icon, send = false) => {
    const id = Date.now();
    setEmojis((prev) => [...prev, { id, icon }]);
    setTimeout(() => {
      setEmojis((prev) => prev.filter((e) => e.id !== id));
    }, 2000);
    if (send) socket.emit("emoji-reaction", { roomId, icon });
  };

  if (!joined) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <Phone className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
        <div>
          <p className="font-semibold mb-2">Ready to start?</p>
          <p className="text-sm text-muted-foreground mb-4">Click the button below to join the video call</p>
          <Button onClick={joinMeeting} size="lg" className="gap-2">
            <Video className="h-4 w-4" />
            Join Video Call
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="meeting-container">
      <div className="video-grid">
        <div className="video-wrapper">
          <video ref={localVideoRef} autoPlay playsInline muted></video>
          <div className="name-tag">
            You {sharing ? "(Sharing)" : ""}
          </div>
          {emojis.map((e) => (
            <div key={e.id} className="emoji-float">
              {e.icon}
            </div>
          ))}
        </div>

        <div className="video-wrapper">
          {remoteOffline ? (
            <div className="offline-placeholder">Waiting for peer...</div>
          ) : (
            <video ref={remoteVideoRef} autoPlay playsInline></video>
          )}
          <div className="name-tag">{collaboratorName || "Peer"}</div>
        </div>
      </div>

      <div className="control-bar">
        <Button onClick={toggleMute} title="Mute / Unmute" variant="outline" size="icon" className="control-btn">
          {muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        <Button onClick={toggleCamera} title="Toggle Camera" variant="outline" size="icon" className="control-btn">
          {cameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        <Button onClick={toggleShare} title="Share Screen" variant={sharing ? "secondary" : "outline"} size="icon" className="control-btn">
          {sharing ? <ScreenShareOff className="h-5 w-5" /> : <ScreenShare className="h-5 w-5" />}
        </Button>
        <Button onClick={() => showEmoji("👍", true)} title="Thumbs Up" variant="outline" size="icon" className="control-btn">
          👍
        </Button>
        <Button onClick={() => showEmoji("👏", true)} title="Clap" variant="outline" size="icon" className="control-btn">
          👏
        </Button>
        <Button onClick={() => showEmoji("😂", true)} title="Laugh" variant="outline" size="icon" className="control-btn">
          😂
        </Button>
        <Button onClick={() => endCall(true)} title="End Call" variant="destructive" size="icon" className="control-btn end">
          <PhoneOff className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}