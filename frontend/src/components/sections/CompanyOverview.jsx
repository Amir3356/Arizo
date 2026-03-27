import React from 'react';
import { motion } from 'framer-motion';

const CompanyOverview = () => {
  return (
    <section className="py-20 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="section-label">About Us</span>
          <h2 className="section-title">Who We Are</h2>
          <p className="text-lg leading-relaxed text-[var(--text)] max-w-3xl mx-auto">
            Ariva Systems Solutions - Your Trusted IT Partner in Ethiopia
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-base leading-relaxed text-[var(--muted)]">
            Ariva Systems Solutions is a leading IT and software development company in Ethiopia, 
            dedicated to providing innovative digital solutions that help businesses thrive in the 
            modern digital landscape. With a team of experienced professionals, we deliver 
            high-quality services tailored to meet the unique needs of Ethiopian businesses.
          </p>
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.2)] rounded-full px-6 py-3">
            <span className="text-[var(--accent)] text-sm">✓</span>
            <span className="text-sm text-[var(--text)]">ESTABLISHED 2022</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;