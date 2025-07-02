"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere } from "@react-three/drei"
import * as THREE from "three"

const blackHoleVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const blackHoleFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    
    // Create swirling accretion disk
    float angle = atan(vUv.y - center.y, vUv.x - center.x);
    float spiral = sin(angle * 12.0 + uTime * 3.0 - dist * 25.0) * 0.5 + 0.5;
    
    // Radial gradient for disk structure
    float radial = 1.0 - smoothstep(0.0, 0.5, dist);
    
    // Color mixing based on temperature (inner = hotter = more orange)
    vec3 color;
    if (dist < 0.15) {
      // Inner hot region - bright orange/white
      color = mix(uColor3, uColor1, spiral * 0.8);
    } else if (dist < 0.35) {
      // Middle region - orange
      color = mix(uColor1, uColor2, spiral);
    } else {
      // Outer region - fade to black
      color = mix(uColor2, vec3(0.0), smoothstep(0.35, 0.5, dist));
    }
    
    // Add brightness variation and turbulence
    float brightness = radial * (0.7 + spiral * 0.5);
    color *= brightness;
    
    // Gravitational lensing effect - distort at edges
    float lensing = smoothstep(0.4, 0.5, dist);
    color += vec3(0.1, 0.05, 0.0) * lensing;
    
    // Alpha for transparency
    float alpha = radial * (1.0 - smoothstep(0.0, 0.5, dist));
    
    gl_FragColor = vec4(color, alpha);
  }
`

export function BlackHoleCore() {
  const blackHoleRef = useRef()
  const accretionRef = useRef()
  const materialRef = useRef()

  useFrame((state) => {
    if (blackHoleRef.current) {
      blackHoleRef.current.rotation.z += 0.002
    }
    if (accretionRef.current) {
      accretionRef.current.rotation.z += 0.01
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  const uniforms = {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#ff6b35") }, // Dark orange
    uColor2: { value: new THREE.Color("#ff8c42") }, // Medium orange
    uColor3: { value: new THREE.Color("#ffffff") }, // White hot center
  }

  return (
    <group>
      {/* Event Horizon - Pure black sphere */}
      <Sphere args={[2.2, 64, 64]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#000000" />
      </Sphere>

      {/* Accretion Disk with Custom Shader */}
      <mesh ref={accretionRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 7, 128]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={blackHoleVertexShader}
          fragmentShader={blackHoleFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Gravitational Lensing Ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7.2, 7.8, 64]} />
        <meshBasicMaterial color="#ff6b35" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Inner Photon Sphere */}
      <Sphere args={[3.3, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#ff8c42" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>

      {/* Outer Gravitational Field */}
      <Sphere args={[8, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#ff6b35" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>

      {/* Gravitational Waves */}
      <group ref={blackHoleRef}>
        {[...Array(4)].map((_, i) => (
          <mesh key={i} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[10 + i * 3, 10.5 + i * 3, 32]} />
            <meshBasicMaterial color="#ff6b35" transparent opacity={0.03 - i * 0.005} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
