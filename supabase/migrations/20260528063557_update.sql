DELETE FROM products;

-- ============================================
-- INSERT CATEGORIES
-- ============================================

INSERT INTO categories
(name, slug, description, image_url, icon, sort_order)
VALUES
('Electronics', 'electronics', 'Latest gadgets and tech devices',
'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg', 'Zap', 1),

('Fashion', 'fashion', 'Trending clothing and accessories',
'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg', 'Shirt', 2),

('Home & Kitchen', 'home-kitchen', 'Everything for your home',
'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', 'Home', 3),

('Beauty & Care', 'beauty-care', 'Skincare, makeup and personal care',
'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg', 'Sparkles', 4),

('Health & Wellness', 'health-wellness', 'Fitness and wellness products',
'https://images.pexels.com/photos/4498158/pexels-photo-4498158.jpeg', 'Heart', 5),

('Gaming', 'gaming', 'Consoles, games and accessories',
'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg', 'Gamepad2', 6)

ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- ELECTRONICS PRODUCTS
-- ============================================

INSERT INTO products
(name, slug, description, price, original_price, discount_percent,
 category_id, brand, stock_quantity, rating, review_count,
 image_url, is_featured, is_bestseller, is_new,
 prime_eligible, tags)

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
p.tags

FROM (
VALUES

('iPhone 15 Pro Max','iphone-15-pro-max',
'A17 Pro chip with titanium design',
1199,1199,0,'Apple',200,4.8,8921,
'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
true,true,true,
ARRAY['iphone','apple','smartphone']),

('Apple MacBook Air M2','apple-macbook-air-m2',
'M2 chip laptop with Retina display',
1099,1199,8,'Apple',80,4.9,5621,
'https://images.pexels.com/photos/18105/pexels-photo.jpg',
true,true,false,
ARRAY['laptop','apple','m2']),

('Sony WH-1000XM5 Headphones','sony-wh-1000xm5',
'Noise canceling wireless headphones',
279.99,349.99,20,'Sony',150,4.8,3421,
'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
true,true,false,
ARRAY['headphones','wireless']),

('Samsung 4K Smart TV 55','samsung-4k-tv-55',
'Crystal UHD Smart TV',
499.99,699.99,29,'Samsung',60,4.6,2341,
'https://images.pexels.com/photos/6585760/pexels-photo-6585760.jpeg',
true,false,false,
ARRAY['tv','4k','smart'])

) AS p(
name, slug, description, price, original_price,
discount_percent, brand, stock, rating, reviews,
image_url, featured, bestseller, is_new, tags
)

JOIN categories c
ON c.slug = 'electronics'

ON CONFLICT (slug) DO UPDATE SET
description = EXCLUDED.description,
price = EXCLUDED.price,
original_price = EXCLUDED.original_price,
discount_percent = EXCLUDED.discount_percent,
stock_quantity = EXCLUDED.stock_quantity,
rating = EXCLUDED.rating,
review_count = EXCLUDED.review_count,
image_url = EXCLUDED.image_url;

-- ============================================
-- FASHION PRODUCTS
-- ============================================

INSERT INTO products
(name, slug, description, price, original_price,
 discount_percent, category_id, brand,
 stock_quantity, rating, review_count,
 image_url, is_featured, is_bestseller,
 is_new, prime_eligible, tags)

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
p.tags

FROM (
VALUES

('Classic Leather Jacket','classic-leather-jacket',
'Genuine leather biker jacket',
189.99,259.99,27,'UrbanStyle',120,4.6,892,
'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg',
true,false,false,
ARRAY['jacket','leather']),

('Premium Denim Jeans','premium-denim-jeans',
'Stretch denim tapered fit',
69.99,99.99,30,'DenimCo',250,4.4,1432,
'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
false,true,false,
ARRAY['jeans','denim']),

('Running Sneakers Ultra','running-sneakers-ultra',
'Lightweight running sneakers',
119.99,159.99,25,'SwiftRun',200,4.8,3201,
'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
true,true,false,
ARRAY['sneakers','running'])

) AS p(
name, slug, description, price, original_price,
discount_percent, brand, stock, rating, reviews,
image_url, featured, bestseller, is_new, tags
)

JOIN categories c
ON c.slug = 'fashion'

ON CONFLICT (slug) DO UPDATE SET
description = EXCLUDED.description,
price = EXCLUDED.price,
stock_quantity = EXCLUDED.stock_quantity;

-- ============================================
-- HOME & KITCHEN PRODUCTS
-- ============================================

