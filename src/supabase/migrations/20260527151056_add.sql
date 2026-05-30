
/*
  # Add Chat Messages Table and Seed E-Commerce Data

  1. New Tables
    - chat_messages - AI chatbot conversation history with session_id, role, content

  2. Seed Data
    - 6 categories: Electronics, Fashion, Home & Kitchen, Beauty & Personal Care, Health & Wellness, Gaming
    - 30+ products across categories with Pexels image URLs, ratings, prices

  3. Notes
    - cart_items uses user_id (existing schema), we'll adapt the frontend
    - Products use existing schema columns
*/

-- Chat Messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chat messages readable"
  ON chat_messages FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Chat messages insertable"
  ON chat_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id);

-- Seed Categories (only 6 allowed categories, no Automotive/Books/Sports/Toys)
INSERT INTO categories (name, slug, description, image_url, icon, sort_order)
VALUES
  ('Electronics', 'electronics', 'Latest gadgets and tech devices', 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg', 'Zap', 1),
  ('Fashion', 'fashion', 'Trending clothing and accessories', 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg', 'Shirt', 2),
  ('Home & Kitchen', 'home-kitchen', 'Everything for your home', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', 'Home', 3),
  ('Beauty & Care', 'beauty-care', 'Skincare, makeup and personal care', 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', 'Sparkles', 4),
  ('Health & Wellness', 'health-wellness', 'Fitness and wellness products', 'https://images.pexels.com/photos/4498158/pexels-photo-4498158.jpeg', 'Heart', 5),
  ('Gaming', 'gaming', 'Consoles, games and accessories', 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg', 'Gamepad2', 6)
ON CONFLICT (slug) DO NOTHING;

-- Seed Products - Electronics
INSERT INTO products (name, slug, description, price, original_price, discount_percent, category_id, brand, stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new, prime_eligible, tags)
SELECT
  p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
  c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags
FROM (VALUES
  ('Sony WH-1000XM5 Headphones', 'sony-wh-1000xm5', 'Industry-leading noise canceling with Speak-to-Chat technology', 279.99, 349.99, 20, 'Sony', 150, 4.8, 3421, 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', true, true, false, ARRAY['headphones','wireless','noise-canceling']),
  ('Apple MacBook Air M2', 'apple-macbook-air-m2', '13.6-inch Liquid Retina display, M2 chip, 8GB RAM, 256GB SSD', 1099.00, 1199.00, 8, 'Apple', 80, 4.9, 5621, 'https://images.pexels.com/photos/18105/pexels-photo.jpg', true, true, false, ARRAY['laptop','apple','m2']),
  ('Samsung 4K Smart TV 55"', 'samsung-4k-tv-55', 'Crystal UHD 4K Smart TV with HDR and built-in Alexa', 499.99, 699.99, 29, 'Samsung', 60, 4.6, 2341, 'https://images.pexels.com/photos/6585760/pexels-photo-6585760.jpeg', true, false, false, ARRAY['tv','4k','smart']),
  ('iPhone 15 Pro Max', 'iphone-15-pro-max', 'A17 Pro chip, 48MP camera system, titanium design', 1199.00, 1199.00, 0, 'Apple', 200, 4.7, 8921, 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', true, true, true, ARRAY['iphone','smartphone','apple']),
  ('Wireless Earbuds Pro', 'wireless-earbuds-pro', 'Active noise cancellation, 30hr battery, IPX4 waterproof', 79.99, 129.99, 38, 'TechAudio', 300, 4.5, 1823, 'https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg', false, true, false, ARRAY['earbuds','wireless','airtight']),
  ('4K Drone Camera', 'drone-4k-camera', 'GPS auto-return, 30-min flight time, 4K stabilized video', 349.99, 449.99, 22, 'DJI', 45, 4.7, 934, 'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg', false, false, true, ARRAY['drone','camera','4k'])
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags)
JOIN categories c ON c.slug = 'electronics'
ON CONFLICT (slug) DO NOTHING;

-- Seed Products - Fashion
INSERT INTO products (name, slug, description, price, original_price, discount_percent, category_id, brand, stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new, prime_eligible, tags)
SELECT
  p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
  c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags
FROM (VALUES
  ('Classic Leather Jacket', 'classic-leather-jacket', 'Genuine leather biker jacket, slim fit, multiple colors', 189.99, 259.99, 27, 'UrbanStyle', 120, 4.6, 892, 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg', true, false, false, ARRAY['jacket','leather','fashion']),
  ('Premium Denim Jeans', 'premium-denim-jeans', 'Stretch denim, tapered fit, sustainable cotton blend', 69.99, 99.99, 30, 'DenimCo', 250, 4.4, 1432, 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg', false, true, false, ARRAY['jeans','denim','casual']),
  ('Floral Summer Dress', 'floral-summer-dress', 'Light chiffon fabric, floral print, perfect for summer', 49.99, 79.99, 37, 'Bloom', 180, 4.7, 2103, 'https://images.pexels.com/photos/291759/pexels-photo-291759.jpeg', true, true, true, ARRAY['dress','summer','floral']),
  ('Running Sneakers Ultra', 'running-sneakers-ultra', 'Lightweight mesh upper, responsive cushioning, breathable', 119.99, 159.99, 25, 'SwiftRun', 200, 4.8, 3201, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', true, true, false, ARRAY['sneakers','running','sport']),
  ('Designer Handbag', 'designer-handbag', 'Genuine leather, gold hardware, spacious interior', 229.99, 299.99, 23, 'LuxeCarry', 60, 4.9, 567, 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', false, false, true, ARRAY['handbag','leather','luxury']),
  ('Slim Fit Dress Shirt', 'slim-fit-dress-shirt', '100% cotton, wrinkle-resistant, available in 12 colors', 45.99, 65.99, 30, 'FormalEdge', 350, 4.5, 1876, 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg', false, true, false, ARRAY['shirt','formal','slim-fit'])
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags)
JOIN categories c ON c.slug = 'fashion'
ON CONFLICT (slug) DO NOTHING;

-- Seed Products - Home & Kitchen
INSERT INTO products (name, slug, description, price, original_price, discount_percent, category_id, brand, stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new, prime_eligible, tags)
SELECT
  p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
  c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags
FROM (VALUES
  ('Smart Coffee Maker', 'smart-coffee-maker', 'WiFi connected, programmable, 12-cup carafe, built-in grinder', 129.99, 179.99, 28, 'BrewMaster', 140, 4.6, 2341, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg', true, true, false, ARRAY['coffee','kitchen','smart']),
  ('Air Purifier HEPA', 'air-purifier-hepa', 'True HEPA filter, covers 500 sqft, quiet operation, smart sensor', 199.99, 279.99, 29, 'CleanAir', 90, 4.7, 1823, 'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg', false, true, false, ARRAY['air purifier','home','health']),
  ('Ceramic Cookware Set', 'ceramic-cookware-set', '10-piece non-stick ceramic set, dishwasher safe, even heating', 149.99, 229.99, 35, 'ChefElite', 75, 4.8, 934, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', true, false, false, ARRAY['cookware','kitchen','ceramic']),
  ('Robot Vacuum Cleaner', 'robot-vacuum-cleaner', 'Smart mapping, auto-empty base, works on all floor types', 299.99, 399.99, 25, 'CleanBot', 55, 4.6, 2103, 'https://images.pexels.com/photos/3935362/pexels-photo-3935362.jpeg', true, true, true, ARRAY['vacuum','robot','smart']),
  ('Scented Candle Set', 'scented-candle-set', 'Set of 6 premium soy wax candles, 40+ hour burn time each', 39.99, 59.99, 33, 'AromaHome', 300, 4.9, 4521, 'https://images.pexels.com/photos/1662298/pexels-photo-1662298.jpeg', false, true, false, ARRAY['candles','home decor','scented']),
  ('Bamboo Cutting Board Set', 'bamboo-cutting-board-set', 'Set of 3 eco-friendly bamboo boards with juice grooves', 29.99, 44.99, 33, 'EcoCook', 200, 4.7, 3201, 'https://images.pexels.com/photos/4397899/pexels-photo-4397899.jpeg', false, false, false, ARRAY['cutting board','kitchen','bamboo'])
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags)
JOIN categories c ON c.slug = 'home-kitchen'
ON CONFLICT (slug) DO NOTHING;

-- Seed Products - Beauty & Care
INSERT INTO products (name, slug, description, price, original_price, discount_percent, category_id, brand, stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new, prime_eligible, tags)
SELECT
  p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
  c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags
FROM (VALUES
  ('Vitamin C Serum', 'vitamin-c-serum', '20% Vitamin C + Hyaluronic Acid, brightening and anti-aging', 34.99, 49.99, 30, 'GlowLab', 500, 4.8, 8932, 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg', true, true, false, ARRAY['serum','skincare','vitamin-c']),
  ('Electric Face Cleanser', 'electric-face-cleanser', 'Sonic vibration, 3 speed modes, waterproof, USB charging', 59.99, 89.99, 33, 'PureSkin', 180, 4.6, 2341, 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg', false, true, false, ARRAY['cleanser','electric','skincare']),
  ('Luxury Perfume Collection', 'luxury-perfume-collection', 'Set of 5 mini fragrances, 15ml each, travel-friendly', 89.99, 129.99, 31, 'ScentLux', 120, 4.9, 1234, 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg', true, false, true, ARRAY['perfume','fragrance','luxury']),
  ('Hair Care Pro Set', 'hair-care-pro-set', 'Shampoo + Conditioner + Hair mask trio for damaged hair', 44.99, 64.99, 31, 'HairRevive', 250, 4.7, 3456, 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg', false, true, false, ARRAY['hair care','shampoo','conditioner'])
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags)
JOIN categories c ON c.slug = 'beauty-care'
ON CONFLICT (slug) DO NOTHING;

-- Seed Products - Health & Wellness
INSERT INTO products (name, slug, description, price, original_price, discount_percent, category_id, brand, stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new, prime_eligible, tags)
SELECT
  p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
  c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags
FROM (VALUES
  ('Smart Fitness Watch', 'smart-fitness-watch', 'Heart rate, SpO2, GPS, 7-day battery, water resistant 5ATM', 199.99, 279.99, 29, 'FitTrack', 300, 4.7, 5678, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg', true, true, false, ARRAY['smartwatch','fitness','health']),
  ('Yoga Mat Premium', 'yoga-mat-premium', 'Non-slip, eco-friendly TPE, 6mm thick, includes carry strap', 49.99, 69.99, 29, 'ZenFlow', 400, 4.8, 4321, 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg', false, true, false, ARRAY['yoga','mat','fitness']),
  ('Resistance Bands Set', 'resistance-bands-set', 'Set of 5 resistance levels, fabric bands with handles', 24.99, 39.99, 37, 'FlexFit', 600, 4.6, 7890, 'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg', false, true, true, ARRAY['resistance bands','workout','gym']),
  ('Protein Powder Blend', 'protein-powder-blend', '25g protein per serving, all natural flavors, 2lb container', 54.99, 74.99, 27, 'NutriPro', 200, 4.5, 2345, 'https://images.pexels.com/photos/3912944/pexels-photo-3912944.jpeg', true, false, false, ARRAY['protein','nutrition','fitness'])
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags)
JOIN categories c ON c.slug = 'health-wellness'
ON CONFLICT (slug) DO NOTHING;

-- Seed Products - Gaming
INSERT INTO products (name, slug, description, price, original_price, discount_percent, category_id, brand, stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new, prime_eligible, tags)
SELECT
  p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
  c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags
FROM (VALUES
  ('Gaming Mechanical Keyboard', 'gaming-mechanical-keyboard', 'RGB backlit, tactile switches, anti-ghosting, USB-C', 89.99, 129.99, 31, 'GameForce', 200, 4.8, 3456, 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg', true, true, false, ARRAY['keyboard','gaming','mechanical']),
  ('Gaming Mouse Pro', 'gaming-mouse-pro', '25600 DPI, 11 programmable buttons, wireless 70hr battery', 69.99, 99.99, 30, 'GameForce', 300, 4.7, 5678, 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg', false, true, false, ARRAY['mouse','gaming','wireless']),
  ('Gaming Headset 7.1', 'gaming-headset-71', '7.1 surround sound, noise-canceling mic, 50mm drivers', 79.99, 119.99, 33, 'SoundArena', 150, 4.6, 2341, 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg', false, false, true, ARRAY['headset','gaming','surround']),
  ('4K Gaming Monitor', '4k-gaming-monitor', '27-inch IPS, 144Hz, 1ms response, HDR400, FreeSync', 399.99, 549.99, 27, 'VisonPro', 80, 4.9, 1234, 'https://images.pexels.com/photos/1714205/pexels-photo-1714205.jpeg', true, true, true, ARRAY['monitor','4k','gaming'])
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags)
JOIN categories c ON c.slug = 'gaming'
ON CONFLICT (slug) DO NOTHING;
