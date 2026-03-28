import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas as R3FCanvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import person1Img from '../../assets/Testimonials person.jpg';
import person2Img from '../../assets/Testimonials person 1.jpg';
import person3Img from '../../assets/Testimonials person 3.jpg';
import person4Img from '../../assets/Testinomials 5.jpg';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// R3F Ambient Background Scene
// ─────────────────────────────────────────────
const AmbientScene = () => {
  const sphereRef = useRef();
  const torusRef = useRef();

  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.08;
      sphereRef.current.rotation.x += delta * 0.04;
    }
    if (torusRef.current) {
      torusRef.current.rotation.z += delta * 0.15;
      torusRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.4;
    }
  });

  return (
    <>
      <Sparkles
        count={180}
        scale={18}
        size={2}
        speed={0.2}
        opacity={0.25}
        color="#00d4aa"
        noise={0.5}
      />
      <Float speed={1.2} floatIntensity={1.5}>
        <mesh ref={sphereRef} position={[3, 0, -4]}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color="#00d4aa"
            wireframe
            transparent
            opacity={0.12}
            emissive="#00d4aa"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
      <Float speed={0.8} floatIntensity={1}>
        <mesh ref={torusRef} position={[-3.5, 1, -5]}>
          <torusGeometry args={[1.2, 0.3, 16, 60]} />
          <meshStandardMaterial
            color="#00d4aa"
            wireframe
            transparent
            opacity={0.1}
            emissive="#00d4aa"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>
    </>
  );
};

