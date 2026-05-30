import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, Product } from '../lib/supabase';
import { useAuth } from './AuthContext';

type WishlistItem = {
  id: string;
  product: Product;
  created_at: string;
};

type WishlistContextType = {
  items: WishlistItem[];
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  loading: boolean;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }

    const { data } = await supabase
      .from('wishlist_items')
      .select('*, products(*), product(*)')
      .eq('user_id', user.id);

    if (data) {
      setItems(
        data
          .map((item: any) => ({
            id: item.id,
            product: item.products || item.product,
            created_at: item.created_at,
          }))
          .filter((item: WishlistItem) => item.product)
      );
    }
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const isInWishlist = useCallback(
    (productId: string) => items.some((i) => i.product.id === productId),
    [items]
  );

  const addToWishlist = async (product: Product) => {
    if (!user) return;

    setLoading(true);
    const { data } = await supabase
      .from('wishlist_items')
      .insert({ user_id: user.id, product_id: product.id })
      .select('id, created_at')
      .single();

    if (data) {
      setItems((prev) => [...prev, { id: data.id, product, created_at: data.created_at }]);
    }
    setLoading(false);
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;

    await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);

    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ items, isInWishlist, addToWishlist, removeFromWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
