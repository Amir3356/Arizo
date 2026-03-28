import { DEFAULT_WEB_PROJECTS, DEFAULT_ERP_PROJECTS } from '../data/portfolioDefaults';

const STORAGE_KEY = 'ariva-portfolio-v1';

export const PORTFOLIO_UPDATED_EVENT = 'ariva-portfolio-updated';

function cloneDefaults() {
  return {
    websites: DEFAULT_WEB_PROJECTS.map((w) => ({ ...w })),
    erp: DEFAULT_ERP_PROJECTS.map((e) => ({ ...e, features: [...e.features] })),
  };
}

export function getPortfolio() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneDefaults();
    const parsed = JSON.parse(raw);
    return {
      websites: Array.isArray(parsed.websites) ? parsed.websites : cloneDefaults().websites,
      erp: Array.isArray(parsed.erp) ? parsed.erp : cloneDefaults().erp,
    };
  } catch {
    return cloneDefaults();
  }
}

export function savePortfolio(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event(PORTFOLIO_UPDATED_EVENT));
}

export function clearPortfolioStorage() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(PORTFOLIO_UPDATED_EVENT));
}
