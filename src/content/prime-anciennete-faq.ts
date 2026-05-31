import type { FAQItem } from '@/components/FAQAccordion';

export const primeAncienneteFAQ: FAQItem[] = [
  {
    question: "Qu'est-ce que la prime d'ancienneté CCN bâtiment ?",
    answer:
      "C'est une majoration du salaire brut mensuel versée aux ouvriers du bâtiment ayant au moins 3 ans d'ancienneté dans la même entreprise, prévue par la convention collective nationale ouvriers du bâtiment. Le taux progresse par palier : 2 % à 3 ans, 4 % à 5 ans, 6 % à 10 ans, 8 % à 15 ans, 10 % à 20 ans, 12 % à 25 ans et 15 % à 30 ans (plafond). Elle est obligatoire dès lors que la convention collective s'applique à l'entreprise (codes APE 41 à 43 essentiellement) et apparaît sur une ligne distincte de la fiche de paie.",
  },
  {
    question: 'Quel est le barème exact de la prime d’ancienneté 2026 ?',
    answer:
      "Le barème indicatif national appliqué dans l'outil pour 2026 est : moins de 3 ans → 0 % ; 3 ans → 2 % ; 5 ans → 4 % ; 10 ans → 6 % ; 15 ans → 8 % ; 20 ans → 10 % ; 25 ans → 12 % ; 30 ans et plus → 15 % (plafond définitif). Les pourcentages se figent au palier supérieur jusqu'à l'année anniversaire suivante. Attention : la convention parle de « taux fixé par les accords régionaux » — selon votre région, les pourcentages peuvent légèrement différer (la caisse CIBTP régionale ou votre OPCO Constructys peuvent les confirmer).",
  },
  {
    question: 'Sur quelle assiette se calcule la prime ?',
    answer:
      "La prime d'ancienneté se calcule sur le salaire brut mensuel de base, hors heures supplémentaires, hors primes ponctuelles (prime d'objectif, 13ème mois) et hors indemnités (panier repas, indemnité de trajet, grand déplacement). Une fois calculée, elle s'ajoute au brut et entre dans le cumul soumis à cotisations sociales salariales et patronales. Elle est donc imposable au titre de l'impôt sur le revenu et entre dans l'assiette CSG/CRDS. Exemple : sur un brut de 2 200 € avec 4 % d'ancienneté, la prime mensuelle est de 88 € — qui devient le nouveau brut de référence soumis à cotisations.",
  },
  {
    question: 'À partir de quand la prime est-elle due ?',
    answer:
      "Dès le premier mois suivant la date anniversaire du palier d'ancienneté. Si un ouvrier a été embauché le 15 avril 2023, son palier 3 ans (2 %) s'applique à partir d'avril 2026. La prime du mois d'avril 2026 sera donc calculée sur la totalité du mois (et non au prorata des jours suivant l'anniversaire). Le palier 5 ans (4 %) prendra le relais en avril 2028, etc. Il faut suivre attentivement les dates d'embauche : un oubli de palier est rattrapable sur 3 ans (prescription salariale) — autant le temps de bien plus douloureux qu'un calcul automatique en paie.",
  },
  {
    question: "Quel est le coût employeur réel de la prime d'ancienneté ?",
    answer:
      "Chaque euro de prime versé au salarié déclenche environ 42 % de charges patronales supplémentaires (URSSAF, retraite complémentaire, prévoyance, CIBTP, accident du travail). Le coût total employeur est donc d'environ 1,42 € pour 1 € de prime brute. Exemple : un ouvrier à 2 200 € de brut avec 10 % d'ancienneté reçoit 220 € de prime mensuelle, soit 2 640 € de prime annuelle, soit ≈ 3 750 € de coût employeur annuel chargé. C'est non négligeable — et c'est pourquoi le coût horaire chargé utilisé dans vos devis doit intégrer la prime, sinon vous perdez sur les vieux salariés sans le voir.",
  },
  {
    question: 'Les ETAM et les cadres ont-ils aussi droit à la prime ?',
    answer:
      "Non, pas avec le même barème. Le barème de 2 % à 15 % concerne uniquement les ouvriers du bâtiment (CCN nationale ouvriers BTP). Les ETAM (employés, techniciens, agents de maîtrise) relèvent d'une autre convention collective, qui peut prévoir une prime d'ancienneté intégrée à la grille de salaire minimum ou versée différemment selon les accords d'entreprise. Les cadres n'ont en règle générale pas de prime d'ancienneté contractuelle dans la convention BTP — l'ancienneté joue plutôt sur la classification (position 1 à 4) et sur les augmentations individuelles. L'outil affiche « non applicable » pour ces deux catégories.",
  },
  {
    question: "Peut-on supprimer ou réduire la prime d'ancienneté ?",
    answer:
      "Non, pas unilatéralement. La prime d'ancienneté est un élément contractuel du salaire dès lors que la convention collective s'applique : elle ne peut être ni supprimée ni minorée par décision de l'employeur. Une modification du contrat de travail (par exemple, intégration de la prime dans le brut de base) doit recueillir l'accord écrit du salarié. En cas de rupture du contrat, la prime entre dans le calcul du salaire de référence utilisé pour les indemnités de licenciement, de préavis et de congés payés. Mieux vaut donc l'isoler clairement sur la fiche de paie.",
  },
  {
    question: "Que se passe-t-il en cas de changement d'employeur ?",
    answer:
      "L'ancienneté repart à zéro chez le nouvel employeur, sauf cas particuliers : transfert de contrat dans le cadre d'une reprise d'entreprise (article L. 1224-1 du Code du travail), changement d'entreprise au sein d'un même groupe avec convention de transfert, ou reprise après période d'essai non concluante. En cas de transfert L. 1224-1, l'ancienneté acquise chez le précédent employeur est intégralement reportée et le palier de prime ne change pas. C'est un point à vérifier soigneusement en cas de rachat de fonds de commerce ou de sous-traitance en cascade.",
  },
  {
    question: 'Barème indicatif ou taux régionaux applicables ?',
    answer:
      "Le barème utilisé dans l'outil (2 %, 4 %, 6 %, 8 %, 10 %, 12 %, 15 %) est un barème indicatif national pour 2026, calé sur la pratique majoritaire des caisses CIBTP régionales. La convention collective ouvriers du bâtiment précise que les taux exacts sont fixés par les accords régionaux — selon votre région, certains paliers peuvent être légèrement différents (par exemple 2,5 % à 3 ans dans certaines caisses, ou un palier intermédiaire à 7 ans). Vérifiez toujours auprès de votre CIBTP régionale ou de votre expert-comptable pour la paie réelle. L'écart reste cependant minime et n'affecte pas matériellement la décision de gestion.",
  },
];
