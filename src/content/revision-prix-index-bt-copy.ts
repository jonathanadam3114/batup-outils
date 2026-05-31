export const revisionPrixIndexBTCopy = {
  seo: {
    title:
      'Calculateur de révision de prix BTP (Index BT) — gratuit | Batup',
    description:
      "Calculez en 30 secondes le prix révisé d'un marché de travaux avec la formule officielle Index BT (CCAG-Travaux art. 10.4). Outil gratuit pour entrepreneurs BTP : 18 index INSEE pris en charge, écart en € et %.",
    canonicalPath: '/calculateur-revision-prix-index-bt',
  },
  webApplication: {
    name: 'Calculateur de révision de prix BTP (Index BT)',
    description:
      "Calculateur gratuit qui applique la formule de révision de prix CCAG-Travaux à partir des index BT (Bâtiment) publiés mensuellement par l'INSEE. Calcule le coefficient de révision, le prix révisé HT et l'écart en € et %, pour 18 sous-index (BT01 tous corps d'état à BT53 stores).",
  },
  hero: {
    h1: 'Calculateur de révision de prix BTP (Index BT)',
    lede: "Sur un marché de longue durée, le prix initial ne suit pas l'inflation des matériaux et de la main-d'œuvre. Cet outil applique la formule officielle de révision CCAG-Travaux (art. 10.4) à partir des index BT INSEE. Vous obtenez le prix révisé en quelques secondes — gratuit, sans inscription.",
  },
  ctaBanner: {
    title: 'Sur un marché de 18 mois, une révision oubliée = 2 à 4 % de marge envolée',
    subtitle:
      "Batup applique automatiquement la formule de révision à chaque situation de travaux, à partir des valeurs d'index BT INSEE mises à jour chaque mois. Aucune révision n'est oubliée, aucun coefficient n'est mal saisi, et chaque facture justifie son calcul.",
  },
  methodology: {
    title: 'La formule de révision de prix CCAG-Travaux',
    intro:
      "Cadre juridique : article 10.4 du CCAG-Travaux (clause de révision standard, marchés publics) et clauses contractuelles équivalentes des marchés privés (norme NF P 03-001). Les index BT (Bâtiment) sont publiés chaque mois par l'INSEE et accessibles gratuitement sur insee.fr. Voici les règles que le calculateur applique.",
    blocks: [
      {
        heading: "1. La formule de référence : 15 % fixe + 85 % variable",
        body: "P_n = P_0 × (0,15 + 0,85 × BT_n / BT_0). P_0 est le prix initial HT du marché, BT_0 la valeur de l'index à la date d'origine du marché (mois zéro, généralement le mois précédant la signature ou la remise de l'offre), BT_n la valeur de l'index au mois de la révision. Les coefficients 0,15 (part fixe) et 0,85 (part variable) sont la convention standard CCAG-Travaux ; leur somme doit faire 1.",
      },
      {
        heading: "2. Choisir le bon index BT selon le corps d'état",
        body: "BT01 (tous corps d'état) est l'index par défaut pour les marchés tous corps d'état confondus. Pour un lot unique, utilisez l'index correspondant : BT03 maçonnerie, BT07 charpente métallique, BT09 carrelage, BT10 menuiserie bois, BT16a plomberie, BT17 chauffage, BT38 peinture, BT47 électricité courants forts, BT49 couverture tuiles, BT50 rénovation-entretien, etc. Sur un marché multi-lots, chaque lot peut être révisé avec son propre index.",
      },
      {
        heading: "3. Le mois zéro (BT_0) gèle le prix initial",
        body: "BT_0 est la valeur de l'index figée à la date contractuelle d'origine. Cette date est définie dans le CCAP ou la convention : le plus souvent c'est le mois de remise de l'offre, ou le mois M − 1 de la signature. Une fois fixée, elle ne bouge plus pendant toute la vie du marché. Si le BT_0 est mal identifié, toutes les révisions ultérieures sont fausses — c'est l'erreur la plus fréquente.",
      },
      {
        heading: "4. La part fixe (0,15) protège des fluctuations excessives",
        body: "Conserver 15 % du prix non révisable est une protection symétrique : ni vous ni le client n'est pleinement exposé aux variations de l'index. Cette répartition 15/85 figure dans le CCAG-Travaux et la majorité des contrats privés. Vous pouvez la négocier (par exemple 10/90 si la matière représente plus de 90 % du coût, ou 20/80 sur des marchés à forte main-d'œuvre), mais la somme des deux coefficients doit toujours faire 1.",
      },
      {
        heading: "5. Révision appliquée à chaque situation, pas a posteriori",
        body: "La révision se calcule sur chaque situation de travaux (acompte mensuel) en prenant le BT_n du mois d'exécution réelle des prestations, pas le mois de facturation. Le solde final est révisé au BT_n du mois de la dernière prestation. Si vous oubliez de réviser pendant 12 mois sur un marché en forte inflation, vous perdez plusieurs points de marge — c'est de l'argent dû qui vous échappe.",
      },
    ],
  },
};
