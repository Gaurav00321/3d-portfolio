"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Download, Send } from "lucide-react"

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add interactive styles
    const style = document.createElement("style")
    style.textContent = `
      .contact-card {
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      .contact-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(255, 107, 53, 0.3);
      }
      .contact-card::before {
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
      .contact-card:hover::before {
        opacity: 1;
      }
      .interactive-input {
        transition: all 0.3s ease;
        position: relative;
      }
      .interactive-input:focus {
        box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
        border-color: #ff6b35;
      }
      .status-indicator {
        animation: pulse-status 2s infinite;
      }
      @keyframes pulse-status {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
      .floating-icon {
        animation: float-icon 3s ease-in-out infinite;
      }
      @keyframes float-icon {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <section id="contact" className="py-20 px-4 bg-black relative overflow-hidden" ref={sectionRef}>
      {/* Background Aura Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/5 via-transparent to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-8 relative">
            Event Horizon
            {/* Floating particles around heading */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-4 -left-4 w-2 h-2 bg-orange-500 rounded-full animate-ping" />
              <div
                className="absolute -top-2 -right-6 w-1 h-1 bg-orange-400 rounded-full animate-ping"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute -bottom-4 left-8 w-1.5 h-1.5 bg-orange-300 rounded-full animate-ping"
                style={{ animationDelay: "2s" }}
              />
            </div>
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto relative">
            Where code meets the cosmos. I'm a full-stack developer crafting digital realities that bend the laws of
            possibility.
            {/* Orbiting elements around description */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="floating-icon absolute -top-8 left-1/4 text-orange-500/40">⚡</div>
                <div
                  className="floating-icon absolute -bottom-8 right-1/4 text-orange-400/40"
                  style={{ animationDelay: "1s" }}
                >
                  🚀
                </div>
                <div
                  className="floating-icon absolute top-1/2 -left-8 text-orange-300/40"
                  style={{ animationDelay: "2s" }}
                >
                  💫
                </div>
                <div
                  className="floating-icon absolute top-1/2 -right-8 text-orange-600/40"
                  style={{ animationDelay: "0.5s" }}
                >
                  🌟
                </div>
              </div>
            </div>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info with Enhanced Interactivity */}
          <div className="space-y-6">
            <Card className="contact-card bg-orange-500/10 border-orange-500/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2">
                  <span className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                  Get In Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-semibold interactive-button relative overflow-hidden group">
                    <Mail className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                    Email Me
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-semibold interactive-button relative overflow-hidden group">
                    <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                    Resume
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </div>
                <div className="flex gap-4">
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-semibold interactive-button relative overflow-hidden group">
                    <Github className="h-4 w-4 mr-2 group-hover:animate-spin" />
                    GitHub
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-semibold interactive-button relative overflow-hidden group">
                    <Linkedin className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                    LinkedIn
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="contact-card bg-gray-900/50 border-orange-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-orange-300 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                  Current Status
                </h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2 group hover:text-green-300 transition-colors">
                    <div className="w-2 h-2 bg-green-400 rounded-full status-indicator" />
                    <span>Available for new projects</span>
                  </div>
                  <div className="flex items-center gap-2 group hover:text-orange-300 transition-colors">
                    <div
                      className="w-2 h-2 bg-orange-400 rounded-full status-indicator"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <span>Based in Vadodara, Gujarat, India</span>
                  </div>
                  <div className="flex items-center gap-2 group hover:text-blue-300 transition-colors">
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full status-indicator"
                      style={{ animationDelay: "1s" }}
                    />
                    <span>Open to remote opportunities</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form with Enhanced Interactivity */}
          <Card className="contact-card bg-gray-900/50 border-orange-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-orange-300 flex items-center gap-2">
                <Send className="h-5 w-5 animate-pulse" />
                Send Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    className="interactive-input bg-gray-800/50 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="interactive-input bg-gray-800/50 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400"
                  />
                </div>
                <Input
                  placeholder="Subject"
                  className="interactive-input bg-gray-800/50 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400"
                />
                <Textarea
                  placeholder="Your message..."
                  rows={4}
                  className="interactive-input bg-gray-800/50 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400"
                />
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-black interactive-button relative overflow-hidden group">
                  <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
