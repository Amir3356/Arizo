import React from 'react';
import { motion } from 'framer-motion';

const ContactMap = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="order-1 lg:order-2 space-y-6"
    >
      <div 
        className="rounded-2xl overflow-hidden transition-all hover:shadow-xl"
        style={{ 
          border: '1px solid rgba(0,212,170,0.2)',
          backgroundColor: 'rgba(20,27,48,0.85)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <iframe
          title="Office Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.578950043659!2d38.763856!3d9.024058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b6e3e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sDembel%20City%20Center%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        ></iframe>
        <div className="p-4 text-center border-t border-[rgba(255,255,255,0.1)]">
          <p className="text-xs text-white">
            📍 Dembel City Center, Addis Ababa, Ethiopia
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactMap;