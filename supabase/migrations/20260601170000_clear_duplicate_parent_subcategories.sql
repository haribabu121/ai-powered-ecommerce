-- Remove parent-category values mistakenly stored as product subcategory (e.g. grocery under Groceries)

UPDATE products p
SET subcategory = NULL
FROM categories c
WHERE p.category_id = c.id
  AND c.slug = 'grocery'
  AND p.subcategory IN ('grocery', 'groceries');

UPDATE products p
SET subcategory = NULL
FROM categories c
WHERE p.category_id = c.id
  AND c.slug = 'electronics'
  AND p.subcategory IN ('electronics', 'electronic');

UPDATE products p
SET subcategory = NULL
FROM categories c
WHERE p.category_id = c.id
  AND c.slug = 'fashion'
  AND p.subcategory IN ('fashion', 'apparel');

UPDATE products p
SET subcategory = NULL
FROM categories c
WHERE p.category_id = c.id
  AND c.slug = 'home-kitchen'
  AND p.subcategory IN ('home-kitchen', 'home', 'kitchen');

UPDATE products p
SET subcategory = NULL
FROM categories c
WHERE p.category_id = c.id
  AND c.slug = 'beauty-care'
  AND p.subcategory IN ('beauty-care', 'beauty');
