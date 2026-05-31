/**
 * Pure math for the BTP heures-supplémentaires calculator.
 * Extracted so the formula (25 %/50 % split, panier, trajet, grand
 * déplacement) can be unit-tested independently of the React component.
 *
 * Barème indicatif 2026 — convention collective ouvriers du bâtiment / URSSAF.
 */

/** Panier "de chantier" : plafond URSSAF d'exonération 2026. */
export const PANIER_PAR_JOUR = 10.3;
/** Forfait grand déplacement (nuitée + repas), dans la limite URSSAF. */
export const FORFAIT_GRAND_DEPLACEMENT = 85;
/** Facteur de mensualisation (52 semaines / 12 mois). */
export const SEMAINES_PAR_MOIS = 4.33;

export interface HeuresSupInput {
  heuresSemaine: number;
  tauxHoraire: number;
  joursChantier: number;
  /** Indemnité de trajet €/jour pour la zone choisie. */
  indemniteTrajetJour: number;
  grandDeplacement: boolean;
}

export interface HeuresSupResult {
  salaireBase: number;
  heures25: number;
  heures50: number;
  majoration25: number;
  majoration50: number;
  panierSemaine: number;
  panierMois: number;
  indemniteSemaine: number;
  indemniteMois: number;
  grandDeplSemaine: number;
  grandDeplMois: number;
  totalSemaine: number;
  totalMois: number;
  extrasMois: number;
}

/**
 * Décompte hebdomadaire : 35 h de base, 25 % de la 36ᵉ à la 43ᵉ (8 h max),
 * 50 % au-delà de 43 h. Les indemnités (panier, trajet, grand déplacement)
 * sont des forfaits journaliers, jamais majorés.
 */
export function computeHeuresSup(input: HeuresSupInput): HeuresSupResult {
  const heuresBase = Math.min(input.heuresSemaine, 35);
  const heures25 = Math.max(0, Math.min(input.heuresSemaine - 35, 8));
  const heures50 = Math.max(0, input.heuresSemaine - 43);

  const salaireBase = heuresBase * input.tauxHoraire;
  const majoration25 = heures25 * input.tauxHoraire * 1.25;
  const majoration50 = heures50 * input.tauxHoraire * 1.5;

  const panierSemaine = PANIER_PAR_JOUR * input.joursChantier;
  const panierMois = panierSemaine * SEMAINES_PAR_MOIS;

  const indemniteSemaine = input.indemniteTrajetJour * input.joursChantier;
  const indemniteMois = indemniteSemaine * SEMAINES_PAR_MOIS;

  const grandDeplSemaine = input.grandDeplacement
    ? FORFAIT_GRAND_DEPLACEMENT * input.joursChantier
    : 0;
  const grandDeplMois = grandDeplSemaine * SEMAINES_PAR_MOIS;

  const totalSemaine =
    salaireBase + majoration25 + majoration50 + panierSemaine + indemniteSemaine + grandDeplSemaine;
  const totalMois = totalSemaine * SEMAINES_PAR_MOIS;

  const extrasMois =
    panierMois + indemniteMois + grandDeplMois + (majoration25 + majoration50) * SEMAINES_PAR_MOIS;

  return {
    salaireBase,
    heures25,
    heures50,
    majoration25,
    majoration50,
    panierSemaine,
    panierMois,
    indemniteSemaine,
    indemniteMois,
    grandDeplSemaine,
    grandDeplMois,
    totalSemaine,
    totalMois,
    extrasMois,
  };
}
