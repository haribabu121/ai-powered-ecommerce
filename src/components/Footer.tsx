import { ShoppingCart, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

type FooterProps = {
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 mb-5 group">
            <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <ShoppingCart size={20} className="text-white" />
            </div>
            <span className="text-white font-extrabold text-2xl">Mart<span className="text-orange-400">X</span></span>
          </button>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
            Your one-stop destination for quality products. We bring the best brands right to your doorstep with fast shipping and great prices.
          </p>
          <div className="flex items-center gap-3 mb-6">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <button key={i} className="w-10 h-10 rounded-xl bg-slate-700/50 hover:bg-gradient-to-br hover:from-orange-500 hover:to-rose-500 flex items-center justify-center transition-all text-slate-400 hover:text-white">
                <Icon size={18} />
              </button>
            ))}
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-slate-400">
              <Phone size={16} className="text-orange-400" />
              <span>1-800-MARTX</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Mail size={16} className="text-orange-400" />
              <span>hello@martx.com</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <MapPin size={16} className="text-orange-400" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Shop</h3>
          <ul className="space-y-3 text-sm">
            {['Electronics', 'Grocery', 'Fashion', 'Home & Kitchen', 'Beauty'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => onNavigate('category', { slug: item.toLowerCase().replace(/[^a-z]+/g, '-').replace(/-+$/, '') })}
                  className="text-slate-400 hover:text-orange-400 hover:translate-x-1 transition-all"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Help</h3>
          <ul className="space-y-3 text-sm">
            {['Track Your Order', 'Returns & Exchanges', 'Shipping Info', 'Contact Us', 'FAQ', 'Live Chat'].map((item) => (
              <li key={item}>
                <button className="text-slate-400 hover:text-orange-400 hover:translate-x-1 transition-all">{item}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Company</h3>
          <ul className="space-y-3 text-sm">
            {['About MartX', 'Careers', 'Press Center', 'Sustainability', 'Affiliates', 'Blog'].map((item) => (
              <li key={item}>
                <button className="text-slate-400 hover:text-orange-400 hover:translate-x-1 transition-all">{item}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-700/50 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2026 MartX. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <button className="hover:text-orange-400 transition-colors">Privacy</button>
            <button className="hover:text-orange-400 transition-colors">Terms</button>
            <button className="hover:text-orange-400 transition-colors">Cookies</button>
          </div>
          <div className="flex items-center gap-2">
            {['visa', 'mc', 'amex', 'paypal', 'apple'].map((method) => (
              <div key={method} className="w-12 h-7 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-500 text-xs font-bold uppercase">
                {method.slice(0, 2)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
