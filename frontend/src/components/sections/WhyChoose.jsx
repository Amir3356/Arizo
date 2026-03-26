import React from 'react';

const WhyChoose = () => {
  const reasons = [
    { title: 'Reliable and on-time delivery', desc: 'We respect your timeline and always deliver on our commitments.' },
    { title: 'Transparent communication', desc: 'Clear, consistent updates throughout every project phase.' },
    { title: 'Ongoing support and maintenance', desc: "We don't disappear after launch — we stay with you." },
    { title: 'Customized solutions tailored to your business needs', desc: 'Every solution is tailored specifically to your business requirements.' },
    { title: 'High-performance and scalable systems', desc: 'Built to grow with your business and handle increasing demands.' },
    { title: 'SEO-optimized websites for better ranking in Ethiopia', desc: 'Get discovered by more customers with our SEO expertise.' },
    { title: 'Strong focus on security and data protection', desc: 'Your data is protected with enterprise-grade security measures.' }
  ];

  return (
    <section id="why" className="py-20 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title text-center">Why Choose Ariva Systems Solutions</h2>
          <p className="text-sm leading-relaxed text-[var(--muted)] mt-4">
            We are committed to delivering the best digital solutions in Ethiopia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="group flex items-start gap-4 bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-xl p-5 transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="why-check w-8 h-8 rounded-lg bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.25)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <span className="text-[var(--accent)] font-bold text-lg">✓</span>
              </div>
              <div className="why-text flex-1">
                <h4 className="text-base font-bold mb-2 font-jakarta text-[var(--heading)]">{reason.title}</h4>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            Work With Us 
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;