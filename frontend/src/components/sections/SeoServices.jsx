import React from 'react';

const SeoServices = () => {
  const seoServices = {
    icon: '🔍',
    title: 'SEO Optimization Ethiopia',
    description: 'Professional SEO services to help your website rank on Google and reach more customers.',
    features: [
      'Keyword research for Ethiopia market',
      'On-page SEO optimization',
      'Technical SEO',
      'Link building strategies'
    ]
  };

  return (
    <div 
      className="group rounded-2xl transition-all duration-500 hover:-translate-y-2"
      style={{ 
        backgroundColor: 'rgba(15, 21, 38, 0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="p-6 pb-0">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform group-hover:scale-110 duration-300"
          style={{ 
            backgroundColor: 'rgba(0,212,170,0.15)',
            border: '1px solid rgba(0,212,170,0.3)'
          }}
        >
          {seoServices.icon}
        </div>
        <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--heading)' }}>
          {seoServices.title}
        </h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
          {seoServices.description}
        </p>
      </div>

      <div className="p-6 pt-0">
        <div className="space-y-3">
          {seoServices.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-xs mt-0.5" style={{ color: 'var(--accent)' }}>✓</span>
              <span className="text-sm" style={{ color: 'var(--muted)' }}>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-6 pt-2">
        <a 
          href="#contact" 
          className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3"
          style={{ color: 'var(--accent)' }}
        >
          Learn More
          <span className="text-lg">→</span>
        </a>
      </div>
    </div>
  );
};

export default SeoServices;