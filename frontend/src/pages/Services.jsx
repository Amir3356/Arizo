import React from 'react';
import ServicesGrid from '../components/sections/ServicesGrid';
import Footer from '../components/common/Footer';
import ParticlesBackground from '../components/common/ParticlesBackground';

const Services = () => {
  return (
    <>
      <ParticlesBackground />
      <div className="relative z-10">
        <ServicesGrid />
        <Footer />
      </div>
    </>
  );
};

export default Services;