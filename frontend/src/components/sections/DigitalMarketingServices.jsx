import React, { useState } from 'react';
import Modal from '../common/Modal';
import socialMediaImg from '../../assets/Social media marketing in Ethiopia.jpg';
import facebookCampaignsImg from '../../assets/Facebook &Instagram campaigns.jpg';
import contentCreationImg from '../../assets/Content Creation.jpg';
import performanceTrackingImg from '../../assets/Performance tracking and analytics.jpg';

const DigitalMarketingServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const digitalMarketingServices = {
    icon: '📢',
    title: 'Digital Marketing',
    subtitle: 'Strategic digital marketing to help businesses grow and reach their target audience.',
    features: [
      { 
        name: 'Social media marketing in Ethiopia',
        image: socialMediaImg,
        description: 'Reach your target audience through strategic social media campaigns'
      },
      { 
        name: 'Facebook & Instagram campaigns',
        image: facebookCampaignsImg,
        description: 'Engage customers with targeted social media advertising'
      },
      { 
        name: 'Content creation',
        image: contentCreationImg,
        description: 'Create compelling content that resonates with your audience'
      },
      { 
        name: 'Performance tracking and analytics',
        image: performanceTrackingImg,
        description: 'Monitor and optimize campaigns with data-driven insights'
      }
    ]
  };

  const modalContent = [
    {
      title: 'Complete Digital Marketing Solutions',
      description: 'We help businesses build strong online presence and drive measurable growth through strategic digital marketing campaigns.',
      bullets: [
        'Strategic social media management',
        'Targeted Facebook and Instagram advertising',
        'Professional content creation and copywriting',
        'Email marketing campaigns and automation',
        'Performance analytics and detailed reporting',
        'Conversion rate optimization'
      ]
    },
    {
      title: 'Why Choose Our Digital Marketing?',
      description: 'Our marketing strategies are data-driven and tailored to your business goals.',
      bullets: [
        'Local market expertise for Ethiopia',
        'Data-driven campaign optimization',
        'Creative content that engages audiences',
        'ROI-focused strategies and tracking',
        'Regular performance reviews and adjustments',
        'Dedicated account manager'
      ]
    },
    {
      title: 'Our Marketing Process',
      description: 'We follow a structured approach to ensure your marketing campaigns deliver results.',
      bullets: [
        'Discovery - Understanding your business goals',
        'Strategy - Developing a customized marketing plan',
        'Creation - Producing engaging content',
        'Launch - Executing campaigns across channels',
        'Monitor - Tracking performance metrics',
        'Optimize - Continuous improvement and scaling'
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
              {digitalMarketingServices.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
              {digitalMarketingServices.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/70">
              {digitalMarketingServices.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {digitalMarketingServices.features.map((feature, idx) => (
              <div 
                key={idx} 
                className="feature-item rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
                style={{ 
                  border: '1px solid rgba(0,212,170,0.2)',
                  backgroundColor: 'rgba(0,0,0,0.2)'
                }}
              >
                <div className="w-full overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.name}
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
                    }}
                  />
                </div>
                <div className="p-2 sm:p-3">
                  <h4 className="text-xs sm:text-sm font-semibold mb-1 text-white">
                    {feature.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-white/60">
                    {feature.description}
                  </p>
                </div>
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