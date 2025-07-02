"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Html, Plane } from "@react-three/drei"
import * as THREE from "three"

export function CodeFragment({ fragment }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime

      // Gentle floating motion
      meshRef.current.position.y += Math.sin(time * 0.5 + fragment.id) * 0.002
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x += 0.003

      // Scale on hover
      const targetScale = hovered ? 1.2 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <Float floatIntensity={1} speed={0.5}>
      <group
        ref={meshRef}
        position={fragment.position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Code Fragment Background */}
        <Plane args={[3, 2]}>
          <meshBasicMaterial color="#0a0a0a" transparent opacity={hovered ? 0.9 : 0.7} side={THREE.DoubleSide} />
        </Plane>

        {/* Glowing Border */}
        <Plane args={[3.1, 2.1]}>
          <meshBasicMaterial color={fragment.color} transparent opacity={hovered ? 0.3 : 0.1} side={THREE.DoubleSide} />
        </Plane>

        {/* Code Display */}
        <Html distanceFactor={8} transform>
          <div className="w-48 p-3 pointer-events-none">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: fragment.color }} />
              <span className="text-xs font-mono text-gray-300">{fragment.language}</span>
            </div>
            <pre className="text-xs font-mono text-green-400 leading-relaxed">
              <code>{fragment.code}</code>
            </pre>
          </div>
        </Html>

        {/* Particle Effect */}
        {hovered && (
          <group>
            {[...Array(8)].map((_, i) => (
              <mesh
                key={i}
                position={[(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2]}
              >
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial color={fragment.color} />
              </mesh>
            ))}
          </group>
        )}
      </group>
    </Float>
  )
}
