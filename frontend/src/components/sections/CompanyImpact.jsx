import React from 'react';

const CompanyImpact = () => {
  const stats = [
    { number: '123+', label: 'Clients Served', description: 'Enterprise companies trust our solutions', icon: '🏢' },
    { number: '840+', label: 'Projects Delivered', description: 'Successful implementations worldwide', icon: '📊' },
    { number: '10+', label: 'Countries Reached', description: 'Global presence across continents', icon: '🌍' },
    { number: '3', label: 'Years of Experience', description: 'Building since 2022', icon: '⭐' }
  ];

  return (
    <section className="py-20 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="section-label">Our Impact</span>
          <h2 className="section-title">Company Achievements</h2>
          <p className="text-sm text-[var(--muted)]">Measurable results that demonstrate our commitment to excellence</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] transition-all hover:-translate-y-2 group"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-4xl font-bold text-[var(--accent)] mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="font-semibold mb-2 text-[var(--heading)]">{stat.label}</div>
              <p className="text-xs text-[var(--muted)]">{stat.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <div className="inline-flex flex-wrap justify-center gap-3">
            {['✓', '✓', '✓', '✓'].map((check, i) => (
              <span key={i} className="text-[var(--accent)] text-xl">✓</span>
            ))}
          </div>
          <p className="text-sm text-[var(--text)] mt-3 font-medium">
            Trusted by industry leaders worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompanyImpact;