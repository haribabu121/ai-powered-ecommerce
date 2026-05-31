-- Update existing products with subcategory values based on their names and tags
-- This ensures all products have correct subcategory assignments

-- Fashion products
UPDATE products SET subcategory = 'tops' WHERE slug IN ('wrap-midi-dress', 'silk-maxi-dress', 'pleated-midi-skirt', 'linen-tunic-dress', 'tailored-blazer', 'cotton-wide-leg-pants', 'velvet-evening-gown', 'crochet-beach-coverup', 'cashmere-sweater', 'premium-denim-jeans');
UPDATE products SET subcategory = 'menswear' WHERE slug IN ('denim-jacket-classic', 'classic-leather-jacket');
UPDATE products SET subcategory = 'shoes' WHERE slug IN ('running-sneakers-ultra');

-- Electronics products
UPDATE products SET subcategory = 'smartphones' WHERE slug LIKE '%iphone%';
UPDATE products SET subcategory = 'laptops' WHERE slug IN ('macbook-pro-14', 'lenovo-yoga-9i', 'hp-spectre-x360', 'surface-laptop-5', 'asus-rog-zephyrus', 'apple-macbook-air-m2');
UPDATE products SET subcategory = 'accessories' WHERE slug IN ('sony-wh-1000xm5', 'gaming-mechanical-keyboard', 'gaming-mouse-pro', '4k-gaming-monitor');
UPDATE products SET subcategory = 'appliances' WHERE slug IN ('samsung-4k-tv-55');

-- Home & Kitchen products
UPDATE products SET subcategory = 'appliances' WHERE slug IN ('smart-coffee-maker', 'robot-vacuum-cleaner');
UPDATE products SET subcategory = 'cookware' WHERE slug IN ('ceramic-cookware-set');

-- Beauty & Care products
UPDATE products SET subcategory = 'skincare' WHERE slug IN ('vitamin-c-serum');
UPDATE products SET subcategory = 'makeup' WHERE slug IN ('luxury-perfume-collection');

-- Health & Wellness products
UPDATE products SET subcategory = 'fitness' WHERE slug IN ('smart-fitness-watch', 'yoga-mat-premium');
