import type { FAQItem } from '@/components/FAQAccordion';

export const situationTravauxFAQ: FAQItem[] = [
  {
    question: "Qu'est-ce qu'une situation de travaux dans le BTP ?",
    answer:
      "Une situation de travaux est une facturation intermédiaire émise pendant l'exécution d'un chantier long, traduisant le pourcentage d'avancement atteint depuis la dernière situation. Elle s'oppose à la facturation en une seule fois en fin de chantier : sur un marché de plus de 3 mois, c'est la norme. Le rythme est mensuel dans la grande majorité des cas. La situation permet à l'entreprise de tirer une trésorerie régulière et au client de suivre l'avancement réel des travaux. Elle est obligatoire dans les marchés publics et fortement recommandée dans les marchés privés au-delà de 50 000 € HT.",
  },
  {
    question: "Comment se calcule une situation : sur l'avancement ou sur les coûts engagés ?",
    answer:
      "La méthode standard du BTP français est l'avancement physique : on mesure le pourcentage de travaux réalisés par rapport au total du marché, et on multiplie par le montant HT. Sur un marché de 100 000 € HT avec 30 % d'avancement, le cumul des travaux est de 30 000 € HT. La situation N s'obtient en déduisant le cumul des situations précédentes. Certains marchés (notamment dans le génie civil) appliquent la méthode du coût engagé (cost-to-cost) : on facture en proportion des coûts décaissés. Pour les marchés bâtiment classiques, restez sur l'avancement physique, plus transparent et plus aligné avec les attentes du maître d'œuvre.",
  },
  {
    question: 'La retenue de garantie de 5 % s\'applique-t-elle sur chaque situation ?',
    answer:
      "Oui. La Loi n° 71-584 du 16 juillet 1971 autorise le maître d'ouvrage à prélever 5 % sur chaque situation TTC, à condition de consigner ces sommes auprès d'un organisme de cautionnement agréé ou d'un compte bancaire dédié. La retenue est plafonnée à 5 % du marché global TTC, peu importe le nombre de situations. Elle se libère 1 an après la réception sans réserves, ou après la levée écrite des réserves. Pour éviter d'immobiliser cette trésorerie, vous pouvez substituer une caution bancaire à la retenue : le client est légalement obligé d'accepter, et vous percevez 100 % de chaque situation.",
  },
  {
    question: 'Quand peut-on émettre une situation ?',
    answer:
      "Le rythme est fixé par le CCAP (cahier des clauses administratives particulières) du marché. Le plus fréquent : situation mensuelle, à terme échu, avec date limite de remise au maître d'œuvre (souvent le 5 ou le 10 du mois suivant). Le maître d'œuvre vérifie l'avancement déclaré, peut le corriger, et émet un acompte (visa) que le maître d'ouvrage paie sous 30 à 45 jours. En marché public, l'article R. 2191-21 du Code de la commande publique fixe un délai global de paiement de 30 jours pour les pouvoirs adjudicateurs (50 jours pour les EPS). Au-delà, des intérêts moratoires sont dus de plein droit.",
  },
  {
    question: 'Que se passe-t-il si le client conteste l\'avancement déclaré ?',
    answer:
      "Le maître d'œuvre est le tiers de confiance qui valide l'avancement. S'il considère que vous avez surestimé, il corrige à la baisse et n'accepte que le pourcentage qu'il juge réel. Vous percevez alors la situation corrigée, et la différence est réintégrée à la situation suivante si elle se confirme. En cas de désaccord persistant, il est possible de saisir le comité de règlement amiable des litiges (marchés publics) ou de recourir à un expert. Documentez systématiquement chaque visite de chantier avec photos et procès-verbaux pour défendre votre pourcentage d'avancement.",
  },
  {
    question: 'Comment imputer les acomptes versés à la commande sur les situations ?',
    answer:
      "L'acompte de démarrage (souvent 30 % en marché privé, 5 % en marché public — avance forfaitaire de l'article R. 2191-3 du Code de la commande publique) se rembourse au prorata de l'avancement. En marché public, l'avance se déduit progressivement à partir d'un seuil de 65 % d'avancement et doit être intégralement remboursée à 80 % d'avancement. En marché privé, la pratique courante est de déduire l'acompte par fraction proportionnelle à chaque situation, jusqu'à apurement total avant le DGD. Saisir le bon montant d'acompte déjà encaissé dans le calculateur évite toute mauvaise surprise sur le net à percevoir.",
  },
  {
    question: "Faut-il faire une situation de travaux même si l'avancement est faible ?",
    answer:
      "Oui, dès que le seuil de facturation prévu par le marché est atteint (souvent 2 ou 3 % d'avancement minimum par situation). Émettre des situations régulières, même modestes, sécurise votre trésorerie et signale au client que le chantier progresse. À l'inverse, accumuler 3 mois sans facturer sous prétexte d'avancement faible vous expose à des trous de trésorerie et fragilise votre position en cas de litige. La règle d'or : ne jamais laisser passer plus d'un mois sans situation, sauf accord écrit explicite avec le maître d'œuvre.",
  },
  {
    question: 'Comment gérer les avenants en cours de marché ?',
    answer:
      "Un avenant modifie le montant total HT du marché : il faut donc l'intégrer au calcul d'avancement à partir de sa date d'effet. Si l'avenant porte sur 10 000 € HT supplémentaires sur un marché initial de 100 000 € HT, le nouveau marché de référence devient 110 000 € HT. L'avancement en pourcentage se recalcule sur cette nouvelle base. Les travaux supplémentaires non encore couverts par un avenant signé doivent être facturés séparément ou attendre la régularisation. Ne jamais inclure du hors marché dans une situation sans avenant signé : c'est la première cause de litige en fin de chantier.",
  },
  {
    question: 'Comment Batup automatise-t-il les situations ?',
    answer:
      "Batup synchronise le planning de chantier (tâches réalisées vs. planifiées), calcule automatiquement le pourcentage d'avancement, génère la situation au format CERFA, applique la retenue de garantie, la TVA et déduit les acomptes déjà perçus. Vous validez d'un clic et envoyez la situation au maître d'œuvre. Les délais de paiement sont suivis en temps réel et les relances client se déclenchent automatiquement. Résultat : 4 heures gagnées en moyenne sur chaque fin de mois et un délai de paiement raccourci de 8 jours en moyenne sur les marchés actifs.",
  },
];
