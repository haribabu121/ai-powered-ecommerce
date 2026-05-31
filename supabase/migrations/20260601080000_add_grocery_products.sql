-- Insert Grocery Category if not exists
INSERT INTO categories (name, slug, description, image_url, icon, sort_order)
VALUES 
  ('Groceries', 'grocery', 'Fresh groceries and pantry staples', 'https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg', 'ShoppingBasket', 7)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- JAGGERY PRODUCTS
-- ============================================
INSERT INTO products
(name, slug, description, price, original_price, discount_percent, category_id, brand,
 stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new,
 prime_eligible, tags, subcategory)
SELECT p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags, p.subcategory
FROM (VALUES
('Organic Jaggery Powder', 'organic-jaggery-powder',
'Pure organic jaggery powder, no additives or preservatives',
249.99, 349.99, 28, 'GulJor', 200, 4.8, 1250,
'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg',
true, true, false,
ARRAY['jaggery', 'powder', 'organic'], 'jaggery'),
('Desi Jaggery Cubes', 'desi-jaggery-cubes',
'Traditional desi jaggery cubes, rich in minerals',
199.99, 299.99, 33, 'RuralCare', 180, 4.7, 985,
'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg',
false, true, false,
ARRAY['jaggery', 'cubes', 'desi'], 'jaggery')
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags, subcategory)
JOIN categories c ON c.slug = 'grocery'
ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, stock_quantity = EXCLUDED.stock_quantity;

-- ============================================
-- CEREALS PRODUCTS
-- ============================================
INSERT INTO products
(name, slug, description, price, original_price, discount_percent, category_id, brand,
 stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new,
 prime_eligible, tags, subcategory)
SELECT p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags, p.subcategory
FROM (VALUES
('Thool Makhina Roasted', 'thool-makhina-roasted',
'Roasted thool makhina, crunchy and nutritious breakfast cereal',
149.99, 199.99, 25, 'GrainBest', 300, 4.6, 450,
'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg',
true, true, false,
ARRAY['thool', 'makhina', 'roasted', 'cereal'], 'cereals'),
('Poha Atukulu', 'poha-atukulu',
'Flattened rice (Poha), ready to eat breakfast',
129.99, 179.99, 28, 'RiceKing', 350, 4.7, 620,
'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg',
true, false, true,
ARRAY['poha', 'atukulu', 'rice', 'breakfast'], 'cereals'),
('Sabudana Saggubayyam', 'sabudana-saggubayyam',
'Tapioca pearls for traditional Indian dishes',
99.99, 149.99, 33, 'ArtisanGrain', 250, 4.8, 540,
'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg',
false, true, false,
ARRAY['sabudana', 'saggubayyam', 'tapioca'], 'cereals'),
('Murmura Puffed Rice', 'murmura-puffed-rice',
'Light and crispy puffed rice snack',
89.99, 139.99, 36, 'SnackArt', 400, 4.6, 380,
'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg',
false, true, false,
ARRAY['murmura', 'puffed', 'rice', 'snack'], 'cereals')
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags, subcategory)
JOIN categories c ON c.slug = 'grocery'
ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, stock_quantity = EXCLUDED.stock_quantity;

-- ============================================
-- NUTS PRODUCTS
-- ============================================
INSERT INTO products
(name, slug, description, price, original_price, discount_percent, category_id, brand,
 stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new,
 prime_eligible, tags, subcategory)
SELECT p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags, p.subcategory
FROM (VALUES
('Cashew Whole Raw', 'cashew-whole-raw',
'Premium whole raw cashew nuts, high in protein',
599.99, 799.99, 25, 'NutsPro', 150, 4.9, 890,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['cashew', 'whole', 'nuts'], 'nuts'),
('Cashew Pieces', 'cashew-pieces',
'Roasted cashew pieces, ready to snack',
449.99, 599.99, 25, 'NutsPro', 200, 4.7, 650,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, false, false,
ARRAY['cashew', 'pieces', 'roasted'], 'nuts'),
('Coconut Flakes Dried', 'coconut-flakes-dried',
'Unsweetened dried coconut flakes, perfect for cooking',
179.99, 249.99, 28, 'CocoFood', 300, 4.6, 420,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['coconut', 'flakes', 'dried'], 'nuts'),
('Coconut Powder', 'coconut-powder',
'Pure coconut powder, made from dried coconut',
149.99, 199.99, 25, 'CocoFood', 250, 4.7, 380,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
false, true, true,
ARRAY['coconut', 'powder', 'dried'], 'nuts'),
('Dry Coconut Chips', 'dry-coconut-chips',
'Crunchy dry coconut chips for snacking',
199.99, 279.99, 28, 'CocoFood', 280, 4.5, 310,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
false, false, false,
ARRAY['coconut', 'chips', 'dry'], 'nuts'),
('Roasted Peanuts Unsalted', 'roasted-peanuts-unsalted',
'Healthy roasted peanuts without salt',
129.99, 179.99, 28, 'NutsFresh', 400, 4.8, 720,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['peanuts', 'roasted', 'unsalted'], 'nuts'),
('Walnuts Whole', 'walnuts-whole',
'Premium whole walnuts, rich in omega-3',
699.99, 899.99, 22, 'NutsPro', 100, 4.9, 580,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['walnuts', 'whole', 'omega3'], 'nuts'),
('Dry Dates Natural', 'dry-dates-natural',
'Pure natural dried dates, no added sugar',
349.99, 449.99, 22, 'DateBest', 180, 4.8, 510,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, false, false,
ARRAY['dates', 'dry', 'natural'], 'nuts'),
('Dry Dates Powder', 'dry-dates-powder',
'Fine powder made from dried dates, energy booster',
279.99, 379.99, 26, 'DateBest', 150, 4.7, 290,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
false, true, true,
ARRAY['dates', 'powder', 'energy'], 'nuts')
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags, subcategory)
JOIN categories c ON c.slug = 'grocery'
ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, stock_quantity = EXCLUDED.stock_quantity;

-- ============================================
-- FLOUR PRODUCTS
-- ============================================
INSERT INTO products
(name, slug, description, price, original_price, discount_percent, category_id, brand,
 stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new,
 prime_eligible, tags, subcategory)
SELECT p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags, p.subcategory
FROM (VALUES
('Chakki Atta Whole Wheat', 'chakki-atta-whole-wheat',
'Stone ground whole wheat flour for fresh rotis',
129.99, 179.99, 28, 'AttaBest', 400, 4.8, 1200,
'https://images.pexels.com/photos/4270326/pexels-photo-4270326.jpeg',
true, true, false,
ARRAY['atta', 'flour', 'wheat'], 'flour'),
('Besan Chickpea Flour', 'besan-chickpea-flour',
'Pure chickpea flour for Indian sweets and dishes',
199.99, 279.99, 28, 'FlourKing', 300, 4.7, 890,
'https://images.pexels.com/photos/4270326/pexels-photo-4270326.jpeg',
true, false, false,
ARRAY['besan', 'chickpea', 'flour'], 'flour'),
('Jawar Flour Sorghum', 'jawar-flour-sorghum',
'Nutritious sorghum flour for traditional dishes',
159.99, 229.99, 30, 'GrainFlow', 250, 4.6, 420,
'https://images.pexels.com/photos/4270326/pexels-photo-4270326.jpeg',
false, true, true,
ARRAY['jawar', 'sorghum', 'flour'], 'flour')
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags, subcategory)
JOIN categories c ON c.slug = 'grocery'
ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, stock_quantity = EXCLUDED.stock_quantity;

-- ============================================
-- DALS PRODUCTS
-- ============================================
INSERT INTO products
(name, slug, description, price, original_price, discount_percent, category_id, brand,
 stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new,
 prime_eligible, tags, subcategory)
SELECT p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags, p.subcategory
FROM (VALUES
('Chana Dal Split', 'chana-dal-split',
'High protein split chickpea dal for curries',
249.99, 349.99, 28, 'DalFresh', 300, 4.8, 950,
'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg',
true, true, false,
ARRAY['dal', 'chana', 'protein'], 'dals'),
('Green Chana Mung Beans', 'green-chana-mung-beans',
'Whole green mung beans, nutritious and tasty',
199.99, 279.99, 28, 'DalFresh', 350, 4.7, 820,
'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg',
true, false, false,
ARRAY['mung', 'green', 'beans'], 'dals'),
('Kabuli Chana Chickpeas', 'kabuli-chana-chickpeas',
'Large chickpeas for salads and curries',
229.99, 329.99, 30, 'DalFresh', 280, 4.6, 710,
'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg',
false, true, true,
ARRAY['chickpea', 'kabuli', 'chana'], 'dals'),
('Mixed Beans Variety', 'mixed-beans-variety',
'Assorted beans for nutritious meals',
189.99, 269.99, 30, 'BeanFresh', 200, 4.5, 480,
'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg',
false, false, false,
ARRAY['beans', 'mixed', 'variety'], 'dals')
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags, subcategory)
JOIN categories c ON c.slug = 'grocery'
ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, stock_quantity = EXCLUDED.stock_quantity;

-- ============================================
-- SOUTH INDIAN RICE FLOUR PRODUCTS
-- ============================================
INSERT INTO products
(name, slug, description, price, original_price, discount_percent, category_id, brand,
 stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new,
 prime_eligible, tags, subcategory)
SELECT p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags, p.subcategory
FROM (VALUES
('Ragi Flour Finger Millet', 'ragi-flour-finger-millet',
'Nutritious ragi flour for porridge and baking',
179.99, 249.99, 28, 'RiceFlow', 250, 4.8, 680,
'https://images.pexels.com/photos/4270326/pexels-photo-4270326.jpeg',
true, true, false,
ARRAY['ragi', 'flour', 'millet'], 'rice-flour'),
('Roasted Upma Rava Semolina', 'roasted-upma-rava-semolina',
'Roasted semolina for South Indian breakfast',
159.99, 219.99, 27, 'RiceFlow', 300, 4.7, 540,
'https://images.pexels.com/photos/4270326/pexels-photo-4270326.jpeg',
true, false, true,
ARRAY['upma', 'rava', 'semolina'], 'rice-flour')
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags, subcategory)
JOIN categories c ON c.slug = 'grocery'
ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, stock_quantity = EXCLUDED.stock_quantity;

-- ============================================
-- SOUTH INDIAN RICE PRODUCTS
-- ============================================
INSERT INTO products
(name, slug, description, price, original_price, discount_percent, category_id, brand,
 stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new,
 prime_eligible, tags, subcategory)
SELECT p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags, p.subcategory
FROM (VALUES
('Brown Soona Mossir Rice', 'brown-soona-mossir-rice',
'Traditional brown sona masoori rice, aromatic',
349.99, 449.99, 22, 'RiceMaster', 200, 4.9, 820,
'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg',
true, true, false,
ARRAY['rice', 'brown', 'soona'], 'rice'),
('White Soona Mossir Rice', 'white-soona-mossir-rice',
'Premium white sona masoori rice',
299.99, 399.99, 25, 'RiceMaster', 300, 4.8, 950,
'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg',
true, false, false,
ARRAY['rice', 'white', 'soona'], 'rice'),
('Idli Rice Parboiled', 'idli-rice-parboiled',
'Parboiled idli rice for South Indian delicacies',
239.99, 329.99, 27, 'IdliRice', 350, 4.7, 720,
'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg',
true, true, true,
ARRAY['idli', 'rice', 'parboiled'], 'rice'),
('Brown Rice Long Grain', 'brown-rice-long-grain',
'Healthy long grain brown rice',
319.99, 419.99, 24, 'HealthRice', 250, 4.6, 580,
'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg',
false, true, false,
ARRAY['rice', 'brown', 'long'], 'rice'),
('Basmati Rice White', 'basmati-rice-white',
'Long grain basmati rice, aromatic and fluffy',
399.99, 499.99, 20, 'BasmatiKing', 280, 4.8, 1100,
'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg',
true, false, false,
ARRAY['basmati', 'rice', 'white'], 'rice'),
('Brown Basmati Rice Organic', 'brown-basmati-rice-organic',
'Organic brown basmati rice, nutritious',
449.99, 599.99, 25, 'BasmatiKing', 180, 4.9, 640,
'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg',
true, true, true,
ARRAY['basmati', 'brown', 'organic'], 'rice'),
('Extra Long Grain Basmati', 'extra-long-grain-basmati',
'Premium extra long grain basmati rice',
499.99, 649.99, 23, 'BasmatiKing', 150, 4.9, 780,
'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg',
true, true, false,
ARRAY['basmati', 'extra-long', 'grain'], 'rice'),
('Low GI Basmati Rice', 'low-gi-basmati-rice',
'Low glycemic index basmati rice for diabetics',
559.99, 699.99, 20, 'HealthRice', 120, 4.8, 510,
'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg',
true, true, false,
ARRAY['basmati', 'low-gi', 'health'], 'rice')
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags, subcategory)
JOIN categories c ON c.slug = 'grocery'
ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, stock_quantity = EXCLUDED.stock_quantity;

-- ============================================
-- SPICES PRODUCTS - PART 1
-- ============================================
INSERT INTO products
(name, slug, description, price, original_price, discount_percent, category_id, brand,
 stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new,
 prime_eligible, tags, subcategory)
SELECT p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags, p.subcategory
FROM (VALUES
('Ajwain Seeds Carom', 'ajwain-seeds-carom',
'Organic ajwain seeds for digestive health',
149.99, 199.99, 25, 'SpiceMaster', 300, 4.8, 520,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['ajwain', 'seeds', 'spice'], 'spices'),
('Amchur Powder Dried Mango', 'amchur-powder-dried-mango',
'Tangy dried mango powder for authentic taste',
179.99, 249.99, 28, 'SpiceMaster', 250, 4.7, 380,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, false, false,
ARRAY['amchur', 'mango', 'powder'], 'spices'),
('Bay Leaves', 'bay-leaves',
'Premium bay leaves for curry and rice',
199.99, 279.99, 28, 'SpiceMaster', 400, 4.6, 290,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
false, true, false,
ARRAY['bay', 'leaves', 'spice'], 'spices'),
('Black Cardamom Whole', 'black-cardamom-whole',
'Smoky black cardamom pods for rich flavors',
349.99, 449.99, 22, 'SpiceKing', 150, 4.8, 420,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['cardamom', 'black', 'whole'], 'spices'),
('Black Pepper Powder', 'black-pepper-powder',
'Freshly ground black pepper, aromatic',
189.99, 269.99, 30, 'PepperFresh', 350, 4.9, 780,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, false, true,
ARRAY['pepper', 'black', 'powder'], 'spices'),
('White Pepper Powder', 'white-pepper-powder',
'Mild white pepper powder for delicate flavors',
209.99, 289.99, 28, 'PepperFresh', 280, 4.7, 620,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
false, true, false,
ARRAY['pepper', 'white', 'powder'], 'spices'),
('Cinnamon Stick Flat', 'cinnamon-stick-flat',
'Premium flat cinnamon sticks for warm beverages',
229.99, 329.99, 30, 'CinnamonBest', 200, 4.8, 510,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['cinnamon', 'stick', 'flat'], 'spices'),
('Cinnamon Stick Curled', 'cinnamon-stick-curled',
'Aromatic curled cinnamon sticks',
249.99, 349.99, 28, 'CinnamonBest', 220, 4.8, 450,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, false, false,
ARRAY['cinnamon', 'stick', 'curled'], 'spices'),
('Cinnamon Powder Ground', 'cinnamon-powder-ground',
'Fine cinnamon powder for baking and cooking',
199.99, 279.99, 28, 'CinnamonBest', 300, 4.7, 680,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, true,
ARRAY['cinnamon', 'powder', 'ground'], 'spices')
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags, subcategory)
JOIN categories c ON c.slug = 'grocery'
ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, stock_quantity = EXCLUDED.stock_quantity;

-- ============================================
-- SPICES PRODUCTS - PART 2
-- ============================================
INSERT INTO products
(name, slug, description, price, original_price, discount_percent, category_id, brand,
 stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new,
 prime_eligible, tags, subcategory)
SELECT p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags, p.subcategory
FROM (VALUES
('Clove Powder Ground', 'clove-powder-ground',
'Pure clove powder with warm spicy aroma',
279.99, 379.99, 26, 'ClovePure', 200, 4.9, 390,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['clove', 'powder', 'ground'], 'spices'),
('Cloves Whole', 'cloves-whole',
'Premium whole cloves for perfect flavoring',
299.99, 399.99, 25, 'ClovePure', 180, 4.8, 520,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, false, false,
ARRAY['clove', 'whole', 'spice'], 'spices'),
('Coriander Seeds Whole', 'coriander-seeds-whole',
'Organic coriander seeds for tempering',
139.99, 199.99, 30, 'CoriandeFresh', 400, 4.7, 650,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, true,
ARRAY['coriander', 'seeds', 'whole'], 'spices'),
('Coriander Powder', 'coriander-powder',
'Freshly ground coriander powder',
159.99, 229.99, 30, 'CorianderFresh', 350, 4.8, 720,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, false, false,
ARRAY['coriander', 'powder', 'ground'], 'spices'),
('Red Chilli Powder Spicy', 'red-chilli-powder-spicy',
'Hot red chilli powder for authentic Indian cooking',
169.99, 239.99, 29, 'ChilliHeat', 500, 4.9, 1200,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['chilli', 'powder', 'red', 'spicy'], 'spices'),
('Red Chilli Flakes Dried', 'red-chilli-flakes-dried',
'Crushed dried red chilli flakes for pizzas and cooking',
189.99, 269.99, 30, 'ChilliHeat', 380, 4.6, 510,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
false, true, false,
ARRAY['chilli', 'flakes', 'red', 'dried'], 'spices'),
('Cumin Seeds Jeera', 'cumin-seeds-jeera',
'Aromatic cumin seeds for tempering',
149.99, 219.99, 32, 'CuminFresh', 420, 4.8, 890,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['cumin', 'jeera', 'seeds'], 'spices'),
('Cumin Powder Ground', 'cumin-powder-ground',
'Ground cumin powder for flavoring dishes',
179.99, 249.99, 28, 'CuminFresh', 350, 4.7, 640,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, false, true,
ARRAY['cumin', 'powder', 'ground'], 'spices')
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags, subcategory)
JOIN categories c ON c.slug = 'grocery'
ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, stock_quantity = EXCLUDED.stock_quantity;

-- ============================================
-- SPICES PRODUCTS - PART 3
-- ============================================
INSERT INTO products
(name, slug, description, price, original_price, discount_percent, category_id, brand,
 stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new,
 prime_eligible, tags, subcategory)
