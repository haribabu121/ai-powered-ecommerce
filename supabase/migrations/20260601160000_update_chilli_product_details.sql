-- Red chilli products: description + optional specifications JSON (column may not exist on older DBs)

ALTER TABLE products ADD COLUMN IF NOT EXISTS specifications jsonb;

UPDATE products
SET
  description = 'Guntur Chillies are renowned for their vibrant color, intense heat, and rich flavor, sourced directly from the Guntur district of Andhra Pradesh. We supply premium-quality raw Guntur chillies, finely ground chilli powder in secure packaging to preserve freshness, and versatile chilli flakes for added texture and heat in various dishes. Each product undergoes stringent quality checks, ensuring unparalleled purity and consistency for an authentic spice experience in every form.',
  specifications = '{"rows":[{"label":"Category","value":"Teja / S17, Baydgi, 334/ S4, 341, DD and Endo-5"},{"label":"Flavours","value":"High - Medium spicy"},{"label":"Colour","value":"Bright Red"},{"label":"Pungency in SHU","value":"8000-100000 (Heat)"},{"label":"Color in ASTA","value":"40-140 max"},{"label":"Size","value":"40-60 mesh"}]}'::jsonb
WHERE slug = 'red-chilli-powder-spicy';

UPDATE products
SET
  description = 'Our dried red chilli flakes deliver bold Guntur-region heat with a satisfying crunch in every sprinkle. Sourced from select harvests in Andhra Pradesh, the chillies are sun-cured and crushed to preserve natural oils, color, and capsaicin potency. Ideal for pizzas, pastas, stir-fries, and marinades, these flakes add texture and consistent spice without clumping. Each batch is screened for purity and packed to maintain aroma from our facility to your kitchen.',
  specifications = '{"rows":[{"label":"Category","value":"Teja / S17, Baydgi, 334/ S4, 341, DD and Endo-5"},{"label":"Flavours","value":"High - Medium spicy"},{"label":"Colour","value":"Red & Yellow mix"},{"label":"Pungency in SHU","value":"8000-90000 (Heat)"},{"label":"Color in ASTA","value":"40-140 max"},{"label":"Size","value":"2mm-4mm"},{"label":"Ash","value":"0.5% maximum"},{"label":"Sudan","value":"1,2,3&4"},{"label":"Aflatoxin","value":"5PPB"},{"label":"Discoloured","value":"1% maximum"}]}'::jsonb
WHERE slug = 'red-chilli-flakes-dried';
