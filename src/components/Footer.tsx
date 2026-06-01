import { ShoppingCart, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';

const CURRENCY_OPTIONS = [
  {
    value: 'USD' as const,
    code: 'US',
    label: 'United States (USD $)',
    flag: 'https://flagcdn.com/w40/us.png',
  },
  {
    value: 'CAD' as const,
    code: 'CA',
    label: 'Canada (CAD $)',
    flag: 'https://flagcdn.com/w40/ca.png',
  },
];

type FooterProps = {
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

const SHOP_CATEGORIES = [
  { label: 'Electronics', slug: 'electronics' },
  { label: 'Grocery', slug: 'grocery' },
  { label: 'Fashion', slug: 'fashion' },
  { label: 'Home & Kitchen', slug: 'home-kitchen' },
  { label: 'Beauty & Care', slug: 'beauty-care' },
] as const;

export default function Footer({ onNavigate }: FooterProps) {
  const { currency, setCurrency } = useCurrency();
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const selectedCurrency = CURRENCY_OPTIONS.find((o) => o.value === currency) ?? CURRENCY_OPTIONS[0];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setEmailSubmitted(false);
      }, 2000);
    }
  };

  return (
    <footer className="bg-white text-gray-700">
      {/* Newsletter Subscription Section */}
      <div className="border-b border-gray-200 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Sign Up For MartX Updates</h2>
          <p className="text-gray-600 mb-6 text-sm">Get 15% OFF, and exclusive access to new products and future discounts.</p>
          
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <form onSubmit={handleEmailSubmit} className="flex-1 w-full">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full max-w-[320px] sm:max-w-md px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:border-orange-400"
                  required
                />
                <button
                  type="submit"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
              {emailSubmitted && <p className="text-green-600 text-sm mt-2">✓ Thanks for subscribing!</p>}
            </form>

            <div className="relative w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="w-full max-w-[325px] sm:max-w-md flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:border-orange-400 focus:outline-none focus:border-orange-400 transition-colors"
                aria-expanded={currencyOpen}
                aria-haspopup="listbox"
              >
                <img
                  src={selectedCurrency.flag}
                  alt={selectedCurrency.code}
                  className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                />
                <span className="flex-1 text-left text-sm truncate">
                  <span className="font-bold text-gray-900">{selectedCurrency.code}</span>
                  {' '}
                  <span className="font-medium text-gray-700">{selectedCurrency.label}</span>
                </span>
                <ChevronDown
                  size={18}
                  className={`text-gray-500 flex-shrink-0 transition-transform ${currencyOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {currencyOpen && (
                <div
                  className="absolute left-0 right-0 sm:right-auto sm:min-w-full top-full mt-1 z-50 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
                  role="listbox"
                >
                  {CURRENCY_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={currency === option.value}
                      onClick={() => {
                        setCurrency(option.value);
                        setCurrencyOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm hover:bg-orange-50 transition-colors ${
                        currency === option.value ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <img
                        src={option.flag}
                        alt={option.code}
                        className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                      />
                      <span>
                        <span className="font-bold">{option.code}</span>
                        {' '}
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 mb-5 group">
            <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <ShoppingCart size={20} className="text-white" />
            </div>
            <span className="text-gray-900 font-extrabold text-2xl">Mart<span className="text-orange-400">X</span></span>
          </button>
          <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">
            Your one-stop shop for everything you need. Quality products, great prices, and exceptional service.
          </p>
          <div className="flex items-center gap-3 mb-6">
            {[
              { Icon: Facebook, className: 'bg-[#1877F2] hover:bg-[#165fc7]' },
              { Icon: Instagram, className: 'bg-gradient-to-br from-[#fccc63] via-[#d9317a] to-[#833ab4]' },
              { Icon: Twitter, className: 'bg-[#1DA1F2] hover:bg-[#1792db]' },
              { Icon: Youtube, className: 'bg-[#FF0000] hover:bg-[#e50000]' },
            ].map(({ Icon, className }, i) => (
              <button
                key={i}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all text-white ${className}`}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-600">
              <Phone size={16} className="text-orange-400" />
              <span>1-800-MARTX</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Mail size={16} className="text-orange-400" />
              <span>hello@martx.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin size={16} className="text-orange-400" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-gray-900 font-bold mb-5 text-sm uppercase tracking-wider">Shop</h3>
          <ul className="space-y-3 text-sm">
            {SHOP_CATEGORIES.map(({ label, slug }) => (
              <li key={slug}>
                <button
                  onClick={() => onNavigate('category', { slug })}
                  className="text-gray-600 hover:text-orange-400 hover:translate-x-1 transition-all"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-gray-900 font-bold mb-5 text-sm uppercase tracking-wider">Help</h3>
          <ul className="space-y-3 text-sm">
            {['Track Your Order', 'Returns & Exchanges', 'Shipping Info', 'Contact Us', 'FAQ', 'Live Chat'].map((item) => (
              <li key={item}>
                <button className="text-gray-600 hover:text-orange-400 hover:translate-x-1 transition-all">{item}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-gray-900 font-bold mb-5 text-sm uppercase tracking-wider">Company</h3>
          <ul className="space-y-3 text-sm">
            {['About MartX', 'Careers', 'Press Center', 'Sustainability', 'Affiliates', 'Blog'].map((item) => (
              <li key={item}>
                <button className="text-gray-600 hover:text-orange-400 hover:translate-x-1 transition-all">{item}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © 2026 MartX. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-gray-500">
            <button className="hover:text-orange-400 transition-colors">Privacy</button>
            <button className="hover:text-orange-400 transition-colors">Terms</button>
            <button className="hover:text-orange-400 transition-colors">Cookies</button>
          </div>
          <div className="flex items-center gap-2">
            {['visa', 'mc', 'amex', 'paypal', 'apple'].map((method) => (
              <div key={method} className="w-12 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-xs font-bold uppercase">
                {method.slice(0, 2)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
