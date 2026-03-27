import React from 'react';
import { motion } from 'framer-motion';

const OurHistory = () => {
  const milestones = [
    { year: '2022', title: 'Foundation', description: 'Ariva Systems Solutions was founded with a vision to transform Ethiopian businesses through technology.' },
    { year: '2023', title: 'First Milestone', description: 'Successfully delivered first enterprise-grade ERP solutions to local businesses.' },
    { year: '2024', title: 'Expansion', description: 'Expanded services to include web development, digital marketing, and SEO solutions.' },
    { year: '2025', title: 'Growth', description: 'Reached 150+ projects completed and 100% client satisfaction rate.' }
  ];

  return (
    <section className="py-20 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="section-label">Our Journey</span>
          <h2 className="section-title">Our History</h2>
          <p className="text-sm text-[var(--muted)]">From foundation to future — our path of growth and innovation</p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-transparent hidden md:block"></div>
          
          <div className="space-y-12">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} mb-12`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--accent)] border-4 border-[rgba(10,14,26,0.85)] z-10 hidden md:block"></div>
                
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12 text-left'} mb-6 md:mb-0`}>
                  <div className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] transition-all hover:-translate-y-1 group">
                    <div className="text-3xl font-bold text-[var(--accent)] mb-3 group-hover:scale-110 transition-transform inline-block">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[var(--heading)]">{item.title}</h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurHistory;