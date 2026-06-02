import { Category } from '../lib/supabase';

type Props = {
  categories: Category[];
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function CategoriesPage({ categories, onNavigate }: Props) {
  const fallback = 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg';

  return (
    <div className="min-h-screen bg-slate-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">Shop by Category</h1>
          <p className="text-slate-500 text-sm mt-1">Browse all departments</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onNavigate('category', { slug: cat.slug })}
              className="group relative overflow-hidden rounded-2xl aspect-square shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <img
                src={cat.image_url || fallback}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = fallback;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <div className="text-white font-extrabold text-sm md:text-base leading-tight">
                  {cat.name}
                </div>
                <div className="text-white/80 text-xs line-clamp-2">{cat.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

