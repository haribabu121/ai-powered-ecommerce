-- =========================
-- PROFILES
-- =========================

CREATE TABLE IF NOT EXISTS profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS full_name text,
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS address jsonb,
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now(),
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

CREATE INDEX IF NOT EXISTS idx_profiles_full_name
ON profiles(full_name);

-- =========================
-- CART ITEMS
-- =========================

CREATE TABLE IF NOT EXISTS cartitems (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid()
);

ALTER TABLE cartitems
ADD COLUMN IF NOT EXISTS user_id uuid,
ADD COLUMN IF NOT EXISTS session_id text,
ADD COLUMN IF NOT EXISTS product_id uuid,
ADD COLUMN IF NOT EXISTS quantity integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now(),
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'cartitems_user_id_fkey'
    ) THEN
        ALTER TABLE cartitems
        ADD CONSTRAINT cartitems_user_id_fkey
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
        WHERE constraint_name = 'cartitems_product_id_fkey'
    ) THEN
        ALTER TABLE cartitems
        ADD CONSTRAINT cartitems_product_id_fkey
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_cartitems_user
ON cartitems(user_id);

CREATE INDEX IF NOT EXISTS idx_cartitems_session
ON cartitems(session_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_cartitems_user_product
ON cartitems(user_id, product_id)
WHERE user_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_cartitems_session_product
ON cartitems(session_id, product_id)
WHERE session_id IS NOT NULL;

-- =========================
-- ORDERS
-- =========================

CREATE TABLE IF NOT EXISTS orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid()
);

ALTER TABLE orders
ADD COLUMN IF NOT EXISTS user_id uuid,
ADD COLUMN IF NOT EXISTS session_id text,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'confirmed',
ADD COLUMN IF NOT EXISTS total_amount numeric(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS shipping_amount numeric(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS tax_amount numeric(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS discount_amount numeric(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS shipping_address jsonb,
ADD COLUMN IF NOT EXISTS payment_method text,
ADD COLUMN IF NOT EXISTS payment_status text,
ADD COLUMN IF NOT EXISTS tracking_number text,
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'orders_user_id_fkey'
    ) THEN
        ALTER TABLE orders
        ADD CONSTRAINT orders_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES auth.users(id)
        ON DELETE SET NULL;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_orders_user
ON orders(user_id);

CREATE INDEX IF NOT EXISTS idx_orders_session
ON orders(session_id);

CREATE INDEX IF NOT EXISTS idx_orders_created_at
ON orders(created_at);

-- =========================
-- ORDER ITEMS
-- =========================

CREATE TABLE IF NOT EXISTS order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid()
);

ALTER TABLE order_items
ADD COLUMN IF NOT EXISTS order_id uuid,
ADD COLUMN IF NOT EXISTS product_id uuid,
ADD COLUMN IF NOT EXISTS product_name text,
ADD COLUMN IF NOT EXISTS product_image text,
ADD COLUMN IF NOT EXISTS quantity integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS unit_price numeric(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_price numeric(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'order_items_order_id_fkey'
    ) THEN
        ALTER TABLE order_items
        ADD CONSTRAINT order_items_order_id_fkey
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'order_items_product_id_fkey'
    ) THEN
        ALTER TABLE order_items
        ADD CONSTRAINT order_items_product_id_fkey
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE SET NULL;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_order_items_order
ON order_items(order_id);