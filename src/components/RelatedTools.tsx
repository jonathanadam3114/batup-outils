import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { SEO_ROUTE_BY_PATH } from '@/seo-manifest';

/**
 * Curated map of slug → related slugs. Each tool surfaces 3–4 contextually
 * relevant siblings to deepen internal linking and keep users on-site.
 */
const RELATED: Record<string, string[]> = {
  '/calculateur-taux-horaire-btp': [
    '/calculateur-prix-chantier-btp',
    '/calculateur-marge-nette-coefficient-btp',
    '/calculateur-cout-salarie-btp',
  ],
  '/calculateur-prix-chantier-btp': [
    '/calculateur-marge-nette-coefficient-btp',
    '/calculateur-taux-horaire-btp',
    '/calculateur-situation-travaux',
  ],
  '/calculateur-marge-nette-coefficient-btp': [
    '/calculateur-prix-chantier-btp',
    '/calculateur-taux-horaire-btp',
    '/calculateur-cout-salarie-btp',
  ],
  '/calculateur-revision-prix-index-bt': [
    '/calculateur-situation-travaux',
    '/calculateur-dgd-decompte-general-definitif',
    '/calculateur-prix-chantier-btp',
  ],
  '/calculateur-heures-supplementaires-btp': [
    '/calculateur-cout-salarie-btp',
    '/calculateur-jours-intemperies-cibtp',
    '/calculateur-prime-anciennete-ccn-batiment',
  ],
  '/calculateur-cout-salarie-btp': [
    '/calculateur-heures-supplementaires-btp',
    '/calculateur-prime-anciennete-ccn-batiment',
    '/calculateur-taux-horaire-btp',
  ],
  '/calculateur-jours-intemperies-cibtp': [
    '/calculateur-heures-supplementaires-btp',
    '/calculateur-cout-salarie-btp',
    '/calculateur-prime-anciennete-ccn-batiment',
  ],
  '/calculateur-prime-anciennete-ccn-batiment': [
    '/calculateur-cout-salarie-btp',
    '/calculateur-heures-supplementaires-btp',
    '/calculateur-jours-intemperies-cibtp',
  ],
  '/calculateur-tva-autoliquidation-btp': [
    '/generateur-mention-tva-facture-btp',
    '/verificateur-mentions-obligatoires-facture-devis-btp',
    '/calculateur-charges-sociales-artisan-btp',
  ],
  '/generateur-mention-tva-facture-btp': [
    '/calculateur-tva-autoliquidation-btp',
    '/verificateur-mentions-obligatoires-facture-devis-btp',
    '/calculateur-prix-chantier-btp',
  ],
  '/calculateur-charges-sociales-artisan-btp': [
    '/comparateur-statut-juridique-artisan-btp',
    '/calculateur-cout-salarie-btp',
    '/calculateur-taux-horaire-btp',
  ],
  '/comparateur-statut-juridique-artisan-btp': [
    '/calculateur-charges-sociales-artisan-btp',
    '/calculateur-cout-salarie-btp',
    '/simulateur-decennale-btp',
  ],
  '/verificateur-mentions-obligatoires-facture-devis-btp': [
    '/generateur-mention-tva-facture-btp',
    '/calculateur-tva-autoliquidation-btp',
    '/simulateur-decennale-btp',
  ],
  '/calculateur-situation-travaux': [
    '/calculateur-dgd-decompte-general-definitif',
    '/calculateur-retenue-de-garantie',
    '/calculateur-revision-prix-index-bt',
  ],
  '/calculateur-dgd-decompte-general-definitif': [
    '/calculateur-situation-travaux',
    '/calculateur-retenue-de-garantie',
    '/calculateur-revision-prix-index-bt',
  ],
  '/calculateur-retenue-de-garantie': [
    '/calculateur-situation-travaux',
    '/calculateur-dgd-decompte-general-definitif',
    '/calculateur-prix-chantier-btp',
  ],
  '/simulateur-decennale-btp': [
    '/simulateur-rc-pro-btp',
    '/calculateur-roi-certification-rge',
    '/comparateur-statut-juridique-artisan-btp',
  ],
  '/simulateur-rc-pro-btp': [
    '/simulateur-decennale-btp',
    '/calculateur-roi-certification-rge',
    '/comparateur-statut-juridique-artisan-btp',
  ],
  '/calculateur-roi-certification-rge': [
    '/simulateur-decennale-btp',
    '/simulateur-rc-pro-btp',
    '/calculateur-prix-chantier-btp',
  ],
};

interface RelatedToolsProps {
  /** Optional explicit path; falls back to window.location.pathname. */
  currentPath?: string;
}

export function RelatedTools({ currentPath }: RelatedToolsProps) {
  const pathname =
    currentPath ?? (typeof window !== 'undefined' ? window.location.pathname : '');
  const slugs = RELATED[pathname] ?? [];
  const related = slugs
    .map((slug) => SEO_ROUTE_BY_PATH[slug])
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  if (related.length === 0) return null;

  return (
    <section
      className="relative z-10 -mt-[60px] overflow-hidden bg-white pt-32 pb-12 lg:pt-40"
      style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Outils BTP complémentaires
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((tool) => (
            <Link
              key={tool.path}
              href={tool.path}
              className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900">{tool.breadcrumbName}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{tool.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 transition-all group-hover:gap-2">
                Ouvrir l'outil
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
