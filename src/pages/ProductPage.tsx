import { useEffect, useState } from 'react';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronRight, Minus, Plus, Check, Zap } from 'lucide-react';
import { supabase, Product } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

type Props = {
  productSlug: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function ProductPage({ productSlug, onNavigate }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const wishlisted = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from('products')
        .select('*, categories(*)')
        .eq('slug', productSlug)
        .maybeSingle();

      if (data) {
        setProduct(data);
        const { data: rel } = await supabase
          .from('products')
          .select('*, categories(*)')
          .eq('category_id', data.category_id)
          .neq('id', data.id)
          .limit(4);
        setRelated(rel || []);
      }
      setLoading(false);
    })();
  }, [productSlug]);

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const fallbackImage = 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg';

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-slate-200 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded w-1/4" />
              <div className="h-8 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-10 bg-slate-200 rounded w-1/4" />
              <div className="h-24 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 text-lg mb-4">Product not found.</p>
          <button onClick={() => onNavigate('home')} className="bg-gradient-to-r from-orange-400 to-rose-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const images = product.images
    ? (Array.isArray(product.images) ? product.images : [product.image_url])
    : [product.image_url || fallbackImage];

  const displayImages = images.length > 0 ? images : [fallbackImage];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 lg:pt-28">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-600">Home</button>
          <ChevronRight size={14} />
          {product.categories && (
            <>
              <button onClick={() => onNavigate('category', { slug: (product.categories as any).slug })} className="hover:text-emerald-600">
                {(product.categories as any).name}
              </button>
              <ChevronRight size={14} />
            </>
          )}
          <span className="text-slate-800 font-medium truncate max-w-xs">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10">
          {/* Image section */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-4 relative">
              <img
                src={imgError ? fallbackImage : (displayImages[activeImg] || fallbackImage)}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={() => setImgError(true)}
              />
              {product.is_new && (
                <div className="absolute top-4 left-4 bg-emerald-500 text-white text-sm font-bold px-3 py-1.5 rounded-xl">
                  NEW
                </div>
              )}
            </div>
            {displayImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {displayImages.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      i === activeImg ? 'border-emerald-500 shadow-md' : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <img src={img || fallbackImage} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.brand && (
              <p className="text-emerald-600 font-bold text-sm uppercase tracking-wider mb-2">{product.brand}</p>
            )}
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 leading-snug">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={17} className={s <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
                ))}
              </div>
              <span className="text-slate-700 font-semibold text-sm">{product.rating}</span>
              <span className="text-slate-400 text-sm">({product.review_count?.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-black text-slate-900">${product.price.toFixed(2)}</span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-slate-400 text-xl line-through">${product.original_price.toFixed(2)}</span>
              )}
            </div>

            {product.prime_eligible && (
              <div className="flex items-center gap-1.5 mb-4">
                <Zap size={14} className="text-sky-500" />
                <span className="text-sky-600 text-sm font-semibold">Prime eligible — Free delivery</span>
              </div>
            )}

            {/* Stock */}
            {product.stock_quantity <= 10 && product.stock_quantity > 0 && (
              <p className="text-amber-600 font-semibold text-sm mb-4 bg-amber-50 px-3 py-2 rounded-lg inline-block">
                Only {product.stock_quantity} left in stock — order soon!
              </p>
            )}
            {product.stock_quantity === 0 && (
              <p className="text-rose-600 font-semibold text-sm mb-4">Currently out of stock</p>
            )}

            {/* Qty + Add to cart */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-3 font-bold text-slate-900 min-w-[3rem] text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm transition-all duration-200 shadow-md ${
                  added
                    ? 'bg-emerald-500 text-white shadow-emerald-200'
                    : product.stock_quantity === 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 text-white hover:bg-slate-700 hover:shadow-lg active:scale-95'
                }`}
              >
                {added ? <Check size={18} /> : <ShoppingCart size={18} />}
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>

              <button
                onClick={async () => {
                  if (!product) return;
                  if (!user) {
                    onNavigate('signin');
                    return;
                  }
                  if (wishlisted) {
                    await removeFromWishlist(product.id);
                  } else {
                    await addToWishlist(product);
                  }
                }}
                className={`p-3 rounded-xl border-2 transition-all ${wishlisted ? 'bg-rose-50 border-rose-300 text-rose-500' : 'border-slate-200 text-slate-500 hover:border-rose-300 hover:text-rose-500'}`}
              >
                <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>

              <button className="p-3 rounded-xl border-2 border-slate-200 text-slate-500 hover:border-slate-400 transition-colors">
                <Share2 size={20} />
              </button>
            </div>

            {/* Buy now */}
            <button
              onClick={async () => {
                if (product.stock_quantity > 0) {
                  await handleAddToCart();
                  onNavigate('checkout');
                }
              }}
              disabled={product.stock_quantity === 0}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-xl active:scale-95 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>

            {/* Product Description */}
            <div className="border-t border-slate-100 pt-6 mb-4">
              <h3 className="text-base font-bold text-slate-900 mb-3">About This Product</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Trust items */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Over $35' },
                { icon: RotateCcw, label: 'Free Returns', sub: '30 days' },
                { icon: Shield, label: 'Secure Pay', sub: 'Encrypted' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center bg-slate-50 rounded-xl p-3">
                  <Icon size={18} className="text-emerald-500 mb-1" />
                  <p className="text-slate-800 text-xs font-semibold">{label}</p>
                  <p className="text-slate-500 text-xs">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-black text-slate-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
