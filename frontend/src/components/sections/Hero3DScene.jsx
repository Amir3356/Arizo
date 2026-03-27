import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import heroImage from '../../assets/background image.jpg';

const Scene = () => {
  const texture = useTexture(heroImage);
  const meshRef = useRef();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useFrame((state) => {
    const { x, y } = state.mouse;
    if (meshRef.current) {
      const targetScale = ready ? 1 : 0.5;
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.05);
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.12, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y * 0.12, 0.1);
    }
  });

  return (
    <Center>
      <mesh ref={meshRef}>
        <planeGeometry args={[3.5, 3.5]} />
        <meshBasicMaterial map={texture} transparent={true} />
      </mesh>
    </Center>
  );
};

const Loader = () => {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#00d4aa" emissive="#00d4aa" emissiveIntensity={0.5} />
    </mesh>
  );
};

const Hero3DScene = ({ canvasSize, webGLError }) => {
  if (webGLError) return null;

  return (
    <div className="lg:w-1/2 w-full flex justify-center items-center mt-6 lg:mt-0 lg:-mt-24">
      <div className="absolute inset-0 bg-gradient-radial from-[rgba(0,212,170,0.1)] to-transparent blur-[40px] sm:blur-[60px] pointer-events-none"></div>
      
      <div
        className="relative"
        style={{
          width: `${canvasSize.width}px`,
          height: `${canvasSize.height}px`
        }}
      >
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ 
            pointerEvents: 'auto',
            width: '100%',
            height: '100%',
            display: 'block'
          }}
          className="w-full h-full"
          onCreated={({ gl }) => {
            gl.setPixelRatio(window.devicePixelRatio);
          }}
        >
          <ambientLight intensity={1.5} />
          <Suspense fallback={<Loader />}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Hero3DScene;