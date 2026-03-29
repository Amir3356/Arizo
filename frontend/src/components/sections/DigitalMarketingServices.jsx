import React, { useState } from 'react';
import Modal from '../common/Modal';

const DigitalMarketingServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const digitalMarketingServices = {
    icon: '📢',
    title: 'Digital Marketing Ethiopia',
    description: 'We help businesses grow through digital marketing in Ethiopia.',
    features: [
      'Social media marketing Ethiopia',
      'Facebook & Instagram campaigns',
      'Content creation',
      'Performance tracking and analytics'
    ]
  };

  const modalContent = [
    {
      title: 'Digital Marketing Services',
      description: 'We help businesses grow through digital marketing in Ethiopia.',
      bullets: [
        'Social media marketing Ethiopia - Reach your target audience through strategic social media campaigns',
        'Facebook & Instagram campaigns - Engage customers with targeted social media advertising',
        'Content creation - Create compelling content that resonates with your audience',
        'Performance tracking and analytics - Monitor and optimize campaigns with data-driven insights'
      ]
    }
  ];

  return (
    <>
      <div 
        className="group relative h-full rounded-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer"
        style={{ 
          backgroundColor: 'var(--card-bg)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Glow hover effect (Adapts to light/dark mode) */}
        <div className="absolute -inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[3px] pointer-events-none
                        bg-gradient-to-r from-[var(--accent)] to-cyan-400 dark:from-[var(--accent)] dark:to-cyan-400
                        [data-theme='light']_&_from-[var(--accent)] [data-theme='light']_&_to-teal-500 [data-theme='light']_&_opacity-0 [data-theme='light']_&_group-hover:opacity-[0.85]" 
        />
        
        <div className="relative z-10 bg-[var(--card-bg)] h-full w-full rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300">
          <div className="mb-4 sm:mb-5 md:mb-6">
            <div 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4 transition-transform group-hover:scale-110 duration-300"
              style={{ 
                backgroundColor: 'rgba(0,212,170,0.15)',
                border: '1px solid rgba(0,212,170,0.3)'
              }}
            >
              {digitalMarketingServices.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-[var(--heading)]">
              {digitalMarketingServices.title}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text)] opacity-80 mb-4">
              {digitalMarketingServices.description}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-[var(--heading)] mb-2">Services:</h4>
            {digitalMarketingServices.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-xs mt-0.5" style={{ color: 'var(--accent)' }}>✓</span>
                <span className="text-xs text-[var(--text)] opacity-80">{feature}</span>
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
        title={digitalMarketingServices.title}
        content={modalContent}
        icon={digitalMarketingServices.icon}
      />
    </>
  );
};

export default DigitalMarketingServices;