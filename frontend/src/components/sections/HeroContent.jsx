import React from 'react';
import { motion } from 'framer-motion';

const HeroContent = () => {
  // Master container that orchestrates the staggered delay
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  // The physics mapped to every child entering the view
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1] // Custom Webflow-style swift/snap easing
      } 
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="hero-inner w-full lg:w-1/2 text-center lg:text-left"
    >
      {/* Badge */}
      <motion.div variants={itemVariants} className="hero-badge inline-flex items-center gap-2 bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.25)] rounded-full px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-medium text-[var(--accent)] mb-4 sm:mb-6 mx-auto lg:mx-0">
        <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse-slow"></span>
        Leading Company in Ethiopia
      </motion.div>
      
      {/* Title */}
      <motion.h1 variants={itemVariants} className="hero-title text-xl sm:text-2xl md:text-3xl lg:text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-tight tracking-[-0.01em] mb-3 sm:mb-5 text-[var(--heading)] font-jakarta">
        We Build Powerful Websites & <span className="text-[var(--accent)] relative inline-block">ERP Systems</span> That Grow Your Business
      </motion.h1>
      
      {/* Description */}
      <motion.p variants={itemVariants} className="hero-desc text-sm sm:text-base leading-relaxed text-[var(--muted)] max-w-[540px] mb-6 sm:mb-8 font-normal mx-auto lg:mx-0">
        At Ariva Systems Solutions, we create modern websites and intelligent ERP systems in Ethiopia that help businesses automate operations and increase revenue.
      </motion.p>
      
      {/* Buttons */}
      <motion.div variants={itemVariants} className="hero-btns flex gap-3 sm:gap-4 flex-wrap justify-center lg:justify-start overflow-hidden py-2 px-1 -mx-1 -my-2">
        <motion.a 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          href="#contact" 
          className="btn-primary text-sm sm:text-base px-5 sm:px-7 py-2 sm:py-3 shadow-[0_5px_15px_rgba(0,212,170,0.3)] hover:shadow-[0_10px_25px_rgba(0,212,170,0.5)] transition-shadow"
        >
          Start Your Project →
        </motion.a>
        <motion.a 
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }} 
          whileTap={{ scale: 0.95 }}
          href="#services" 
          className="btn-outline text-sm sm:text-base px-5 sm:px-7 py-2 sm:py-3"
        >
          Explore Services
        </motion.a>
      </motion.div>
      
      {/* Stats */}
      <motion.div variants={itemVariants} className="hero-stats flex gap-6 sm:gap-12 mt-8 sm:mt-12 flex-wrap justify-center lg:justify-start">
        <motion.div whileHover={{ y: -5 }} className="cursor-default">
          <div className="stat-num text-xl sm:text-[1.8rem] font-bold text-[var(--heading)]">150<span className="text-[var(--accent)] text-lg sm:text-[1.4rem]">+</span></div>
          <div className="stat-label text-[0.6rem] sm:text-[0.7rem] text-[var(--muted)] uppercase tracking-wider font-semibold">Projects Delivered</div>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="cursor-default">
          <div className="stat-num text-xl sm:text-[1.8rem] font-bold text-[var(--heading)]">100<span className="text-[var(--accent)] text-lg sm:text-[1.4rem]">%</span></div>
          <div className="stat-label text-[0.6rem] sm:text-[0.7rem] text-[var(--muted)] uppercase tracking-wider font-semibold">Client Satisfaction</div>
        </motion.div>
      </motion.div>

    </motion.div>
  );
};

export default HeroContent;