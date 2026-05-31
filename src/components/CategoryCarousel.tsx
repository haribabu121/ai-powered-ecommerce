import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  categorySlug: string;
  categoryName: string;
};

interface CarouselSlide {
  id: string;
  image: string;
}

const CATEGORY_CAROUSELS: Record<string, CarouselSlide[]> = {
  electronics: [
    {
      id: '1',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    },
    {
      id: '2',
      image: 'https://images.pexels.com/photos/694424/pexels-photo-694424.jpeg',
    },
    {
      id: '3',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    },
  ],
  fashion: [
    {
      id: '1',
      image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
    },
    {
      id: '2',
      image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
    },
    {
      id: '3',
      image: 'https://images.pexels.com/photos/19820657/pexels-photo-19820657.jpeg',
    },
  ],
  'home-kitchen': [
    {
      id: '1',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    },
    {
      id: '2',
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
    },
    {
      id: '3',
      image: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
    },
  ],
  'beauty-care': [
    {
      id: '1',
      image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg',
    },
    {
      id: '2',
      image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg',
    },
    {
      id: '3',
      image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    },
  ],
  grocery: [
    {
      id: '1',
      image: 'https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg',
    },
    {
      id: '2',
      image: 'https://images.pexels.com/photos/7334141/pexels-photo-7334141.jpeg',
    },
    {
      id: '3',
      image: 'https://images.pexels.com/photos/33440709/pexels-photo-33440709.jpeg',
    },
  ],
};

export default function CategoryCarousel({ categorySlug, categoryName }: Props) {
  const [current, setCurrentSlide] = useState(0);
  const slides = CATEGORY_CAROUSELS[categorySlug] || CATEGORY_CAROUSELS.electronics;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index % slides.length);
  };

  return (
    <div className="relative h-48 md:h-64 overflow-hidden rounded-none">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={`${categoryName} slide ${i + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-transparent" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center px-6 md:px-12 z-20">
        <div>
          <nav className="text-slate-400 text-sm mb-2">
            <button className="hover:text-white">Home</button>
            <span className="mx-2">/</span>
            <span className="text-white">{categoryName}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-black text-white">{categoryName}</h1>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => goToSlide(current - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110 border border-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={() => goToSlide(current + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110 border border-white/30"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
