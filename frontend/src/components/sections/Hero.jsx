import React, { Suspense, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useTexture, Center } from '@react-three/drei';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import heroImage from '../../assets/background image.jpg'; 

// Sub-component to handle Three.js hooks
const Scene = () => {
  const texture = useTexture(heroImage);
  const meshRef = useRef();

  useFrame((state) => {
    const { x, y } = state.mouse;
    if (meshRef.current) {
      meshRef.current.rotation.y = x * 0.12;
      meshRef.current.rotation.x = -y * 0.12;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center>
        <mesh ref={meshRef}>
          <planeGeometry args={[3.5, 3.5]} />
          <meshBasicMaterial map={texture} transparent={true} />
        </mesh>
      </Center>
    </Float>
  );
};

const Hero = () => {
  // Initialize Particles Engine
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <section id="home" className="min-h-[calc(100vh-70px)] mt-[70px] flex items-center px-[5%] py-15 md:py-20 relative overflow-hidden bg-[var(--bg)]">
      
      {/* 1. Added Particles Background (Maintains z-0 to stay behind everything) */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0 pointer-events-none"
        options={{
          fullScreen: { enable: false },
          fpsLimit: 120,
          particles: {
            color: { value: "#00d4aa" },
            links: {
              color: "#00d4aa",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.8,
              direction: "none",
              outModes: { default: "out" },
            },
            number: {
              density: { enable: true, area: 800 },
              value: 50,
            },
            opacity: { value: 0.3 },
            size: { value: { min: 1, max: 2 } },
          },
          detectRetina: true,
        }}
      />

      {/* Background Gradients */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-[rgba(0,212,170,0.1)] to-transparent top-[-100px] right-[-150px] pointer-events-none"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-radial from-[rgba(245,166,35,0.06)] to-transparent bottom-[-50px] left-[-100px] pointer-events-none"></div>
      
      {/* 2. Content Container (Kept exactly as you had it, with z-10 for layering) */}
      <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8 relative z-10">
        
        {/* Left Side: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-inner max-w-[700px] lg:w-1/2 pt-10"
        >
          <div className="hero-badge inline-flex items-center gap-2 bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.25)] rounded-full px-4 py-1 text-xs font-medium text-[var(--accent)] font-inter mb-6">
            <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse-slow inline-block"></span>
            Leading  Company in Ethiopia
          </div>
          
          <h1 className="hero-title text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-[-0.02em] mb-5">
            We Build Powerful Websites & <span className="text-[var(--accent)] relative inline-block">ERP Systems</span> That Grow Your Business
          </h1>
          
          <p className="hero-desc text-base leading-relaxed text-[var(--muted)] max-w-[580px] mb-8 font-normal">
            At Ariva Systems Solutions, we create modern websites and intelligent ERP systems in Ethiopia that help businesses automate operations, improve efficiency, and increase revenue.
          </p>
          
          <div className="hero-btns flex gap-4 flex-wrap">
            <a href="#contact" className="btn-primary">Start Your Project →</a>
            <a href="#services" className="btn-outline">Explore Services</a>
          </div>
          
          <div className="hero-stats flex gap-8 mt-12 flex-wrap">
            <div>
              <div className="stat-num font-jakarta text-[1.8rem] font-bold text-[var(--heading)] leading-none">150<span className="text-[var(--accent)] text-[1.4rem]">+</span></div>
              <div className="stat-label text-[0.7rem] text-[var(--muted)] mt-1 tracking-wide font-medium">Projects Delivered</div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Re-aligned Three.js Canvas */}
        <div className="lg:w-1/2 w-full h-[400px] md:h-[500px] relative flex justify-center lg:justify-end lg:-mt-10">
          <div className="absolute inset-0 bg-gradient-radial from-[rgba(0,212,170,0.15)] to-transparent blur-[50px] rounded-full transform scale-110 pointer-events-none"></div>
          
          <div className="w-full h-full max-w-[420px]">
            <Canvas camera={{ position: [0, 0, 5], fov: 38 }}>
              <ambientLight intensity={1.2} />
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;