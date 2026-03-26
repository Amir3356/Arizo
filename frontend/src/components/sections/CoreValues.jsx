import React from 'react';

const CoreValues = () => {
  const values = [
    { title: 'Integrity', description: 'We operate with honesty, transparency, and accountability in every interaction.' },
    { title: 'Excellence', description: 'We focus on quality, performance, and sustainable engineering practices.' },
    { title: 'Collaboration', description: 'Strong partnerships and teamwork drive our collective success.' },
    { title: 'Innovation', description: 'We embrace creative thinking and continuous improvement in all we do.' },
    { title: 'Quality', description: 'We deliver exceptional results through attention to detail and craftsmanship.' },
    { title: 'Customer Focus', description: "Our clients' success is at the heart of every decision we make." }
  ];

  return (
    <section className="py-20 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="section-label">Our Core Values</span>
          <h2 className="section-title">What Drives Us</h2>
          <p className="text-sm text-[var(--muted)] max-w-2xl mx-auto">
            The principles that guide our actions and define our culture
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] transition-all hover:-translate-y-1 group"
            >
              <h3 className="text-xl font-bold mb-3 text-[var(--accent)] group-hover:scale-105 transition-transform">
                {value.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;