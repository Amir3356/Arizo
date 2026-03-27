import React from 'react';
import { motion } from 'framer-motion';

const CompanyImpact = () => {
  const stats = [
    { number: '150+', label: 'Projects Delivered', description: 'Successful implementations across Ethiopia', icon: '📊' },
    { number: '100%', label: 'Client Satisfaction', description: 'Happy clients who trust our solutions', icon: '⭐' },
    { number: '50+', label: 'Active Clients', description: 'Businesses we serve across industries', icon: '🏢' },
    { number: '3+', label: 'Years Experience', description: 'Building since 2022', icon: '📅' }
  ];

  return (
    <section className="py-20 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="section-label">Our Impact</span>
          <h2 className="section-title">Company Achievements</h2>
          <p className="text-sm text-[var(--muted)]">Measurable results that demonstrate our commitment to excellence</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] transition-all hover:-translate-y-2 group"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-[var(--accent)] mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="font-semibold mb-2 text-[var(--heading)]">{stat.label}</div>
              <p className="text-xs text-[var(--muted)]">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyImpact;