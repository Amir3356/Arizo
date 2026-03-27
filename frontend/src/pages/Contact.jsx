import React from 'react';
import Footer from '../components/common/Footer';
import ParticlesBackground from '../components/common/ParticlesBackground';
import Faq from '../components/sections/Faq';

const Contact = () => {
  return (
    <>
      <ParticlesBackground />
      <div className="relative z-10">
        <ContactForm />
        <OfficeLocation />
        <Faq />
        <Footer />
      </div>
    </>
  );
};

export default Contact;