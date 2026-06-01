import { Product } from './supabase';

export type SpecRow = {
  label: string;
  value: string;
};

export type ProductDetailContent = {
  generalDetails: string;
  benefits: string[];
  specRows: SpecRow[];
};

const CHILLI_POWDER_BENEFITS = [
  'Rich in Vitamin C: Red chilies are packed with vitamin C, which supports immune function, skin health, and wound healing, while acting as a powerful antioxidant to fight free radicals.',
  'Boosts Metabolism: The active compound capsaicin gives red chili its heat and may increase metabolic rate, promoting calorie burning and aiding in weight management.',
  'Pain Relief Properties: Capsaicin is known for its natural pain-relieving qualities. It works by reducing the intensity of pain signals in the body, which has been used in topical creams to relieve muscle and joint pain.',
  'Improves Digestion: Red chili can stimulate digestive enzymes, aiding digestion and promoting a healthy gut. However, moderation is key to prevent irritation.',
  'Heart Health Support: The capsaicin in red chili may help reduce blood pressure and improve circulation. Additionally, it has been linked to improved lipid profiles by reducing LDL (bad cholesterol) levels.',
  'Rich in Antioxidants: Besides vitamin C, red chilies contain other antioxidants like carotenoids, which protect cells from damage and may reduce the risk of chronic diseases.',
  'Boosts Immunity: The vitamins and antioxidants in red chili enhance immune defenses, making it a beneficial spice to include in meals, especially during cold seasons.',
];

const CHILLI_FLAKES_BENEFITS = [
  'Texture and Heat: Crushed flakes release capsaicin gradually, giving dishes layered spice and visual appeal on pizzas, pastas, and snacks.',
  'Vitamin C Retention: Sun-dried flakes retain vitamin C from red chillies, supporting immune health and skin repair when used regularly in cooking.',
  'Metabolic Support: Capsaicin in flakes may help stimulate metabolism and promote a feeling of fullness when sprinkled on meals in moderation.',
  'Digestive Stimulation: Light use of chilli flakes can encourage digestive enzyme activity; start with small amounts to suit your tolerance.',
  'Circulation Benefits: Dietary capsaicin from flakes has been associated with improved blood flow and cardiovascular wellness as part of balanced meals.',
  'Antioxidant Variety: Flakes provide carotenoids and related plant compounds that help neutralize oxidative stress from everyday environmental factors.',
  'Kitchen Versatility: Easy to portion by the pinch, flakes let you adjust heat without re-grinding whole pods—ideal for finishing hot dishes.',
];

const WHOLE_CHILLI_BENEFITS = [
  'Whole-Pod Freshness: Dried whole chillies preserve stem and seed oils for tempering (tadka) and grinding custom masalas at home.',
  'Controlled Heat: Soak or slit pods to manage spice level in sambar, rasam, pickles, and oil infusions.',
  'Natural Preservation: Sun-drying concentrates flavor and extends shelf life without artificial preservatives.',
  'Capsaicin Source: Whole pods are a concentrated source of capsaicin for traditional remedies and spicy regional cuisines.',
  'Rich Color: Deep red skins add natural color to gravies and chutneys when fried in oil.',
  'Flexible Prep: Use whole, crushed by hand, or powdered fresh for maximum aroma compared to pre-ground packs.',
  'Authentic Regional Cooking: Essential for Andhra, Chettinad, and coastal recipes that call for whole dried chillies.',
];

