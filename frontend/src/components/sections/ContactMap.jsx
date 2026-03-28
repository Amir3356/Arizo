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
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg3)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <iframe
          title="Office Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.056029285084!2d38.764491074872!3d8.931252191125211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85935f8d29b1%3A0xc6cb515320c0926!2sGetu%20Commercial%20Center%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1711670000000!5m2!1sen!2set"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        ></iframe>
        <div className="p-4 text-center border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text)]">
            📍 Addis Ababa, Bole Getu Commercial 9th floor/910, Getu Commercial Center.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactMap;