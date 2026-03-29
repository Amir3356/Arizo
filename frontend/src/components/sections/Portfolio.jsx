import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../hooks/usePortfolio';
import { DEFAULT_WEB_IMAGES_BY_ID } from '../../data/portfolioDefaults';

const GRADIENTS = [
  'from-amber-950/90 via-[rgba(15,21,40,0.92)] to-[#070b14]',
  'from-emerald-950/85 via-[rgba(15,21,40,0.92)] to-[#070b14]',
  'from-cyan-950/75 via-[rgba(15,21,40,0.92)] to-[#070b14]',
  'from-orange-950/85 via-[rgba(15,21,40,0.92)] to-[#070b14]',
  'from-violet-950/80 via-[rgba(15,21,40,0.92)] to-[#070b14]',
  'from-teal-950/85 via-[rgba(15,21,40,0.92)] to-[#070b14]',
];

function gradientClass(seed) {
  let h = 0;
  const s = String(seed);
  for (let i = 0; i < s.length; i += 1) h = s.charCodeAt(i) + ((h << 5) - h);
  return GRADIENTS[Math.abs(h) % GRADIENTS.length];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const Portfolio = () => {
  const { websites: websiteProjects, erp: erpProjects } = usePortfolio();

  const openProject = (url) => {
    if (!url || !/^https?:\/\//i.test(url)) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="portfolio"
      className="relative py-20 sm:py-28 md:py-32 px-[5%] overflow-hidden bg-transparent"
    >
      <div className="pointer-events-none absolute top-1/3 left-0 w-[420px] h-[420px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full bg-teal-500 opacity-[0.05] blur-[90px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14 md:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,212,170,0.35)] bg-[rgba(0,212,170,0.06)] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[var(--accent)] text-xs font-bold tracking-widest uppercase">Our work</span>
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
            style={{ color: 'var(--heading)' }}
          >
            Portfolio{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-teal-300">
              showcase
            </span>
          </h2>

          <p className="text-sm sm:text-base max-w-2xl mx-auto text-[var(--muted)] leading-relaxed mb-4">
            Live websites we delivered — plus custom ERP systems for buildings and education. Many sites credit{' '}
            <span className="text-[var(--accent)] font-semibold">Ariva Systems Solutions</span>.
          </p>

          <Link
            to="/admin"
            className="text-xs font-semibold text-[var(--accent)] hover:underline opacity-80 hover:opacity-100"
          >
            Manage projects (admin)
          </Link>
        </div>

        {/* Website projects */}
        <div className="mb-20 md:mb-24">
          <div className="flex flex-col items-center text-center mb-10 md:mb-12">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(0,212,170,0.12)] border border-[rgba(0,212,170,0.25)] text-xl mb-4">
              🌐
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--heading)] tracking-tight">
              Websites & platforms
            </h3>
            <p className="text-sm sm:text-base text-[var(--muted)] mt-3 max-w-xl mx-auto leading-relaxed">
              Production sites — open in a new tab to explore.
            </p>
          </div>

          {websiteProjects.length === 0 ? (
            <p className="text-center text-[var(--muted)] py-12 border border-dashed border-[var(--border)] rounded-3xl">
              No website projects yet. Add some in the admin dashboard.
            </p>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-7"
            >
              {websiteProjects.map((project) => {
                const heroSrc =
                  (project.image && String(project.image).trim()) ||
                  DEFAULT_WEB_IMAGES_BY_ID[project.id] ||
                  '';
                return (
                <motion.article
                  key={project.id}
                  variants={itemVariants}
                  className="group relative flex flex-col rounded-3xl overflow-hidden border border-[rgba(0,212,170,0.12)] bg-[rgba(14,21,40,0.88)] backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition-all duration-500 hover:border-[rgba(0,212,170,0.35)] hover:-translate-y-1 hover:shadow-[0_32px_70px_rgba(0,212,170,0.12)]"
                >
                  <button
                    type="button"
                    onClick={() => openProject(project.url)}
                    className="text-left flex flex-col flex-1 cursor-pointer"
                  >
                    <div className="relative h-48 sm:h-52 overflow-hidden shrink-0">
                      {heroSrc ? (
                        <img
                          src={heroSrc}
                          alt=""
                          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                            project.id === 'web-yosam' ? 'object-top' : 'object-center'
                          }`}
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className={`h-full w-full bg-gradient-to-br ${gradientClass(project.id || project.name)}`}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/40 to-transparent" />
                    </div>

                    <div className="flex flex-col flex-1 p-6 pt-5">
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors leading-snug">
                        {project.name}
                      </h4>
                      <p className="text-sm text-white/60 leading-relaxed flex-1 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between gap-3 pt-2 border-t border-[rgba(255,255,255,0.06)]">
                        <span className="text-xs font-bold text-[var(--accent)] flex items-center gap-1">
                          Visit site
                          <span aria-hidden className="transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                        <span className="text-[10px] text-white/35 truncate max-w-[50%]">{project.url}</span>
                      </div>
                    </div>
                  </button>
                </motion.article>
              );
              })}
            </motion.div>
          )}
        </div>

        {/* ERP */}
        <div>
          <div className="flex flex-col items-center text-center mb-10 md:mb-12">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(0,212,170,0.12)] border border-[rgba(0,212,170,0.25)] text-xl mb-4">
              ⚙️
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--heading)] tracking-tight">
              ERP & internal systems
            </h3>
            <p className="text-sm sm:text-base text-[var(--muted)] mt-3 max-w-xl mx-auto leading-relaxed">
              Custom platforms for operations — building management and schools.
            </p>
          </div>

          {erpProjects.length === 0 ? (
            <p className="text-center text-[var(--muted)] py-12 border border-dashed border-[var(--border)] rounded-3xl">
              No ERP projects listed. Add them in the admin dashboard.
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-7">
              {erpProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-2xl border border-[rgba(0,212,170,0.06)] bg-[rgba(14,21,40,0.88)] backdrop-blur-xl p-6 md:p-7 transition-all duration-500 hover:border-[rgba(0,212,170,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] min-h-[160px] flex flex-col"
                  style={{ border: '0.2px solid rgba(0,212,170,0.1)' }}
                >
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">{project.name}</h4>
                    <p className="text-sm text-white/55 leading-relaxed">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
