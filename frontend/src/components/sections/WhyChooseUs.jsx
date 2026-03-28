import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// -------------------------------------------------------------
// Magnetic Bento Card with 3D Hover Tilt
// -------------------------------------------------------------
const BentoCard = ({ reason, index, isLarge }) => {
  const cardRef = useRef();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const smoothX = useSpring(x, { damping: 25, stiffness: 400 });
  const smoothY = useSpring(y, { damping: 25, stiffness: 400 });
  const rotateX = useTransform(smoothY, [0, 1], [12, -12]);
  const rotateY = useTransform(smoothX, [0, 1], [-12, 12]);
  const glowX = useTransform(smoothX, [0, 1], [0, 100]);
  const glowY = useTransform(smoothY, [0, 1], [0, 100]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => { x.set(0.5); y.set(0.5); };

  // Animated counter for the index number
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => setCount(index + 1), index * 150 + 300);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div style={{ perspective: '1200px' }} className={`${isLarge ? 'md:col-span-2' : ''} w-full`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full group cursor-default"
      >
        {/* Dynamic light gradient following cursor */}
        <motion.div
          className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(0,212,170,0.15) 0%, transparent 60%)`
            )
          }}
        />

        {/* Card Body */}
        <div
          className="relative p-6 md:p-8 rounded-2xl md:rounded-3xl overflow-hidden h-full"
          style={{
            background: 'rgba(15,21,40,0.85)',
            border: '1px solid rgba(0,212,170,0.12)',
            backdropFilter: 'blur(16px)',
            transform: 'translateZ(0px)',
            boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
          }}
        >
          {/* Ambient corner glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[var(--accent)] blur-[60px] opacity-0 group-hover:opacity-10 transition-all duration-700" />

          {/* Floating index number */}
          <div
            className="absolute top-5 right-6 text-6xl md:text-7xl font-black tabular-nums leading-none select-none pointer-events-none"
            style={{
              color: 'rgba(0,212,170,0.06)',
              transform: 'translateZ(20px)',
            }}
          >
            {String(count).padStart(2, '0')}
          </div>

          {/* Icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-5 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 relative z-10"
            style={{
              background: 'rgba(0,212,170,0.08)',
              border: '1px solid rgba(0,212,170,0.25)',
              transform: 'translateZ(30px)',
            }}
          >
            {reason.icon}
          </div>

          {/* Text */}
          <div style={{ transform: 'translateZ(25px)' }} className="relative z-10">
            <h3 className="text-base md:text-lg font-bold text-white mb-2 leading-snug group-hover:text-[var(--accent)] transition-colors duration-300">
              {reason.title}
            </h3>
            <p className="text-xs md:text-sm text-white/55 leading-relaxed">
              {reason.description}
            </p>
          </div>

          {/* Bottom accent bar */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[var(--accent)] to-teal-400 transition-all duration-700 rounded-b-3xl" />
        </div>
      </motion.div>
    </div>
  );
};

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------
const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  const reasons = [
    {
      icon: '⏱️',
      title: 'Reliable & On-Time Delivery',
      description: 'We respect your timeline and always deliver on our commitments without delay.',
    },
    {
      icon: '💬',
      title: 'Transparent Communication',
      description: 'Clear, consistent updates throughout every stage. No surprises, ever.',
    },
    {
      icon: '🛠️',
      title: 'Ongoing Support & Maintenance',
      description: "We stay by your side long after launch to keep everything running perfectly.",
    },
    {
      icon: '🎯',
      title: 'Tailored Business Solutions',
      description: 'Every product is uniquely crafted for your business — never a one-size template.',
    },
    {
      icon: '⚡',
      title: 'High-Performance Systems',
      description: 'Blazing-fast, highly scalable architecture designed to grow alongside your business.',
    },
    {
      icon: '📈',
      title: 'SEO-First Development',
      description: 'Discoverable by design. SEO optimization is baked into every page we build.',
    },
    {
      icon: '🔒',
      title: 'Enterprise-Grade Security',
      description: 'Your data stays safe with proven, modern encryption and security protocols.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {

      // HEADLINE - dramatic split reveal
      gsap.fromTo(
        '.why-word',
        { y: '110%', opacity: 0, rotationX: -80 },
        {
          y: '0%',
          opacity: 1,
          rotationX: 0,
          stagger: 0.06,
          duration: 1.1,
          ease: 'power4.out',
          transformOrigin: '0 50% -50',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      );

      // SUBTEXT fade-up
      gsap.fromTo('.why-sub',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      );

      // BENTO CARDS fly in from alternating directions
      gsap.fromTo(
        '.bento-card',
        (i) => ({
          opacity: 0,
          y: i % 2 === 0 ? 80 : -80,
          scale: 0.85,
        }),
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split heading into animated words
  const headingWords = ['Why', 'Choose', 'Ariva?'];

  return (
    <section
      id="why-choose"
      ref={sectionRef}
      className="py-24 sm:py-32 px-[5%] relative overflow-hidden bg-transparent"
    >
      {/* Ambient radial background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent)] opacity-[0.02] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── HEADER ── */}
        <div ref={headingRef} className="mb-16 md:mb-20 text-center">
          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,212,170,0.35)] bg-[rgba(0,212,170,0.06)] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[var(--accent)] text-xs font-bold tracking-widest uppercase">Our Promise</span>
          </motion.div>

          {/* Animated word-by-word heading */}
          <div className="overflow-hidden">
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
              style={{ perspective: '800px' }}
            >
              {headingWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-4 last:mr-0">
                  <span
                    className={`why-word inline-block ${
                      i === headingWords.length - 1
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-teal-300 to-[var(--accent)]'
                        : 'text-[var(--heading)]'
                    }`}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          <p className="why-sub mt-6 text-base md:text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            We don't just ship code. We build long-term partnerships grounded in trust, performance, and unwavering support across Ethiopia.
          </p>
        </div>

        {/* ── BENTO GRID ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {reasons.map((reason, index) => {
            // Make first card (⏱️) and 5th card (⚡) span 2 columns for visual hierarchy
            const isLarge = index === 0 || index === 4;
            return (
              <div key={index} className={`bento-card ${isLarge ? 'md:col-span-2' : ''}`}>
                <BentoCard reason={reason} index={index} isLarge={isLarge} />
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM TRUST STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
        >
          {[
            { label: '150+', sub: 'Projects Delivered' },
            { label: '100%', sub: 'Client Satisfaction' },
            { label: '5★', sub: 'Avg. Review Rating' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-teal-400"
              >
                {stat.label}
              </div>
              <div className="text-xs text-[var(--muted)] uppercase tracking-widest font-semibold mt-1">
                {stat.sub}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;