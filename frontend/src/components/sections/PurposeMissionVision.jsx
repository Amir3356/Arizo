import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// 3D Tilt Card with embedded mini R3F scene
// ─────────────────────────────────────────────
const PMVCard = ({ item, index }) => {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smoothX = useSpring(mx, { damping: 22, stiffness: 350 });
  const smoothY = useSpring(my, { damping: 22, stiffness: 350 });
  const rotateX = useTransform(smoothY, [0, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [0, 1], [-15, 15]);
  const glowX = useTransform(smoothX, [0, 1], [0, 100]);
  const glowY = useTransform(smoothY, [0, 1], [0, 100]);

  const handleMM = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const handleML = () => { mx.set(0.5); my.set(0.5); };

  const shapes = ['target', 'rocket', 'vision'];
  const colors = ['#00d4aa', '#4fc3f7', '#ce93d8'];
  const accentColors = ['rgba(0,212,170,0.35)', 'rgba(79,195,247,0.35)', 'rgba(206,147,216,0.35)'];
  const gradients = [
    'from-[rgba(0,212,170,0.08)] to-[rgba(0,100,80,0.04)]',
    'from-[rgba(79,195,247,0.08)] to-[rgba(0,80,120,0.04)]',
    'from-[rgba(206,147,216,0.08)] to-[rgba(100,40,120,0.04)]',
  ];

  return (
    <div style={{ perspective: '1200px' }} className="pmv-card w-full">
      <motion.div
        onMouseMove={handleMM}
        onMouseLeave={handleML}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full group cursor-default"
      >
        {/* Dynamic cursor glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, ${accentColors[index]} 0%, transparent 65%)`
            ),
          }}
        />

        {/* Card body */}
        <div
          className="relative rounded-3xl overflow-hidden p-8 text-center backdrop-blur-xl"
          style={{
            background: 'var(--card-bg, rgba(255,255,255,0.85))',
            border: `1px solid ${accentColors[index]}`,
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            transform: 'translateZ(0px)',
          }}
        >
          {/* Top shimmer line */}
          <div
            className="absolute top-0 left-[10%] right-[10%] h-[1px]"
            style={{ background: `linear-gradient(to right, transparent, ${colors[index]}, transparent)`, opacity: 0.7 }}
          />

          {/* Original Emoji Icon - large & animated */}
          <motion.div
            className="mx-auto mb-6 rounded-2xl flex items-center justify-center text-6xl"
            style={{
              width: '100px',
              height: '100px',
              background: `${accentColors[index]}`,
              border: `1px solid ${accentColors[index]}`,
              transform: 'translateZ(30px)',
            }}
            whileHover={{ scale: 1.15, rotate: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            {item.icon}
          </motion.div>

          {/* Number badge */}
          <div
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
            style={{ background: `${accentColors[index]}`, color: colors[index] }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Text */}
          <div style={{ transform: 'translateZ(20px)' }}>
            <h3
              className="text-2xl font-extrabold mb-4 leading-tight"
              style={{ color: colors[index] }}
            >
              {item.title}
            </h3>
            <p className="text-sm text-[var(--text)] leading-relaxed font-medium">
              {item.description}
            </p>
          </div>

          {/* Bottom accent glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
            style={{ background: `linear-gradient(to right, ${colors[index]}, transparent)` }}
          />
        </div>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
const PurposeMissionVision = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const items = [
    {
      icon: '🎯',
      title: 'Our Purpose',
      description: 'To empower Ethiopian businesses through innovative technology solutions that drive growth and efficiency.'
    },
    {
      icon: '🚀',
      title: 'Our Mission',
      description: 'To deliver high-quality, scalable software solutions that solve real business problems and create lasting value for our clients.'
    },
    {
      icon: '👁️',
      title: 'Our Vision',
      description: "To become Ethiopia's most trusted technology partner, recognized for excellence, innovation, and customer satisfaction."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo('.pmv-heading',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      );

      // Cards fly in from different directions
      gsap.fromTo('.pmv-card:nth-child(1)',
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
      gsap.fromTo('.pmv-card:nth-child(2)',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.12, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
      gsap.fromTo('.pmv-card:nth-child(3)',
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, delay: 0.24, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 px-[5%] relative overflow-hidden bg-transparent"
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-[var(--accent)] opacity-[0.025] blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-purple-400 opacity-[0.025] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <div ref={headingRef} className="pmv-heading text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,212,170,0.35)] bg-[rgba(0,212,170,0.06)] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[var(--accent)] text-xs font-bold tracking-widest uppercase">Who We Are</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4" style={{ color: 'var(--heading)' }}>
            Purpose,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-teal-300">
              Mission
            </span>{' '}
            & Vision
          </h2>
          <p className="text-base md:text-lg text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
            The values and goals that drive every line of code we write and every solution we deliver.
          </p>
        </div>

        {/* ── 3D Tilt Cards Grid ── */}
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <PMVCard key={index} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PurposeMissionVision;