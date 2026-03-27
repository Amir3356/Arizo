import React from 'react';
import { motion } from 'framer-motion';

const IndustriesWeServe = () => {
  const industries = [
    { icon: '🏭', name: 'Manufacturing', description: 'Streamline production processes and supply chain management' },
    { icon: '🏨', name: 'Tourism & Hospitality', description: 'Enhance guest experiences with integrated booking systems' },
    { icon: '🏥', name: 'Healthcare', description: 'Digital health records and patient management solutions' },
    { icon: '📚', name: 'Education', description: 'E-learning platforms and student information systems' },
    { icon: '🏠', name: 'Real Estate', description: 'Property management and real estate CRM solutions' },
    { icon: '🏗️', name: 'Construction', description: 'Project management and resource planning tools' },
    { icon: '🌾', name: 'Agriculture', description: 'Farm management and supply chain optimization' },
    { icon: '📦', name: 'Import & Export', description: 'Logistics management and trade compliance systems' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4">
            <span 
              className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
              style={{ 
                color: 'var(--accent)',
                backgroundColor: 'rgba(0,212,170,0.1)',
                border: '1px solid rgba(0,212,170,0.2)'
              }}
            >
              Industries We Serve
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--heading)' }}>
            Industries We Serve <span className="inline-block" style={{ color: 'var(--accent)' }}>(Ethiopia)</span>
          </h2>
          
          <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            We provide tailored software solutions for diverse industries across Ethiopia,
            helping businesses digitize operations and achieve sustainable growth.
          </p>
        </div>

        {/* Industries Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group rounded-xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{ 
                backgroundColor: 'rgba(20,27,48,0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0,212,170,0.1)'
              }}
            >
              <div className="text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{ 
                    backgroundColor: 'rgba(0,212,170,0.15)',
                    border: '1px solid rgba(0,212,170,0.3)'
                  }}
                >
                  {industry.icon}
                </div>
                
                <h3 className="text-base sm:text-lg font-bold mb-2 text-white">
                  {industry.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  {industry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 text-center">
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{ 
              backgroundColor: 'rgba(0,212,170,0.1)',
              border: '1px solid rgba(0,212,170,0.2)'
            }}
          >
            <span className="text-lg">💡</span>
            <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              No matter your industry, we have the right solution for you
            </span>
            <span className="text-lg">→</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;