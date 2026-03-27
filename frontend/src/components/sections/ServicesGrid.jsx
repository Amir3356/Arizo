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
        {/* Bento Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span 
              className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
              style={{ 
                color: 'var(--accent)',
                backgroundColor: 'rgba(0,212,170,0.1)',
                border: '1px solid rgba(0,212,170,0.2)'
              }}
            >
              Expertise & Solutions
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
            Comprehensive digital solutions tailored specifically for the Ethiopian market, driving growth through innovation.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
          {/* Web Services - Larger card */}
          <div className="lg:row-span-2 lg:col-span-1">
            <WebServices />
          </div>
          
          {/* ERP Services - Standard card */}
          <div className="lg:col-span-1">
            <ErpServices />
          </div>
          
          {/* SEO Services - Standard card */}
          <div className="lg:col-span-1">
            <SeoServices />
          </div>
          
          {/* Digital Marketing Services - Standard card */}
          <div className="lg:col-span-1">
            <DigitalMarketingServices />
          </div>
          
          {/* Branding Services - Larger card */}
          <div className="lg:row-span-2 lg:col-span-1">
            <BrandingServices />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;