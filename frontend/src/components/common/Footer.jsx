import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = [
    {
      title: 'Services',
      links: [
        { href: '/services', label: 'Website Development in Ethiopia' },
        { href: '/services', label: 'ERP Systems in Ethiopia' },
        { href: '/services', label: 'SEO Services in Addis Ababa' },
        { href: '/services', label: 'Digital Marketing Ethiopia' }
      ]
    },
    {
      title: 'Quick Links',
      links: [
        { href: '/', label: 'Home' },
        { href: '/services', label: 'Services' },
        { href: '/portfolio', label: 'Portfolio' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact' }
      ]
    }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[rgba(15,21,38,0.85)] backdrop-blur-md border-t border-[var(--border)] pt-12 sm:pt-16 pb-6 sm:pb-8 px-[5%]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 sm:mb-12">
          {/* Brand Section */}
          <div className="footer-brand col-span-1 lg:col-span-2">
            <div className="logo font-jakarta font-bold text-2xl mb-3 text-white">
              Ariva<span className="text-[var(--accent)]"> Systems Solutions</span>
            </div>
            <p className="text-sm leading-relaxed text-white max-w-md">
              Your trusted partner for website development, ERP systems, SEO services, and digital marketing in Ethiopia.
            </p>
          </div>
          
          {footerSections.map(section => (
            <div key={section.title} className="footer-col">
              <h4 className="font-jakarta text-base font-bold mb-4 text-white">{section.title}</h4>
              <ul className="flex flex-col gap-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link 
                        to={link.href} 
                        className="text-sm text-white transition-colors hover:text-[var(--accent)]"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a 
                        href={link.href} 
                        className="text-sm text-white transition-colors hover:text-[var(--accent)]"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Section */}
        <div className="footer-bottom border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white text-center sm:text-left">
            © {currentYear} <span className="text-[var(--accent)] font-semibold">Ariva Systems Solutions</span>. All rights reserved.
          </p>
          <p className="text-xs text-white text-center sm:text-right">
            Addis Ababa, Ethiopia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;