/**
 * Pure math for the BTP index-BT price-revision calculator (CCAG-Travaux
 * art. 10.4). Extracted so the révision formula can be unit-tested.
 *
 *   Pₙ = P₀ × (coefFixe + coefVariable × BTₙ / BT₀)
 *
 * Convention CCAG-Travaux : coefFixe 0,15 + coefVariable 0,85 = 1.
 */

export interface IndexBTInput {
  prixInitial: number;
  bt0: number;
  btn: number;
  coefFixe: number;
  coefVariable: number;
}

export interface IndexBTResult {
  ratio: number;
  coefRevision: number;
  prixRevise: number;
  ecartAbsolu: number;
  ecartRelatif: number;
}

/** Returns zeroed result when inputs are incomplete (price / indices <= 0). */
export function computeRevisionIndexBT(input: IndexBTInput): IndexBTResult {
  const { prixInitial, bt0, btn, coefFixe, coefVariable } = input;
  const valid =
    prixInitial > 0 &&
    bt0 > 0 &&
    btn > 0 &&
    Number.isFinite(coefFixe) &&
    Number.isFinite(coefVariable);

  if (!valid) {
    return { ratio: 0, coefRevision: 0, prixRevise: 0, ecartAbsolu: 0, ecartRelatif: 0 };
  }

  const ratio = btn / bt0;
  const coefRevision = coefFixe + coefVariable * ratio;
  const prixRevise = prixInitial * coefRevision;
  const ecartAbsolu = prixRevise - prixInitial;
  const ecartRelatif = (ecartAbsolu / prixInitial) * 100;

  return { ratio, coefRevision, prixRevise, ecartAbsolu, ecartRelatif };
}
