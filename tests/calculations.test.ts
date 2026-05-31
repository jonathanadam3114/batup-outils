import { describe, it, expect } from 'vitest';
import {
  computeHeuresSup,
  PANIER_PAR_JOUR,
  FORFAIT_GRAND_DEPLACEMENT,
  SEMAINES_PAR_MOIS,
} from '@/lib/heures-sup-math';
import { computeRevisionIndexBT } from '@/lib/index-bt-math';
import {
  computePrimeAnciennete,
  getTaux,
  PALIERS_OUVRIER,
  PALIERS_ETAM,
} from '@/lib/prime-anciennete-math';
import {
  retenueGarantieFromHT,
  retenueGarantieFromTTC,
  montantTTC,
  RETENUE_GARANTIE_RATE,
} from '@/lib/retenue-garantie-math';

describe('heures supplémentaires BTP', () => {
  it('uses 10,30 € as the 2026 panier de chantier', () => {
    expect(PANIER_PAR_JOUR).toBe(10.3);
  });

  it('splits 45 h into 8 h @25 % then 2 h @50 % over a 35 h base', () => {
    const r = computeHeuresSup({
      heuresSemaine: 45,
      tauxHoraire: 13,
      joursChantier: 0,
      indemniteTrajetJour: 0,
      grandDeplacement: false,
    });
    expect(r.heures25).toBe(8);
    expect(r.heures50).toBe(2);
    // 35×13 + 8×13×1,25 + 2×13×1,50 = 455 + 130 + 39 = 624
    expect(r.salaireBase).toBeCloseTo(455, 6);
    expect(r.majoration25).toBeCloseTo(130, 6);
    expect(r.majoration50).toBeCloseTo(39, 6);
    expect(r.salaireBase + r.majoration25 + r.majoration50).toBeCloseTo(624, 6);
  });

  it('caps the 25 % band at 8 h and never goes negative under 35 h', () => {
    const under = computeHeuresSup({
      heuresSemaine: 32,
      tauxHoraire: 12,
      joursChantier: 0,
      indemniteTrajetJour: 0,
      grandDeplacement: false,
    });
    expect(under.heures25).toBe(0);
    expect(under.heures50).toBe(0);
    expect(under.salaireBase).toBeCloseTo(384, 6); // 32×12, base ne dépasse pas les heures réelles
  });

  it('adds panier + trajet + grand déplacement as flat daily amounts (never majorés)', () => {
    const r = computeHeuresSup({
      heuresSemaine: 45,
      tauxHoraire: 13,
      joursChantier: 5,
      indemniteTrajetJour: 5.33,
      grandDeplacement: true,
    });
    expect(r.panierSemaine).toBeCloseTo(PANIER_PAR_JOUR * 5, 6); // 51,50
    expect(r.indemniteSemaine).toBeCloseTo(5.33 * 5, 6); // 26,65
    expect(r.grandDeplSemaine).toBeCloseTo(FORFAIT_GRAND_DEPLACEMENT * 5, 6); // 425
    expect(r.panierMois).toBeCloseTo(PANIER_PAR_JOUR * 5 * SEMAINES_PAR_MOIS, 6);
  });
});

describe('retenue de garantie (5 % du TTC, Loi 71-584)', () => {
  it('exposes the 5 % legal rate', () => {
    expect(RETENUE_GARANTIE_RATE).toBe(0.05);
  });

  it('computes 5 % of the TTC, not the HT', () => {
    // 50 000 € HT @20 % → 60 000 € TTC → 3 000 € de retenue
    expect(montantTTC(50000, 20)).toBeCloseTo(60000, 6);
    expect(retenueGarantieFromHT(50000, 20)).toBeCloseTo(3000, 6);
  });

  it('matches the situation-de-travaux path (retenue on TTC)', () => {
    const situationBruteTTC = 12000;
    expect(retenueGarantieFromTTC(situationBruteTTC)).toBeCloseTo(600, 6);
  });
});

describe('révision de prix index BT (CCAG-Travaux 10.4)', () => {
  it('applies Pₙ = P₀ × (0,15 + 0,85 × BTₙ / BT₀)', () => {
    // BT passe de 100 à 110 (+10 %) sur 100 000 € de marché
    const r = computeRevisionIndexBT({
      prixInitial: 100000,
      bt0: 100,
      btn: 110,
      coefFixe: 0.15,
      coefVariable: 0.85,
    });
    expect(r.ratio).toBeCloseTo(1.1, 6);
    // coef = 0,15 + 0,85 × 1,1 = 1,085
    expect(r.coefRevision).toBeCloseTo(1.085, 6);
    expect(r.prixRevise).toBeCloseTo(108500, 6);
    expect(r.ecartAbsolu).toBeCloseTo(8500, 6);
    expect(r.ecartRelatif).toBeCloseTo(8.5, 6);
  });

  it('returns no revision when indices are unchanged (coef = 1)', () => {
    const r = computeRevisionIndexBT({
      prixInitial: 80000,
      bt0: 125,
      btn: 125,
      coefFixe: 0.15,
      coefVariable: 0.85,
    });
    expect(r.coefRevision).toBeCloseTo(1, 6);
    expect(r.prixRevise).toBeCloseTo(80000, 6);
  });

  it('zeroes out on incomplete inputs', () => {
    const r = computeRevisionIndexBT({
      prixInitial: 0,
      bt0: 100,
      btn: 110,
      coefFixe: 0.15,
      coefVariable: 0.85,
    });
    expect(r.prixRevise).toBe(0);
  });
});

describe('prime d’ancienneté CCN (barème 3/6/9/12/15 %)', () => {
  it('maps ouvrier seniority to the right rate', () => {
    expect(getTaux(2, PALIERS_OUVRIER)).toBe(0); // < 3 ans
    expect(getTaux(3, PALIERS_OUVRIER)).toBe(0.03);
    expect(getTaux(6, PALIERS_OUVRIER)).toBe(0.06);
    expect(getTaux(9, PALIERS_OUVRIER)).toBe(0.09);
    expect(getTaux(12, PALIERS_OUVRIER)).toBe(0.12);
    expect(getTaux(20, PALIERS_OUVRIER)).toBe(0.15); // plafond
  });

  it('uses the lower 1→5 % ETAM barème', () => {
    expect(getTaux(3, PALIERS_ETAM)).toBe(0.01);
    expect(getTaux(15, PALIERS_ETAM)).toBe(0.05);
  });

  it('computes the monthly prime on the brut for an ouvrier', () => {
    const r = computePrimeAnciennete('ouvrier', 2200, 7);
    expect(r.taux).toBe(0.06); // 6 à 8 ans
    expect(r.primeMensuelle).toBeCloseTo(132, 6); // 2200 × 0,06
    expect(r.primeAnnuelle).toBeCloseTo(1584, 6);
  });

  it('is not applicable to cadres (no conventional barème)', () => {
    const r = computePrimeAnciennete('cadre', 4000, 20);
    expect(r.applicable).toBe(false);
    expect(r.primeMensuelle).toBe(0);
  });
});
