import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Currency = 'USD' | 'CAD';

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amount: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

const DEFAULT: Currency = 'USD';

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  CAD: 1.35, // static example rate (USD -> CAD)
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const v = localStorage.getItem('currency');
      return (v as Currency) || DEFAULT;
    } catch {
      return DEFAULT;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('currency', currency);
    } catch {
      // ignore
    }
  }, [currency]);

  const setCurrency = (c: Currency) => setCurrencyState(c);

  const formatPrice = (amount: number) => {
    const rate = EXCHANGE_RATES[currency] || 1;
    const converted = amount * rate;
    const locale = currency === 'CAD' ? 'en-CA' : 'en-US';
    try {
      return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(converted);
    } catch {
      // fallback
      const symbol = currency === 'CAD' ? 'CA$' : '$';
      return `${symbol}${converted.toFixed(2)}`;
    }
  };

  const value = useMemo(() => ({ currency, setCurrency, formatPrice }), [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}

export default CurrencyContext;