const PRODUCT_OVERRIDES: Record<string, ProductDetailContent> = {
  'red-chilli-powder-spicy': {
    generalDetails:
      'Guntur Chillies are renowned for their vibrant color, intense heat, and rich flavor, sourced directly from the Guntur district of Andhra Pradesh. We supply premium-quality raw Guntur chillies, finely ground chilli powder in secure packaging to preserve freshness, and versatile chilli flakes for added texture and heat in various dishes. Each product undergoes stringent quality checks, ensuring unparalleled purity and consistency for an authentic spice experience in every form.',
    benefits: CHILLI_POWDER_BENEFITS,
    specRows: [
      { label: 'Category', value: 'Teja / S17, Baydgi, 334/ S4, 341, DD and Endo-5' },
      { label: 'Flavours', value: 'High - Medium spicy' },
      { label: 'Colour', value: 'Bright Red' },
      { label: 'Pungency in SHU', value: '8000-100000 (Heat)' },
      { label: 'Color in ASTA', value: '40-140 max' },
      { label: 'Size', value: '40-60 mesh' },
    ],
  },
  'red-chilli-flakes-dried': {
    generalDetails:
      'Our dried red chilli flakes deliver bold Guntur-region heat with a satisfying crunch in every sprinkle. Sourced from select harvests in Andhra Pradesh, the chillies are sun-cured and crushed to preserve natural oils, color, and capsaicin potency. Ideal for pizzas, pastas, stir-fries, and marinades, these flakes add texture and consistent spice without clumping. Each batch is screened for purity and packed to maintain aroma from our facility to your kitchen.',
    benefits: CHILLI_FLAKES_BENEFITS,
    specRows: [
      { label: 'Category', value: 'Teja / S17, Baydgi, 334/ S4, 341, DD and Endo-5' },
      { label: 'Flavours', value: 'High - Medium spicy' },
      { label: 'Colour', value: 'Red & Yellow mix' },
      { label: 'Pungency in SHU', value: '8000-90000 (Heat)' },
      { label: 'Color in ASTA', value: '40-140 max' },
      { label: 'Size', value: '2mm-4mm' },
      { label: 'Ash', value: '0.5% maximum' },
      { label: 'Sudan', value: '1,2,3&4' },
      { label: 'Aflatoxin', value: '5PPB' },
      { label: 'Discoloured', value: '1% maximum' },
    ],
  },
  'whole-red-chilli-dried': {
    generalDetails:
      'These whole dried red chillies are hand-selected from Guntur and neighbouring Andhra belts known for high capsaicin and vivid color. Pods are sun-dried on mats, sorted for uniform length, and packed without breaking so you can temper, soak, or grind as needed. Ideal for pickles, sambar, chilli oil, and house-made masala blends where whole-pod aroma matters. Each lot is checked for moisture, insect damage, and foreign matter before sealing.',
    benefits: WHOLE_CHILLI_BENEFITS,
    specRows: [
      { label: 'Category', value: 'Teja / S17, Baydgi, 334/ S4, 341, DD and Endo-5' },
      { label: 'Flavours', value: 'High - Medium spicy' },
      { label: 'Colour', value: 'Deep red, natural' },
      { label: 'Pungency in SHU', value: '15000-100000 (Heat)' },
      { label: 'Form', value: 'Whole dried pods with stem' },
      { label: 'Length', value: '6-12 cm typical' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Foreign Matter', value: 'Max 1%' },
      { label: 'Shelf Life', value: '18 months sealed' },
    ],
  },
};

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) h = (h << 5) - h + slug.charCodeAt(i);
  return Math.abs(h);
}

function pick<T>(items: T[], seed: number, index: number): T {
  return items[(seed + index) % items.length];
}

