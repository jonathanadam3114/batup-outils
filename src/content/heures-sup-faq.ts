import type { FAQItem } from '@/components/FAQAccordion';

export const heuresSupFAQ: FAQItem[] = [
  {
    question: 'Comment calculer les heures supplémentaires d’un salarié du BTP ?',
    answer:
      "Au-delà de 35 heures hebdomadaires, les 8 premières heures supplémentaires (de la 36ᵉ à la 43ᵉ) sont majorées de 25 %. À partir de la 44ᵉ heure, la majoration passe à 50 %. La majoration s'applique sur le taux horaire brut de base (hors primes, panier, indemnités). Concrètement, pour un salarié à 13 €/h qui fait 45 heures dans la semaine : 35 h × 13 € + 8 h × 13 € × 1,25 + 2 h × 13 € × 1,50 = 624 € de salaire de base, contre 585 € sans les majorations.",
  },
  {
    question: "Quel est le montant du panier BTP 2026 ?",
    answer:
      "Le panier de chantier exonéré par l'URSSAF en 2026 s'élève à 10,30 € par journée travaillée hors du siège de l'entreprise (plafond d'exonération de cotisations). Il est versé quel que soit le mode de prise en charge du repas (cantine, restaurant, gamelle) à condition que le salarié déjeune effectivement hors du siège. Les accords d'entreprise ou conventions départementales peuvent prévoir un panier conventionnel plus élevé, mais la fraction au-delà de 10,30 € est alors soumise à cotisations — vérifiez le barème applicable à votre convention collective départementale.",
  },
  {
    question: "Comment fonctionne l’indemnité de trajet dans le BTP ?",
    answer:
      "L'indemnité de trajet compense le temps passé entre le domicile du salarié et le chantier, au-delà des conditions normales de déplacement. Elle est calculée par zones concentriques autour du siège de l'entreprise : zone 1A (0-5 km du siège) à 1,33 €/jour, zone 1B (5-10 km) à 2,67 €, zone 2 (10-20 km) à 5,33 €, zone 3 (20-30 km) à 8 €, zone 4 (30-40 km) à 10,67 €, zone 5 (40-50 km) à 13,33 €. Elle est due pour chaque journée de chantier et n'est pas soumise à cotisations sociales dans ces limites.",
  },
  {
    question: "Qu'est-ce qu'un grand déplacement BTP et quand le verser ?",
    answer:
      "Le grand déplacement intervient quand le chantier impose au salarié de découcher, c'est-à-dire de ne pas pouvoir regagner son domicile chaque soir. L'entreprise verse un forfait qui couvre l'hébergement et les repas, généralement autour de 85 €/jour en 2026 dans la limite URSSAF d'exonération (logement ~70 €, deux repas ~21 € en province, davantage en Île-de-France). Au-delà du barème, le forfait est requalifié en complément de salaire et soumis aux cotisations sociales et à l'impôt sur le revenu.",
  },
  {
    question: 'Les heures supplémentaires sont-elles exonérées de charges sociales ?',
    answer:
      "Oui, partiellement. Depuis la loi TEPA réactivée en 2019, les heures supplémentaires bénéficient d'une réduction des cotisations salariales (jusqu'à 11,31 %) et d'une exonération d'impôt sur le revenu dans la limite de 7 500 € nets par an. Côté employeur, une déduction forfaitaire des cotisations patronales s'applique pour les entreprises de moins de 20 salariés (1,50 € par heure sup) et de 20 à 249 salariés (0,50 € par heure sup). Ces dispositifs réduisent fortement le coût réel des heures sup.",
  },
  {
    question: 'Comment distinguer temps de travail effectif et temps de trajet ?',
    answer:
      "Le temps de trajet domicile-chantier n'est pas du temps de travail effectif : il est compensé par l'indemnité de trajet, pas par du salaire. En revanche, le temps de trajet entre le siège et le chantier (si le salarié passe au dépôt) est du temps de travail effectif et rentre dans le décompte des 35 heures. Le temps de chargement du véhicule, d'attente sur chantier, de pause obligatoire à disposition de l'employeur est également du temps de travail effectif.",
  },
  {
    question: 'La majoration de 25 % et 50 % s’applique-t-elle au panier ?',
    answer:
      "Non. La majoration pour heures supplémentaires (25 % puis 50 %) s'applique uniquement sur le salaire de base, c'est-à-dire le taux horaire brut multiplié par les heures effectives. Le panier, l'indemnité de trajet et le grand déplacement ne sont pas du salaire : ce sont des indemnités compensatrices, calculées au forfait journalier. Ils ne sont donc pas multipliés par 1,25 ou 1,50, même si le salarié fait des heures sup ce jour-là.",
  },
  {
    question: "Un salarié à 39 heures touche-t-il déjà 4 heures sup ?",
    answer:
      "Oui, dans la majorité des cas. Si le contrat de travail prévoit 39 heures hebdomadaires comme horaire de référence, les 4 heures au-delà de 35 heures sont des heures supplémentaires structurelles, majorées de 25 % et intégrées au salaire mensuel de base. Le salarié les retrouve sur sa fiche de paie sous la ligne « heures supplémentaires structurelles ». Pour calculer la rémunération hebdomadaire dans cet outil, indiquez le nombre total d'heures réellement travaillées, le calcul de majoration sera correct.",
  },
  {
    question: 'Pourquoi utiliser un outil dédié plutôt qu’Excel ?',
    answer:
      "Parce que la convention collective du BTP combine trois variables (heures sup, panier, indemnité de trajet) qui dépendent chacune de paramètres différents : taux horaire, zone géographique, jours de chantier hors siège, présence d'un découcher. Un fichier Excel maison oublie systématiquement une majoration sur deux ou applique la mauvaise zone. Une solution comme Batup Pointage prend les pointages de chantier directement sur le smartphone du chef d'équipe et calcule tout automatiquement — fin du fichier Excel, fin des erreurs de paie.",
  },
];
