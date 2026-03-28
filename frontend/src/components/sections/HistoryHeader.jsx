import React from 'react';
import { motion } from 'framer-motion';

export const HistoryHeader = ({ controls, fadeInUpVariants }) => {
  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={fadeInUpVariants}
      className="text-center mb-20"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
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
          Our Journey
        </span>
      </motion.div>
      
      <motion.h2 
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
        style={{ color: 'var(--accent)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Our History
      </motion.h2>
    </motion.div>
  );
};