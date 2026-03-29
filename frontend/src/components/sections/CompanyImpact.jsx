import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedNumber = ({ target, suffix, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (typeof target === 'string') {
      setCount(target);
      return;
    }

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return <>{count}{suffix}</>;
};

const CompanyImpact = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const stats = [
    { number: 150, suffix: '+', label: 'Projects Delivered', description: 'Successful implementations across Ethiopia', icon: '🚀' },
    { number: 100, suffix: '%', label: 'Client Satisfaction', description: 'Happy clients who trust our solutions', icon: '⭐' },
    { number: 50, suffix: '+', label: 'Active Clients', description: 'Businesses we serve across industries', icon: '🏢' },
    { number: '24/7', suffix: '', label: 'Support Available', description: 'Around the clock technical assistance', icon: '🕐' }
  ];

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  // GSAP Parallax Effect
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { backgroundPosition: '50% 0%' },
        {
          backgroundPosition: '50% 100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-[5%] relative overflow-hidden"
      style={{ 
        backgroundColor: 'transparent',
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(0,212,170,0.03) 0%, transparent 70%)'
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span 
              className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
              style={{ 
                color: 'var(--accent)',
                backgroundColor: 'rgba(0,212,170,0.1)',
                border: '1px solid rgba(0,212,170,0.2)'
              }}
            >
              Our Impact
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--heading)' }}>
            Company <span style={{ color: 'var(--accent)' }}>Achievements</span>
          </h2>

          <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            Measurable results that demonstrate our commitment to excellence
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute -inset-0 bg-gradient-to-r from-[var(--accent)] to-cyan-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              
              <div 
                className="relative bg-[var(--bg3)] backdrop-blur-sm rounded-xl p-5 text-center transition-all duration-300"
                style={{
                  border: '0.2px solid rgba(0, 212, 170, 0.15)'
                }}
              >
                <div className="text-2xl mb-3 opacity-80">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-semibold mb-2 tracking-tight" style={{ color: 'var(--accent)' }}>
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} isInView={isVisible} />
                </div>
                <h3 className="text-sm font-bold mb-1.5 text-[var(--heading)]">{stat.label}</h3>
                <p className="text-[10px] text-[var(--text)] opacity-70 leading-relaxed">{stat.description}</p>
                <div className="mt-3 h-0.5 w-6 mx-auto bg-[var(--accent)] rounded-full opacity-50" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-16">
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{ 
              backgroundColor: 'rgba(0,212,170,0.05)',
              border: '1px solid rgba(0,212,170,0.2)'
            }}
          >
            <span className="text-xl">⭐</span>
            <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              Trusted by industry leaders worldwide
            </span>
            <span className="text-xl">⭐</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyImpact;