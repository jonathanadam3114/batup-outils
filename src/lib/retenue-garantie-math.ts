/**
 * Pure math for the BTP retenue-de-garantie (Loi n° 71-584 du 16 juillet 1971).
 * The legal cap is 5 % of the TTC amount, computed identically in the
 * standalone retenue calculator and inside the situation-de-travaux tool.
 */

/** Taux légal maximum de la retenue de garantie (5 % du TTC). */
export const RETENUE_GARANTIE_RATE = 0.05;

/** Montant TTC à partir d'un montant HT et d'un taux de TVA (en %). */
export function montantTTC(montantHT: number, tvaPct: number): number {
  return montantHT * (1 + tvaPct / 100);
}

/**
 * Retenue de garantie = 5 % du montant TTC.
 * Accepte directement un montant déjà TTC (utilisé par la situation de travaux).
 */
export function retenueGarantieFromTTC(ttc: number): number {
  return ttc * RETENUE_GARANTIE_RATE;
}

/** Retenue de garantie = 5 % du TTC, calculée depuis un montant HT + TVA. */
export function retenueGarantieFromHT(montantHT: number, tvaPct: number): number {
  return retenueGarantieFromTTC(montantTTC(montantHT, tvaPct));
}
