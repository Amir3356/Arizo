import React from 'react';
import { motion } from 'framer-motion';

const WhoWeAre = () => {
  const services = [
    'Website design in Ethiopia',
    'ERP system development in Ethiopia',
    'SEO services in Addis Ababa',
    'Digital marketing in Ethiopia',
    'Custom software solutions'
  ];

  return (
    <section id="about" className="py-24 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Who We Are</span>
            <h2 className="section-title mb-6">Expert IT Solutions for the Ethiopian Market</h2>
            
            <p className="text-base leading-relaxed text-[var(--muted)] mb-8">
              <strong>Ariva Systems Solutions</strong> is a professional IT and software development company in 
              Ethiopia offering high-quality digital services. We help businesses transform their 
              ideas into powerful digital products with a focus on performance, quality, and 
              long-term support.
            </p>

            <div className="grid gap-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-[rgba(0,212,170,0.1)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-sm font-medium text-[var(--heading)]">{service}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Visual Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-[rgba(15,21,38,0.9)] backdrop-blur-sm border border-[var(--border)] p-8 md:p-12 rounded-[2rem] shadow-2xl relative z-10">
              <h3 className="text-2xl font-bold text-[var(--heading)] mb-4">Driving Digital Transformation</h3>
              <p className="text-[var(--muted)] text-sm leading-loose mb-6">
                We bridge the gap between complex business challenges and simple, 
                elegant software solutions. From Addis Ababa to the world, 
                we build tools that scale.
              </p>
              <div className="flex items-center gap-4 border-t border-[var(--border)] pt-6">
                <div className="bg-[var(--accent)] text-white font-bold px-4 py-2 rounded-lg text-sm">
                  100% Local Support
                </div>
                <span className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">Quality Guaranteed</span>
              </div>
            </div>
            {/* Soft Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[var(--accent)] to-transparent opacity-10 blur-2xl rounded-full"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;