import React, { useState, useEffect } from 'react';
import { savePortfolio, PORTFOLIO_UPDATED_EVENT } from '../utils/portfolioStorage';

const SESSION_KEY = 'ariva-portfolio-admin-ok';

function AdminPortfolio() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [websites, setWebsites] = useState([]);
  const [erp, setErp] = useState([]);
  const [savedMsg, setSavedMsg] = useState('');
  
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('ariva-theme') || 'dark');

  const [contacts, setContacts] = useState([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [contactsError, setContactsError] = useState('');
  const [editingContact, setEditingContact] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', subject: '', message: '' });

  // New project form state
  const [showAddWeb, setShowAddWeb] = useState(false);
  const [showAddErp, setShowAddErp] = useState(false);
  const [newWeb, setNewWeb] = useState({ name: '', url: 'https://', description: '', image: '' });
  const [newErp, setNewErp] = useState({ name: '', description: '', image: '' });

  // Editing state
  const [editingWeb, setEditingWeb] = useState(null);
  const [editingErp, setEditingErp] = useState(null);
  const [editWebForm, setEditWebForm] = useState({});
  const [editErpForm, setEditErpForm] = useState({});

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('ariva-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const fetchContacts = async () => {
    setIsLoadingContacts(true);
    setContactsError('');
    try {
      const res = await fetch('/api/contact');
      if (!res.ok) throw new Error('Unable to fetch contacts');
      const data = await res.json();
      if (data?.status !== 'ok') throw new Error(data?.message || 'Unexpected response');
      setContacts(data.data || []);
    } catch (err) {
      setContactsError(err.message || 'Failed to load contacts');
    } finally {
      setIsLoadingContacts(false);
    }
  };

  useEffect(() => {
    if (!unlocked) return;
    loadPortfolioFromBackend();
    fetchContacts();
  }, [unlocked]);

  const handleDeleteWeb = async (id) => {
    if (!window.confirm('Are you sure you want to delete this website project?')) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      const newWebsites = websites.filter((w) => w.id !== id);
      setWebsites(newWebsites);
      savePortfolio({ websites: newWebsites, erp });
      setSavedMsg('Website project deleted successfully');
    } catch (err) {
      setSavedMsg('Error deleting: ' + err.message);
    }
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleDeleteErp = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ERP project?')) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      const newErp = erp.filter((e) => e.id !== id);
      setErp(newErp);
      savePortfolio({ websites, erp: newErp });
      setSavedMsg('ERP project deleted successfully');
    } catch (err) {
      setSavedMsg('Error deleting: ' + err.message);
    }
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleEditWeb = (project) => {
    setEditingWeb(project.id);
    setEditWebForm({ ...project });
  };

  const handleEditErp = (project) => {
    setEditingErp(project.id);
    setEditErpForm({ ...project });
  };

  const handleSaveEditWeb = async (id) => {
    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'web',
          name: editWebForm.name,
          url: editWebForm.url,
          description: editWebForm.description,
          image: editWebForm.image,
        }),
      });
      if (!res.ok) throw new Error('Failed to update');
      const newWebsites = websites.map((w) => (w.id === id ? { ...editWebForm } : w));
      setWebsites(newWebsites);
      savePortfolio({ websites: newWebsites, erp });
      setEditingWeb(null);
      setSavedMsg('Website project updated successfully');
    } catch (err) {
      setSavedMsg('Error updating: ' + err.message);
    }
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleSaveEditErp = async (id) => {
    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'erp',
          name: editErpForm.name,
          description: editErpForm.description,
          image: editErpForm.image,
        }),
      });
      if (!res.ok) throw new Error('Failed to update');
      const newErp = erp.map((e) => (e.id === id ? { ...editErpForm } : e));
      setErp(newErp);
      savePortfolio({ websites, erp: newErp });
      setEditingErp(null);
      setSavedMsg('ERP project updated successfully');
    } catch (err) {
      setSavedMsg('Error updating: ' + err.message);
    }
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleUploadImage = async (e, setField) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.status === 'ok') {
        setField(data.imageUrl);
      }
    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert('Error deleting contact: ' + err.message);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact.id);
    setEditForm({ name: contact.name, email: contact.email, subject: contact.subject || '', message: contact.message });
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setEditForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleSaveEdit = (id) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...editForm } : c)));
    handleCancelEdit();
    setSavedMsg('Contact updated locally. Note: backend edit endpoint not implemented.');
    setTimeout(() => setSavedMsg(''), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoggingIn) return;
    setAuthError('');
    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem(SESSION_KEY, '1');
        loadPortfolioFromBackend();
        fetchContacts();
        setUnlocked(true);
        setUsername('');
        setPassword('');
      } else {
        setAuthError(data.error || 'Invalid username or password');
      }
    } catch (err) {
      setAuthError('Network error. Please check if backend server is running.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
  };

  const handleAddWeb = async () => {
    if (!newWeb.name.trim() || !newWeb.description.trim()) {
      setSavedMsg('Name and description are required');
      setTimeout(() => setSavedMsg(''), 3000);
      return;
    }
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'web',
          name: newWeb.name.trim(),
          url: newWeb.url.trim(),
          description: newWeb.description.trim(),
          image: newWeb.image || null,
        }),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to add project');
      }
      
      const data = await res.json();
      if (data.status === 'success') {
        const newWebsites = [{ id: data.data.id.toString(), ...newWeb }, ...websites];
        setWebsites(newWebsites);
        savePortfolio({ websites: newWebsites, erp });
        setNewWeb({ name: '', url: 'https://', description: '', image: '' });
        setShowAddWeb(false);
        setSavedMsg('Website project added successfully');
      }
    } catch (err) {
      setSavedMsg('Error adding project: ' + err.message);
    }
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleAddErp = async () => {
    if (!newErp.name.trim() || !newErp.description.trim()) {
      setSavedMsg('Name and description are required');
      setTimeout(() => setSavedMsg(''), 3000);
      return;
    }
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'erp',
          name: newErp.name.trim(),
          description: newErp.description.trim(),
          image: newErp.image || null,
        }),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to add project');
      }
      
      const data = await res.json();
      if (data.status === 'success') {
        const newErpList = [{ id: data.data.id.toString(), ...newErp }, ...erp];
        setErp(newErpList);
        savePortfolio({ websites, erp: newErpList });
        setNewErp({ name: '', description: '', image: '' });
        setShowAddErp(false);
        setSavedMsg('ERP project added successfully');
      }
    } catch (err) {
      setSavedMsg('Error adding project: ' + err.message);
    }
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const loadPortfolioFromBackend = async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (!res.ok) throw new Error('Could not load portfolio data');
      const json = await res.json();
      if (json.status !== 'ok') throw new Error(json.message || 'Fetch failed');

      const remoteSites = (json.data || []).filter((item) => item.type === 'web');
      const remoteErp = (json.data || []).filter((item) => item.type === 'erp');

      const websitesData = remoteSites.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        url: item.url || 'https://',
        description: item.description,
        image: item.image || '',
      }));

      const erpData = remoteErp.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        description: item.description,
        image: item.image || '',
      }));

      setWebsites(websitesData);
      setErp(erpData);
      
      // Save to localStorage so website Portfolio component can access
      savePortfolio({ websites: websitesData, erp: erpData });

      setSavedMsg('');
    } catch (err) {
      console.error('Backend portfolio load failed:', err);
      // If backend fails, keep empty arrays
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--bg)] text-[var(--text)]">
        <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8 shadow-xl">
          <h1 className="text-xl font-bold text-[var(--heading)] mb-2 text-center">Admin page</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg2)] px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)]"
              autoComplete="username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg2)] px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)]"
              autoComplete="current-password"
            />
            {authError && <p className="text-sm text-red-400">{authError}</p>}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full rounded-xl bg-[var(--accent)] py-3 font-bold text-black hover:opacity-90 disabled:opacity-50"
            >
              {isLoggingIn ? 'Logging in...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-4 sm:px-[5%] py-6 sm:py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--heading)]">Edit portfolio</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg sm:rounded-xl border border-[var(--border)] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold hover:bg-[var(--surface)] transition-colors"
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg sm:rounded-xl border border-red-500 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-red-400 hover:bg-red-500 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {savedMsg && (
          <div className="mb-4 sm:mb-6 rounded-lg sm:rounded-xl border border-[rgba(0,212,170,0.35)] bg-[rgba(0,212,170,0.08)] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-[var(--accent)]">
            {savedMsg}
          </div>
        )}

        <section className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-base sm:text-lg font-bold text-[var(--heading)]">Website projects ({websites.length})</h2>
            <button
              type="button"
              onClick={() => setShowAddWeb(!showAddWeb)}
              className="rounded-lg bg-[rgba(0,212,170,0.15)] px-3 py-1.5 text-xs sm:text-sm font-bold text-[var(--accent)] self-start sm:self-auto"
            >
              {showAddWeb ? 'Cancel' : '+ Add website'}
            </button>
          </div>

          {/* Add new website form */}
          {showAddWeb && (
            <div className="rounded-xl sm:rounded-2xl border border-[var(--accent)] bg-[var(--card-bg)] p-4 sm:p-5 space-y-3 mb-6">
              <h3 className="text-xs sm:text-sm font-bold text-[var(--accent)]">Add New Website Project</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Name *
                  <input
                    value={newWeb.name}
                    onChange={(e) => setNewWeb((f) => ({ ...f, name: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-xs sm:text-sm"
                    placeholder="Project name"
                  />
                </label>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  URL
                  <input
                    value={newWeb.url}
                    onChange={(e) => setNewWeb((f) => ({ ...f, url: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-xs sm:text-sm"
                    placeholder="https://example.com"
                  />
                </label>
              </div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Description *
                <textarea
                  value={newWeb.description}
                  onChange={(e) => setNewWeb((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-xs sm:text-sm resize-y"
                  placeholder="Describe the project..."
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Image
                <div className="mt-1 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  {newWeb.image && (
                    <img src={newWeb.image} alt="Preview" className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border border-[var(--border)]" />
                  )}
                  <label className="cursor-pointer rounded-lg border border-dashed border-[var(--border)] bg-[var(--bg2)] px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold hover:bg-[var(--surface)] transition-colors flex items-center justify-center w-full sm:w-auto min-h-[60px] sm:min-w-[160px] sm:min-h-[80px]">
                    <span className="text-center">Choose Upload a file</span>
                    <input type="file" accept="image/*" onChange={(e) => handleUploadImage(e, (url) => setNewWeb((f) => ({ ...f, image: url })))} className="hidden" />
                  </label>
                </div>
              </label>
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleAddWeb}
                  className="rounded-lg bg-[var(--accent)] px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold text-black hover:opacity-90"
                >
                  Add Project
                </button>
              </div>
            </div>
          )}

          {/* Existing website projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {websites.map((w, i) => (
              <div
                key={w.id || i}
                className="rounded-xl sm:rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-4 sm:p-5 space-y-3"
              >
                {editingWeb === w.id ? (
                  /* Edit mode */
                  <>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleSaveEditWeb(w.id)} className="text-xs font-bold text-green-400 hover:underline">Save</button>
                      <button onClick={() => setEditingWeb(null)} className="text-xs font-bold text-gray-400 hover:underline">Cancel</button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                        Name
                        <input
                          value={editWebForm.name || ''}
                          onChange={(e) => setEditWebForm((f) => ({ ...f, name: e.target.value }))}
                          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-sm"
                        />
                      </label>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                        URL
                        <input
                          value={editWebForm.url || ''}
                          onChange={(e) => setEditWebForm((f) => ({ ...f, url: e.target.value }))}
                          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-sm"
                        />
                      </label>
                    </div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      Description
                      <textarea
                        value={editWebForm.description || ''}
                        onChange={(e) => setEditWebForm((f) => ({ ...f, description: e.target.value }))}
                        rows={3}
                        className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-sm resize-y"
                      />
                    </label>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      Image
                      <div className="mt-1 flex items-center gap-3">
                        {editWebForm.image && (
                          <img src={editWebForm.image} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-[var(--border)]" />
                        )}
                        <label className="cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-4 py-2 text-sm font-semibold hover:bg-[var(--surface)] transition-colors">
                          Change image
                          <input type="file" accept="image/*" onChange={(e) => handleUploadImage(e, (url) => setEditWebForm((f) => ({ ...f, image: url })))} className="hidden" />
                        </label>
                      </div>
                    </label>
                  </>
                ) : (
                  /* View mode */
                  <>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEditWeb(w)} className="text-xs font-bold text-blue-400 hover:underline">Edit</button>
                      <button onClick={() => handleDeleteWeb(w.id)} className="text-xs font-bold text-red-400 hover:underline">Delete</button>
                    </div>
                    <div className="flex gap-4">
                      {w.image && (
                        <img src={w.image} alt={w.name} className="w-24 h-24 object-cover rounded-lg border border-[var(--border)]" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[var(--heading)]">{w.name}</h3>
                        <p className="text-sm text-[var(--muted)] mt-1 truncate">{w.url}</p>
                        <p className="text-sm mt-2 break-words overflow-hidden line-clamp-3">{w.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-base sm:text-lg font-bold text-[var(--heading)]">ERP projects ({erp.length})</h2>
            <button
              type="button"
              onClick={() => setShowAddErp(!showAddErp)}
              className="rounded-lg bg-[rgba(0,212,170,0.15)] px-3 py-1.5 text-xs sm:text-sm font-bold text-[var(--accent)] self-start sm:self-auto"
            >
              {showAddErp ? 'Cancel' : '+ Add ERP project'}
            </button>
          </div>

          {/* Add new ERP form */}
          {showAddErp && (
            <div className="rounded-xl sm:rounded-2xl border border-[var(--accent)] bg-[var(--card-bg)] p-4 sm:p-5 space-y-3 mb-6">
              <h3 className="text-xs sm:text-sm font-bold text-[var(--accent)]">Add New ERP Project</h3>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Name *
                <input
                  value={newErp.name}
                  onChange={(e) => setNewErp((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-xs sm:text-sm"
                  placeholder="Project name"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Description *
                <textarea
                  value={newErp.description}
                  onChange={(e) => setNewErp((f) => ({ ...f, description: e.target.value }))}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-xs sm:text-sm resize-y"
                  placeholder="Describe the project..."
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Image
                <div className="mt-1 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  {newErp.image && (
                    <img src={newErp.image} alt="Preview" className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border border-[var(--border)]" />
                  )}
                  <label className="cursor-pointer rounded-lg border border-dashed border-[var(--border)] bg-[var(--bg2)] px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold hover:bg-[var(--surface)] transition-colors flex items-center justify-center w-full sm:w-auto min-h-[60px] sm:min-w-[160px] sm:min-h-[80px]">
                    <span className="text-center">Choose Upload a file</span>
                    <input type="file" accept="image/*" onChange={(e) => handleUploadImage(e, (url) => setNewErp((f) => ({ ...f, image: url })))} className="hidden" />
                  </label>
                </div>
              </label>
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleAddErp}
                  className="rounded-lg bg-[var(--accent)] px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold text-black hover:opacity-90"
                >
                  Add Project
                </button>
              </div>
            </div>
          )}

          {/* Existing ERP projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {erp.map((row, i) => (
              <div
                key={row.id || i}
                className="rounded-xl sm:rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-4 sm:p-5 space-y-3"
              >
                {editingErp === row.id ? (
                  /* Edit mode */
                  <>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleSaveEditErp(row.id)} className="text-xs font-bold text-green-400 hover:underline">Save</button>
                      <button onClick={() => setEditingErp(null)} className="text-xs font-bold text-gray-400 hover:underline">Cancel</button>
                    </div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      Name
                      <input
                        value={editErpForm.name || ''}
                        onChange={(e) => setEditErpForm((f) => ({ ...f, name: e.target.value }))}
                        className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      Description
                      <textarea
                        value={editErpForm.description || ''}
                        onChange={(e) => setEditErpForm((f) => ({ ...f, description: e.target.value }))}
                        rows={2}
                        className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-3 py-2 text-sm resize-y"
                      />
                    </label>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      Image
                      <div className="mt-1 flex items-center gap-3">
                        {editErpForm.image && (
                          <img src={editErpForm.image} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-[var(--border)]" />
                        )}
                        <label className="cursor-pointer rounded-lg border border-dashed border-[var(--border)] bg-[var(--bg2)] px-6 py-4 text-sm font-semibold hover:bg-[var(--surface)] transition-colors flex items-center justify-center min-w-[160px] min-h-[80px]">
                          <span className="text-center">Choose Upload a file</span>
                          <input type="file" accept="image/*" onChange={(e) => handleUploadImage(e, (url) => setEditErpForm((f) => ({ ...f, image: url })))} className="hidden" />
                        </label>
                      </div>
                    </label>
                  </>
                ) : (
                  /* View mode */
                  <>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEditErp(row)} className="text-xs font-bold text-blue-400 hover:underline">Edit</button>
                      <button onClick={() => handleDeleteErp(row.id)} className="text-xs font-bold text-red-400 hover:underline">Delete</button>
                    </div>
                    <div className="flex gap-4">
                      {row.image && (
                        <img src={row.image} alt={row.name} className="w-24 h-24 object-cover rounded-lg border border-[var(--border)]" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[var(--heading)]">{row.name}</h3>
                        <p className="text-sm mt-2 break-words overflow-hidden line-clamp-3">{row.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 sm:mt-10 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[var(--border)] bg-[var(--card-bg)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
            <h2 className="text-base sm:text-lg font-bold text-[var(--heading)]">Contact submissions</h2>
            <span className="text-xs sm:text-sm text-[var(--muted)]">{contacts.length} records</span>
          </div>

          {isLoadingContacts && <p className="text-sm text-[var(--muted)]">Loading contacts...</p>}
          {contactsError && <p className="text-sm text-red-400">Error: {contactsError}</p>}

          {!isLoadingContacts && !contactsError && contacts.length === 0 && (
            <p className="text-sm text-[var(--muted)]">No contacts found yet.</p>
          )}

          {!isLoadingContacts && contacts.length > 0 && (
            <div className="overflow-x-auto max-h-[340px] border border-[var(--border)] rounded-lg">
              <table className="w-full text-left text-sm">
                <thead className="bg-[var(--bg2)] sticky top-0">
                  <tr>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">Subject</th>
                    <th className="px-3 py-2">Message</th>
                    <th className="px-3 py-2">Date</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id} className="hover:bg-[var(--bg2)] border-t border-[var(--border)]">
                      <td className="px-3 py-2 align-top break-words max-w-[12rem]">
                        {editingContact === c.id ? (
                          <input value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} className="w-full rounded border border-[var(--border)] bg-[var(--bg2)] px-2 py-1 text-sm" />
                        ) : (
                          c.name
                        )}
                      </td>
                      <td className="px-3 py-2 align-top break-words max-w-[14rem]">
                        {editingContact === c.id ? (
                          <input value={editForm.email} onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))} className="w-full rounded border border-[var(--border)] bg-[var(--bg2)] px-2 py-1 text-sm" />
                        ) : (
                          c.email
                        )}
                      </td>
                      <td className="px-3 py-2 align-top break-words max-w-[14rem]">
                        {editingContact === c.id ? (
                          <input value={editForm.subject} onChange={(e) => setEditForm((f) => ({ ...f, subject: e.target.value }))} className="w-full rounded border border-[var(--border)] bg-[var(--bg2)] px-2 py-1 text-sm" />
                        ) : (
                          c.subject
                        )}
                      </td>
                      <td className="px-3 py-2 align-top break-words max-w-[24rem]">
                        {editingContact === c.id ? (
                          <textarea value={editForm.message} onChange={(e) => setEditForm((f) => ({ ...f, message: e.target.value }))} rows={2} className="w-full rounded border border-[var(--border)] bg-[var(--bg2)] px-2 py-1 text-sm resize-y" />
                        ) : (
                          c.message
                        )}
                      </td>
                      <td className="px-3 py-2 align-top whitespace-nowrap">{new Date(c.created_at).toLocaleString()}</td>
                      <td className="px-3 py-2 align-top whitespace-nowrap">
                        {editingContact === c.id ? (
                          <div className="flex gap-2">
                            <button onClick={() => handleSaveEdit(c.id)} className="text-xs font-bold text-green-400 hover:underline">Save</button>
                            <button onClick={handleCancelEdit} className="text-xs font-bold text-gray-400 hover:underline">Cancel</button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button onClick={() => handleEditContact(c)} className="text-xs font-bold text-blue-400 hover:underline">Edit</button>
                            <button onClick={() => handleDeleteContact(c.id)} className="text-xs font-bold text-red-400 hover:underline">Delete</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminPortfolio;
