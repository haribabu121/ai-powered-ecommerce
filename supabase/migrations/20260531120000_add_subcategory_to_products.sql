-- Add subcategory field to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS subcategory text;

-- Create index for faster subcategory queries
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON products(subcategory);

-- Update existing products with appropriate subcategories based on their tags
UPDATE products 
SET subcategory = 'tops' 
WHERE tags && ARRAY['dress', 'top', 'shirt', 'blouse', 'women', 'midi', 'maxi', 'tunic', 'sweater', 'gown'];

UPDATE products 
SET subcategory = 'shoes' 
WHERE tags && ARRAY['shoe', 'sneaker', 'boot', 'footwear', 'running'];

UPDATE products 
SET subcategory = 'menswear' 
WHERE tags && ARRAY['jacket', 'denim', 'shirt', 'men', 'blazer', 'pants', 'leather'];

UPDATE products 
SET subcategory = 'bags' 
WHERE tags && ARRAY['bag', 'handbag', 'purse', 'crossbody', 'carry'];

UPDATE products 
SET subcategory = 'smartphones' 
WHERE tags && ARRAY['smartphone', 'iphone', 'android', 'tablet'];

UPDATE products 
SET subcategory = 'laptops' 
WHERE tags && ARRAY['laptop', 'macbook', 'notebook'];

UPDATE products 
SET subcategory = 'accessories' 
WHERE tags && ARRAY['accessory', 'headphones', 'earbuds', 'speaker', 'wireless', 'charger'];

UPDATE products 
SET subcategory = 'cameras' 
WHERE tags && ARRAY['camera', 'drone', 'mirrorless'];

UPDATE products 
SET subcategory = 'furniture' 
WHERE tags && ARRAY['furniture', 'sofa', 'chair', 'table', 'bed'];

UPDATE products 
SET subcategory = 'cookware' 
WHERE tags && ARRAY['cookware', 'pan', 'pot', 'kettle', 'mixer', 'blender'];

UPDATE products 
SET subcategory = 'decor' 
WHERE tags && ARRAY['decor', 'vase', 'lamp', 'rug', 'art'];

UPDATE products 
SET subcategory = 'appliances' 
WHERE tags && ARRAY['appliance', 'microwave', 'blender', 'coffee', 'kettle'];

UPDATE products 
SET subcategory = 'skincare' 
WHERE tags && ARRAY['skincare', 'cleanser', 'moisturizer', 'serum', 'mask'];

UPDATE products 
SET subcategory = 'makeup' 
WHERE tags && ARRAY['makeup', 'lipstick', 'foundation', 'mascara'];

UPDATE products 
SET subcategory = 'wellness' 
WHERE tags && ARRAY['wellness', 'supplement', 'vitamin', 'bath'];

UPDATE products 
SET subcategory = 'hair-care' 
WHERE tags && ARRAY['hair', 'shampoo', 'conditioner', 'styling'];

UPDATE products 
SET subcategory = 'fitness' 
WHERE tags && ARRAY['fitness', 'yoga', 'exercise', 'dumbbell'];
