import React, { useState, useEffect, useRef, memo } from 'react';

// Memoized individual stat card to optimize performance during high-frequency state updates
const StatCard = memo(({ label, value, suffix }) => (
  <div className="bg-[rgba(26,34,64,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-xl p-4 sm:p-5 text-center transition-all hover:border-[var(--accent)] hover:-translate-y-1 group">
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: 'var(--accent)' }}>
      {value}{suffix}
    </div>
    <div className="text-[10px] sm:text-xs text-[var(--muted)] mt-1 sm:mt-1.5">
      {label}
    </div>
  </div>
));

const ErpSection = () => {
  const [counts, setCounts] = useState({
    uptime: 0,
    reduction: 0,
    faster: 0,
    support: 0
  });
  
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const requestRef = useRef([]); // To track multiple animation frames for cleanup

  const features = [
    { icon: '⚡', title: 'Business Process Automation', description: 'Streamline workflows and eliminate manual tasks' },
    { icon: '📊', title: 'Resource Management Systems', description: 'Optimize resource allocation and utilization' },
    { icon: '📈', title: 'Real-time Reporting', description: 'Instant insights with live data analytics' },
    { icon: '🚀', title: 'Scalable ERP Solutions', description: 'Grow your business with systems that scale' }
  ];

  const statsConfig = [
    { key: 'uptime', end: 99, label: 'System Uptime', suffix: '%', duration: 2000 },
    { key: 'reduction', end: 40, label: 'Cost Reduction', suffix: '%', duration: 2000 },
    { key: 'faster', end: 3, label: 'Faster Operations', suffix: '×', duration: 2000 },
    { key: 'support', end: 24, label: 'Support Available', suffix: '/7', duration: 2000 }
  ];

  const animateNumber = (key, endValue, duration) => {
    let startTimestamp = null;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * endValue);
      
      setCounts(prev => ({ ...prev, [key]: currentValue }));
      
      if (progress < 1) {
        requestRef.current.push(window.requestAnimationFrame(step));
      }
    };
    
    requestRef.current.push(window.requestAnimationFrame(step));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          statsConfig.forEach(stat => animateNumber(stat.key, stat.end, stat.duration));
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.disconnect();
      // Clean up all pending animation frames
      requestRef.current.forEach(id => window.cancelAnimationFrame(id));
    };
  }, [hasAnimated]);

  const handleRequestDemo = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="erp" 
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 px-[5%] relative overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          
          {/* Left Side */}
          <div className="erp-text">
            <div className="inline-block mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
                style={{ color: 'var(--accent2)', backgroundColor: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)' }}>
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {['Automate business operations', 'Track performance in real-time', 'Improve decision-making', 'Manage resources efficiently'].map(feat => (
                <div key={feat} className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.3)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div>
                  </div>
                  <span className="text-sm text-[var(--text)]">{feat}</span>
                </div>
              ))}
            </div>
            
            <button onClick={handleRequestDemo} className="btn-primary inline-flex items-center gap-2 cursor-pointer">
              Request a Demo <span className="text-lg">→</span>
            </button>
          </div>
          
          {/* Right Side - Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {features.map((feature, idx) => (
              <div key={idx} className="group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl p-4 sm:p-5"
                style={{ border: '1px solid rgba(0,212,170,0.2)', backgroundColor: 'rgba(20,27,48,0.85)', backdropFilter: 'blur(8px)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:rotate-6"
                    style={{ backgroundColor: 'rgba(0,212,170,0.15)', border: '1px solid rgba(0,212,170,0.3)' }}>
                    {feature.icon}
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-white">{feature.title}</h4>
                </div>
                <p className="text-xs text-white/60 leading-relaxed pl-14">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Stats Section */}
        <div className="mt-12 md:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statsConfig.map((stat) => (
              <StatCard 
                key={stat.key}
                label={stat.label}
                value={counts[stat.key]}
                suffix={stat.suffix}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErpSection;