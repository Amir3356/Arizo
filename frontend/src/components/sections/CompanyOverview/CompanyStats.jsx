import React from 'react';
import { motion } from 'framer-motion';

const CompanyStats = ({ stats, statsRef, isVisible }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          ref={el => statsRef.current[index] = el}
          className="group relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-transparent rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-lg" />
          
          <div 
            className="relative bg-[var(--bg3)] backdrop-blur-sm rounded-xl p-4 text-center hover:border-[var(--accent)] transition-all duration-500 hover:shadow-xl group-hover:bg-[rgba(255,255,255,0.02)]"
            style={{ 
              border: '0.5px solid var(--border)',
            }}
          >
            <motion.div
              className="text-2xl mb-2 inline-block text-[var(--accent)]"
              animate={{ 
                y: [0, -3, 0],
                rotate: [0, 3, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5
              }}
            >
              {stat.icon}
            </motion.div>

            <div className="text-2xl md:text-3xl font-semibold mb-1" style={{ color: 'var(--heading)' }}>
              {stat.number}
            </div>

            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-80" style={{ color: 'var(--text)' }}>
              {stat.label}
            </p>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-[1px] bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CompanyStats;