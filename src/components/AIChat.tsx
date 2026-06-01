import { useState, useEffect, useRef } from 'react';
import {
  X, Send, Bot, User, Minimize2, Maximize2,
  ShoppingCart, Package, Search, Star, Truck, RotateCcw, Loader2, Sparkles, ArrowUp
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getSessionId } from '../lib/session';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const QUICK_ACTIONS = [
  { icon: Search, label: 'Find a product', prompt: 'Help me find a product' },
  { icon: Package, label: 'Track my order', prompt: 'How do I track my order?' },
  { icon: RotateCcw, label: 'Return policy', prompt: 'What is your return policy?' },
  { icon: Truck, label: 'Shipping info', prompt: 'Tell me about shipping options' },
  { icon: Star, label: 'Best sellers', prompt: 'What are your best selling products?' },
  { icon: ShoppingCart, label: 'Cart help', prompt: 'Help me with my cart' },
];

const ASSISTANT_RESPONSES: Record<string, string> = {
  'return': `Our **30-day return policy** makes returns easy:\n\n• Items must be unused and in original packaging\n• Free returns on orders over $35\n• Refund processed within 3-5 business days\n• Start a return from your Orders page\n\nNeed help starting a return? I can walk you through it!`,
  'shipping': `We offer several shipping options:\n\n• **Free Standard Shipping** on orders over $35 (5-7 days)\n• **Express Shipping** — $9.99 (2-3 days)\n• **Overnight Delivery** — $19.99 (next day)\n• **Prime members** get free 2-day shipping on eligible items!\n\nYour order ships within 24 hours of placement.`,
  'track': `To track your order:\n\n1. Go to **My Orders** in your account\n2. Click on your order number\n3. View real-time tracking updates\n\nOr I can help you look up an order directly — just share your order number!`,
  'best': `Our **top-selling products** right now:\n\n🏆 Sony WH-1000XM5 Headphones\n🏆 Samsung 4K Smart TV 55"\n🏆 Vitamin C Serum\n🏆 Smart Fitness Watch\n🏆 Gaming Mechanical Keyboard\n\nShall I tell you more about any of these?`,
  'recommend': `Based on trending items, I'd recommend:\n\n• **Electronics**: iPhone 15 Pro Max, Sony Headphones\n• **Fashion**: Floral Summer Dress, Running Sneakers\n• **Home**: Robot Vacuum, Smart Coffee Maker\n• **Gaming**: 4K Gaming Monitor, Mechanical Keyboard\n\nWhat category interests you most?`,
  'discount': `Here are ways to save at ShopHub:\n\n• Use promo code **SAVE10** for 10% off\n• Free shipping on orders over $35\n• Sign up for Prime for exclusive deals\n• Check our **Today's Deals** section for flash sales\n\nWould you like me to help find deals in a specific category?`,
  'payment': `We accept the following payment methods:\n\n• Visa, Mastercard, American Express\n• PayPal\n• Apple Pay & Google Pay\n• ShopHub Gift Cards\n• Buy Now, Pay Later (Affirm)\n\nAll transactions are secured with 256-bit SSL encryption.`,
  'cancel': `To cancel an order:\n\n• Orders can be cancelled within **1 hour** of placement\n• Go to **My Orders** → Select order → Cancel\n• If more than 1 hour has passed, you may need to return it\n\nI can help escalate to our support team if needed.`,
  'default': `Thanks for reaching out! I'm ShopHub's AI assistant. I can help you with:\n\n• **Product recommendations** and search\n• **Order tracking** and management\n• **Shipping & returns** information\n• **Account & payment** queries\n• **Deals and discounts**\n\nWhat can I help you with today?`,
};

function getResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('return') || lower.includes('refund')) return ASSISTANT_RESPONSES['return'];
  if (lower.includes('ship') || lower.includes('deliver')) return ASSISTANT_RESPONSES['shipping'];
  if (lower.includes('track') || lower.includes('where') || lower.includes('order')) return ASSISTANT_RESPONSES['track'];
  if (lower.includes('best') || lower.includes('popular') || lower.includes('top')) return ASSISTANT_RESPONSES['best'];
  if (lower.includes('recommend') || lower.includes('suggest') || lower.includes('find')) return ASSISTANT_RESPONSES['recommend'];
  if (lower.includes('discount') || lower.includes('promo') || lower.includes('coupon') || lower.includes('deal') || lower.includes('save')) return ASSISTANT_RESPONSES['discount'];
  if (lower.includes('payment') || lower.includes('pay') || lower.includes('card')) return ASSISTANT_RESPONSES['payment'];
  if (lower.includes('cancel')) return ASSISTANT_RESPONSES['cancel'];
  return ASSISTANT_RESPONSES['default'];
}

