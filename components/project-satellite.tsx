"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Html, Sphere, Box, Octahedron } from "@react-three/drei"
import * as THREE from "three"

export function ProjectSatellite({ project, onClick, isSelected }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      const angle = time * project.orbitSpeed + (project.id * Math.PI * 2) / 5

      // Orbital motion
      meshRef.current.position.x = Math.cos(angle) * project.orbitRadius
      meshRef.current.position.z = Math.sin(angle) * project.orbitRadius
      meshRef.current.position.y = Math.sin(time * 0.3 + project.id) * 0.8

      // Self rotation
      meshRef.current.rotation.y += 0.02
      meshRef.current.rotation.x += 0.01

      // Scale and glow on hover/selection
      const targetScale = hovered || isSelected ? 1.4 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  const renderSatelliteShape = () => {
    const size = project.size
    switch (project.type) {
      case "satellite":
        return (
          <group>
            <Sphere args={[size * 0.8, 32, 32]}>
              <meshStandardMaterial
                color={project.color}
                roughness={0.2}
                metalness={0.8}
                emissive={project.color}
                emissiveIntensity={hovered ? 0.5 : 0.3}
              />
            </Sphere>
            {/* Solar panels */}
            <Box args={[size * 2, size * 0.1, size * 0.8]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#1a1a2e" metalness={0.9} />
            </Box>
          </group>
        )
      case "probe":
        return (
          <Octahedron args={[size, 0]}>
            <meshStandardMaterial
              color={project.color}
              roughness={0.1}
              metalness={0.9}
              emissive={project.color}
              emissiveIntensity={hovered ? 0.6 : 0.4}
            />
          </Octahedron>
        )
      case "station":
        return (
          <group>
            <Box args={[size * 1.5, size * 0.5, size * 1.5]}>
              <meshStandardMaterial
                color={project.color}
                roughness={0.3}
                metalness={0.7}
                emissive={project.color}
                emissiveIntensity={hovered ? 0.4 : 0.2}
              />
            </Box>
            {/* Rotating rings */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[size * 1.2, size * 0.1, 8, 32]} />
              <meshStandardMaterial color={project.color} emissive={project.color} emissiveIntensity={0.3} />
            </mesh>
          </group>
        )
      default:
        return null
    }
  }

  return (
    <Float floatIntensity={0.5} speed={0.8}>
      <group
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        style={{ cursor: "pointer" }}
      >
        {renderSatelliteShape()}

        {/* Holographic Info Display */}
        <Html distanceFactor={12} position={[0, -project.size * 2.5, 0]}>
          <div className="text-white text-center pointer-events-none">
            <div className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/30">
              <p className="text-sm font-bold text-cyan-300">{project.title}</p>
              <p className="text-xs text-gray-400 mt-1">{project.type.toUpperCase()}</p>
              {hovered && (
                <div className="mt-2 text-xs">
                  <p className="text-purple-300">Click to explore</p>
                </div>
              )}
            </div>
          </div>
        </Html>

        {/* Energy Field */}
        {(hovered || isSelected) && (
          <Sphere args={[project.size * 2, 16, 16]}>
            <meshBasicMaterial color={project.color} transparent opacity={0.1} side={THREE.BackSide} />
          </Sphere>
        )}

        {/* Orbital Trail */}
        {isSelected && (
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[project.orbitRadius - 0.1, project.orbitRadius + 0.1, 64]} />
            <meshBasicMaterial color={project.color} transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
        )}
      </group>
    </Float>
  )
}
