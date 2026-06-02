import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Home } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCarousel from '../components/CategoryCarousel';
import { supabase, Category, Product } from '../lib/supabase.ts';
import {
  getSubcategoriesForCategory,
  getGrocerySubcategoryGroups,
  getGrocerySubcategoriesForGroup,
  type SubcategoryItem,
} from '../lib/categorySubcategories';

type Props = {
  categorySlug: string;
  categories: Category[];
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export default function CategoryPage({ categorySlug, categories, onNavigate }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const sort = 'featured' as SortOption;
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const gridView = true;
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({ electronics: true });
  const [subCategory, setSubCategory] = useState('all');
  const [groceryGroup, setGroceryGroup] = useState('jaggery');
  const category = categories.find((c) => c.slug === categorySlug);

  const isAllProductsPage = categorySlug === '';
  const groceryGroups = categorySlug === 'grocery' ? getGrocerySubcategoryGroups() : [];
  const activeSubcategories = categorySlug === 'grocery'
    ? getGrocerySubcategoriesForGroup(groceryGroup)
    : category
      ? getSubcategoriesForCategory(categorySlug, category.name)
      : [];
  const allProductsCategories = categories.filter((cat) => (
    getSubcategoriesForCategory(cat.slug, cat.name).length > 0
  ));
  const showSidebar = categorySlug === 'grocery'
    ? groceryGroups.length > 0
    : isAllProductsPage
      ? allProductsCategories.length > 0
      : activeSubcategories.length > 0 && !!category;

  useEffect(() => {
    if (categorySlug === 'grocery') {
      const firstGroup = groceryGroups[0]?.slug || 'jaggery';
      setGroceryGroup(firstGroup);
      setSubCategory('all');
      setOpenCategories(Object.fromEntries(groceryGroups.map((group) => [group.slug, true])));
      return;
    }

    if (isAllProductsPage) {
      setSubCategory('all');
      setOpenCategories(Object.fromEntries(allProductsCategories.map((cat) => [cat.slug, false])));
      return;
    }

    setSubCategory('all');
    setOpenCategories({ [categorySlug]: true });
  }, [categorySlug, groceryGroups, allProductsCategories, isAllProductsPage]);

  useEffect(() => {
    setLoading(true);
    let query = supabase.from('products').select('*, categories(*)');

    if (category) {
      query = query.eq('category_id', category.id);
    }

    if (categorySlug === 'grocery' && subCategory !== 'all') {
      query = query.eq('subcategory', subCategory);
    } else if (categorySlug !== 'grocery' && subCategory !== 'all') {
      query = query.eq('subcategory', subCategory);
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
      setProducts((data || []) as Product[]);
      setLoading(false);
    });
  }, [categorySlug, category, sort, priceRange, subCategory]);

  const CATEGORY_HEADER_IMAGES: Record<string, string> = {
    electronics: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    fashion: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
    'home-kitchen': 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    'beauty-care': 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg',
    'health-wellness': 'https://images.pexels.com/photos/4498158/pexels-photo-4498158.jpeg',
  };

  const handleGroceryItemClick = (sub: SubcategoryItem) => {
    onNavigate('product', { slug: sub.slug });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-6">
      {/* Category Header */}
      {['electronics', 'fashion', 'home-kitchen', 'beauty-care', 'grocery'].includes(categorySlug) && category ? (
        <CategoryCarousel categorySlug={categorySlug} categoryName={category.name} onNavigate={onNavigate} />
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

      {showSidebar && (
        <div className="max-w-7xl mx-auto px-4 py-4 lg:hidden">
          {categorySlug === 'grocery' && groceryGroups.length > 0 && (
            <div className="mb-3">
              <label htmlFor="grocery-group-select" className="sr-only">
                Select grocery section
              </label>
              <select
                id="grocery-group-select"
                value={groceryGroup}
                onChange={(event) => {
                  setGroceryGroup(event.target.value);
                  setSubCategory(event.target.value);
                }}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
              >
                {groceryGroups.map((group) => (
                  <option key={group.slug} value={group.slug}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Home size={16} />
            </button>
            {isAllProductsPage ? (
              allProductsCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setOpenCategories((prev) => ({ ...prev, [cat.slug]: true }))}
                  className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-slate-600 bg-white hover:bg-slate-100 transition-colors"
                >
                  {cat.name}
                </button>
              ))
            ) : (
              activeSubcategories.map((sub) => (
                <button
                  key={sub.slug}
                  onClick={() => (categorySlug === 'grocery' ? handleGroceryItemClick(sub) : setSubCategory(sub.slug))}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    subCategory === sub.slug
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 bg-white hover:bg-slate-100'
                  }`}
                >
                  {sub.name}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-36">
            {isAllProductsPage ? (
              <div className="mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Categories</h2>
              </div>
            ) : null}
            {categorySlug === 'grocery' && groceryGroups.length > 0 ? (
              groceryGroups.map((group) => (
                <div key={group.slug} className="mb-4">
                  <button
                    type="button"
                    onClick={() => setOpenCategories((prev) => ({ ...prev, [group.slug]: !(prev[group.slug] ?? true) }))}
                    className="w-full flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-colors bg-orange-50 text-orange-700 font-semibold"
                  >
                    <span>{group.name}</span>
                    {(openCategories[group.slug] ?? true) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {(openCategories[group.slug] ?? true) && (
                    <div className="mt-2 space-y-2 pl-4">
                      {group.items.map((sub) => (
                        <button
                          key={sub.slug}
                          type="button"
                          onClick={() => (categorySlug === 'grocery' ? handleGroceryItemClick(sub) : setSubCategory(sub.slug))}
                          className="w-full text-left text-sm px-3 py-2 rounded-lg transition-colors text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : isAllProductsPage && allProductsCategories.length > 0 ? (
              allProductsCategories.map((cat) => {
                const subcats = getSubcategoriesForCategory(cat.slug, cat.name);
                return (
                  <div key={cat.slug} className="mb-4">
                    <button
                      type="button"
                      onClick={() => setOpenCategories((prev) => ({ ...prev, [cat.slug]: !(prev[cat.slug] ?? false) }))}
                      className="w-full flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-colors bg-orange-50 text-orange-700 font-semibold"
                    >
                      <span>{cat.name}</span>
                      {(openCategories[cat.slug] ?? false) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {(openCategories[cat.slug] ?? false) && (
                      <div className="mt-2 space-y-2 pl-4">
                        {subcats.map((sub) => (
                          <button
                            key={sub.slug}
                            type="button"
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
              })
            ) : activeSubcategories.length > 0 && category ? (
              <div>
                <button
                  type="button"
                  onClick={() => setOpenCategories((prev) => ({ ...prev, [categorySlug]: !(prev[categorySlug] ?? true) }))}
                  className="w-full flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-colors bg-orange-50 text-orange-700 font-semibold"
                >
                  <span>{category.name}</span>
                  {(openCategories[categorySlug] ?? true) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {(openCategories[categorySlug] ?? true) && (
                  <div className="mt-2 space-y-2 pl-4">
                    {activeSubcategories.map((sub) => (
                      <button
                        key={sub.slug}
                        type="button"
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
            ) : null}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
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
              <div className="text-6xl mb-4">??</div>
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
