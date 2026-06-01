import { useEffect, useState } from 'react';
import { ArrowRight, CreditCard, RefreshCw, Shield, Truck, TrendingUp, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import PromoBannerCarousel from '../components/PromoBannerCarousel';
import FAQ from '../components/FAQ';
import ProductCard from '../components/ProductCard';
import { supabase, Product } from '../lib/supabase';

type Props = {
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function HomePage({ onNavigate }: Props) {
  const [_bestsellers, setBestsellers] = useState<Product[]>([]);
  const [deals, setDeals] = useState<Product[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);
  const [trendingSlide, setTrendingSlide] = useState(0);
  const TOP_TRENDING_STEP = 4;
  const FEATURED_DEAL_SLUGS = [
    'iphone-15-pro-max',
    'macbook-pro-14',
    'classic-leather-jacket',
    'smart-coffee-maker',
    'classic-bathtub',
    'vitamin-c-serum',
    'dry-dates-natural',
    'red-chilli-powder-spicy',
  ];

  useEffect(() => {
    (async () => {
      const [bestRes, dealsRes, trendingRes] = await Promise.all([
        supabase.from('products').select('*, categories(*)').eq('is_bestseller', true).limit(8),
        supabase.from('products').select('*, categories(*)').in('slug', FEATURED_DEAL_SLUGS),
        supabase
          .from('products')
          .select('*, categories(*)')
          .order('review_count', { ascending: false })
          .limit(16),
      ]);
      setBestsellers(bestRes.data || []);
      const dealsData = dealsRes.data || [];
      setDeals(
        FEATURED_DEAL_SLUGS.map((slug) => dealsData.find((product) => product.slug === slug)).filter(
          (product): product is Product => Boolean(product),
        ),
      );
      setTrending(trendingRes.data || []);
    })();
  }, []);

  useEffect(() => {
    if (trending.length === 0) return undefined;

    const slideCount = Math.ceil(trending.length / TOP_TRENDING_STEP);
    const interval = window.setInterval(() => {
      setTrendingSlide((prev) => (prev + 1) % slideCount);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [trending]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="pt-32 lg:pt-28">
        <HeroCarousel onNavigate={onNavigate} />
      </div>

      {/* Shop by Department */}
      {/* <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Shop by Department</h2>
            <p className="text-slate-500 text-sm mt-1">Explore our curated categories</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate('category', { slug: cat.slug })}
              className="group relative overflow-hidden rounded-2xl aspect-square shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={cat.image_url}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg';
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${CATEGORY_COLORS[cat.slug] || 'from-slate-700 to-slate-500'} opacity-70`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                <span className="text-3xl mb-2">{CATEGORY_ICONS[cat.slug] || '🛍️'}</span>
                <span className="text-white font-bold text-sm text-center leading-tight">{cat.name}</span>
              </div>
            </button>
          ))}
        </div>
      </section> */}
      

      {/* Today's Deals */}
      {deals.length > 0 && (
        <section className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 py-14">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                  <Zap size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white">shop by category</h2>
                  <p className="text-orange-100 text-sm">Limited time — grab them fast</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('deals')}
                className="hidden sm:flex items-center gap-2 bg-white text-orange-600 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-orange-50 transition-colors shadow-lg"
              >
                View All <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {deals.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onNavigate={onNavigate}
                  disableAddToCart
                  navigateToCategory
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {/* {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-14">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-rose-100 rounded-2xl flex items-center justify-center">
                <Star size={22} className="text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">Staff Picks</h2>
                <p className="text-slate-500 text-sm">Curated by our team</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="hidden sm:flex items-center gap-2 text-slate-600 hover:text-orange-500 font-semibold text-sm border-2 border-slate-200 hover:border-orange-300 px-5 py-2.5 rounded-xl hover:bg-orange-50 transition-all"
            >
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      )} */}

      {/* Trending Carousel
      {trending.length > 0 && (
        <section className="relative max-w-6xl mx-auto px-4 py-14">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
                <TrendingUp size={15} className="text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">Top Trending</h2>
                <p className="text-slate-500 text-sm">High-count carousel featuring trending electronics and fashion favorites</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => carouselRef.current?.scrollBy({ left: -272, behavior: 'smooth' })}
              className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-white/90 text-slate-700 shadow-lg absolute left-0 top-1/2 -translate-y-1/2 border border-slate-200 hover:bg-white transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => carouselRef.current?.scrollBy({ left: 272, behavior: 'smooth' })}
              className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-white/90 text-slate-700 shadow-lg absolute right-0 top-1/2 -translate-y-1/2 border border-slate-200 hover:bg-white transition-colors"
            >
              <ChevronRight size={18} />
            </button>

            <div
              ref={carouselRef}
              className="flex gap-3 overflow-x-auto scroll-smooth pb-1"
              onMouseDown={(event) => event.preventDefault()}
            >
              {trending.map((p) => (
                <div key={p.id} className="min-w-[260px] max-w-[260px] shrink-0">
                  <ProductCard product={p} onNavigate={onNavigate} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )} */}
{/* Trending Carousel */}
{trending.length > 0 && (
  <section className="relative max-w-7xl mx-auto px-4 py-14">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
          <TrendingUp size={18} className="text-amber-600" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">
            Top Trending
          </h2>
          <p className="text-slate-500 text-sm">
            High-count carousel featuring trending electronics and fashion favorites
          </p>
        </div>
      </div>
    </div>

    <div className="relative">
      {/* LEFT ARROW */}
      <button
        onClick={() => setTrendingSlide((prev) => {
          const slideCount = Math.ceil(trending.length / TOP_TRENDING_STEP);
          return (prev - 1 + slideCount) % slideCount;
        })}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl border border-slate-200 rounded-full w-12 h-12 flex items-center justify-center hover:bg-orange-50 hover:text-orange-500 transition-all"
      >
        <ChevronLeft size={22} />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => setTrendingSlide((prev) => {
          const slideCount = Math.ceil(trending.length / TOP_TRENDING_STEP);
          return (prev + 1) % slideCount;
        })}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl border border-slate-200 rounded-full w-12 h-12 flex items-center justify-center hover:bg-orange-50 hover:text-orange-500 transition-all"
      >
        <ChevronRight size={22} />
      </button>

      {/* CAROUSEL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {trending
          .slice(trendingSlide * TOP_TRENDING_STEP, trendingSlide * TOP_TRENDING_STEP + TOP_TRENDING_STEP)
          .map((product) => (
            <div key={product.id}>
              <ProductCard product={product} onNavigate={onNavigate} />
            </div>
          ))}
      </div>
    </div>
  </section>
)}
      {/* Best Sellers */}
      {/* {bestsellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-14">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
                <TrendingUp size={22} className="text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">Best Sellers</h2>
                <p className="text-slate-500 text-sm">What everyone's buying right now</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="hidden sm:flex items-center gap-2 text-slate-600 hover:text-amber-500 font-semibold text-sm border-2 border-slate-200 hover:border-amber-300 px-5 py-2.5 rounded-xl hover:bg-amber-50 transition-all"
            >
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      )} */}

      {/* New Arrivals */}
      {/* {newArrivals.length > 0 && (
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-14">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center">
                  <Zap size={22} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white">Just Landed</h2>
                  <p className="text-slate-400 text-sm">Fresh off the shelf</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('products')}
                className="hidden sm:flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold text-sm border-2 border-slate-600 hover:border-orange-500 px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all"
              >
                View All <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals.map((p) => (
                <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        </section>
      )} */}
      <FAQ />

      <PromoBannerCarousel onNavigate={onNavigate} />
      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $35' },
              { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
              { icon: CreditCard, title: 'Flexible Pay', desc: 'Multiple payment options' },
            ].map((feature, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-3xl shadow-sm border border-slate-200">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
