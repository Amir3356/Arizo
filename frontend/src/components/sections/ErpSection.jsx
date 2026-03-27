import React from 'react';

const ErpSection = () => {
  const features = [
    {
      icon: '⚙️',
      title: 'Business Process Automation',
      description: 'Streamline workflows and eliminate manual tasks',
      image: '/src/assets/Busnesss automation.jpg'
    },
    {
      icon: '📊',
      title: 'Resource Management Systems',
      description: 'Optimize resource allocation and utilization',
      image: '/src/assets/Resource management systems.jpg'
    },
    {
      icon: '📈',
      title: 'Real-time Reporting',
      description: 'Instant insights with live data analytics',
      image: '/src/assets/Real-time reporting.jpg'
    },
    {
      icon: '🚀',
      title: 'Scalable ERP Solutions',
      description: 'Grow your business with systems that scale',
      image: '/src/assets/Scalable Erp Solution for Ethiopia.jpg'
    }
  ];

  return (
    <section id="erp" className="py-16 sm:py-20 md:py-24 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          
          {/* Left Side - Text Content */}
          <div className="erp-text reveal">
            <div className="inline-block mb-4">
              <span 
                className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
                style={{ 
                  color: 'var(--accent2)',
                  backgroundColor: 'rgba(245,166,35,0.1)',
                  border: '1px solid rgba(245,166,35,0.3)'
                }}
              >
                ERP Spotlight
              </span>
            </div>
            
            <span className="section-label block mb-2">Enterprise Solutions</span>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{ color: 'var(--heading)' }}>
              ERP & Software Highlight Section
            </h2>
            
            <p className="text-sm sm:text-base leading-relaxed text-[var(--muted)] mb-6 md:mb-8">
              Our advanced ERP systems in Ethiopia help businesses improve productivity and efficiency.
              With Ariva ERP solutions, you can:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 md:mb-8">
              {[
                'Automate business operations',
                'Track performance in real-time',
                'Improve decision-making',
                'Manage resources efficiently'
              ].map(feat => (
                <div key={feat} className="flex items-center gap-3 group hover:translate-x-1 transition-transform">
                  <div className="w-5 h-5 rounded-full bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.3)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div>
                  </div>
                  <span className="text-sm text-[var(--text)]">{feat}</span>
                </div>
              ))}
            </div>
            
            <div className="erp-cta">
              <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                Request a Demo
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>
          
          {/* Right Side - Visual Cards with Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ 
                  border: '1px solid rgba(0,212,170,0.2)',
                  backgroundColor: 'rgba(20,27,48,0.85)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <div className="w-full overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ 
                      display: 'block', 
                      width: '100%', 
                      height: 'auto',
                      minHeight: '160px',
                      maxHeight: '200px'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML += `
                        <div class="flex items-center justify-center p-8" style="min-height: 160px">
                          <div class="text-center">
                            <div class="text-3xl mb-2">${feature.icon}</div>
                            <div class="text-xs" style="color: var(--muted)">Image preview not available</div>
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{feature.icon}</span>
                    <h4 className="text-sm sm:text-base font-semibold text-white">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
        
        {/* Stats Section */}
        <div className="mt-12 md:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: '99%', label: 'System Uptime' },
              { num: '40%', label: 'Cost Reduction' },
              { num: '3×', label: 'Faster Operations' },
              { num: '24/7', label: 'Support Available' }
            ].map(stat => (
              <div 
                key={stat.label} 
                className="bg-[rgba(26,34,64,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-xl p-4 sm:p-5 text-center transition-all hover:border-[var(--accent)] hover:-translate-y-1"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: 'var(--accent)' }}>
                  {stat.num}
                </div>
                <div className="text-[10px] sm:text-xs text-[var(--muted)] mt-1 sm:mt-1.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErpSection;