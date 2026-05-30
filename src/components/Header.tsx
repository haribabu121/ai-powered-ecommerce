import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Menu, X, Heart, Package, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { Category } from '../lib/supabase';

type HeaderProps = {
  categories: Category[];
  onSearch: (query: string) => void;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  currentPage: string;
};

export default function Header({ categories, onSearch, onNavigate, currentPage }: HeaderProps) {
  const { itemCount } = useCart();
  const { user, profile, signOut } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      onNavigate('search', { q: searchQuery.trim() });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    onNavigate('home');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white'
    }`}>
      {/* Main nav - single line, clean design */}
      <div className="flex items-center px-4 lg:px-8 h-16">
        {/* Logo - left side */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 flex-shrink-0 mr-6"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-rose-500 rounded-xl flex items-center justify-center shadow-md">
            <ShoppingCart size={20} className="text-white" />
          </div>
          <span className="text-slate-800 font-extrabold text-xl hidden sm:block">
            Mart<span className="text-orange-500">X</span>
          </span>
        </button>

        {/* Search - center, takes remaining space */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-100 text-slate-800 placeholder-slate-400 rounded-full border-2 border-transparent focus:outline-none focus:border-orange-300 focus:bg-white transition-all"
            />
          </div>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => user ? setUserMenuOpen(!userMenuOpen) : onNavigate('signin')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user && profile?.full_name ? profile.full_name[0].toUpperCase() : <User size={16} />}
              </div>
              <span className="hidden md:block text-sm font-medium text-slate-700 max-w-[120px] truncate">
                {user ? (profile?.full_name || 'Account') : 'Sign In'}
              </span>
              {user && <ChevronDown size={14} className="text-slate-400" />}
            </button>

            {/* Dropdown menu */}
            {user && userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="font-semibold text-slate-800">{profile?.full_name || 'User'}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
                <button
                  onClick={() => { onNavigate('orders'); setUserMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <Package size={18} />
                  <span className="text-sm font-medium">My Orders</span>
                </button>
                <button
                  onClick={() => { onNavigate('wishlist'); setUserMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <Heart size={18} />
                  <span className="text-sm font-medium">Wishlist</span>
                </button>
                <button
                  onClick={() => { onNavigate('account'); setUserMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <User size={18} />
                  <span className="text-sm font-medium">Account Settings</span>
                </button>
                <div className="border-t border-slate-100 mt-2 pt-2">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={() => onNavigate('wishlist')}
            className="relative p-2.5 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors hidden sm:block"
          >
            <Heart size={22} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {wishlistItems.length > 99 ? '99+' : wishlistItems.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => onNavigate('cart')}
            className="relative flex items-center gap-2 bg-gradient-to-r from-orange-400 to-rose-500 text-white px-4 py-2.5 rounded-xl hover:shadow-lg transition-all"
          >
            <div className="relative">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-white text-orange-500 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:block font-semibold text-sm">Cart</span>
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Category nav - horizontal pills */}
      <div className="hidden lg:flex items-center gap-1 px-8 py-2 border-t border-slate-100">
        <button
          onClick={() => onNavigate('home')}
          className={`text-sm px-4 py-2 rounded-full font-medium transition-colors ${
            currentPage === 'home'
              ? 'bg-gradient-to-r from-orange-400 to-rose-500 text-white shadow-md'
              : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
          }`}
        >
          Home
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onNavigate('category', { slug: cat.slug })}
            className={`text-sm px-4 py-2 rounded-full font-medium transition-colors ${
              currentPage === `category-${cat.slug}`
                ? 'bg-gradient-to-r from-orange-400 to-rose-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
            }`}
          >
            {cat.name}
          </button>
        ))}
        <button
          onClick={() => onNavigate('deals')}
          className="bg-orange-100 text-orange-600 hover:bg-orange-200 text-sm px-4 py-2 rounded-full font-semibold transition-colors"
        >
          Hot Deals
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 shadow-lg">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { onNavigate('category', { slug: cat.slug }); setMenuOpen(false); }}
                className="text-left text-slate-600 hover:text-orange-500 text-sm px-4 py-3 rounded-xl hover:bg-orange-50 transition-colors"
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-4 flex gap-2">
            <button
              onClick={() => { onNavigate('orders'); setMenuOpen(false); }}
              className="flex-1 text-center text-slate-600 hover:text-orange-500 text-sm px-4 py-3 rounded-xl hover:bg-orange-50"
            >
              Orders
            </button>
            <button
              onClick={() => { onNavigate('wishlist'); setMenuOpen(false); }}
              className="flex-1 text-center text-slate-600 hover:text-orange-500 text-sm px-4 py-3 rounded-xl hover:bg-orange-50"
            >
              Wishlist
            </button>
          </div>
          {!user && (
            <div className="border-t border-slate-100 pt-4 mt-4 flex gap-2">
              <button
                onClick={() => { onNavigate('signin'); setMenuOpen(false); }}
                className="flex-1 bg-gradient-to-r from-orange-400 to-rose-500 text-white text-sm font-semibold py-3 rounded-xl"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
