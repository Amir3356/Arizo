import React from 'react';
import Footer from '../components/common/Footer';
import ParticlesBackground from '../components/common/ParticlesBackground';
import Portfolio from '../components/sections/Portfolio';

const Project = () => {
  return (
    <>
      <ParticlesBackground />
      <div className="relative z-10">
        <Portfolio />
        <Footer />
      </div>
    </>
  );
};

export default Project;