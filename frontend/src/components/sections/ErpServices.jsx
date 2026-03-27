import React from 'react';
import businessAutomationImg from '../../assets/Busnesss automation.jpg';
import resourceManagementImg from '../../assets/Resource management systems.jpg';
import realtimeReportingImg from '../../assets/Real-time reporting.jpg';
import scalableErpImg from '../../assets/Scalable Erp Solution for Ethiopia.jpg';

const ErpServices = () => {
  const erpServices = {
    icon: '⚙️',
    title: 'ERP System Development Ethiopia',
    description: 'Powerful ERP software to help businesses manage and automate operations efficiently.',
    features: [
      { 
        name: 'Business Process Automation',
        image: businessAutomationImg,
        description: 'Streamline workflows and eliminate manual tasks'
      },
      { 
        name: 'Resource Management Systems',
        image: resourceManagementImg,
        description: 'Optimize resource allocation and utilization'
      },
      { 
        name: 'Real-time Reporting',
        image: realtimeReportingImg,
        description: 'Instant insights with live data analytics'
      },
      { 
        name: 'Scalable ERP Solutions',
        image: scalableErpImg,
        description: 'Grow your business with systems that scale'
      }
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
          {erpServices.icon}
        </div>
        <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--heading)' }}>
          {erpServices.title}
        </h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
          {erpServices.description}
        </p>
      </div>

      <div className="p-6 pt-0">
        <div className="space-y-4">
          {erpServices.features.map((feature, idx) => (
            <div key={idx} className="feature-item space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-sm font-semibold mt-0.5" style={{ color: 'var(--accent)' }}>
                  →
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--heading)' }}>
                    {feature.name}
                  </h4>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
              
              <div 
                className="mt-2 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
                style={{ 
                  border: '1px solid rgba(0,212,170,0.2)',
                  backgroundColor: 'rgba(0,0,0,0.3)'
                }}
              >
                <img 
                  src={feature.image} 
                  alt={feature.name}
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                  style={{ display: 'block' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
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