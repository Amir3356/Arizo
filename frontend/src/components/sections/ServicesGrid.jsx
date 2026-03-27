import React from 'react';
import WebServices from './WebServices';
import ErpServices from './ErpServices';
import SeoServices from './SeoServices';
import DigitalMarketingServices from './DigitalMarketingServices';
import BrandingServices from './BrandingServices';

const ServicesGrid = () => {
  return (
    <section 
      id="services" 
      className="py-24 px-[5%] relative"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Our Services Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span 
              className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
              style={{ 
                color: 'var(--accent)',
                backgroundColor: 'rgba(0,212,170,0.1)',
                border: '1px solid rgba(0,212,170,0.2)'
              }}
            >
              What We Offer
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--heading)' }}
          >
            Our Services
          </h2>
          <p 
            className="text-base max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            Comprehensive digital solutions tailored for Ethiopian businesses
          </p>
        </div>

        {/* Services Grid - All Services Imported Here */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <WebServices />
          <ErpServices />
          <SeoServices />
          <DigitalMarketingServices />
          <BrandingServices />
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;