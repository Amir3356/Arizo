import React from 'react';

const PurposeMissionVision = () => {
  return (
    <section className="py-20 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-2xl p-8 text-center hover:border-[var(--accent)] transition-all hover:-translate-y-2 group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
            <h3 className="text-2xl font-bold mb-3 font-jakarta text-[var(--heading)]">Our Purpose</h3>
            <p className="text-sm text-[var(--muted)]">Driving Innovation Through Purpose</p>
          </div>
          
          <div className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-2xl p-8 text-center hover:border-[var(--accent)] transition-all hover:-translate-y-2 group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
            <h3 className="text-2xl font-bold mb-3 font-jakarta text-[var(--heading)]">Our Mission</h3>
            <p className="text-sm text-[var(--muted)]">
              To empower businesses through thoughtfully engineered software solutions that solve real problems and scale with confidence.
            </p>
          </div>
          
          <div className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-2xl p-8 text-center hover:border-[var(--accent)] transition-all hover:-translate-y-2 group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👁️</div>
            <h3 className="text-2xl font-bold mb-3 font-jakarta text-[var(--heading)]">Our Vision</h3>
            <p className="text-sm text-[var(--muted)]">
              To become a trusted technology partner known for reliability, transparency, and long-term impact across industries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurposeMissionVision;