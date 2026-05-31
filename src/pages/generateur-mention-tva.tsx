import { PublicToolLayout } from '@/components/PublicToolLayout';
import { MentionTvaGenerator } from '@/components/MentionTvaGenerator';
import { mentionTvaCopy } from '@/content/mention-tva-copy';
import { mentionTvaFAQ } from '@/content/mention-tva-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function GenerateurMentionTva() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${mentionTvaCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: mentionTvaCopy.seo.title,
        description: mentionTvaCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={mentionTvaCopy.webApplication.name}
      webApplicationDescription={mentionTvaCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Générateur de mention TVA facture BTP', url: canonicalUrl },
      ]}
      heroH1={mentionTvaCopy.hero.h1}
      heroLede={mentionTvaCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=generateur-mention-tva`}
      ctaBannerTitle={mentionTvaCopy.ctaBanner.title}
      ctaBannerSubtitle={mentionTvaCopy.ctaBanner.subtitle}
      methodology={mentionTvaCopy.methodology}
      faqItems={mentionTvaFAQ}
    >
      <MentionTvaGenerator />
    </PublicToolLayout>
  );
}
