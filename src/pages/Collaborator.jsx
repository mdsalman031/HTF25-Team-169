import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Star, MessageSquare, Calendar, Award, ThumbsUp } from "lucide-react"

// Mock collaborator data
const mockCollaboratorData = {
  id: 1,
  name: "Sarah Chen",
  profileId: "PL-SARAH123",
  avatar: "SC",
  rating: 4.8,
  totalReviews: 24,
  bio: "Full-stack developer passionate about creating beautiful interfaces and mentoring junior developers. I love working on challenging projects and sharing knowledge with the community.",
  qualification: "Bachelor's in Computer Science",
  skills: ["React", "TypeScript", "UI Design", "Node.js", "MongoDB"],
  wantsToLearn: ["Python", "Machine Learning", "DevOps"],
  languages: ["English", "Mandarin", "Spanish"],
  gender: "Female",
  age: 28,
  email: "sarah@example.com",
  availabilityDate: "2025-10-28",
  availabilityTime: "14:00",
  sessionsCompleted: 12,
  sessionsTaught: 8,
  certifications: [
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      image: "/aws-certificate.jpg",
      date: "2024-05-10",
    },
    {
      id: 2,
      name: "React Advanced Patterns",
      issuer: "Udemy",
      image: "/react-certificate.jpg",
      date: "2024-02-15",
    },
  ],
  endorsements: [
    {
      id: 1,
      endorsedBy: "John Doe",
      skill: "React",
      avatar: "JD",
    },
    {
      id: 2,
      endorsedBy: "Michael Zhang",
      skill: "TypeScript",
      avatar: "MZ",
    },
    {
      id: 3,
      endorsedBy: "Lisa Anderson",
      skill: "UI Design",
      avatar: "LA",
    },
    {
      id: 4,
      endorsedBy: "James Wilson",
      skill: "Node.js",
      avatar: "JW",
    },
    {
      id: 5,
      endorsedBy: "Emma Davis",
      skill: "React",
      avatar: "ED",
    },
    {
      id: 6,
      endorsedBy: "Robert Brown",
      skill: "MongoDB",
      avatar: "RB",
    },
  ],
  feedbacks: [
    {
      author: "John Doe",
      rating: 5,
      text: "Sarah is an excellent mentor! Very patient and explains concepts clearly.",
      date: "Oct 20, 2025",
    },
    {
      author: "Alex Kim",
      rating: 4.5,
      text: "Great session on React patterns. Highly recommended!",
      date: "Oct 15, 2025",
    },
  ],
}

export default function CollaboratorProfilePage() {
  const { id } = useParams();
  const [isRequesting, setIsRequesting] = useState(false)
  const collaborator = mockCollaboratorData

  const handleRequestSession = () => {
    setIsRequesting(true)
    setTimeout(() => {
      setIsRequesting(false)
      alert("Session request sent!")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 text-primary text-4xl font-bold flex-shrink-0">
              {collaborator.avatar}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold">{collaborator.name}</h1>
                  <p className="text-muted-foreground">{collaborator.profileId}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="font-bold">{collaborator.rating}</span>
                    <span className="text-muted-foreground">({collaborator.totalReviews} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{collaborator.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-2xl font-bold text-primary">{collaborator.sessionsCompleted}</p>
                  <p className="text-xs text-muted-foreground">Sessions Completed</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-2xl font-bold text-primary">{collaborator.sessionsTaught}</p>
                  <p className="text-xs text-muted-foreground">Sessions Taught</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-2xl font-bold text-primary">{collaborator.totalReviews}</p>
                  <p className="text-xs text-muted-foreground">Total Reviews</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={handleRequestSession} disabled={isRequesting} className="gap-2">
                  <Calendar className="h-4 w-4" />
                  {isRequesting ? "Sending Request..." : "Request Session"}
                </Button>
                <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                  <MessageSquare className="h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Qualification</h4>
                  <p className="text-muted-foreground">{collaborator.qualification}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {collaborator.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="border border-border rounded-lg p-4 hover:bg-accent/5 transition-colors"
                    >
                      <img
                        src={cert.image || "/placeholder.svg"}
                        alt={cert.name}
                        className="w-full h-24 object-cover rounded mb-3"
                      />
                      <p className="font-semibold text-sm mb-1">{cert.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground">Issued: {cert.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Skills Known</h4>
                  <div className="flex flex-wrap gap-2">
                    {collaborator.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-block rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Wants to Learn</h4>
                  <div className="flex flex-wrap gap-2">
                    {collaborator.wantsToLearn.map((skill) => (
                      <span
                        key={skill}
                        className="inline-block rounded-full bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5" />
                  Endorsements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {collaborator.endorsements.map((endorsement) => (
                    <div
                      key={endorsement.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm flex-shrink-0">
                        {endorsement.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{endorsement.endorsedBy}</p>
                        <p className="text-xs text-muted-foreground">endorsed for</p>
                      </div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary flex-shrink-0">
                        {endorsement.skill}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feedbacks */}
            <Card>
              <CardHeader>
                <CardTitle>Feedbacks & Reviews</CardTitle>
                <CardDescription>{collaborator.feedbacks.length} reviews from collaborators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {collaborator.feedbacks.map((feedback, idx) => (
                  <div key={idx} className="border-b border-border pb-4 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{feedback.author}</p>
                        <p className="text-xs text-muted-foreground">{feedback.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(feedback.rating) ? "fill-primary text-primary" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">{feedback.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Personal Info */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Personal Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Gender</p>
                  <p className="font-medium">{collaborator.gender}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Age</p>
                  <p className="font-medium">{collaborator.age}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Email</p>
                  <p className="font-medium text-sm break-all">{collaborator.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {collaborator.languages.map((lang) => (
                      <span key={lang} className="inline-block rounded-full bg-secondary/10 px-2 py-1 text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Available From</p>
                  <p className="font-medium text-sm">{collaborator.availabilityDate}</p>
                  <p className="font-medium text-sm">{collaborator.availabilityTime}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
