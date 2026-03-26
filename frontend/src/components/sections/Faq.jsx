import React, { useState } from 'react';

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

  return (
    <section className="py-20 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="section-label">Support Center</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Can't find what you're looking for? Feel free to contact us directly.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`mb-4 bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'border-[var(--accent)] shadow-lg' : ''
              }`}
            >
              <button
                className="w-full text-left p-5 flex justify-between items-center hover:bg-[rgba(0,212,170,0.1)] transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-base font-jakarta text-[var(--heading)]">
                  {faq.q}
                </span>
                <svg
                  className={`w-5 h-5 text-[var(--accent)] transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-40 pb-5' : 'max-h-0'
                }`}
              >
                <p className="px-5 text-sm text-[var(--muted)] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;