import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Animated Sphere Component
const AnimatedSphere = () => {
  const meshRef = React.useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Sphere args={[1, 64, 64]} ref={meshRef} scale={2.5}>
      <MeshDistortMaterial
        color="#00d4aa"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        opacity={0.3}
        transparent
      />
    </Sphere>
  );
};

const LeaderThree = ({ opacity = 0.2 }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleContextLoss = (event) => {
      event.preventDefault();
      console.warn('WebGL context lost, disabling 3D leader background');
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
        camera={{ position: [0, 0, 5] }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default LeaderThree;