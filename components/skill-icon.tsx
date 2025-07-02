"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Html, Sphere } from "@react-three/drei"
import * as THREE from "three"

export function SkillIcon({ skill }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      const angle = time * 0.5 + skill.position[0]

      meshRef.current.position.x = Math.cos(angle) * 4 + skill.position[0] * 0.3
      meshRef.current.position.z = Math.sin(angle) * 4 + skill.position[2] * 0.3
      meshRef.current.position.y = skill.position[1] + Math.sin(time + skill.position[0]) * 0.2

      meshRef.current.rotation.y += 0.02

      const targetScale = hovered ? 1.2 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <Float floatIntensity={0.3} speed={0.6}>
      <group ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        {/* Skill Orb */}
        <Sphere args={[0.3, 16, 16]}>
          <meshBasicMaterial color={skill.color} transparent opacity={0.8} />
        </Sphere>

        {/* Glow Effect */}
        <Sphere args={[0.4, 16, 16]}>
          <meshBasicMaterial color={skill.color} transparent opacity={hovered ? 0.3 : 0.1} side={THREE.BackSide} />
        </Sphere>

        {/* Skill Info */}
        <Html distanceFactor={8} position={[0, -0.8, 0]}>
          <div className="text-center pointer-events-none">
            <div className="text-2xl mb-1">{skill.icon}</div>
            <div className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded border border-orange-500/30">
              <p className="text-xs font-semibold text-orange-300">{skill.name}</p>
            </div>
          </div>
        </Html>
      </group>
    </Float>
  )
}
