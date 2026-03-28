import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_WEB_PROJECTS, DEFAULT_ERP_PROJECTS } from '../data/portfolioDefaults';
import { getPortfolio, savePortfolio, clearPortfolioStorage } from '../utils/portfolioStorage';

const SESSION_KEY = 'ariva-portfolio-admin-ok';

function verifyAdminPassword(input) {
  const envKey = import.meta.env.VITE_ADMIN_PORTFOLIO_KEY;
  if (envKey && String(envKey).length > 0) return input === envKey;
  return import.meta.env.DEV && input === 'ariva-dev';
}

const emptyWeb = () => ({
  id: `web-${Date.now()}`,
  name: '',
  url: 'https://',
  description: '',
  image: '',
});

const emptyErp = () => ({
  id: `erp-${Date.now()}`,
  name: '',
  description: '',
  features: [],
  icon: '📦',
});

function loadFormState() {
  const { websites: w, erp: e } = getPortfolio();
  return {
    websites: w.map((x) => ({ ...x })),
    erp: e.map((x) => ({
      ...x,
      features: Array.isArray(x.features) ? [...x.features] : [],
    })),
  };
}

function AdminPortfolio() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [websites, setWebsites] = useState(() =>
    sessionStorage.getItem(SESSION_KEY) === '1' ? loadFormState().websites : []
  );
  const [erp, setErp] = useState(() =>
    sessionStorage.getItem(SESSION_KEY) === '1' ? loadFormState().erp : []
  );
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    if (!unlocked) return;
    const next = loadFormState();
    setWebsites(next.websites);
    setErp(next.erp);
  }, [unlocked]);

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    if (verifyAdminPassword(password)) {
      sessionStorage.setItem(SESSION_KEY, '1');
      const next = loadFormState();
      setWebsites(next.websites);
      setErp(next.erp);
      setUnlocked(true);
      setPassword('');
    } else {
      setAuthError('Invalid password. In development without VITE_ADMIN_PORTFOLIO_KEY, use: ariva-dev');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
  };

  const handleSave = () => {
    savePortfolio({
      websites: websites.map((w) => ({
        id: w.id || `web-${Date.now()}-${Math.random()}`,
        name: w.name.trim(),
        url: w.url.trim(),
        description: w.description.trim(),
        image: (w.image || '').trim(),
      })),
      erp: erp.map((row) => ({
        id: row.id || `erp-${Date.now()}-${Math.random()}`,
        name: row.name.trim(),
        description: row.description.trim(),
        icon: (row.icon || '📦').trim(),
        features: Array.isArray(row.features)
          ? row.features
          : String(row.features || '')
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
      })),
    });
    setSavedMsg('Saved. Portfolio page will use this data in this browser.');
    setTimeout(() => setSavedMsg(''), 4000);
  };

  const handleResetDefaults = () => {
    if (!window.confirm('Replace all portfolio data with built-in defaults?')) return;
    clearPortfolioStorage();
    setWebsites(DEFAULT_WEB_PROJECTS.map((w) => ({ ...w })));
    setErp(
      DEFAULT_ERP_PROJECTS.map((x) => ({
        ...x,
        features: [...x.features],
      }))
    );
    setSavedMsg('Reset to defaults (not saved yet — click Save to persist).');
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--bg)] text-[var(--text)]">
        <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8 shadow-xl">
          <h1 className="text-xl font-bold text-[var(--heading)] mb-2">Portfolio admin</h1>
          <p className="text-sm text-[var(--muted)] mb-6">
            Set <code className="text-[var(--accent)]">VITE_ADMIN_PORTFOLIO_KEY</code> in{' '}
            <code className="text-[var(--accent)]">frontend/.env</code> and restart the dev server. In dev only, if
            that variable is empty, password is <code className="text-[var(--accent)]">ariva-dev</code>.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg2)] px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)]"
              autoComplete="current-password"
            />
            {authError && <p className="text-sm text-red-400">{authError}</p>}
            <button
              type="submit"
              className="w-full rounded-xl bg-[var(--accent)] py-3 font-bold text-black hover:opacity-90"
            >
              Unlock
            </button>
          </form>
          <Link to="/project" className="mt-6 block text-center text-sm text-[var(--accent)] hover:underline">
            ← Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-[5%] py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-bold text-[var(--heading)]">Edit portfolio</h1>
            <p className="text-sm text-[var(--muted)] mt-1">
              Changes are stored in this browser (localStorage). Add{' '}
              <code className="text-[var(--accent)]">VITE_ADMIN_PORTFOLIO_KEY</code> for production.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:bg-[var(--surface)]"
            >
              Lock
            </button>
            <Link
              to="/project"
              className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:bg-[var(--surface)] inline-flex items-center"
            >
              View portfolio
            </Link>
          </div>
        </div>

        {savedMsg && (
          <div className="mb-6 rounded-xl border border-[rgba(0,212,170,0.35)] bg-[rgba(0,212,170,0.08)] px-4 py-3 text-sm text-[var(--accent)]">
            {savedMsg}
          </div>
        )}

        <section className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-bold text-[var(--heading)]">Website projects</h2>
            <button
              type="button"
              onClick={() => setWebsites((s) => [...s, emptyWeb()])}
              className="rounded-lg bg-[rgba(0,212,170,0.15)] px-3 py-1.5 text-sm font-bold text-[var(--accent)]"
            >
              + Add website
            </button>
          </div>
          <div className="space-y-6">
            {websites.map((w, i) => (
              <div
                key={w.id || i}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 space-y-3"
              >
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setWebsites((s) => s.filter((_, j) => j !== i))}
                    className="text-xs font-bold text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Name
                    <input
                      value={w.name}
                      onChange={(e) => {
                        const v = e.target.value;
                        setWebsites((s) => s.map((x, j) => (j === i ? { ...x, name: v } : x)));
                      }}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    URL
                    <input
                      value={w.url}
                      onChange={(e) => {
                        const v = e.target.value;
                        setWebsites((s) => s.map((x, j) => (j === i ? { ...x, url: v } : x)));
                      }}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-sm"
                    />
                  </label>
                </div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Description
                  <textarea
                    value={w.description}
                    onChange={(e) => {
                      const v = e.target.value;
                      setWebsites((s) => s.map((x, j) => (j === i ? { ...x, description: v } : x)));
                    }}
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-sm resize-y"
                  />
                </label>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Image URL (optional — e.g. /portfolio/photo.jpg or https://…)
                  <input
                    value={w.image || ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      setWebsites((s) => s.map((x, j) => (j === i ? { ...x, image: v } : x)));
                    }}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-sm"
                  />
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-bold text-[var(--heading)]">ERP projects</h2>
            <button
              type="button"
              onClick={() => setErp((s) => [...s, emptyErp()])}
              className="rounded-lg bg-[rgba(0,212,170,0.15)] px-3 py-1.5 text-sm font-bold text-[var(--accent)]"
            >
              + Add ERP project
            </button>
          </div>
          <div className="space-y-6">
            {erp.map((row, i) => (
              <div
                key={row.id || i}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 space-y-3"
              >
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setErp((s) => s.filter((_, j) => j !== i))}
                    className="text-xs font-bold text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Name
                    <input
                      value={row.name}
                      onChange={(e) => {
                        const v = e.target.value;
                        setErp((s) => s.map((x, j) => (j === i ? { ...x, name: v } : x)));
                      }}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Icon (emoji)
                    <input
                      value={row.icon}
                      onChange={(e) => {
                        const v = e.target.value;
                        setErp((s) => s.map((x, j) => (j === i ? { ...x, icon: v } : x)));
                      }}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-sm"
                    />
                  </label>
                </div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Description
                  <textarea
                    value={row.description}
                    onChange={(e) => {
                      const v = e.target.value;
                      setErp((s) => s.map((x, j) => (j === i ? { ...x, description: v } : x)));
                    }}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-sm resize-y"
                  />
                </label>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Features (comma-separated)
                  <input
                    value={Array.isArray(row.features) ? row.features.join(', ') : row.features}
                    onChange={(e) => {
                      const v = e.target.value;
                      setErp((s) =>
                        s.map((x, j) =>
                          j === i
                            ? {
                                ...x,
                                features: v
                                  .split(',')
                                  .map((t) => t.trim())
                                  .filter(Boolean),
                              }
                            : x
                        )
                      );
                    }}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-sm"
                  />
                </label>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-[var(--accent)] px-8 py-3 font-bold text-black hover:opacity-90"
          >
            Save to browser
          </button>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="rounded-xl border border-[var(--border)] px-8 py-3 font-bold hover:bg-[var(--surface)]"
          >
            Load defaults (clear storage)
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPortfolio;
