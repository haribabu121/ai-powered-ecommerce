-- Fix grocery product subcategories and seed image arrays
ALTER TABLE products ADD COLUMN IF NOT EXISTS images text[];

-- Correct grocery subcategory groups for product filtering
UPDATE products
SET subcategory = 'jaggery'
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND slug IN ('organic-jaggery-powder', 'desi-jaggery-cubes');

UPDATE products
SET subcategory = 'cereals'
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND slug IN ('thool-makhina-roasted', 'poha-atukulu', 'sabudana-saggubayyam', 'murmura-puffed-rice');

UPDATE products
SET subcategory = 'nuts'
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND slug IN (
    'cashew-whole-raw',
    'cashew-pieces',
    'coconut-flakes-dried',
    'coconut-powder',
    'dry-coconut-chips',
    'roasted-peanuts-unsalted',
    'walnuts-whole',
    'dry-dates-natural',
    'dry-dates-powder'
  );

UPDATE products
SET subcategory = 'flour'
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND slug IN ('chakki-atta-whole-wheat', 'besan-chickpea-flour', 'jawar-flour-sorghum');

UPDATE products
SET subcategory = 'dals'
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND slug IN ('chana-dal-split', 'green-chana-mung-beans', 'kabuli-chana-chickpeas', 'mixed-beans-variety');

UPDATE products
SET subcategory = 'rice-flour'
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND slug IN ('ragi-flour-finger-millet', 'roasted-upma-rava-semolina');

UPDATE products
SET subcategory = 'rice'
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND slug IN (
    'brown-soona-mossir-rice',
    'white-soona-mossir-rice',
    'idli-rice-parboiled',
    'brown-rice-long-grain',
    'basmati-rice-white',
    'brown-basmati-rice-organic',
    'extra-long-grain-basmati',
    'low-gi-basmati-rice'
  );

UPDATE products
SET subcategory = 'spices'
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND subcategory IS DISTINCT FROM 'spices'
  AND slug IN (
    'ajwain-seeds-carom',
    'amchur-powder-dried-mango',
    'bay-leaves',
    'black-cardamom-whole',
    'black-pepper-powder',
    'white-pepper-powder',
    'cinnamon-stick-flat',
    'cinnamon-stick-curled',
    'cinnamon-powder-ground',
    'clove-powder-ground',
    'cloves-whole',
    'coriander-seeds-whole',
    'coriander-powder',
    'red-chilli-powder-spicy',
    'red-chilli-flakes-dried',
    'cumin-seeds-jeera',
    'cumin-powder-ground',
    'turmeric-powder-pure',
    'himalayan-turmeric-powder',
    'ginger-powder-dried',
    'garlic-powder',
    'green-cardamom-whole',
    'hing-powder-asafoetida',
    'fenugreek-methi-powder',
    'mustard-seeds-black',
    'nutmeg-whole',
    'nutmeg-powder-ground',
    'star-anise-seeds',
    'tamarind-paste',
    'whole-garam-masala-blend',
    'whole-red-chilli-dried'
  );

-- Populate image arrays for grocery product detail pages
UPDATE products
SET images = ARRAY[image_url, 'https://images.pexels.com/photos/616831/pexels-photo-616831.jpeg']
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND subcategory = 'jaggery';

UPDATE products
SET images = ARRAY[image_url, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg']
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND subcategory = 'cereals';

UPDATE products
SET images = ARRAY[image_url, 'https://images.pexels.com/photos/3610847/pexels-photo-3610847.jpeg']
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND subcategory = 'nuts';

UPDATE products
SET images = ARRAY[image_url, 'https://images.pexels.com/photos/3652293/pexels-photo-3652293.jpeg']
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND subcategory = 'flour';

UPDATE products
SET images = ARRAY[image_url, 'https://images.pexels.com/photos/4051687/pexels-photo-4051687.jpeg']
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND subcategory = 'dals';

UPDATE products
SET images = ARRAY[image_url, 'https://images.pexels.com/photos/291215/pexels-photo-291215.jpeg']
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND subcategory = 'rice-flour';

UPDATE products
SET images = ARRAY[image_url, 'https://images.pexels.com/photos/213334/pexels-photo-213334.jpeg']
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND subcategory = 'rice';

UPDATE products
SET images = ARRAY[image_url, 'https://images.pexels.com/photos/4897714/pexels-photo-4897714.jpeg']
WHERE category_id = (SELECT id FROM categories WHERE slug = 'grocery')
  AND subcategory = 'spices';
