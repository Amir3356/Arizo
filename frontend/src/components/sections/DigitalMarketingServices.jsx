import React from 'react';
import socialMediaImg from '../../assets/Social media marketing in Ethiopia.jpg';
import facebookCampaignsImg from '../../assets/Facebook &Instagram campaigns.jpg';
import contentCreationImg from '../../assets/Content Creation.jpg';
import performanceTrackingImg from '../../assets/Performance tracking and analytics.jpg';

const DigitalMarketingServices = () => {
  const digitalMarketingServices = {
    icon: '📢',
    title: 'Digital Marketing',
    subtitle: 'Strategic digital marketing to help businesses grow and reach their target audience',
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
            {digitalMarketingServices.icon}
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--heading)' }}>
            {digitalMarketingServices.title}
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            {digitalMarketingServices.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {digitalMarketingServices.features.map((feature, idx) => (
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
                  style={{ display: 'block' }}
                  onError={(e) => {
                    console.error('Failed to load image:', feature.name);
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML += `
                      <div class="w-full h-full flex items-center justify-center" style="background: rgba(0,0,0,0.3)">
                        <span class="text-xs" style="color: var(--muted)">📷 ${feature.name}</span>
                      </div>
                    `;
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

export default DigitalMarketingServices;