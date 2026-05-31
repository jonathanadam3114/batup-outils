import { PublicToolLayout } from '@/components/PublicToolLayout';
import { SituationTravauxCalculator } from '@/components/SituationTravauxCalculator';
import { situationTravauxCopy } from '@/content/situation-travaux-copy';
import { situationTravauxFAQ } from '@/content/situation-travaux-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurSituationTravaux() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${situationTravauxCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: situationTravauxCopy.seo.title,
        description: situationTravauxCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={situationTravauxCopy.webApplication.name}
      webApplicationDescription={situationTravauxCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de situation de travaux', url: canonicalUrl },
      ]}
      heroH1={situationTravauxCopy.hero.h1}
      heroLede={situationTravauxCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-situation-travaux`}
      ctaBannerTitle={situationTravauxCopy.ctaBanner.title}
      ctaBannerSubtitle={situationTravauxCopy.ctaBanner.subtitle}
      methodology={situationTravauxCopy.methodology}
      faqItems={situationTravauxFAQ}
    >
      <SituationTravauxCalculator />
    </PublicToolLayout>
  );
}
