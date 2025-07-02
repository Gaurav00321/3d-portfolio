"use client"

import { Suspense, useState, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github, Menu, X } from "lucide-react"
import { BlackHoleCore } from "@/components/black-hole-core"
import { ProjectPlanet } from "@/components/project-planet"
import { CodeSnippet } from "@/components/code-snippet"
import { SkillIcon } from "@/components/skill-icon"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"

// Project data - 5 smaller planets
const projects = [
  {
    id: 1,
    title: "AI Task Manager",
    description: "Intelligent project management with ML-powered task prioritization and team collaboration",
    color: "#ff6b35",
    orbitRadius: 8,
    orbitSpeed: 0.4,
    size: 0.8,
    technologies: ["React", "Node.js", "TensorFlow", "MongoDB"],
    githubUrl: "https://github.com/dev/ai-task-manager",
    liveUrl: "https://ai-tasks.dev",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    title: "Blockchain Wallet",
    description: "Secure multi-currency wallet with DeFi integration and advanced security features",
    color: "#ff8c42",
    orbitRadius: 12,
    orbitSpeed: 0.3,
    size: 0.9,
    technologies: ["React Native", "Solidity", "Web3.js", "Firebase"],
    githubUrl: "https://github.com/dev/blockchain-wallet",
    liveUrl: "https://cryptowallet.app",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    title: "DevOps Dashboard",
    description: "Real-time infrastructure monitoring with automated deployment pipelines and alerts",
    color: "#ffab52",
    orbitRadius: 6,
    orbitSpeed: 0.5,
    size: 0.7,
    technologies: ["Vue.js", "Docker", "Kubernetes", "Prometheus"],
    githubUrl: "https://github.com/dev/devops-dashboard",
    liveUrl: "https://devops-monitor.io",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 4,
    title: "E-Learning Platform",
    description: "Interactive online learning platform with video streaming and progress tracking",
    color: "#ffc962",
    orbitRadius: 15,
    orbitSpeed: 0.2,
    size: 1.0,
    technologies: ["Next.js", "PostgreSQL", "Redis", "AWS"],
    githubUrl: "https://github.com/dev/elearning-platform",
    liveUrl: "https://learnhub.edu",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 5,
    title: "IoT Home System",
    description: "Smart home automation system with voice control and energy optimization",
    color: "#ffe772",
    orbitRadius: 10,
    orbitSpeed: 0.35,
    size: 0.85,
    technologies: ["Python", "Raspberry Pi", "MQTT", "React"],
    githubUrl: "https://github.com/dev/iot-home-system",
    liveUrl: "https://smarthome.tech",
    image: "/placeholder.svg?height=300&width=500",
  },
]

// Code snippets floating around
const codeSnippets = [
  {
    id: 1,
    code: "const blackHole = new Singularity();",
    language: "JavaScript",
    position: [6, 4, -3],
    color: "#ff6b35",
  },
  {
    id: 2,
    code: "def warp_spacetime():\n    return reality.bend()",
    language: "Python",
    position: [-5, 3, 4],
    color: "#ff8c42",
  },
  {
    id: 3,
    code: "interface Universe {\n  dimensions: number;\n  energy: Infinity;\n}",
    language: "TypeScript",
    position: [4, -3, 5],
    color: "#ffab52",
  },
  {
    id: 4,
    code: "SELECT * FROM cosmos\nWHERE time > NOW();",
    language: "SQL",
    position: [-6, -2, -2],
    color: "#ffc962",
  },
]

// Skill icons orbiting closer to black hole
const skills = [
  { name: "React", icon: "⚛️", position: [3, 1, 0], color: "#ff6b35" },
  { name: "Node.js", icon: "🟢", position: [-2, 2, 1], color: "#ff8c42" },
  { name: "Python", icon: "🐍", position: [1, -2, 2], color: "#ffab52" },
  { name: "Docker", icon: "🐳", position: [-3, -1, -1], color: "#ffc962" },
  { name: "AWS", icon: "☁️", position: [2, 3, -2], color: "#ffe772" },
  { name: "MongoDB", icon: "🍃", position: [-1, -3, 3], color: "#ff6b35" },
]

