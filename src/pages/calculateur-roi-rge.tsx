import { PublicToolLayout } from '@/components/PublicToolLayout';
import { RoiRgeCalculator } from '@/components/RoiRgeCalculator';
import { roiRgeCopy } from '@/content/roi-rge-copy';
import { roiRgeFAQ } from '@/content/roi-rge-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurRoiRge() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${roiRgeCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: roiRgeCopy.seo.title,
        description: roiRgeCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={roiRgeCopy.webApplication.name}
      webApplicationDescription={roiRgeCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur ROI certification RGE', url: canonicalUrl },
      ]}
      heroH1={roiRgeCopy.hero.h1}
      heroLede={roiRgeCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-roi-rge`}
      ctaBannerTitle={roiRgeCopy.ctaBanner.title}
      ctaBannerSubtitle={roiRgeCopy.ctaBanner.subtitle}
      methodology={roiRgeCopy.methodology}
      faqItems={roiRgeFAQ}
    >
      <RoiRgeCalculator />
    </PublicToolLayout>
  );
}
