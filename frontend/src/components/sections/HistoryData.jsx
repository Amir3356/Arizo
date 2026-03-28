import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Milestones Data
export const milestonesData = [
  { 
    year: '2022', 
    title: 'The Beginning', 
    description: 'Ariva Systems Solutions was founded with a vision to transform Ethiopian businesses through innovative technology solutions.',
    icon: '🌟'
  },
  { 
    year: '2023', 
    title: 'First Milestone', 
    description: 'Successfully delivered first enterprise-grade ERP solutions to local businesses, achieving 100% client satisfaction.',
    icon: '🚀'
  },
  { 
    year: '2024', 
    title: 'Expansion & Growth', 
    description: 'Expanded services to include web development, digital marketing, SEO solutions, and reached 150+ projects completed.',
    icon: '📈'
  },
  { 
    year: '2025', 
    title: 'Future Vision', 
    description: 'Focused on long-term partnerships, innovation, and becoming Ethiopia\'s most trusted technology partner.',
    icon: '🎯'
  }
];

// Timeline Item Component - All text in pure white
export const TimelineItem = ({ year, title, description, index, isLeft }) => {
  const itemRef = useRef();
  const controls = useAnimation();
  const isInView = useInView(itemRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      
      gsap.fromTo(itemRef.current,
        { 
          y: 50, 
          opacity: 0,
          rotationY: isLeft ? -15 : 15
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [isInView, controls, index, isLeft]);

  const variants = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        delay: index * 0.15,
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      ref={itemRef}
      variants={variants}
      initial="hidden"
      animate={controls}
      className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} mb-16 md:mb-0`}
    >
      {/* Timeline Dot with Pulse Animation */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.2, type: "spring" }}
          className="relative"
        >
          <div className="w-5 h-5 rounded-full bg-[var(--accent)] border-4 border-[rgba(10,14,26,0.85)] shadow-lg" />
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
            className="absolute inset-0 w-5 h-5 rounded-full bg-[var(--accent)] opacity-50"
          />
        </motion.div>
      </div>
      
      {/* Content */}
      <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-16 text-right' : 'md:pl-16 text-left'} mb-6 md:mb-0`}>
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--accent)] transition-all group relative overflow-hidden"
        >
          {/* Glow Effect on Hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(0,212,170,0.1), transparent)',
              pointerEvents: 'none'
            }}
          />
          
          <motion.div
            whileHover={{ scale: 1.1, x: isLeft ? -5 : 5 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="text-4xl md:text-5xl font-bold mb-4 inline-block"
            style={{ color: 'var(--accent)' }}
          >
            {year}
          </motion.div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            {title}
          </h3>
          
          <p className="text-base text-white leading-relaxed">
            {description}
          </p>
          
          {/* Animated Underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: isLeft ? '100%' : '100%' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-0.5 bg-[var(--accent)] mt-4"
            style={{ width: 0 }}
          />
        </motion.div>
      </div>
      
      {/* Empty spacer */}
      <div className="hidden md:block w-1/2"></div>
    </motion.div>
  );
};