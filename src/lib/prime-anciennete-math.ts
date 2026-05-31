/**
 * Pure math for the CCN prime-d'ancienneté calculator.
 * Extracted so the barème (3/6/9/12/15 % ouvriers, 1/2/3/4/5 % ETAM) can be
 * unit-tested independently of the React component.
 */

export type Contrat = 'ouvrier' | 'etam' | 'cadre';

export interface Palier {
  seuil: number;
  taux: number;
}

// CCN ouvriers du bâtiment (art. 6.2) — paliers de 3 ans, 3 % → 15 %.
export const PALIERS_OUVRIER: Palier[] = [
  { seuil: 15, taux: 0.15 },
  { seuil: 12, taux: 0.12 },
  { seuil: 9, taux: 0.09 },
  { seuil: 6, taux: 0.06 },
  { seuil: 3, taux: 0.03 },
];

// CCN ETAM bâtiment (art. 14) — paliers de 3 ans, plafond 5 %.
export const PALIERS_ETAM: Palier[] = [
  { seuil: 15, taux: 0.05 },
  { seuil: 12, taux: 0.04 },
  { seuil: 9, taux: 0.03 },
  { seuil: 6, taux: 0.02 },
  { seuil: 3, taux: 0.01 },
];

export function getPaliers(contrat: Contrat): Palier[] {
  if (contrat === 'ouvrier') return PALIERS_OUVRIER;
  if (contrat === 'etam') return PALIERS_ETAM;
  return [];
}

/** Taux applicable pour un nombre d'années (paliers triés par seuil décroissant). */
export function getTaux(annees: number, paliers: Palier[]): number {
  for (const p of paliers) {
    if (annees >= p.seuil) return p.taux;
  }
  return 0;
}

/** Prochain palier strictement au-dessus de l'ancienneté courante, ou null. */
export function nextPalier(annees: number, paliers: Palier[]): Palier | null {
  const sorted = [...paliers].sort((a, b) => a.seuil - b.seuil);
  for (const p of sorted) {
    if (annees < p.seuil) return p;
  }
  return null;
}

export interface PrimeAncienneteResult {
  applicable: boolean;
  annees: number;
  taux: number;
  primeMensuelle: number;
  primeAnnuelle: number;
}

/** Charges patronales BTP indicatives pour le coût employeur chargé. */
export const CHARGES_PATRONALES_BTP = 0.42;

/**
 * Prime mensuelle = brut × taux du palier. Non applicable aux cadres
 * (pas de barème conventionnel).
 */
export function computePrimeAnciennete(
  contrat: Contrat,
  salaireBrut: number,
  ancienneteAnnees: number,
): PrimeAncienneteResult {
  const applicable = contrat === 'ouvrier' || contrat === 'etam';
  const annees = Math.max(0, Math.floor(ancienneteAnnees));
  const brut = Math.max(0, salaireBrut);
  const taux = applicable ? getTaux(annees, getPaliers(contrat)) : 0;
  const primeMensuelle = brut * taux;
  return {
    applicable,
    annees,
    taux,
    primeMensuelle,
    primeAnnuelle: primeMensuelle * 12,
  };
}
