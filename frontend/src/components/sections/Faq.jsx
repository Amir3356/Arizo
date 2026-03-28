import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas as R3FCanvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────
// R3F — Rotating Crystal / DNA Helix Left Panel
// ─────────────────────────────────────────────────────────
const DNAHelix = () => {
  const groupRef = useRef();
  const nodes = 10;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
  });

  const leftNodes = [];
  const rightNodes = [];
  const connectors = [];

  for (let i = 0; i < nodes; i++) {
    const t = (i / nodes) * Math.PI * 2;
    const y = (i / nodes) * 6 - 3;

    const lx = Math.cos(t) * 0.9;
    const lz = Math.sin(t) * 0.9;
    const rx = Math.cos(t + Math.PI) * 0.9;
    const rz = Math.sin(t + Math.PI) * 0.9;

    leftNodes.push({ pos: [lx, y, lz], key: `l${i}` });
    rightNodes.push({ pos: [rx, y, rz], key: `r${i}` });

    if (i % 2 === 0) {
      connectors.push({
        from: [lx, y, lz],
        to: [rx, y, rz],
        key: `c${i}`,
      });
    }
  }

  return (
    <group ref={groupRef}>
      {/* Left strand nodes */}
      {leftNodes.map(({ pos, key }) => (
        <mesh key={key} position={pos}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#00d4aa" emissive="#00d4aa" emissiveIntensity={2} />
        </mesh>
      ))}
      {/* Right strand nodes */}
      {rightNodes.map(({ pos, key }) => (
        <mesh key={key} position={pos}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#5ef0db" emissive="#5ef0db" emissiveIntensity={1.5} />
        </mesh>
      ))}
      {/* Connector rods */}
      {connectors.map(({ from, to, key }) => {
        const start = new THREE.Vector3(...from);
        const end = new THREE.Vector3(...to);
        const dir = new THREE.Vector3().subVectors(end, start);
        const len = dir.length();
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const euler = new THREE.Euler();
        euler.setFromQuaternion(
          new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            dir.normalize()
          )
        );
        return (
          <mesh key={key} position={[mid.x, mid.y, mid.z]} rotation={euler}>
            <cylinderGeometry args={[0.025, 0.025, len, 8]} />
            <meshStandardMaterial color="#00d4aa" transparent opacity={0.5} emissive="#00d4aa" emissiveIntensity={0.8} />
          </mesh>
        );
      })}
    </group>
  );
};

