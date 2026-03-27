import React from 'react';

const ContactInfo = () => {
  const contactInfo = [
    { icon: '📞', title: 'Phone', detail: '+251 942497990' },
    { icon: '✉️', title: 'Email', detail: 'info@arivasystems.et' },
    { icon: '📍', title: 'Address', detail: 'Dembel City Center, Addis Ababa, Ethiopia' }
  ];

  const socialLinks = [
    { name: 'Telegram', icon: '📱', url: 'https://t.me/arivasystems', color: '#26A5E4' },
    { name: 'WhatsApp', icon: '💬', url: 'https://wa.me/251942497990', color: '#25D366' },
    { name: 'Facebook', icon: '👍', url: 'https://facebook.com/arivasystems', color: '#1877F2' }
  ];

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <div 
        className="rounded-2xl p-6 sm:p-8"
        style={{ 
          backgroundColor: 'rgba(20,27,48,0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0,212,170,0.2)'
        }}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white">
          Contact Information
        </h3>
        
        <div className="space-y-4">
          {contactInfo.map(info => (
            <div key={info.title} className="flex items-center gap-4 p-3 rounded-xl transition-all hover:translate-x-1">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ 
                  backgroundColor: 'rgba(0,212,170,0.15)',
                  border: '1px solid rgba(0,212,170,0.3)'
                }}
              >
                {info.icon}
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1 text-white">
                  {info.title}
                </h4>
                <p className="text-sm text-white">
                  {info.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.1)]">
          <h4 className="text-sm font-semibold mb-4 text-white">
            Connect With Us
          </h4>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <button
                key={social.name}
                onClick={() => handleSocialClick(social.url)}
                className="group w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                style={{ 
                  backgroundColor: 'rgba(0,212,170,0.1)',
                  border: '1px solid rgba(0,212,170,0.3)'
                }}
              >
                <span className="group-hover:scale-110 transition-transform">
                  {social.icon}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;