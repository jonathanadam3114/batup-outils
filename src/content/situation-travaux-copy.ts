export const situationTravauxCopy = {
  seo: {
    title: 'Calculateur de situation de travaux BTP — acompte intermédiaire | Batup',
    description:
      "Calculez en 30 secondes le montant d'une situation de travaux mensuelle : avancement, retenue de garantie 5 %, TVA, net à percevoir. Outil gratuit pour artisans et entreprises du bâtiment (marchés > 3 mois).",
    canonicalPath: '/calculateur-situation-travaux',
  },
  webApplication: {
    name: 'Calculateur de situation de travaux BTP',
    description:
      "Calculateur gratuit qui détermine le montant d'une situation de travaux (acompte intermédiaire) sur un marché à long cours : pourcentage d'avancement, déduction des situations précédentes, retenue de garantie 5 % (Loi 71-584), TVA applicable et net à facturer.",
  },
  hero: {
    h1: 'Calculateur de situation de travaux (acompte intermédiaire)',
    lede: "Sur un chantier de plus de 3 mois, vous facturez par situations mensuelles selon l'avancement. Cet outil applique les règles classiques des marchés privés et publics (CCAG travaux, Loi 71-584) et vous donne le montant exact à facturer pour la situation en cours. Gratuit, sans inscription.",
  },
  ctaBanner: {
    title: 'Vos situations sont chronophages et faciles à perdre dans Excel',
    subtitle:
      "Batup génère automatiquement vos situations à partir du planning de chantier, applique avancement, retenue et TVA, et envoie au client en 1 clic. Plus de tableaux croisés à mettre à jour à la main chaque fin de mois.",
  },
  methodology: {
    title: 'Comment fonctionne une situation de travaux',
    intro:
      "Une situation de travaux est un acompte intermédiaire facturé périodiquement (le plus souvent tous les mois) sur les chantiers à long cours. Elle traduit en euros le pourcentage d'avancement atteint depuis la précédente situation. Voici les règles que le calculateur applique.",
    blocks: [
      {
        heading: "1. La situation se calcule sur l'avancement cumulé",
        body: "On part du pourcentage d'avancement global du chantier à date (par exemple 30 % à la fin du mois 3 sur un chantier de 10 mois). On multiplie par le montant total HT du marché pour obtenir le cumul des travaux réalisés HT. On soustrait ensuite ce qui a déjà été facturé dans les situations précédentes : la différence constitue la situation en cours. Cette logique cumulative protège des erreurs de double facturation.",
      },
      {
        heading: '2. La retenue de garantie de 5 % se prélève sur le montant TTC',
        body: "La Loi n° 71-584 du 16 juillet 1971 autorise le maître d'ouvrage à retenir 5 % du montant TTC de chaque acompte ou situation, et à consigner cette somme jusqu'à 1 an après la réception. Concrètement, on calcule d'abord le HT de la situation, on ajoute la TVA pour obtenir le TTC, puis on déduit 5 % de ce TTC : la retenue s'applique donc sur l'assiette TTC, pas sur le HT. Sur un marché de 100 000 € HT, environ 6 000 € seront immobilisés au total (5 % du TTC global), répartis sur chaque situation. La caution bancaire en substitution permet d'éviter cette retenue (voir notre calculateur dédié).",
      },
      {
        heading: '3. La TVA suit le taux du marché et se calcule sur le HT avant retenue',
        body: "Le taux de TVA applicable à chaque situation est celui du marché global : 20 % en construction neuve, 10 % en rénovation logement de plus de 2 ans, 5,5 % pour les travaux d'amélioration énergétique éligibles. Vous ne pouvez pas changer de taux de TVA en cours de marché, sauf modification réglementaire ou nouvelle attestation client. La TVA se calcule sur la situation brute HT, puis la retenue de garantie de 5 % s'applique sur le TTC obtenu — ordre conforme à la Loi 71-584.",
      },
      {
        heading: "4. Les acomptes déjà encaissés viennent en déduction du net à percevoir",
        body: "Si le client vous a déjà versé un acompte (à la signature, ou lors de précédentes situations), cet acompte est imputé sur le net à percevoir de la situation en cours. Pour les marchés publics, l'avance forfaitaire de 5 % se rembourse au fur et à mesure des situations (article R. 2191-11 du Code de la commande publique). Tenir un compteur d'acomptes propre évite les litiges en fin de chantier et fluidifie le DGD (décompte général définitif).",
      },
    ],
  },
};