const FAQScene = () => {
  const crystalRef = useRef();

  useFrame((state, delta) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.2;
      crystalRef.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <>
      <Sparkles count={120} scale={12} size={2} speed={0.3} opacity={0.3} color="#00d4aa" />
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={3} color="#00d4aa" />
      <pointLight position={[-3, -3, 3]} intensity={1.5} color="#ffffff" />

      {/* Floating crystal behind DNA */}
      <mesh ref={crystalRef} position={[0, 0, -1]}>
        <octahedronGeometry args={[1.5, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#00d4aa"
          roughness={0}
          metalness={0}
          transparent
          transmission={1}
        />
      </mesh>

      {/* DNA Helix */}
      <Float speed={1.5} floatIntensity={0.6}>
        <DNAHelix />
      </Float>
    </>
  );
};

// ─────────────────────────────────────────────────────────
// Magnetic Question Button
// ─────────────────────────────────────────────────────────
const FaqItem = ({ faq, index, isOpen, onToggle }) => {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smX = useSpring(mx, { damping: 30, stiffness: 350 });
  const smY = useSpring(my, { damping: 30, stiffness: 350 });
  const glowX = useTransform(smX, [0, 1], [0, 100]);
  const glowY = useTransform(smY, [0, 1], [0, 100]);

  const handleMM = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const handleML = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.div
      className="faq-item relative group rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay: index * 0.08,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMM}
      onMouseLeave={handleML}
      style={{
        border: isOpen ? '1px solid rgba(0,212,170,0.5)' : '1px solid rgba(255,255,255,0.07)',
        background: isOpen ? 'rgba(0,212,170,0.04)' : 'rgba(14,21,38,0.8)',
        backdropFilter: 'blur(16px)',
        transition: 'border-color 0.4s, background 0.4s',
      }}
    >
      {/* Cursor glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(0,212,170,0.1) 0%, transparent 55%)`
          ),
        }}
      />

      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-gradient-to-b from-[var(--accent)] to-teal-400"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
      />

      {/* Number badge */}
      <div className="absolute top-5 left-5 w-7 h-7 rounded-full bg-[rgba(0,212,170,0.08)] border border-[rgba(0,212,170,0.2)] flex items-center justify-center">
        <span className="text-[10px] font-black text-[var(--accent)]">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="w-full text-left pl-16 pr-5 py-5 flex justify-between items-center gap-4 transition-all duration-300 hover:bg-[rgba(0,212,170,0.03)] relative z-10"
      >
        <span
          className="font-semibold text-sm sm:text-base md:text-lg flex-1 leading-snug"
          style={{ color: isOpen ? '#ffffff' : 'var(--heading)' }}
        >
          {faq.q}
        </span>

        {/* Animated +/× toggle icon */}
        <motion.div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 relative"
          style={{
            background: isOpen
              ? 'linear-gradient(135deg, rgba(0,212,170,0.3), rgba(0,100,80,0.2))'
              : 'rgba(255,255,255,0.07)',
            border: isOpen ? '1px solid rgba(0,212,170,0.5)' : '1px solid rgba(255,255,255,0.1)',
          }}
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="#00d4aa" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      {/* Answer panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden relative z-10"
          >
            <div className="pl-16 pr-6 pb-6 pt-0">
              <div className="h-px bg-gradient-to-r from-[rgba(0,212,170,0.3)] to-transparent mb-4" />
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 5, opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="text-sm sm:text-base leading-relaxed text-white/75"
              >
                {faq.a}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────
const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const faqs = [
    {
      q: 'How long does it take to build a website in Ethiopia?',
      a: 'Usually 1–3 weeks depending on the project scope, complexity, and content readiness. We\'ll provide a detailed timeline during the initial consultation.',
    },
    {
      q: 'Do you provide ERP systems in Ethiopia?',
      a: 'Yes, we develop custom ERP solutions tailored to your specific business needs and industry. Our ERP systems help streamline operations and improve efficiency.',
    },
    {
      q: 'Can you redesign my existing website?',
      a: 'Yes, we offer professional website redesign services to improve performance, modernize design, and enhance user experience while maintaining your brand identity.',
    },
    {
      q: 'Do you offer post-launch support and maintenance?',
      a: 'Yes, we provide ongoing support and maintenance after project delivery to ensure your systems run smoothly, securely, and stay up-to-date.',
    },
    {
      q: 'Will my website be mobile-friendly?',
      a: 'Absolutely — all our websites are fully responsive and work seamlessly on all devices including phones, tablets, and desktops.',
    },
    {
      q: 'Do you provide hosting and domain services?',
      a: 'Yes, we assist with domain registration and reliable web hosting to get your business online quickly and efficiently.',
    },
  ];

  const toggleFaq = (index) => setOpenIndex(openIndex === index ? null : index);

  // GSAP headline word-by-word reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-word',
        { y: '110%', opacity: 0, rotationX: -80 },
        {
          y: '0%', opacity: 1, rotationX: 0,
          stagger: 0.06, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      );
      gsap.fromTo('.faq-sub',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const headlineWords = ['Frequently', 'Asked', 'Questions'];

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 sm:py-32 px-[5%] relative overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* ══ SPLIT LAYOUT ══════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start">

          {/* ── LEFT: Sticky Panel with 3D Scene ── */}
          <div className="w-full lg:w-[42%] lg:sticky lg:top-28 flex flex-col gap-8">

            {/* Headline */}
            <div ref={headingRef}>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,212,170,0.35)] bg-[rgba(0,212,170,0.06)] mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-[var(--accent)] text-xs font-bold tracking-widest uppercase">Support Center</span>
              </motion.div>

              <div style={{ perspective: '800px' }}>
                <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6" style={{ color: 'var(--heading)' }}>
                  {headlineWords.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden mr-3">
                      <span
                        className={`faq-word inline-block ${
                          i === 2 ? 'text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-teal-300' : ''
                        }`}
                      >
                        {word}
                      </span>
                    </span>
                  ))}
                </h2>
              </div>

              <p className="faq-sub text-sm md:text-base text-[var(--muted)] leading-relaxed mb-6">
                Everything you need to know about our services. Can't find what you're looking for?{' '}
                <a href="#contact" className="text-[var(--accent)] font-semibold hover:underline">Contact us directly →</a>
              </p>

              {/* Quick stat chips */}
              <div className="flex flex-wrap gap-3">
                {['6 Questions', '< 24h Reply', 'Free Consult'].map((chip, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold px-4 py-2 rounded-full border border-[rgba(0,212,170,0.25)] text-[var(--accent)] bg-[rgba(0,212,170,0.05)] tracking-wide"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* R3F 3D Canvas */}
            <div
              className="relative rounded-3xl overflow-hidden border border-[rgba(0,212,170,0.12)] bg-[rgba(8,14,28,0.7)] shadow-2xl"
              style={{ height: '360px' }}
            >
              <R3FCanvas camera={{ position: [0, 0, 7], fov: 50 }}>
                <FAQScene />
              </R3FCanvas>

              {/* label overlay */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
                <div className="inline-flex items-center gap-2 bg-[rgba(0,0,0,0.55)] backdrop-blur-md px-5 py-2.5 rounded-full border border-[rgba(0,212,170,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
                  <span className="text-white/80 text-xs font-bold tracking-widest uppercase">Knowledge Core</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: FAQ Accordion ── */}
          <div className="w-full lg:w-[58%] flex flex-col gap-4 pt-0 lg:pt-16">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => toggleFaq(index)}
              />
            ))}

            {/* CTA at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,170,0.07), rgba(0,100,80,0.05))',
                border: '1px solid rgba(0,212,170,0.2)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="text-3xl">🤔</div>
              <div className="flex-1 text-center sm:text-left">
                <div className="text-white font-bold text-sm mb-1">Still have questions?</div>
                <div className="text-white/50 text-xs">Our team replies within 24 hours</div>
              </div>
              <a
                href="#contact"
                className="px-6 py-3 bg-[var(--accent)] text-black font-bold text-sm rounded-full hover:shadow-[0_8px_25px_rgba(0,212,170,0.4)] hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
              >
                Ask Us Now →
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Faq;