import React from 'react';
import { motion } from 'framer-motion';

const LeadershipTeam = () => {
  const leaders = [
    {
      name: 'Debeb Ketema Adugna',
      title: 'Chief Executive Officer & Founder',
      description: 'Visionary tech leader with 15+ years of experience driving digital transformation across Ethiopian enterprises.',
      icon: '👨‍💼'
    },
    {
      name: 'Muluken Tilahun Molla',
      title: 'Chief Operating Officer (COO)',
      description: 'Technology innovator specializing in scalable cloud architectures and enterprise software systems.',
      icon: '👨‍💻'
    },
    {
      name: 'Ayana Basha Challie',
      title: 'Chief Technology Officer (CTO)',
      description: 'Operations excellence expert focused on scaling business processes and ensuring exceptional client delivery.',
      icon: '👩‍💻'
    }
  ];

  return (
    <section className="py-20 px-[5%] bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">Our Leadership</span>
          <h2 className="section-title">Experienced Leadership</h2>
          <p className="text-sm text-[var(--muted)] max-w-2xl mx-auto">
            Visionary Leaders Driving Innovation in Ethiopia
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] transition-all hover:-translate-y-2 group"
            >
              <div className="text-5xl mb-4">{leader.icon}</div>
              <h3 className="text-xl font-bold mb-1 text-[var(--heading)]">{leader.name}</h3>
              <p className="text-sm text-[var(--accent)] mb-3">{leader.title}</p>
              <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">{leader.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;