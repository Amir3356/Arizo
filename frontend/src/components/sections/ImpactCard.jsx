import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from './ImpactCounter';

export const ImpactCard = ({ stat, index, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -10,
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      {/* Animated Gradient Border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)] to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur" />
      
      <div className="relative bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-2xl p-8 text-center hover:border-transparent transition-all duration-300">
        {/* Icon with Pulse Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
          className="relative inline-block mb-4"
        >
          <div className="text-5xl">{stat.icon}</div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3
            }}
            className="absolute inset-0 rounded-full bg-[var(--accent)] blur-xl opacity-0 group-hover:opacity-50 transition-opacity"
          />
        </motion.div>

        {/* Animated Number */}
        <div className="text-5xl md:text-6xl font-bold mb-3" style={{ color: 'var(--accent)' }}>
          <AnimatedCounter end={stat.number} suffix={stat.suffix} />
        </div>

        {/* Label with Slide Animation */}
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="text-xl font-bold mb-2 text-[var(--heading)]"
        >
          {stat.label}
        </motion.h3>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.4 }}
          className="text-sm text-[var(--muted)] leading-relaxed"
        >
          {stat.description}
        </motion.p>

        {/* Animated Underline */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: '30%' } : {}}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
          className="h-0.5 bg-[var(--accent)] mx-auto mt-4 rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default ImpactCard;