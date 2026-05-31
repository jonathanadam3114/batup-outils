export const coutSalarieCopy = {
  seo: {
    title: 'Calculateur coût salarié employeur BTP — simulateur salaire net 2026 | Batup',
    description:
      'Calculez en 30 secondes le coût total employeur d’un salarié du BTP : charges patronales, CIBTP, salaire net, coût horaire chargé. Outil gratuit pour artisans et PME du bâtiment.',
    canonicalPath: '/calculateur-cout-salarie-btp',
  },
  webApplication: {
    name: 'Calculateur coût salarié employeur BTP',
    description:
      "Simulateur gratuit qui chiffre le coût total employeur d'un salarié du BTP à partir du salaire brut : charges patronales, cotisation CIBTP (congés payés et intempéries), salaire net estimé et coût horaire chargé pour intégration en devis.",
  },
  hero: {
    h1: 'Calculateur coût salarié employeur BTP : simulateur salaire net 2026',
    lede: "Combien vous coûte réellement votre salarié, charges patronales et CIBTP comprises ? Combien lui reste-t-il en net ? Quel est son coût horaire chargé une fois tout intégré ? L'outil ci-dessous chiffre le coût total employeur en quelques secondes, sur le barème 2026 du bâtiment.",
  },
  ctaBanner: {
    title: 'Le coût horaire chargé devrait être dans chaque devis',
    subtitle:
      "Batup réintègre automatiquement le coût horaire chargé de chaque salarié dans la rentabilité de chaque chantier. Vous voyez en temps réel quelle main d'œuvre tire vos marges — et quel devis va casser votre rentabilité.",
  },
  methodology: {
    title: 'Comment on calcule le coût total d’un salarié BTP',
    intro:
      "La méthode reprend les taux moyens 2026 d'un employeur du bâtiment, après prise en compte de la CIBTP (congés payés et intempéries) propre au secteur. Les ordres de grandeur sont défendables ; pour une feuille de paie au centime, demandez à votre comptable.",
    blocks: [
      {
        heading: '1. Charges patronales : 40 à 45 % du brut',
        body: "Les cotisations patronales du BTP (URSSAF, retraite complémentaire, prévoyance, formation, médecine du travail, accident du travail) représentent en moyenne 42 % du salaire brut. Le taux varie avec l'effectif : ~40 % pour moins de 11 salariés (réduction Fillon plus forte), ~43 % entre 11 et 49 salariés, ~45 % au-delà de 50 salariés. La cotisation accident du travail est plus élevée dans le BTP que dans d'autres secteurs en raison du risque.",
      },
      {
        heading: '2. CIBTP : 19 à 21 % spécifique au bâtiment',
        body: "La Caisse des Congés Intempéries du BTP collecte deux cotisations qui n'existent pas dans les autres secteurs : la cotisation congés payés (gérée pour le compte de l'employeur, le salarié est payé par la caisse pendant ses congés) et la cotisation intempéries (qui finance le maintien de salaire en cas d'arrêt météo). Le taux global tourne autour de 21 % en Île-de-France et 19 % dans les autres régions, calculé sur le salaire brut.",
      },
      {
        heading: '3. Salaire net : brut × 0,77',
        body: "Les cotisations salariales (sécurité sociale, retraite, chômage, CSG/CRDS) représentent environ 23 % du brut pour un salarié du BTP. Le salaire net mensuel équivaut donc à environ 77 % du brut. C'est ce que votre salarié touche réellement sur son compte, avant impôt sur le revenu (prélèvement à la source).",
      },
      {
        heading: '4. Coût horaire chargé : à intégrer dans chaque devis',
        body: "Coût total employeur ÷ heures mensuelles facturables (151,67 h pour un temps plein 35 h = 35 × 52 ÷ 12). C'est le seuil minimum pour ne pas perdre d'argent en facturant une heure de ce salarié. Si vous facturez en dessous, vous payez de votre poche. Si vous facturez au coût horaire pur sans marge, vous travaillez à perte une fois les charges fixes (local, véhicules, assurances) intégrées.",
      },
    ],
  },
};
