import type { ReactNode } from 'react';
import { SEOHead } from '@/lib/seo-head';
import { APP_BASE } from '@/lib/urls';
import { PublicNav } from './PublicNav';
import { PublicFooter } from './PublicFooter';
import { MethodologySection } from './MethodologySection';
import { FAQAccordion, type FAQItem } from './FAQAccordion';
import { RelatedTools } from './RelatedTools';
import { SignupCTABanner } from './SignupCTABanner';

interface MethodologyBlock {
  heading: string;
  body: string;
}

interface PublicToolLayoutProps {
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    ogImageUrl?: string;
  };
  webApplicationName: string;
  webApplicationDescription: string;
  breadcrumb: { name: string; url: string }[];
  heroH1: string;
  heroLede: string;
  signupHref?: string;
  ctaBannerTitle?: string;
  ctaBannerSubtitle?: string;
  methodology: { title: string; intro?: string; blocks: MethodologyBlock[] };
  faqItems: FAQItem[];
  children: ReactNode;
}

export function PublicToolLayout({
  seo,
  webApplicationName,
  webApplicationDescription,
  breadcrumb,
  heroH1,
  heroLede,
  signupHref = `${APP_BASE}/signup`,
  ctaBannerTitle,
  ctaBannerSubtitle,
  methodology,
  faqItems,
  children,
}: PublicToolLayoutProps) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: webApplicationName,
      description: webApplicationDescription,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: seo.canonicalUrl,
      inLanguage: 'fr-FR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: { '@type': 'Answer', text: q.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumb.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: b.url,
      })),
    },
  ];

  return (
    // Fond outer en #f5f5ff (couleur de depart du gradient hero) pour eviter
    // toute "coupure" visible derriere la barre de menu transparente.
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: '#f5f5ff' }}>
      <SEOHead
        title={seo.title}
        description={seo.description}
        canonicalUrl={seo.canonicalUrl}
        ogImageUrl={seo.ogImageUrl}
        jsonLd={jsonLd}
      />
      <PublicNav signupHref={signupHref} />
      <main className="flex-1">
        {/* Hero aere : plus d'espace nav→H1, H1→sous-titre, sous-titre→outil */}
        <section className="bg-gradient-to-b from-[#f5f5ff] via-white to-white pt-16 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            {/* Pastille "RESSOURCE GRATUITE" coherente avec la pastille FAQ */}
            <span className="mb-5 inline-block rounded-full bg-brand-600/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 sm:mb-6 sm:text-sm">
              Ressource gratuite
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
              {heroH1}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:mt-7 sm:text-lg lg:mt-8">
              {heroLede}
            </p>
          </div>
        </section>

        <section className="bg-white pt-4 pb-16 lg:pt-6">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">{children}</div>
        </section>

        <MethodologySection {...methodology} />
        <FAQAccordion items={faqItems} />
        <RelatedTools />
        <SignupCTABanner
          title={ctaBannerTitle}
          subtitle={ctaBannerSubtitle}
          signupHref={signupHref}
        />
      </main>
      <PublicFooter />
    </div>
  );
}
