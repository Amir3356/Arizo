import React from 'react';

const ServicesGrid = () => {
  const services = [
    {
      icon: '🌐',
      title: 'Web Design & Development',
      description: 'Professional website development with modern design and strong performance.',
      features: ['Responsive web design Ethiopia', 'Fast loading websites', 'Modern UI/UX design', 'Custom development']
    },
    {
      icon: '⚙️',
      title: 'ERP System Development',
      description: 'Powerful ERP software to help businesses manage and automate operations.',
      features: ['Business process automation', 'Resource management systems', 'Real-time reporting', 'Scalable ERP solutions']
    },
    {
      icon: '🔍',
      title: 'SEO Optimization',
      description: 'Professional SEO services to help your website rank on Google.',
      features: ['Keyword research (Ethiopia)', 'On-page SEO optimization', 'Technical SEO', 'Link building strategies']
    },
    {
      icon: '📢',
      title: 'Digital Marketing',
      description: 'Help businesses grow through digital marketing in Ethiopia.',
      features: ['Social media marketing', 'Facebook & Instagram campaigns', 'Content creation', 'Performance analytics']
    },
    {
      icon: '🎨',
      title: 'Branding & Graphic Design',
      description: 'Complete branding and graphic design services in Ethiopia.',
      features: ['Logo design Ethiopia', 'Brand identity development', 'Marketing materials', 'Social media designs']
    },
    {
      icon: '💻',
      title: 'Custom Software Solutions',
      description: 'Bespoke software built to solve your unique business challenges.',
      features: ['Mobile applications', 'Web applications', 'API integrations', 'Cloud-based solutions']
    }
  ];

  return (
    <section id="services" className="py-20 px-[5%] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        <div className="section-header max-w-[720px] mb-12 mx-auto text-center">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Our Core Services</h2>
          <p className="text-sm leading-relaxed text-[var(--muted)] max-w-[560px] mx-auto">
            From modern web design to enterprise-grade ERP, we deliver end-to-end digital solutions tailored to Ethiopian businesses.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="service-card bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(0,212,170,0.3)] hover:shadow-[var(--shadow)] relative overflow-hidden reveal">
              <div className="svc-icon w-12 h-12 rounded-lg bg-[rgba(0,212,170,0.1)] flex items-center justify-center text-xl mb-5 border border-[rgba(0,212,170,0.2)]">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold mb-2.5 font-jakarta">{service.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted)] mb-4">{service.description}</p>
              <ul className="feat-list flex flex-col gap-1.5">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-[0.8rem] text-[var(--muted)] flex items-center gap-1.5">
                    <span className="text-[var(--accent)] text-[10px] font-bold">→</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;