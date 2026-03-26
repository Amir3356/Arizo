import React from 'react';
import Footer from '../components/common/Footer';

const Project = () => {
  const projects = [
    { icon: '🌐', title: 'Website Projects', desc: 'Modern, responsive websites for Ethiopian businesses' },
    { icon: '⚙️', title: 'ERP Software', desc: 'Custom enterprise resource planning deployments' },
    { icon: '📱', title: 'Mobile & Web Apps', desc: 'Cross-platform applications built for scale' }
  ];

  return (
    <>
      <section id="portfolio" className="py-20 px-[5%] bg-[var(--bg2)]">
        <div className="section-header centered max-w-[720px] mb-12 mx-auto text-center">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">Portfolio Showcase</h2>
        </div>
        
        <div className="portfolio-grid grid md:grid-cols-3 gap-5">
          {projects.map(project => (
            <div key={project.title} className="portfolio-card rounded-xl bg-[var(--card-bg)] border border-[var(--border)] aspect-[4/3] flex flex-col items-center justify-center gap-2 p-6 text-center transition-all hover:-translate-y-1 hover:border-[rgba(0,212,170,0.3)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,212,170,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="port-icon text-3xl">{project.icon}</div>
              <h3 className="text-base font-bold font-jakarta">{project.title}</h3>
              <p className="text-[0.75rem] text-[var(--muted)]">{project.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Project;