import React, { useState } from 'react';
import Modal from '../common/Modal';
import logoDesignImg from '../../assets/Logo Design in Ethiopia.jpg';
import brandIdentityImg from '../../assets/Brand identity development.jpg';
import marketingMaterialsImg from '../../assets/Marketing materials.jpg';
import socialMediaDesignImg from '../../assets/Social Media Design.jpg';

const BrandingServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const brandingServices = {
    icon: '🎨',
    title: 'Branding & Graphic Design',
    subtitle: 'Complete branding and graphic design services to establish your unique identity.',
    features: [
      { 
        name: 'Logo design in Ethiopia',
        image: logoDesignImg,
        description: 'Create memorable logos that represent your brand identity'
      },
      { 
        name: 'Brand identity development',
        image: brandIdentityImg,
        description: 'Build a cohesive brand identity across all touchpoints'
      },
      { 
        name: 'Marketing materials',
        image: marketingMaterialsImg,
        description: 'Design professional marketing collateral that converts'
      },
      { 
        name: 'Social media designs',
        image: socialMediaDesignImg,
        description: 'Engaging social media graphics that capture attention'
      }
    ]
  };

  const modalContent = [
    {
      title: 'Complete Branding Solutions',
      description: 'We help businesses create powerful brand identities that stand out in the market.',
      bullets: [
        'Professional logo design and brand identity',
        'Complete brand guidelines development',
        'Marketing collateral design (brochures, flyers, etc.)',
        'Social media graphics and templates',
        'Packaging design and print materials',
        'Brand strategy and positioning'
      ]
    },
    {
      title: 'Why Choose Our Branding Services?',
      description: 'Our design approach combines creativity with strategic thinking to deliver brands that make a lasting impression.',
      bullets: [
        'Unique, custom designs tailored to your brand',
        'Consistent brand identity across all platforms',
        'High-quality, professional deliverables',
        'Fast turnaround times without compromising quality',
        'Unlimited revisions until satisfaction',
        'Competitive pricing and value for money'
      ]
    },
    {
      title: 'Our Design Process',
      description: 'We follow a collaborative approach to create designs that truly represent your brand.',
      bullets: [
        'Discovery - Understanding your vision and goals',
        'Research - Market and competitor analysis',
        'Concept Development - Creating initial design concepts',
        'Refinement - Iterative improvements based on feedback',
        'Finalization - Delivering final assets',
        'Brand Guidelines - Documentation for consistency'
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
              {brandingServices.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
              {brandingServices.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/70">
              {brandingServices.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {brandingServices.features.map((feature, idx) => (
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
        title={brandingServices.title}
        content={modalContent}
        icon={brandingServices.icon}
      />
    </>
  );
};

export default BrandingServices;