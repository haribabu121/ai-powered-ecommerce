import { Product } from '../lib/supabase';
import { getProductDetails } from '../lib/productDetails';

type Props = {
  product: Product;
  onOrder?: () => void;
  orderDisabled?: boolean;
};

export default function ProductDetailsSection({ product, onOrder, orderDisabled }: Props) {
  const { generalDetails, benefits, specRows } = getProductDetails(product);

  return (
    <section className="mt-10 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">{product.name}</h2>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-900 mb-3">General Details</h3>
        <p className="text-slate-700 text-sm md:text-base leading-relaxed">{generalDetails}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Benefits:</h3>
        <ul className="space-y-4 list-disc pl-5 text-slate-700 text-sm md:text-base leading-relaxed">
          {benefits.map((benefit) => {
            const colon = benefit.indexOf(':');
            const hasTitle = colon > 0 && colon < 60;
            return (
              <li key={benefit.slice(0, 48)}>
                {hasTitle ? (
                  <>
                    <span className="font-bold text-slate-900">{benefit.slice(0, colon + 1)}</span>
                    {benefit.slice(colon + 1)}
                  </>
                ) : (
                  benefit
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {onOrder && (
        <button
          type="button"
          onClick={onOrder}
          disabled={orderDisabled}
          className="mb-10 px-8 py-3 rounded-full bg-[#8B5E3C] hover:bg-[#744d31] text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Order Now
        </button>
      )}

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Specifications</h3>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[320px] border-collapse text-sm">
            <thead>
              <tr className="bg-[#8B5E3C] text-white">
                <th className="text-left font-bold px-4 py-3 w-[38%]">Product Name</th>
                <th className="text-left font-bold px-4 py-3">{product.name}</th>
              </tr>
            </thead>
            <tbody>
              {specRows.map((row, index) => (
                <tr
                  key={row.label}
                  className={index % 2 === 0 ? 'bg-[#F5EDE4]' : 'bg-[#FAFAFA]'}
                >
                  <td className="font-bold text-slate-800 px-4 py-3 align-top border-t border-slate-200/80">
                    {row.label}
                  </td>
                  <td className="text-slate-700 px-4 py-3 align-top border-t border-slate-200/80">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
