import React from 'react';

const ErpSection = () => {
  return (
    <section id="erp" className="py-20 px-[5%] bg-[var(--bg2)]">
      <div className="max-w-7xl mx-auto">
        <div className="erp-inner grid md:grid-cols-[1.2fr_1fr] gap-15 items-center">
          <div className="erp-text reveal">
            <div className="tag inline-block text-[0.65rem] font-semibold tracking-[1px] uppercase bg-[rgba(245,166,35,0.1)] border border-[rgba(245,166,35,0.3)] text-[var(--accent2)] rounded px-2 py-0.5 mb-3">
              ERP Spotlight
            </div>
            <span className="section-label">Enterprise Solutions</span>
            <h2 className="section-title">ERP & Software Highlight Section</h2>
            <p className="erp-description text-sm leading-relaxed text-[var(--muted)] mb-6">
              Our advanced ERP systems in Ethiopia help businesses improve productivity and efficiency.
              With Ariva ERP solutions, you can:
            </p>
            <div className="erp-features flex flex-col gap-3 mt-6">
              {[
                'Automate business operations',
                'Track performance in real-time',
                'Improve decision-making',
                'Manage resources efficiently'
              ].map(feat => (
                <div key={feat} className="erp-feat flex items-center gap-3 text-sm font-normal group hover:translate-x-1 transition-transform">
                  <div className="w-5 h-5 rounded-full bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.3)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div>
                  </div>
                  <span className="text-[var(--text)]">{feat}</span>
                </div>
              ))}
            </div>
            <div className="erp-cta mt-8">
              <a href="#contact" className="btn-primary">Request a Demo →</a>
            </div>
          </div>
          
          <div className="erp-visual bg-[var(--bg3)] border border-[var(--border)] rounded-2xl p-8 relative reveal">
            <div className="erp-stat-grid grid grid-cols-2 gap-4">
              {[
                { num: '99%', label: 'System Uptime' },
                { num: '40%', label: 'Cost Reduction' },
                { num: '3×', label: 'Faster Operations' },
                { num: '24/7', label: 'Support Available' }
              ].map(stat => (
                <div key={stat.label} className="erp-stat bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 text-center transition-all hover:border-[var(--accent)] hover:-translate-y-1">
                  <div className="num font-jakarta text-[1.6rem] font-bold text-[var(--accent)]">{stat.num}</div>
                  <div className="label text-[11px] text-[var(--muted)] mt-1.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErpSection;