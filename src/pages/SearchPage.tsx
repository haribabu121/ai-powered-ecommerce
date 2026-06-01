import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { supabase, Product } from '../lib/supabase';

type Props = {
  query: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function SearchPage({ query, onNavigate }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    supabase
      .from('products')
      .select('*, categories(*)')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%`)
      .then(({ data }) => {
        setProducts(data || []);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 lg:pt-28">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <Search size={20} className="text-slate-400" />
            <h1 className="text-2xl font-black text-slate-900">
              Search results for "<span className="text-emerald-600">{query}</span>"
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-8">{loading ? 'Searching...' : `${products.length} products found`}</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 animate-pulse overflow-hidden">
                <div className="aspect-square bg-slate-200" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-slate-200 rounded w-1/3" />
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-5 bg-slate-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No results for "{query}"</h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">Try different keywords or browse our categories.</p>
            <button
              onClick={() => onNavigate('home')}
              className="bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-600 transition-colors"
            >
              Browse All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