INSERT INTO products
(name, slug, description, price, original_price,
 discount_percent, category_id, brand,
 stock_quantity, rating, review_count,
 image_url, is_featured, is_bestseller,
 is_new, prime_eligible, tags)

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
p.tags

FROM (
VALUES

('Smart Coffee Maker','smart-coffee-maker',
'WiFi programmable coffee maker',
129.99,179.99,28,'BrewMaster',140,4.6,2341,
'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg',
true,true,false,
ARRAY['coffee','kitchen']),

('Robot Vacuum Cleaner','robot-vacuum-cleaner',
'Smart robot vacuum with auto mapping',
299.99,399.99,25,'CleanBot',55,4.6,2103,
'https://images.pexels.com/photos/3935362/pexels-photo-3935362.jpeg',
true,true,true,
ARRAY['vacuum','robot']),

('Ceramic Cookware Set','ceramic-cookware-set',
'10-piece ceramic cookware set',
149.99,229.99,35,'ChefElite',75,4.8,934,
'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
true,false,false,
ARRAY['cookware','kitchen'])

) AS p(
name, slug, description, price, original_price,
discount_percent, brand, stock, rating, reviews,
image_url, featured, bestseller, is_new, tags
)

JOIN categories c
ON c.slug = 'home-kitchen';

-- ============================================
-- BEAUTY & CARE PRODUCTS
-- ============================================

INSERT INTO products
(name, slug, description, price, original_price,
 discount_percent, category_id, brand,
 stock_quantity, rating, review_count,
 image_url, is_featured, is_bestseller,
 is_new, prime_eligible, tags)

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
p.tags

FROM (
VALUES

('Vitamin C Serum','vitamin-c-serum',
'Brightening skincare serum',
34.99,49.99,30,'GlowLab',500,4.8,8932,
'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg',
true,true,false,
ARRAY['serum','skincare']),

('Luxury Perfume Collection','luxury-perfume-collection',
'Mini fragrance collection',
89.99,129.99,31,'ScentLux',120,4.9,1234,
'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
true,false,true,
ARRAY['perfume','fragrance'])

) AS p(
name, slug, description, price, original_price,
discount_percent, brand, stock, rating, reviews,
image_url, featured, bestseller, is_new, tags
)

JOIN categories c
ON c.slug = 'beauty-care';

-- ============================================
-- HEALTH & WELLNESS PRODUCTS
-- ============================================

INSERT INTO products
(name, slug, description, price, original_price,
 discount_percent, category_id, brand,
 stock_quantity, rating, review_count,
 image_url, is_featured, is_bestseller,
 is_new, prime_eligible, tags)

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
p.tags

FROM (
VALUES

('Smart Fitness Watch','smart-fitness-watch',
'Fitness smartwatch with GPS',
199.99,279.99,29,'FitTrack',300,4.7,5678,
'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
true,true,false,
ARRAY['fitness','watch']),

('Yoga Mat Premium','yoga-mat-premium',
'Non-slip eco yoga mat',
49.99,69.99,29,'ZenFlow',400,4.8,4321,
'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg',
false,true,false,
ARRAY['yoga','fitness'])

) AS p(
name, slug, description, price, original_price,
discount_percent, brand, stock, rating, reviews,
image_url, featured, bestseller, is_new, tags
)

JOIN categories c
ON c.slug = 'health-wellness';

-- ============================================
-- GAMING PRODUCTS
-- ============================================

INSERT INTO products
(name, slug, description, price, original_price,
 discount_percent, category_id, brand,
 stock_quantity, rating, review_count,
 image_url, is_featured, is_bestseller,
 is_new, prime_eligible, tags)

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
p.tags

FROM (
VALUES

('Gaming Mechanical Keyboard','gaming-mechanical-keyboard',
'RGB mechanical gaming keyboard',
89.99,129.99,31,'GameForce',200,4.8,3456,
'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg',
true,true,false,
ARRAY['keyboard','gaming']),

('Gaming Mouse Pro','gaming-mouse-pro',
'Wireless gaming mouse',
69.99,99.99,30,'GameForce',300,4.7,5678,
'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg',
false,true,false,
ARRAY['mouse','gaming']),

('4K Gaming Monitor','4k-gaming-monitor',
'144Hz IPS gaming monitor',
399.99,549.99,27,'VisionPro',80,4.9,1234,
'https://images.pexels.com/photos/1714205/pexels-photo-1714205.jpeg',
true,true,true,
ARRAY['monitor','gaming'])

) AS p(
name, slug, description, price, original_price,
discount_percent, brand, stock, rating, reviews,
image_url, featured, bestseller, is_new, tags
)

JOIN categories c
ON c.slug = 'gaming';