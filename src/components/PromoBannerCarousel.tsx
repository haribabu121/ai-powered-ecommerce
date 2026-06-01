import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type PromoSlide = {
  id: string;
  image: string;
  badge: string;
  title: string;
  description: string;
  categorySlug: string;
  overlay: string;
  badgeClass: string;
  buttonClass: string;
};

export const PROMO_SLIDES: PromoSlide[] = [
  {
    id: 'beauty',
    image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg',
    badge: 'GLOW UP',
    title: 'Beauty & Care',
    description: 'Discover skincare, cosmetics and wellness products.',
    categorySlug: 'beauty-care',
    overlay: 'from-fuchsia-900/90 via-fuchsia-800/70 to-transparent',
    badgeClass: 'bg-fuchsia-500',
    buttonClass: 'bg-fuchsia-500 hover:bg-fuchsia-400',
  },
  {
    id: 'home-kitchen',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
    badge: 'HOME ESSENTIALS',
    title: 'Home & Kitchen',
    description: 'Modern cookware and appliances for everyday family meals.',
    categorySlug: 'home-kitchen',
    overlay: 'from-amber-900/90 via-orange-800/70 to-transparent',
    badgeClass: 'bg-amber-500',
    buttonClass: 'bg-amber-500 hover:bg-amber-400',
  },
  {
    id: 'electronics',
    image: 'https://images.pexels.com/photos/11969081/pexels-photo-11969081.jpeg',
    badge: 'NEXTGEN TECH',
    title: 'Electronics & Gadgets',
    description: 'Cutting-edge phones, laptops, audio and smart devices.',
    categorySlug: 'electronics',
    overlay: 'from-cyan-900/90 via-blue-800/70 to-transparent',
    badgeClass: 'bg-cyan-500',
    buttonClass: 'bg-cyan-500 hover:bg-cyan-400',
  },
  {
    id: 'grocery',
    image: 'https://images.pexels.com/photos/7451955/pexels-photo-7451955.jpeg',
    badge: 'FRESH PICKS',
    title: 'Grocery & Staples',
    description: 'From jaggery to spices — authentic flavors for every kitchen.',
    categorySlug: 'grocery',
    overlay: 'from-green-900/90 via-emerald-800/70 to-transparent',
    badgeClass: 'bg-emerald-500',
    buttonClass: 'bg-emerald-500 hover:bg-emerald-400',
  },
  {
    id: 'fashion',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
    badge: 'STYLE FORWARD',
    title: 'Fashion & Apparel',
    description: 'Curated pieces that blend modern trends with timeless elegance.',
    categorySlug: 'fashion',
    overlay: 'from-rose-900/90 via-pink-800/70 to-transparent',
    badgeClass: 'bg-rose-500',
    buttonClass: 'bg-rose-500 hover:bg-rose-400',
  },
];

type Props = {
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function PromoBannerCarousel({ onNavigate }: Props) {
  const [index, setIndex] = useState(0);
  const slideCount = PROMO_SLIDES.length;

  const goTo = useCallback((next: number) => {
    setIndex((next + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slideCount);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [slideCount]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 pb-12">
      <div className="relative overflow-hidden rounded-3xl h-72 md:h-80 shadow-xl">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {PROMO_SLIDES.map((s) => (
            <div key={s.id} className="min-w-full relative h-full shrink-0">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-r ${s.overlay}`} />
              <div className="absolute inset-0 flex items-center px-6 md:px-10">
                <div className="max-w-lg">
                  <span className={`${s.badgeClass} text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide`}>
                    {s.badge}
                  </span>
                  <h3 className="text-white text-3xl md:text-4xl font-black mt-4 mb-3">{s.title}</h3>
                  <p className="text-white/90 text-sm md:text-base mb-6 leading-relaxed">{s.description}</p>
                  <button
                    type="button"
                    onClick={() => onNavigate('category', { slug: s.categorySlug })}
                    className={`${s.buttonClass} text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg`}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-white"
          aria-label="Previous banner"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-white"
          aria-label="Next banner"
        >
          <ChevronRight size={22} />
        </button>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1.5 max-w-[90%] z-20">
          {PROMO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                index === i ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
