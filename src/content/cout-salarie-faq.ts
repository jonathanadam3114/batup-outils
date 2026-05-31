import type { FAQItem } from '@/components/FAQAccordion';

export const coutSalarieFAQ: FAQItem[] = [
  {
    question: "Combien coûte un salarié à un employeur du BTP ?",
    answer:
      "Un salarié du BTP coûte en moyenne 1,6 à 1,7 fois son salaire brut, soit environ 1,9 à 2,0 fois son salaire net. Pour un brut mensuel de 2 200 €, le coût total employeur tourne autour de 3 600 € (charges patronales ~920 €, CIBTP ~460 €). C'est plus élevé que dans d'autres secteurs en raison de la cotisation CIBTP (congés payés + intempéries) et du taux accident du travail propre au bâtiment. Le coût horaire chargé pour un temps plein ressort autour de 23 à 25 €/h, ce qui constitue le plancher de facturation à ne pas franchir.",
  },
  {
    question: "Qu'est-ce que la CIBTP et pourquoi mon entreprise doit-elle cotiser ?",
    answer:
      "La Caisse des Congés Intempéries du BTP est une caisse paritaire propre au secteur du bâtiment et des travaux publics. Elle collecte deux cotisations versées exclusivement par l'employeur : la cotisation congés payés (≈ 19 % du brut), qui permet à la caisse de payer directement les salariés pendant leurs congés (contrairement aux autres secteurs où l'employeur paie lui-même), et la cotisation intempéries (≈ 0,5 à 2 % du brut selon les régions), qui finance le maintien de salaire en cas d'arrêt météo. L'affiliation est obligatoire dès qu'il y a un salarié.",
  },
  {
    question: 'Quel est le taux de charges patronales dans le BTP en 2026 ?',
    answer:
      "Le taux moyen de charges patronales d'un employeur du BTP en 2026 se situe entre 40 % et 45 % du salaire brut, hors CIBTP. Il inclut : sécurité sociale (~13 %), retraite complémentaire (~6 %), prévoyance et mutuelle (~3 %), formation et apprentissage (~1,5 %), accident du travail (taux variable, en moyenne ~3 % dans le BTP contre 1,5 % dans le tertiaire), Fnal et CSA (~0,5 %), Pôle emploi (~4 %). La réduction Fillon allège les cotisations sur les bas salaires (jusqu'à 1,6 SMIC), surtout dans les entreprises de moins de 50 salariés.",
  },
  {
    question: "Pourquoi le taux CIBTP est-il différent en Île-de-France ?",
    answer:
      "Parce que la cotisation intempéries est calculée sur des bases régionales, et que les caisses régionales appliquent des taux différents selon le risque historique observé. En Île-de-France, le taux global CIBTP (congés payés + intempéries) tourne autour de 21 % du brut, contre environ 19 % dans les autres régions. Les TP (travaux publics) ont également un barème distinct, légèrement différent du bâtiment. Pour le taux exact applicable à votre entreprise, consultez votre attestation CIBTP annuelle ou votre comptable.",
  },
  {
    question: 'Comment passer du salaire brut au salaire net dans le BTP ?',
    answer:
      "Les cotisations salariales (sécurité sociale, retraite complémentaire, chômage, CSG/CRDS) représentent environ 23 % du salaire brut pour un salarié du BTP. Le salaire net avant impôt sur le revenu équivaut donc à environ 77 % du brut. Pour un brut de 2 200 €, le net avant prélèvement à la source ressort autour de 1 690 €. Après prélèvement à la source (taux personnalisé du salarié, généralement entre 0 % et 15 %), il faut soustraire encore le montant de l'impôt pour obtenir le net en poche.",
  },
  {
    question: 'Le coût horaire chargé est-il le bon repère pour facturer ?',
    answer:
      "Non, c'est le plancher absolu, pas le tarif à facturer. Le coût horaire chargé ne couvre que le salaire et les charges. Il ne couvre pas vos charges fixes (local, véhicules, assurances, logiciels, marketing, votre propre rémunération si vous êtes dirigeant) ni votre marge. Pour obtenir le taux horaire à facturer, ajoutez les charges fixes annuelles à votre masse salariale, divisez par les heures facturables, puis appliquez votre marge nette cible. Notre calculateur de taux horaire BTP fait ce calcul complet en intégrant tous les postes.",
  },
  {
    question: "Combien d'heures mensuelles compter pour un temps plein ?",
    answer:
      "Le standard légal en France est de 151,67 heures mensuelles pour un temps plein de 35 heures hebdomadaires (35 × 52 ÷ 12). C'est la valeur utilisée par défaut dans ce calculateur. Pour un coût horaire chargé encore plus réaliste dans le BTP, descendez à 140-145 heures si vous voulez tenir compte des absences pour intempéries, formation et arrêts maladie sectoriels. Plus vous descendez le diviseur, plus le coût horaire monte — et plus votre devis sera prudent.",
  },
  {
    question: "Le forfait social et la part patronale mutuelle sont-ils inclus ?",
    answer:
      "Oui, dans le taux moyen de 42 % de charges patronales utilisé ici, la part patronale de mutuelle obligatoire (généralement 50 % de la cotisation, plafonnée par accord de branche) et le forfait social sur la prévoyance sont inclus. Si votre entreprise verse des avantages supplémentaires (titres-restaurant, indemnités kilométriques, primes de bilan, intéressement), il faut les ajouter au-delà : les titres-restaurant sont soumis à charges sur la part employeur au-delà de 7,18 € en 2026, et les primes de bilan sont des compléments de salaire entièrement chargés.",
  },
  {
    question: "Pourquoi le coût horaire chargé doit-il être suivi chantier par chantier ?",
    answer:
      "Parce que deux salariés payés 12 €/h ne coûtent pas la même chose à l'entreprise : un apprenti déclenche des allègements de charges, un cadre coûte plus en raison de la cotisation Apec, un salarié en grand déplacement génère des indemnités exonérées qui n'entrent pas dans le coût horaire mais qu'il faut quand même facturer. Sans suivi par salarié et par chantier, vous facturez en moyenne, et vous perdez de l'argent sur les chantiers à forte intensité de main d'œuvre coûteuse. Batup réintègre automatiquement ce coût dans la rentabilité de chaque chantier.",
  },
];
