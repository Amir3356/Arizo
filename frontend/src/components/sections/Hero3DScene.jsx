import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, useTexture, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import heroImage from '../../assets/background image.jpg';

const Scene = () => {
  const texture = useTexture(heroImage);
  const meshRef = useRef();
  const ringRef = useRef();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useFrame((state) => {
    const { x, y } = state.mouse;
    
    // Core image plane responsive scale and parallax orientation
    if (meshRef.current) {
      const targetScale = ready ? 1 : 0.5;
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.05);
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.15, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y * 0.15, 0.1);
    }

    // Ambient background ring slow rotation
    if (ringRef.current) {
        ringRef.current.rotation.z -= 0.002;
        ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <>
      <Sparkles 
        count={200} 
        origin={[0,0,0]}
        scale={10} 
        size={2.5} 
        speed={0.4} 
        opacity={0.3} 
        color="#00d4aa" 
        noise={0.1}
      />
      <Center>
        <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.2} floatingRange={[-0.15, 0.15]}>
          <group ref={meshRef}>
            {/* Main Flat 2D Graphic rendered securely in 3D */}
            <mesh>
              <planeGeometry args={[3.8, 3.8]} />
              <meshBasicMaterial map={texture} transparent={true} />
            </mesh>
            
            {/* Depth creating Wireframe Ring behind the image */}
            <mesh ref={ringRef} position={[0, 0, -0.6]}>
              <ringGeometry args={[2.0, 2.6, 64]} />
              <meshBasicMaterial color="#00d4aa" wireframe={true} transparent opacity={0.15} />
            </mesh>
          </group>
        </Float>
      </Center>
    </>
  );
};

const Loader = () => {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#00d4aa" emissive="#00d4aa" emissiveIntensity={1} wireframe={true} />
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
          camera={{ position: [0, 0, 5.5], fov: 45 }}
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