import React from 'react';

const OfficeLocation = () => {
  return (
    <section className="py-20 px-[5%] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">Visit Us</span>
          <h2 className="section-title">Our Office Location</h2>
          <p className="text-sm text-[var(--muted)] max-w-2xl mx-auto">
            Located in Goro, near Jackros Restaurant and Alamayehu Building
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Location Details */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--accent)] transition-all">
            <div className="mb-6">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="text-2xl font-bold mb-2 text-[var(--heading)]">Goro Office</h3>
              <p className="text-[var(--muted)] leading-relaxed">
                Near Jackros Restaurant<br />
                Alamayehu Building, 3rd Floor<br />
                Goro, Addis Ababa
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 text-[var(--accent)]">Nearby Landmarks</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[var(--muted)]">
                  <span className="text-[var(--accent)]">•</span> Jackros Restaurant (2 min walk)
                </li>
                <li className="flex items-center gap-2 text-[var(--muted)]">
                  <span className="text-[var(--accent)]">•</span> Alamayehu Building
                </li>
                <li className="flex items-center gap-2 text-[var(--muted)]">
                  <span className="text-[var(--accent)]">•</span> Goro Roundabout
                </li>
              </ul>
            </div>
            
            <a 
              href="https://maps.google.com/?q=Goro+Addis+Ababa+Jackros+Restaurant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Get Directions <span>→</span>
            </a>
          </div>
          
          {/* Google Maps Embed */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--accent)] transition-all">
            <iframe
              title="Office Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.578950043659!2d38.763856!3d9.024058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b6e3e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sGoro%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px]"
            ></iframe>
          </div>
        </div>
        
        {/* Landmark Info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.2)] rounded-full px-6 py-3">
            <span className="text-[var(--accent)] text-sm">📍</span>
            <span className="text-sm text-[var(--text)]">Landmark: Jackros Restaurant</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeLocation;