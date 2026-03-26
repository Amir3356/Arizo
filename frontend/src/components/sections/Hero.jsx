import React, { Suspense, useRef, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, useTexture } from '@react-three/drei'; // Add useTexture back
import * as THREE from 'three'; 
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
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

const Hero = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const getCanvasDimensions = () => {
    if (typeof window === 'undefined') return { width: 280, height: 280 };
    if (window.innerWidth < 480) return { width: 200, height: 200 };
    if (window.innerWidth < 640) return { width: 240, height: 240 };
    if (window.innerWidth < 768) return { width: 280, height: 280 };
    if (window.innerWidth < 1024) return { width: 320, height: 320 };
    return { width: 400, height: 400 };
  };

  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(getCanvasDimensions());
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen lg:h-[90vh] flex items-center pt-[70px] pb-12 md:pb-16 lg:pb-0 overflow-hidden bg-transparent"
    >
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          className="w-full h-full"
          options={{
            fpsLimit: 60,
            particles: {
              color: { value: "#00d4aa" },
              links: { 
                color: "#00d4aa", 
                distance: 150, 
                enable: true, 
                opacity: 0.2,
                width: 1
              },
              move: { 
                enable: true, 
                speed: 1,
                direction: "none",
                random: false,
                straight: false
              },
              number: { 
                value: 50,
                density: {
                  enable: true,
                  area: 800
                }
              },
              opacity: { 
                value: 0.3,
                random: false
              },
              size: {
                value: { min: 1, max: 3 },
                random: true
              }
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "grab"
                }
              },
              modes: {
                grab: {
                  distance: 140,
                  links: {
                    opacity: 0.5
                  }
                }
              }
            },
            detectRetina: true
          }}
        />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-[5%] flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-inner w-full lg:w-1/2 text-center lg:text-left"
        >
          <div className="hero-badge inline-flex items-center gap-2 bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.25)] rounded-full px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-medium text-[var(--accent)] mb-4 sm:mb-6 mx-auto lg:mx-0">
            <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse-slow"></span>
            Leading IT Company in Ethiopia
          </div>
          
          <h1 className="hero-title text-xl sm:text-2xl md:text-3xl lg:text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-tight tracking-[-0.01em] mb-3 sm:mb-5 text-[var(--heading)] font-jakarta">
            We Build Powerful Websites & <span className="text-[var(--accent)] relative inline-block">ERP Systems</span> That Grow Your Business
          </h1>
          
          <p className="hero-desc text-sm sm:text-base leading-relaxed text-[var(--muted)] max-w-[540px] mb-6 sm:mb-8 font-normal mx-auto lg:mx-0">
            At Ariva Systems Solutions, we create modern websites and intelligent ERP systems in Ethiopia that help businesses automate operations and increase revenue.
          </p>
          
          <div className="hero-btns flex gap-3 sm:gap-4 flex-wrap justify-center lg:justify-start">
            <a href="#contact" className="btn-primary text-sm sm:text-base px-5 sm:px-7 py-2 sm:py-3">Start Your Project →</a>
            <a href="#services" className="btn-outline text-sm sm:text-base px-5 sm:px-7 py-2 sm:py-3">Explore Services</a>
          </div>
          
          <div className="hero-stats flex gap-6 sm:gap-12 mt-8 sm:mt-12 flex-wrap justify-center lg:justify-start">
            <div>
              <div className="stat-num text-xl sm:text-[1.8rem] font-bold text-[var(--heading)]">150<span className="text-[var(--accent)] text-lg sm:text-[1.4rem]">+</span></div>
              <div className="stat-label text-[0.6rem] sm:text-[0.7rem] text-[var(--muted)] uppercase tracking-wider">Projects Delivered</div>
            </div>
            <div>
              <div className="stat-num text-xl sm:text-[1.8rem] font-bold text-[var(--heading)]">100<span className="text-[var(--accent)] text-lg sm:text-[1.4rem]">%</span></div>
              <div className="stat-label text-[0.6rem] sm:text-[0.7rem] text-[var(--muted)] uppercase tracking-wider">Client Satisfaction</div>
            </div>
          </div>
        </motion.div>

        {/* Responsive 3D Image Container */}
        <div className="lg:w-1/2 w-full flex justify-center items-center mt-6 lg:mt-0 lg:-mt-24">
          <div className="absolute inset-0 bg-gradient-radial from-[rgba(0,212,170,0.1)] to-transparent blur-[40px] sm:blur-[60px] pointer-events-none"></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
            style={{
              width: `${canvasSize.width}px`,
              height: `${canvasSize.height}px`
            }}
          >
            <Canvas 
              camera={{ position: [0, 0, 5], fov: 40 }}
              gl={{ antialias: true, alpha: true }}
              style={{ 
                pointerEvents: 'auto',
                width: '100%',
                height: '100%',
                display: 'block'
              }}
              className="w-full h-full"
            >
              <ambientLight intensity={1.5} />
              <Suspense fallback={<Loader />}>
                <Scene />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;