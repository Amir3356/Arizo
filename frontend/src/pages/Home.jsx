import React from 'react';
import Hero from '../components/sections/Hero';
import WhoWeAre from '../components/sections/WhoWeAre';
import ServicesGrid from '../components/sections/ServicesGrid';
import ErpSection from '../components/sections/ErpSection';
import IndustriesWeServe from '../components/sections/IndustriesWeServe';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Portfolio from '../components/sections/Portfolio';
import Testimonials from '../components/sections/Testimonials';
import Faq from '../components/sections/Faq';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/common/Footer';
import ParticlesBackground from '../components/common/ParticlesBackground';

const Home = () => {
  return (
    <>
      <ParticlesBackground />
      <div className="relative z-10">
        <Hero />
        <WhoWeAre />
        <ServicesGrid />
        <ErpSection />
        <IndustriesWeServe />
        <WhyChooseUs />
        <Portfolio />
        <Testimonials />
        <Faq />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default Home;