import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas as R3FCanvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

// Stats config (module scope so the intersection observer subscribes once without stale deps)
const ERP_STATS = [
  { key: 'uptime', end: 99, label: 'System Uptime', suffix: '%', duration: 4500 },
  { key: 'reduction', end: 40, label: 'Cost Reduction', suffix: '%', duration: 4500 },
  { key: 'faster', end: 3, label: 'Faster Operations', suffix: '×', duration: 4500 },
  { key: 'support', end: 24, label: 'Support Available', suffix: '/7', duration: 4500 }
];

// -------------------------------------------------------------
// R3F Abstract Floating Element Behind Cards
// -------------------------------------------------------------
const FloatingStructures = () => {
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    groupRef.current.rotation.x += delta * 0.1;
    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Outer Frosted Glass Ring */}
        <mesh>
          <torusGeometry args={[3, 0.8, 64, 128]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={0.95} 
            opacity={1} 
            metalness={0.1} 
            roughness={0.05} 
            ior={1.4} 
            thickness={1.5} 
          />
        </mesh>
        
        {/* Inner Glowing Wireframe Core */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.4, 16, 64]} />
          <meshStandardMaterial 
            color="#00d4aa" 
            wireframe={true} 
            emissive="#00d4aa" 
            emissiveIntensity={1} 
            transparent 
            opacity={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
};

