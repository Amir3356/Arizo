import React, { useState } from 'react';
import Modal from '../common/Modal';

const ErpServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const erpServices = {
    icon: '⚙️',
    title: 'ERP System Development Ethiopia',
    description: 'We build powerful ERP software in Ethiopia to help businesses manage and automate operations.',
    features: [
      'Business process automation',
      'Resource management systems',
      'Real-time reporting',
      'Scalable ERP solutions for Ethiopian businesses'
    ]
  };

  const modalContent = [
    {
      title: 'ERP System Development Services',
      description: 'We build powerful ERP software in Ethiopia to help businesses manage and automate operations.',
      bullets: [
        'Business process automation - Streamline workflows and eliminate manual tasks',
        'Resource management systems - Optimize resource allocation and utilization',
        'Real-time reporting - Instant insights with live data analytics',
        'Scalable ERP solutions for Ethiopian businesses - Grow your business with systems that scale'
      ]
    }
  ];

  return (
    <>
      <div 
        className="group h-full rounded-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer"
        style={{ 
          backgroundColor: 'rgba(15, 21, 38, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="p-4 sm:p-5 md:p-6">
          <div className="mb-4 sm:mb-5 md:mb-6">
            <div 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4 transition-transform group-hover:scale-110 duration-300"
              style={{ 
                backgroundColor: 'rgba(0,212,170,0.15)',
                border: '1px solid rgba(0,212,170,0.3)'
              }}
            >
              {erpServices.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
              {erpServices.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/70 mb-4">
              {erpServices.description}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white/80 mb-2">Features:</h4>
            {erpServices.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-xs mt-0.5" style={{ color: 'var(--accent)' }}>✓</span>
                <span className="text-xs text-white/70">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium transition-all duration-300 group-hover:gap-3 hover:cursor-pointer"
            style={{ color: 'var(--accent)' }}
          >
            Learn More
            <span className="text-base sm:text-lg">→</span>
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={erpServices.title}
        content={modalContent}
        icon={erpServices.icon}
      />
    </>
  );
};

export default ErpServices;