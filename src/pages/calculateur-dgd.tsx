import { PublicToolLayout } from '@/components/PublicToolLayout';
import { DGDCalculator } from '@/components/DGDCalculator';
import { dgdCopy } from '@/content/dgd-copy';
import { dgdFAQ } from '@/content/dgd-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurDGD() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${dgdCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: dgdCopy.seo.title,
        description: dgdCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={dgdCopy.webApplication.name}
      webApplicationDescription={dgdCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur DGD (décompte général définitif)', url: canonicalUrl },
      ]}
      heroH1={dgdCopy.hero.h1}
      heroLede={dgdCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-dgd`}
      ctaBannerTitle={dgdCopy.ctaBanner.title}
      ctaBannerSubtitle={dgdCopy.ctaBanner.subtitle}
      methodology={dgdCopy.methodology}
      faqItems={dgdFAQ}
    >
      <DGDCalculator />
    </PublicToolLayout>
  );
}
