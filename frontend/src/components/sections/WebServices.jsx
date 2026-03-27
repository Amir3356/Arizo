import React, { useState } from 'react';
import Modal from '../common/Modal';
import responsiveImg from '../../assets/Responsive web design in ethiopia.jpg';
import fastLoadingImg from '../../assets/Fast loading website.jpg';
import uiuxImg from '../../assets/Modern UIUX design.png';
import customDevImg from '../../assets/Custom website development Ethiopi.jpg';

const WebServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const webServices = {
    icon: '🌐',
    title: 'Web Design & Development',
    subtitle: 'Professional website development with modern design and strong performance tailored for Ethiopian businesses.',
    features: [
      { 
        name: 'Responsive Web Design',
        image: responsiveImg,
        description: 'Mobile-first designs that adapt seamlessly to all devices'
      },
      { 
        name: 'Fast Loading Websites',
        image: fastLoadingImg,
        description: 'Optimized performance with lightning-fast load times'
      },
      { 
        name: 'Modern UI/UX Design',
        image: uiuxImg,
        description: 'Intuitive interfaces that enhance user experience'
      },
      { 
        name: 'Custom Website Development',
        image: customDevImg,
        description: 'Tailor-made solutions for your unique business needs'
      }
    ]
  };

  const modalContent = [
    {
      title: 'Complete Web Development Solutions',
      description: 'We deliver end-to-end web development services that help businesses establish a strong online presence and drive growth. Our team of expert developers creates websites that are not only visually stunning but also highly functional and optimized for performance.',
      bullets: [
        'Custom website design tailored to your brand identity',
        'E-commerce solutions with secure payment gateways',
        'Content management systems for easy updates',
        'SEO-optimized websites for better search visibility',
        'Mobile-responsive designs for all devices',
        'Ongoing maintenance and technical support'
      ]
    },
    {
      title: 'Why Choose Our Web Services?',
      description: 'Our web development approach focuses on delivering results that matter to your business. We combine technical excellence with creative design to create websites that engage visitors and convert them into customers.',
      bullets: [
        'Lightning-fast loading speeds for better user experience',
        'Modern, professional UI/UX design',
        'Secure and scalable architecture',
        'Dedicated project manager for each client',
        'Post-launch training and support',
        '100% client satisfaction guarantee'
      ]
    },
    {
      title: 'Our Development Process',
      description: 'We follow a structured approach to ensure your project is delivered on time and exceeds expectations.',
      bullets: [
        'Discovery & Planning - Understanding your business goals',
        'Design & Prototyping - Creating wireframes and mockups',
        'Development & Testing - Building and rigorous testing',
        'Launch & Deployment - Going live with your website',
        'Ongoing Support - Continuous maintenance and updates'
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
              {webServices.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
              {webServices.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/70">
              {webServices.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {webServices.features.map((feature, idx) => (
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
                      maxHeight: '220px'
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
        title={webServices.title}
        content={modalContent}
        icon={webServices.icon}
      />
    </>
  );
};

export default WebServices;