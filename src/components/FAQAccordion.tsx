import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title?: string;
  items: FAQItem[];
}

/**
 * FAQ accordion aligné sur batup.fr (FAQ.astro) :
 * - Section fond gris `#F5F6F8` avec scoop top (-mt-[60px] + rounded-t-[60px])
 * - Pastille "FAQ" violet clair en haut
 * - H2 centré "Questions fréquentes"
 * - Chaque question dans une card BLANCHE arrondie avec border light
 * - Une seule question ouverte à la fois (UX progressive disclosure)
 */
export function FAQAccordion({ title = 'Questions fréquentes', items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="relative z-0 -mt-[60px] overflow-hidden pt-20 pb-32 lg:pt-24 lg:pb-40"
      style={{
        backgroundColor: '#F5F6F8',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
      }}
      id="faq"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* En-tête : pastille FAQ + titre */}
        <div className="mb-12 text-center sm:mb-16">
          <span className="mb-4 inline-block rounded-full bg-brand-600/10 px-4 py-1.5 text-sm font-semibold text-brand-600">
            FAQ
          </span>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">{title}</h2>
        </div>

        {/* Liste des questions : cards blanches arrondies */}
        <div className="space-y-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-gray-50"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 text-base font-semibold text-gray-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="space-y-3 px-6 pb-6 leading-relaxed text-gray-600">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