// ─────────────────────────────────────────────
// 3D Flip Testimonial Card
// ─────────────────────────────────────────────
const FlipCard = ({ item, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smoothX = useSpring(mx, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(my, { damping: 20, stiffness: 300 });
  const rotateX = useTransform(smoothY, [0, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [0, 1], [-8, 8]);

  const handleMM = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const handleML = () => { mx.set(0.5); my.set(0.5); };

  const stars = '★★★★★';

  return (
    <motion.div
      className={`relative group cursor-pointer select-none ${item.size === 'large' ? 'md:col-span-2' : ''}`}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: '1200px', minHeight: item.size === 'large' ? '320px' : '420px' }}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseMove={handleMM}
      onMouseLeave={handleML}
    >
      {/* 3D Flip Container */}
      <motion.div
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        {/* ── FRONT FACE ── */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col justify-between p-7 md:p-9"
          style={{
            backfaceVisibility: 'hidden',
            background: 'rgba(14,21,40,0.9)',
            border: '1px solid rgba(0,212,170,0.18)',
            backdropFilter: 'blur(18px)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
            overflow: 'hidden',
          }}
        >
          {/* Top accent gradient border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60" />

          {/* Stars */}
          <div className="text-[var(--accent)] text-lg tracking-wider mb-4">{stars}</div>

          {/* Quote */}
          <div>
            <div className="text-4xl leading-none text-[var(--accent)] opacity-30 font-serif mb-2">"</div>
            <p className="text-white/80 text-sm md:text-base leading-relaxed italic">
              {item.text}
            </p>
          </div>

          {/* Author */}
          <div className="flex items-center gap-4 mt-6">
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-3 rounded-full bg-[var(--accent)] opacity-20 blur-xl group-hover:opacity-50 transition-all duration-500" />
              <img
                src={item.image}
                alt={item.name}
                className="relative w-32 h-32 rounded-full object-cover object-top border-2 border-[rgba(0,212,170,0.5)] shadow-[0_0_30px_rgba(0,212,170,0.25)]"
              />
            </div>
            <div>
              <div className="text-white font-bold text-sm">{item.name}</div>
              <div className="text-[var(--accent)] text-xs font-medium mt-0.5">{item.position}</div>
            </div>
            {/* Flip hint */}
            <div className="ml-auto text-white/25 text-xs font-medium flex items-center gap-1">
              <span>flip</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="opacity-40">
                <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Ambient corner glow */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[var(--accent)] blur-[60px] opacity-0 group-hover:opacity-8 transition-opacity duration-700" />
        </div>

        {/* ── BACK FACE ── */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-7 md:p-9"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, rgba(0,212,170,0.15), rgba(0,100,80,0.2))',
            border: '1px solid rgba(0,212,170,0.45)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="text-6xl mb-4">🏆</div>
          <div className="text-white font-extrabold text-xl text-center mb-2">{item.name}</div>
          <div className="text-[var(--accent)] text-sm font-medium text-center mb-4">{item.position}</div>
          <div className="text-white/60 text-xs text-center">Verified Client Testimonial</div>
          <div className="mt-4 text-[var(--accent)] text-sm font-bold tracking-widest">★ ★ ★ ★ ★</div>
          <div className="mt-6 text-white/30 text-xs">click to flip back</div>
        </div>
      </motion.div>

      {/* Bottom glow on hover */}
      <div className="absolute inset-x-4 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Infinite Marquee Strip
// ─────────────────────────────────────────────
const MarqueeStrip = () => {
  const brands = [
    '⭐ Tech Solutions Ethiopia',
    '⭐ Hospitality Group',
    '⭐ Operations Leader',
    '⭐ 150+ Projects Delivered',
    '⭐ 100% Satisfaction Rate',
    '⭐ Top-rated in Ethiopia',
  ];
  const doubled = [...brands, ...brands];

  return (
    <div className="relative overflow-hidden py-5 border-y border-[rgba(0,212,170,0.25)] bg-[rgba(0,212,170,0.05)] mt-16">
      <motion.div
        className="flex gap-14 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((brand, i) => (
          <span
            key={i}
            className="text-[var(--accent)] font-bold text-sm tracking-widest flex-shrink-0"
          >
            {brand}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
const Testimonials = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: 'Abebe Kebede',
      position: 'CEO, Tech Solutions Ethiopia',
      image: person1Img,
      text: 'Best website development company in Ethiopia. Highly professional! Their team delivered exceptional results beyond our expectations.',
      size: 'large',
    },
    {
      id: 2,
      name: 'Tigist Haile',
      position: 'Operations Manager',
      image: person2Img,
      text: 'Their ERP system helped our business improve efficiency by 40%. Highly recommended!',
      size: 'small',
    },
    {
      id: 3,
      name: 'Dawit Mekonnen',
      position: 'Director, Hospitality Group',
      image: person3Img,
      text: 'Outstanding service and support! Truly the best IT partner in Ethiopia.',
      size: 'small',
    },
    {
      id: 4,
      name: 'Meron Alemu',
      position: 'Business Owner, Addis Ababa',
      image: person4Img,
      text: 'Ariva Systems transformed how I run my business. Their website and digital marketing services have tripled my customer reach across Ethiopia in just a few months!',
      size: 'large',
    },
  ];

  // GSAP headline reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.test-word',
        { y: '120%', opacity: 0, rotationX: -90 },
        {
          y: '0%',
          opacity: 1,
          rotationX: 0,
          stagger: 0.07,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      );
      gsap.fromTo('.test-sub',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const headlineWords = ['Trusted', 'by', "Ethiopia's", 'Leaders'];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 sm:py-32 px-[5%] relative overflow-hidden bg-transparent"
    >
      {/* R3F Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <R3FCanvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#00d4aa" />
          <AmbientScene />
        </R3FCanvas>
      </div>
      {/* Dark overlay so content reads clearly */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[rgba(8,14,28,0.65)]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── HEADER ── */}
        <div
          ref={headingRef}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8"
        >
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,212,170,0.35)] bg-[rgba(0,212,170,0.06)] mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[var(--accent)] text-xs font-bold tracking-widest uppercase">Client Stories</span>
            </motion.div>

            {/* Animated headline */}
            <div style={{ perspective: '800px' }}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                {headlineWords.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden mr-3">
                    <span
                      className={`test-word inline-block ${
                        i >= 2 ? 'text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-teal-300' : 'text-white'
                      }`}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </h2>
            </div>
          </div>

          {/* Right side description */}
          <p className="test-sub text-white/50 text-base md:text-lg max-w-sm border-l-2 border-[var(--accent)] pl-6 leading-relaxed">
            We don't just build software — we build the digital backbone of Ethiopian business. Hover and click cards to explore.
          </p>
        </div>

        {/* ── FLIP CARD GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6" style={{ minHeight: '280px' }}>
          {testimonials.map((item, index) => (
            <FlipCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* ── MARQUEE TRUST STRIP ── */}
        <MarqueeStrip />

      </div>
    </section>
  );
};

export default Testimonials;