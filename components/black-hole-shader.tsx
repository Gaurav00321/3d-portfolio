"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    
    // Create swirling pattern
    float angle = atan(vUv.y - center.y, vUv.x - center.x);
    float spiral = sin(angle * 8.0 + uTime * 2.0 - dist * 20.0) * 0.5 + 0.5;
    
    // Create radial gradient
    float radial = 1.0 - smoothstep(0.0, 0.5, dist);
    
    // Combine colors based on distance and spiral
    vec3 color;
    if (dist < 0.2) {
      color = mix(uColor3, uColor1, spiral);
    } else if (dist < 0.35) {
      color = mix(uColor1, uColor2, spiral);
    } else {
      color = mix(uColor2, vec3(0.0), smoothstep(0.35, 0.5, dist));
    }
    
    // Add brightness variation
    float brightness = radial * (0.8 + spiral * 0.4);
    color *= brightness;
    
    // Add transparency based on distance
    float alpha = radial * (0.9 - smoothstep(0.0, 0.5, dist));
    
    gl_FragColor = vec4(color, alpha);
  }
`

export function BlackHoleShader() {
  const materialRef = useRef()

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  const uniforms = {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#ff6b35") },
    uColor2: { value: new THREE.Color("#00d4ff") },
    uColor3: { value: new THREE.Color("#ffffff") },
  }

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent
      side={THREE.DoubleSide}
    />
  )
}
