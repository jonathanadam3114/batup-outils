import { PublicToolLayout } from '@/components/PublicToolLayout';
import { PrimeAncienneteCalculator } from '@/components/PrimeAncienneteCalculator';
import { primeAncienneteCopy } from '@/content/prime-anciennete-copy';
import { primeAncienneteFAQ } from '@/content/prime-anciennete-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurPrimeAnciennete() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${primeAncienneteCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: primeAncienneteCopy.seo.title,
        description: primeAncienneteCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={primeAncienneteCopy.webApplication.name}
      webApplicationDescription={primeAncienneteCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: "Calculateur prime d'ancienneté CCN bâtiment", url: canonicalUrl },
      ]}
      heroH1={primeAncienneteCopy.hero.h1}
      heroLede={primeAncienneteCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-prime-anciennete-ccn`}
      ctaBannerTitle={primeAncienneteCopy.ctaBanner.title}
      ctaBannerSubtitle={primeAncienneteCopy.ctaBanner.subtitle}
      methodology={primeAncienneteCopy.methodology}
      faqItems={primeAncienneteFAQ}
    >
      <PrimeAncienneteCalculator />
    </PublicToolLayout>
  );
}
