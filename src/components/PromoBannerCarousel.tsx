import { useEffect, useState, useCallback } from 'react';

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
    image: 'https://m.media-amazon.com/images/I/414GuM0i0xL._AC_UL480_FMwebp_QL65_.jpg',
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
    image: 'https://m.media-amazon.com/images/I/71JGCn1z1TL._AC_UY327_FMwebp_QL65_.jpg',
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
    <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12 pb-8 sm:pb-10 md:pb-12 lg:pb-16">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 shadow-lg sm:shadow-xl">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {PROMO_SLIDES.map((s) => (
            <div key={s.id} className="min-w-full relative h-full shrink-0">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-r ${s.overlay}`} />
              <div className="absolute inset-0 flex items-center px-3 sm:px-5 md:px-8 lg:px-12">
                <div className="max-w-lg w-full">
                  <span className={`${s.badgeClass} text-white text-[10px] sm:text-xs md:text-sm font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full tracking-wide inline-block`}>
                    {s.badge}
                  </span>
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black mt-2 sm:mt-3 md:mt-4 mb-2 sm:mb-3 leading-tight">{s.title}</h3>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6 leading-relaxed line-clamp-2 sm:line-clamp-3">{s.description}</p>
                  <button
                    type="button"
                    onClick={() => onNavigate('category', { slug: s.categorySlug })}
                    className={`${s.buttonClass} text-white font-bold px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl transition-colors shadow-lg text-sm sm:text-base`}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1 sm:gap-1.5 md:gap-2 max-w-[90%] z-20">
          {PROMO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1 sm:h-1.5 md:h-2 rounded-full transition-all ${
                index === i ? 'w-5 sm:w-6 md:w-7 bg-white' : 'w-1 sm:w-1.5 md:w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
