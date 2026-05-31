export const intemperiesCibtpCopy = {
  seo: {
    title:
      "Calculateur jours d'intempéries indemnisés CIBTP — barème 2026 | Batup",
    description:
      "Estimez en 30 secondes l'indemnité CIBTP d'un arrêt intempéries : 75 % du taux horaire, plafond 75 % × 120 % PHSS ≈ 26,10 €/h, carence d'1 heure, plafond 55 jours par campagne (1er nov. — 31 mars). Outil gratuit pour employeurs du bâtiment (réf. Code du travail L. 5424-6 à L. 5424-15, D. 5424-7).",
    canonicalPath: '/calculateur-jours-intemperies-cibtp',
  },
  webApplication: {
    name: "Calculateur jours d'intempéries indemnisés CIBTP",
    description:
      "Calculateur gratuit qui chiffre l'indemnité d'arrêt intempéries remboursée par la caisse CIBTP : 75 % du taux horaire brut, dans la limite de 75 % × 120 % du plafond horaire de la sécurité sociale (PHSS), après carence d'une heure par arrêt, dans la limite de 55 jours indemnisés par salarié et par campagne intempéries (1er novembre — 31 mars). Conforme aux articles L. 5424-6 à L. 5424-15 et D. 5424-7 du Code du travail.",
  },
  hero: {
    h1: "Calculateur jours d'intempéries indemnisés CIBTP : indemnité 75 % et plafond 55 j par campagne",
    lede:
      "Quand le chantier s'arrête à cause du froid, du gel, de la pluie ou du vent, le salarié est payé et la caisse CIBTP rembourse l'employeur. Combien exactement ? L'outil ci-dessous chiffre l'indemnité période par période, en intégrant la carence d'1 heure et le plafond de 55 jours par campagne intempéries (1er novembre — 31 mars), sur le barème 2026.",
  },
  ctaBanner: {
    title: "Vos arrêts intempéries devraient se déclarer tout seuls",
    subtitle:
      "Batup détecte les arrêts intempéries depuis les pointages chantier, calcule l'indemnité au centime près et prépare le dossier de remboursement CIBTP automatiquement. Plus de tableau Excel à reprendre, plus de jour oublié, plus de plafond annuel dépassé.",
  },
  methodology: {
    title: "Comment on calcule l'indemnité CIBTP d'un arrêt intempéries",
    intro:
      "La méthode reprend les articles L. 5424-6 à L. 5424-15 et D. 5424-7 du Code du travail, ainsi que le barème 2026 appliqué par les caisses CIBTP. C'est exactement ce que la caisse va vérifier sur votre dossier de remboursement.",
    blocks: [
      {
        heading: "1. Travaux extérieurs et arrêt constaté par l'employeur",
        body: "L'indemnité ne couvre que les chantiers extérieurs : gros œuvre, couverture, charpente, étanchéité, terrassement, VRD, façade. Les chantiers intérieurs (second œuvre en bâtiment clos et couvert) en sont exclus. L'arrêt — total ou partiel — doit être constaté et signé par le chef de chantier le jour même : pluie diluvienne, gel, vent fort, neige, températures négatives prolongées. Sans ce constat horodaté, la caisse refuse le remboursement.",
      },
      {
        heading: "2. Carence d'1 heure",
        body: "L'article L. 5424-12 prévoit que la première heure d'inactivité de chaque arrêt n'est pas indemnisée. En pratique, les caisses CIBTP appliquent cette carence par jour calendaire et non par arrêt physique : si plusieurs interruptions ont lieu le même jour (matin et après-midi), une seule carence d'1 heure s'applique. L'outil suit la pratique CIBTP. Si la journée fait 7 heures et que l'arrêt couvre la journée entière, seules 6 heures sont indemnisables.",
      },
      {
        heading: "3. Taux 75 %, plafond horaire = 75 % × 120 % du PHSS",
        body: "L'indemnité est calculée à 75 % du salaire horaire brut du salarié (art. L. 5424-13). Le plafond horaire est fixé à 120 % du plafond horaire de la sécurité sociale (PHSS) — pas au SMIC (art. D. 5424-7). En 2026, le PHSS est d'environ 29 €/h, ce qui donne un plafond salaire de référence de 34,80 €/h, soit une indemnité horaire plafonnée à 26,10 €/h (= 29 × 1,20 × 0,75). Bien au-dessus de l'ancien plafond SMIC : un ouvrier qualifié payé 22 €/h sera intégralement indemnisé à 16,50 €/h sans atteindre le plafond. Le salarié perçoit son salaire normal pendant l'arrêt ; c'est l'employeur qui se fait rembourser par la caisse CIBTP de sa région.",
      },
      {
        heading: "4. Plafond de campagne : 55 jours par salarié, 1er nov. — 31 mars",
        body: "Aucun salarié ne peut être indemnisé plus de 55 jours d'intempéries par campagne (art. L. 5424-15). La campagne intempéries court du 1er novembre au 31 mars — et non sur une année civile. Au 1er novembre suivant, le compteur repart à zéro. Au-delà des 55 jours, l'employeur paie le salaire intégralement et n'est plus remboursé. Sur un hiver très rude, ce plafond se franchit vite — d'où l'importance de suivre le cumul jour par jour et de basculer les équipes sur des chantiers intérieurs quand c'est possible.",
      },
    ],
  },
};
