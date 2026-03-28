import React from 'react';
import { motion } from 'framer-motion';
import person1Img from '../../assets/Testimonials person.jpg';
import person2Img from '../../assets/Testimonials person 1.jpg';
import person3Img from '../../assets/Testimonials person 3.jpg';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Abebe Kebede',
      position: 'CEO, Tech Solutions Ethiopia',
      image: person1Img,
      text: 'Best website development company in Ethiopia. Highly professional! Their team delivered exceptional results beyond our expectations.',
      size: 'large' // Spans 2 columns
    },
    {
      id: 2,
      name: 'Tigist Haile',
      position: 'Operations Manager',
      image: person2Img,
      text: 'Their ERP system helped our business improve efficiency by 40%. Highly recommended!',
      size: 'small'
    },
    {
      id: 3,
      name: 'Dawit Mekonnen',
      position: 'Director, Hospitality Group',
      image: person3Img,
      text: 'Outstanding service and support! Truly the best IT partner in Ethiopia.',
      size: 'small'
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-4 bg-[#0a0f1d] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Trusted by Ethiopia's <br />
              <span className="text-[var(--accent)]">
                Leading Enterprises
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-sm border-l-2 border-[var(--accent)] pl-6">
            We don't just build software; we build the digital backbone of Ethiopian business.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative group p-[1px] rounded-3xl overflow-hidden ${
                item.size === 'large' ? 'md:col-span-2' : 'col-span-1'
              }`}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-full bg-[#141b30] p-8 rounded-[23px] flex flex-col justify-between">
                <div>
                  {/* Quote Icon */}
                  <div className="text-5xl text-[var(--accent)] opacity-20 font-serif mb-4">“</div>
                  <p className="text-gray-200 text-lg md:text-xl italic leading-relaxed mb-8">
                    {item.text}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-[var(--accent)] rounded-full blur opacity-30 group-hover:opacity-60 transition" />
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="relative w-14 h-14 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{item.name}</h4>
                    <p className="text-[var(--accent)] text-sm font-medium">{item.position}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[var(--accent)] opacity-[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-blue-600 opacity-[0.03] blur-[120px] rounded-full" />
      </div>
    </section>
  );
};

export default Testimonials;