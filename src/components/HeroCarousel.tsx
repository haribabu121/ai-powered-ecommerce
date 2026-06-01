import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  categorySlug: string;
  accent: string;
  badge?: string;
};

const SLIDES: Slide[] = [
  {
    id: '1',
    title: 'Next-Gen Tech',
    subtitle: 'Discover cutting-edge electronics from top brands. Phones, laptops, audio and more.',
    cta: 'Shop Electronics',
    image: 'https://images.pexels.com/photos/11969081/pexels-photo-11969081.jpeg',
    categorySlug: 'electronics',
    accent: 'from-cyan-500 to-blue-600',
    badge: 'Tech Picks',
  },
  {
    id: '2',
    title: 'Grocery Items',
    subtitle: 'Premium groceries and organic produce delivered to your door.',
    cta: 'Shop Grocery',
    image: 'https://images.pexels.com/photos/7451955/pexels-photo-7451955.jpeg',
    categorySlug: 'grocery',
    accent: 'from-green-500 to-emerald-600',
    badge: 'Fresh Daily',
  },
  {
    id: '3',
    title: 'Style Forward',
    subtitle: 'Curated fashion pieces that blend modern trends with timeless elegance.',
    cta: 'Shop Fashion',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
    categorySlug: 'fashion',
    accent: 'from-rose-500 to-pink-600',
    badge: 'New Season',
  },
  {
    id: '4',
    title: 'Home Essentials',
    subtitle: 'Transform your living space with premium furniture and smart appliances.',
    cta: 'Shop Home',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    categorySlug: 'home-kitchen',
    accent: 'from-amber-500 to-orange-600',
    badge: 'Best Picks',
  },
  {
    id: '5',
    title: 'Glow Up',
    subtitle: 'Premium beauty and wellness products for your daily self-care routine.',
    cta: 'Shop Beauty',
    image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg',
    categorySlug: 'beauty-care',
    accent: 'from-fuchsia-500 to-rose-600',
    badge: 'Fan Favorites',
  },
];

type Props = {
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function HeroCarousel({ onNavigate }: Props) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const go = useCallback((idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((idx + SLIDES.length) % SLIDES.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(() => go(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current, go]);

  const slide = SLIDES[current];

  return (
    <div className="relative h-[520px] md:h-[600px] overflow-hidden rounded-none">
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div
            key={current}
            className="max-w-xl animate-fade-in-up"
            style={{ animation: 'fadeInUp 0.6s ease forwards' }}
          >
            {slide.badge && (
              <span className={`inline-block bg-gradient-to-r ${slide.accent} text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 shadow-lg`}>
                {slide.badge}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-slate-200 text-base md:text-lg mb-8 leading-relaxed max-w-md">
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('category', { slug: slide.categorySlug })}
                className={`bg-gradient-to-r ${slide.accent} text-white font-bold px-7 py-3.5 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 text-sm`}
              >
                {slide.cta}
              </button>
              <button
                onClick={() => onNavigate('deals')}
                className="bg-white/15 backdrop-blur-sm text-white font-semibold px-7 py-3.5 rounded-xl border border-white/25 hover:bg-white/25 transition-colors text-sm"
              >
                View All Deals
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => go(current - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110 border border-white/20"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => go(current + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110 border border-white/20"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Thumbnail nav */}
      {/* <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id} */}
            {/* onClick={() => go(i)}
            className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
              i === current ? 'border-white scale-110 shadow-lg' : 'border-white/30 opacity-60 hover:opacity-100'
            }`}
          >
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div> */}
    </div>
  );
}
