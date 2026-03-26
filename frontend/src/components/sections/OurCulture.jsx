import React from 'react';

const OurCulture = () => {
  const culturePoints = [
    { icon: '🤝', title: 'Collaboration', description: 'Cross-functional teams working together to solve complex problems' },
    { icon: '💡', title: 'Innovation', description: 'Freedom to experiment and bring new ideas to life' },
    { icon: '📈', title: 'Growth', description: 'Continuous learning and opportunities to advance' }
  ];

  return (
    <section className="py-20 px-[5%] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">Work Environment</span>
          <h2 className="section-title">Our Culture</h2>
          <p className="text-sm text-[var(--muted)] max-w-2xl mx-auto">
            We've built an environment where collaboration, innovation, and growth are part of everyday life
          </p>
        </div>
        
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-4 text-center text-[var(--heading)]">How We Work</h3>
          <p className="text-center text-[var(--muted)] mb-10 max-w-3xl mx-auto leading-relaxed">
            We believe in cross-functional collaboration where every voice matters. Our teams work together in an open, 
            supportive environment that encourages innovation and continuous learning. We celebrate wins together and 
            support each other through challenges.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {culturePoints.map((point, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{point.icon}</div>
                <h4 className="text-xl font-bold mb-2 text-[var(--heading)]">{point.title}</h4>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurCulture;