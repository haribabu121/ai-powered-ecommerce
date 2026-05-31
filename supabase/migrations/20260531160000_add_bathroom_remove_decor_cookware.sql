-- Remove decor and cookware products from Home & Kitchen
DELETE FROM products 
WHERE subcategory IN ('decor', 'cookware');

-- Add Bathroom/Toilets products to Home & Kitchen category
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
p.subcategory

FROM (
VALUES

('Premium Wash Basin','wash-basin',
'Modern ceramic wash basin with elegant design',
89.99,129.99,31,'BathDeluxe',150,4.8,2145,
'https://images.pexels.com/photos/3555615/pexels-photo-3555615.jpeg',
true,true,false,
ARRAY['basin','bathroom','ceramic','sink'],
'toilets'),

('Classic Bathtub','classic-bathtub',
'Durable acrylic bathtub with slip-resistant surface',
449.99,599.99,25,'BathComfort',45,4.9,1876,
'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
true,true,false,
ARRAY['bathtub','bathroom','acrylic'],
'toilets'),

('Basin Faucet Chrome','basin-faucet-chrome',
'Modern chrome basin faucet with aerator',
49.99,79.99,37,'AquaFlow',300,4.7,3421,
'https://images.pexels.com/photos/1909646/pexels-photo-1909646.jpeg',
false,true,true,
ARRAY['faucet','tap','basin','chrome'],
'toilets'),

('Bathroom Cleaner Pro','bathroom-cleaner-pro',
'All-purpose bathroom cleaner with anti-bacterial formula',
12.99,19.99,35,'CleanPro',500,4.6,5234,
'https://images.pexels.com/photos/6507004/pexels-photo-6507004.jpeg',
false,false,false,
ARRAY['cleaner','bathroom','cleaning','anti-bacterial'],
'toilets')

) AS p(
name, slug, description, price, original_price,
discount_percent, brand, stock, rating, reviews,
image_url, featured, bestseller, is_new, tags, subcategory
)

JOIN categories c
ON c.slug = 'home-kitchen'

ON CONFLICT (slug) DO UPDATE SET
description = EXCLUDED.description,
price = EXCLUDED.price,
stock_quantity = EXCLUDED.stock_quantity,
subcategory = EXCLUDED.subcategory;