export default function BlackHolePortfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentSection, setCurrentSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    // Enhanced entrance animation with aura effects
    const heroContent = document.querySelector(".hero-content") as HTMLElement | null
    if (heroContent) {
      heroContent.style.opacity = "0"
      heroContent.style.transform = "translateY(50px)"

      setTimeout(() => {
        heroContent.style.transition = "opacity 2s ease-out, transform 2s ease-out"
        heroContent.style.opacity = "1"
        heroContent.style.transform = "translateY(0)"
      }, 100)
    }

    // Add global interactive styles
    const style = document.createElement("style")
    style.textContent = `
      .bg-gradient-radial {
        background: radial-gradient(var(--tw-gradient-stops));
      }
      * {
        cursor: none;
      }
      button, a, input, textarea, .project-orb {
        cursor: pointer;
      }
    `
    document.head.appendChild(style)

    // Custom cursor
    const cursor = document.createElement("div")
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, #ff6b35 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: screen;
      transition: transform 0.1s ease;
    `
    document.body.appendChild(cursor)

    interface MoveCursorEvent extends MouseEvent {}

    const moveCursor = (e: MoveCursorEvent): void => {
      cursor.style.left = e.clientX - 10 + "px"
      cursor.style.top = e.clientY - 10 + "px"
    }

    document.addEventListener("mousemove", moveCursor)

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.body.removeChild(cursor)
      document.head.removeChild(style)
    }
  }, [])

  interface ScrollToSectionFn {
    (section: string): void
  }

  const scrollToSection: ScrollToSectionFn = (section) => {
    setCurrentSection(section)
    const element: HTMLElement | null = document.getElementById(section)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Global Aura Background */}
      <div className="fixed inset-0 bg-gradient-radial from-orange-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Navigation with Enhanced Interactivity - Added top margin */}
      <nav className="fixed top-4 left-4 right-4 z-50 bg-black/80 backdrop-blur-sm border border-orange-500/20 rounded-2xl shadow-2xl shadow-orange-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center group">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center group-hover:animate-spin transition-all duration-300">
                <span className="text-black font-bold text-xs sm:text-sm">⚫</span>
              </div>
              <span className="ml-2 text-lg sm:text-xl font-bold text-orange-400 group-hover:text-orange-300 transition-colors">
                DevSingularity
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {["hero", "about", "projects", "skills", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                      currentSection === section
                        ? "bg-orange-500 text-black shadow-lg shadow-orange-500/30"
                        : "text-orange-300 hover:bg-orange-500/10 hover:text-orange-400"
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-orange-400 hover:bg-orange-500/10 hover:animate-pulse w-8 h-8 sm:w-10 sm:h-10"
              >
                {mobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm rounded-b-2xl border-t border-orange-500/20">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {["hero", "about", "projects", "skills", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    scrollToSection(section)
                    setMobileMenuOpen(false)
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-orange-300 hover:bg-orange-500/10 hover:text-orange-400 w-full text-left transition-all duration-300"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with 3D Scene - Added top padding to account for navbar spacing */}
      <section id="hero" className="relative h-screen overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Canvas ref={canvasRef} camera={{ position: [0, 5, 25], fov: 75 }}>
            <Suspense fallback={null}>
              <BlackHoleScene
                projects={projects}
                codeSnippets={codeSnippets}
                skills={skills}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
              />
            </Suspense>
          </Canvas>
        </div>

        <HeroSection />
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Projects Section */}
      <ProjectsSection projects={projects} />

      {/* Skills Section */}
      <SkillsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Project Detail Modal */}
      {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  )
}

type Project = typeof projects[number];
type CodeSnippetType = typeof codeSnippets[number];
type SkillType = typeof skills[number];

interface BlackHoleSceneProps {
  projects: Project[];
  codeSnippets: CodeSnippetType[];
  skills: SkillType[];
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

function BlackHoleScene({ projects, codeSnippets, skills, selectedProject, setSelectedProject }: BlackHoleSceneProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ff6b35" />
      <pointLight position={[20, 20, 20]} intensity={0.3} color="#ff8c42" />

      {/* Deep Space */}
      <Stars radius={500} depth={100} count={20000} factor={8} saturation={0} fade />

      {/* Central Black Hole */}
      <BlackHoleCore />

      {/* Project Planets */}
      {projects.map((project) => (
        <ProjectPlanet
          key={project.id}
          project={project}
          onClick={() => setSelectedProject(project)}
          isSelected={selectedProject?.id === project.id}
        />
      ))}

      {/* Floating Code Snippets */}
      {codeSnippets.map((snippet) => (
        <CodeSnippet key={snippet.id} snippet={snippet} />
      ))}

      {/* Skill Icons */}
      {skills.map((skill, index) => (
        <SkillIcon key={index} skill={skill} />
      ))}

      {/* Camera Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={!selectedProject}
        autoRotateSpeed={0.3}
        maxDistance={40}
        minDistance={8}
        target={[0, 0, 0]}
      />
    </>
  )
}

function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-gray-900/95 border-orange-500/30 text-white shadow-2xl shadow-orange-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl sm:text-2xl text-orange-400">{project.title}</CardTitle>
              <CardDescription className="text-gray-300 mt-2 text-sm sm:text-base">
                {project.description}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-orange-400 hover:bg-orange-500/10 hover:animate-pulse w-8 h-8 sm:w-10 sm:h-10"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {/* Project Image */}
          <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden border border-orange-500/20 hover:border-orange-500/40 transition-colors">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-orange-300">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  className="bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/30 transition-colors text-xs sm:text-sm"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-semibold relative overflow-hidden group text-sm sm:text-base"
              onClick={() => window.open(project.liveUrl, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2 group-hover:animate-bounce" />
              Live Demo
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-orange-500/50 text-orange-300 hover:bg-orange-500/10 relative overflow-hidden group text-sm sm:text-base"
              onClick={() => window.open(project.githubUrl, "_blank")}
            >
              <Github className="h-4 w-4 mr-2 group-hover:animate-spin" />
              View Code
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
