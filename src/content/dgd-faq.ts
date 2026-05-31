import type { FAQItem } from '@/components/FAQAccordion';

export const dgdFAQ: FAQItem[] = [
  {
    question: "Qu'est-ce que le DGD (décompte général définitif) dans le BTP ?",
    answer:
      "Le DGD est le solde comptable et juridique d'un marché de travaux. Il intègre le marché initial, les avenants signés, les révisions de prix, les pénalités appliquées et les acomptes déjà perçus. Sa signature par les parties éteint définitivement les comptes : aucune réclamation financière ne pourra plus être présentée après acceptation. En marché public, le CCAG-Travaux 2021 article 12.4 (et 12.4.4 pour la notification du décompte général par le maître d'ouvrage) encadre la procédure d'établissement et d'acceptation du DGD, complété par l'article R. 2191-11 du Code de la commande publique pour le délai global de paiement de 30 jours. En marché privé, il est fortement recommandé de prévoir une procédure équivalente dans le CCAP pour éviter les litiges en fin de chantier.",
  },
  {
    question: 'Quelle est la différence entre DGD et DGDF ?',
    answer:
      "Le DGD (décompte général définitif) est la version qui fait foi définitivement. Le DGDF (projet de décompte général définitif) est la proposition initiale présentée par l'entrepreneur. Le maître d'œuvre vérifie le DGDF, propose éventuellement des corrections, et le maître d'ouvrage le notifie sous forme de DG (décompte général). L'entreprise dispose alors de 30 jours pour le signer sans réserve, le signer avec réserves, ou le refuser. À défaut de réponse dans ce délai, le DG vaut acceptation tacite. C'est une étape critique : un DGD signé sans réserves prive l'entreprise de toute réclamation ultérieure, même justifiée.",
  },
  {
    question: 'Comment se calculent les révisions de prix sur les indices BT ?',
    answer:
      "Les révisions de prix s'appliquent quand le CCAP le prévoit, généralement sur les marchés de plus de 3 mois. La formule type est : Prix révisé = Prix initial × (0,15 + 0,85 × BT_n / BT_0), où BT_n est l'index BT du mois de réalisation et BT_0 l'index du mois de remise des offres. L'INSEE publie les indices BT01 (tous corps d'état) et une trentaine d'indices spécifiques par métier (BT08 plomberie, BT16 électricité, BT34 peinture, etc.). Les révisions se cumulent sur la durée du chantier. Sur un marché de 500 000 € HT avec une inflation BT de 4 % sur 18 mois, la révision peut dépasser 15 000 € — soit la marge de plusieurs lots de second œuvre.",
  },
  {
    question: 'Quand le DGD doit-il être établi ?',
    answer:
      "Le projet de décompte final est transmis par l'entrepreneur dans les 30 jours suivant la notification de la réception (CCAG-Travaux 2021, article 12.4). Le maître d'œuvre dispose ensuite de 30 jours pour le vérifier et le transmettre au maître d'ouvrage. Le maître d'ouvrage notifie le décompte général à l'entreprise dans les 30 jours après réception du projet de décompte final (CCAG-Travaux 2021 art. 12.4.4). L'entreprise dispose enfin de 30 jours pour accepter, contester ou se taire (acceptation tacite). Total : 90 à 120 jours après la réception pour clôturer définitivement les comptes. Le délai de paiement effectif du solde DGD est ensuite de 30 jours (art. R. 2191-11 du Code de la commande publique). En marché privé, ces délais sont souvent réduits dans le CCAP — vérifiez bien les vôtres.",
  },
  {
    question: 'Peut-on contester un DGD après signature ?',
    answer:
      "Non, sauf vice du consentement ou erreur matérielle manifeste. La signature sans réserve éteint définitivement les comptes : aucune réclamation pour travaux supplémentaires, retard, indemnités ou intérêts moratoires ne sera plus recevable, même si elle est juridiquement fondée. C'est pourquoi il est essentiel de toujours signer avec réserves quand un point reste en suspens. Une réserve écrite préserve vos droits sur le point réservé pendant 6 mois (prescription du recours en marché public). Sans réserves, la jurisprudence est constante : le DGD vaut quitus complet, et le tribunal vous opposera votre propre signature.",
  },
  {
    question: 'Comment imputer la retenue de garantie sur le DGD ?',
    answer:
      "La retenue de 5 % (Loi 71-584 du 16 juillet 1971), calculée sur le TTC, ne fait pas partie du solde du DGD initial : elle reste consignée et se libère 1 an après la réception, ou après la levée écrite des réserves. Le calculateur la sépare explicitement pour cette raison et l'auto-calcule à 5 % du marché TTC définitif (vous pouvez désactiver le calcul auto pour saisir un montant spécifique). Le DGD officiel mentionne le montant retenu et la date prévisionnelle de libération. Si vous avez fourni une caution bancaire personnelle et solidaire en substitution, la retenue est nulle et la totalité du solde se règle immédiatement à acceptation du DGD. Activez l'option « Caution bancaire en substitution » du calculateur pour modéliser ce scénario.",
  },
  {
    question: 'Que faire si le solde DGD est négatif (trop-perçu) ?',
    answer:
      "Un solde négatif signifie que les acomptes encaissés depuis le début du chantier dépassent le montant définitif TTC après pénalités. Ce cas se produit principalement en cas de pénalités lourdes, de révision négative (rare), ou de surestimation chronique des situations d'avancement. Vous devez alors rembourser la différence au maître d'ouvrage. Le calculateur affiche un verdict rouge dans ce cas. En pratique, négociez systématiquement : un échéancier de remboursement sur plusieurs mois, une compensation contre d'autres factures ouvertes, ou une révision des pénalités si elles sont contestables (intempéries, prolongations justifiées, ordres de service tardifs).",
  },
  {
    question: 'Le DGD est-il obligatoire en marché privé ?',
    answer:
      "Non, juridiquement le DGD est une procédure du CCAG travaux qui s'applique aux marchés publics. Mais en pratique, tous les marchés privés sérieux prévoient une procédure équivalente dans le CCAP pour clôturer les comptes proprement. Si votre marché privé ne prévoit rien, formalisez tout de même une « facture définitive de clôture de chantier » mentionnant explicitement : marché initial, avenants signés, révisions appliquées, total HT, TVA, total TTC, acomptes déjà perçus, solde à percevoir, retenue de garantie restante et date prévisionnelle de libération. Ce document protège contre les contestations ultérieures et prouve votre transparence financière.",
  },
  {
    question: 'Comment Batup automatise-t-il le DGD ?',
    answer:
      "Batup centralise dès la signature du marché : avenants, ordres de service, situations émises, acomptes perçus, pénalités déclarées, retenue consignée et révisions sur indices BT. À la réception, le DGDF est généré automatiquement au format CERFA avec toutes les pièces justificatives. Vous validez d'un clic et transmettez au maître d'œuvre. Les délais d'acceptation tacite sont suivis en temps réel, avec relances automatiques 7 jours avant échéance. Résultat : les artisans Batup clôturent leurs DGD en moyenne 38 jours plus tôt et récupèrent 92 % de leurs retenues à date contre 74 % en moyenne sectorielle.",
  },
];
