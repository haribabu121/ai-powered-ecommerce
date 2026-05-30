import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, Product } from '../lib/supabase';
import { getSessionId } from '../lib/session';
import { useAuth } from './AuthContext';

type CartItemLocal = {
  id: string;
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItemLocal[];
  itemCount: number;
  total: number;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemLocal[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = useCallback(async () => {
    let query = supabase
      .from('cartitems')
      .select('*, products(*)');

    if (user) {
      query = query.eq('user_id', user.id).is('session_id', null);
    } else {
      const sessionId = getSessionId();
      query = query.eq('session_id', sessionId).is('user_id', null);
    }

    const { data } = await query;

    if (data) {
      setItems(
        data.map((item: any) => ({
          id: item.id,
          product: item.products,
          quantity: item.quantity,
        })).filter((item: CartItemLocal) => item.product)
      );
    } else {
      setItems([]);
    }
  }, [user]);

  const mergeAnonymousCart = useCallback(async () => {
    const sessionId = getSessionId();
    if (!user || !sessionId) return;

    const { data: anonItems } = await supabase
      .from('cartitems')
      .select('*')
      .eq('session_id', sessionId)
      .is('user_id', null);

    if (!anonItems?.length) return;

    for (const anonItem of anonItems as any[]) {
      const { data: existingItem } = await supabase
        .from('cartitems')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', anonItem.product_id)
        .maybeSingle();

      if (existingItem) {
        await supabase
          .from('cartitems')
          .update({ quantity: existingItem.quantity + anonItem.quantity })
          .eq('id', existingItem.id);

        await supabase
          .from('cartitems')
          .delete()
          .eq('id', anonItem.id);
      } else {
        await supabase
          .from('cartitems')
          .update({ user_id: user.id, session_id: null })
          .eq('id', anonItem.id);
      }
    }
  }, [user]);

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      if (user) {
        await mergeAnonymousCart();
      }
      await fetchCart();
      setLoading(false);
    };

    loadCart();
  }, [fetchCart, mergeAnonymousCart, user]);

  const addToCart = async (product: Product, quantity = 1) => {
    setLoading(true);
    const existing = items.find((i) => i.product.id === product.id);

    if (existing) {
      const newQty = existing.quantity + quantity;
      if (user) {
        await supabase
          .from('cartitems')
          .update({ quantity: newQty })
          .eq('user_id', user.id)
          .eq('product_id', product.id);
      } else {
        const sessionId = getSessionId();
        await supabase
          .from('cartitems')
          .update({ quantity: newQty })
          .eq('session_id', sessionId)
          .eq('product_id', product.id);
      }
      setItems((prev) =>
        prev.map((i) => (i.product.id === product.id ? { ...i, quantity: newQty } : i))
      );
    } else {
      let insertData: any = { product_id: product.id, quantity };
      if (user) {
        insertData.user_id = user.id;
      } else {
        insertData.session_id = getSessionId();
      }

      const { data } = await supabase
        .from('cartitems')
        .insert(insertData)
        .select('*, products(*)')
        .single();
      if (data) {
        setItems((prev) => [...prev, { id: data.id, product: data.products, quantity: data.quantity }]);
      }
    }
    setLoading(false);
  };

  const removeFromCart = async (productId: string) => {
    if (user) {
      await supabase
          .from('cartitems')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);
    } else {
      const sessionId = getSessionId();
      await supabase
          .from('cartitems')
        .delete()
        .eq('session_id', sessionId)
        .eq('product_id', productId);
    }
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    if (user) {
      await supabase
          .from('cartitems')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', productId);
    } else {
      const sessionId = getSessionId();
      await supabase
          .from('cartitems')
        .update({ quantity })
        .eq('session_id', sessionId)
        .eq('product_id', productId);
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = async () => {
    if (user) {
      await supabase.from('cartitems').delete().eq('user_id', user.id);
    } else {
      const sessionId = getSessionId();
      await supabase.from('cartitems').delete().eq('session_id', sessionId);
    }
    setItems([]);
  };

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, itemCount, total, addToCart, removeFromCart, updateQuantity, clearCart, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
