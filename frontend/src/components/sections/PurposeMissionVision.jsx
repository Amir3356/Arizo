import React from 'react';
import { motion } from 'framer-motion';

const PurposeMissionVision = () => {
  const items = [
    {
      icon: '🎯',
      title: 'Our Purpose',
      description: 'To empower Ethiopian businesses through innovative technology solutions that drive growth and efficiency.'
    },
    {
      icon: '🚀',
      title: 'Our Mission',
      description: 'To deliver high-quality, scalable software solutions that solve real business problems and create lasting value for our clients.'
    },
    {
      icon: '👁️',
      title: 'Our Vision',
      description: 'To become Ethiopia\'s most trusted technology partner, recognized for excellence, innovation, and customer satisfaction.'
    }
  ];

  return (
    <section className="py-20 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-2xl p-8 text-center hover:border-[var(--accent)] transition-all hover:-translate-y-2 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-3 font-jakarta text-[var(--heading)]">{item.title}</h3>
              <p className="text-sm text-white/80 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PurposeMissionVision;