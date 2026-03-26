import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({ fullName: '', phone: '', email: '', message: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const contactInfo = [
    { icon: '📞', title: 'Phone', detail: '+251 (0) 000 000 000' },
    { icon: '📧', title: 'Email', detail: 'info@arivasystems.et' },
    { icon: '📍', title: 'Address', detail: 'Goro, Addis Ababa, Ethiopia' },
    { icon: '🕐', title: 'Working Hours', detail: 'Mon–Fri: 8:00 AM – 6:00 PM EAT' }
  ];

  return (
    <section id="contact" className="py-20 px-[5%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="contact-left">
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">Let's Build Something Great</h2>
            <p className="contact-description text-sm leading-relaxed text-[var(--muted)] mb-8">
              Ready to grow your business with website design or ERP solutions?
              Contact us today and let's start the conversation.
            </p>
            
            <form className="contact-form flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="form-row grid md:grid-cols-2 gap-4">
                <div className="form-group flex flex-col gap-1.5">
                  <label className="text-[0.75rem] font-semibold text-[var(--muted)] font-inter">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-sm text-[var(--text)] font-inter transition-colors focus:border-[var(--accent)] outline-none"
                  />
                </div>
                <div className="form-group flex flex-col gap-1.5">
                  <label className="text-[0.75rem] font-semibold text-[var(--muted)] font-inter">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+251 ..."
                    className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-sm text-[var(--text)] font-inter transition-colors focus:border-[var(--accent)] outline-none"
                  />
                </div>
              </div>
              <div className="form-group flex flex-col gap-1.5">
                <label className="text-[0.75rem] font-semibold text-[var(--muted)] font-inter">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                  className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-sm text-[var(--text)] font-inter transition-colors focus:border-[var(--accent)] outline-none"
                />
              </div>
              <div className="form-group flex flex-col gap-1.5">
                <label className="text-[0.75rem] font-semibold text-[var(--muted)] font-inter">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project…"
                  rows="4"
                  className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-sm text-[var(--text)] font-inter transition-colors focus:border-[var(--accent)] outline-none resize-y"
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-fit border-none cursor-pointer">
                Send Message →
              </button>
            </form>
            
            {showSuccess && (
              <div className="mt-4 p-4 bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.3)] rounded-lg text-[var(--accent)] font-semibold backdrop-blur-sm">
                ✓ Message sent! We'll get back to you shortly.
              </div>
            )}
          </div>
          
          {/* Contact Info */}
          <div className="contact-info flex flex-col gap-5 reveal">
            {contactInfo.map(info => (
              <div key={info.title} className="contact-item flex gap-3.5 items-start bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-xl p-5 transition-all hover:bg-[rgba(26,34,64,0.95)] hover:border-[var(--accent)]">
                <div className="ico w-10 h-10 rounded-lg bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.2)] flex items-center justify-center text-base flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1 font-jakarta">{info.title}</h4>
                  <p className="text-[0.8rem] text-[var(--muted)]">{info.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;