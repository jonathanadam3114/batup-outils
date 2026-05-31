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
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import { PublicNav } from '@/components/PublicNav';
import { PublicFooter } from '@/components/PublicFooter';
import { SEOHead } from '@/lib/seo-head';
import { siteOrigin } from '@/lib/urls';

interface Tool {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SECTIONS: { title: string; tools: Tool[] }[] = [
  {
    title: 'Pricing & marge',
    tools: [
      {
        href: '/calculateur-taux-horaire-btp',
        icon: <Clock className="h-6 w-6" />,
        title: 'Calculateur de taux horaire BTP',
        description:
          "Combien dois-je facturer l'heure pour couvrir mes charges et dégager une vraie marge ?",
      },
      {
        href: '/calculateur-prix-chantier-btp',
        icon: <FileText className="h-6 w-6" />,
        title: 'Calculateur de prix de chantier',
        description:
          "Quel prix de vente HT viser pour un chantier rentable, sans surprise sur la marge ?",
      },
      {
        href: '/calculateur-marge-nette-coefficient-btp',
        icon: <Percent className="h-6 w-6" />,
        title: 'Marge nette ↔ coefficient',
        description:
          'Convertissez en un clic un coefficient en marge nette (ou l’inverse), avec le prix de vente correspondant.',
      },
      {
        href: '/calculateur-revision-prix-index-bt',
        icon: <TrendingUp className="h-6 w-6" />,
        title: 'Révision de prix Index BT',
        description:
          "Formule de révision CCAG-Travaux (P_n = P_0 × (0,15 + 0,85 × BT_n / BT_0)) — vérifiez votre clause en 30 secondes.",
      },
    ],
  },
  {
    title: 'Paie & RH',
    tools: [
      {
        href: '/calculateur-heures-supplementaires-btp',
        icon: <Calculator className="h-6 w-6" />,
        title: 'Heures sup BTP + paniers',
        description:
          'Heures supplémentaires 25 % / 50 %, paniers, indemnités de trajet, grand déplacement — convention collective bâtiment.',
      },
      {
        href: '/calculateur-cout-salarie-btp',
        icon: <Users className="h-6 w-6" />,
        title: 'Coût salarié employeur BTP',
        description:
          'Du brut au coût total employeur : charges patronales, CIBTP, coût horaire chargé pour vos devis.',
      },
      {
        href: '/calculateur-jours-intemperies-cibtp',
        icon: <CloudRain className="h-6 w-6" />,
        title: "Jours d'intempéries CIBTP",
        description:
          "Indemnisation 75 % du salaire horaire, carence 1 h, plafond 55 j/an — calcul en un clic pour votre dossier CIBTP.",
      },
      {
        href: '/calculateur-prime-anciennete-ccn-batiment',
        icon: <Award className="h-6 w-6" />,
        title: "Prime d'ancienneté CCN bâtiment",
        description:
          "Barème national 2 → 15 % selon les années dans l'entreprise. Prime mensuelle, annuelle et coût employeur chargé.",
      },
    ],
  },
  {
    title: 'Fiscal & légal',
    tools: [
      {
        href: '/calculateur-tva-autoliquidation-btp',
        icon: <Receipt className="h-6 w-6" />,
        title: 'TVA autoliquidation sous-traitance',
        description:
          'Suis-je en autoliquidation ? Quelle mention exacte mettre sur la facture ? Article 283-2 nonies du CGI.',
      },
      {
        href: '/generateur-mention-tva-facture-btp',
        icon: <FileCheck2 className="h-6 w-6" />,
        title: 'Générateur de mention TVA',
        description:
          "TVA 20 % / 10 % / 5,5 % / autoliquidation / franchise — la bonne mention selon votre client et vos travaux.",
      },
      {
        href: '/calculateur-charges-sociales-artisan-btp',
        icon: <Wallet className="h-6 w-6" />,
        title: 'Charges sociales artisan BTP',
        description:
          'Cotisations URSSAF, retraite, CSG-CRDS selon votre statut (micro, EI, EURL, SARL, SAS) — barème 2026.',
      },
      {
        href: '/comparateur-statut-juridique-artisan-btp',
        icon: <Scale className="h-6 w-6" />,
        title: 'Comparateur de statut juridique',
        description:
          'Micro, EI, EURL, SARL ou SAS pour votre activité BTP ? Wizard en 4 questions avec recommandation.',
      },
      {
        href: '/verificateur-mentions-obligatoires-facture-devis-btp',
        icon: <CheckSquare className="h-6 w-6" />,
        title: 'Vérificateur mentions obligatoires',
        description:
          "Checklist conformité facture / devis BTP : SIRET, décennale, médiateur, pénalités — qu'avez-vous oublié ?",
      },
    ],
  },
  {
    title: 'Cash, marchés & assurances',
    tools: [
      {
        href: '/calculateur-situation-travaux',
        icon: <Activity className="h-6 w-6" />,
        title: 'Situation de travaux (acompte)',
        description:
          "% d'avancement × marché − déjà facturé − retenue : votre situation mensuelle calculée en un clin d'œil.",
      },
      {
        href: '/calculateur-dgd-decompte-general-definitif',
        icon: <Sparkles className="h-6 w-6" />,
        title: 'DGD — décompte général définitif',
        description:
          "Marché initial + avenants + révisions − pénalités − retenue = solde final. La trésorerie de fin de chantier.",
      },
      {
        href: '/calculateur-retenue-de-garantie',
        icon: <Coins className="h-6 w-6" />,
        title: 'Retenue de garantie 5 %',
        description:
          'Montant retenu, date de libération, alternative caution bancaire — Loi 71-584.',
      },
      {
        href: '/simulateur-decennale-btp',
        icon: <ShieldCheck className="h-6 w-6" />,
        title: 'Simulateur garantie décennale',
        description:
          'Fourchette de prix estimée pour votre métier, ancienneté et chiffre d’affaires — 10 corps de métier.',
      },
      {
        href: '/simulateur-rc-pro-btp',
        icon: <HardHat className="h-6 w-6" />,
        title: 'Simulateur RC Pro BTP',
        description:
          "Estimation de votre cotisation Responsabilité Civile Professionnelle — pack possible avec décennale.",
      },
      {
        href: '/calculateur-roi-certification-rge',
        icon: <Sun className="h-6 w-6" />,
        title: 'ROI certification RGE',
        description:
          "Coût audit + temps formation vs revenu MaPrimeRénov : le label RGE est-il rentable pour vous ?",
      },
    ],
  },
];

export default function Home() {
  const base = siteOrigin();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SEOHead
        title="19 outils BTP gratuits — calculateurs taux horaire, marge, TVA, paie, décennale | Batup"
        description="19 calculateurs gratuits pour artisans et PME du BTP : taux horaire, marge, heures sup, coût salarié, TVA autoliquidation, charges sociales, situation, DGD, retenue, décennale, RC Pro, RGE. Sans inscription."
        canonicalUrl={`${base}/`}
      />
      <PublicNav />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-[#f5f5ff] via-white to-white py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              19 outils BTP gratuits
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 sm:text-lg">
              Pricing, paie, fiscalité, trésorerie, assurances : tous les calculs critiques d'une
              entreprise BTP, dans un outil dédié pour chacun. Sans inscription, sans
              installation, en quelques secondes.
            </p>
          </div>
        </section>

        {SECTIONS.map((section, idx) => (
          <section
            key={section.title}
            className={idx % 2 === 0 ? 'bg-white py-14' : 'bg-gray-50 py-14'}
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {section.title}
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {section.tools.map((tool) => (
                  <ToolCard key={tool.href} {...tool} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <PublicFooter />
    </div>
  );
}

function ToolCard({ href, icon, title, description }: Tool) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 transition-all group-hover:gap-2">
        Ouvrir l'outil
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
