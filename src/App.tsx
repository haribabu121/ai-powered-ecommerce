import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { WishlistProvider } from './context/WishlistContext.tsx';
import { CurrencyProvider } from './context/CurrencyContext';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import AIChat from './components/AIChat';
import HomePage from './pages/HomePage.tsx';
import CategoryPage from './pages/CategoryPage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import CartPage from './pages/CartPage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import SearchPage from './pages/SearchPage.tsx';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage.tsx';
import OrdersPage from './pages/OrdersPage.tsx';
import WishlistPage from './pages/WishlistPage';
import { supabase, Category } from './lib/supabase';

type Page =
  | { name: 'home' }
  | { name: 'category'; slug: string }
  | { name: 'product'; slug: string }
  | { name: 'cart' }
  | { name: 'checkout' }
  | { name: 'search'; q: string }
  | { name: 'deals' }
  | { name: 'products' }
  | { name: 'orders' }
  | { name: 'account' }
  | { name: 'wishlist' }
  | { name: 'signin' }
  | { name: 'signup' };

function AppInner() {
  const [page, setPage] = useState<Page>({ name: 'home' });
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => setCategories(data || []));
  }, []);

  const onNavigate = (pageName: string, params?: Record<string, string>) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    switch (pageName) {
      case 'home': setPage({ name: 'home' }); break;
      case 'category': setPage({ name: 'category', slug: params?.slug || '' }); break;
      case 'product': setPage({ name: 'product', slug: params?.slug || '' }); break;
      case 'cart': setPage({ name: 'cart' }); break;
      case 'checkout': setPage({ name: 'checkout' }); break;
      case 'search': setPage({ name: 'search', q: params?.q || '' }); break;
      case 'deals': setPage({ name: 'deals' }); break;
      case 'products': setPage({ name: 'products' }); break;
      case 'orders': setPage({ name: 'orders' }); break;
      case 'account': setPage({ name: 'account' }); break;
      case 'wishlist': setPage({ name: 'wishlist' }); break;
      case 'signin': setPage({ name: 'signin' }); break;
      case 'signup': setPage({ name: 'signup' }); break;
      default: setPage({ name: 'home' });
    }
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setPage({ name: 'search', q });
  };

  const getCurrentPageKey = () => {
    if (page.name === 'category') return `category-${(page as any).slug}`;
    return page.name;
  };

  const renderPage = () => {
    switch (page.name) {
      case 'home':
        return <HomePage onNavigate={onNavigate} />;
      case 'category':
        return (
          <CategoryPage
            categorySlug={(page as any).slug}
            categories={categories}
            onNavigate={onNavigate}
          />
        );
      case 'deals':
        return (
          <CategoryPage
            categorySlug="deals"
            categories={categories}
            onNavigate={onNavigate}
          />
        );
      case 'products':
        return (
          <CategoryPage
            categorySlug=""
            categories={categories}
            onNavigate={onNavigate}
          />
        );
      case 'product':
        return (
          <ProductPage
            productSlug={(page as any).slug}
            onNavigate={onNavigate}
          />
        );
      case 'cart':
        return <CartPage onNavigate={onNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={onNavigate} />;
      case 'search':
        return (
          <SearchPage
            query={(page as any).q || searchQuery}
            onNavigate={onNavigate}
          />
        );
      case 'orders':
        return <OrdersPage onNavigate={onNavigate} />;
      case 'account':
        return (
          <div className="min-h-screen bg-slate-50 pt-28 flex items-center justify-center">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 max-w-sm w-full text-center">
              <div className="text-5xl mb-4">👤</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">My Account</h2>
              <p className="text-slate-500 mb-6">Manage your profile, orders, and preferences.</p>
              <button onClick={() => onNavigate('home')} className="w-full bg-gradient-to-r from-orange-400 to-rose-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all">
                Continue Shopping
              </button>
            </div>
          </div>
        );
      case 'wishlist':
        return <WishlistPage onNavigate={onNavigate} />;
      case 'signin':
        return <SignInPage onNavigate={onNavigate} />;
      case 'signup':
        return <SignUpPage onNavigate={onNavigate} />;
      default:
        return <HomePage onNavigate={onNavigate} />;
    }
  };

  const hideHeaderFooter = page.name === 'signin' || page.name === 'signup';

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeaderFooter && (
        <Header
          categories={categories}
          onSearch={handleSearch}
          onNavigate={onNavigate}
          currentPage={getCurrentPageKey()}
        />
      )}
      <main className="flex-1">
        {renderPage()}
      </main>
      {!hideHeaderFooter && <Footer onNavigate={onNavigate} />}
      {!hideHeaderFooter && <AIChat />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <WishlistProvider>
          <CartProvider>
            <AppInner />
          </CartProvider>
        </WishlistProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}
