import React from 'react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Services',
      links: [
        { href: '#services', label: 'Web Development' },
        { href: '#services', label: 'ERP Systems' },
        { href: '#services', label: 'SEO Services' },
        { href: '#services', label: 'Digital Marketing' }
      ]
    },
    {
      title: 'Company',
      links: [
        { href: '#about', label: 'About Us' },
        { href: '#portfolio', label: 'Portfolio' },
        { href: '#testimonials', label: 'Testimonials' },
        { href: '#contact', label: 'Contact' }
      ]
    },
    {
      title: 'Quick Links',
      links: [
        { href: '#home', label: 'Home' },
        { href: '#industries', label: 'Industries' },
        { href: '#faq', label: 'FAQ' },
        { href: '#why', label: 'Why Choose Us' }
      ]
    }
  ];

  return (
    <footer className="bg-[var(--bg2)] border-t border-[var(--border)] pt-15 pb-8 px-[5%]">
      <div className="footer-grid grid md:grid-cols-[1.8fr_1fr_1fr_1fr] gap-10 mb-12">
        <div className="footer-brand">
          <div className="logo font-jakarta font-bold text-xl mb-3 text-[var(--heading)]">
            Ariva<span className="text-[var(--accent)]">.</span>
          </div>
          <p className="text-[0.8rem] leading-relaxed text-[var(--muted)]">
            Your trusted partner for website development, ERP systems, SEO services, and digital marketing in Ethiopia.
          </p>
        </div>
        
        {footerSections.map(section => (
          <div key={section.title} className="footer-col">
            <h4 className="font-jakarta text-sm font-bold mb-3.5 text-[var(--heading)]">{section.title}</h4>
            <ul className="flex flex-col gap-2">
              {section.links.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-[0.8rem] leading-relaxed text-[var(--muted)] transition-colors hover:text-[var(--accent)]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="footer-bottom border-t border-[var(--border)] pt-6 flex justify-between items-center flex-wrap gap-3">
        <p className="text-xs text-[var(--muted)]">
          © 2026 <span className="text-[var(--accent)] font-semibold">Ariva Systems Solutions</span>. All rights reserved.
        </p>
        <p className="text-xs text-[var(--muted)]">Addis Ababa, Ethiopia</p>
      </div>
    </footer>
  );
};

export default Footer;