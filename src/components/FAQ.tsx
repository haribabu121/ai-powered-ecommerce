import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'Do you ship overseas?',
    answer:
      'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. You can see available options at checkout.',
  },
  {
    question: 'How long will it take to get my orders?',
    answer:
      'Standard delivery usually takes 3–7 business days within the US and Canada. Express shipping is available at checkout for faster delivery.',
  },
  {
    question: 'Is it compatible with iPhone & Android?',
    answer:
      'Our app and mobile site work on both iPhone and Android. You can shop, track orders, and manage your account from any modern smartphone browser.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#f5f5f5] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left column */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">FAQ</h2>
            <p className="mt-6 text-lg font-medium text-slate-900">Still Need Help?</p>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-sm">
              Our customer support is available Monday to Friday: 6 am–3pm ET.
            </p>
            <p className="mt-1 text-sm text-slate-600">Average answer time: 24h</p>
            <a
              href="mailto:hello@martx.com"
              className="inline-block mt-8 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium text-sm px-8 py-3.5 rounded-full transition-colors shadow-sm"
            >
              Contact Support
            </a>
          </div>

          {/* Right column — accordion */}
          <div className="bg-[#ebebeb] rounded-2xl overflow-hidden">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              const isLast = index === FAQ_ITEMS.length - 1;

              return (
                <div key={item.question} className={!isLast ? 'border-b border-slate-300/60' : ''}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-black/[0.02] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm md:text-base font-medium text-slate-800 pr-2">
                      {item.question}
                    </span>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-300/80 flex items-center justify-center">
                      <ChevronDown
                        size={18}
                        className={`text-slate-600 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 -mt-1">
                      <p className="text-sm text-slate-600 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
