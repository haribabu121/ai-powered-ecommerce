export type SubcategoryItem = {
  slug: string;
  name: string;
};

export type SubcategoryGroup = {
  slug: string;
  name: string;
  items: SubcategoryItem[];
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

export const GROCERY_SUBCATEGORY_GROUPS: SubcategoryGroup[] = [
  {
    slug: 'jaggery',
    name: 'Jaggery',
    items: [
      { slug: 'organic-jaggery-powder', name: 'Organic Jaggery Powder' },
      { slug: 'desi-jaggery-cubes', name: 'Desi Jaggery Cubes' },
    ],
  },
  {
    slug: 'cereals',
    name: 'Cereals',
    items: [
      { slug: 'thool-makhina-roasted', name: 'Thool Makhina Roasted' },
      { slug: 'poha-atukulu', name: 'Poha Atukulu' },
      { slug: 'sabudana-saggubayyam', name: 'Sabudana Saggubayyam' },
      { slug: 'murmura-puffed-rice', name: 'Murmura Puffed Rice' },
    ],
  },
  {
    slug: 'nuts',
    name: 'Nuts & Dry Fruits',
    items: [
      { slug: 'cashew-whole-raw', name: 'Cashew Whole Raw' },
      { slug: 'cashew-pieces', name: 'Cashew Pieces' },
      { slug: 'coconut-flakes-dried', name: 'Coconut Flakes Dried' },
      { slug: 'coconut-powder', name: 'Coconut Powder' },
      { slug: 'dry-coconut-chips', name: 'Dry Coconut Chips' },
      { slug: 'roasted-peanuts-unsalted', name: 'Roasted Peanuts Unsalted' },
      { slug: 'walnuts-whole', name: 'Walnuts Whole' },
      { slug: 'dry-dates-natural', name: 'Dry Dates Natural' },
      { slug: 'dry-dates-powder', name: 'Dry Dates Powder' },
    ],
  },
  {
    slug: 'flour',
    name: 'Flour',
    items: [
      { slug: 'chakki-atta-whole-wheat', name: 'Chakki Atta Whole Wheat' },
      { slug: 'besan-chickpea-flour', name: 'Besan Chickpea Flour' },
      { slug: 'jawar-flour-sorghum', name: 'Jawar Flour Sorghum' },
    ],
  },
  {
    slug: 'dals',
    name: 'Dals & Beans',
    items: [
      { slug: 'chana-dal-split', name: 'Chana Dal Split' },
      { slug: 'green-chana-mung-beans', name: 'Green Chana Mung Beans' },
      { slug: 'kabuli-chana-chickpeas', name: 'Kabuli Chana Chickpeas' },
      { slug: 'mixed-beans-variety', name: 'Mixed Beans Variety' },
    ],
  },
  {
    slug: 'rice-flour',
    name: 'South Indian Rice Flour',
    items: [
      { slug: 'ragi-flour-finger-millet', name: 'Ragi Flour Finger Millet' },
      { slug: 'roasted-upma-rava-semolina', name: 'Roasted Upma Rava Semolina' },
    ],
  },
  {
    slug: 'rice',
    name: 'South Indian Rice',
    items: [
      { slug: 'brown-soona-mossir-rice', name: 'Brown Soona Mossir Rice' },
      { slug: 'white-soona-mossir-rice', name: 'White Soona Mossir Rice' },
      { slug: 'idli-rice-parboiled', name: 'Idli Rice Parboiled' },
      { slug: 'brown-rice-long-grain', name: 'Brown Rice Long Grain' },
      { slug: 'basmati-rice-white', name: 'Basmati Rice White' },
      { slug: 'brown-basmati-rice-organic', name: 'Brown Basmati Rice Organic' },
      { slug: 'extra-long-grain-basmati', name: 'Extra Long Grain Basmati' },
      { slug: 'low-gi-basmati-rice', name: 'Low GI Basmati Rice' },
    ],
  },
  {
    slug: 'spices',
    name: 'Spices',
    items: [
      { slug: 'ajwain-seeds-carom', name: 'Ajwain Seeds Carom' },
      { slug: 'amchur-powder-dried-mango', name: 'Amchur Powder Dried Mango' },
      { slug: 'bay-leaves', name: 'Bay Leaves' },
      { slug: 'black-cardamom-whole', name: 'Black Cardamom Whole' },
      { slug: 'black-pepper-powder', name: 'Black Pepper Powder' },
      { slug: 'white-pepper-powder', name: 'White Pepper Powder' },
      { slug: 'cinnamon-stick-flat', name: 'Cinnamon Stick Flat' },
      { slug: 'cinnamon-stick-curled', name: 'Cinnamon Stick Curled' },
      { slug: 'cinnamon-powder-ground', name: 'Cinnamon Powder Ground' },
      { slug: 'clove-powder-ground', name: 'Clove Powder Ground' },
      { slug: 'cloves-whole', name: 'Cloves Whole' },
      { slug: 'coriander-seeds-whole', name: 'Coriander Seeds Whole' },
      { slug: 'coriander-powder', name: 'Coriander Powder' },
      { slug: 'red-chilli-powder-spicy', name: 'Red Chilli Powder Spicy' },
      { slug: 'red-chilli-flakes-dried', name: 'Red Chilli Flakes Dried' },
      { slug: 'cumin-seeds-jeera', name: 'Cumin Seeds Jeera' },
      { slug: 'cumin-powder-ground', name: 'Cumin Powder Ground' },
      { slug: 'turmeric-powder-pure', name: 'Turmeric Powder Pure' },
      { slug: 'himalayan-turmeric-powder', name: 'Himalayan Turmeric Powder' },
      { slug: 'ginger-powder-dried', name: 'Ginger Powder Dried' },
      { slug: 'garlic-powder', name: 'Garlic Powder' },
      { slug: 'green-cardamom-whole', name: 'Green Cardamom Whole' },
      { slug: 'hing-powder-asafoetida', name: 'Hing Powder Asafoetida' },
      { slug: 'fenugreek-methi-powder', name: 'Fenugreek Methi Powder' },
      { slug: 'mustard-seeds-black', name: 'Mustard Seeds Black' },
      { slug: 'nutmeg-whole', name: 'Nutmeg Whole' },
      { slug: 'nutmeg-powder-ground', name: 'Nutmeg Powder Ground' },
      { slug: 'star-anise-seeds', name: 'Star Anise Seeds' },
      { slug: 'tamarind-paste', name: 'Tamarind Paste' },
      { slug: 'whole-garam-masala-blend', name: 'Whole Garam Masala Blend' },
      { slug: 'whole-red-chilli-dried', name: 'Whole Red Chilli Dried' },
    ],
  },
];

export function getGrocerySubcategoryGroups(): SubcategoryGroup[] {
  return GROCERY_SUBCATEGORY_GROUPS;
}

export function getGrocerySubcategoriesForGroup(groupSlug: string): SubcategoryItem[] {
  return GROCERY_SUBCATEGORY_GROUPS.find((group) => group.slug === groupSlug)?.items || [];
}

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
