"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

export function HeroSection() {
  const orbitRef = useRef<HTMLDivElement | null>(null)
  const particlesRef = useRef<HTMLDivElement | null>(null)
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [isAnimationPaused, setIsAnimationPaused] = useState(false)

  // Project data for orbital display
  const projects = [
    { id: 1, title: "AI Task Manager", color: "#ff6b35", angle: 0 },
    { id: 2, title: "Blockchain Wallet", color: "#ff8c42", angle: 72 },
    { id: 3, title: "DevOps Dashboard", color: "#ffab52", angle: 144 },
    { id: 4, title: "E-Learning Platform", color: "#ffc962", angle: 216 },
    { id: 5, title: "IoT Home System", color: "#ffe772", angle: 288 },
  ]

  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      if (particlesRef.current) {
        for (let i = 0; i < 15; i++) {
          const particle = document.createElement("div")
          particle.className = "particle"
          particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #ff6b35;
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${0.3 + Math.random() * 0.7};
            box-shadow: 0 0 6px #ff6b35;
          `
          particlesRef.current.appendChild(particle)
        }
      }
    }

    createParticles()

    // Add CSS animations
    const style = document.createElement("style")
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      @keyframes orbit {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 53, 0.5); }
        50% { box-shadow: 0 0 40px rgba(255, 107, 53, 0.8), 0 0 60px rgba(255, 107, 53, 0.3); }
      }
      .hero-content {
        position: relative;
        z-index: 10;
      }
      .rotating-orbit {
        animation: orbit 20s linear infinite;
        animation-play-state: ${isAnimationPaused ? "paused" : "running"};
      }
      .interactive-button {
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      .interactive-button:hover {
        transform: translateY(-2px);
        animation: pulse-glow 2s infinite;
      }
      .interactive-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
      }
      .interactive-button:hover::before {
        left: 100%;
      }
      .project-orb {
        transition: all 0.3s ease;
        cursor: pointer;
      }
      .project-orb:hover {
        transform: scale(1.3);
        filter: brightness(1.2);
      }
      .project-tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        border: 1px solid rgba(255, 107, 53, 0.3);
        backdrop-filter: blur(10px);
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .project-tooltip.visible {
        opacity: 1;
      }
      
      /* Responsive adjustments */
      @media (max-width: 768px) {
        .rotating-orbit {
          transform: scale(0.7);
        }
        .hero-content h1 {
          font-size: 3rem !important;
        }
        .hero-content p {
          font-size: 1.1rem !important;
        }
      }
      
      @media (max-width: 480px) {
        .rotating-orbit {
          transform: scale(0.5);
        }
        .hero-content h1 {
          font-size: 2.5rem !important;
        }
        .hero-content p {
          font-size: 1rem !important;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [isAnimationPaused])

  interface Project {
    id: number
    title: string
    color: string
    angle: number
  }

  interface ProjectHoverEvent extends React.MouseEvent<HTMLDivElement, MouseEvent> {}

  const handleProjectHover = (project: Project, event: ProjectHoverEvent) => {
    setHoveredProject(project)
    setIsAnimationPaused(true)

    // Show tooltip
    const tooltip = document.getElementById("project-tooltip")
    if (tooltip) {
      tooltip.textContent = project.title
      tooltip.style.left = event.clientX + 10 + "px"
      tooltip.style.top = event.clientY - 30 + "px"
      tooltip.classList.add("visible")
    }
  }

  const handleProjectLeave = () => {
    setHoveredProject(null)
    setIsAnimationPaused(false)

    // Hide tooltip
    const tooltip = document.getElementById("project-tooltip")
    if (tooltip) {
      tooltip.classList.remove("visible")
    }
  }

  interface HandleProjectClick {
    (project: Project): void
  }

  const handleProjectClick: HandleProjectClick = (project) => {
    // Scroll to projects section and highlight the specific project
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
      // You can add logic here to highlight the specific project
      console.log("Navigate to project:", project.title)
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      {/* Floating Particles Background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Project Tooltip */}
      <div id="project-tooltip" className="project-tooltip fixed"></div>

      <div className="text-center hero-content relative w-full max-w-7xl mx-auto mt-10 px-4">
        {/* Main Heading with Interactive Orbital Elements */}
        <div className="relative mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 relative z-10">
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-2xl">
              Event Horizon
            </span>
          </h1>

          {/* Interactive Rotating Orbital Elements */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div ref={orbitRef} className="rotating-orbit">
              {/* Outer Ring with Projects */}
              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] border border-orange-500/20 rounded-full flex items-center justify-center">
                {projects.map((project, index) => {
                  let radius = 256;
                  if (typeof window !== "undefined") {
                    radius =
                      window.innerWidth < 640 ? 144 : window.innerWidth < 768 ? 192 : window.innerWidth < 1024 ? 224 : 256
                  }
                  const angleRad = (project.angle * Math.PI) / 180
                  const x = Math.cos(angleRad) * radius
                  const y = Math.sin(angleRad) * radius

                  return (
                    <div
                      key={project.id}
                      className="project-orb absolute w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full shadow-lg pointer-events-auto"
                      style={{
                        backgroundColor: project.color,
                        boxShadow: `0 0 15px ${project.color}`,
                        transform: `translate(${x}px, ${y}px) ${hoveredProject?.id === project.id ? "scale(1.3)" : "scale(1)"}`,
                        filter: hoveredProject?.id === project.id ? "brightness(1.2)" : "brightness(1)",
                      }}
                      onMouseEnter={(e) => handleProjectHover(project, e)}
                      onMouseLeave={handleProjectLeave}
                      onMouseMove={(e) => {
                        const tooltip = document.getElementById("project-tooltip")
                        if (tooltip && hoveredProject?.id === project.id) {
                          tooltip.style.left = e.clientX + 10 + "px"
                          tooltip.style.top = e.clientY - 30 + "px"
                        }
                      }}
                      onClick={() => handleProjectClick(project)}
                    />
                  )
                })}
              </div>

              {/* Middle Ring */}
              <div className="absolute w-56 h-56 sm:w-80 sm:h-80 md:w-96 md:h-96 border border-orange-400/15 rounded-full flex items-center justify-center">
                <div
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50"
                  style={{ transform: "translateX(-112px) sm:translateX(-160px) md:translateX(-192px)" }}
                />
              </div>

              {/* Inner Ring */}
              <div className="absolute w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 border border-orange-300/10 rounded-full flex items-center justify-center">
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-300 rounded-full shadow-lg shadow-orange-300/50"
                  style={{ transform: "translateY(80px) sm:translateY(128px) md:translateY(160px)" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description with Better Spacing */}
        <div className="relative mb-8 sm:mb-12 md:mb-16">
          <p className="text-lg sm:text-xl md:text-2xl text-orange-300 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed relative z-10 px-4">
            Where code meets the cosmos. I'm a full-stack developer crafting digital realities that bend the laws of
            possibility.
          </p>
        </div>

        {/* CTA Section with Better Responsive Design */}
        <div className="relative mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center relative z-10">
            <Button className="interactive-button bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-lg shadow-orange-500/30 w-full sm:w-auto">
              Explore Projects
            </Button>

            <div className="flex gap-3 sm:gap-4">
              <Button
                variant="outline"
                size="icon"
                className="interactive-button border-orange-500/50 text-orange-400 hover:bg-orange-500/20 hover:border-orange-400 w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              >
                <Github className="h-4 w-4 sm:h-6 sm:w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="interactive-button border-orange-500/50 text-orange-400 hover:bg-orange-500/20 hover:border-orange-400 w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              >
                <Linkedin className="h-4 w-4 sm:h-6 sm:w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="interactive-button border-orange-500/50 text-orange-400 hover:bg-orange-500/20 hover:border-orange-400 w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              >
                <Mail className="h-4 w-4 sm:h-6 sm:w-6" />
              </Button>
            </div>
          </div>

          {/* Pulsing Energy Rings around CTA */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-72 h-72 sm:w-96 sm:h-96 border border-orange-500/5 rounded-full animate-ping"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="absolute w-56 h-56 sm:w-80 sm:h-80 border border-orange-400/5 rounded-full animate-ping"
              style={{ animationDuration: "4s", animationDelay: "1s" }}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative">
          <div className="animate-bounce relative z-10">
            <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 mx-auto drop-shadow-lg" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-500/20 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
