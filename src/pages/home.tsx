import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import {
  Activity,
  Award,
  ArrowRight,
  Calculator,
  CheckSquare,
  Clock,
  CloudRain,
  Coins,
  FileCheck2,
  FileText,
  HardHat,
  Percent,
  Receipt,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingUp,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { PublicNav } from '@/components/PublicNav';
import { PublicFooter } from '@/components/PublicFooter';
import { SEOHead } from '@/lib/seo-head';
import { siteOrigin } from '@/lib/urls';

type ToolType = 'Calculateur' | 'Simulateur' | 'Générateur' | 'Vérificateur' | 'Comparateur';
type Theme = 'Pricing & marge' | 'Paie & RH' | 'Fiscal & légal' | 'Trésorerie & marchés' | 'Assurances & aides';

interface Tool {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  type: ToolType;
  theme: Theme;
  popularity: number;
}

const TOOLS: Tool[] = [
  {
    href: '/calculateur-taux-horaire-btp',
    icon: <Clock className="h-6 w-6" />,
    title: 'Calculateur de taux horaire BTP',
    description: "Combien dois-je facturer l'heure pour couvrir mes charges et dégager une vraie marge ?",
    type: 'Calculateur',
    theme: 'Pricing & marge',
    popularity: 10,
  },
  {
    href: '/calculateur-prix-chantier-btp',
    icon: <FileText className="h-6 w-6" />,
    title: 'Calculateur de prix de chantier',
    description: 'Quel prix de vente HT viser pour un chantier rentable, sans surprise sur la marge ?',
    type: 'Calculateur',
    theme: 'Pricing & marge',
    popularity: 9,
  },
  {
    href: '/calculateur-marge-nette-coefficient-btp',
    icon: <Percent className="h-6 w-6" />,
    title: 'Marge nette et coefficient',
    description: "Convertissez en un clic un coefficient en marge nette (ou l'inverse), avec le prix de vente correspondant.",
    type: 'Calculateur',
    theme: 'Pricing & marge',
    popularity: 8,
  },
  {
    href: '/calculateur-revision-prix-index-bt',
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Révision de prix Index BT',
    description: "Formule CCAG-Travaux. Vérifiez votre clause de révision de prix en 30 secondes.",
    type: 'Calculateur',
    theme: 'Pricing & marge',
    popularity: 5,
  },
  {
    href: '/calculateur-heures-supplementaires-btp',
    icon: <Calculator className="h-6 w-6" />,
    title: 'Heures sup BTP + paniers',
    description: 'Heures supplémentaires 25 % / 50 %, paniers, indemnités de trajet, grand déplacement. Convention collective bâtiment.',
    type: 'Calculateur',
    theme: 'Paie & RH',
    popularity: 9,
  },
  {
    href: '/calculateur-cout-salarie-btp',
    icon: <Users className="h-6 w-6" />,
    title: 'Coût salarié employeur BTP',
    description: 'Du brut au coût total employeur : charges patronales, CIBTP, coût horaire chargé pour vos devis.',
    type: 'Calculateur',
    theme: 'Paie & RH',
    popularity: 8,
  },
  {
    href: '/calculateur-jours-intemperies-cibtp',
    icon: <CloudRain className="h-6 w-6" />,
    title: "Jours d'intempéries CIBTP",
    description: "Indemnisation 75 % du salaire, carence 1 h, plafond 55 j par an. Calcul en un clic pour votre dossier CIBTP.",
    type: 'Calculateur',
    theme: 'Paie & RH',
    popularity: 6,
  },
  {
    href: '/calculateur-prime-anciennete-ccn-batiment',
    icon: <Award className="h-6 w-6" />,
    title: "Prime d'ancienneté CCN bâtiment",
    description: "Barème national 2 à 15 % selon les années dans l'entreprise. Prime mensuelle, annuelle et coût employeur chargé.",
    type: 'Calculateur',
    theme: 'Paie & RH',
    popularity: 5,
  },
  {
    href: '/calculateur-tva-autoliquidation-btp',
    icon: <Receipt className="h-6 w-6" />,
    title: 'TVA autoliquidation sous-traitance',
    description: 'Suis-je en autoliquidation ? Quelle mention exacte mettre sur la facture ? Article 283-2 nonies du CGI.',
    type: 'Vérificateur',
    theme: 'Fiscal & légal',
    popularity: 7,
  },
  {
    href: '/generateur-mention-tva-facture-btp',
    icon: <FileCheck2 className="h-6 w-6" />,
    title: 'Générateur de mention TVA',
    description: 'TVA 20 %, 10 %, 5,5 %, autoliquidation, franchise. La bonne mention selon votre client et vos travaux.',
    type: 'Générateur',
    theme: 'Fiscal & légal',
    popularity: 7,
  },
  {
    href: '/calculateur-charges-sociales-artisan-btp',
    icon: <Wallet className="h-6 w-6" />,
    title: 'Charges sociales artisan BTP',
    description: 'Cotisations URSSAF, retraite, CSG-CRDS selon votre statut (micro, EI, EURL, SARL, SAS). Barème 2026.',
    type: 'Calculateur',
    theme: 'Fiscal & légal',
    popularity: 8,
  },
  {
    href: '/comparateur-statut-juridique-artisan-btp',
    icon: <Scale className="h-6 w-6" />,
    title: 'Comparateur de statut juridique',
    description: 'Micro, EI, EURL, SARL ou SAS pour votre activité BTP ? Wizard en 4 questions avec recommandation.',
    type: 'Comparateur',
    theme: 'Fiscal & légal',
    popularity: 6,
  },
  {
    href: '/verificateur-mentions-obligatoires-facture-devis-btp',
    icon: <CheckSquare className="h-6 w-6" />,
    title: 'Vérificateur mentions obligatoires',
    description: "Checklist conformité facture et devis BTP : SIRET, décennale, médiateur, pénalités. Qu'avez-vous oublié ?",
    type: 'Vérificateur',
    theme: 'Fiscal & légal',
    popularity: 5,
  },
  {
    href: '/calculateur-situation-travaux',
    icon: <Activity className="h-6 w-6" />,
    title: 'Situation de travaux (acompte)',
    description: "Avancement multiplié par le marché, moins déjà facturé, moins retenue. Votre situation mensuelle en un clin d'œil.",
    type: 'Calculateur',
    theme: 'Trésorerie & marchés',
    popularity: 7,
  },
  {
    href: '/calculateur-dgd-decompte-general-definitif',
    icon: <Sparkles className="h-6 w-6" />,
    title: 'DGD, décompte général définitif',
    description: 'Marché initial, avenants, révisions, pénalités, retenue. Le solde final pour la trésorerie de fin de chantier.',
    type: 'Calculateur',
    theme: 'Trésorerie & marchés',
    popularity: 5,
  },
  {
    href: '/calculateur-retenue-de-garantie',
    icon: <Coins className="h-6 w-6" />,
    title: 'Retenue de garantie 5 %',
    description: 'Montant retenu, date de libération, alternative caution bancaire. Loi 71-584.',
    type: 'Calculateur',
    theme: 'Trésorerie & marchés',
    popularity: 6,
  },
  {
    href: '/simulateur-decennale-btp',
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Simulateur garantie décennale',
    description: "Fourchette de prix estimée pour votre métier, ancienneté et chiffre d'affaires. 10 corps de métier.",
    type: 'Simulateur',
    theme: 'Assurances & aides',
    popularity: 8,
  },
  {
    href: '/simulateur-rc-pro-btp',
    icon: <HardHat className="h-6 w-6" />,
    title: 'Simulateur RC Pro BTP',
    description: 'Estimation de votre cotisation Responsabilité Civile Professionnelle. Pack possible avec décennale.',
    type: 'Simulateur',
    theme: 'Assurances & aides',
    popularity: 6,
  },
  {
    href: '/calculateur-roi-certification-rge',
    icon: <Sun className="h-6 w-6" />,
    title: 'ROI certification RGE',
    description: 'Coût audit et temps formation comparés au revenu MaPrimeRénov. Le label RGE est-il rentable pour vous ?',
    type: 'Calculateur',
    theme: 'Assurances & aides',
    popularity: 5,
  },
];

const ALL_TYPES: ToolType[] = ['Calculateur', 'Simulateur', 'Générateur', 'Vérificateur', 'Comparateur'];
const ALL_THEMES: Theme[] = ['Pricing & marge', 'Paie & RH', 'Fiscal & légal', 'Trésorerie & marchés', 'Assurances & aides'];

const TYPE_STYLES: Record<ToolType, { bg: string; text: string }> = {
  Calculateur: { bg: 'bg-brand-50', text: 'text-brand-700' },
  Simulateur: { bg: 'bg-sky-50', text: 'text-sky-700' },
  Générateur: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  Vérificateur: { bg: 'bg-amber-50', text: 'text-amber-700' },
  Comparateur: { bg: 'bg-rose-50', text: 'text-rose-700' },
};

type SortKey = 'popular' | 'alpha';

export default function Home() {
  const base = siteOrigin();
  const [query, setQuery] = useState('');
  const [activeTheme, setActiveTheme] = useState<Theme | 'Tous'>('Tous');
  const [activeType, setActiveType] = useState<ToolType | 'Tous'>('Tous');
  const [sort, setSort] = useState<SortKey>('popular');

  const themeCounts = useMemo(() => {
    const counts: Record<string, number> = { Tous: TOOLS.length };
    for (const t of ALL_THEMES) counts[t] = TOOLS.filter((x) => x.theme === t).length;
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = TOOLS.filter((t) => {
      if (activeTheme !== 'Tous' && t.theme !== activeTheme) return false;
      if (activeType !== 'Tous' && t.type !== activeType) return false;
      if (q && !`${t.title} ${t.description} ${t.type} ${t.theme}`.toLowerCase().includes(q)) return false;
      return true;
    });
    if (sort === 'popular') list = list.slice().sort((a, b) => b.popularity - a.popularity);
    else list = list.slice().sort((a, b) => a.title.localeCompare(b.title, 'fr'));
    return list;
  }, [query, activeTheme, activeType, sort]);

  const resetFilters = () => {
    setQuery('');
    setActiveTheme('Tous');
    setActiveType('Tous');
  };

  const hasFilters = query.trim() !== '' || activeTheme !== 'Tous' || activeType !== 'Tous';

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SEOHead
        title="19 outils BTP gratuits — calculateurs taux horaire, marge, TVA, paie, décennale | Batup"
        description="19 calculateurs et simulateurs gratuits pour artisans et PME du BTP : taux horaire, marge, heures sup, coût salarié, TVA autoliquidation, charges sociales, situation, DGD, retenue, décennale, RC Pro, RGE. Sans inscription."
        canonicalUrl={`${base}/`}
      />
      <PublicNav />
      <main className="flex-1">

        <section className="bg-gradient-to-b from-[#f5f5ff] via-white to-white pt-20 pb-12 sm:pt-24 sm:pb-14">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <span className="mb-5 inline-block rounded-full bg-brand-600/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 sm:text-sm">
              Ressources gratuites
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
              Tous nos outils BTP gratuits
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Pricing, paie, fiscalité, trésorerie, assurances. Les calculs critiques d'une entreprise BTP, dans un outil dédié pour chacun.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Gratuit
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Sans installation
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Résultat par mail
              </span>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-100 bg-white py-8 sm:py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un outil (taux horaire, marge, TVA...)"
                  className="h-11 w-full rounded-full border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Effacer la recherche"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Trier par</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="h-9 rounded-full border border-gray-200 bg-white px-3 text-sm font-medium text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="popular">Les plus utilisés</option>
                  <option value="alpha">Ordre alphabétique</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">Thématique</p>
              <div className="flex flex-wrap gap-2">
                <FilterChip
                  active={activeTheme === 'Tous'}
                  onClick={() => setActiveTheme('Tous')}
                  label="Tous"
                  count={themeCounts.Tous}
                />
                {ALL_THEMES.map((t) => (
                  <FilterChip
                    key={t}
                    active={activeTheme === t}
                    onClick={() => setActiveTheme(t)}
                    label={t}
                    count={themeCounts[t]}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">Type d'outil</p>
              <div className="flex flex-wrap gap-2">
                <FilterChip
                  active={activeType === 'Tous'}
                  onClick={() => setActiveType('Tous')}
                  label="Tous"
                />
                {ALL_TYPES.map((t) => (
                  <FilterChip
                    key={t}
                    active={activeType === t}
                    onClick={() => setActiveType(t)}
                    label={t}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{filtered.length}</span> outil{filtered.length > 1 ? 's' : ''} sur {TOOLS.length}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-medium text-brand-500 transition-colors hover:text-brand-700"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {filtered.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((tool) => (
                  <ToolCard key={tool.href} {...tool} />
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-md py-16 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <Search className="h-5 w-5" />
                </div>
                <p className="text-base font-semibold text-gray-900">Aucun outil ne correspond</p>
                <p className="mt-2 text-sm text-gray-600">
                  Essayez d'autres mots clés ou réinitialisez les filtres pour voir tous les outils.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Voir tous les outils
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors'
          : 'inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-brand-500/50 hover:text-brand-700'
      }
    >
      {label}
      {typeof count === 'number' && (
        <span className={active ? 'text-white/70' : 'text-gray-400'}>{count}</span>
      )}
    </button>
  );
}

function ToolCard({ href, icon, title, description, type, theme }: Tool) {
  const styles = TYPE_STYLES[type];
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lg"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
          {icon}
        </div>
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles.bg} ${styles.text}`}>
          {type}
        </span>
      </div>
      <h3 className="text-base font-bold text-gray-900 sm:text-lg">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{description}</p>
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
          {theme}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 transition-all group-hover:gap-2">
          Ouvrir
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
