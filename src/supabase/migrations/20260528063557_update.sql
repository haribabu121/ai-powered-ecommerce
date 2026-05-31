
/*
  # Update Products with Correct Categories and Images

  1. Purpose
    - Ensure each product is correctly categorized
    - Update product images to match their category
    - Electronics: gadgets, phones, laptops, TVs, audio
    - Fashion: clothing, shoes, bags, accessories
    - Home & Kitchen: appliances, cookware, decor
    - Beauty & Care: skincare, makeup, perfumes
    - Health & Wellness: fitness, yoga, supplements
    - Gaming: keyboards, mice, monitors, headsets

  2. Changes
    - Delete all existing products
    - Re-insert products with correct category associations
    - Each category has only relevant products with matching images
*/

-- First, delete all existing products
DELETE FROM products;

-- Electronics Products
INSERT INTO products (name, slug, description, price, original_price, discount_percent, category_id, brand, stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new, prime_eligible, tags)
SELECT
  p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
  c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags
FROM (VALUES
  -- Smartphones & Tablets
  ('iPhone 15 Pro Max', 'iphone-15-pro-max', 'A17 Pro chip, 48MP camera system, titanium design, 6.7-inch display', 1199.00, 1199.00, 0, 'Apple', 200, 4.8, 8921, 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', true, true, true, ARRAY['iphone','smartphone','apple']),
  ('Samsung Galaxy S24 Ultra', 'samsung-galaxy-s24-ultra', 'Snapdragon 8 Gen 3, 200MP camera, S Pen included, AI features', 1299.00, 1399.00, 7, 'Samsung', 150, 4.7, 5621, 'https://images.pexels.com/photos/607745/pexels-photo-607745.jpeg', true, true, true, ARRAY['samsung','smartphone','android']),
  ('iPad Pro 12.9"', 'ipad-pro-12-9', 'M2 chip, Liquid Retina XDR, 256GB Storage, Wi-Fi + Cellular', 1099.00, 1199.00, 8, 'Apple', 80, 4.9, 4123, 'https://images.pexels.com/photos/133459/pexels-photo-133459.jpeg', true, false, true, ARRAY['ipad','tablet','apple']),
  
  -- Laptops
  ('Apple MacBook Air M2', 'apple-macbook-air-m2', '13.6-inch Liquid Retina display, M2 chip, 8GB RAM, 256GB SSD', 1099.00, 1199.00, 8, 'Apple', 80, 4.9, 5621, 'https://images.pexels.com/photos/18105/pexels-photo.jpg', true, true, false, ARRAY['laptop','apple','m2']),
  ('Dell XPS 15 Laptop', 'dell-xps-15-laptop', 'Intel i7, 16GB RAM, 512GB SSD, 15.6-inch 4K OLED display', 1499.00, 1799.00, 17, 'Dell', 60, 4.7, 2345, 'https://images.pexels.com/photos/205349/pexels-photo-205349.jpeg', false, true, false, ARRAY['laptop','dell','work']),
  
  -- Audio
  ('Sony WH-1000XM5 Headphones', 'sony-wh-1000xm5', 'Industry-leading noise canceling with Speak-to-Chat technology', 279.99, 349.99, 20, 'Sony', 150, 4.8, 3421, 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', true, true, false, ARRAY['headphones','wireless','noise-canceling']),
  ('AirPods Pro 2nd Gen', 'airpods-pro-2nd-gen', 'Active Noise Cancellation, spatial audio, MagSafe charging', 249.00, 249.00, 0, 'Apple', 250, 4.8, 6782, 'https://images.pexels.com/photos/3789885/pexels-photo-3789885.jpeg', true, true, true, ARRAY['earbuds','airpods','apple']),
  ('JBL Flip 6 Speaker', 'jbl-flip-6-speaker', 'Portable Bluetooth speaker, waterproof, 12hr battery', 99.99, 129.99, 23, 'JBL', 180, 4.6, 2134, 'https://images.pexels.com/photos/1279120/pexels-photo-1279120.jpeg', false, true, false, ARRAY['speaker','bluetooth','portable']),
  
  -- TVs
  ('Samsung 4K Smart TV 55"', 'samsung-4k-tv-55', 'Crystal UHD 4K Smart TV with HDR and built-in Alexa', 499.99, 699.99, 29, 'Samsung', 60, 4.6, 2341, 'https://images.pexels.com/photos/6585760/pexels-photo-6585760.jpeg', true, true, false, ARRAY['tv','4k','smart']),
  ('LG OLED 65" TV', 'lg-oled-65-tv', 'OLED evo technology, 4K 120Hz, Dolby Vision IQ', 1599.00, 1999.00, 20, 'LG', 40, 4.9, 1876, 'https://images.pexels.com/photos/7933957/pexels-photo-7933957.jpeg', true, false, true, ARRAY['tv','oled','4k']),
  
  -- Cameras & Drones
  ('4K Drone Camera', 'drone-4k-camera', 'GPS auto-return, 30-min flight time, 4K stabilized video', 349.99, 449.99, 22, 'DJI', 45, 4.7, 934, 'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg', false, true, true, ARRAY['drone','camera','4k']),
  ('Canon EOS R6 Camera', 'canon-eos-r6', 'Full-frame mirrorless, 20.1MP, 4K 60fps video', 1999.00, 2499.00, 20, 'Canon', 25, 4.8, 1234, 'https://images.pexels.com/photos/171439/pexels-photo-171439.jpeg', false, false, false, ARRAY['camera','mirrorless','canon'])
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags)
JOIN categories c ON c.slug = 'electronics'
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
  is_new = EXCLUDED.is_new;

-- Fashion Products
INSERT INTO products (name, slug, description, price, original_price, discount_percent, category_id, brand, stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new, prime_eligible, tags)
SELECT
  p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
  c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags
FROM (VALUES
  -- Women's Tops
  ('Floral Summer Dress', 'floral-summer-dress', 'Light chiffon fabric, floral print, perfect for summer days', 49.99, 79.99, 37, 'Bloom', 180, 4.7, 2103, 'https://images.pexels.com/photos/291759/pexels-photo-291759.jpeg', true, true, true, ARRAY['women-dress','summer','floral']),
  ('Slim Fit Dress Shirt', 'slim-fit-dress-shirt', '100% cotton, wrinkle-resistant, available in 12 colors', 45.99, 65.99, 30, 'FormalEdge', 350, 4.5, 1876, 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg', false, true, false, ARRAY['women-shirt','formal','slim-fit']),
  ('Casual Linen Shirt', 'casual-linen-shirt', 'Breathable linen blend, relaxed fit, summer essential', 54.99, 74.99, 27, 'BeachBum', 280, 4.4, 987, 'https://images.pexels.com/photos/2831430/pexels-photo-2831430.jpeg', false, false, true, ARRAY['women-shirt','linen','casual']),
  ('Casual Blouse Pink', 'casual-blouse-pink', 'Soft pink blouse, perfect for casual or office wear', 39.99, 59.99, 33, 'StyleWear', 200, 4.6, 1456, 'https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg', false, true, false, ARRAY['women-blouse','pink','casual']),
  ('Formal Vest Dress', 'formal-vest-dress', 'Elegant vest dress, perfect for professional settings', 79.99, 119.99, 33, 'EliteFashion', 120, 4.8, 892, 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', false, true, false, ARRAY['women-dress','formal','business']),
  
  -- Women's Shoes
  ('Running Sneakers Ultra', 'running-sneakers-ultra', 'Lightweight mesh upper, responsive cushioning, breathable design', 119.99, 159.99, 25, 'SwiftRun', 200, 4.8, 3201, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', true, true, false, ARRAY['women-sneaker','running','sport']),
  ('Classic White Sneakers', 'classic-white-sneakers', 'Minimalist design, leather upper, versatile styling', 79.99, 109.99, 27, 'CleanStep', 220, 4.7, 2456, 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg', false, true, true, ARRAY['women-sneaker','white','casual']),
  ('Leather Ankle Boots', 'leather-ankle-boots', 'Genuine leather, cushioned insole, durable rubber sole', 149.99, 199.99, 25, 'BootCraft', 80, 4.8, 567, 'https://images.pexels.com/photos/2632779/pexels-photo-2632779.jpeg', false, false, false, ARRAY['women-boot','leather','ankle']),
  ('Heeled Pumps Black', 'heeled-pumps-black', 'Classic black heels, comfortable for all-day wear', 89.99, 129.99, 31, 'ElegantShoe', 150, 4.7, 1234, 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg', false, true, false, ARRAY['women-shoe','heels','black']),
  ('Casual Loafers Beige', 'casual-loafers-beige', 'Comfortable beige loafers for casual outings', 69.99, 99.99, 30, 'ComfortWalk', 180, 4.5, 987, 'https://images.pexels.com/photos/1926771/pexels-photo-1926771.jpeg', false, false, true, ARRAY['women-shoe','loafer','beige']),
  
  -- Women's Bags
  ('Designer Handbag', 'designer-handbag', 'Genuine leather, gold hardware, spacious interior', 229.99, 299.99, 23, 'LuxeCarry', 60, 4.9, 567, 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', true, false, true, ARRAY['women-handbag','leather','luxury']),
  ('Crossbody Bag', 'crossbody-bag', 'Compact design, adjustable strap, multiple pockets', 59.99, 89.99, 33, 'UrbanCarry', 150, 4.5, 1789, 'https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg', false, true, false, ARRAY['women-crossbody','compact','canvas']),
  ('Leather Tote Bag', 'leather-tote-bag', 'Spacious leather tote, perfect for work or shopping', 129.99, 179.99, 28, 'CarryStyle', 100, 4.8, 1234, 'https://images.pexels.com/photos/1440404/pexels-photo-1440404.jpeg', false, true, false, ARRAY['women-bag','tote','leather']),
  ('Canvas Backpack', 'canvas-backpack', 'Durable canvas backpack, comfortable straps', 59.99, 89.99, 33, 'BackpackPro', 200, 4.6, 1567, 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg', false, false, true, ARRAY['women-bag','backpack','canvas']),
  
  -- Men's Clothing
  ('Formal Dress Shirt Navy', 'formal-dress-shirt-navy', 'Premium cotton, navy blue, wrinkle-free, perfect for office', 79.99, 119.99, 33, 'MensStyle', 180, 4.7, 2341, 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', true, true, false, ARRAY['men-shirt','formal','navy']),
  ('Casual Oxford Shirt', 'casual-oxford-shirt', 'Comfortable oxford cloth, multiple colors, relaxed fit', 59.99, 89.99, 33, 'UrbanMen', 200, 4.6, 1876, 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg', false, true, false, ARRAY['men-shirt','casual','oxford']),
  ('Cotton Polo Shirt', 'cotton-polo-shirt', 'Classic polo, 100% cotton, breathable, various colors', 44.99, 69.99, 36, 'ClassicPolo', 250, 4.5, 1234, 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg', false, true, true, ARRAY['men-shirt','polo','casual']),
  ('Slim Fit Blazer', 'slim-fit-blazer', 'Professional blazer, single-breasted, tailored fit', 189.99, 269.99, 30, 'ElegantMen', 120, 4.8, 892, 'https://images.pexels.com/photos/3622620/pexels-photo-3622620.jpeg', true, false, false, ARRAY['men-formal','blazer','dress']),
  ('Casual Henley Shirt', 'casual-henley-shirt', 'Layered henley, comfortable fit, long sleeves', 34.99, 54.99, 36, 'CasualMen', 300, 4.4, 765, 'https://images.pexels.com/photos/3621265/pexels-photo-3621265.jpeg', false, false, false, ARRAY['men-shirt','henley','casual'])
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags)
JOIN categories c ON c.slug = 'fashion'
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
  is_new = EXCLUDED.is_new;

-- Home & Kitchen Products
INSERT INTO products (name, slug, description, price, original_price, discount_percent, category_id, brand, stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new, prime_eligible, tags)
SELECT
  p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
  c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags
FROM (VALUES
  -- Kitchen Appliances
  ('Smart Coffee Maker', 'smart-coffee-maker', 'WiFi connected, programmable, 12-cup carafe, built-in grinder', 129.99, 179.99, 28, 'BrewMaster', 140, 4.6, 2341, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg', true, true, false, ARRAY['coffee','kitchen','smart']),
  ('Air Fryer Digital', 'air-fryer-digital', '5.5L capacity, 8 presets, shake reminder, dishwasher safe', 119.99, 169.99, 29, 'CrispChef', 120, 4.7, 3456, 'https://images.pexels.com/photos/5554628/pexels-photo-5554628.jpeg', true, true, true, ARRAY['air fryer','kitchen','appliance']),
  ('Blender Pro 1200W', 'blender-pro-1200w', 'Professional grade, 64oz jar, crushes ice, smoothie maker', 89.99, 129.99, 31, 'BlendTech', 180, 4.5, 1876, 'https://images.pexels.com/photos/3764150/pexels-photo-3764150.jpeg', false, true, false, ARRAY['blender','kitchen','appliance']),
  
  -- Cookware
  ('Ceramic Cookware Set', 'ceramic-cookware-set', '10-piece non-stick ceramic set, dishwasher safe, even heating', 149.99, 229.99, 35, 'ChefElite', 75, 4.8, 934, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', true, true, false, ARRAY['cookware','kitchen','ceramic']),
  ('Cast Iron Skillet 12"', 'cast-iron-skillet-12', 'Pre-seasoned, versatile cooking, excellent heat retention', 34.99, 49.99, 30, 'IronChef', 200, 4.9, 2567, 'https://images.pexels.com/photos/6763667/pexels-photo-6763667.jpeg', false, true, false, ARRAY['skillet','cast iron','kitchen']),
  ('Bamboo Cutting Board Set', 'bamboo-cutting-board-set', 'Set of 3 eco-friendly bamboo boards with juice grooves', 29.99, 44.99, 33, 'EcoCook', 200, 4.7, 3201, 'https://images.pexels.com/photos/4397899/pexels-photo-4397899.jpeg', false, false, false, ARRAY['cutting board','kitchen','bamboo']),
  
  -- Home Appliances
  ('Robot Vacuum Cleaner', 'robot-vacuum-cleaner', 'Smart mapping, auto-empty base, works on all floor types', 299.99, 399.99, 25, 'CleanBot', 55, 4.6, 2103, 'https://images.pexels.com/photos/3935362/pexels-photo-3935362.jpeg', true, true, true, ARRAY['vacuum','robot','smart']),
  ('Air Purifier HEPA', 'air-purifier-hepa', 'True HEPA filter, covers 500 sqft, quiet operation, smart sensor', 199.99, 279.99, 29, 'CleanAir', 90, 4.7, 1823, 'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg', false, true, false, ARRAY['air purifier','home','health']),
  ('Dehumidifier 50Pint', 'dehumidifier-50pint', 'Energy star certified, digital humidistat, auto shut-off', 179.99, 239.99, 25, 'DryAir', 70, 4.5, 892, 'https://images.pexels.com/photos/4239034/pexels-photo-4239034.jpeg', false, false, false, ARRAY['dehumidifier','home','appliance']),
  
  -- Home Decor
  ('Scented Candle Set', 'scented-candle-set', 'Set of 6 premium soy wax candles, 40+ hour burn time each', 39.99, 59.99, 33, 'AromaHome', 300, 4.9, 4521, 'https://images.pexels.com/photos/1662298/pexels-photo-1662298.jpeg', false, true, false, ARRAY['candles','home decor','scented']),
  ('Indoor Plant Set', 'indoor-plant-set', '3 low-maintenance plants in decorative ceramic pots', 59.99, 89.99, 33, 'GreenLife', 150, 4.6, 1789, 'https://images.pexels.com/photos/1086182/pexels-photo-1086182.jpeg', false, false, true, ARRAY['plants','home decor','indoor']),
  ('Throw Blanket Soft', 'throw-blanket-soft', 'Ultra-soft microfiber, machine washable, multiple colors', 34.99, 49.99, 30, 'CozyHome', 280, 4.7, 2134, 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg', false, true, false, ARRAY['blanket','home','cozy']),
  
  -- Toilets & Bathroom Fixtures
  ('Toilet Seat Comfort', 'toilet-seat-comfort', 'Padded toilet seat, soft close, easy installation', 34.99, 54.99, 36, 'BathroomPro', 200, 4.6, 1234, 'https://images.pexels.com/photos/6903435/pexels-photo-6903435.jpeg', false, true, false, ARRAY['toilet','bathroom','seat']),
  ('Bidet Attachment', 'bidet-attachment', 'Self-cleaning nozzles, adjustable water pressure, easy install', 89.99, 129.99, 31, 'FreshBath', 120, 4.8, 892, 'https://images.pexels.com/photos/6903436/pexels-photo-6903436.jpeg', true, true, false, ARRAY['toilet','bathroom','fixture']),
  ('Toilet Brush Holder', 'toilet-brush-holder', 'Stainless steel with brush, corner design, compact', 24.99, 39.99, 37, 'BathStyle', 300, 4.5, 567, 'https://images.pexels.com/photos/6903437/pexels-photo-6903437.jpeg', false, false, true, ARRAY['toilet','bathroom','accessory']),
  
  -- Tissues & Paper Products
  ('Tissue Paper Rolls 30pk', 'tissue-paper-rolls-30pk', 'Ultra soft, 2-ply tissue rolls, hypoallergenic', 24.99, 39.99, 37, 'PaperCare', 400, 4.7, 2341, 'https://images.pexels.com/photos/6620096/pexels-photo-6620096.jpeg', true, true, false, ARRAY['tissue','paper','roll']),
  ('Facial Tissue Box 48pc', 'facial-tissue-box-48pc', 'Aloe vera enriched, 48 boxes, gentle on skin', 19.99, 29.99, 33, 'SoftTouch', 500, 4.6, 1876, 'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg', false, true, true, ARRAY['tissue','paper','box']),
  ('Napkins Paper 200ct', 'napkins-paper-200ct', 'Strong absorbent napkins, eco-friendly, 200 count', 14.99, 22.99, 35, 'GreenNapkin', 450, 4.5, 1234, 'https://images.pexels.com/photos/3267540/pexels-photo-3267540.jpeg', false, false, false, ARRAY['napkin','paper','wipes']),
  ('Wet Wipes 80pc', 'wet-wipes-80pc', 'Alcohol-free, gentle on skin, 80 wipes per pack', 9.99, 14.99, 33, 'CleanWipe', 350, 4.7, 987, 'https://images.pexels.com/photos/6627544/pexels-photo-6627544.jpeg', false, true, false, ARRAY['wipes','tissue','bathroom'])
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags)
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
  is_new = EXCLUDED.is_new;

-- Beauty & Care Products
INSERT INTO products (name, slug, description, price, original_price, discount_percent, category_id, brand, stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new, prime_eligible, tags)
SELECT
  p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
  c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags
FROM (VALUES
  -- Skincare
  ('Vitamin C Serum', 'vitamin-c-serum', '20% Vitamin C + Hyaluronic Acid, brightening and anti-aging', 34.99, 49.99, 30, 'GlowLab', 500, 4.8, 8932, 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg', true, true, false, ARRAY['serum','skincare','vitamin-c']),
  ('Retinol Night Cream', 'retinol-night-cream', 'Anti-aging formula, reduces fine lines, overnight repair', 44.99, 64.99, 31, 'GlowLab', 350, 4.7, 4521, 'https://images.pexels.com/photos/3997454/pexels-photo-3997454.jpeg', false, true, false, ARRAY['cream','skincare','retinol']),
  ('Sunscreen SPF 50', 'sunscreen-spf-50', 'Broad spectrum, non-greasy, water resistant 80 min', 24.99, 34.99, 29, 'SunShield', 450, 4.6, 2341, 'https://images.pexels.com/photos/3755842/pexels-photo-3755842.jpeg', false, true, true, ARRAY['sunscreen','skincare','spf']),
  
  -- Tools & Devices
  ('Electric Face Cleanser', 'electric-face-cleanser', 'Sonic vibration, 3 speed modes, waterproof, USB charging', 59.99, 89.99, 33, 'PureSkin', 180, 4.6, 2341, 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg', false, true, false, ARRAY['cleanser','electric','skincare']),
  ('Facial Steamer Pro', 'facial-steamer-pro', 'Nano-ionic technology, opens pores, 30ml water tank', 39.99, 59.99, 33, 'SpaHome', 120, 4.5, 1789, 'https://images.pexels.com/photos/4397934/pexels-photo-4397934.jpeg', false, false, true, ARRAY['steamer','skincare','spa']),
  ('Hair Dryer Ionic', 'hair-dryer-ionic', 'Professional 1875W, ionic technology, 3 heat 2 speed settings', 49.99, 79.99, 37, 'HairPro', 200, 4.7, 3456, 'https://images.pexels.com/photos/5496322/pexels-photo-5496322.jpeg', true, true, false, ARRAY['hair dryer','beauty','ionic']),
  
  -- Makeup
  ('Luxury Lipstick Set', 'luxury-lipstick-set', 'Set of 6 matte lipsticks, long-lasting, hydrating formula', 49.99, 74.99, 33, 'ColourLux', 280, 4.8, 5678, 'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg', true, false, true, ARRAY['lipstick','makeup','set']),
  ('Foundation Palette', 'foundation-palette', '20 shades, full coverage, buildable formula', 39.99, 54.99, 27, 'FacePerfect', 190, 4.6, 2134, 'https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg', false, true, false, ARRAY['foundation','makeup','palette']),
  
  -- Fragrance
  ('Luxury Perfume Collection', 'luxury-perfume-collection', 'Set of 5 mini fragrances, 15ml each, travel-friendly', 89.99, 129.99, 31, 'ScentLux', 120, 4.9, 1234, 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg', true, false, true, ARRAY['perfume','fragrance','luxury']),
  ('Cologne Gift Set', 'cologne-gift-set', 'Classic masculine scents, 3 x 50ml bottles', 69.99, 99.99, 30, 'ScentLux', 100, 4.7, 1678, 'https://images.pexels.com/photos/2638246/pexels-photo-2638246.jpeg', false, true, false, ARRAY['cologne','fragrance','men']),
  
  -- Hair Care
  ('Hair Care Pro Set', 'hair-care-pro-set', 'Shampoo + Conditioner + Hair mask trio for damaged hair', 44.99, 64.99, 31, 'HairRevive', 250, 4.7, 3456, 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg', false, true, false, ARRAY['hair care','shampoo','conditioner']),
  ('Hair Styling Cream', 'hair-styling-cream', 'Strong hold, matte finish, argan oil infused, no residue', 18.99, 26.99, 30, 'StylePro', 400, 4.5, 1987, 'https://images.pexels.com/photos/4931535/pexels-photo-4931535.jpeg', false, false, false, ARRAY['hair','styling','cream']),
  
  -- Wellness Products
  ('Wellness Tea Set', 'wellness-tea-set', 'Organic herbal tea collection, 6 flavors for daily wellness', 29.99, 44.99, 33, 'WellnessLeaf', 300, 4.7, 2341, 'https://images.pexels.com/photos/3656993/pexels-photo-3656993.jpeg', true, true, false, ARRAY['wellness','tea','organic']),
  ('Bath Bombs Organic', 'bath-bombs-organic', 'Set of 12 essential oil bath bombs, relaxing aromatherapy', 39.99, 59.99, 33, 'SpaRelax', 250, 4.8, 3456, 'https://images.pexels.com/photos/3326226/pexels-photo-3326226.jpeg', true, true, true, ARRAY['wellness','bath','relax']),
  ('Yoga Meditation Set', 'yoga-meditation-set', 'Meditation cushion + yoga mat + wellness guide', 79.99, 119.99, 33, 'MindfulLiving', 150, 4.7, 1876, 'https://images.pexels.com/photos/4056726/pexels-photo-4056726.jpeg', false, true, false, ARRAY['wellness','meditation','yoga']),
  ('Sleep Enhancement Pillow', 'sleep-enhancement-pillow', 'Memory foam pillow, cooling gel, orthopedic support', 89.99, 129.99, 31, 'DreamComfort', 120, 4.9, 2134, 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg', false, true, false, ARRAY['wellness','sleep','pillow']),
  ('Wellness Supplement Pack', 'wellness-supplement-pack', 'Multivitamin + Omega-3 + Probiotic combo pack, 30 servings', 49.99, 74.99, 33, 'HealthBoost', 200, 4.6, 1456, 'https://images.pexels.com/photos/3944388/pexels-photo-3944388.jpeg', true, false, false, ARRAY['wellness','supplement','vitamin'])
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags)
JOIN categories c ON c.slug = 'beauty-care'
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
  is_new = EXCLUDED.is_new;

-- Health & Wellness Products
INSERT INTO products (name, slug, description, price, original_price, discount_percent, category_id, brand, stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new, prime_eligible, tags)
SELECT
  p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
  c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags
FROM (VALUES
  -- Fitness Trackers
  ('Smart Fitness Watch', 'smart-fitness-watch', 'Heart rate, SpO2, GPS, 7-day battery, water resistant 5ATM', 199.99, 279.99, 29, 'FitTrack', 300, 4.7, 5678, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg', true, true, false, ARRAY['smartwatch','fitness','health']),
  ('Fitness Band Pro', 'fitness-band-pro', 'Lightweight, sleep tracking, 14-day battery, 50+ sports modes', 49.99, 79.99, 37, 'FitTrack', 450, 4.5, 3456, 'https://images.pexels.com/photos/4222470/pexels-photo-4222470.jpeg', false, true, true, ARRAY['fitness band','tracker','health']),
  
  -- Yoga & Pilates
  ('Yoga Mat Premium', 'yoga-mat-premium', 'Non-slip, eco-friendly TPE, 6mm thick, includes carry strap', 49.99, 69.99, 29, 'ZenFlow', 400, 4.8, 4321, 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg', true, true, false, ARRAY['yoga','mat','fitness']),
  ('Yoga Block Set', 'yoga-block-set', '2 cork blocks + strap, non-slip, sustainable materials', 29.99, 44.99, 33, 'ZenFlow', 350, 4.6, 2134, 'https://images.pexels.com/photos/4056726/pexels-photo-4056726.jpeg', false, false, false, ARRAY['yoga','block','fitness']),
  
  -- Weights & Strength
  ('Resistance Bands Set', 'resistance-bands-set', 'Set of 5 resistance levels, fabric bands with handles', 24.99, 39.99, 37, 'FlexFit', 600, 4.6, 7890, 'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg', false, true, true, ARRAY['resistance bands','workout','gym']),
  ('Adjustable Dumbbells', 'adjustable-dumbbells', '5 to 52.5 lbs each, quick-change system, space-saving', 299.99, 399.99, 25, 'IronFit', 80, 4.8, 1876, 'https://images.pexels.com/photos/4162489/pexels-photo-4162489.jpeg', true, true, false, ARRAY['dumbbells','weights','gym']),
  ('Kettlebell Set 3pc', 'kettlebell-set-3pc', '5, 10, 15 lb set, vinyl coated, color-coded', 59.99, 89.99, 33, 'IronFit', 120, 4.5, 1234, 'https://images.pexels.com/photos/8411311/pexels-photo-8411311.jpeg', false, true, false, ARRAY['kettlebell','weights','gym']),
  
  -- Cardio
  ('Jump Rope Speed', 'jump-rope-speed', 'Adjustable length, ball bearing handles, foam grips', 14.99, 24.99, 40, 'SpeedFit', 800, 4.7, 6789, 'https://images.pexels.com/photos/4162490/pexels-photo-4162490.jpeg', false, true, true, ARRAY['jump rope','cardio','fitness']),
  
  -- Nutrition & Supplements
  ('Protein Powder Blend', 'protein-powder-blend', '25g protein per serving, all natural flavors, 2lb container', 54.99, 74.99, 27, 'NutriPro', 200, 4.5, 2345, 'https://images.pexels.com/photos/3912944/pexels-photo-3912944.jpeg', true, false, false, ARRAY['protein','nutrition','fitness']),
  ('Pre-Workout Energy', 'pre-workout-energy', 'Natural caffeine, beta-alanine, fruit flavors, 30 servings', 34.99, 49.99, 30, 'NutriPro', 280, 4.6, 1892, 'https://images.pexels.com/photos/3912946/pexels-photo-3912946.jpeg', false, false, true, ARRAY['pre-workout','energy','nutrition']),
  
  -- Recovery
  ('Foam Roller Pro', 'foam-roller-pro', 'High-density EVA foam, 18 inch, trigger point massage', 29.99, 44.99, 33, 'RecoverFit', 350, 4.7, 3210, 'https://images.pexels.com/photos/4162491/pexels-photo-4162491.jpeg', false, true, false, ARRAY['foam roller','recovery','massage']),
  ('Massage Gun Deep', 'massage-gun-deep', '5 speed levels, 6 attachments, quiet motor, long battery', 79.99, 119.99, 33, 'RecoverFit', 120, 4.8, 2341, 'https://images.pexels.com/photos/7254649/pexels-photo-7254649.jpeg', true, false, true, ARRAY['massage gun','recovery','wellness'])
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags)
JOIN categories c ON c.slug = 'health-wellness'
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
  is_new = EXCLUDED.is_new;

-- Gaming Products
INSERT INTO products (name, slug, description, price, original_price, discount_percent, category_id, brand, stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new, prime_eligible, tags)
SELECT
  p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
  c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags
FROM (VALUES
  -- Input Devices
  ('Gaming Mechanical Keyboard', 'gaming-mechanical-keyboard', 'RGB backlit, tactile switches, anti-ghosting, USB-C', 89.99, 129.99, 31, 'GameForce', 200, 4.8, 3456, 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg', true, true, false, ARRAY['keyboard','gaming','mechanical']),
  ('Gaming Mouse Pro', 'gaming-mouse-pro', '25600 DPI, 11 programmable buttons, wireless 70hr battery', 69.99, 99.99, 30, 'GameForce', 300, 4.7, 5678, 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg', false, true, false, ARRAY['mouse','gaming','wireless']),
  ('Gaming Controller Pro', 'gaming-controller-pro', 'Ergonomic design, programmable buttons, multi-platform', 59.99, 89.99, 33, 'GameForce', 250, 4.6, 4521, 'https://images.pexels.com/photos/3945689/pexels-photo-3945689.jpeg', false, true, true, ARRAY['controller','gaming','wireless']),
  
  -- Audio
  ('Gaming Headset 7.1', 'gaming-headset-71', '7.1 surround sound, noise-canceling mic, 50mm drivers', 79.99, 119.99, 33, 'SoundArena', 150, 4.6, 2341, 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg', false, true, false, ARRAY['headset','gaming','surround']),
  ('Gaming Speakers 2.1', 'gaming-speakers-21', 'Subwoofer + 2 satellites, RGB lights, Bluetooth 5.0', 99.99, 149.99, 33, 'SoundArena', 100, 4.5, 1678, 'https://images.pexels.com/photos/214699/pexels-photo-214699.jpeg', false, false, false, ARRAY['speakers','gaming','audio']),
  
  -- Displays
  ('4K Gaming Monitor', '4k-gaming-monitor', '27-inch IPS, 144Hz, 1ms response, HDR400, FreeSync', 399.99, 549.99, 27, 'VisionPro', 80, 4.9, 1234, 'https://images.pexels.com/photos/1714205/pexels-photo-1714205.jpeg', true, true, true, ARRAY['monitor','4k','gaming']),
  ('Curved Gaming Monitor 32"', 'curved-gaming-monitor-32', '32-inch curved, 165Hz, 1440p, G-Sync compatible', 449.99, 599.99, 25, 'VisionPro', 50, 4.8, 987, 'https://images.pexels.com/photos/7713448/pexels-photo-7713448.jpeg', true, false, false, ARRAY['monitor','curved','gaming']),
  
  -- Accessories
  ('Gaming Mouse Pad XL', 'gaming-mouse-pad-xl', 'Extended size, RGB edge lighting, anti-slip base', 34.99, 54.99, 36, 'GameForce', 400, 4.6, 2890, 'https://images.pexels.com/photos/2115258/pexels-photo-2115258.jpeg', false, true, false, ARRAY['mouse pad','gaming','rgb']),
  ('Gaming Desk Mat', 'gaming-desk-mat', 'Full desk coverage, water resistant, stitched edges', 29.99, 49.99, 40, 'GameForce', 350, 4.5, 1567, 'https://images.pexels.com/photos/2714016/pexels-photo-2714016.jpeg', false, false, true, ARRAY['desk mat','gaming','accessory']),
  ('Gaming Headphone Stand', 'gaming-headphone-stand', 'RGB lighting, USB hub, cable management', 39.99, 59.99, 33, 'GameForce', 180, 4.4, 892, 'https://images.pexels.com/photos/7679704/pexels-photo-7679704.jpeg', false, false, false, ARRAY['headphone stand','gaming','rgb']),
  
  -- Consoles
  ('Gaming Console Stand', 'gaming-console-stand', 'Dual console storage, cooling fans, cable management', 49.99, 79.99, 37, 'GameSetup', 150, 4.5, 1234, 'https://images.pexels.com/photos/3945690/pexels-photo-3945690.jpeg', false, false, false, ARRAY['console stand','gaming','storage'])
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags)
JOIN categories c ON c.slug = 'gaming'
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
  is_new = EXCLUDED.is_new;
