-- Seed additional trending fashion and electronics products
-- Includes 10 new fashion items and 10 new electronics items for carousel display.

-- Fashion Products (clothes, ladies dresses, and trending outfits)
INSERT INTO products (name, slug, description, price, original_price, discount_percent, category_id, brand, stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new, prime_eligible, tags)
SELECT
  p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
  c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags
FROM (VALUES
  ('Wrap Midi Dress', 'wrap-midi-dress', 'Silky wrap midi dress with ruffle hem and adjustable tie.', 69.99, 99.99, 30, 'LunaLane', 120, 4.7, 1023, 'https://images.pexels.com/photos/335676/pexels-photo-335676.jpeg', true, true, true, ARRAY['dress','women','midi']),
  ('Silk Maxi Dress', 'silk-maxi-dress', 'Lightweight silk maxi dress with flattering V-neck and side slit.', 129.99, 169.99, 24, 'VelvetRose', 90, 4.8, 940, 'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg', true, true, true, ARRAY['dress','women','maxi']),
  ('Denim Jacket Classic', 'denim-jacket-classic', 'Classic blue denim jacket with pocket detailing and button front.', 79.99, 109.99, 27, 'IndigoEdge', 180, 4.5, 680, 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg', false, true, false, ARRAY['jacket','denim','women']),
  ('Pleated Midi Skirt', 'pleated-midi-skirt', 'Elegant pleated midi skirt in soft blush with high waist fit.', 54.99, 74.99, 26, 'GraceLane', 150, 4.6, 812, 'https://images.pexels.com/photos/1082524/pexels-photo-1082524.jpeg', false, true, false, ARRAY['skirt','fashion','women']),
  ('Linen Tunic Dress', 'linen-tunic-dress', 'Relaxed linen tunic dress with side pockets for breezy summer styling.', 59.99, 79.99, 25, 'CoastalCharm', 210, 4.4, 523, 'https://images.pexels.com/photos/3889731/pexels-photo-3889731.jpeg', false, true, true, ARRAY['dress','linen','women']),
  ('Tailored Blazer', 'tailored-blazer', 'Structured blazer with slim fit and soft shoulder padding.', 109.99, 149.99, 27, 'OfficeAura', 95, 4.7, 734, 'https://images.pexels.com/photos/6311692/pexels-photo-6311692.jpeg', false, true, false, ARRAY['blazer','women','workwear']),
  ('Cotton Wide Leg Pants', 'cotton-wide-leg-pants', 'High-rise wide leg pants made from breathable pure cotton.', 49.99, 69.99, 28, 'PureThread', 170, 4.5, 606, 'https://images.pexels.com/photos/5864152/pexels-photo-5864152.jpeg', false, true, false, ARRAY['pants','women','casual']),
  ('Velvet Evening Gown', 'velvet-evening-gown', 'Luxurious velvet evening gown with sweetheart neckline and fitted waist.', 179.99, 249.99, 28, 'NoirLuxe', 60, 4.9, 424, 'https://images.pexels.com/photos/5341188/pexels-photo-5341188.jpeg', true, true, true, ARRAY['gown','evening','women']),
  ('Crochet Beach Coverup', 'crochet-beach-coverup', 'Boho crochet beach coverup with fringe hem for resort styling.', 39.99, 59.99, 33, 'SunSea', 240, 4.6, 398, 'https://images.pexels.com/photos/14358840/pexels-photo-14358840.jpeg', false, false, true, ARRAY['coverup','beachwear','women']),
  ('Cashmere Sweater', 'cashmere-sweater', 'Ultra-soft crewneck cashmere sweater in neutral beige.', 99.99, 129.99, 23, 'PureWool', 130, 4.8, 586, 'https://images.pexels.com/photos/4046313/pexels-photo-4046313.jpeg', false, true, false, ARRAY['sweater','women','luxury'])
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags)
JOIN categories c ON c.slug = 'fashion'
ON CONFLICT (slug) DO NOTHING;

-- Electronics Products (iPhones and laptops)
INSERT INTO products (name, slug, description, price, original_price, discount_percent, category_id, brand, stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new, prime_eligible, tags)
SELECT
  p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
  c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags
FROM (VALUES
  ('iPhone 15', 'iphone-15', '6.1-inch display, A17 chip, improved battery life, and advanced camera.', 999.00, 1099.00, 9, 'Apple', 220, 4.8, 5100, 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', true, true, true, ARRAY['iphone','apple','smartphone']),
  ('iPhone 15 Plus', 'iphone-15-plus', 'Large display variant with all iPhone 15 features and exceptional battery life.', 1099.00, 1199.00, 8, 'Apple', 190, 4.7, 4200, 'https://images.pexels.com/photos/1181245/pexels-photo-1181245.jpeg', true, false, true, ARRAY['iphone','apple','plus']),
  ('iPhone SE 2024', 'iphone-se-2024', 'Compact iPhone with A16 chip and professional camera features.', 429.00, 499.00, 14, 'Apple', 260, 4.6, 3120, 'https://images.pexels.com/photos/7377784/pexels-photo-7377784.jpeg', false, true, false, ARRAY['iphone','apple','se']),
  ('iPhone 14 Pro', 'iphone-14-pro', 'Powerful 14 Pro with ProMotion display and triple-lens camera.', 899.00, 999.00, 10, 'Apple', 140, 4.7, 4100, 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg', false, true, true, ARRAY['iphone','apple','pro']),
  ('iPhone 14 Plus', 'iphone-14-plus', 'Large-screen iPhone 14 Plus with great battery and camera quality.', 799.00, 899.00, 11, 'Apple', 160, 4.6, 2850, 'https://images.pexels.com/photos/607745/pexels-photo-607745.jpeg', false, false, false, ARRAY['iphone','apple','plus']),
  ('MacBook Pro 14', 'macbook-pro-14', 'Apple M3 chip, 14-inch Liquid Retina XDR display, up to 18 hours battery.', 1999.00, 2199.00, 9, 'Apple', 90, 4.9, 7350, 'https://images.pexels.com/photos/18105/pexels-photo.jpg', true, true, true, ARRAY['laptop','apple','macbook']),
  ('Lenovo Yoga 9i', 'lenovo-yoga-9i', '2-in-1 convertible laptop with Intel Evo performance and premium display.', 1399.00, 1599.00, 13, 'Lenovo', 105, 4.7, 2690, 'https://images.pexels.com/photos/277570/pexels-photo-277570.jpeg', false, true, false, ARRAY['laptop','lenovo','yoga']),
  ('HP Spectre x360', 'hp-spectre-x360', 'Convertible touchscreen laptop with sleek design and long battery life.', 1299.00, 1499.00, 13, 'HP', 115, 4.6, 2375, 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg', false, true, false, ARRAY['laptop','hp','spectre']),
  ('Surface Laptop 5', 'surface-laptop-5', 'Microsoft Surface Laptop 5 with Intel Evo platform and pixel-perfect touchscreen.', 1199.00, 1399.00, 14, 'Microsoft', 98, 4.7, 1984, 'https://images.pexels.com/photos/5473952/pexels-photo-5473952.jpeg', false, true, false, ARRAY['laptop','microsoft','surface']),
  ('ASUS ROG Zephyrus', 'asus-rog-zephyrus', 'High-performance gaming laptop with RTX graphics and ultra-fast display.', 1799.00, 1999.00, 10, 'ASUS', 72, 4.8, 3075, 'https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg', false, true, true, ARRAY['laptop','asus','gaming'])
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags)
JOIN categories c ON c.slug = 'electronics'
ON CONFLICT (slug) DO NOTHING;
