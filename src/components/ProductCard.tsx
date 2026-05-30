import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

type Props = {
  product: Product;
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function ProductCard({ product, onNavigate }: Props) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const fallbackImage = `https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg`;

  return (
    <div
      className="group bg-white rounded-3xl border border-slate-100 hover:border-orange-200 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2 flex flex-col"
      onClick={() => onNavigate('product', { slug: product.slug })}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        <img
          src={imgError ? fallbackImage : (product.image_url || fallbackImage)}
          alt={product.name}
          draggable={false}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={() => setImgError(true)}
          onDragStart={(event) => event.preventDefault()}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_new && (
            <span className="bg-gradient-to-r from-orange-400 to-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              NEW
            </span>
          )}
          {product.is_bestseller && (
            <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              TOP
            </span>
          )}
        </div>

        {/* Actions overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={async (e) => {
              e.stopPropagation();
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
            className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors ${
              wishlisted ? 'bg-rose-500 text-white' : 'bg-white text-slate-500 hover:bg-rose-50 hover:text-rose-500'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate('product', { slug: product.slug }); }}
            className="w-10 h-10 rounded-full bg-white text-slate-500 hover:bg-orange-50 hover:text-orange-500 shadow-lg flex items-center justify-center transition-colors"
            aria-label="View product details"
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 rounded-2xl text-sm font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              added
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                : 'bg-gradient-to-r from-orange-400 to-rose-500 text-white hover:shadow-xl'
            }`}
          >
            <ShoppingCart size={16} />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        {product.brand && (
          <p className="text-xs text-orange-500 font-bold uppercase tracking-wider mb-1.5">{product.brand}</p>
        )}
        <h3 className="text-slate-800 font-semibold text-sm leading-snug mb-3 line-clamp-2 flex-1 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={star <= Math.round(product.rating) ? 'text-orange-400 fill-orange-400' : 'text-slate-200 fill-slate-200'}
              />
            ))}
          </div>
          <span className="text-slate-400 text-xs font-medium">({product.review_count?.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-slate-900 font-extrabold text-xl">${product.price.toFixed(2)}</span>
          {product.original_price && product.original_price > product.price && (
            <span className="text-slate-300 text-sm line-through">${product.original_price.toFixed(2)}</span>
          )}
        </div>

        {/* Stock */}
        {product.stock_quantity < 20 && product.stock_quantity > 0 && (
          <p className="text-orange-500 text-xs mt-2 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
            Only {product.stock_quantity} left
          </p>
        )}
      </div>
    </div>
  );
}
