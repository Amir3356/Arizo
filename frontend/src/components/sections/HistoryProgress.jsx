import React from 'react';
import { motion } from 'framer-motion';
import { milestonesData } from './HistoryData';

export const HistoryProgress = ({ progress }) => {
  return (
    <motion.div 
      className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50 hidden lg:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex flex-col items-center gap-2">
        {milestonesData.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              progress * milestonesData.length > idx ? 'bg-[var(--accent)] scale-150' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};