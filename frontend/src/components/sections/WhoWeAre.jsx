import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Assets
import whoWeAreImg from '../../assets/Who we are.jpg';

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
  const sectionRef = useRef(null);
  const textGroupRef = useRef(null);

  const services = [
    'Website design in Ethiopia',
    'ERP system development in Ethiopia',
    'SEO services in Addis Ababa',
    'Digital marketing in Ethiopia',
    'Custom software solutions'
  ];

  // GSAP Webflow-style Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic text reveal as user scrolls into the section
      gsap.fromTo('.reveal-text', 
        { y: 80, opacity: 0, rotateX: -30, transformPerspective: 800 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          stagger: 0.15, 
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Image reveal from the right with a subtle zoom
      gsap.fromTo('.reveal-image',
        { scale: 0.8, opacity: 0, x: 50 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 relative bg-transparent overflow-hidden">
      {/* Background Ambience Bloom */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)] opacity-5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-[5%] relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center pt-10">
          
          {/* Left Text Column */}
          <div ref={textGroupRef} className="w-full lg:w-[50%] flex flex-col justify-center">
            
            <motion.div className="inline-block px-6 py-2.5 rounded-full border border-[var(--accent)] bg-[rgba(0,212,170,0.05)] text-[var(--accent)] text-2xl md:text-3xl font-black tracking-wide uppercase mb-8 w-fit reveal-text">
              Who We Are?
            </motion.div>
            
            <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold mb-8 leading-[1.2] reveal-text text-[var(--heading)] tracking-tighter">
              Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-teal-300">Pioneers</span><br />
              In Ethiopia
            </h2>
            
            <p className="text-lg md:text-xl text-[var(--muted)] mb-10 leading-[1.6] reveal-text">
              <strong>Ariva Systems Solutions</strong> bridges the gap between complex business challenges and elegant, scalable software solutions. From Addis Ababa to the world, we build high-performance digital tools.
            </p>

            {/* Services List - Premium Interactive List */}
            <div className="flex flex-col gap-4 mb-12 w-full">
              {services.map((service, i) => (
                <div key={i} className="reveal-text">
                  <motion.div 
                    whileHover={{ x: 12, backgroundColor: "rgba(0,212,170,0.08)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-center gap-5 p-4 rounded-2xl border border-[var(--border)] bg-[rgba(15,21,38,0.6)] backdrop-blur-md cursor-pointer group shadow-sm w-full lg:max-w-md hover:border-[var(--accent)] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-[rgba(0,212,170,0.1)] flex flex-shrink-0 items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-301 group-hover:shadow-[0_0_20px_rgba(0,212,170,0.4)]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[16px] font-bold text-[var(--heading)] group-hover:text-[var(--accent)] transition-colors duration-300">{service}</span>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Column - Premium Floating Imagery */}
          <div className="w-full lg:w-[50%] h-[500px] lg:h-[700px] reveal-image relative">
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-[rgba(255,255,255,0.05)] bg-[var(--card-bg)] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group"
            >
              <img 
                src={whoWeAreImg} 
                alt="Who We Are at Ariva Systems" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Decorative Corner Glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--accent)] opacity-10 blur-[100px] rounded-full pointer-events-none" />
              
              {/* Sophisticated Glassmorphism Overlay */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 bg-[rgba(255,255,255,0.03)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] p-6 rounded-[2rem] flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-[rgba(0,212,170,0.3)] bg-[rgba(0,212,170,0.1)] flex items-center justify-center text-[var(--accent)] shadow-[0_0_15px_rgba(0,212,170,0.15)]">
                    <svg className="w-6 h-6 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg tracking-tight uppercase">Ethiopia's Digital Leaders</h4>
                    <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase">Paving the way for innovation</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;