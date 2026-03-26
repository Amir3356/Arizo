import React from 'react';

const CompanyOverview = () => {
  return (
    <section className="py-20 px-[5%] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">About Us</span>
          <h2 className="section-title">Company Overview</h2>
          <p className="text-lg leading-relaxed text-[var(--text)] max-w-3xl mx-auto">
            Reliable digital solutions built with long-term vision
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-base leading-relaxed text-[var(--muted)]">
            We are a technology-driven company focused on building scalable, secure, and future-proof digital products. 
            Our work is grounded in strong engineering principles and long-term partnerships.
          </p>
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.2)] rounded-full px-6 py-3">
            <span className="text-[var(--accent)] text-sm">✓</span>
            <span className="text-sm text-[var(--text)]">TRUSTED BY INDUSTRY LEADERS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;