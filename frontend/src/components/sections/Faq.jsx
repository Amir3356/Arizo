import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How long does it take to build a website in Ethiopia?",
      a: "Usually 1–3 weeks depending on the project scope, complexity, and content readiness. We'll provide a detailed timeline during the initial consultation."
    },
    {
      q: "Do you provide ERP systems in Ethiopia?",
      a: "Yes, we develop custom ERP solutions tailored to your specific business needs and industry. Our ERP systems help streamline operations and improve efficiency."
    },
    {
      q: "Can you redesign my existing website?",
      a: "Yes, we offer professional website redesign services to improve performance, modernize design, and enhance user experience while maintaining your brand identity."
    },
    {
      q: "Do you offer post-launch support and maintenance?",
      a: "Yes, we provide ongoing support and maintenance after project delivery to ensure your systems run smoothly, securely, and stay up-to-date."
    },
    {
      q: "Will my website be mobile-friendly?",
      a: "Absolutely — all our websites are fully responsive and work seamlessly on all devices including phones, tablets, and desktops."
    },
    {
      q: "Do you provide hosting and domain services?",
      a: "Yes, we assist with domain registration and reliable web hosting to get your business online quickly and efficiently."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-24 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-4xl mx-auto relative z-10">
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
              Support Center
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--heading)' }}>
            Frequently Asked <span style={{ color: 'var(--accent)' }}>Questions</span>
          </h2>
          
          <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            Can't find what you're looking for? Feel free to contact us directly.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'shadow-xl' : ''
              }`}
              style={{ 
                backgroundColor: 'rgba(20,27,48,0.85)',
                backdropFilter: 'blur(8px)',
                border: openIndex === index 
                  ? '1px solid rgba(0,212,170,0.3)' 
                  : '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 transition-all duration-300 hover:bg-[rgba(0,212,170,0.05)] group"
              >
                <span className="font-semibold text-sm sm:text-base md:text-lg flex-1" style={{ color: 'var(--heading)' }}>
                  {faq.q}
                </span>
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  } group-hover:scale-110`}
                  style={{ 
                    backgroundColor: openIndex === index 
                      ? 'rgba(0,212,170,0.2)' 
                      : 'rgba(255,255,255,0.1)'
                  }}
                >
                  <svg
                    className="w-4 h-4 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--accent)' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                      <div className="border-t border-[rgba(255,255,255,0.1)] pt-4">
                        <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;