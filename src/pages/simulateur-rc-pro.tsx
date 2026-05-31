import { PublicToolLayout } from '@/components/PublicToolLayout';
import { RcProSimulator } from '@/components/RcProSimulator';
import { rcProCopy } from '@/content/rc-pro-copy';
import { rcProFAQ } from '@/content/rc-pro-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function SimulateurRcPro() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${rcProCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: rcProCopy.seo.title,
        description: rcProCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={rcProCopy.webApplication.name}
      webApplicationDescription={rcProCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Simulateur RC Pro BTP', url: canonicalUrl },
      ]}
      heroH1={rcProCopy.hero.h1}
      heroLede={rcProCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=simulateur-rc-pro`}
      ctaBannerTitle={rcProCopy.ctaBanner.title}
      ctaBannerSubtitle={rcProCopy.ctaBanner.subtitle}
      methodology={rcProCopy.methodology}
      faqItems={rcProFAQ}
    >
      <RcProSimulator />
    </PublicToolLayout>
  );
}
