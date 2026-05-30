import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';

type Props = {
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function WishlistPage({ onNavigate }: Props) {
  const { items, loading } = useWishlist();

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500 mb-2">Wishlist</p>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">Your saved favorites</h1>
            <p className="mt-2 text-sm text-slate-500">
              {loading
                ? 'Loading your wishlist…'
                : items.length === 0
                ? 'Add products you love to your wishlist to find them again later.'
                : `${items.length} item${items.length === 1 ? '' : 's'} saved to your wishlist.`}
            </p>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-rose-500 text-white px-5 py-3 text-sm font-semibold hover:from-orange-500 hover:to-rose-600 transition-all"
          >
            Browse Products
          </button>
        </div>

        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((key) => (
              <div key={key} className="h-44 rounded-3xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <div className="text-6xl mb-4">💖</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
            <p className="text-slate-500 mb-6">Save products by tapping the heart icon on the product cards.</p>
            <button
              onClick={() => onNavigate('home')}
              className="bg-gradient-to-r from-orange-400 to-rose-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Shop now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id}>
                <ProductCard product={item.product} onNavigate={onNavigate} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
