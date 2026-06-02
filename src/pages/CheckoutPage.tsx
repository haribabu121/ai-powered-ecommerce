import React, { useState } from 'react';
import { Check, CreditCard, Truck, Shield, ArrowLeft, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { getSessionId } from '../lib/session';
import { useCurrency } from '../context/CurrencyContext';

type Props = {
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

type Step = 'shipping' | 'payment' | 'review' | 'success';

export default function CheckoutPage({ onNavigate }: Props) {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<Step>('shipping');
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'US',
  });

  const [payment, setPayment] = useState({
    method: 'card',
    cardNumber: '', expiry: '', cvv: '', cardName: '',
  });

  const shippingCost = total >= 35 ? 0 : 5.99;
  const tax = total * 0.08;
  const discount = 0;
  const orderTotal = total + shippingCost + tax - discount;
  const { formatPrice } = useCurrency();

  const handlePlaceOrder = async () => {
    setError(null);
    setPlacing(true);

    if (!items.length) {
      setError('Your cart is empty. Add products before placing an order.');
      setPlacing(false);
      return;
    }

    const discountAmount = 0;
    const orderData: any = {
      status: 'confirmed',
      total_amount: orderTotal,
      shipping_amount: shippingCost,
      tax_amount: tax,
      discount_amount: discountAmount,
      shipping_address: shipping,
      payment_method: payment.method,
      payment_status: 'paid',
      tracking_number: `MX${Date.now().toString().slice(-8)}`,
    };

    if (user) {
      orderData.user_id = user.id;
      orderData.session_id = null;
    } else {
      orderData.session_id = getSessionId();
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError || !order) {
      setError(orderError?.message ?? 'Unable to create order. Please try again.');
      setPlacing(false);
      return;
    }

    const { error: orderItemsError } = await supabase.from('order_items').insert(
      items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.image_url,
        quantity: item.quantity,
        unit_price: item.product.price,
        total_price: item.product.price * item.quantity,
      }))
    );

    if (orderItemsError) {
      setError(orderItemsError.message);
      setPlacing(false);
      return;
    }

    setOrderId(order.id.slice(0, 8).toUpperCase());
    await clearCart();
    setStep('success');
    setPlacing(false);
  };

  const STEPS = [
    { id: 'shipping', label: 'Shipping' },
    { id: 'payment', label: 'Payment' },
    { id: 'review', label: 'Review' },
  ];

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-lg p-12 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Order Placed!</h2>
          <p className="text-slate-500 mb-2">Thank you for your purchase.</p>
          <p className="text-slate-700 font-semibold mb-6">Order #{orderId}</p>
          <p className="text-slate-500 text-sm mb-8">
            A confirmation email has been sent to <strong>{shipping.email}</strong>. Your order will arrive in 3-5 business days.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('orders')}
              className="w-full bg-gradient-to-r from-orange-400 to-rose-500 hover:shadow-lg text-white font-bold py-3.5 rounded-xl transition-all"
            >
              Track Your Order
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="w-full border-2 border-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-6">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button onClick={() => onNavigate('cart')} className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm mb-6">
          <ArrowLeft size={16} />
          Back to Cart
        </button>

        <h1 className="text-3xl font-black text-slate-900 mb-8">Checkout</h1>

        {/* Step indicator */}
        <div className="flex items-center mb-8">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className={`flex items-center gap-2 ${i <= stepIndex ? 'text-orange-600' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  i < stepIndex ? 'bg-gradient-to-r from-orange-400 to-rose-500 border-orange-400 text-white' :
                  i === stepIndex ? 'border-orange-500 text-orange-600' :
                  'border-slate-200 text-slate-400'
                }`}>
                  {i < stepIndex ? <Check size={14} /> : i + 1}
                </div>
                <span className="text-sm font-semibold hidden sm:block">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 ${i < stepIndex ? 'bg-gradient-to-r from-orange-400 to-rose-500' : 'bg-slate-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
                  {error}
                </div>
              )}
              {/* Shipping Step */}
              {step === 'shipping' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <Truck size={20} className="text-orange-500" />
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: 'firstName', label: 'First Name', placeholder: 'John' },
                      { key: 'lastName', label: 'Last Name', placeholder: 'Doe' },
                      { key: 'email', label: 'Email', placeholder: 'john@example.com', type: 'email', cols: 2 },
                      { key: 'phone', label: 'Phone', placeholder: '+1 (555) 000-0000', type: 'tel' },
                      { key: 'address', label: 'Street Address', placeholder: '123 Main St', cols: 2 },
                      { key: 'city', label: 'City', placeholder: 'New York' },
                      { key: 'state', label: 'State', placeholder: 'NY' },
                      { key: 'zip', label: 'ZIP Code', placeholder: '10001' },
                    ].map(({ key, label, placeholder, type = 'text', cols }) => (
                      <div key={key} className={cols === 2 ? 'sm:col-span-2' : ''}>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
                        <input
                          type={type}
                          value={(shipping as any)[key]}
                          onChange={(e) => setShipping((prev) => ({ ...prev, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 text-slate-700 placeholder-slate-400 transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep('payment')}
                    disabled={!shipping.firstName || !shipping.email || !shipping.address}
                    className="mt-6 w-full bg-gradient-to-r from-orange-400 to-rose-500 hover:shadow-lg disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 rounded-xl transition-all"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Payment Step */}
              {step === 'payment' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <CreditCard size={20} className="text-orange-500" />
                    Payment Method
                  </h2>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { id: 'card', label: 'Credit Card' },
                      { id: 'paypal', label: 'PayPal' },
                      { id: 'apple', label: 'Apple Pay' },
                    ].map(({ id, label }) => (
                      <button
                        key={id}
                        onClick={() => setPayment((p) => ({ ...p, method: id }))}
                        className={`py-3 px-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                          payment.method === id
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {payment.method === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Card Number</label>
                        <input
                          type="text"
                          value={payment.cardNumber}
                          onChange={(e) => setPayment((p) => ({ ...p, cardNumber: e.target.value }))}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cardholder Name</label>
                        <input
                          type="text"
                          value={payment.cardName}
                          onChange={(e) => setPayment((p) => ({ ...p, cardName: e.target.value }))}
                          placeholder="John Doe"
                          className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Expiry Date</label>
                          <input
                            type="text"
                            value={payment.expiry}
                            onChange={(e) => setPayment((p) => ({ ...p, expiry: e.target.value }))}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">CVV</label>
                          <input
                            type="text"
                            value={payment.cvv}
                            onChange={(e) => setPayment((p) => ({ ...p, cvv: e.target.value }))}
                            placeholder="123"
                            maxLength={4}
                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {payment.method !== 'card' && (
                    <div className="bg-slate-50 rounded-xl p-6 text-center text-slate-500 text-sm">
                      You'll be redirected to {payment.method === 'paypal' ? 'PayPal' : 'Apple Pay'} to complete your payment.
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep('shipping')} className="flex-1 border-2 border-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl hover:bg-slate-50 transition-colors">
                      Back
                    </button>
                    <button
                      onClick={() => setStep('review')}
                      className="flex-1 bg-gradient-to-r from-orange-400 to-rose-500 hover:shadow-lg text-white font-bold py-3.5 rounded-xl transition-all"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {/* Review Step */}
              {step === 'review' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-5">Review Your Order</h2>

                  <div className="space-y-3 mb-5">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
                        <img
                          src={item.product.image_url || 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg'}
                          alt={item.product.name}
                          className="w-14 h-14 rounded-lg object-cover bg-slate-50"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg'; }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-800 font-semibold text-sm line-clamp-1">{item.product.name}</p>
                          <p className="text-slate-500 text-xs">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-slate-900 text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 mb-5 text-sm space-y-1">
                    <p className="font-semibold text-slate-700 mb-2">Shipping to:</p>
                    <p className="text-slate-600">{shipping.firstName} {shipping.lastName}</p>
                    <p className="text-slate-600">{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</p>
                    <p className="text-slate-600">{shipping.email}</p>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep('payment')} className="flex-1 border border-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl hover:bg-slate-50 transition-colors">
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={placing}
                      className="flex-1 bg-gradient-to-r from-orange-400 to-rose-500 hover:shadow-xl disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                    >
                      <Lock size={16} />
                      {placing ? 'Placing Order...' : `Place Order — ${formatPrice(orderTotal)}`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-36">
              <h3 className="font-bold text-slate-900 mb-4">Order Summary</h3>
                <div className="space-y-2.5 text-sm mb-4">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'text-orange-600 font-semibold' : 'font-semibold text-slate-900'}>
                    {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span className="font-semibold text-slate-900">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-slate-100 pt-2.5 flex justify-between font-black text-slate-900 text-base">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs justify-center">
                <Shield size={12} />
                <span>256-bit SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
