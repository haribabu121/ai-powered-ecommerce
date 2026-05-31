import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  icon: string;
  sort_order: number;
  created_at: string;
};

const GROCERY_SLUG = 'grocery';

/** Keep only the canonical grocery category (slug `grocery`) when duplicates exist in DB. */
export function filterCategoriesForNav(categories: Category[]): Category[] {
  const hasCanonicalGrocery = categories.some((c) => c.slug === GROCERY_SLUG);
  if (!hasCanonicalGrocery) return categories;

  return categories.filter((c) => {
    const isGrocery =
      c.slug === GROCERY_SLUG ||
      c.slug === 'groceries' ||
      c.name.toLowerCase() === 'groceries' ||
      c.name.toLowerCase() === 'grocery';
    if (!isGrocery) return true;
    return c.slug === GROCERY_SLUG;
  });
}

export function normalizeCategorySlug(slug: string): string {
  return slug === 'groceries' ? GROCERY_SLUG : slug;
}

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  original_price: number | null;
  discount_percent: number | null;
  category_id: string | null;
  brand: string;
  sku: string;
  stock_quantity: number;
  rating: number;
  review_count: number;
  image_url: string;
  images: string[] | null;
  tags: string[];
  subcategory: string | null;
  features: Record<string, string> | null;
  specifications: Record<string, string> | null;
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  prime_eligible: boolean;
  created_at: string;
  categories?: Category;
};

export type CartItem = {
  id: string;
  session_id?: string;
  product_id: string;
  quantity: number;
  created_at: string;
  products?: Product;
};

export type Order = {
  id: string;
  session_id: string;
  status: string;
  total_amount: number;
  shipping_amount: number;
  tax_amount: number;
  discount_amount: number;
  shipping_address: Record<string, string>;
  payment_method: string;
  payment_status: string;
  tracking_number: string;
  created_at: string;
};

export type ChatMessage = {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
};
