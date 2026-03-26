import React, { useState } from 'react';

const LeadershipTeam = () => {
  const [activeTab, setActiveTab] = useState('CEO');

  const leaders = {
    CEO: [
      {
        name: 'Debeb Ketema Adugna',
        title: 'Chief Executive Officer & Founder',
        description: 'Visionary tech leader with 15+ years of experience driving digital transformation across Ethiopian enterprises.',
        icon: '👨‍💼',
        company: 'YanolTech'
      }
    ],
    Executives: [
      {
        name: 'Muluken Tilahun Molla',
        title: 'Chief Operating Officer (COO)',
        description: 'Technology innovator specializing in scalable cloud architectures and enterprise software systems.',
        icon: '👨‍💻',
        company: 'YanolTech'
      },
      {
        name: 'Ayana Basha Challie',
        title: 'Chief Technology Officer (CTO)',
        description: 'Operations excellence expert focused on scaling business processes and ensuring exceptional client delivery.',
        icon: '👩‍💻',
        company: 'YanolTech'
      },
      {
        name: 'Fikiru Ababe',
        title: 'Industry Consultant (Health & Arts)',
        description: 'Product strategist passionate about creating user-centric solutions that solve real Ethiopian business challenges.',
        icon: '👨‍🎨',
        company: 'YanolTech'
      }
    ],
    Managers: [
      {
        name: 'Elias Derbew',
        title: 'Engineering Manager - Backend Systems',
        description: 'Backend specialist focused on building robust, scalable server architectures and database systems.',
        icon: '⚙️',
        company: 'YanolTech'
      },
      {
        name: 'Hiwot Alemayehu',
        title: 'Engineering Manager - Frontend & Mobile',
        description: 'Frontend expert creating intuitive user interfaces that delight users across web and mobile platforms.',
        icon: '🎨',
        company: 'YanolTech'
      },
      {
        name: 'Getachew Assefa',
        title: 'Engineering Manager - DevOps & Infrastructure',
        description: 'DevOps expert ensuring continuous delivery, system reliability, and infrastructure automation.',
        icon: '🚀',
        company: 'YanolTech'
      },
      {
        name: 'Selam Kifle',
        title: 'Project Manager - Client Success',
        description: 'Client success advocate ensuring seamless project delivery and exceptional customer satisfaction.',
        icon: '📋',
        company: 'YanolTech'
      }
    ]
  };

  const tabs = [
    { key: 'CEO', label: 'CEO', count: leaders.CEO.length },
    { key: 'Executives', label: 'Executives', count: leaders.Executives.length },
    { key: 'Managers', label: 'Managers', count: leaders.Managers.length }
  ];

  return (
    <section className="py-20 px-[5%] bg-[var(--bg2)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">Our Leadership</span>
          <h2 className="section-title">Experienced Leadership</h2>
          <p className="text-sm text-[var(--muted)] max-w-2xl mx-auto">
            Visionary Leaders Driving Innovation
          </p>
          <p className="text-sm text-[var(--muted)] mt-2">
            Our leadership team brings a strong technical background, business insight, and a commitment to building long-lasting products and partnerships.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === tab.key 
                  ? 'bg-[var(--accent)] text-[var(--bg)]' 
                  : 'bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--accent)] hover:text-[var(--bg)]'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
        
        {/* Leaders Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders[activeTab].map((leader, index) => (
            <div 
              key={index} 
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] transition-all hover:-translate-y-2 group"
            >
              <div className="text-5xl mb-4">{leader.icon}</div>
              <h3 className="text-xl font-bold mb-1 text-[var(--heading)]">{leader.name}</h3>
              <p className="text-sm text-[var(--accent)] mb-3">{leader.title}</p>
              <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">{leader.description}</p>
              <button className="text-sm text-[var(--accent)] hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                View Details <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;