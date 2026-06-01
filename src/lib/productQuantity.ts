type ProductQuantityInput = {
  name: string;
  slug: string;
  subcategory?: string | null;
};

type UnitMode = 'lbs_only' | 'grams_and_lbs';

/** Grocery subcategory → which units to show under the product image. */
const SUBCATEGORY_UNIT_MODE: Record<string, UnitMode> = {
  jaggery: 'lbs_only',
  cereals: 'grams_and_lbs',
  nuts: 'grams_and_lbs', // Nuts & dry fruits
  dals: 'lbs_only',
  flour: 'lbs_only',
  rice: 'lbs_only',
  'rice-flour': 'lbs_only',
  spices: 'grams_and_lbs',
};

const GRAM_OPTIONS = [100, 200, 250, 500, 750, 1000, 2000];
const LB_OPTIONS = [0.5, 1, 2, 5, 10, 25, 50];

function hashKey(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i += 1) {
    h = (h << 5) - h + key.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function formatGrams(grams: number): string {
  if (grams >= 1000 && grams % 1000 === 0) return `${grams / 1000} kg`;
  return `${grams} g`;
}

function formatLbs(lbs: number): string {
  if (lbs === 0.5) return '0.5 lb';
  if (lbs === 1) return '1 lb';
  return `${lbs} lbs`;
}

function inferSubcategory(product: ProductQuantityInput): string | null {
  if (product.subcategory) return product.subcategory;
  const n = product.name.toLowerCase();
  if (/jaggery/.test(n)) return 'jaggery';
  if (/dal|lentil|bean|moong|toor|urad|chana/.test(n)) return 'dals';
  if (/flour|atta|besan|maida/.test(n) && !/rice flour/i.test(n)) return 'flour';
  if (/rice flour/.test(n)) return 'rice-flour';
  if (/rice|basmati|sona|poha/.test(n)) return 'rice';
  if (/cereal|millet|ragi|oats|poha|barley/.test(n)) return 'cereals';
  if (/nut|almond|cashew|walnut|date|raisin|dry fruit|peanut|coconut chip/.test(n)) return 'nuts';
  if (/spice|chilli|turmeric|cumin|pepper|masala|cardamom|clove|coriander/.test(n)) return 'spices';
  return null;
}

function resolveUnitMode(product: ProductQuantityInput): UnitMode | null {
  const sub = inferSubcategory(product);
  if (sub && SUBCATEGORY_UNIT_MODE[sub]) return SUBCATEGORY_UNIT_MODE[sub];
  return null;
}

function pickUniqueFromPool<T>(pool: T[], h: number, count: number): T[] {
  const picked = new Set<T>();
  for (let i = 0; picked.size < count && i < pool.length * 2; i += 1) {
    picked.add(pool[(h + i * 5) % pool.length]);
  }
  return [...picked];
}

function buildGramsAndLbs(h: number): string {
  const gramCount = 1 + (h % 2);
  const lbCount = 1 + ((h >> 2) % 2);
  const grams = pickUniqueFromPool(GRAM_OPTIONS, h, gramCount).sort((a, b) => a - b);
  const lbs = pickUniqueFromPool(LB_OPTIONS, h + 17, lbCount).sort((a, b) => a - b);
  const parts = [...grams.map(formatGrams), ...lbs.map(formatLbs)];
  return parts.join(', ');
}

function buildLbsOnly(h: number): string {
  const count = 2 + (h % 2);
  const lbs = pickUniqueFromPool(LB_OPTIONS, h, count).sort((a, b) => a - b);
  return lbs.map(formatLbs).join(', ');
}

/** Deterministic unique quantity label per product (from slug + name + subcategory). */
export function getAvailableQuantityValue(product: ProductQuantityInput): string {
  const key = `${product.slug}::${product.name}::${product.subcategory ?? ''}`;
  const h = hashKey(key);
  const mode = resolveUnitMode(product);

  if (mode === 'lbs_only') return buildLbsOnly(h);
  if (mode === 'grams_and_lbs') return buildGramsAndLbs(h);

  const packSizes = [6, 12, 24, 30, 48, 60, 72, 96, 120, 144, 180, 240, 360, 500, 750, 1000];
  const primary = packSizes[h % packSizes.length];
  const secondary = packSizes[(h + 11) % packSizes.length];
  if (primary === secondary) return `${primary} pcs`;
  return `${Math.min(primary, secondary)} pcs, ${Math.max(primary, secondary)} pcs`;
}

export function getAvailableQuantityLabel(product: ProductQuantityInput): string {
  return `Available in quantity: ${getAvailableQuantityValue(product)}`;
}