SELECT p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags, p.subcategory
FROM (VALUES
('Turmeric Powder Pure', 'turmeric-powder-pure',
'Pure turmeric powder with high curcumin content',
199.99, 279.99, 28, 'TurmericGold', 500, 4.9, 1450,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['turmeric', 'powder', 'pure'], 'spices'),
('Himalayan Turmeric Powder', 'himalayan-turmeric-powder',
'Premium Himalayan turmeric with superior quality',
279.99, 379.99, 26, 'HimalayaSpice', 250, 4.9, 520,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, true,
ARRAY['turmeric', 'himalayan', 'premium'], 'spices'),
('Ginger Powder Dried', 'ginger-powder-dried',
'Dried ginger powder for cooking and wellness',
189.99, 269.99, 30, 'GingerFresh', 380, 4.8, 780,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, false, false,
ARRAY['ginger', 'powder', 'dried'], 'spices'),
('Garlic Powder', 'garlic-powder',
'Fine garlic powder for convenient cooking',
179.99, 249.99, 28, 'GarlicFresh', 350, 4.7, 640,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
false, true, false,
ARRAY['garlic', 'powder', 'dried'], 'spices'),
('Green Cardamom Whole', 'green-cardamom-whole',
'Aromatic green cardamom pods',
399.99, 499.99, 20, 'CardamomKing', 200, 4.9, 510,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['cardamom', 'green', 'whole'], 'spices'),
('Hing Powder Asafoetida', 'hing-powder-asafoetida',
'Pure hing powder for digestive aid and flavoring',
249.99, 349.99, 28, 'HingPure', 300, 4.6, 380,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, false, true,
ARRAY['hing', 'asafoetida', 'powder'], 'spices'),
('Fenugreek Methi Powder', 'fenugreek-methi-powder',
'Dried fenugreek leaves powder for flavoring',
159.99, 229.99, 30, 'MethiFresh', 280, 4.5, 290,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
false, false, false,
ARRAY['methi', 'fenugreek', 'powder'], 'spices'),
('Mustard Seeds Black', 'mustard-seeds-black',
'Black mustard seeds for tempering curries',
129.99, 189.99, 32, 'MustardFresh', 450, 4.8, 620,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['mustard', 'seeds', 'black'], 'spices')
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags, subcategory)
JOIN categories c ON c.slug = 'grocery'
ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, stock_quantity = EXCLUDED.stock_quantity;

-- ============================================
-- SPICES PRODUCTS - PART 4 (Final)
-- ============================================
INSERT INTO products
(name, slug, description, price, original_price, discount_percent, category_id, brand,
 stock_quantity, rating, review_count, image_url, is_featured, is_bestseller, is_new,
 prime_eligible, tags, subcategory)
SELECT p.name, p.slug, p.description, p.price, p.original_price, p.discount_percent,
c.id, p.brand, p.stock, p.rating, p.reviews, p.image_url, p.featured, p.bestseller, p.is_new, true, p.tags, p.subcategory
FROM (VALUES
('Nutmeg Whole', 'nutmeg-whole',
'Premium whole nutmeg for aromatic flavor',
349.99, 449.99, 22, 'NutmegKing', 150, 4.8, 320,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['nutmeg', 'whole', 'spice'], 'spices'),
('Nutmeg Powder Ground', 'nutmeg-powder-ground',
'Finely ground nutmeg powder',
299.99, 399.99, 25, 'NutmegKing', 180, 4.7, 280,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, false, true,
ARRAY['nutmeg', 'powder', 'ground'], 'spices'),
('Star Anise Seeds', 'star-anise-seeds',
'Aromatic star-shaped anise seeds',
199.99, 279.99, 28, 'AniseBest', 250, 4.7, 410,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['star', 'anise', 'seeds'], 'spices'),
('Tamarind Paste', 'tamarind-paste',
'Tangy tamarind paste for authentic South Indian dishes',
189.99, 269.99, 30, 'TamarindFresh', 320, 4.8, 680,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
false, true, false,
ARRAY['tamarind', 'paste', 'sour'], 'spices'),
('Whole Garam Masala Blend', 'whole-garam-masala-blend',
'Traditional garam masala whole spice blend',
229.99, 329.99, 30, 'MasalaKing', 280, 4.9, 920,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, true, false,
ARRAY['garam', 'masala', 'whole', 'blend'], 'spices'),
('Whole Red Chilli Dried', 'whole-red-chilli-dried',
'Whole dried red chillies for traditional cooking',
159.99, 229.99, 30, 'ChilliArt', 400, 4.7, 510,
'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
true, false, false,
ARRAY['chilli', 'red', 'whole', 'dried'], 'spices')
) AS p(name, slug, description, price, original_price, discount_percent, brand, stock, rating, reviews, image_url, featured, bestseller, is_new, tags, subcategory)
JOIN categories c ON c.slug = 'grocery'
ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, stock_quantity = EXCLUDED.stock_quantity;
