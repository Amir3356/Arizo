import React from 'react';
import { motion } from 'framer-motion';

const CompanyHeader = ({ isVisible }) => {
  return (
    <div className="space-y-8">
      {/* Animated Badge */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative inline-block"
      >
        <div className="absolute inset-0 bg-[var(--accent)] blur-xl opacity-30 animate-pulse" />
        <span 
          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
          style={{ 
            color: 'var(--accent)',
            backgroundColor: 'rgba(0,212,170,0.1)',
            border: '1px solid rgba(0,212,170,0.3)'
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
          About Us
        </span>
      </motion.div>

      {/* Description - Larger font size */}
      <motion.p 
        className="text-xl md:text-2xl leading-relaxed font-medium"
        style={{ color: 'var(--text)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Ariva Systems Solutions is a leading IT and software development company in Ethiopia, 
        dedicated to providing innovative digital solutions that help businesses thrive in the 
        modern digital landscape.
      </motion.p>

      <motion.p 
        className="text-base"
        style={{ color: 'var(--muted)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        With a team of experienced professionals, we deliver high-quality services tailored to 
        meet the unique needs of Ethiopian businesses.
      </motion.p>
    </div>
  );
};

export default CompanyHeader;