-- Add two image entries for core Home & Kitchen products, excluding tissues
ALTER TABLE products ADD COLUMN IF NOT EXISTS images text[];

UPDATE products
SET images = ARRAY[
  image_url,
  'https://images.pexels.com/photos/6763667/pexels-photo-6763667.jpeg'
]
WHERE slug = 'ceramic-cookware-set';

UPDATE products
SET images = ARRAY[
  image_url,
  'https://images.pexels.com/photos/4397899/pexels-photo-4397899.jpeg'
]
WHERE slug = 'cast-iron-skillet-12';

UPDATE products
SET images = ARRAY[
  image_url,
  'https://images.pexels.com/photos/3935362/pexels-photo-3935362.jpeg'
]
WHERE slug = 'bamboo-cutting-board-set';

UPDATE products
SET images = ARRAY[
  image_url,
  'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg'
]
WHERE slug = 'robot-vacuum-cleaner';

UPDATE products
SET images = ARRAY[
  image_url,
  'https://images.pexels.com/photos/4239034/pexels-photo-4239034.jpeg'
]
WHERE slug = 'air-purifier-hepa';

UPDATE products
SET images = ARRAY[
  image_url,
  'https://images.pexels.com/photos/3944388/pexels-photo-3944388.jpeg'
]
WHERE slug = 'dehumidifier-50pint';

UPDATE products
SET images = ARRAY[
  image_url,
  'https://images.pexels.com/photos/1086182/pexels-photo-1086182.jpeg'
]
WHERE slug = 'scented-candle-set';

UPDATE products
SET images = ARRAY[
  image_url,
  'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'
]
WHERE slug = 'indoor-plant-set';

UPDATE products
SET images = ARRAY[
  image_url,
  'https://images.pexels.com/photos/6903436/pexels-photo-6903436.jpeg'
]
WHERE slug = 'throw-blanket-soft';

UPDATE products
SET images = ARRAY[
  image_url,
  'https://images.pexels.com/photos/6903437/pexels-photo-6903437.jpeg'
]
WHERE slug = 'toilet-seat-comfort';

UPDATE products
SET images = ARRAY[
  image_url,
  'https://images.pexels.com/photos/3555615/pexels-photo-3555615.jpeg'
]
WHERE slug = 'bidet-attachment';

UPDATE products
SET images = ARRAY[
  image_url,
  'https://images.pexels.com/photos/6903435/pexels-photo-6903435.jpeg'
]
WHERE slug = 'toilet-brush-holder';
