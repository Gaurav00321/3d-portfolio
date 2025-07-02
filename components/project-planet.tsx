"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Html, Sphere } from "@react-three/drei"
import * as THREE from "three"

export function ProjectPlanet({ project, onClick, isSelected }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      const angle = time * project.orbitSpeed + (project.id * Math.PI * 2) / 5

      // Orbital motion around black hole
      meshRef.current.position.x = Math.cos(angle) * project.orbitRadius
      meshRef.current.position.z = Math.sin(angle) * project.orbitRadius
      meshRef.current.position.y = Math.sin(time * 0.2 + project.id) * 0.3

      // Planet rotation
      meshRef.current.rotation.y += 0.02
      meshRef.current.rotation.x += 0.005

      // Scale on hover/selection
      const targetScale = hovered || isSelected ? 1.3 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <Float floatIntensity={0.3} speed={0.8}>
      <group
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        style={{ cursor: "pointer" }}
      >
        {/* Main Planet */}
        <Sphere args={[project.size, 32, 32]}>
          <meshStandardMaterial
            color={project.color}
            roughness={0.4}
            metalness={0.3}
            emissive={project.color}
            emissiveIntensity={hovered ? 0.4 : 0.2}
          />
        </Sphere>

        {/* Planet Atmosphere */}
        <Sphere args={[project.size * 1.1, 16, 16]}>
          <meshBasicMaterial color={project.color} transparent opacity={hovered ? 0.2 : 0.1} side={THREE.BackSide} />
        </Sphere>

        {/* Project Info */}
        <Html distanceFactor={10} position={[0, -project.size * 2, 0]}>
          <div className="text-white text-center pointer-events-none">
            <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-orange-500/30">
              <p className="text-sm font-bold text-orange-300">{project.title}</p>
              {hovered && <p className="text-xs text-gray-400 mt-1">Click to explore</p>}
            </div>
          </div>
        </Html>

        {/* Selection Ring */}
        {isSelected && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[project.size * 1.5, project.size * 1.7, 32]} />
            <meshBasicMaterial color={project.color} transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
        )}

        {/* Orbital Trail */}
        {(hovered || isSelected) && (
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[project.orbitRadius - 0.1, project.orbitRadius + 0.1, 64]} />
            <meshBasicMaterial color={project.color} transparent opacity={0.2} side={THREE.DoubleSide} />
          </mesh>
        )}
      </group>
    </Float>
  )
}
