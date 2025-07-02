"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Zap } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "GSAP"],
    color: "#ff6b35",
    icon: "⚛️",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
    color: "#ff8c42",
    icon: "🔧",
  },
  {
    title: "DevOps",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Monitoring"],
    color: "#ffab52",
    icon: "☁️",
  },
  {
    title: "Mobile",
    skills: ["React Native", "Flutter", "iOS", "Android", "Expo", "Firebase"],
    color: "#ffc962",
    icon: "📱",
  },
]

export function SkillsSection() {
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const sectionRef = useRef()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
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
      .cosmic-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        cursor: pointer;
        transform-style: preserve-3d;
      }
      .cosmic-card:hover {
        transform: translateY(-15px) rotateY(5deg) rotateX(5deg);
        box-shadow: 0 30px 60px rgba(255, 107, 53, 0.4);
      }
      .cosmic-card.selected {
        transform: translateY(-20px) scale(1.05);
        box-shadow: 0 40px 80px rgba(255, 107, 53, 0.6);
        border-color: currentColor;
      }
      .cosmic-arsenal {
        background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 107, 53, 0.05) 0%, transparent 50%);
        transition: background 0.3s ease;
      }
      .skill-item {
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
        padding: 8px 12px;
        border-radius: 6px;
        border: 1px solid transparent;
      }
      .skill-item:hover {
        transform: translateX(10px) scale(1.05);
        color: currentColor;
        border-color: currentColor;
        box-shadow: 0 0 20px currentColor;
        background: rgba(255, 107, 53, 0.1);
      }
      .skill-item::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0;
        height: 2px;
        background: currentColor;
        transition: width 0.3s ease;
        transform: translateY(-50%);
      }
      .skill-item:hover::before {
        width: 100%;
      }
      .category-icon {
        font-size: 2rem;
        transition: all 0.3s ease;
        display: inline-block;
      }
      .cosmic-card:hover .category-icon {
        transform: scale(1.2) rotate(10deg);
        filter: drop-shadow(0 0 15px currentColor);
      }
      .energy-field {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(255, 107, 53, 0.1) 0%, transparent 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      .cosmic-card:hover .energy-field {
        opacity: 1;
        animation: energy-pulse 2s infinite;
      }
      @keyframes energy-pulse {
        0%, 100% { transform: scale(1); opacity: 0.1; }
        50% { transform: scale(1.1); opacity: 0.2; }
      }
      .constellation-line {
        position: absolute;
        height: 1px;
        background: linear-gradient(90deg, transparent, currentColor, transparent);
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      .cosmic-card:hover .constellation-line {
        opacity: 0.5;
        animation: constellation-flow 2s infinite;
      }
      @keyframes constellation-flow {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
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
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden cosmic-arsenal"
      style={{
        "--mouse-x": `${(mousePosition.x / (sectionRef.current?.offsetWidth || 1)) * 100}%`,
        "--mouse-y": `${(mousePosition.y / (sectionRef.current?.offsetHeight || 1)) * 100}%`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-6 flex items-center justify-center gap-4">
            <Zap className="h-12 w-12 animate-pulse" />
            Cosmic Arsenal
            <Zap className="h-12 w-12 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Technologies and tools that power my journey through the digital universe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category) => (
            <Card
              key={category.title}
              className={`cosmic-card bg-gray-800/50 border-orange-500/30 backdrop-blur-sm ${
                selectedCategory === category.title ? "selected" : ""
              }`}
              style={{
                borderColor: hoveredCategory === category.title ? category.color : "",
                color: hoveredCategory === category.title ? category.color : "",
              }}
              onMouseEnter={() => setHoveredCategory(category.title)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => setSelectedCategory(selectedCategory === category.title ? null : category.title)}
            >
              <div
                className="energy-field"
                style={{ background: `radial-gradient(circle at center, ${category.color}20 0%, transparent 70%)` }}
              />

              {/* Constellation lines */}
              <div className="constellation-line top-4 left-0 right-0" style={{ color: category.color }} />
              <div
                className="constellation-line bottom-4 left-0 right-0"
                style={{ color: category.color, animationDelay: "1s" }}
              />

              <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-4 h-4 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: category.color,
                      boxShadow: hoveredCategory === category.title ? `0 0 15px ${category.color}` : "none",
                    }}
                  />
                  <span className="category-icon">{category.icon}</span>
                  <h3
                    className="text-xl font-semibold transition-all duration-300"
                    style={{
                      color: hoveredCategory === category.title ? category.color : "#ffab52",
                      textShadow: hoveredCategory === category.title ? `0 0 15px ${category.color}` : "none",
                    }}
                  >
                    {category.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="skill-item text-gray-300 hover:text-orange-300 transition-colors cursor-default"
                      style={{
                        color: hoveredSkill === skill ? category.color : "",
                        borderColor: hoveredSkill === skill ? category.color : "transparent",
                      }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {skill}
                    </div>
                  ))}
                </div>

                {/* Interactive particles on hover */}
                {hoveredCategory === category.title && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-ping"
                        style={{
                          backgroundColor: category.color,
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
