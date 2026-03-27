import React from 'react';
import { motion } from 'framer-motion';

const HeroContent = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="hero-inner w-full lg:w-1/2 text-center lg:text-left"
    >
      {/* Badge */}
      <div className="hero-badge inline-flex items-center gap-2 bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.25)] rounded-full px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-medium text-[var(--accent)] mb-4 sm:mb-6 mx-auto lg:mx-0">
        <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse-slow"></span>
        Leading  Company in Ethiopia
      </div>
      
      {/* Title */}
      <h1 className="hero-title text-xl sm:text-2xl md:text-3xl lg:text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-tight tracking-[-0.01em] mb-3 sm:mb-5 text-[var(--heading)] font-jakarta">
        We Build Powerful Websites & <span className="text-[var(--accent)] relative inline-block">ERP Systems</span> That Grow Your Business
      </h1>
      
      {/* Description */}
      <p className="hero-desc text-sm sm:text-base leading-relaxed text-[var(--muted)] max-w-[540px] mb-6 sm:mb-8 font-normal mx-auto lg:mx-0">
        At Ariva Systems Solutions, we create modern websites and intelligent ERP systems in Ethiopia that help businesses automate operations and increase revenue.
      </p>
      
      {/* Buttons */}
      <div className="hero-btns flex gap-3 sm:gap-4 flex-wrap justify-center lg:justify-start">
        <a href="#contact" className="btn-primary text-sm sm:text-base px-5 sm:px-7 py-2 sm:py-3">Start Your Project →</a>
        <a href="#services" className="btn-outline text-sm sm:text-base px-5 sm:px-7 py-2 sm:py-3">Explore Services</a>
      </div>
      
      {/* Stats */}
      <div className="hero-stats flex gap-6 sm:gap-12 mt-8 sm:mt-12 flex-wrap justify-center lg:justify-start">
        <div>
          <div className="stat-num text-xl sm:text-[1.8rem] font-bold text-[var(--heading)]">150<span className="text-[var(--accent)] text-lg sm:text-[1.4rem]">+</span></div>
          <div className="stat-label text-[0.6rem] sm:text-[0.7rem] text-[var(--muted)] uppercase tracking-wider">Projects Delivered</div>
        </div>
        <div>
          <div className="stat-num text-xl sm:text-[1.8rem] font-bold text-[var(--heading)]">100<span className="text-[var(--accent)] text-lg sm:text-[1.4rem]">%</span></div>
          <div className="stat-label text-[0.6rem] sm:text-[0.7rem] text-[var(--muted)] uppercase tracking-wider">Client Satisfaction</div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroContent;