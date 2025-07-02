"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Html, Plane } from "@react-three/drei"
import * as THREE from "three"

export function CodeSnippet({ snippet }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.position.y += Math.sin(time * 0.3 + snippet.id) * 0.001
      meshRef.current.rotation.y += 0.003
      meshRef.current.rotation.x += 0.002

      const targetScale = hovered ? 1.1 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <Float floatIntensity={0.5} speed={0.4}>
      <group
        ref={meshRef}
        position={snippet.position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Code Background */}
        <Plane args={[2.5, 1.5]}>
          <meshBasicMaterial color="#0a0a0a" transparent opacity={hovered ? 0.9 : 0.7} side={THREE.DoubleSide} />
        </Plane>

        {/* Glowing Border */}
        <Plane args={[2.6, 1.6]}>
          <meshBasicMaterial color={snippet.color} transparent opacity={hovered ? 0.3 : 0.1} side={THREE.DoubleSide} />
        </Plane>

        {/* Code Display */}
        <Html distanceFactor={6} transform>
          <div className="w-40 p-2 pointer-events-none">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: snippet.color }} />
              <span className="text-xs font-mono text-orange-300">{snippet.language}</span>
            </div>
            <pre className="text-xs font-mono text-green-400 leading-tight">
              <code>{snippet.code}</code>
            </pre>
          </div>
        </Html>
      </group>
    </Float>
  )
}
