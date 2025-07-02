"use client"

import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Rocket, Zap } from "lucide-react"

export function AboutSection() {
  const sectionRef = useRef()
  const [hoveredCard, setHoveredCard] = useState(null)
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
      .about-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        cursor: pointer;
      }
      .about-card:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 25px 50px rgba(255, 107, 53, 0.3);
      }
      .about-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 107, 53, 0.15) 0%, transparent 50%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      .about-card:hover::before {
        opacity: 1;
      }
      .about-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 30%, rgba(255, 107, 53, 0.1) 50%, transparent 70%);
        transform: translateX(-100%);
        transition: transform 0.6s ease;
      }
      .about-card:hover::after {
        transform: translateX(100%);
      }
      .floating-particles {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
      }
      .particle {
        position: absolute;
        width: 3px;
        height: 3px;
        background: #ff6b35;
        border-radius: 50%;
        opacity: 0;
        animation: float-particle 4s infinite ease-in-out;
      }
      @keyframes float-particle {
        0% { 
          opacity: 0; 
          transform: translateY(100px) scale(0); 
        }
        50% { 
          opacity: 1; 
          transform: translateY(-50px) scale(1); 
        }
        100% { 
          opacity: 0; 
          transform: translateY(-200px) scale(0); 
        }
      }
      .icon-orbit {
        animation: icon-orbit 3s ease-in-out infinite;
      }
      @keyframes icon-orbit {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-5px) rotate(5deg); }
      }
      .text-glow {
        text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
      }
      .interactive-bg {
        background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 107, 53, 0.05) 0%, transparent 50%);
        transition: background 0.3s ease;
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

  const cards = [
    {
      id: 1,
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable code that stands the test of time and cosmic radiation.",
      color: "#ff6b35",
    },
    {
      id: 2,
      icon: Rocket,
      title: "Innovation",
      description: "Constantly exploring new technologies and pushing the envelope of what's achievable.",
      color: "#ff8c42",
    },
    {
      id: 3,
      icon: Zap,
      title: "Performance",
      description: "Optimizing applications to run at light speed with efficiency that defies physics.",
      color: "#ffab52",
    },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden interactive-bg"
      style={{
        "--mouse-x": `${(mousePosition.x / (sectionRef.current?.offsetWidth || 1)) * 100}%`,
        "--mouse-y": `${(mousePosition.y / (sectionRef.current?.offsetHeight || 1)) * 100}%`,
      }}
    >
      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-6 text-glow">About the Developer</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer with 5+ years of experience creating digital experiences that push the
            boundaries of what's possible. Like matter spiraling into a black hole, I'm drawn to complex challenges that
            require innovative solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <Card
                key={card.id}
                className="about-card bg-gray-800/50 border-orange-500/30 backdrop-blur-sm"
                style={{
                  "--mouse-x": hoveredCard === card.id ? `${mousePosition.x}px` : "50%",
                  "--mouse-y": hoveredCard === card.id ? `${mousePosition.y}px` : "50%",
                }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-6 text-center relative z-10">
                  <div className="icon-orbit mb-4">
                    <Icon
                      className="h-12 w-12 mx-auto"
                      style={{
                        color: card.color,
                        filter: hoveredCard === card.id ? "drop-shadow(0 0 10px currentColor)" : "none",
                        transform: hoveredCard === card.id ? "scale(1.1)" : "scale(1)",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </div>
                  <h3
                    className="text-xl font-semibold mb-3 transition-all duration-300"
                    style={{
                      color: hoveredCard === card.id ? card.color : "#ffab52",
                      textShadow: hoveredCard === card.id ? `0 0 15px ${card.color}` : "none",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-gray-400 transition-colors duration-300">{card.description}</p>

                  {/* Interactive particles on hover */}
                  {hoveredCard === card.id && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 rounded-full animate-ping"
                          style={{
                            backgroundColor: card.color,
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random()}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
