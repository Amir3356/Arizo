import React from 'react';
import businessAutomationImg from '../../assets/Busnesss automation.jpg';
import resourceManagementImg from '../../assets/Resource management systems.jpg';
import realtimeReportingImg from '../../assets/Real-time reporting.jpg';
import scalableErpImg from '../../assets/Scalable Erp Solution for Ethiopia.jpg';

const ErpServices = () => {
  const erpServices = {
    icon: '⚙️',
    title: 'ERP System Development',
    subtitle: 'Powerful ERP software to manage and automate operations',
    features: [
      { 
        name: 'Business Automation',
        image: businessAutomationImg,
        description: 'Streamline workflows and eliminate manual tasks'
      },
      { 
        name: 'Resource Management',
        image: resourceManagementImg,
        description: 'Optimize resource allocation and utilization'
      },
      { 
        name: 'Real-time Reporting',
        image: realtimeReportingImg,
        description: 'Instant insights with live data analytics'
      },
      { 
        name: 'Scalable Solutions',
        image: scalableErpImg,
        description: 'Grow your business with systems that scale'
      }
    ]
  };

  return (
    <div 
      className="group h-full rounded-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
      style={{ 
        backgroundColor: 'rgba(15, 21, 38, 0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="p-6">
        <div className="mb-6">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110 duration-300"
            style={{ 
              backgroundColor: 'rgba(0,212,170,0.15)',
              border: '1px solid rgba(0,212,170,0.3)'
            }}
          >
            {erpServices.icon}
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--heading)' }}>
            {erpServices.title}
          </h3>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {erpServices.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {erpServices.features.map((feature, idx) => (
            <div 
              key={idx} 
              className="feature-item rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
              style={{ 
                border: '1px solid rgba(0,212,170,0.2)',
                backgroundColor: 'rgba(0,0,0,0.2)'
              }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-3">
                <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--heading)' }}>
                  {feature.name}
                </h4>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  {feature.description}
                </p>
              </div>
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

export default ErpServices;