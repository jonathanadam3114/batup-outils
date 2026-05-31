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
    <div className="flex min-h-screen flex-col bg-white">
      <SEOHead
        title={seo.title}
        description={seo.description}
        canonicalUrl={seo.canonicalUrl}
        ogImageUrl={seo.ogImageUrl}
        jsonLd={jsonLd}
      />
      <PublicNav signupHref={signupHref} />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-[#f5f5ff] via-white to-white pt-12 pb-8 sm:pt-16">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              {heroH1}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">{heroLede}</p>
          </div>
        </section>

        <section className="bg-white pb-16">
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
