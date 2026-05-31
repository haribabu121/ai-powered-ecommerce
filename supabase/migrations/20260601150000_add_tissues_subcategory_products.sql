-- Insert / update Tissues products for Home & Kitchen > Tissues subcategory with proper images

INSERT INTO products
(name, slug, description, price, original_price,
 discount_percent, category_id, brand,
 stock_quantity, rating, review_count,
 image_url, is_featured, is_bestseller,
 is_new, prime_eligible, tags, subcategory)

SELECT
  p.name,
  p.slug,
  p.description,
  p.price,
  p.original_price,
  p.discount_percent,
  c.id,
  p.brand,
  p.stock,
  p.rating,
  p.reviews,
  p.image_url,
  p.featured,
  p.bestseller,
  p.is_new,
  true,
  p.tags,
  'tissues'

FROM (
  VALUES
    (
      'Tissue Paper Rolls 30pk',
      'tissue-paper-rolls-30pk',
      'Ultra soft, 2-ply tissue rolls, hypoallergenic',
      24.99,
      39.99,
      37,
      'PaperCare',
      400,
      4.7,
      2341,
      'https://images.pexels.com/photos/6620096/pexels-photo-6620096.jpeg',
      true,
      true,
      false,
      ARRAY['tissue', 'paper', 'roll']::text[]
    ),
    (
      'Facial Tissue Box 48pc',
      'facial-tissue-box-48pc',
      'Aloe vera enriched, 48 boxes, gentle on skin',
      19.99,
      29.99,
      33,
      'SoftTouch',
      500,
      4.6,
      1876,
      'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg',
      false,
      true,
      true,
      ARRAY['tissue', 'paper', 'box']::text[]
    ),
    (
      'Napkins Paper 200ct',
      'napkins-paper-200ct',
      'Strong absorbent napkins, eco-friendly, 200 count',
      14.99,
      22.99,
      35,
      'GreenNapkin',
      450,
      4.5,
      1234,
      'https://images.pexels.com/photos/3267540/pexels-photo-3267540.jpeg',
      false,
      false,
      false,
      ARRAY['napkin', 'paper', 'wipes']::text[]
    ),
    (
      'Wet Wipes 80pc',
      'wet-wipes-80pc',
      'Alcohol-free, gentle on skin, 80 wipes per pack',
      9.99,
      14.99,
      33,
      'CleanWipe',
      350,
      4.7,
      987,
      'https://images.pexels.com/photos/6627544/pexels-photo-6627544.jpeg',
      false,
      true,
      false,
      ARRAY['wipes', 'tissue', 'bathroom']::text[]
    )
) AS p(
  name, slug, description, price, original_price,
  discount_percent, brand, stock, rating, reviews,
  image_url, featured, bestseller, is_new, tags
)

JOIN categories c ON c.slug = 'home-kitchen'

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  discount_percent = EXCLUDED.discount_percent,
  category_id = EXCLUDED.category_id,
  brand = EXCLUDED.brand,
  stock_quantity = EXCLUDED.stock_quantity,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  image_url = EXCLUDED.image_url,
  is_featured = EXCLUDED.is_featured,
  is_bestseller = EXCLUDED.is_bestseller,
  is_new = EXCLUDED.is_new,
  tags = EXCLUDED.tags,
  subcategory = 'tissues';

-- Product detail gallery images
UPDATE products
SET images = ARRAY[
  'https://images.pexels.com/photos/6620096/pexels-photo-6620096.jpeg',
  'https://images.pexels.com/photos/6620095/pexels-photo-6620095.jpeg'
]
WHERE slug = 'tissue-paper-rolls-30pk';

UPDATE products
SET images = ARRAY[
  'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg',
  'https://images.pexels.com/photos/5591808/pexels-photo-5591808.jpeg'
]
WHERE slug = 'facial-tissue-box-48pc';

UPDATE products
SET images = ARRAY[
  'https://images.pexels.com/photos/3267540/pexels-photo-3267540.jpeg',
  'https://images.pexels.com/photos/4398873/pexels-photo-4398873.jpeg'
]
WHERE slug = 'napkins-paper-200ct';

UPDATE products
SET images = ARRAY[
  'https://images.pexels.com/photos/6627544/pexels-photo-6627544.jpeg',
  'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'
]
WHERE slug = 'wet-wipes-80pc';

-- Ensure any existing tissue-tagged products use the tissues subcategory
UPDATE products
SET subcategory = 'tissues'
WHERE category_id = (SELECT id FROM categories WHERE slug = 'home-kitchen')
  AND (
    slug IN (
      'tissue-paper-rolls-30pk',
      'facial-tissue-box-48pc',
      'napkins-paper-200ct',
      'wet-wipes-80pc'
    )
    OR tags && ARRAY['tissue', 'napkin', 'wipes']::text[]
  )
  AND (subcategory IS NULL OR subcategory <> 'tissues');
