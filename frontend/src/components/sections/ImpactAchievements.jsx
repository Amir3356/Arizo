import React from 'react';
import { motion } from 'framer-motion';
import { achievements } from './CompanyImpactData';

export const ImpactAchievements = ({ isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="text-center mt-16"
    >
      <div className="inline-flex flex-wrap justify-center gap-3">
        {achievements.map((achievement, idx) => (
          <motion.span
            key={idx}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.9 + idx * 0.1, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ 
              backgroundColor: 'rgba(0,212,170,0.1)',
              border: '1px solid rgba(0,212,170,0.2)'
            }}
          >
            <span className="text-sm">{achievement.icon}</span>
            <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
              {achievement.text}
            </span>
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};