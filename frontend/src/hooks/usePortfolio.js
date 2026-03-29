import { useState, useEffect } from 'react';
import { getPortfolio, savePortfolio, PORTFOLIO_UPDATED_EVENT } from '../utils/portfolioStorage';

export function usePortfolio() {
  const [data, setData] = useState(() => getPortfolio());

  useEffect(() => {
    // Fetch portfolio from backend
    const fetchFromBackend = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (!res.ok) return;
        const json = await res.json();
        if (json.status !== 'ok') return;

        const websites = (json.data || [])
          .filter((item) => item.type === 'web')
          .map((item) => ({
            id: item.id.toString(),
            name: item.name,
            url: item.url || 'https://',
            description: item.description,
            image: item.image || '',
          }));

        const erp = (json.data || [])
          .filter((item) => item.type === 'erp')
          .map((item) => ({
            id: item.id.toString(),
            name: item.name,
            description: item.description,
          }));

        if (websites.length > 0 || erp.length > 0) {
          const portfolioData = { websites, erp };
          savePortfolio(portfolioData);
          setData(portfolioData);
        }
      } catch (err) {
        console.error('Failed to fetch portfolio from backend:', err);
      }
    };

    fetchFromBackend();

    const refresh = () => setData(getPortfolio());
    window.addEventListener(PORTFOLIO_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(PORTFOLIO_UPDATED_EVENT, refresh);
  }, []);

  return data;
}