function generateSpiceDetails(name: string, slug: string): ProductDetailContent {
  const h = hashSlug(slug);
  const isPowder = /powder|ground|masala/i.test(name);
  const isWhole = /whole|seeds|leaves|stick/i.test(name);
  const origin = pick(['Rajasthan', 'Kerala', 'Gujarat', 'Andhra Pradesh', 'Karnataka'], h, 0);
  const grade = pick(['export-grade', 'premium hand-selected', 'farm-direct', 'small-batch'], h, 1);

  const generalDetails = isPowder
    ? `${name} is stone-ground from ${grade} dried spices grown in ${origin}, preserving essential oils and natural color. The fine grind blends smoothly into curries, marinades, and dry rubs without grit. We cool-grind in hygienic facilities, sieve for uniform particle size, and pack immediately to lock in aroma. Suitable for home cooks and commercial kitchens seeking reliable flavor in every batch.`
    : isWhole
      ? `${name} consists of carefully sorted whole spices from ${origin}, sun-dried and cleaned to remove stems and debris. Each lot is aroma-tested before packing to ensure ${grade} quality. Perfect for tempering, slow-cooked gravies, and freshly ground blends at home. Stored in moisture-barrier packaging for lasting freshness.`
      : `${name} is prepared from authentic ${origin} sources using ${grade} processing methods. Natural oils and volatile compounds are protected through controlled drying and gentle handling. This spice is suited for everyday Indian cooking, festive menus, and specialty recipes that demand consistent taste and color.`;

  const benefits = [
    `Natural compounds in ${name} support everyday wellness when used as part of a balanced diet.`,
    `Aromatic oils in this spice enhance flavor depth without artificial additives.`,
    `Convenient shelf-stable format helps reduce prep time in busy kitchens.`,
    `Sourced and packed under quality checks for purity and consistent granulation.`,
    pick(
      [
        'May support digestive comfort when used in moderate culinary amounts.',
        'Adds antioxidant-rich plant compounds typical of whole spices.',
        'Helps elevate homemade masalas with fresher top notes.',
        'Suitable for vegetarian, vegan, and gluten-free meal planning.',
      ],
      h,
      2
    ),
    pick(
      [
        'Ideal for tempering, roasting, and slow-simmered dishes.',
        'Blends well with lentils, vegetables, and protein marinades.',
        'Packed to retain color and aroma during storage.',
      ],
      h,
      3
    ),
  ];

  const specRows: SpecRow[] = isPowder
    ? [
        { label: 'Form', value: 'Fine ground powder' },
        { label: 'Origin', value: origin },
        { label: 'Mesh Size', value: pick(['40-60 mesh', '60-80 mesh', '80-100 mesh'], h, 4) },
        { label: 'Colour', value: pick(['Natural', 'Bright', 'Golden-brown', 'Deep red'], h, 5) },
        { label: 'Additives', value: 'None' },
        { label: 'Shelf Life', value: '12 months sealed' },
      ]
    : isWhole
      ? [
          { label: 'Form', value: 'Whole / intact' },
          { label: 'Origin', value: origin },
          { label: 'Moisture', value: pick(['Max 10%', 'Max 12%', 'Max 8%'], h, 4) },
          { label: 'Foreign Matter', value: 'Max 1%' },
          { label: 'Aroma', value: 'Characteristic, strong' },
          { label: 'Shelf Life', value: '18 months sealed' },
        ]
      : [
          { label: 'Form', value: pick(['Crushed', 'Flaked', 'Granulated'], h, 4) },
          { label: 'Origin', value: origin },
          { label: 'Heat Level', value: pick(['Mild', 'Medium', 'Medium-hot', 'Hot'], h, 5) },
          { label: 'Colour', value: 'Natural' },
          { label: 'Purity', value: '99% minimum' },
          { label: 'Shelf Life', value: '12 months sealed' },
        ];

  return { generalDetails, benefits, specRows };
}

function generateGroceryDetails(name: string, slug: string, subcategory: string): ProductDetailContent {
  const h = hashSlug(slug);
  const templates: Record<string, string> = {
    jaggery: `${name} is made from concentrated sugarcane juice without chemical bleaching, offering a rich caramel sweetness and mineral content prized in traditional sweets. Slow-cooked in small batches, it dissolves evenly in milk-based desserts, chai, and energy bars. Each block and powder lot is tested for purity before export-ready packing.`,
    cereals: `${name} is processed from select grains and millets to deliver reliable texture for breakfast and fasting recipes. Roasted or flattened using hygienic equipment, it cooks quickly while keeping a pleasant bite. Ideal for poha, upma, snacks, and wholesome meal prep across busy households.`,
    nuts: `${name} is sourced from trusted growing regions and sorted for uniform size and freshness. Naturally rich in healthy fats and protein, these nuts are packed in moisture-controlled environments to limit rancidity. Perfect for snacking, baking, garnishing, and premium gift assortments.`,
    flour: `${name} is milled from cleaned whole grains into a consistent flour suitable for rotis, baking, and regional specialties. Low-moisture milling helps extend shelf stability while preserving nutritional fiber. Each bag is sealed immediately after quality screening.`,
    dals: `${name} comes from polished lentils with even sizing for faster, even cooking. Washed and sun-dried using food-safe handling, these dals are ideal for daily dal, khichdi, and protein-rich vegetarian meals. Sortex-cleaned lots reduce stone and husk content.`,
    'rice-flour': `${name} is finely ground from selected rice varieties for soft idlis, crispy dosa, and gluten-free baking. The grind is monitored for smooth texture without coarse grit. Packed fresh to support South Indian kitchens and specialty food businesses.`,
    rice: `${name} is aged and milled for fluffy separation and authentic aroma after cooking. Long-grain lots are graded for broken percentage and moisture before bagging. Suitable for biryani, daily meals, and catering operations that need dependable results.`,
    tissues: `${name} is engineered for softness, strength, and reliable absorption in home and commercial use. Ply-bonded sheets resist tearing while remaining gentle on skin. Packed in hygienic wraps for pantry, restroom, and hospitality supply.`,
  };

  const generalDetails =
    templates[subcategory] ||
    `${name} is prepared under strict food-safety practices for dependable quality in everyday use. Ingredients are inspected, processed, and packed to preserve freshness from facility to customer. Suitable for households, restaurants, and retail shelves seeking consistent MartX standards.`;

  const benefits = [
    `${name} supports convenient meal preparation with dependable quality in every pack.`,
    pick(['Naturally processed', 'Carefully graded', 'Hygienically packed', 'Batch-tested'], h, 0) + ' for peace of mind at home or business.',
    pick(['Versatile for daily cooking', 'Ideal for festive menus', 'Great for bulk catering', 'Perfect for retail resale'], h, 1) + '.',
    'Sealed packaging helps maintain freshness during storage and transport.',
    pick(
      [
        'Free from unnecessary artificial colors in base processing.',
        'Sorted for uniform size and cleaner cooking results.',
        'Suitable for vegetarian meal plans.',
        'Consistent results across repeat orders.',
      ],
      h,
      2
    ),
  ];

  const specRows: SpecRow[] = [
    { label: 'Product Type', value: subcategory.replace(/-/g, ' ') || 'Grocery' },
    { label: 'Grade', value: pick(['Premium', 'Standard', 'Export', 'Select'], h, 3) },
    { label: 'Packaging', value: pick(['Food-grade pouch', 'Carton', 'Bulk sack', 'Retail pack'], h, 4) },
    { label: 'Shelf Life', value: pick(['6 months', '9 months', '12 months', '18 months'], h, 5) },
    { label: 'Storage', value: 'Cool, dry place' },
    { label: 'Origin', value: pick(['India', 'Multi-origin', 'Regional farms'], h, 6) },
  ];

  return { generalDetails, benefits, specRows };
}

