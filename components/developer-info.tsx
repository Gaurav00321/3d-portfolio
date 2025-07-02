"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download, Code, Database, Cloud, Smartphone } from "lucide-react"

const skills = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Angular"],
  Backend: ["Node.js", "Python", "Java", "Express.js", "FastAPI", "Spring Boot"],
  Database: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma", "Supabase"],
  "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions"],
  Mobile: ["React Native", "Flutter", "Expo", "iOS", "Android"],
  Tools: ["Git", "VS Code", "Figma", "Postman", "Jira", "Slack"],
}

const experience = [
  {
    title: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    period: "2022 - Present",
    description: "Led development of microservices architecture serving 1M+ users",
  },
  {
    title: "Frontend Developer",
    company: "StartupXYZ",
    period: "2020 - 2022",
    description: "Built responsive web applications using React and TypeScript",
  },
  {
    title: "Junior Developer",
    company: "WebSolutions",
    period: "2019 - 2020",
    description: "Developed and maintained client websites and web applications",
  },
]

export function DeveloperInfo({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-gray-900 border-gray-700 text-white max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 rounded-full flex items-center justify-center">
                <Code className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">John Doe</CardTitle>
                <p className="text-gray-300">Full-Stack Software Developer</p>
                <p className="text-sm text-gray-400">5+ years experience • Orbiting the coding universe</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-gray-800">
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Contact Links */}
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="bg-transparent border-gray-600 text-white hover:bg-gray-800">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" className="bg-transparent border-gray-600 text-white hover:bg-gray-800">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
            <Button variant="outline" className="bg-transparent border-gray-600 text-white hover:bg-gray-800">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-3">About Me</h3>
            <p className="text-gray-300 leading-relaxed">
              Passionate full-stack developer with 5+ years of experience building scalable web applications and mobile
              solutions. Like projects orbiting a black hole, I'm drawn to complex challenges that bend the rules of
              conventional development. I specialize in modern JavaScript frameworks, cloud architecture, and creating
              exceptional user experiences that defy gravity.
            </p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category}>
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    {category === "Frontend" && <Code className="h-4 w-4 mr-2" />}
                    {category === "Backend" && <Database className="h-4 w-4 mr-2" />}
                    {category === "Database" && <Database className="h-4 w-4 mr-2" />}
                    {category === "Cloud & DevOps" && <Cloud className="h-4 w-4 mr-2" />}
                    {category === "Mobile" && <Smartphone className="h-4 w-4 mr-2" />}
                    {category === "Tools" && <Code className="h-4 w-4 mr-2" />}
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-gray-700 text-white">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Experience</h3>
            <div className="space-y-4">
              {experience.map((job, index) => (
                <div key={index} className="border-l-2 border-orange-500 pl-4">
                  <h4 className="text-lg font-medium">{job.title}</h4>
                  <p className="text-orange-400">{job.company}</p>
                  <p className="text-sm text-gray-400 mb-2">{job.period}</p>
                  <p className="text-gray-300">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
