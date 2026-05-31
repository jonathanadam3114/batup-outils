import type { FAQItem } from '@/components/FAQAccordion';

export const primeAncienneteFAQ: FAQItem[] = [
  {
    question: "Qu'est-ce que la prime d'ancienneté CCN bâtiment ?",
    answer:
      "C'est une majoration du salaire mensuel versée aux ouvriers et ETAM du bâtiment ayant au moins 3 ans d'ancienneté dans la même entreprise, prévue par les conventions collectives nationales du bâtiment (article 6.2 pour les ouvriers, article 14 pour les ETAM). Le taux progresse par palier triennal : pour les ouvriers, 3 % à 3 ans, 6 % à 6 ans, 9 % à 9 ans, 12 % à 12 ans, 15 % à 15 ans (plafond) ; pour les ETAM, 1 % à 3 ans, 2 % à 6 ans, 3 % à 9 ans, 4 % à 12 ans, 5 % à 15 ans (plafond). Important : l'assiette légale est le salaire minimum conventionnel de la classification (Niveau-Position) et non le brut réel négocié. L'outil simplifie en utilisant le brut saisi — pour une estimation strictement légale, saisissez le minimum conventionnel. Elle est obligatoire dès lors que la convention collective s'applique à l'entreprise (codes APE 41 à 43 essentiellement) et apparaît sur une ligne distincte de la fiche de paie.",
  },
  {
    question: 'Quel est le barème exact de la prime d’ancienneté 2026 ?',
    answer:
      "Barème canonique ouvriers (CCN art. 6.2) : moins de 3 ans → 0 % ; 3 à 5 ans → 3 % ; 6 à 8 ans → 6 % ; 9 à 11 ans → 9 % ; 12 à 14 ans → 12 % ; 15 ans et plus → 15 % (plafond). Barème ETAM (CCN art. 14) : moins de 3 ans → 0 % ; 3 à 5 ans → 1 % ; 6 à 8 ans → 2 % ; 9 à 11 ans → 3 % ; 12 à 14 ans → 4 % ; 15 ans et plus → 5 % (plafond). Les pourcentages se figent au palier en cours jusqu'à l'année anniversaire suivante. Attention : la convention prévoit que des accords régionaux peuvent fixer des taux légèrement différents — vérifiez auprès de votre caisse CIBTP régionale ou de votre OPCO Constructys. L'écart reste cependant marginal en pratique.",
  },
  {
    question: 'Sur quelle assiette se calcule la prime ?',
    answer:
      "Légalement, la prime d'ancienneté se calcule sur le salaire minimum conventionnel de la classification (Niveau-Position), pas sur le brut réel négocié. Si l'ouvrier est payé au-dessus du minimum, la prime se calcule sur le minimum — le reste est de la « rémunération libre » non soumise au barème. Concrètement : un ouvrier N3-P2 dont le minimum conventionnel régional est 2 100 € et qui est payé 2 400 € touchera 3 % × 2 100 = 63 €, et non 3 % × 2 400 = 72 €. Dans l'outil, on simplifie en utilisant le brut saisi : si vous voulez la valeur strictement conforme à la CCN, saisissez le minimum conventionnel de la classification. Hors heures supplémentaires, hors primes ponctuelles et hors indemnités (panier, trajet, grand déplacement). Une fois calculée, la prime s'ajoute au brut, subit les mêmes cotisations sociales que le salaire normal et reste imposable au titre de l'impôt sur le revenu.",
  },
  {
    question: 'À partir de quand la prime est-elle due ?',
    answer:
      "Dès le premier mois suivant la date anniversaire du palier d'ancienneté. Si un ouvrier a été embauché le 15 avril 2023, son palier 3 ans (3 %) s'applique à partir d'avril 2026. La prime du mois d'avril 2026 sera donc calculée sur la totalité du mois (et non au prorata des jours suivant l'anniversaire). Le palier 6 ans (6 %) prendra le relais en avril 2029, etc. Il faut suivre attentivement les dates d'embauche : un oubli de palier est rattrapable sur 3 ans (prescription salariale) — autant dire qu'un calcul manuel en paie vaut bien plus douloureux qu'un calcul automatique appliqué dès la date anniversaire.",
  },
  {
    question: "Quel est le coût employeur réel de la prime d'ancienneté ?",
    answer:
      "Chaque euro de prime versé au salarié déclenche environ 42 % de charges patronales supplémentaires (URSSAF, retraite complémentaire, prévoyance, CIBTP, accident du travail). Le coût total employeur est donc d'environ 1,42 € pour 1 € de prime brute. Exemple : un ouvrier à 2 200 € de brut avec 9 % d'ancienneté reçoit 198 € de prime mensuelle, soit 2 376 € de prime annuelle, soit ≈ 3 374 € de coût employeur annuel chargé. C'est non négligeable — et c'est pourquoi le coût horaire chargé utilisé dans vos devis doit intégrer la prime, sinon vous perdez sur les vieux salariés sans le voir.",
  },
  {
    question: 'Les ETAM et les cadres ont-ils aussi droit à la prime ?',
    answer:
      "Les ETAM oui, avec un barème spécifique : la CCN ETAM bâtiment (article 14) prévoit 1 % à 3 ans, 2 % à 6 ans, 3 % à 9 ans, 4 % à 12 ans, 5 % à 15 ans (plafond). L'outil calcule la prime ETAM en sélectionnant le bon type de contrat. Les cadres bâtiment, eux, n'ont pas de barème conventionnel : la CCN cadres ne prévoit pas de prime d'ancienneté barémée. L'ancienneté joue plutôt sur la classification (position 1 à 4) et sur les augmentations individuelles négociées chaque année — d'où l'affichage « non applicable / barème individuel négocié » pour les cadres dans l'outil.",
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
    question: 'Barème canonique ou taux régionaux applicables ?',
    answer:
      "Le barème utilisé dans l'outil (ouvriers 3/6/9/12/15 %, ETAM 1/2/3/4/5 %) est le barème canonique national fixé par la CCN ouvriers du bâtiment (article 6.2, accord du 8 octobre 1990) et la CCN ETAM bâtiment (article 14). La convention collective ouvriers précise que les taux exacts peuvent être ajustés par les accords régionaux types — selon votre région, certains paliers peuvent être légèrement différents (par exemple 3,5 % à 3 ans dans certaines caisses, ou un sur-barème conventionnel d'entreprise). Vérifiez toujours auprès de votre CIBTP régionale ou de votre expert-comptable pour la paie réelle. L'écart reste cependant marginal et n'affecte pas matériellement la décision de gestion.",
  },
];
