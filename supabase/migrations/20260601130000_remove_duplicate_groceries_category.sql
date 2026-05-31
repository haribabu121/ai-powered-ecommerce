-- Remove duplicate Groceries category rows (keep canonical slug: grocery)
DELETE FROM categories
WHERE (slug = 'groceries' OR (name ILIKE 'groceries' AND slug <> 'grocery'))
  AND slug <> 'grocery';
