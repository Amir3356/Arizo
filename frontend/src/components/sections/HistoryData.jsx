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
      <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-16 text-center' : 'md:pl-16 text-center'} mb-6 md:mb-0`}>
        <motion.div
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 40px -10px rgba(0,212,170,0.3)"
          }}
          className="relative bg-[rgba(15,21,38,0.6)] backdrop-blur-md p-4 md:p-5 rounded-2xl cursor-pointer"
          style={{ 
            border: '0.2px solid rgba(0, 212, 170, 0.15)',
          }}
        >
          {/* Timeline Dot Connection */}
          <div 
            className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--accent)] hidden md:block shadow-[0_0_15px_rgba(0,212,170,0.6)] z-10
              ${isLeft ? '-right-[calc(2rem+9px)]' : '-left-[calc(2rem+9px)]'}`}
          />
          
          <motion.div
            whileHover={{ scale: 1.1, x: isLeft ? -5 : 5 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="text-2xl md:text-3xl font-bold mb-2 inline-block"
            style={{ color: 'var(--accent)' }}
          >
            {year}
          </motion.div>
          
          <h3 className="text-lg md:text-xl font-bold mb-1.5 text-white">
            {title}
          </h3>
          
          <p className="text-xs md:text-sm text-white/80 leading-relaxed">
            {description}
          </p>
          
          {/* Animated Underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: isLeft ? '100%' : '100%' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-0.5 bg-[var(--accent)] mt-3"
            style={{ width: 0 }}
          />
        </motion.div>
      </div>
      
      {/* Empty spacer */}
      <div className="hidden md:block w-1/2"></div>
    </motion.div>
  );
};