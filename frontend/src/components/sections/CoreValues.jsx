import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

const ValueCard = ({ value, index }) => {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smoothX = useSpring(mx, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(my, { damping: 20, stiffness: 300 });
  
  const rotateX = useTransform(smoothY, [0, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);
  const glowX = useTransform(smoothX, [0, 1], [0, 100]);
  const glowY = useTransform(smoothY, [0, 1], [0, 100]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      style={{ perspective: '1200px' }}
      className="core-value-card-wrapper"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full group"
      >
        {/* Cursor Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(0,212,170,0.15) 0%, transparent 70%)`
            ),
          }}
        />

        {/* Card Body */}
        <div
          className="relative h-full bg-[var(--card-bg)] backdrop-blur-xl border-[0.5px] border-[var(--border)] rounded-2xl p-5 hover:border-[var(--accent)] transition-colors duration-500 flex flex-col items-center text-center overflow-hidden"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Subtle top light */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-30" />

          {/* Icon */}
          <motion.div 
            className="text-4xl mb-4 select-none"
            style={{ transform: 'translateZ(40px)' }}
            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            {value.icon}
          </motion.div>

          <h3 
            className="text-lg font-bold mb-2 tracking-tight"
            style={{ color: 'var(--accent)', transform: 'translateZ(20px)' }}
          >
            {value.title}
          </h3>
          
          <p 
            className="text-xs leading-relaxed font-medium"
            style={{ color: 'var(--muted)', transform: 'translateZ(10px)' }}
          >
            {value.description}
          </p>

          {/* Decorative Corner Glow */}
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[var(--accent)] opacity-[0.03] blur-2xl rounded-full" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const CoreValues = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const values = [
    { title: 'Integrity', description: 'We operate with honesty, transparency, and accountability in every interaction.', icon: '🤝' },
    { title: 'Excellence', description: 'We focus on quality, performance, and sustainable engineering practices.', icon: '⭐' },
    { title: 'Collaboration', description: 'Strong partnerships and teamwork drive our collective success.', icon: '👥' },
    { title: 'Innovation', description: 'We embrace creative thinking and continuous improvement in all we do.', icon: '💡' },
    { title: 'Quality', description: 'We deliver exceptional results through attention to detail and craftsmanship.', icon: '✨' },
    { title: 'Customer Focus', description: "Our clients' success is at the heart of every decision we make.", icon: '🎯' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Reveal
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        }
      });

      // Cards Staggered Reveal
      gsap.from('.core-value-card-wrapper', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="values"
      className="py-24 sm:py-32 px-[5%] relative overflow-hidden bg-transparent"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)] opacity-[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500 opacity-[0.02] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headingRef} className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block text-[var(--accent)] text-xs font-bold tracking-[0.2em] uppercase mb-4"
          >
            Our Core Values
          </motion.span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-4" style={{ color: 'var(--heading)' }}>
            What <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-emerald-400">Drives Us</span>
          </h2>
          <p className="text-base md:text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            These fundamental principles guide our decisions and shape the way we innovate for the Ethiopian market.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;