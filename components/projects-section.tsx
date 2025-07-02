"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Orbit } from "lucide-react"

interface Project {
  id: string | number
  title: string
  description: string
  technologies: string[]
  color: string
  liveUrl: string
  githubUrl: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [hoveredProject, setHoveredProject] = useState<string | number | null>(null)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const sectionRef = useRef<HTMLElement | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Extract unique technologies for filtering
  const allTechnologies = [...new Set(projects.flatMap((project) => project.technologies))]
  const filters = ["all", ...allTechnologies]

  const filteredProjects =
    selectedFilter === "all" ? projects : projects.filter((project) => project.technologies.includes(selectedFilter))

  useEffect(() => {
    interface MouseMoveEvent extends React.MouseEvent<HTMLElement> {
      clientX: number
      clientY: number
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener("mousemove", handleMouseMove)
    }

    // Add interactive styles
    const style = document.createElement("style")
    style.textContent = `
      .project-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        cursor: pointer;
      }
      .project-card:hover {
        transform: translateY(-15px) rotateX(5deg);
        box-shadow: 0 30px 60px rgba(255, 107, 53, 0.4);
      }
      .project-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at center, rgba(255, 107, 53, 0.1) 0%, transparent 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      .project-card:hover::before {
        opacity: 1;
      }
      .orbital-indicator {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        border: 2px solid;
        border-radius: 50%;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
      }
      .project-card:hover .orbital-indicator {
        opacity: 1;
        transform: scale(1);
        animation: orbit-pulse 2s infinite;
      }
      @keyframes orbit-pulse {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(180deg); }
      }
      .filter-button {
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      .filter-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3);
      }
      .filter-button.active {
        background: linear-gradient(45deg, #ff6b35, #ff8c42);
        color: black;
        font-weight: bold;
      }
      .filter-button::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
      }
      .filter-button:hover::after {
        left: 100%;
      }
      .tech-badge {
        transition: all 0.3s ease;
        cursor: pointer;
      }
      .tech-badge:hover {
        transform: scale(1.1);
        box-shadow: 0 0 15px currentColor;
      }
      .project-glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 107, 53, 0.1) 0%, transparent 50%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      .project-card:hover .project-glow {
        opacity: 1;
      }
    `
    document.head.appendChild(style)

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove)
      }
      document.head.removeChild(style)
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-6 flex items-center justify-center gap-3">
            <Orbit className="h-12 w-12 animate-spin" style={{ animationDuration: "8s" }} />
            Orbital Projects
            <Orbit
              className="h-12 w-12 animate-spin"
              style={{ animationDuration: "8s", animationDirection: "reverse" }}
            />
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Each project represents a world of possibilities, orbiting around the gravitational pull of innovation and
            creativity.
          </p>

          {/* Interactive Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`filter-button px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                  selectedFilter === filter
                    ? "active border-orange-500"
                    : "border-orange-500/30 text-orange-300 hover:border-orange-500/50 hover:text-orange-400"
                }`}
              >
                {filter === "all" ? "All Projects" : filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="project-card bg-gray-900/50 border-orange-500/30 backdrop-blur-sm hover:border-orange-500/50 transition-colors"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className="project-glow"
                style={
                  {
                    "--mouse-x": `${mousePosition.x}px`,
                    "--mouse-y": `${mousePosition.y}px`,
                  } as React.CSSProperties & Record<string, any>
                }
              />

              {/* Orbital Indicator */}
              <div className="orbital-indicator" style={{ borderColor: project.color }} />

              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-4 h-4 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: project.color,
                      boxShadow: hoveredProject === project.id ? `0 0 15px ${project.color}` : "none",
                      transform: hoveredProject === project.id ? "scale(1.2)" : "scale(1)",
                    }}
                  />
                  <CardTitle className="text-orange-300 transition-colors duration-300">{project.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-400 transition-colors duration-300">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      className="tech-badge bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/30"
                      onClick={() => setSelectedFilter(tech)}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-black relative overflow-hidden group"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.open(project.liveUrl, "_blank")
                      }
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                    Live
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-orange-500/50 text-orange-300 hover:bg-orange-500/10 relative overflow-hidden group"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.open(project.githubUrl, "_blank")
                      }
                    }}
                  >
                    <Github className="h-4 w-4 mr-2 group-hover:animate-spin" />
                    Code
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </div>

                {/* Floating particles on hover */}
                {hoveredProject === project.id && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-ping"
                        style={{
                          backgroundColor: project.color,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${1 + Math.random()}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
