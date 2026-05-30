-- =========================
-- WISHLIST ITEMS
-- =========================

CREATE TABLE IF NOT EXISTS wishlist_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid()
);

ALTER TABLE wishlist_items
ADD COLUMN IF NOT EXISTS user_id uuid,
ADD COLUMN IF NOT EXISTS product_id uuid,
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'wishlist_items_user_id_fkey'
    ) THEN
        ALTER TABLE wishlist_items
        ADD CONSTRAINT wishlist_items_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES auth.users(id)
        ON DELETE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'wishlist_items_product_id_fkey'
    ) THEN
        ALTER TABLE wishlist_items
        ADD CONSTRAINT wishlist_items_product_id_fkey
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_wishlist_items_user
ON wishlist_items(user_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_wishlist_items_user_product
ON wishlist_items(user_id, product_id);
