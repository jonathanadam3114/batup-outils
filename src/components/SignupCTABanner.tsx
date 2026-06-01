import { ArrowRight, Check } from 'lucide-react';
import { APP_BASE, MARKETING_BASE } from '@/lib/urls';

/**
 * CTA banner aligné sur batup.fr (CTA.astro) :
 * - Carte dark anthracite arrondie avec halos violets internes
 * - Mockup app en biais qui sort à droite avec fondu transparent (desktop)
 * - Titre + sous-titre libres (props), 2 CTAs (gradient + outline), trust signals
 * - Wrapper white avec rounded-t-[60px] pour effet "scoop" naturel au-dessus
 *   du footer dark.
 */

interface SignupCTABannerProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  signupHref?: string;
  demoHref?: string;
}

const CTA_GRADIENT = 'linear-gradient(135deg, #BFC6F4, #7076F1, #5368EE)';

export function SignupCTABanner({
  title = 'Ne perdez plus d’argent sur vos prochains chantiers',
  subtitle = 'Pilotez vos charges, vos marges et vos devis en temps réel avec BatUp. Essai gratuit, sans carte bancaire.',
  ctaLabel = 'Essayer BatUp gratuitement',
  signupHref = `${APP_BASE}/signup`,
  demoHref = `${MARKETING_BASE}/demander-une-demo`,
}: SignupCTABannerProps) {
  return (
    <section className="relative z-10 overflow-hidden bg-white pt-4 pb-10 lg:pb-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Carte centrale dark — rectangle anthracite flottant */}
        <div
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-6 py-12 shadow-2xl sm:px-10 lg:px-14 lg:py-16"
          style={{ backgroundColor: '#151515' }}
        >
          {/* Halos violets internes */}
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(112,118,241,0.30) 0%, transparent 70%)',
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(191,198,244,0.20) 0%, transparent 70%)',
            }}
          />

          {/* Mockup app en biais qui sort à droite avec fondu transparent (desktop only) */}
          <div
            className="pointer-events-none absolute right-0 top-1/2 z-0 hidden w-[400px] lg:block"
            style={{
              transform: 'translateY(-50%) translateX(28%) rotate(-8deg)',
              WebkitMaskImage:
                'linear-gradient(90deg, black 0%, black 35%, transparent 100%)',
              maskImage: 'linear-gradient(90deg, black 0%, black 35%, transparent 100%)',
            }}
          >
            {/* Mock dashboard chantier */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: 'linear-gradient(135deg, #BFC6F4, #5368EE)' }}
                  >
                    <svg
                      className="h-4 w-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] leading-tight text-gray-500">Chantier #2847</p>
                    <p className="text-sm font-bold leading-tight text-gray-900">
                      Rénovation Villa
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">
                  En cours
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="mb-1.5 flex justify-between text-[10px] text-gray-500">
                  <span>Avancement chantier</span>
                  <span className="font-bold text-gray-900">68 %</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full w-[68%] rounded-full"
                    style={{ background: 'linear-gradient(90deg, #BFC6F4, #5368EE)' }}
                  />
                </div>
              </div>

              {/* KPI grid */}
              <div className="mb-4 grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-gray-50 p-2.5">
                  <p className="text-[9px] uppercase tracking-wide text-gray-500">Devis</p>
                  <p className="text-sm font-extrabold text-gray-900">42 800 €</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-2.5">
                  <p className="text-[9px] uppercase tracking-wide text-gray-500">Marge</p>
                  <p className="text-sm font-extrabold text-green-600">+18 %</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-2.5">
                  <p className="text-[9px] uppercase tracking-wide text-gray-500">Équipe</p>
                  <p className="text-sm font-extrabold text-gray-900">5</p>
                </div>
              </div>

              {/* Planning rows */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className="h-6 w-1.5 rounded-full"
                    style={{ background: '#5368EE' }}
                  />
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold leading-tight text-gray-900">
                      Pose carrelage RDC
                    </p>
                    <p className="text-[9px] text-gray-500">Lun 04 – Mer 06 mai</p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-1.5 py-0.5 text-[9px] font-semibold text-blue-700">
                    Plomberie
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-6 w-1.5 rounded-full"
                    style={{ background: '#BFC6F4' }}
                  />
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold leading-tight text-gray-900">
                      Peinture étage
                    </p>
                    <p className="text-[9px] text-gray-500">Jeu 07 – Ven 08 mai</p>
                  </div>
                  <span className="rounded-full bg-orange-50 px-1.5 py-0.5 text-[9px] font-semibold text-orange-700">
                    Peinture
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-1.5 rounded-full bg-gray-300" />
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold leading-tight text-gray-900">
                      Livraison matériel
                    </p>
                    <p className="text-[9px] text-gray-500">Sam 09 mai</p>
                  </div>
                  <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-semibold text-gray-600">
                    Logistique
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu texte (à gauche sur desktop, centré sur mobile) */}
          <div className="relative z-10 max-w-2xl text-center lg:ml-0 lg:mr-auto lg:max-w-xl lg:text-left">
            <h2 className="mb-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-sm text-white/60 lg:mx-0 lg:text-base">
              {subtitle}
            </p>

            {/* Boutons */}
            <div className="mb-5 flex flex-col items-center justify-center gap-3 sm:flex-row lg:items-start lg:justify-start">
              <a
                href={signupHref}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: CTA_GRADIENT }}
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={demoHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                Demander une démo
              </a>
            </div>

            {/* Indicateurs de confiance inline */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/60 lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-[#BFC6F4]" />
                Essai gratuit 14 jours
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-[#BFC6F4]" />
                Sans carte bancaire
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-[#BFC6F4]" />
                Sans engagement
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
