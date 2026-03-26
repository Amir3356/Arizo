import React from 'react';

const OurHistory = () => {
  const history = [
    { 
      year: '2022', 
      title: 'The Beginning', 
      description: 'Company founded with a vision for scalable solutions.',
      position: 'left'
    },
    { 
      year: '2023', 
      title: 'First Milestone', 
      description: 'Delivered first enterprise-grade products.',
      position: 'right'
    },
    { 
      year: '2024', 
      title: 'Expansion', 
      description: 'Expanded into multi-industry solutions.',
      position: 'left'
    },
    { 
      year: '2025', 
      title: 'Future Vision', 
      description: 'Focused on long-term partnerships and growth.',
      position: 'right'
    }
  ];

  return (
    <section className="py-20 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="section-label">Our Journey</span>
          <h2 className="section-title">Our History</h2>
          <p className="text-sm text-[var(--muted)]">From foundation to future — our path of growth and innovation</p>
        </div>
        
        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-transparent hidden md:block"></div>
          
          <div className="space-y-12 md:space-y-0">
            {history.map((item, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center md:items-start ${
                item.position === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
              } mb-12 md:mb-0`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--accent)] border-4 border-[rgba(10,14,26,0.85)] z-10 hidden md:block"></div>
                
                {/* Content */}
                <div className={`w-full md:w-1/2 ${item.position === 'left' ? 'md:pr-12 text-right' : 'md:pl-12 text-left'} mb-6 md:mb-0`}>
                  <div className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] transition-all hover:-translate-y-1 group">
                    <div className="text-3xl font-bold text-[var(--accent)] mb-3 group-hover:scale-110 transition-transform inline-block">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[var(--heading)]">{item.title}</h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{item.description}</p>
                  </div>
                </div>
                
                {/* Empty spacer for the other side */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurHistory;