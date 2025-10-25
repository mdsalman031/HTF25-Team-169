import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, LogOut, User, MessageSquare } from "lucide-react"

// Mock data for collaborators
const mockCollaborators = [
  {
    id: 1,
    name: "Sarah Chen",
    profileId: "PL-SARAH123",
    skills: ["React", "TypeScript", "UI Design"],
    wantsToLearn: ["Python", "Machine Learning"],
    rating: 4.8,
    bio: "Full-stack developer passionate about creating beautiful interfaces",
    avatar: "SC",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    profileId: "PL-MARCUS456",
    skills: ["Python", "Data Science", "Machine Learning"],
    wantsToLearn: ["Web Development", "React"],
    rating: 4.9,
    bio: "Data scientist with 5+ years of experience",
    avatar: "MJ",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    profileId: "PL-EMMA789",
    skills: ["UI/UX Design", "Figma", "Product Strategy"],
    wantsToLearn: ["Frontend Development", "JavaScript"],
    rating: 4.7,
    bio: "Product designer focused on user-centered design",
    avatar: "ER",
  },
  {
    id: 4,
    name: "Alex Kim",
    profileId: "PL-ALEX012",
    skills: ["DevOps", "Docker", "Kubernetes"],
    wantsToLearn: ["System Design", "Cloud Architecture"],
    rating: 4.6,
    bio: "DevOps engineer with cloud infrastructure expertise",
    avatar: "AK",
  },
]

// Mock skills suggestions
const skillSuggestions = [
  "Python",
  "Machine Learning",
  "Web Design",
  "Data Analysis",
  "Cloud Computing",
  "Mobile Development",
  "Project Management",
  "Digital Marketing",
]

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkills, setSelectedSkills] = useState({})
  const [filteredCollaborators, setFilteredCollaborators] = useState(mockCollaborators)

  const handleSkillSelect = (skill, type) => {
    setSelectedSkills((prev) => ({
      ...prev,
      [skill]: prev[skill] === type ? null : type,
    }))
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim()) {
      const filtered = mockCollaborators.filter(
        (collab) =>
          collab.name.toLowerCase().includes(query.toLowerCase()) ||
          collab.skills.some((s) => s.toLowerCase().includes(query.toLowerCase())) ||
          collab.wantsToLearn.some((s) => s.toLowerCase().includes(query.toLowerCase())),
      )
      setFilteredCollaborators(filtered)
    } else {
      setFilteredCollaborators(mockCollaborators)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                PL
              </div>
              <span className="text-xl font-bold">PeerLearn</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Welcome Back, John!</h1>
          <p className="text-muted-foreground">Find peers to learn from and share your expertise</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for skills, people, or topics..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Sidebar - Skills & Filters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Suggested Skills</CardTitle>
                <CardDescription>Select skills to learn or teach</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {skillSuggestions.map((skill) => (
                  <div key={skill} className="space-y-2">
                    <div className="text-sm font-medium">{skill}</div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={selectedSkills[skill] === "learn" ? "default" : "outline"}
                        onClick={() => handleSkillSelect(skill, "learn")}
                        className="flex-1 text-xs"
                      >
                        Learn
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedSkills[skill] === "teach" ? "default" : "outline"}
                        onClick={() => handleSkillSelect(skill, "teach")}
                        className="flex-1 text-xs"
                      >
                        Teach
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Collaborators */}
          <div className="lg:col-span-2 space-y-6">
            {/* Matching Collaborators */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Matching Collaborators</h2>
              <div className="grid gap-4">
                {filteredCollaborators.map((collaborator) => (
                  <Card key={collaborator.id} className="hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        {/* Avatar */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">
                          {collaborator.avatar}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{collaborator.name}</h3>
                              <p className="text-sm text-muted-foreground">{collaborator.profileId}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-lg font-bold text-primary">{collaborator.rating}</div>
                              <p className="text-xs text-muted-foreground">Rating</p>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">{collaborator.bio}</p>

                          {/* Skills */}
                          <div className="mb-3">
                            <p className="text-xs font-medium text-muted-foreground mb-2">Skills Known:</p>
                            <div className="flex flex-wrap gap-2">
                              {collaborator.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="inline-block rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Wants to Learn */}
                          <div className="mb-4">
                            <p className="text-xs font-medium text-muted-foreground mb-2">Wants to Learn:</p>
                            <div className="flex flex-wrap gap-2">
                              {collaborator.wantsToLearn.map((skill) => (
                                <span
                                  key={skill}
                                  className="inline-block rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Link to={`/collaborator/${collaborator.id}`}>
                              <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                                <User className="h-4 w-4" />
                                View Profile
                              </Button>
                            </Link>
                            <Button size="sm" className="gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Request Session
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Previous Sessions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Recent Session Requests</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {[
                      {
                        name: "Sarah Chen",
                        skill: "React Advanced Patterns",
                        status: "pending",
                        date: "Oct 28, 2025",
                      },
                      {
                        name: "Marcus Johnson",
                        skill: "Python Basics",
                        status: "accepted",
                        date: "Oct 25, 2025",
                      },
                    ].map((request, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div>
                          <p className="font-medium">{request.name}</p>
                          <p className="text-sm text-muted-foreground">{request.skill}</p>
                          <p className="text-xs text-muted-foreground mt-1">{request.date}</p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              request.status === "accepted"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                            }`}
                          >
                            {request.status === "accepted" ? "Accepted" : "Pending"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
