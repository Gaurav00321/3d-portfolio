"use client"

import { useEffect, useState } from "react"
import { Code2, Zap, Cpu } from "lucide-react"

export function LandingSequence({ onComplete }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const phases = [
      { duration: 1000, phase: 1 },
      { duration: 1500, phase: 2 },
      { duration: 1000, phase: 3 },
      { duration: 500, phase: 4 },
    ]

    const currentPhase = 0
    const timers = []

    phases.forEach((phaseConfig, index) => {
      const timer = setTimeout(
        () => {
          setPhase(index + 1)
          if (index === phases.length - 1) {
            setTimeout(onComplete, 500)
          }
        },
        phases.slice(0, index + 1).reduce((acc, p) => acc + p.duration, 0),
      )

      timers.push(timer)
    })

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Phase 1: Initial Load */}
        {phase >= 1 && (
          <div className="animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
              <Code2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              DevVerse Singularity
            </h1>
          </div>
        )}

        {/* Phase 2: Tagline */}
        {phase >= 2 && (
          <div className="animate-fade-in-up">
            <p className="text-xl text-cyan-300 mb-6">Where Code and Cosmos Collide</p>
            <div className="flex items-center justify-center gap-4 text-purple-300">
              <Zap className="h-5 w-5 animate-pulse" />
              <span className="font-mono text-sm">Initializing reality.exe...</span>
              <Cpu className="h-5 w-5 animate-spin" />
            </div>
          </div>
        )}

        {/* Phase 3: Loading Bar */}
        {phase >= 3 && (
          <div className="animate-fade-in-up mt-8">
            <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full animate-loading-bar" />
            </div>
            <p className="text-sm text-gray-400 mt-2">Loading cosmic consciousness...</p>
          </div>
        )}

        {/* Phase 4: Enter */}
        {phase >= 4 && (
          <div className="animate-fade-in-up mt-6">
            <p className="text-lg text-green-400 font-mono">System online. Welcome to the DevVerse.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes loading-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-loading-bar {
          animation: loading-bar 2s ease-out;
        }
      `}</style>
    </div>
  )
}
