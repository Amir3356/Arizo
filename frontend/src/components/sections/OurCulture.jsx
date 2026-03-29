import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Sphere } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

// 3D Background Component using Three.js / React Three Fiber
const AnimatedShape = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      {/* Primary Abstract Shape */}
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.8}>
        <MeshDistortMaterial
          color="var(--accent)"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.12}
          wireframe={false}
        />
      </Sphere>
      {/* Secondary Orbiting Web/Network Shape */}
      <Sphere args={[1, 32, 32]} scale={2.2} position={[0.5, 0.5, -2]}>
        <MeshDistortMaterial
          color="var(--accent2)"
          attach="material"
          distort={0.6}
          speed={2}
          roughness={0.4}
          metalness={0.8}
          transparent
          opacity={0.08}
          wireframe={true}
        />
      </Sphere>
    </Float>
  );
};

const CultureCard = ({ value, index }) => {
  const cardRef = useRef(null);

  // Advanced Webflow style GSAP ScrollTrigger reveal
  useEffect(() => {
    const el = cardRef.current;
    
    gsap.fromTo(el, 
      { 
        y: 80, 
        opacity: 0,
        rotationX: -15, 
        scale: 0.9 
      },
      { 
        y: 0, 
        opacity: 1, 
        rotationX: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <motion.div
      ref={cardRef}
      // Framer Motion 3D Tilt Hover interaction
      whileHover={{ scale: 1.05, y: -5, rotateX: 5, rotateY: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative text-center group bg-[rgba(20,27,48,0.7)] dark:bg-[rgba(20,27,48,0.8)] backdrop-blur-xl rounded-2xl p-4 hover:border-[var(--accent)] transition-colors overflow-hidden transform-style-preserve-3d shadow-2xl"
      style={{ 
        backgroundColor: 'var(--card-bg)',
        border: '0.5px solid rgba(0, 212, 170, 0.15)'
      }}
    >
      {/* Dynamic hover gradient Spotlight (Webflow aesthetics) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Floating icon */}
        <motion.div 
          className="text-3xl mb-3 inline-block drop-shadow-[0_0_15px_rgba(0,212,170,0.5)] bg-gradient-to-b from-white to-gray-300 rounded-full p-2 border border-[rgba(0,212,170,0.2)] bg-opacity-10 backdrop-blur-md"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {value.icon}
        </motion.div>
        
        <h4 className="text-lg font-bold mb-2 text-[var(--heading)] group-hover:text-[var(--accent)] transition-colors duration-300 font-jakarta">
          {value.title}
        </h4>
        <p className="text-xs text-[var(--muted)] leading-relaxed font-inter group-hover:text-[var(--text)] transition-colors duration-300">
          {value.description}
        </p>
      </div>
    </motion.div>
  );
};

const OurCulture = () => {
  const sectionRef = useRef(null);
  const headerWrapperRef = useRef(null);
  
  const values = [
    { icon: '🤝', title: 'Collaboration', description: 'Cross-functional teams consistently working together in an open environment to architect complex solutions.' },
    { icon: '💡', title: 'Innovation', description: 'The absolute freedom to experiment, responsibly challenge the status quo, and rapidly bring visionary ideas to life.' },
    { icon: '📈', title: 'Growth', description: 'Empowered continuous learning, leadership mentorship, and extensive internal opportunities to advance your unique career path.' }
  ];

  // GSAP targeted layered animation for Section Header
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Staggered reveal for header children
      gsap.fromTo(headerWrapperRef.current.children, 
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            bottom: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Framer Motion native smooth parallax hooked to page scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 px-[5%] overflow-hidden bg-transparent perspective-1000"
      id="culture"
    >
      
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 z-0 opacity-80 dark:opacity-60 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <AnimatedShape />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Parallax Glowing Ambient Background Orbs */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-[15%] w-80 h-80 bg-[var(--accent2)]/10 rounded-full blur-[100px]" />
      </motion.div>

      {/* Main Content Layer (Webflow style structure) */}
      <motion.div style={{ y: yContent }} className="max-w-7xl mx-auto relative z-10 mt-10">
        
        {/* Animated Header Component */}
        <div ref={headerWrapperRef} className="text-center mb-20 max-w-4xl mx-auto">
          <span className="section-label inline-block tracking-[0.2em] font-bold text-xs px-4 py-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5 text-[var(--accent)] mb-6 shadow-[0_0_15px_rgba(0,212,170,0.1)]">
            WORK ENVIRONMENT
          </span>
          <h2 className="section-title text-5xl md:text-7xl font-bold mb-8 text-[var(--heading)] tracking-tight">
            Our Culture
          </h2>
          <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed font-light">
            We've built a premium ecosystem where true collaboration, rapid digital innovation, 
            and unprecedented professional growth are deeply ingrained in everyday life.
          </p>
        </div>
        
        {/* Dynamic Interactive Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {values.map((value, index) => (
            <CultureCard key={index} value={value} index={index} />
          ))}
        </div>
        
      </motion.div>
    </section>
  );
};

export default OurCulture;