function formatMessage(content: string) {
  const lines = content.split('\n');
  return lines.map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} className={`${i > 0 ? 'mt-1' : ''} ${line.startsWith('•') ? 'pl-1' : ''}`}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="font-semibold text-slate-900">{part}</strong> : part
        )}
      </p>
    );
  });
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      const welcome: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Hello! 👋 I'm **Aria**, ShopHub's AI shopping assistant.\n\nI can help you find products, track orders, answer questions about shipping and returns, and much more.\n\nHow can I help you today?`,
        timestamp: new Date(),
      };
      setMessages([welcome]);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [open, messages]);

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: msg,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Save to Supabase
    const sessionId = getSessionId();
    await supabase.from('chat_messages').insert({ session_id: sessionId, role: 'user', content: msg });

    // Simulate AI typing
    setTyping(true);
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const responseText = getResponse(msg);
    const aiMsg: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: responseText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMsg]);
    setTyping(false);

    await supabase.from('chat_messages').insert({ session_id: sessionId, role: 'assistant', content: responseText });

    if (!open || minimized) setUnread((n) => n + 1);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating buttons - bottom right */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col items-center gap-3">
        <button
          onClick={() => { setOpen(!open); setMinimized(false); }}
          className="group relative w-16 h-16 bg-gradient-to-br from-orange-400 via-rose-500 to-pink-500 rounded-2xl shadow-2xl hover:shadow-[0_20px_40px_rgba(251,146,60,0.4)] flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {open ? (
            <X size={24} className="relative z-10" />
          ) : (
            <>
              <div className="absolute inset-1 rounded-xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/8295472/pexels-photo-8295472.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="AI Assistant"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/60 via-rose-500/60 to-pink-500/60" />
              </div>
              <Bot size={26} className="relative z-10 drop-shadow-lg" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white text-orange-500 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                AI
              </div>
            </>
          )}

          {unread > 0 && !open && (
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold z-20 shadow-lg animate-pulse">
              {unread}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900 text-white shadow-2xl hover:bg-slate-800 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={22} />
        </button>

        <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {!open && (
            <>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-rose-500 shadow" />
              <div className="w-2 h-2 rounded-full bg-slate-300" />
              <div className="w-2 h-2 rounded-full bg-slate-300" />
            </>
          )}
        </div>
      </div>

      {/* Chat window */}
      {open && (
        <div
          className={`fixed right-6 bottom-24 z-50 bg-white rounded-3xl shadow-2xl border-2 border-orange-100 flex flex-col transition-all duration-300 ${
            minimized ? 'h-14 w-80' : 'w-80 sm:w-96 h-[580px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-400 to-rose-500 rounded-t-2xl flex-shrink-0">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src="https://images.pexels.com/photos/8295472/pexels-photo-8295472.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="AI Robot"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm">Aria — AI Assistant</p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-orange-200 rounded-full animate-pulse" />
                <span className="text-orange-100 text-xs">Online • Usually replies instantly</span>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setMinimized(!minimized)}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                {minimized ? <Maximize2 size={15} /> : <Minimize2 size={15} />}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Sparkles size={28} className="text-orange-500" />
                    </div>
                    <p className="text-slate-500 text-sm">Start a conversation with Aria!</p>
                  </div>
                )}

                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                      msg.role === 'assistant' ? 'bg-gradient-to-br from-orange-400 to-rose-500' : 'bg-slate-700'
                    }`}>
                      {msg.role === 'assistant' ? (
                        <img
                          src="https://images.pexels.com/photos/8295472/pexels-photo-8295472.jpeg?auto=compress&cs=tinysrgb&w=100"
                          alt="AI"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={14} className="text-white" />
                      )}
                    </div>
                    <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-slate-800 text-white rounded-tr-sm'
                        : 'bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-sm'
                    }`}>
                      {msg.role === 'assistant' ? formatMessage(msg.content) : msg.content}
                      <p className={`text-xs mt-1.5 ${msg.role === 'user' ? 'text-slate-400' : 'text-slate-400'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}

                {typing && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src="https://images.pexels.com/photos/8295472/pexels-photo-8295472.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="AI"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2 flex-shrink-0">
                  <div className="grid grid-cols-2 gap-1.5">
                    {QUICK_ACTIONS.map(({ icon: Icon, label, prompt }) => (
                      <button
                        key={label}
                        onClick={() => sendMessage(prompt)}
                        className="flex items-center gap-2 text-xs text-slate-600 hover:text-orange-700 bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-xl px-3 py-2 transition-colors text-left"
                      >
                        <Icon size={13} className="flex-shrink-0 text-orange-500" />
                        <span className="truncate">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-3 border-t border-slate-100 flex-shrink-0">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-orange-400 transition-colors">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Ask Aria anything..."
                    className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || typing}
                    className="w-8 h-8 bg-gradient-to-r from-orange-400 to-rose-500 hover:shadow-lg disabled:bg-slate-200 text-white rounded-lg flex items-center justify-center transition-all flex-shrink-0"
                  >
                    {typing ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  </button>
                </div>
                <p className="text-center text-slate-400 text-xs mt-2">Powered by ShopHub AI</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
