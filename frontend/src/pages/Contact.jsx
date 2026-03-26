import React from 'react';
import Footer from '../components/common/Footer';
import ContactForm from '../components/sections/ContactForm';
import OfficeLocation from '../components/sections/OfficeLocation';
import Faq from '../components/sections/Faq';

const Contact = () => {
  return (
    <>
      <ContactForm />
      <OfficeLocation />
      <Faq />
      <Footer />
    </>
  );
};

export default Contact;