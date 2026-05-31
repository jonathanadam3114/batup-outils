import { PublicToolLayout } from '@/components/PublicToolLayout';
import { RevisionPrixIndexBTCalculator } from '@/components/RevisionPrixIndexBTCalculator';
import { revisionPrixIndexBTCopy } from '@/content/revision-prix-index-bt-copy';
import { revisionPrixIndexBTFAQ } from '@/content/revision-prix-index-bt-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurRevisionPrixIndexBT() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${revisionPrixIndexBTCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: revisionPrixIndexBTCopy.seo.title,
        description: revisionPrixIndexBTCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={revisionPrixIndexBTCopy.webApplication.name}
      webApplicationDescription={revisionPrixIndexBTCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de révision de prix BTP (Index BT)', url: canonicalUrl },
      ]}
      heroH1={revisionPrixIndexBTCopy.hero.h1}
      heroLede={revisionPrixIndexBTCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-revision-prix-index-bt`}
      ctaBannerTitle={revisionPrixIndexBTCopy.ctaBanner.title}
      ctaBannerSubtitle={revisionPrixIndexBTCopy.ctaBanner.subtitle}
      methodology={revisionPrixIndexBTCopy.methodology}
      faqItems={revisionPrixIndexBTFAQ}
    >
      <RevisionPrixIndexBTCalculator />
    </PublicToolLayout>
  );
}
