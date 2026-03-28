import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Animated Timeline Sphere Component
const AnimatedSphere = () => {
  const sphereRef = useRef();
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group>
      <Sphere ref={sphereRef} args={[1.2, 64, 64]} scale={2}>
        <MeshDistortMaterial
          color="#00d4aa"
          attach="material"
          distort={0.3}
          speed={1.2}
          roughness={0.2}
          metalness={0.8}
          opacity={0.4}
          transparent
        />
      </Sphere>
      <Trail
        width={0.5}
        length={8}
        color="#00d4aa"
        attenuation={(t) => t * 0.5}
      >
        {[...Array(30)].map((_, i) => (
          <mesh key={i} position={[Math.sin(i) * 2.5, Math.cos(i * 2) * 2, Math.cos(i) * 2]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#00d4aa" emissive="#00d4aa" emissiveIntensity={0.5} />
          </mesh>
        ))}
      </Trail>
    </group>
  );
};

// 3D Background Component with error handling
export const History3DBackground = ({ opacity = 0.2, progress = 0 }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleContextLoss = (event) => {
      event.preventDefault();
      console.warn('WebGL context lost, disabling 3D background');
      setHasError(true);
    };

    window.addEventListener('webglcontextlost', handleContextLoss);
    
    return () => {
      window.removeEventListener('webglcontextlost', handleContextLoss);
    };
  }, []);

  if (hasError) return null;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <Canvas 
        camera={{ position: [0, 0, 8] }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(window.devicePixelRatio);
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
};