import React, { useState } from 'react';
import Modal from '../common/Modal';
import keywordResearchImg from '../../assets/Keyword research for Ethiopia market.jpg';
import onpageSeoImg from '../../assets/On-page SEO optimization.jpg';
import technicalSeoImg from '../../assets/Technical SEO.jpg';
import linkBuildingImg from '../../assets/Link building strategies.jpg';

const SeoServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const seoServices = {
    icon: '🔍',
    title: 'SEO Optimization',
    subtitle: 'Professional SEO services to help your website rank on Google and reach more customers.',
    features: [
      { 
        name: 'Keyword research for Ethiopia market',
        image: keywordResearchImg,
        description: 'Target the right keywords to reach your Ethiopian audience'
      },
      { 
        name: 'On-page SEO optimization',
        image: onpageSeoImg,
        description: 'Optimize your website content for better search rankings'
      },
      { 
        name: 'Technical SEO',
        image: technicalSeoImg,
        description: 'Improve site architecture and technical performance'
      },
      { 
        name: 'Link building strategies',
        image: linkBuildingImg,
        description: 'Build quality backlinks to increase domain authority'
      }
    ]
  };

  const modalContent = [
    {
      title: 'Comprehensive SEO Services',
      description: 'We help businesses dominate search engine results and attract qualified leads through data-driven SEO strategies.',
      bullets: [
        'Complete website SEO audit and analysis',
        'Strategic keyword research and targeting',
        'On-page optimization for better rankings',
        'Technical SEO improvements and site speed optimization',
        'Quality backlink building strategies',
        'Local SEO for Ethiopian businesses'
      ]
    },
    {
      title: 'Why Choose Our SEO Services?',
      description: 'Our SEO strategies are tailored to the Ethiopian market and deliver measurable results.',
      bullets: [
        'Local market expertise for Ethiopia',
        'Data-driven optimization strategies',
        'Regular performance reporting and analytics',
        'White-hat SEO techniques',
        'Long-term sustainable growth',
        'Competitor analysis and insights'
      ]
    },
    {
      title: 'Our SEO Process',
      description: 'We follow a systematic approach to improve your search engine rankings.',
      bullets: [
        'SEO Audit - Analyzing current performance',
        'Strategy Development - Creating a customized plan',
        'Implementation - Executing optimization tasks',
        'Monitoring - Tracking rankings and traffic',
        'Reporting - Regular performance updates',
        'Continuous Optimization - Ongoing improvements'
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
              {seoServices.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
              {seoServices.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/70">
              {seoServices.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {seoServices.features.map((feature, idx) => (
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
        title={seoServices.title}
        content={modalContent}
        icon={seoServices.icon}
      />
    </>
  );
};

export default SeoServices;