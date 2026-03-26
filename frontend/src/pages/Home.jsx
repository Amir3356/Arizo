import React from 'react';
import Hero from '../components/sections/Hero';
import WhoWeAre from '../components/sections/WhoWeAre';
import ErpSection from '../components/sections/ErpSection';
import WhyChoose from '../components/sections/WhyChoose';
import Footer from '../components/common/Footer';
import ParticlesBackground from '../components/common/ParticlesBackground';

const Home = () => {
  return (
    <>
      <ParticlesBackground />
      <div className="relative z-10">
        <Hero />
        <WhoWeAre />
        <ErpSection />
        <WhyChoose />
        <Footer />
      </div>
    </>
  );
};

export default Home;