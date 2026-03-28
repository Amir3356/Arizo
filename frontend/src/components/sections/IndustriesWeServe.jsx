import React, { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas as R3FCanvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// -------------------------------------------------------------
// ENGINE 1: R3F Global Ambient Background (Data stream effect)
// -------------------------------------------------------------
function AmbientParticles() {
  const ref = useRef();
  const [positions] = React.useState(() => {
    const coords = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      coords[i*3] = (Math.random() - 0.5) * 30; // x
      coords[i*3+1] = (Math.random() - 0.5) * 30; // y
      coords[i*3+2] = (Math.random() - 0.5) * 15; // z
    }
    return coords;
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta * 0.03;
    ref.current.rotation.y -= delta * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00d4aa" size={0.04} sizeAttenuation={true} depthWrite={false} opacity={0.2} />
    </Points>
  );
}

// -------------------------------------------------------------
// ENGINE 2: Interactive Data Network (Rebuilt in R3F/Three.js)
// -------------------------------------------------------------
function InteractiveDataCore() {
  const innerRef = useRef();
  const outerRef = useRef();
  
  // Create geometry for connection tubes connecting core to nodes
  const nodeCount = 8;
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }).map((_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      const d = 5;
      const x = Math.cos(angle) * d;
      const y = Math.sin(angle * 2) * 1.5;
      const z = Math.sin(angle) * d;
      
      const v1 = new THREE.Vector3(0, 0, 0);
      const v2 = new THREE.Vector3(x, y, z);
      const curve = new THREE.LineCurve3(v1, v2);
      
      return { x, y, z, curve };
    });
  }, []);

  useFrame((state, delta) => {
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.5;
      innerRef.current.rotation.x += delta * 0.2;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y -= delta * 0.3;
      outerRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Inner Emissive Core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial color="#000000" emissive="#00d4aa" emissiveIntensity={1} wireframe={true} />
        
        {/* Orbiting Industry Nodes */}
        {nodes.map((node, i) => (
          <group key={i}>
            <mesh position={[node.x, node.y, node.z]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} />
            </mesh>
            {/* Connecting Lines to center */}
            <mesh>
              <tubeGeometry args={[node.curve, 20, 0.03, 8, false]} />
              <meshStandardMaterial color="#00d4aa" emissive="#00d4aa" emissiveIntensity={1} transparent opacity={0.4} />
            </mesh>
          </group>
        ))}
      </mesh>
      
      {/* Outer Abstract Shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[3.5, 1]} />
        <meshStandardMaterial color="#1a2033" emissive="#1a2033" emissiveIntensity={0.3} wireframe={true} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------
const IndustriesWeServe = () => {
  const sectionRef = useRef(null);

  const industries = [
    { icon: '🏭', name: 'Manufacturing', description: 'Streamline production processes and supply chain management' },
    { icon: '🏨', name: 'Tourism & Hospitality', description: 'Enhance guest experiences with integrated booking systems' },
    { icon: '🏥', name: 'Healthcare', description: 'Digital health records and patient management solutions' },
    { icon: '📚', name: 'Education', description: 'E-learning platforms and student information systems' },
    { icon: '🏠', name: 'Real Estate', description: 'Property management and real estate CRM solutions' },
    { icon: '🏗️', name: 'Construction', description: 'Project management and resource planning tools' },
    { icon: '🌾', name: 'Agriculture', description: 'Farm management and supply chain optimization' },
    { icon: '📦', name: 'Import & Export', description: 'Logistics management and trade compliance systems' }
  ];

  // GSAP: Webflow-style Reveal Animations on scroll
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal header
      gsap.fromTo('.industry-header-reveal',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      // Reveal list items
      gsap.fromTo('.industry-card', 
        { x: 50, opacity: 0, scale: 0.95 },
        { 
          x: 0, 
          opacity: 1, 
          scale: 1,
          stagger: 0.1, 
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: '.industries-list',
            start: "top 75%",
            end: "bottom 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-24 bg-transparent overflow-hidden">
      
      {/* 1. R3F Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <R3FCanvas camera={{ position: [0, 0, 5] }}>
          <AmbientParticles />
        </R3FCanvas>
      </div>

      <div className="max-w-7xl mx-auto px-[5%] relative z-10 h-full">
        {/* Industry Title */}
        <div className="w-full text-left mb-16 lg:mb-20 industry-header-reveal">
            <motion.div className="inline-block px-5 py-2 rounded-full border border-[var(--accent)] bg-[rgba(0,212,170,0.05)] text-[var(--accent)] text-xs md:text-sm font-bold tracking-wide uppercase mb-6 w-fit">
              Excellence across sectors
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-[var(--heading)] md:whitespace-nowrap flex leading-[1.2]">
              Industries We Serve <span className="text-transparent bg-clip-text bg-gradient-to-l from-[var(--accent)] to-teal-300 ml-3 lg:ml-5">(Ethiopia)</span>
            </h2>
            <p className="max-w-xl text-[var(--muted)] text-base md:text-lg mt-6">
              We provide highly tailored digital transformation tools and software infrastructure designed specifically to scale diverse Ethiopian businesses.
            </p>
        </div>

        {/* Webflow Style Split Sticky Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start relatvie">
          
          {/* LEFT SIDE: Sticky Webflow tracking 3D Engine */}
          <div className="w-full lg:w-[45%] h-[400px] lg:h-[70vh] lg:sticky lg:top-32 rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.05)] bg-[rgba(15,21,38,0.6)] backdrop-blur-3xl shadow-2xl relative flex items-center justify-center shrink-0">
            {/* Interactive Data Core running on R3F instead of Babylon */}
            <div className="absolute inset-0 w-full h-full">
              <R3FCanvas camera={{ position: [0, 0, 11], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00d4aa" />
                
                <InteractiveDataCore />
                
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </R3FCanvas>
            </div>
            
            {/* Overlay interactive hint */}
            <div className="absolute top-6 right-6 bg-[rgba(0,0,0,0.5)] backdrop-blur-md px-4 py-2 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center gap-2 pointer-events-none z-10">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_10px_var(--accent)]"></span>
              <span className="text-white text-xs font-medium tracking-wide">Interactive Hub</span>
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center px-6 pointer-events-none z-10">
                <p className="text-[var(--muted)] text-sm">Drag to rotate the network core</p>
            </div>
          </div>

          {/* RIGHT SIDE: Scrolling List (GSAP revealed, Framer Motion hover) */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6 industries-list pb-20">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03, marginLeft: 10, backgroundColor: "rgba(20,27,48,0.95)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="industry-card flex gap-6 p-6 md:p-8 rounded-3xl cursor-pointer group shadow-lg"
                style={{ 
                  backgroundColor: 'rgba(20,27,48,0.6)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div 
                  className="w-16 h-16 shrink-0 rounded-[1.2rem] flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                  style={{ 
                    backgroundColor: 'rgba(0,212,170,0.1)',
                    border: '1px solid rgba(0,212,170,0.2)'
                  }}
                >
                  {industry.icon}
                </div>
                
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[var(--accent)] transition-colors duration-300">
                    {industry.name}
                  </h3>
                  <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {/* CTA at bottom of list */}
            <div className="industry-card mt-10">
              <motion.div 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,212,170,0.15)" }}
                className="p-8 rounded-3xl bg-gradient-to-br from-[var(--accent)] to-teal-600 text-black shadow-2xl overflow-hidden relative cursor-pointer group"
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <h3 className="text-2xl font-bold mb-2 z-10 relative">Need a Custom Solution?</h3>
                <p className="font-medium text-black/80 z-10 relative">No matter your industry, we scale up with your demands. Get in touch to discuss your specific infrastructure.</p>
                <div className="mt-6 flex items-center gap-2 font-bold uppercase tracking-wider text-sm z-10 relative">
                  Contact Us
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;