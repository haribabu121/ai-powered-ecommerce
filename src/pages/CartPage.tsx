import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, Truck, Shield, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

type Props = {
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function CartPage({ onNavigate }: Props) {
  const { items, itemCount, total, removeFromCart, updateQuantity } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const shipping = total >= 35 ? 0 : 5.99;
  const tax = total * 0.08;
  const discount = promoApplied ? total * 0.1 : 0;
  const orderTotal = total + shipping + tax - discount;

  const fallback = 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg';
  const { formatPrice } = useCurrency();

  return (
    <div className="min-h-screen bg-slate-50 pt-32 lg:pt-28">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <nav className="text-sm text-slate-500 mb-2">
            <button onClick={() => onNavigate('home')} className="hover:text-orange-500">Home</button>
            <span className="mx-2">/</span>
            <span className="text-slate-800">Shopping Cart</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <ShoppingCart size={28} className="text-orange-500" />
            Shopping Cart
            {itemCount > 0 && <span className="text-base font-normal text-slate-500">({itemCount} items)</span>}
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-16 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={40} className="text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8">Add some amazing products to get started!</p>
            <button
              onClick={() => onNavigate('home')}
              className="bg-gradient-to-r from-orange-400 to-rose-500 hover:shadow-lg text-white font-bold px-8 py-3.5 rounded-xl transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              {/* Free shipping progress */}
              {total < 35 && (
                <div className="bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-100 rounded-2xl p-4 flex items-center gap-3">
                  <Truck size={20} className="text-orange-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-orange-800 text-sm font-medium">
                        Add <strong>{formatPrice(Math.max(0, 35 - total))}</strong> more for free shipping!
                      </p>
                    <div className="mt-2 h-2 bg-orange-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-rose-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((total / 35) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {total >= 35 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
                  <Truck size={20} className="text-green-600" />
                  <p className="text-green-800 text-sm font-semibold">You qualify for free shipping!</p>
                </div>
              )}

              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex gap-5 group hover:shadow-lg hover:border-orange-100 transition-all">
                  <button
                    onClick={() => onNavigate('product', { slug: item.product.slug })}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 flex-shrink-0"
                  >
                    <img
                      src={imgErrors[item.product.id] ? fallback : (item.product.image_url || fallback)}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={() => setImgErrors((prev) => ({ ...prev, [item.product.id]: true }))}
                    />
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {item.product.brand && (
                          <p className="text-orange-500 text-xs font-bold uppercase tracking-wide mb-0.5">{item.product.brand}</p>
                        )}
                        <button
                          onClick={() => onNavigate('product', { slug: item.product.slug })}
                          className="text-slate-800 font-semibold text-sm leading-snug hover:text-orange-600 text-left line-clamp-2 transition-colors"
                        >
                          {item.product.name}
                        </button>
                        {item.product.prime_eligible && (
                          <p className="text-orange-500 text-xs mt-1 font-medium flex items-center gap-1">
                            <Truck size={12} /> Fast delivery available
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg p-1.5 transition-colors flex-shrink-0"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden hover:border-orange-300 transition-colors">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-2.5 text-slate-500 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 py-2.5 font-bold text-slate-900 text-sm min-w-[2.5rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-2.5 text-slate-500 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-slate-900 font-black text-xl">{formatPrice(item.product.price * item.quantity)}</p>
                            {item.quantity > 1 && (
                              <p className="text-slate-400 text-xs">{formatPrice(item.product.price)} each</p>
                            )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-sm mt-2 px-2"
              >
                <ChevronRight size={16} className="rotate-180" />
                Continue Shopping
              </button>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              {/* Promo code */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                  <Tag size={16} className="text-orange-500" />
                  Promo Code
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    className="flex-1 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 text-slate-700 placeholder-slate-400 transition-colors"
                  />
                  <button
                    onClick={() => { if (promoCode === 'SAVE10') setPromoApplied(true); }}
                    className="bg-slate-900 text-white text-sm font-semibold px-4 rounded-xl hover:bg-slate-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-green-600 text-xs mt-2 font-medium">10% discount applied!</p>
                )}
                <p className="text-slate-400 text-xs mt-2">Try: SAVE10</p>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-bold text-slate-900 mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-semibold text-slate-900">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : 'font-semibold text-slate-900'}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Estimated Tax</span>
                    <span className="font-semibold text-slate-900">{formatPrice(tax)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Promo Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="border-t border-slate-100 pt-3 flex justify-between font-black text-slate-900 text-lg">
                    <span>Total</span>
                    <span>{formatPrice(orderTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('checkout')}
                  className="w-full mt-5 bg-gradient-to-r from-orange-400 to-rose-500 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-xs">
                  <Shield size={13} />
                  <span>Secure SSL Encrypted Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
