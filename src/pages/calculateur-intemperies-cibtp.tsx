import { PublicToolLayout } from '@/components/PublicToolLayout';
import { IntemperiesCibtpCalculator } from '@/components/IntemperiesCibtpCalculator';
import { intemperiesCibtpCopy } from '@/content/intemperies-cibtp-copy';
import { intemperiesCibtpFAQ } from '@/content/intemperies-cibtp-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurIntemperiesCibtp() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${intemperiesCibtpCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: intemperiesCibtpCopy.seo.title,
        description: intemperiesCibtpCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={intemperiesCibtpCopy.webApplication.name}
      webApplicationDescription={intemperiesCibtpCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: "Calculateur jours d'intempéries CIBTP", url: canonicalUrl },
      ]}
      heroH1={intemperiesCibtpCopy.hero.h1}
      heroLede={intemperiesCibtpCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-intemperies-cibtp`}
      ctaBannerTitle={intemperiesCibtpCopy.ctaBanner.title}
      ctaBannerSubtitle={intemperiesCibtpCopy.ctaBanner.subtitle}
      methodology={intemperiesCibtpCopy.methodology}
      faqItems={intemperiesCibtpFAQ}
    >
      <IntemperiesCibtpCalculator />
    </PublicToolLayout>
  );
}
