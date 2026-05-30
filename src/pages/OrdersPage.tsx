import { Fragment, useEffect, useState } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { getSessionId } from '../lib/session';

type OrderItem = {
  id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

type Order = {
  id: string;
  status: string;
  total_amount: number;
  shipping_amount: number;
  tax_amount: number;
  tracking_number: string;
  shipping_address: Record<string, string>;
  created_at: string;
  order_items: OrderItem[];
};

const STATUS_STEPS = [
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { key: 'processing', label: 'Processing', icon: Clock },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Package },
];

const STATUS_COLORS: Record<string, string> = {
  confirmed: 'from-green-400 to-emerald-500',
  processing: 'from-blue-400 to-cyan-500',
  shipped: 'from-orange-400 to-amber-500',
  delivered: 'from-slate-600 to-slate-700',
  cancelled: 'from-red-400 to-rose-500',
};

type Props = {
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function OrdersPage({ onNavigate }: Props) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setError(null);
      let query = supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false });

      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        const sessionId = getSessionId();
        query = query.eq('session_id', sessionId);
      }

      const { data, error: fetchError } = await query;
      if (fetchError) {
        setError(fetchError.message);
      }
      setOrders((data as Order[]) || []);
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const getStatusIndex = (status: string) => {
    const idx = STATUS_STEPS.findIndex(s => s.key === status);
    return idx >= 0 ? idx : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-red-200 shadow-sm p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3">Unable to load orders</h2>
          <p className="text-slate-500 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-orange-400 to-rose-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-3xl shadow-lg border border-slate-100 p-12 max-w-md w-full">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={36} className="text-slate-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3">No Orders Yet</h2>
          <p className="text-slate-500 mb-8">Start shopping to see your orders here!</p>
          <button
            onClick={() => onNavigate('home')}
            className="bg-gradient-to-r from-orange-400 to-rose-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
          >
            Start Shopping <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 md:pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-black text-slate-900 mb-8">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => {
            const statusIdx = getStatusIndex(order.status);
            const isExpanded = expandedOrder === order.id;

            return (
              <div key={order.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Order Header */}
                <button
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${STATUS_COLORS[order.status] || STATUS_COLORS.confirmed} rounded-xl flex items-center justify-center`}>
                      <Package size={22} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-sm text-slate-500">
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="font-bold text-slate-900">${order.total_amount.toFixed(2)}</p>
                      <p className="text-xs text-slate-500 uppercase font-semibold">{order.status}</p>
                    </div>
                    {isExpanded ? <ChevronDown size={20} className="text-slate-400" /> : <ChevronRight size={20} className="text-slate-400" />}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-slate-100 p-5">
                    {/* Status Tracker */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        {STATUS_STEPS.map((step, idx) => {
                          const Icon = step.icon;
                          const isActive = idx <= statusIdx;
                          const isCurrent = idx === statusIdx;
                          return (
                            <Fragment key={step.key}>
                              <div className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  isActive
                                    ? `bg-gradient-to-br ${STATUS_COLORS[step.key]} text-white`
                                    : 'bg-slate-100 text-slate-300'
                                } ${isCurrent ? 'ring-4 ring-orange-100' : ''}`}>
                                  <Icon size={18} />
                                </div>
                                <p className={`text-xs mt-2 font-semibold ${isActive ? 'text-slate-700' : 'text-slate-400'}`}>
                                  {step.label}
                                </p>
                              </div>
                              {idx < STATUS_STEPS.length - 1 && (
                                <div className={`flex-1 h-1 mx-2 rounded ${idx < statusIdx ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-slate-200'}`} />
                              )}
                            </Fragment>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tracking Number */}
                    {order.tracking_number && (
                      <div className="bg-slate-50 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <Truck size={20} className="text-orange-500" />
                        <div>
                          <p className="text-xs text-slate-500">Tracking Number</p>
                          <p className="font-semibold text-slate-800">{order.tracking_number}</p>
                        </div>
                      </div>
                    )}

                    {/* Shipping Address */}
                    <div className="bg-slate-50 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={16} className="text-orange-500" />
                        <p className="text-sm font-semibold text-slate-700">Shipping Address</p>
                      </div>
                      <p className="text-sm text-slate-600">
                        {order.shipping_address?.firstName} {order.shipping_address?.lastName}<br />
                        {order.shipping_address?.address}<br />
                        {order.shipping_address?.city}, {order.shipping_address?.state} {order.shipping_address?.zip}
                      </p>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-slate-700">Items</p>
                      {(order.order_items || []).map((item) => (
                        <div key={item.id} className="flex items-center gap-4 bg-slate-50 rounded-xl p-3">
                          <img
                            src={item.product_image || 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg'}
                            alt={item.product_name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-800 text-sm truncate">{item.product_name}</p>
                            <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-slate-900">${item.total_price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-500">Subtotal</span>
                        <span className="text-slate-700">${(order.total_amount - order.shipping_amount - order.tax_amount).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-500">Shipping</span>
                        <span className="text-slate-700">{order.shipping_amount === 0 ? 'Free' : `$${order.shipping_amount.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-slate-500">Tax</span>
                        <span className="text-slate-700">${order.tax_amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-slate-900">Total</span>
                        <span className="text-slate-900">${order.total_amount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
