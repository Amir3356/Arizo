import React from 'react';
import Footer from '../components/common/Footer';
import ParticlesBackground from '../components/common/ParticlesBackground';
import ContactSection from '../components/sections/ContactSection';
import Faq from '../components/sections/Faq';

const Contact = () => {
  return (
    <>
      <ParticlesBackground />
      <div className="relative z-10">
        <ContactSection />
        <Faq />
        <Footer />
      </div>
    </>
  );
};

export default Contact;