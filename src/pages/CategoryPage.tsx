import { useEffect, useState } from 'react';
import { Filter, SlidersHorizontal, Grid, List, X, ChevronDown, ChevronUp } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCarousel from '../components/CategoryCarousel';
import { supabase, Category, Product } from '../lib/supabase';

type Props = {
  categorySlug: string;
  categories: Category[];
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export default function CategoryPage({ categorySlug, categories, onNavigate }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({ electronics: true });
  const [subCategory, setSubCategory] = useState('all');
  const category = categories.find((c) => c.slug === categorySlug);

  const categorySubcategories: Record<string, { slug: string; name: string }[]> = {
    electronics: [
      { slug: 'smartphones', name: 'Smartphones' },
      { slug: 'laptops', name: 'Laptops' },
      { slug: 'accessories', name: 'Accessories' },
      { slug: 'cameras', name: 'Cameras' },
    ],
    fashion: [
      { slug: 'tops', name: 'Tops' },
      { slug: 'shoes', name: 'Shoes' },
      { slug: 'accessories', name: 'Accessories' },
      { slug: 'bags', name: 'Bags' },
    ],
    'home-kitchen': [
      { slug: 'furniture', name: 'Furniture' },
      { slug: 'cookware', name: 'Cookware' },
      { slug: 'decor', name: 'Decor' },
      { slug: 'appliances', name: 'Appliances' },
    ],
    'beauty-care': [
      { slug: 'skincare', name: 'Skincare' },
      { slug: 'makeup', name: 'Makeup' },
      { slug: 'wellness', name: 'Wellness' },
      { slug: 'hair-care', name: 'Hair Care' },
    ],
    'health-wellness': [
      { slug: 'supplements', name: 'Supplements' },
      { slug: 'fitness', name: 'Fitness' },
      { slug: 'personal-care', name: 'Personal Care' },
      { slug: 'nutrition', name: 'Nutrition' },
    ],
    gaming: [
      { slug: 'consoles', name: 'Consoles' },
      { slug: 'accessories', name: 'Accessories' },
      { slug: 'games', name: 'Games' },
      { slug: 'headsets', name: 'Headsets' },
    ],
    grocery: [
      { slug: 'produce', name: 'Produce' },
      { slug: 'snacks', name: 'Snacks' },
      { slug: 'beverages', name: 'Beverages' },
      { slug: 'household', name: 'Household' },
    ],
  };

  useEffect(() => {
    setLoading(true);
    let query = supabase.from('products').select('*, categories(*)');

    if (category) {
      query = query.eq('category_id', category.id);
    }

    if ((categorySlug === 'electronics' || categorySlug === 'grocery') && subCategory !== 'all') {
      query = query.contains('tags', [subCategory]);
    }

    query = query.gte('price', priceRange[0]).lte('price', priceRange[1]);

    switch (sort) {
      case 'price-asc': query = query.order('price', { ascending: true }); break;
      case 'price-desc': query = query.order('price', { ascending: false }); break;
      case 'rating': query = query.order('rating', { ascending: false }); break;
      case 'newest': query = query.order('created_at', { ascending: false }); break;
      default: query = query.order('is_featured', { ascending: false });
    }

    query.then(({ data }) => {
      setProducts(data || []);
      setLoading(false);
    });
  }, [categorySlug, category, sort, priceRange, subCategory]);

  const CATEGORY_HEADER_IMAGES: Record<string, string> = {
    electronics: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    fashion: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
    'home-kitchen': 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    'beauty-care': 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg',
    'health-wellness': 'https://images.pexels.com/photos/4498158/pexels-photo-4498158.jpeg',
    'gaming': 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 md:pt-28">
      {/* Category Header */}
      {['electronics', 'fashion', 'home-kitchen', 'beauty-care', 'grocery'].includes(categorySlug) && category ? (
        <CategoryCarousel categorySlug={categorySlug} categoryName={category.name} />
      ) : (
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img
            src={CATEGORY_HEADER_IMAGES[categorySlug] || 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg'}
            alt={category?.name || 'Category'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-transparent" />
          <div className="absolute inset-0 flex items-center px-6 md:px-12">
            <div>
              <nav className="text-slate-400 text-sm mb-2">
                <button onClick={() => onNavigate('home')} className="hover:text-white">Home</button>
                <span className="mx-2">/</span>
                <span className="text-white">{category?.name || 'Products'}</span>
              </nav>
              <h1 className="text-3xl md:text-5xl font-black text-white">{category?.name || 'All Products'}</h1>
              <p className="text-slate-300 text-sm mt-2">{products.length} products</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar Filter - Desktop */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-36">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <SlidersHorizontal size={16} />
              Filters
            </h3>

            {/* Price range */}
            {/* <div className="mb-5">
              <h4 className="font-semibold text-slate-700 text-sm mb-3">Price Range</h4>
              <div className="space-y-3">
                {[
                  { label: 'Under $25', range: [0, 25] as [number, number] },
                  { label: '$25 - $75', range: [25, 75] as [number, number] },
                  { label: '$75 - $200', range: [75, 200] as [number, number] },
                  { label: '$200 - $500', range: [200, 500] as [number, number] },
                  { label: 'Over $500', range: [500, 10000] as [number, number] },
                ].map(({ label, range }) => (
                  <label key={label} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange[0] === range[0] && priceRange[1] === range[1]}
                      onChange={() => setPriceRange(range)}
                      className="accent-orange-500"
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900">{label}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange[0] === 0 && priceRange[1] === 2000}
                    onChange={() => setPriceRange([0, 2000])}
                    className="accent-orange-500"
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-900">All Prices</span>
                </label>
              </div>
            </div> */}

            {/* Categories */}
            
            <div>
              <h4 className="font-semibold text-slate-700 text-sm mb-3">Categories</h4>
              <div className="space-y-2">
                {categories.map((cat) => {
                  const subcategories = categorySubcategories[cat.slug] || [];
                  const isActiveCategory = cat.slug === categorySlug;
                  const hasDropdown = subcategories.length > 0;
                  const isOpen = openCategories[cat.slug] ?? false;

                  return (
                    <div key={cat.id}>
                      <button
                        onClick={() => {
                          if (!isActiveCategory) {
                            onNavigate('category', { slug: cat.slug });
                            setSubCategory('all');
                            if (hasDropdown) {
                              setOpenCategories((prev) => ({ ...prev, [cat.slug]: true }));
                            }
                          } else if (hasDropdown) {
                            setOpenCategories((prev) => ({ ...prev, [cat.slug]: !isOpen }));
                          }
                        }}
                        className={`w-full flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-colors ${
                          isActiveCategory
                            ? 'bg-orange-50 text-orange-700 font-semibold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span>{cat.name}</span>
                        {hasDropdown ? (
                          isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        ) : null}
                      </button>

                      {hasDropdown && isActiveCategory && isOpen && (
                        <div className="mt-2 space-y-2 pl-4">
                          <button
                            onClick={() => setSubCategory('all')}
                            className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                              subCategory === 'all'
                                ? 'bg-slate-100 text-slate-900 font-semibold'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            All {cat.name}
                          </button>
                          {subcategories.map((sub) => (
                            <button
                              key={sub.slug}
                              onClick={() => setSubCategory(sub.slug)}
                              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                                subCategory === sub.slug
                                  ? 'bg-slate-100 text-slate-900 font-semibold'
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                              }`}
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="lg:hidden flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <Filter size={15} />
                Filters
              </button>
              <span className="text-slate-500 text-sm hidden sm:block">{products.length} results</span>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="text-sm border-2 border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:border-orange-400 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Best Rated</option>
                <option value="newest">Newest</option>
              </select>

              <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setGridView(true)}
                  className={`p-2 transition-colors ${gridView ? 'bg-gradient-to-r from-orange-400 to-rose-500 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setGridView(false)}
                  className={`p-2 transition-colors ${!gridView ? 'bg-gradient-to-r from-orange-400 to-rose-500 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile filter panel */}
          {filterOpen && (
            <div className="lg:hidden bg-white rounded-xl border border-slate-100 shadow-sm p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Filters</h3>
                <button onClick={() => setFilterOpen(false)}><X size={18} className="text-slate-500" /></button>
              </div>
              <h4 className="font-semibold text-slate-700 text-sm mb-2">Price Range</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Under $25', range: [0, 25] as [number, number] },
                  { label: '$25 - $75', range: [25, 75] as [number, number] },
                  { label: '$75 - $200', range: [75, 200] as [number, number] },
                  { label: '$200+', range: [200, 10000] as [number, number] },
                ].map(({ label, range }) => (
                  <button
                    key={label}
                    onClick={() => { setPriceRange(range); setFilterOpen(false); }}
                    className={`text-sm px-3 py-2 rounded-lg border transition-colors ${
                      priceRange[0] === range[0] ? 'bg-gradient-to-r from-orange-400 to-rose-500 text-white border-orange-400' : 'border-2 border-slate-200 text-slate-600 hover:border-orange-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Products grid */}
          {loading ? (
            <div className={`grid ${gridView ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3' : 'grid-cols-1'} gap-5`}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-pulse">
                  <div className="aspect-square bg-slate-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                    <div className="h-5 bg-slate-200 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-500 mb-6">Try adjusting your filters or browse other categories.</p>
              <button
                onClick={() => setPriceRange([0, 2000])}
                className="bg-gradient-to-r from-orange-400 to-rose-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`grid ${gridView ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3' : 'grid-cols-1'} gap-5`}>
              {products.map((p) => (
                <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
