import type { FAQItem } from '@/components/FAQAccordion';

export const revisionPrixIndexBTFAQ: FAQItem[] = [
  {
    question: "Qu'est-ce qu'un index BT et où le trouver ?",
    answer:
      "L'index BT (Bâtiment) est une série statistique publiée chaque mois par l'INSEE qui mesure l'évolution du coût des matériaux, de la main-d'œuvre, de l'énergie et des frais divers pour un corps d'état précis. Il existe une cinquantaine de sous-index : BT01 tous corps d'état, BT03 maçonnerie, BT47 électricité, BT49 couverture tuiles, etc. Les valeurs sont accessibles gratuitement sur insee.fr (rubrique « Indices et séries chronologiques », identifiants commençant par 00103). La série de référence en vigueur depuis 2014 est en base 100 = janvier 2010.",
  },
  {
    question: 'Quand dois-je réviser les prix de mon marché ?',
    answer:
      "La révision s'applique dès lors que le marché prévoit une clause de révision (CCAG-Travaux art. 10.4 pour le public, clause contractuelle équivalente en privé). Elle se calcule sur chaque situation de travaux mensuelle, en prenant la valeur de l'index BT du mois d'exécution réelle des prestations (pas le mois de facturation). En pratique, tout marché dont la durée dépasse 3 mois bénéficie d'une révision. Sur un marché à prix ferme, aucune révision n'est possible — d'où l'intérêt de négocier l'inclusion de la clause dès la signature.",
  },
  {
    question: 'Quelle est la formule de révision standard CCAG-Travaux ?',
    answer:
      "La formule canonique du CCAG-Travaux (article 10.4) est : P_n = P_0 × (0,15 + 0,85 × BT_n / BT_0). P_0 est le prix initial HT, BT_0 la valeur de l'index au mois zéro contractuel (mois de l'offre ou M − 1 de la signature), BT_n la valeur au mois de révision. Les coefficients 0,15 (part fixe non révisable) et 0,85 (part variable indexée) sont la convention standard ; ils peuvent être ajustés contractuellement mais leur somme doit faire 1. Cette formule s'applique à toutes les sommes HT, y compris les acomptes et le solde.",
  },
  {
    question: "Quel index BT choisir selon mon corps de métier ?",
    answer:
      "Pour un marché tous corps d'état confondus, utilisez BT01. Pour un lot spécifique : BT03 gros œuvre / maçonnerie, BT06 charpente bois, BT07 charpente métallique, BT08 plâtrerie, BT09 carrelage, BT10 menuiserie, BT16a plomberie sanitaire, BT17 chauffage, BT38 peinture, BT40 étanchéité, BT41 toiture, BT47 électricité courants forts, BT49 couverture tuiles, BT50 rénovation-entretien, BT51 menuiserie PVC, BT53 stores et fermetures. Le CCAP du marché doit explicitement nommer l'index retenu, sinon le maître d'ouvrage peut le contester.",
  },
  {
    question: 'La révision est-elle obligatoire ou optionnelle ?',
    answer:
      "La révision n'est ni automatique ni obligatoire : elle n'existe que si le contrat la prévoit. En marchés publics, le CCAG-Travaux la prévoit en option mais l'acheteur doit cocher la case et préciser l'index ; à défaut, le marché est à prix ferme. En marchés privés, c'est une négociation. Pour un marché supérieur à 6 mois en période d'inflation, son inclusion est essentielle : sans elle, vous absorbez seul la hausse des matériaux et de la main-d'œuvre, ce qui peut représenter 5 à 10 % du prix sur 18 mois.",
  },
  {
    question: 'Comment éviter une révision défavorable ?',
    answer:
      "Trois leviers. D'abord, négocier la part fixe à la hausse (20 % au lieu de 15 %) si vous anticipez une baisse de l'index — cela atténue la révision à la baisse. Ensuite, choisir l'index le mieux corrélé à vos coûts réels (un menuisier qui accepte BT01 prend le risque d'écart avec BT10). Enfin, prévoir un délai d'exécution serré et indiqué au planning : plus le délai est court, moins l'écart BT_n / BT_0 sera grand. Sur un marché à forte volatilité matière (cuivre, acier), une clause d'indexation matière séparée est plus précise qu'un index BT global.",
  },
  {
    question: 'Puis-je négocier le coefficient fixe (0,15) ?',
    answer:
      "Oui, le 0,15 / 0,85 est la convention CCAG-Travaux mais rien n'interdit contractuellement de la modifier. En pratique, on observe des répartitions de 0,10 / 0,90 (marchés à forte part matière, par exemple gros œuvre) à 0,25 / 0,75 (marchés à forte part main-d'œuvre, par exemple finition). La règle absolue : la somme des deux coefficients doit faire exactement 1, sinon la formule n'a plus de cohérence économique. Tout coefficient hors 0,15 / 0,85 doit être explicitement mentionné au CCAP avec sa justification.",
  },
  {
    question: 'La révision s\'applique-t-elle aux acomptes déjà versés ?',
    answer:
      "Oui : chaque situation mensuelle est révisée au BT_n du mois d'exécution des prestations, qu'elle ait déjà été facturée ou non. Si vous avez facturé un acompte au BT de mars mais que les travaux ont été réalisés en avril, c'est BT_avril qui s'applique — un ajustement (positif ou négatif) figure alors sur la situation suivante. Le solde final cumule toutes les révisions des situations antérieures et applique BT_n du mois de la dernière prestation. Une révision a posteriori sur 12 mois est juridiquement valide tant qu'elle reste dans les délais de prescription quinquennale.",
  },
];
