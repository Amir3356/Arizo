import React from 'react';

const WorkWithUs = () => {
  return (
    <section className="py-20 px-[5%] bg-[var(--bg2)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center bg-gradient-to-r from-[rgba(0,212,170,0.1)] to-transparent rounded-2xl p-12 border border-[var(--border)]">
          <h2 className="text-3xl font-bold mb-4 text-[var(--heading)]">Work With Us</h2>
          <p className="text-[var(--muted)] mb-8 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate on your next project.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a href="#contact" className="btn-primary inline-flex items-center gap-2">
              Start a Conversation <span>→</span>
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--muted)]">
            <span className="flex items-center gap-2">
              <span className="text-[var(--accent)]">✓</span> Quick Response
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[var(--accent)]">✓</span> Free Consultation
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[var(--accent)]">✓</span> No Commitment
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkWithUs;