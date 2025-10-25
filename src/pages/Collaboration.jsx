import { useState, useRef, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Send, Phone, PhoneOff, Maximize2, Settings } from "lucide-react"

export default function CollaborationPage() {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "collaborator",
      senderName: "Sarah Chen",
      text: "Hi! Ready to start learning React patterns?",
      timestamp: "2:30 PM",
    },
    {
      id: 2,
      sender: "user",
      senderName: "You",
      text: "Yes! I'm excited to learn from you.",
      timestamp: "2:31 PM",
    },
    {
      id: 3,
      sender: "collaborator",
      senderName: "Sarah Chen",
      text: "Great! Let's start with the basics. First, let me share my screen.",
      timestamp: "2:32 PM",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isCallActive, setIsCallActive] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 0)
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim().length === 0) {
      return
    }

    const message = {
      id: messages.length + 1,
      sender: "user",
      senderName: "You",
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prevMessages) => [...prevMessages, message])
    setNewMessage("")
  }

  const handleStartCall = () => {
    setIsCallActive(true)
  }

  const handleEndCall = () => {
    setIsCallActive(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="text-center">
            <h1 className="font-semibold">Learning Session with Sarah Chen</h1>
            <p className="text-sm text-muted-foreground">React Advanced Patterns</p>
          </div>
          <div className="w-20" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
        {/* Video/Call Section */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Video Container */}
          <Card className="flex-1 bg-black/5 border-2 border-border overflow-hidden flex flex-col min-h-0">
            <CardContent className="flex-1 p-0 flex items-center justify-center relative">
              {isCallActive ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl font-bold text-primary">SC</span>
                    </div>
                    <p className="font-semibold mb-2">Sarah Chen</p>
                    <p className="text-sm text-muted-foreground">Video call in progress...</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <Phone className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
                  <div>
                    <p className="font-semibold mb-2">Ready to start?</p>
                    <p className="text-sm text-muted-foreground mb-4">Click the button below to start a video call</p>
                    <Button onClick={handleStartCall} size="lg" className="gap-2">
                      <Phone className="h-4 w-4" />
                      Start Video Call
                    </Button>
                  </div>
                </div>
              )}

              {/* Call Controls */}
              {isCallActive && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full h-12 w-12 bg-background/80 backdrop-blur"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full h-12 w-12 bg-background/80 backdrop-blur"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                  >
                    {isVideoOn ? "📹" : "📹‍"}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full h-12 w-12 bg-background/80 backdrop-blur"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive" className="rounded-full h-12 w-12" onClick={handleEndCall}>
                    <PhoneOff className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Call Info */}
          {isCallActive && (
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Tip:</strong> Use the chat below to share links, code snippets, or resources during your
                session.
              </p>
            </div>
          )}
        </div>

        {/* Chat Section */}
        <div className="w-full lg:w-80 flex flex-col border border-border rounded-lg bg-card overflow-hidden min-h-0 lg:min-h-96">
          {/* Chat Header */}
          <div className="border-b border-border p-4 flex-shrink-0">
            <h2 className="font-semibold">Session Chat</h2>
            <p className="text-xs text-muted-foreground">with Sarah Chen</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-muted-foreground rounded-bl-none"
                  }`}
                >
                  {message.sender === "collaborator" && (
                    <p className="text-xs font-semibold mb-1 opacity-75">{message.senderName}</p>
                  )}
                  <p className="text-sm break-words">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-border p-4 space-y-2 flex-shrink-0">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={newMessage.trim().length === 0}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Press Enter to send</p>
          </div>
        </div>
      </div>
    </div>
  )
}
