import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const TelegramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.435 2.582a1.933 1.933 0 00-1.912-.03L2.523 10.454a1.96 1.96 0 00.124 3.535l4.605 1.487a.994.994 0 00.916-.176l9.531-6.444c.083-.056.19.043.119.11l-7.71 7.232a.994.994 0 00-.284.588l-.775 4.726a1.94 1.94 0 003.462 1.254l2.588-3.167a.994.994 0 011.085-.285l4.637 1.492a1.94 1.94 0 002.502-1.928l.05-14.444a1.94 1.94 0 00-1.002-1.854z" fill="currentColor"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.301-.15-1.781-.878-2.057-.978-.276-.1-.476-.15-.676.15-.2.3-.775 1-1.05 1.3-.275.3-.549.337-.85.187-.3-.15-1.264-.467-2.408-1.488-.89-.793-1.49-1.772-1.666-2.071-.176-.3-.018-.462.13-.611.134-.133.301-.35.451-.525.151-.176.2-.3.301-.15.151.15.2.35.1.525-.1.176-.775 1.571-1.075 1.832-.3.26-.6.187-.9-.013-.3-.2-.8-.25-2.221-1.52l-1.411-1.28c-.46-.417-.834-.844-1.122-1.282-.284-.433-.427-.851-.43-1.254-.006-.827.247-1.314.502-1.637l.22-.27c.431-.532.818-.616 1.058-.616.241 0 .482.016.7.033.235.017.367.017.518.017.216 0 .333.016.483.216.15.2.533 1.233.583 1.333.05.111.083.216 0 .416-.084.2-.125.326-.301.53l-.226.27c-.15.176-.312.35-.15.617.151.266.671 1.107 1.441 1.794.991.884 1.82 1.159 2.086 1.294.266.133.421.117.576-.067.155-.183.671-.783.844-1.05.174-.267.347-.217.575-.134.228.084 1.442.684 1.693.817.252.134.42.2.482.3.061.1.061.576-.24 1.159zm-5.452 7.618C10.582 22 9.21 21.657 8.026 21l-.286-.16-4.218 1.107 1.125-4.114-.175-.28A9.914 9.914 0 012 12c0-5.523 4.477-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10z" fill="currentColor"/>
  </svg>
);

const ContactInfo = () => {
  const contactInfo = [
    { icon: <Phone size={20}/>, title: 'Phone', detail: '+251 944636465' },
    { icon: <Mail size={20}/>, title: 'Email', detail: 'tesfadebesay88@gmail.com' },
    { icon: <MapPin size={20}/>, title: 'Address', detail: 'Addis Ababa, Bole Getu Commercial 9th floor/910, Getu Commercial Center.' }
  ];

  const socialLinks = [
    { name: 'Telegram', icon: <TelegramIcon />, url: 'https://t.me/tesfa8888', handle: '@tesfa8888', color: '#26A5E4' },
    { name: 'WhatsApp', icon: <WhatsAppIcon />, url: 'https://wa.me/message/XH44342TOTC2O1', handle: 'Chat on WhatsApp', color: '#25D366' },
    { name: 'Email', icon: <Mail size={20} />, url: 'mailto:tesfadebesay88@gmail.com', handle: 'tesfadebesay88@gmail.com', color: '#EA4335' }
  ];

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <div 
        className="rounded-2xl p-6 sm:p-8 transition-colors duration-300"
        style={{ 
          backgroundColor: 'var(--bg3)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--border)'
        }}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--heading)]">
          Contact Information
        </h3>
        
        <div className="space-y-4">
          {contactInfo.map(info => (
            <div key={info.title} className="flex items-center gap-4 p-3 rounded-xl transition-all hover:translate-x-1">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ 
                  backgroundColor: 'rgba(0,212,170,0.15)',
                  border: '1px solid var(--border)',
                  color: 'var(--accent)'
                }}
              >
                {info.icon}
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1 text-[var(--heading)]">
                  {info.title}
                </h4>
                <p className="text-sm text-[var(--text)]">
                  {info.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="mt-8 pt-6 border-t border-[var(--border)]">
          <h4 className="text-sm font-semibold mb-4 text-[var(--heading)]">
            Connect With Us
          </h4>
          <div className="flex flex-col gap-3">
            {socialLinks.map((social) => (
              <button
                key={social.name}
                onClick={() => handleSocialClick(social.url)}
                className="group flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 hover:bg-[rgba(0,212,170,0.08)] border border-transparent hover:border-[rgba(0,212,170,0.2)]"
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 shadow-sm"
                  style={{ 
                    backgroundColor: 'rgba(0,212,170,0.1)',
                    border: '1px solid var(--border)',
                    color: 'var(--accent)'
                  }}
                >
                  <span className="group-hover:-rotate-12 transition-transform duration-300 flex items-center justify-center">
                    {social.icon}
                  </span>
                </div>
                <div className="text-left">
                  <h5 className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">
                    {social.name}
                  </h5>
                  <p className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {social.handle}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;