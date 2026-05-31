import { PublicToolLayout } from '@/components/PublicToolLayout';
import { MentionsObligatoiresChecker } from '@/components/MentionsObligatoiresChecker';
import { mentionsObligatoiresCopy } from '@/content/mentions-obligatoires-copy';
import { mentionsObligatoiresFAQ } from '@/content/mentions-obligatoires-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function VerificateurMentionsObligatoires() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${mentionsObligatoiresCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: mentionsObligatoiresCopy.seo.title,
        description: mentionsObligatoiresCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={mentionsObligatoiresCopy.webApplication.name}
      webApplicationDescription={mentionsObligatoiresCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        {
          name: 'Vérificateur mentions obligatoires facture & devis BTP',
          url: canonicalUrl,
        },
      ]}
      heroH1={mentionsObligatoiresCopy.hero.h1}
      heroLede={mentionsObligatoiresCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=verificateur-mentions-obligatoires`}
      ctaBannerTitle={mentionsObligatoiresCopy.ctaBanner.title}
      ctaBannerSubtitle={mentionsObligatoiresCopy.ctaBanner.subtitle}
      methodology={mentionsObligatoiresCopy.methodology}
      faqItems={mentionsObligatoiresFAQ}
    >
      <MentionsObligatoiresChecker />
    </PublicToolLayout>
  );
}
