import { Link } from 'wouter';
import { APP_BASE, MARKETING_BASE } from '@/lib/urls';

/**
 * Footer aligné sur batup.fr : carte anthracite arrondie avec halos violets,
 * brand block + CTA, 4 colonnes de liens, bottom row + disclaimer.
 */

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const SECTIONS: FooterSection[] = [
  {
    title: 'Outils gratuits',
    links: [
      { href: '/calculateur-taux-horaire-btp', label: 'Taux horaire BTP' },
      { href: '/calculateur-marge-nette-coefficient-btp', label: 'Marge nette & coefficient' },
      { href: '/calculateur-tva-autoliquidation-btp', label: 'TVA autoliquidation' },
      { href: '/simulateur-decennale-btp', label: 'Garantie décennale' },
      { href: '/calculateur-situation-travaux', label: 'Situation de travaux' },
      { href: '/', label: 'Voir les 19 outils' },
    ],
  },
  {
    title: 'Logiciel BatUp',
    links: [
      {
        href: `${MARKETING_BASE}/assistant-ia-eva`,
        label: 'Eva, assistante IA',
        external: true,
      },
      {
        href: `${MARKETING_BASE}/logiciel-devis-facture-batiment`,
        label: 'Devis & facturation',
        external: true,
      },
      { href: `${MARKETING_BASE}/crm-btp`, label: 'CRM BTP', external: true },
      {
        href: `${MARKETING_BASE}/planning-chantier`,
        label: 'Planning chantier',
        external: true,
      },
      {
        href: `${MARKETING_BASE}/pointage-chantier`,
        label: 'Pointage chantier',
        external: true,
      },
      {
        href: `${MARKETING_BASE}/logiciel-sirh-btp`,
        label: 'SIRH : congés & paie',
        external: true,
      },
      {
        href: `${MARKETING_BASE}/rentabilite-chantier-btp`,
        label: 'Rentabilité chantier',
        external: true,
      },
    ],
  },
  {
    title: 'Produit',
    links: [
      {
        href: `${MARKETING_BASE}/tarifs-logiciel-btp`,
        label: 'Tarifs',
        external: true,
      },
      {
        href: `${MARKETING_BASE}/demander-une-demo`,
        label: 'Demander une démo',
        external: true,
      },
      {
        href: `${MARKETING_BASE}/centre-aide`,
        label: "Centre d'aide",
        external: true,
      },
      { href: `${APP_BASE}/signup`, label: "S'inscrire", external: true },
      { href: `${APP_BASE}/login`, label: 'Se connecter', external: true },
    ],
  },
  {
    title: 'Légal',
    links: [
      {
        href: `${MARKETING_BASE}/mentions-legales`,
        label: 'Mentions légales',
        external: true,
      },
      { href: `${MARKETING_BASE}/cgu`, label: 'CGU', external: true },
      { href: `${MARKETING_BASE}/cgv`, label: 'CGV', external: true },
      {
        href: `${MARKETING_BASE}/politique-de-confidentialite`,
        label: 'Confidentialité',
        external: true,
      },
      {
        href: `${MARKETING_BASE}/politique-cookies`,
        label: 'Cookies',
        external: true,
      },
    ],
  },
];

const SIGNUP_GRADIENT = 'linear-gradient(135deg, #BFC6F4, #7076F1, #5368EE)';

export function PublicFooter() {
  return (
    <footer className="bg-white py-8 lg:py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl text-white"
          style={{ backgroundColor: '#151515' }}
        >
          {/* Halos décoratifs */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(83,104,238,0.20) 0%, transparent 70%)',
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(191,198,244,0.10) 0%, transparent 70%)',
            }}
          />

          <div className="relative px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-8">
              {/* Brand block */}
              <div className="col-span-2 lg:col-span-3">
                <a href={MARKETING_BASE} className="mb-5 inline-flex items-center gap-2">
                  <img
                    src="/assets/logo-batup-marketing.png"
                    alt="BatUp"
                    className="h-9 w-auto"
                  />
                </a>
                <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/60">
                  Les outils gratuits de la suite BatUp pour les artisans, TPE et PME du
                  bâtiment. Calculez vos taux, vos marges et vos charges en quelques
                  secondes, sans inscription.
                </p>

                {/* CTA Demander une démo */}
                <a
                  href={`${MARKETING_BASE}/demander-une-demo`}
                  className="mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  style={{ background: SIGNUP_GRADIENT }}
                >
                  Demander une démo
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>

              {/* 4 colonnes de liens */}
              <div className="col-span-2 grid grid-cols-2 gap-6 lg:col-span-9 lg:grid-cols-4 lg:gap-8">
                {SECTIONS.map((section) => (
                  <div key={section.title}>
                    <h3 className="mb-4 text-sm font-bold text-white">{section.title}</h3>
                    <ul className="space-y-2.5">
                      {section.links.map((link) =>
                        link.external ? (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              className="text-sm text-white/60 transition-colors hover:text-white"
                            >
                              {link.label}
                            </a>
                          </li>
                        ) : (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="text-sm text-white/60 transition-colors hover:text-white"
                            >
                              {link.label}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row : copyright + trust signals */}
            <div className="mt-12 flex flex-col items-start gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-white/40">
                © {new Date().getFullYear()} BatUp — Tous droits réservés
              </span>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/40">
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-flex h-3 w-4 shrink-0 overflow-hidden rounded-sm border border-white/20">
                    <span className="h-full w-1/3" style={{ background: '#0055A4' }} />
                    <span className="h-full w-1/3 bg-white" />
                    <span className="h-full w-1/3" style={{ background: '#EF4135' }} />
                  </span>
                  Hébergé en France
                </span>
                <span className="hidden h-3 w-px bg-white/15 sm:inline-block" />
                <span>Conçu par un pro du BTP</span>
                <span className="hidden h-3 w-px bg-white/15 sm:inline-block" />
                <span>Compatible facture électronique 2026</span>
              </div>
            </div>

            {/* Disclaimer outils */}
            <p className="mt-6 border-t border-white/5 pt-4 text-[11px] leading-relaxed text-white/35">
              Calculs fournis à titre indicatif sur la base des informations saisies — ne
              se substituent pas à un conseil comptable, juridique ou fiscal.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
