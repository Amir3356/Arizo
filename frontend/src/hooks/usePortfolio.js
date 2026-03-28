import { useState, useEffect } from 'react';
import { getPortfolio, PORTFOLIO_UPDATED_EVENT } from '../utils/portfolioStorage';

export function usePortfolio() {
  const [data, setData] = useState(() => getPortfolio());

  useEffect(() => {
    const refresh = () => setData(getPortfolio());
    window.addEventListener(PORTFOLIO_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(PORTFOLIO_UPDATED_EVENT, refresh);
  }, []);

  return data;
}