// -------------------------------------------------------------
// Framer Motion 3D Hover Tilt Card
// -------------------------------------------------------------
const TiltCard = ({ feature, idx, iconPreview, onIconUpload }) => {
  // Motion values for pointer position
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  // Spring configurations for smooth physical feel
  const smoothX = useSpring(x, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(y, { damping: 20, stiffness: 300 });
  
  // Map normalized coordinates to rotation angles (+15 to -15 degrees)
  const rotateX = useTransform(smoothY, [0, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [0, 1], [-15, 15]);

  const fileInputRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onIconUpload(idx, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ perspective: "1500px" }} className="w-full h-full relative z-20">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full group rounded-3xl relative will-change-transform cursor-pointer"
      >
        {/* The Glass Background Plane */}
        <div 
          className="absolute inset-0 rounded-3xl bg-[rgba(20,27,48,0.6)] backdrop-blur-xl border border-[rgba(0,212,170,0.2)] shadow-2xl transition-colors duration-500 group-hover:border-[var(--accent)] group-hover:bg-[rgba(20,27,48,0.85)]"
          style={{ transform: "translateZ(-20px)" }}
        />
        
        {/* The Content Plane, floating slightly forward */}
        <div 
          className="p-6 sm:p-7 relative z-10 flex flex-col items-start h-full"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-14 h-14 rounded-[1.1rem] flex items-center justify-center shadow-[0_0_20px_rgba(0,212,170,0.15)] bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.3)] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              {iconPreview ? (
                <img src={iconPreview} alt="icon" className="w-full h-full object-cover rounded-[1.1rem]" />
              ) : (
                <span className="text-xs text-white/50 text-center leading-tight px-1">Choose<br/>File</span>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
              {feature.title}
            </h4>
          </div>
          <p className="text-sm text-white/70 leading-relaxed font-medium">
            {feature.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// -------------------------------------------------------------
// Request Demo Button - R3F + Framer Motion 3D shell
// -------------------------------------------------------------
const RequestDemoBackground = () => {
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.25;
      ringRef.current.rotation.y += delta * 0.42;
      ringRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group ref={ringRef}>
      <mesh rotation={[0, 1.2, 0]}>
        <torusGeometry args={[1.6, 0.18, 24, 64]} />
        <meshStandardMaterial
          color="#00e3bd"
          emissive="#00d4aa"
          emissiveIntensity={1}
          metalness={0.7}
          roughness={0.18}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[1.2, 0.1, 16, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const RequestDemoWithR3F = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      initial={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="relative inline-flex items-center"
    >
      <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden opacity-80">
        <R3FCanvas
          gl={{ alpha: true }}
          className="w-full h-full"
          camera={{ position: [0, 0, 6], fov: 40 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.45} />
          <directionalLight position={[4, 5, 5]} intensity={1} color="#00d4aa" />
          <pointLight position={[-3, -2, 2]} intensity={0.8} color="#09e0c1" />
          <RequestDemoBackground />
        </R3FCanvas>
      </div>

      <motion.a
        href="#contact"
        whileHover={{ rotateX: 2, rotateY: -2 }}
        whileTap={{ scale: 0.95 }}
        className="relative px-6 py-3 rounded-full bg-[var(--accent)] border-[0.5px] border-[var(--border)] text-black font-semibold uppercase tracking-wide text-xs shadow-[0_3px_10px_rgba(0,212,170,0.2)] hover:shadow-[0_6px_18px_rgba(0,212,170,0.35)] focus:outline-none"
      >
        Request a Demo
      </motion.a>
    </motion.div>
  );
};

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------
const ErpSection = () => {
  const [counts, setCounts] = useState({
    uptime: 0,
    reduction: 0,
    faster: 0,
    support: 0
  });
  
  const [activeFeature, setActiveFeature] = useState(null);
  const [iconPreviews, setIconPreviews] = useState({});
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const hasStatsAnimatedRef = useRef(false);

  const handleIconUpload = (idx, dataUrl) => {
    setIconPreviews(prev => ({ ...prev, [idx]: dataUrl }));
  };

  const features = [
    {
      title: 'Business Process Automation',
      description: 'Streamline workflows and eliminate manual tasks instantly.'
    },
    {
      title: 'Resource Management Systems',
      description: 'Optimize resource allocation and utilization effortlessly.'
    },
    {
      title: 'Real-time Reporting',
      description: 'Instant insights with beautiful live data analytics dashboards.'
    },
    {
      title: 'Scalable ERP Solutions',
      description: 'Grow your business with robust infrastructure systems that scale.'
    }
  ];

  // GSAP General Entrance Animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.erp-gsap-reveal', 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 1, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Intersection Observer: subscribe once + ref guard so WebKit / fast scroll does not
  // re-fire before React state updates (which was restarting the slow count on scroll).
  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    const easeOutCubic = (t) => 1 - (1 - t) ** 3;

    const animateNumber = (key, endValue, duration) => {
      let startTimestamp = null;
      const startValue = 0;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const linear = Math.min((timestamp - startTimestamp) / duration, 1);
        const progress = easeOutCubic(linear);
        const currentValue = Math.floor(progress * (endValue - startValue) + startValue);

        setCounts((prev) => ({ ...prev, [key]: currentValue }));

        if (linear < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCounts((prev) => ({ ...prev, [key]: endValue }));
        }
      };

      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasStatsAnimatedRef.current) return;
        hasStatsAnimatedRef.current = true;
        ERP_STATS.forEach((stat) => {
          animateNumber(stat.key, stat.end, stat.duration);
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <section 
      id="erp" 
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 px-[5%] relative overflow-hidden bg-transparent"
    >
      <div ref={triggerRef} className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          
          {/* Left Side - Text Content */}
          <div className="w-full lg:w-[45%] text-left">
            <div className="erp-gsap-reveal inline-block mb-6">
              <span 
                className="text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full"
                style={{ 
                  color: 'var(--accent)',
                  backgroundColor: 'rgba(0,212,170,0.08)',
                  border: '1px solid rgba(0,212,170,0.3)'
                }}
              >
                ERP Spotlight
              </span>
            </div>
            
            <span className="erp-gsap-reveal block mb-3 font-semibold text-lg text-[var(--text)] uppercase tracking-widest">Enterprise Solutions</span>
            
            <h2 className="erp-gsap-reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 leading-[1.1]" style={{ color: 'var(--heading)' }}>
              ERP & Software
            </h2>
            
            <p className="erp-gsap-reveal text-base lg:text-lg leading-relaxed text-[var(--muted)] mb-10">
              Our advanced ERP systems in Ethiopia help businesses dramatically improve productivity and operational efficiency. 
              With Ariva ERP solutions, you can effortlessly scale and centralize processes.
            </p>
            
            <div className="erp-gsap-reveal grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                'Automate business operations',
                'Track performance in real-time',
                'Improve decision-making',
                'Manage resources efficiently'
              ].map(feat => {
                const isActive = activeFeature === feat;
                return (
                <div 
                  key={feat} 
                  onClick={() => setActiveFeature(feat)}
                  className={`flex items-center gap-4 group cursor-pointer p-2 rounded-lg transition-colors ${isActive ? 'bg-[rgba(0,212,170,0.05)]' : 'hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.02)]'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isActive ? 'bg-[var(--accent)]' : 'bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.3)] group-hover:bg-[var(--accent)]'}`}>
                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isActive ? 'bg-white' : 'bg-[var(--accent)] group-hover:bg-white'}`}></div>
                  </div>
                  <span className={`text-sm font-bold transition-colors ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text)] group-hover:text-[var(--accent)]'}`}>
                    {feat}
                  </span>
                </div>
              )})}
            </div>
            
            <div className="erp-gsap-reveal">
              <div className="w-fit mx-auto md:mx-0">
                <RequestDemoWithR3F />
              </div>
            </div>
          </div>
          
          {/* Right Side - Visual Cards with 3D Tilt & R3F Canvas */}
          <div className="w-full lg:w-[55%] relative erp-gsap-reveal">
             
             {/* R3F True 3D Background Element */}
             <div className="absolute inset-[-100px] z-0 pointer-events-none opacity-60">
                <R3FCanvas camera={{ position: [0, 0, 10], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4aa" />
                  <InteractiveDataCoreBackground />
                  <Environment preset="night" />
                </R3FCanvas>
             </div>

            {/* Parallax UI Grid Overlay */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 w-full">
              {features.map((feature, idx) => (
                <TiltCard key={idx} feature={feature} idx={idx} iconPreview={iconPreviews[idx]} onIconUpload={handleIconUpload} />
              ))}
            </div>
            
          </div>
        </div>
        
        {/* Stats Section with Animated Numbers */}
        <div className="mt-20 md:mt-28 relative z-20 erp-gsap-reveal">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {ERP_STATS.map((stat) => (
              <div 
                key={stat.label} 
                className="bg-gradient-to-b from-[rgba(26,34,64,0.9)] to-[rgba(15,21,38,0.9)] backdrop-blur-md rounded-3xl p-5 sm:p-6 text-center transition-all duration-500 hover:border-[rgba(0,212,170,0.35)] hover:-translate-y-1 group shadow-xl relative overflow-hidden border border-[rgba(255,255,255,0.06)]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-700 pointer-events-none rounded-full" />
                
                <div className="text-2xl sm:text-3xl lg:text-3xl font-extrabold tracking-tight mb-1.5 drop-shadow-[0_0_12px_rgba(0,212,170,0.25)]" style={{ color: 'var(--accent)' }}>
                  {counts[stat.key]}
                  {stat.suffix}
                </div>
                <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[var(--muted)] mt-1.5 group-hover:text-white transition-colors duration-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Extracted Canvas Content separate for HMR robustness
function InteractiveDataCoreBackground() {
  return (
    <>
      <FloatingStructures />
    </>
  )
}

export default ErpSection;