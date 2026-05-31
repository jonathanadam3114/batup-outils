export const prixChantierCopy = {
  seo: {
    title: 'Calculateur de prix de chantier BTP — devis rentable | Batup',
    description:
      "Estimez en 1 minute le prix de vente HT d'un chantier BTP et vérifiez votre marge nette. Outil gratuit pour artisans : main d'œuvre, matériaux, sous-traitance, verdict rentabilité.",
    canonicalPath: '/calculateur-prix-chantier-btp',
  },
  webApplication: {
    name: 'Calculateur de prix de chantier BTP',
    description:
      "Calculateur gratuit qui estime le prix de vente HT d'un chantier (main d'œuvre, matériaux, sous-traitance, frais divers) et donne un verdict de rentabilité basé sur la marge nette résultante.",
  },
  hero: {
    h1: 'Calculez le prix juste d’un chantier BTP',
    lede: "Combien facturer ce chantier pour ne pas perdre d'argent ? Quelle marge il vous restera vraiment ? Cet outil vous donne le prix de vente HT recommandé et un verdict clair en quelques secondes.",
  },
  ctaBanner: {
    title: 'Un chantier rentable ne suffit pas',
    subtitle:
      "Tous vos devis, toutes vos marges, en temps réel. Batup centralise vos chantiers, vos coûts et vos marges pour qu'aucune perte ne vous échappe.",
  },
  methodology: {
    title: 'Comment on estime le prix d’un chantier rentable',
    intro:
      'La méthode est simple et fiable : on additionne ce que le chantier coûte, on applique votre marge cible, et on vérifie que la rentabilité finale est bien au-dessus du seuil de sécurité.',
    blocks: [
      {
        heading: '1. Main d’œuvre = heures × taux horaire facturé',
        body: "Multipliez le nombre d'heures estimées par votre taux horaire facturé. Si vous ne connaissez pas votre taux, calculez-le d'abord avec notre calculateur de taux horaire. Ne sous-estimez pas les heures : ajoutez les temps de préparation, de nettoyage et de finitions.",
      },
      {
        heading: '2. Matériaux = coût d’achat × coefficient',
        body: "Multipliez votre prix d'achat HT par votre coefficient de vente (1,30 par défaut pour environ 23 % de marge nette). Le coefficient sert à couvrir le temps passé à approvisionner, la trésorerie immobilisée et les éventuelles casses ou retours.",
      },
      {
        heading: '3. Sous-traitance et frais divers',
        body: "Par défaut, la sous-traitance et les frais divers (location, déchèterie, échafaudage) sont refacturés au coût réel : le coefficient sous-traitance est à 1,00 (pass-through). Comme la sous-traitance vous coûte aussi en coordination, contrôle qualité et trésorerie, vous pouvez monter ce coefficient à 1,10–1,15 pour appliquer une marge usuelle de 10 à 15 %.",
      },
      {
        heading: '4. Verdict de rentabilité',
        body: "On vérifie que la marge nette résultante est supérieure à 14,5 %. C'est le seuil en dessous duquel un seul aléa (SAV, remise commerciale, retard de paiement) peut faire basculer le chantier en perte. Au-dessus, vous avez du coussin pour absorber les imprévus.",
      },
    ],
  },
};
