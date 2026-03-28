import React from 'react';
import { motion } from 'framer-motion';

const CompanyStats = ({ stats, statsRef, isVisible }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          ref={el => statsRef.current[index] = el}
          className="group relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-transparent rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
          
          <div className="relative bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-2xl p-6 text-center hover:border-[var(--accent)] transition-all duration-500 hover:shadow-2xl">
            <motion.div
              className="text-4xl mb-4 inline-block"
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5
              }}
            >
              {stat.icon}
            </motion.div>

            <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#ffffff' }}>
              {stat.number}
            </div>

            <p className="text-sm font-semibold" style={{ color: '#ffffff' }}>
              {stat.label}
            </p>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CompanyStats;