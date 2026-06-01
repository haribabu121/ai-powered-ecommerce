import { Product } from '../lib/supabase';
import { getAvailableQuantityLabel } from '../lib/productQuantity';

type Props = {
  product: Pick<Product, 'name' | 'slug' | 'subcategory'>;
  className?: string;
};

export default function ProductAvailableQuantity({ product, className = '' }: Props) {
  return (
    <p
      className={`text-center text-xs sm:text-sm font-semibold text-slate-600 px-3 py-2.5 bg-slate-50/80 border-t border-slate-100 ${className}`}
    >
      {getAvailableQuantityLabel(product)}
    </p>
  );
}
