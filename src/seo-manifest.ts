/**
 * SEO manifest — single source of truth for every public tool route.
 *
 * Imports each tool's copy + FAQ content and flattens it into one array that is
 * safe to consume from BOTH the Node/tsx prerender script and React components.
 *
 * IMPORTANT: keep this file free of any browser/React/DOM imports so it stays
 * importable from `scripts/prerender.ts` under plain tsx.
 */

// Pricing & marge
import { tauxHoraireCopy } from '@/content/taux-horaire-copy';
import { tauxHoraireFAQ } from '@/content/taux-horaire-faq';
import { prixChantierCopy } from '@/content/prix-chantier-copy';
import { prixChantierFAQ } from '@/content/prix-chantier-faq';
import { margeNetteCopy } from '@/content/marge-nette-copy';
import { margeNetteFAQ } from '@/content/marge-nette-faq';
import { revisionPrixIndexBTCopy } from '@/content/revision-prix-index-bt-copy';
import { revisionPrixIndexBTFAQ } from '@/content/revision-prix-index-bt-faq';

// Paie & RH
import { heuresSupCopy } from '@/content/heures-sup-copy';
import { heuresSupFAQ } from '@/content/heures-sup-faq';
import { coutSalarieCopy } from '@/content/cout-salarie-copy';
import { coutSalarieFAQ } from '@/content/cout-salarie-faq';
import { intemperiesCibtpCopy } from '@/content/intemperies-cibtp-copy';
import { intemperiesCibtpFAQ } from '@/content/intemperies-cibtp-faq';
import { primeAncienneteCopy } from '@/content/prime-anciennete-copy';
import { primeAncienneteFAQ } from '@/content/prime-anciennete-faq';

// Fiscal & légal
import { tvaAutoliquidationCopy } from '@/content/tva-autoliquidation-copy';
import { tvaAutoliquidationFAQ } from '@/content/tva-autoliquidation-faq';
import { mentionTvaCopy } from '@/content/mention-tva-copy';
import { mentionTvaFAQ } from '@/content/mention-tva-faq';
import { chargesSocialesCopy } from '@/content/charges-sociales-copy';
import { chargesSocialesFAQ } from '@/content/charges-sociales-faq';
import { statutJuridiqueCopy } from '@/content/statut-juridique-copy';
import { statutJuridiqueFAQ } from '@/content/statut-juridique-faq';
import { mentionsObligatoiresCopy } from '@/content/mentions-obligatoires-copy';
import { mentionsObligatoiresFAQ } from '@/content/mentions-obligatoires-faq';

// Cash, marchés & assurances
import { situationTravauxCopy } from '@/content/situation-travaux-copy';
import { situationTravauxFAQ } from '@/content/situation-travaux-faq';
import { dgdCopy } from '@/content/dgd-copy';
import { dgdFAQ } from '@/content/dgd-faq';
import { retenueGarantieCopy } from '@/content/retenue-garantie-copy';
import { retenueGarantieFAQ } from '@/content/retenue-garantie-faq';
import { decennaleCopy } from '@/content/decennale-copy';
import { decennaleFAQ } from '@/content/decennale-faq';
import { rcProCopy } from '@/content/rc-pro-copy';
import { rcProFAQ } from '@/content/rc-pro-faq';
import { roiRgeCopy } from '@/content/roi-rge-copy';
import { roiRgeFAQ } from '@/content/roi-rge-faq';

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export interface SeoMethodologyBlock {
  heading: string;
  body: string;
}

export interface SeoMethodology {
  title: string;
  intro?: string;
  blocks: SeoMethodologyBlock[];
}

export interface SeoRoute {
  path: string;
  title: string;
  description: string;
  webApplicationName: string;
  webApplicationDescription: string;
  /** Short human label used in breadcrumbs + the internal-link hub. */
  breadcrumbName: string;
  h1: string;
  lede: string;
  methodology: SeoMethodology;
  faq: SeoFaqItem[];
}

type ToolCopy = {
  seo: { title: string; description: string; canonicalPath: string };
  webApplication: { name: string; description: string };
  hero: { h1: string; lede: string };
  methodology: SeoMethodology;
};

function toRoute(copy: ToolCopy, faq: SeoFaqItem[], breadcrumbName: string): SeoRoute {
  return {
    path: copy.seo.canonicalPath,
    title: copy.seo.title,
    description: copy.seo.description,
    webApplicationName: copy.webApplication.name,
    webApplicationDescription: copy.webApplication.description,
    breadcrumbName,
    h1: copy.hero.h1,
    lede: copy.hero.lede,
    methodology: copy.methodology,
    faq,
  };
}

export const SEO_ROUTES: SeoRoute[] = [
  // Pricing & marge
  toRoute(tauxHoraireCopy, tauxHoraireFAQ, 'Calculateur de taux horaire BTP'),
  toRoute(prixChantierCopy, prixChantierFAQ, 'Calculateur de prix de chantier BTP'),
  toRoute(margeNetteCopy, margeNetteFAQ, 'Calculateur de marge nette et coefficient BTP'),
  toRoute(
    revisionPrixIndexBTCopy,
    revisionPrixIndexBTFAQ,
    'Calculateur de révision de prix BTP (Index BT)'
  ),

  // Paie & RH
  toRoute(heuresSupCopy, heuresSupFAQ, 'Calculateur heures supplémentaires BTP'),
  toRoute(coutSalarieCopy, coutSalarieFAQ, 'Calculateur coût salarié employeur BTP'),
  toRoute(intemperiesCibtpCopy, intemperiesCibtpFAQ, "Calculateur jours d'intempéries CIBTP"),
  toRoute(
    primeAncienneteCopy,
    primeAncienneteFAQ,
    "Calculateur prime d'ancienneté CCN bâtiment"
  ),

  // Fiscal & légal
  toRoute(tvaAutoliquidationCopy, tvaAutoliquidationFAQ, 'Calculateur TVA autoliquidation BTP'),
  toRoute(mentionTvaCopy, mentionTvaFAQ, 'Générateur de mention TVA facture BTP'),
  toRoute(
    chargesSocialesCopy,
    chargesSocialesFAQ,
    'Calculateur charges sociales artisan BTP'
  ),
  toRoute(
    statutJuridiqueCopy,
    statutJuridiqueFAQ,
    'Comparateur statut juridique artisan BTP'
  ),
  toRoute(
    mentionsObligatoiresCopy,
    mentionsObligatoiresFAQ,
    'Vérificateur mentions obligatoires facture & devis BTP'
  ),

  // Cash, marchés & assurances
  toRoute(situationTravauxCopy, situationTravauxFAQ, 'Calculateur de situation de travaux'),
  toRoute(dgdCopy, dgdFAQ, 'Calculateur DGD (décompte général définitif)'),
  toRoute(retenueGarantieCopy, retenueGarantieFAQ, 'Calculateur de retenue de garantie'),
  toRoute(decennaleCopy, decennaleFAQ, 'Simulateur garantie décennale BTP'),
  toRoute(rcProCopy, rcProFAQ, 'Simulateur RC Pro BTP'),
  toRoute(roiRgeCopy, roiRgeFAQ, 'Calculateur ROI certification RGE'),
];

/** Quick lookup by route path. */
export const SEO_ROUTE_BY_PATH: Record<string, SeoRoute> = Object.fromEntries(
  SEO_ROUTES.map((r) => [r.path, r])
);
