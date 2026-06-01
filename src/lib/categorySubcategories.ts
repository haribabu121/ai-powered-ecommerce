export type SubcategoryItem = {
  slug: string;
  name: string;
};

export const CATEGORY_SUBCATEGORIES: Record<string, SubcategoryItem[]> = {
  electronics: [
    { slug: 'smartphones', name: 'Phones' },
    { slug: 'laptops', name: 'Laptops' },
    { slug: 'accessories', name: 'Accessories' },
    { slug: 'cameras', name: 'Cameras' },
  ],
  fashion: [
    { slug: 'tops', name: 'Tops' },
    { slug: 'shoes', name: 'Shoes' },
    { slug: 'menswear', name: 'Menswear' },
  ],
  'home-kitchen': [
    { slug: 'appliances', name: 'Appliances' },
    { slug: 'toilets', name: 'Toilets' },
    { slug: 'tissues', name: 'Tissues' },
  ],
  'beauty-care': [
    { slug: 'skincare', name: 'Skincare' },
    { slug: 'makeup', name: 'Makeup' },
    { slug: 'hair-care', name: 'Hair Care' },
  ],
  grocery: [
    { slug: 'jaggery', name: 'Jaggery' },
    { slug: 'cereals', name: 'Cereals' },
    { slug: 'nuts', name: 'Nuts & Dry Fruits' },
    { slug: 'flour', name: 'Flour' },
    { slug: 'dals', name: 'Dals & Beans' },
    { slug: 'rice-flour', name: 'Rice Flour' },
    { slug: 'rice', name: 'Rice' },
    { slug: 'spices', name: 'Spices' },
  ],
};

const DUPLICATE_SUB_SLUGS: Record<string, string[]> = {
  grocery: ['grocery', 'groceries', 'grocery-items'],
  electronics: ['electronics', 'electronic', 'gadgets'],
  fashion: ['fashion', 'apparel', 'fashion-apparel'],
  'home-kitchen': ['home-kitchen', 'home', 'kitchen', 'home-kitchen-appliances'],
  'beauty-care': ['beauty-care', 'beauty', 'beauty-and-care'],
};

/** Subcategories for sidebar/pills — excludes parent category duplicates (e.g. Groceries under Groceries). */
export function getSubcategoriesForCategory(categorySlug: string, categoryName?: string): SubcategoryItem[] {
  const list = CATEGORY_SUBCATEGORIES[categorySlug] || [];
  const blocked = new Set([
    categorySlug,
    ...(DUPLICATE_SUB_SLUGS[categorySlug] || []),
  ]);
  const parentName = (categoryName || '').trim().toLowerCase();

  return list.filter((sub) => {
    if (blocked.has(sub.slug)) return false;
    if (parentName && sub.name.trim().toLowerCase() === parentName) return false;
    if (parentName && sub.name.trim().toLowerCase() === `${parentName}s`) return false;
    return true;
  });
}
