import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import ContactMap from './ContactMap';

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4">
            <span 
              className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
              style={{ 
                color: 'var(--accent)',
                backgroundColor: 'rgba(0,212,170,0.1)',
                border: '1px solid rgba(0,212,170,0.2)'
              }}
            >
              Get In Touch
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#000000' }}>
            Let's Build Something <span style={{ color: 'var(--accent)' }}>Great</span>
          </h2>
          
          <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: '#000000' }}>
            We are ready to help your business grow with website design in Ethiopia and ERP solutions.
            Contact us today!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form - Left Side */}
          <ContactForm />
          
          {/* Right Side - Contact Info and Map */}
          <div className="order-1 lg:order-2 space-y-6">
            <ContactInfo />
            <ContactMap />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;