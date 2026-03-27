import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import hiwotImg from '../../assets/Hiwot Adugna Content creator.jpg';
import henokImg from '../../assets/Henok Belachew Fullstack Developer.jpg';
import hemenImg from '../../assets/Hemen Aklilu Customer Support.jpg';
import tesfalidetImg from '../../assets/Tesfalidet Debesay Founder, G.Manager.jpg';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 3D Background Component - Properly wrapped
const ThreeDBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

// Separate component for animated sphere
const AnimatedSphere = () => {
  const meshRef = useRef();
  
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

const LeadershipTeam = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const executivesRef = useRef(null);
  const managementRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const leaders = [
    {
      name: 'Tesfalidet Debesay',
      title: 'Founder & General Manager',
      company: 'Ariva Systems Solutions',
      description: 'Visionary leader with extensive experience in software development and business management, driving Ariva Systems Solutions towards excellence in the Ethiopian tech industry.',
      image: tesfalidetImg,
      icon: '👨‍💼',
      role: 'Executive Leadership'
    },
    {
      name: 'Hiwot Adugna',
      title: 'Content Creator & Marketing Specialist',
      company: 'Ariva Systems Solutions',
      description: 'Creative content strategist specializing in digital marketing, brand storytelling, and engaging content creation that connects businesses with their target audience.',
      image: hiwotImg,
      icon: '🎨',
      role: 'Management Team'
    },
    {
      name: 'Henok Belachew',
      title: 'Full Stack Developer',
      company: 'Ariva Systems Solutions',
      description: 'Expert full-stack developer with proficiency in modern web technologies, delivering robust and scalable applications that meet client requirements.',
      image: henokImg,
      icon: '💻',
      role: 'Management Team'
    },
    {
      name: 'Hemen Aklilu',
      title: 'Customer Support Specialist',
      company: 'Ariva Systems Solutions',
      description: 'Dedicated customer support professional committed to ensuring client satisfaction through timely responses, problem-solving, and exceptional service delivery.',
      image: hemenImg,
      icon: '🤝',
      role: 'Management Team'
    }
  ];

  const executives = leaders.filter(l => l.role === 'Executive Leadership');
  const managementTeam = leaders.filter(l => l.role === 'Management Team');

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  useEffect(() => {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') return;
    
    // GSAP Animations
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Executive cards animation
      if (executivesRef.current?.children) {
        gsap.fromTo(executivesRef.current.children,
          { x: -100, opacity: 0, rotationY: -30 },
          {
            x: 0,
            opacity: 1,
            rotationY: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: executivesRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Management cards animation
      if (managementRef.current?.children) {
        gsap.fromTo(managementRef.current.children,
          { y: 100, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: managementRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Parallax effect on scroll
      if (sectionRef.current) {
        gsap.to(sectionRef.current, {
          backgroundPosition: '50% 100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-20 px-[5%] relative overflow-hidden bg-transparent">
      {/* 3D Background */}
      <ThreeDBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Webflow-style animation */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={controls}
          variants={fadeInUpVariants}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-block mb-4"
          >
            <span 
              className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
              style={{ 
                color: 'var(--accent)',
                backgroundColor: 'rgba(0,212,170,0.1)',
                border: '1px solid rgba(0,212,170,0.2)'
              }}
            >
              Our Leadership
            </span>
          </motion.div>
          
          <motion.h2 
            className="section-title"
            style={{ color: 'var(--heading)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Experienced Leadership
          </motion.h2>
          
          <motion.p 
            className="text-sm text-[var(--muted)] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Visionary Leaders Driving Innovation
          </motion.p>
          
          <motion.p 
            className="text-sm text-[var(--muted)] mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Our leadership team brings a strong technical background, business insight, and a commitment to building long-lasting products and partnerships.
          </motion.p>
        </motion.div>

        {/* Executive Section */}
        <div className="mb-16">
          <motion.div 
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="w-1 h-6 bg-[var(--accent)] rounded-full"></div>
            <h3 className="text-xl font-bold text-[var(--heading)]">Executive Leadership</h3>
            <span className="text-sm text-[var(--muted)]">({executives.length} Leader)</span>
          </motion.div>
          
          <div ref={executivesRef} className="grid md:grid-cols-2 gap-6">
            {executives.map((leader, index) => (
              <motion.div
                key={index}
                variants={staggerContainer}
                initial="hidden"
                animate={controls}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--accent)] transition-all group cursor-pointer"
              >
                <div className="flex flex-col md:flex-row">
                  <motion.div 
                    className="md:w-48 lg:w-56 h-64 md:h-auto overflow-hidden relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML += `
                          <div class="w-full h-full flex items-center justify-center text-5xl" style="background: rgba(0,212,170,0.1)">
                            ${leader.icon}
                          </div>
                        `;
                      }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                  
                  <div className="flex-1 p-6">
                    <motion.h3 
                      className="text-xl font-bold mb-1 text-[var(--heading)]"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {leader.name}
                    </motion.h3>
                    <p className="text-sm text-[var(--accent)] mb-2">{leader.title}</p>
                    <p className="text-xs text-[var(--muted)] mb-3">{leader.company}</p>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{leader.description}</p>
                    
                    <motion.div 
                      className="mt-4 flex items-center gap-2 text-xs text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <span>View Profile</span>
                      <span className="text-lg">→</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Management Team Section */}
        <div>
          <motion.div 
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="w-1 h-6 bg-[var(--accent)] rounded-full"></div>
            <h3 className="text-xl font-bold text-[var(--heading)]">Management Team</h3>
            <span className="text-sm text-[var(--muted)]">({managementTeam.length} Members)</span>
          </motion.div>
          
          <div ref={managementRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementTeam.map((leader, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                initial="hidden"
                animate={controls}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--accent)] transition-all group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <motion.div className="w-full h-64 overflow-hidden">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML += `
                          <div class="w-full h-full flex items-center justify-center text-5xl" style="background: rgba(0,212,170,0.1)">
                            ${leader.icon}
                          </div>
                        `;
                      }}
                    />
                  </motion.div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <motion.h3 
                    className="text-lg font-bold mb-1 text-[var(--heading)]"
                    whileHover={{ x: 5 }}
                  >
                    {leader.name}
                  </motion.h3>
                  <p className="text-sm text-[var(--accent)] mb-2">{leader.title}</p>
                  <p className="text-xs text-[var(--muted)] mb-3">{leader.company}</p>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{leader.description}</p>
                  
                  <motion.div 
                    className="mt-4 flex items-center gap-2 text-xs text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <span>View Profile</span>
                    <span className="text-lg">→</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;