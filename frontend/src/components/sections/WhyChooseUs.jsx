import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const reasons = [
    { 
      icon: '⏱️', 
      title: 'Reliable and on-time delivery', 
      description: 'We respect your timeline and always deliver on our commitments.',
      color: '#00d4aa'
    },
    { 
      icon: '💬', 
      title: 'Transparent communication', 
      description: 'Clear, consistent updates throughout every project phase.',
      color: '#00d4aa'
    },
    { 
      icon: '🛠️', 
      title: 'Ongoing support and maintenance', 
      description: "We don't disappear after launch — we stay with you.",
      color: '#00d4aa'
    },
    { 
      icon: '🎯', 
      title: 'Customized solutions tailored to your business needs', 
      description: 'Every solution is tailored specifically to your business requirements.',
      color: '#00d4aa'
    },
    { 
      icon: '⚡', 
      title: 'High-performance and scalable systems', 
      description: 'Built to grow with your business and handle increasing demands.',
      color: '#00d4aa'
    },
    { 
      icon: '📈', 
      title: 'SEO-optimized websites for better ranking in Ethiopia', 
      description: 'Get discovered by more customers with our SEO expertise.',
      color: '#00d4aa'
    },
    { 
      icon: '🔒', 
      title: 'Strong focus on security and data protection', 
      description: 'Your data is protected with enterprise-grade security measures.',
      color: '#00d4aa'
    }
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="why-choose" className="py-16 sm:py-20 md:py-24 px-[5%] relative overflow-hidden bg-transparent">
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
              Why Choose Us
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--heading)' }}>
            Why Choose <span style={{ color: 'var(--accent)' }}>Ariva Systems Solutions</span>
          </h2>
          
          <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            We are committed to delivering the best digital solutions in Ethiopia.
          </p>
        </div>

        {/* Reasons Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group rounded-xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ 
                backgroundColor: 'rgba(20,27,48,0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0,212,170,0.1)'
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{ 
                    backgroundColor: 'rgba(0,212,170,0.15)',
                    border: '1px solid rgba(0,212,170,0.3)'
                  }}
                >
                  {reason.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold mb-2 text-white">
                    {reason.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge */}
        <div className="mt-12 md:mt-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-4 px-6 py-4 rounded-full"
            style={{ 
              backgroundColor: 'rgba(0,212,170,0.05)',
              border: '1px solid rgba(0,212,170,0.2)'
            }}
          >
            <span className="text-2xl">⭐</span>
            <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              Trusted by businesses across Ethiopia
            </span>
            <span className="text-2xl">⭐</span>
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 text-center">
          <a 
            href="#contact" 
            className="btn-primary inline-flex items-center gap-2"
          >
            Work With Us
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;