import { Link } from 'wouter';
import { APP_BASE, MARKETING_BASE } from '@/lib/urls';

interface FooterLink {
  href: string;
  label: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const SECTIONS: FooterSection[] = [
  {
    title: 'Pricing & marge',
    links: [
      { href: '/calculateur-taux-horaire-btp', label: 'Taux horaire BTP' },
      { href: '/calculateur-prix-chantier-btp', label: 'Prix de chantier' },
      { href: '/calculateur-marge-nette-coefficient-btp', label: 'Marge nette ↔ coefficient' },
      { href: '/calculateur-revision-prix-index-bt', label: 'Révision de prix Index BT' },
    ],
  },
  {
    title: 'Paie & RH',
    links: [
      { href: '/calculateur-heures-supplementaires-btp', label: 'Heures sup + paniers' },
      { href: '/calculateur-cout-salarie-btp', label: 'Coût salarié employeur' },
      { href: '/calculateur-jours-intemperies-cibtp', label: "Jours d'intempéries CIBTP" },
      { href: '/calculateur-prime-anciennete-ccn-batiment', label: "Prime d'ancienneté CCN" },
    ],
  },
  {
    title: 'Fiscal & légal',
    links: [
      { href: '/calculateur-tva-autoliquidation-btp', label: 'TVA autoliquidation' },
      { href: '/generateur-mention-tva-facture-btp', label: 'Générateur mention TVA' },
      { href: '/calculateur-charges-sociales-artisan-btp', label: 'Charges sociales artisan' },
      { href: '/comparateur-statut-juridique-artisan-btp', label: 'Comparateur statut juridique' },
      {
        href: '/verificateur-mentions-obligatoires-facture-devis-btp',
        label: 'Mentions obligatoires',
      },
    ],
  },
  {
    title: 'Cash, marchés & assurances',
    links: [
      { href: '/calculateur-situation-travaux', label: 'Situation de travaux' },
      { href: '/calculateur-dgd-decompte-general-definitif', label: 'DGD — décompte définitif' },
      { href: '/calculateur-retenue-de-garantie', label: 'Retenue de garantie 5 %' },
      { href: '/simulateur-decennale-btp', label: 'Garantie décennale' },
      { href: '/simulateur-rc-pro-btp', label: 'RC Pro BTP' },
      { href: '/calculateur-roi-certification-rge', label: 'ROI certification RGE' },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900">{section.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-6 border-t border-gray-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <a href={MARKETING_BASE}>
              <img src="/assets/logo-batup-marketing.png" alt="Batup" className="h-7 w-auto" />
            </a>
            <span className="text-sm text-gray-500">© {new Date().getFullYear()} Batup</span>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-gray-500">
            <a href={`${APP_BASE}/login`} className="transition-colors hover:text-gray-900">
              Connexion
            </a>
            <a href={`${APP_BASE}/signup`} className="transition-colors hover:text-gray-900">
              Essai gratuit
            </a>
          </nav>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Calculs fournis à titre indicatif sur la base des informations saisies — ne se
          substituent pas à un conseil comptable.
        </p>
      </div>
    </footer>
  );
}
