import React from 'react';
import { motion } from 'framer-motion';

// Section Header with Webflow-style animations
export const LeaderHeader = ({ 
  badge = "Our Leadership", 
  title = "Experienced Leadership", 
  subtitle = "Visionary Leaders Driving Innovation",
  description = "Our leadership team brings a strong technical background, business insight, and a commitment to building long-lasting products and partnerships.",
  controls,
  fadeInUpVariants
}) => {
  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={fadeInUpVariants}
      className="text-center mb-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="inline-block mb-4"
      >
        <span 
          className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
          style={{ 
            color: 'var(--accent)',
            backgroundColor: 'rgba(0,212,170,0.1)',
            border: '1px solid rgba(0,212,170,0.2)'
          }}
        >
          {badge}
        </span>
      </motion.div>
      
      <motion.h2 
        className="section-title"
        style={{ color: 'var(--heading)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {title}
      </motion.h2>
      
      <motion.p 
        className="text-sm text-[var(--muted)] max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {subtitle}
      </motion.p>
      
      <motion.p 
        className="text-sm text-[var(--muted)] mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

// Section Title with decorative line
export const SectionTitle = ({ title, count, delay = 0.6 }) => {
  return (
    <motion.div 
      className="flex items-center gap-3 mb-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="w-1 h-6 bg-[var(--accent)] rounded-full"></div>
      <h3 className="text-xl font-bold text-[var(--heading)]">{title}</h3>
      <span className="text-sm text-[var(--muted)]">({count})</span>
    </motion.div>
  );
};

// Card hover animations
export const cardHoverVariants = {
  hover: {
    y: -10,
    transition: { duration: 0.3 }
  }
};

// Image hover animation
export const imageHoverVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.5 }
  }
};

// Text hover animation
export const textHoverVariants = {
  hover: {
    x: 5,
    transition: { duration: 0.2 }
  }
};