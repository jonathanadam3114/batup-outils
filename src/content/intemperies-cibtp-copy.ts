export const intemperiesCibtpCopy = {
  seo: {
    title:
      "Calculateur jours d'intempéries indemnisés CIBTP — barème 2026 | Batup",
    description:
      "Estimez en 30 secondes l'indemnité CIBTP d'un arrêt intempéries : 75 % du taux horaire, carence d'1 heure, plafond 55 jours/an. Outil gratuit pour employeurs du bâtiment (réf. Code du travail L. 5424-6).",
    canonicalPath: '/calculateur-jours-intemperies-cibtp',
  },
  webApplication: {
    name: "Calculateur jours d'intempéries indemnisés CIBTP",
    description:
      "Calculateur gratuit qui chiffre l'indemnité d'arrêt intempéries remboursée par la caisse CIBTP : 75 % du taux horaire brut (plafonné à 130 % du SMIC), après carence d'une heure par arrêt, dans la limite de 55 jours indemnisés par salarié et par année civile. Conforme aux articles L. 5424-6 à L. 5424-15 du Code du travail.",
  },
  hero: {
    h1: "Calculateur jours d'intempéries indemnisés CIBTP : indemnité 75 % et plafond 55 j",
    lede:
      "Quand le chantier s'arrête à cause du froid, du gel, de la pluie ou du vent, le salarié est payé et la caisse CIBTP rembourse l'employeur. Combien exactement ? L'outil ci-dessous chiffre l'indemnité période par période, en intégrant la carence d'1 heure par arrêt et le plafond annuel de 55 jours, sur le barème indicatif 2026.",
  },
  ctaBanner: {
    title: "Vos arrêts intempéries devraient se déclarer tout seuls",
    subtitle:
      "Batup détecte les arrêts intempéries depuis les pointages chantier, calcule l'indemnité au centime près et prépare le dossier de remboursement CIBTP automatiquement. Plus de tableau Excel à reprendre, plus de jour oublié, plus de plafond annuel dépassé.",
  },
  methodology: {
    title: "Comment on calcule l'indemnité CIBTP d'un arrêt intempéries",
    intro:
      "La méthode reprend les articles L. 5424-6 à L. 5424-15 du Code du travail et le barème indicatif 2026 de la caisse CIBTP. C'est exactement ce que la caisse va vérifier sur votre dossier de remboursement.",
    blocks: [
      {
        heading: "1. Travaux extérieurs et arrêt constaté par l'employeur",
        body: "L'indemnité ne couvre que les chantiers extérieurs : gros œuvre, couverture, charpente, étanchéité, terrassement, VRD, façade. Les chantiers intérieurs (second œuvre en bâtiment clos et couvert) en sont exclus. L'arrêt — total ou partiel — doit être constaté et signé par le chef de chantier le jour même : pluie diluvienne, gel, vent fort, neige, températures négatives prolongées. Sans ce constat horodaté, la caisse refuse le remboursement.",
      },
      {
        heading: "2. Carence d'1 heure par arrêt",
        body: "La première heure de chaque arrêt n'est jamais indemnisée — c'est le délai de carence légal. Si la journée fait 7 heures et que l'arrêt couvre la journée entière, seules 6 heures sont indemnisables. Si plusieurs arrêts ont lieu dans la même journée (matin et après-midi), une seule carence d'1 heure s'applique par jour calendaire, pas par arrêt physique.",
      },
      {
        heading: "3. Taux d'indemnité : 75 % du salaire horaire, plafonné",
        body: "L'indemnité est calculée à 75 % du salaire horaire brut du salarié, dans la limite de 130 % du SMIC horaire. En 2026, le SMIC horaire est d'environ 11,86 € brut, ce qui plafonne l'indemnité horaire à environ 11,55 € (= 11,86 × 1,30 × 0,75). Un salarié à 18 €/h touche donc le plafond, pas 13,50 €. Le salarié, lui, perçoit son salaire normal pendant l'arrêt — c'est l'employeur qui se fait rembourser par la caisse CIBTP de sa région.",
      },
      {
        heading: "4. Plafond annuel : 55 jours par salarié",
        body: "Aucun salarié ne peut être indemnisé plus de 55 jours d'intempéries par année civile, tous arrêts confondus. Au-delà, l'employeur paie le salaire intégralement et n'est plus remboursé. Sur un hiver très rude, ce plafond se franchit vite — d'où l'importance de suivre le cumul jour par jour et de basculer les équipes sur des chantiers intérieurs quand c'est possible.",
      },
    ],
  },
};
