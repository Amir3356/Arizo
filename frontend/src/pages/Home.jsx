import React from 'react';
import Hero from '../components/sections/Hero';
import ErpSection from '../components/sections/ErpSection';
import WhyChoose from '../components/sections/WhyChoose';
import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <>
      <Hero />
      <ErpSection />
      <WhyChoose />
      <Footer />
    </>
  );
};

export default Home;