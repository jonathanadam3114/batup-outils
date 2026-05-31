/**
 * Build-time prerender for the batup-outils SPA.
 *
 * Runs AFTER `vite build` (see package.json `build` script). For each route in
 * the SEO manifest it rewrites `dist/index.html` into a per-route static file
 * with full <head> SEO (title, description, canonical, OG, Twitter, JSON-LD)
 * plus a visible pre-hydration HTML block inside #root so search engines and AI
 * crawlers get the real text content without executing JS.
 *
 * React mounts with `createRoot().render()` (NOT hydrateRoot — see src/main.tsx),
 * so this static markup is simply replaced on mount: no hydration mismatch.
 *
 * Node built-ins only; ESM (package is `type: module`).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_ROUTES, type SeoRoute } from '../src/seo-manifest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://outils.batup.fr';
const OG_IMAGE = SITE + '/assets/logo-batup-marketing.png';

// Home page SEO — mirrors the <SEOHead> values in src/pages/home.tsx.
const HOME = {
  title:
    '19 outils BTP gratuits — calculateurs taux horaire, marge, TVA, paie, décennale | Batup',
  description:
    '19 calculateurs gratuits pour artisans et PME du BTP : taux horaire, marge, heures sup, coût salarié, TVA autoliquidation, charges sociales, situation, DGD, retenue, décennale, RC Pro, RGE. Sans inscription.',
  h1: '19 outils BTP gratuits',
  lede: "Pricing, paie, fiscalité, trésorerie, assurances : tous les calculs critiques d'une entreprise BTP, dans un outil dédié pour chacun. Sans inscription, sans installation, en quelques secondes.",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Replace the <title> contents in the template. */
function setTitle(html: string, title: string): string {
  return html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
}

/** Insert markup immediately before </head>. */
function injectHead(html: string, head: string): string {
  return html.replace('</head>', `${head}\n  </head>`);
}

/** Insert markup between <div id="root"> and its closing tag. */
function injectRoot(html: string, body: string): string {
  return html.replace(
    /<div id="root">\s*<\/div>/,
    `<div id="root">${body}</div>`
  );
}

/**
 * Strip the template's default per-route-overridable meta so each prerendered
 * page ends up with exactly ONE description / og:* / twitter:* of each kind.
 * Keeps static brand tags (og:site_name, charset, viewport, icon, theme-color).
 */
function stripTemplateMeta(html: string): string {
  const patterns: RegExp[] = [
    /\s*<meta\s+name="description"[\s\S]*?>/gi,
    /\s*<meta\s+property="og:type"[^>]*>/gi,
    /\s*<meta\s+property="og:locale"[^>]*>/gi,
    /\s*<meta\s+property="og:title"[\s\S]*?>/gi,
    /\s*<meta\s+property="og:description"[\s\S]*?>/gi,
    /\s*<meta\s+property="og:image"[^>]*>/gi,
    /\s*<meta\s+name="twitter:card"[^>]*>/gi,
    /\s*<meta\s+name="twitter:image"[^>]*>/gi,
  ];
  return patterns.reduce((acc, re) => acc.replace(re, ''), html);
}

function jsonLdScript(obj: unknown): string {
  // JSON.stringify already escapes the dangerous characters for a <script> JSON
  // context except the closing-tag sequence; guard against `</script>`.
  const json = JSON.stringify(obj).replace(/<\//g, '<\\/');
  return `<script type="application/ld+json">${json}</script>`;
}

/** The full 19-route internal-link hub, rendered on every page. */
function navHub(): string {
  const links = SEO_ROUTES.map(
    (r) => `<a href="${r.path}">${escapeHtml(r.breadcrumbName)}</a>`
  ).join('');
  return `<nav aria-label="Tous les outils BTP">${links}</nav>`;
}

function headMeta(opts: {
  title: string;
  description: string;
  url: string;
}): string {
  const { title, description, url } = opts;
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  return [
    `<meta name="description" content="${d}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${t}">`,
    `<meta property="og:description" content="${d}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${OG_IMAGE}">`,
    `<meta property="og:locale" content="fr_FR">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${t}">`,
    `<meta name="twitter:description" content="${d}">`,
    `<meta name="twitter:image" content="${OG_IMAGE}">`,
  ]
    .map((line) => `    ${line}`)
    .join('\n');
}

function routeJsonLd(route: SeoRoute, url: string): string {
  const webApplication = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: route.webApplicationName,
    description: route.webApplicationDescription,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url,
    inLanguage: 'fr-FR',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  };
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: route.faq.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: route.breadcrumbName, item: url },
    ],
  };
  return [jsonLdScript(webApplication), jsonLdScript(faqPage), jsonLdScript(breadcrumb)]
    .map((line) => `    ${line}`)
    .join('\n');
}

function routeBodyContent(route: SeoRoute): string {
  const parts: string[] = [];
  parts.push(`<h1>${escapeHtml(route.h1)}</h1>`);
  parts.push(`<p>${escapeHtml(route.lede)}</p>`);

  parts.push(`<h2>${escapeHtml(route.methodology.title)}</h2>`);
  if (route.methodology.intro) {
    parts.push(`<p>${escapeHtml(route.methodology.intro)}</p>`);
  }
  for (const block of route.methodology.blocks) {
    parts.push(`<h3>${escapeHtml(block.heading)}</h3><p>${escapeHtml(block.body)}</p>`);
  }

  const faq = route.faq
    .map(
      (q) =>
        `<details><summary>${escapeHtml(q.question)}</summary><p>${escapeHtml(
          q.answer
        )}</p></details>`
    )
    .join('');
  parts.push(`<section><h2>Questions fréquentes</h2>${faq}</section>`);

  parts.push(navHub());
  return parts.join('');
}

function writePage(relPath: string, html: string): void {
  // relPath like '/calculateur-taux-horaire-btp' → dist/<path>/index.html
  const dir = relPath === '/' ? DIST : path.join(DIST, relPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
}

function main(): void {
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath} — run "vite build" first.`);
  }
  const template = stripTemplateMeta(fs.readFileSync(templatePath, 'utf8'));

  let count = 0;

  // Per-tool routes.
  for (const route of SEO_ROUTES) {
    const url = SITE + route.path;
    let html = setTitle(template, route.title);
    html = injectHead(html, headMeta({ title: route.title, description: route.description, url }));
    html = injectHead(html, routeJsonLd(route, url));
    html = injectRoot(html, routeBodyContent(route));
    writePage(route.path, html);
    count++;
  }

  // Home page (dist/index.html) — regenerated last so it overwrites the template.
  {
    const url = SITE + '/';
    let html = setTitle(template, HOME.title);
    html = injectHead(html, headMeta({ title: HOME.title, description: HOME.description, url }));
    const body = `<h1>${escapeHtml(HOME.h1)}</h1><p>${escapeHtml(HOME.lede)}</p>${navHub()}`;
    html = injectRoot(html, body);
    writePage('/', html);
    count++;
  }

  console.log(`[prerender] wrote ${count} static pages (${SEO_ROUTES.length} tools + 1 home)`);
}

main();
