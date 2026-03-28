import React from 'react';
import { motion } from 'framer-motion';

const CompanyCTA = ({ isVisible }) => {
  return (
    <motion.div 
      className="flex gap-4 pt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <motion.a
        href="#contact"
        className="relative group overflow-hidden px-8 py-3 rounded-full font-semibold"
        style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10">Start a Project</span>
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
          style={{ opacity: 0.2 }}
        />
      </motion.a>
      
      <motion.a
        href="#services"
        className="relative group px-8 py-3 rounded-full font-semibold border-2 transition-all duration-300"
        style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,212,170,0.1)' }}
        whileTap={{ scale: 0.95 }}
      >
        Explore Services
      </motion.a>
    </motion.div>
  );
};

export default CompanyCTA;