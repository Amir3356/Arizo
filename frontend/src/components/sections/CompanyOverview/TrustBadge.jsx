import React from 'react';
import { motion } from 'framer-motion';

const TrustBadge = ({ isVisible }) => {
  return (
    <motion.div 
      className="pt-8"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : {}}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
        <span className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
            >
              ★
            </motion.span>
          ))}
        </span>
        <span>Trusted by 50+ Ethiopian Businesses</span>
      </div>
    </motion.div>
  );
};

export default TrustBadge;