function generateGeneralDetails(name: string, slug: string, categorySlug: string): ProductDetailContent {
  const h = hashSlug(slug);
  const cat = categorySlug || 'general';

  const intros: Record<string, string[]> = {
    electronics: [
      `${name} combines modern engineering with everyday usability for work, entertainment, and travel. Built with quality components, it delivers reliable performance across typical daily workloads. Clear documentation and standard compatibility make setup straightforward for most users.`,
      `${name} is designed for users who want responsive performance and durable construction in one package. Tested for common use cases, it balances power efficiency with practical features. Ideal for students, professionals, and home offices upgrading their tech setup.`,
    ],
    fashion: [
      `${name} is tailored for comfort and style with attention to stitching, fit, and fabric hand-feel. Versatile enough for casual outings or layered looks, it pairs easily with wardrobe staples. Quality finishing helps the garment hold shape after regular wear and care.`,
      `${name} blends contemporary design with wearable comfort for all-day use. Fabric selection focuses on breathability and ease of movement. A smart addition for building seasonal outfits with minimal effort.`,
    ],
    'home-kitchen': [
      `${name} is built for everyday home use with practical features that simplify cooking, cleaning, or organization. Durable materials and thoughtful design support repeated use in busy kitchens. A dependable choice for households upgrading daily essentials.`,
      `${name} helps streamline household tasks with user-friendly operation and solid construction. Designed for regular family use, it balances function and value. Suitable for new homes, rentals, and gift registries.`,
    ],
    'beauty-care': [
      `${name} is formulated for daily skincare or grooming routines with carefully selected ingredients. Texture and absorption are tuned for comfortable application morning and night. Dermatologically sensible choices support consistent self-care habits.`,
      `${name} supports your beauty regimen with a formula developed for visible comfort and routine compatibility. Packaged for hygienic use and easy storage in bathroom cabinets. Ideal for maintaining healthy-looking skin or hair with regular use.`,
    ],
    default: [
      `${name} is selected for quality, reliability, and value as part of the MartX catalog. Each unit meets our listing standards for materials and performance. Suitable for everyday use by households and professionals alike.`,
      `${name} delivers practical benefits backed by clear product information and dependable sourcing. Designed to meet common customer expectations in its category. Packaged securely for safe delivery.`,
    ],
  };

  const benefitPools: Record<string, string[][]> = {
    electronics: [
      ['Reliable performance for daily tasks and entertainment.'],
      ['Energy-efficient operation helps reduce running costs over time.'],
      ['Compatible with widely used accessories and standards.'],
      ['Backed by manufacturer warranty support where applicable.'],
    ],
    fashion: [
      ['Comfortable fit designed for extended wear.'],
      ['Easy to style with multiple outfits and occasions.'],
      ['Quality stitching supports durability after washing.'],
      ['Available in popular sizes for inclusive shopping.'],
    ],
    'home-kitchen': [
      ['Simplifies everyday household or kitchen routines.'],
      ['Durable build suited for frequent family use.'],
      ['Easy to clean and maintain with standard care.'],
      ['Compact or efficient design saves space where needed.'],
    ],
    'beauty-care': [
      ['Supports a consistent daily care routine.'],
      ['Lightweight texture for comfortable application.'],
      ['Suitable for regular morning and evening use.'],
      ['Packaged for hygienic handling and storage.'],
    ],
    default: [
      ['Dependable quality for everyday use.'],
      ['Clear usage guidelines on packaging.'],
      ['Securely packed for safe shipping.'],
      ['Good value within its product category.'],
    ],
  };

  const specPools: Record<string, SpecRow[][]> = {
    electronics: [
      [
        { label: 'Category', value: 'Consumer electronics' },
        { label: 'Warranty', value: pick(['1 year', '2 years', 'Limited manufacturer'], h, 0) },
        { label: 'Power', value: pick(['AC adapter included', 'USB-C charging', 'Battery powered'], h, 1) },
        { label: 'Compatibility', value: pick(['Universal', 'Windows / macOS', 'iOS / Android'], h, 2) },
      ],
    ],
    fashion: [
      [
        { label: 'Material', value: pick(['Cotton blend', 'Polyester blend', 'Denim', 'Wool blend'], h, 0) },
        { label: 'Care', value: 'Machine wash cold, tumble dry low' },
        { label: 'Fit', value: pick(['Regular', 'Slim', 'Relaxed', 'Athletic'], h, 1) },
        { label: 'Season', value: pick(['All season', 'Spring/Summer', 'Fall/Winter'], h, 2) },
      ],
    ],
    'home-kitchen': [
      [
        { label: 'Use', value: pick(['Indoor', 'Kitchen', 'Bathroom', 'Living area'], h, 0) },
        { label: 'Material', value: pick(['Stainless steel', 'Ceramic', 'ABS plastic', 'Cotton blend'], h, 1) },
        { label: 'Care', value: 'Wipe clean; see label for wash instructions' },
        { label: 'Assembly', value: pick(['Ready to use', 'Minimal assembly', 'Tool-free setup'], h, 2) },
      ],
    ],
    'beauty-care': [
      [
        { label: 'Skin Type', value: pick(['All skin types', 'Normal to dry', 'Normal to oily', 'Sensitive'], h, 0) },
        { label: 'Format', value: pick(['Cream', 'Serum', 'Lotion', 'Gel'], h, 1) },
        { label: 'Volume', value: pick(['30 ml', '50 ml', '100 ml', '200 ml'], h, 2) },
        { label: 'Usage', value: 'Apply as directed on package' },
      ],
    ],
    default: [
      [
        { label: 'Brand', value: 'MartX partner' },
        { label: 'Condition', value: 'New' },
        { label: 'Packaging', value: 'Retail box' },
        { label: 'Origin', value: pick(['Imported', 'Domestic', 'Multi-source'], h, 0) },
      ],
    ],
  };

  const pool = intros[cat] || intros.default;
  const benefitSet = benefitPools[cat] || benefitPools.default;
  const specSet = specPools[cat] || specPools.default;

  const selectedBenefits = benefitSet.map((lines, i) => {
    const line = Array.isArray(lines) ? lines[0] : String(lines);
    const prefix = i === 0 ? `${name}: ` : '';
    return `${prefix}${line}`;
  });

  return {
    generalDetails: pick(pool, h, 0),
    benefits: selectedBenefits,
    specRows: pick(specSet, h, 2).map((row) =>
      row.label === 'Brand' ? { ...row, value: productBrandFromName(name) } : row
    ),
  };
}

function productBrandFromName(name: string): string {
  const first = name.split(' ')[0];
  return first || 'MartX';
}

/** Prefer DB fields when present, otherwise overrides or generated unique content. */
export function getProductDetails(product: Product): ProductDetailContent {
  if (PRODUCT_OVERRIDES[product.slug]) {
    return PRODUCT_OVERRIDES[product.slug];
  }

  const categorySlug = (product.categories as { slug?: string } | undefined)?.slug || '';
  const sub = product.subcategory || '';

  let generated: ProductDetailContent;
  if (categorySlug === 'grocery') {
    if (sub === 'spices') {
      generated = generateSpiceDetails(product.name, product.slug);
    } else {
      generated = generateGroceryDetails(product.name, product.slug, sub);
    }
  } else {
    generated = generateGeneralDetails(product.name, product.slug, categorySlug);
  }

  return generated;
}
