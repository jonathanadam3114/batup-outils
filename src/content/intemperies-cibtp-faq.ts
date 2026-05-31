import type { FAQItem } from '@/components/FAQAccordion';

export const intemperiesCibtpFAQ: FAQItem[] = [
  {
    question: "Qu'est-ce que l'indemnité d'intempéries CIBTP ?",
    answer:
      "C'est une indemnité versée au salarié du bâtiment quand le chantier s'arrête à cause des conditions météo (gel, neige, pluie diluvienne, vent fort, températures extrêmes). Le mécanisme est prévu par les articles L. 5424-6 à L. 5424-15 du Code du travail : l'employeur paie le salaire normal au salarié et se fait rembourser par la caisse Congés Intempéries BTP (CIBTP) de sa région. L'indemnité représente 75 % du salaire horaire brut, dans la limite de 130 % du SMIC horaire, après une carence d'une heure par arrêt et dans la limite de 55 jours par salarié et par an.",
  },
  {
    question: "Quels travaux ouvrent droit à l'indemnité intempéries ?",
    answer:
      "Seuls les travaux exécutés en plein air ouvrent droit au régime intempéries : gros œuvre, couverture, charpente, étanchéité, terrassement, VRD, façade, démolition, échafaudage extérieur, travaux publics. Les travaux de second œuvre exécutés en bâtiment clos et couvert (plâtrerie, plomberie, électricité, peinture, menuiserie intérieure) en sont exclus, sauf si la météo rend la circulation matérielle impossible (route bloquée, accès chantier inondé). En cas de doute, le chef de chantier doit motiver l'arrêt sur le constat — la caisse vérifie au cas par cas.",
  },
  {
    question: "Comment fonctionne la carence d'une heure ?",
    answer:
      "La première heure de chaque arrêt n'est jamais indemnisée par la caisse — c'est le délai de carence légal. Si l'arrêt couvre une journée entière de 7 heures, la caisse rembourse 6 heures. Si l'arrêt est de 3 heures (par exemple suite à une averse en milieu de matinée), elle en rembourse 2. Bonne pratique : si plusieurs interruptions ont lieu le même jour, regroupez-les en un seul arrêt sur le constat — vous n'aurez ainsi qu'une carence d'1 heure, pas plusieurs. La caisse considère que c'est un seul arrêt par journée calendaire.",
  },
  {
    question: "Quel est le plafond de l'indemnité horaire en 2026 ?",
    answer:
      "L'indemnité horaire est plafonnée à 75 % de 130 % du SMIC horaire brut. En 2026, le SMIC horaire est d'environ 11,86 € brut, ce qui donne un plafond de 11,55 €/h (= 11,86 × 1,30 × 0,75). Concrètement : un salarié payé 13 €/h touche 75 % × 13 € = 9,75 €/h indemnisé. Un salarié payé 18 €/h ne touche pas 13,50 € mais est plafonné à 11,55 €/h. Le salarié lui-même reçoit son salaire normal pendant l'arrêt — le plafond ne joue que sur le remboursement perçu par l'employeur.",
  },
  {
    question: "Que se passe-t-il au-delà des 55 jours par an ?",
    answer:
      "Au-delà de 55 jours d'arrêts intempéries indemnisés dans une année civile pour un même salarié, la caisse CIBTP cesse de rembourser. L'employeur continue de payer le salaire pendant l'arrêt mais le reste à charge devient intégral. Sur un hiver très rude, ce plafond se franchit vite, surtout sur les équipes couverture / charpente. Bonne pratique : suivre le cumul individuel jour par jour dès le début de l'année, et basculer prioritairement les équipes proches du plafond sur des chantiers intérieurs ou sur du SAV quand la météo bloque les façades.",
  },
  {
    question: "Qui paie le salarié pendant un arrêt intempéries ?",
    answer:
      "L'employeur paie le salaire intégral du salarié pendant l'arrêt, exactement comme s'il avait travaillé. Le salarié ne voit pas la différence sur sa fiche de paie : pas de retenue, pas de complément, le brut habituel. C'est l'employeur qui, après coup, déclare les heures d'arrêt à sa caisse CIBTP régionale et perçoit le remboursement à 75 % du taux horaire (dans la limite du plafond et après carence). La déclaration se fait mensuellement, en même temps que la DSN.",
  },
  {
    question: "Comment déclarer un arrêt intempéries à la CIBTP ?",
    answer:
      "Trois pièces sont nécessaires : (1) le constat d'arrêt signé par le chef de chantier le jour même, indiquant la cause météo, l'heure de début et de fin, et la liste des salariés concernés ; (2) le relevé Météo-France ou le bulletin du chantier le plus proche prouvant la condition météo invoquée ; (3) la déclaration mensuelle envoyée à la caisse CIBTP régionale via l'espace employeur en ligne, en parallèle de la DSN. Sans constat horodaté signé, la caisse refuse systématiquement le remboursement — même si la pluie était bien réelle.",
  },
  {
    question: "Un arrêt partiel de quelques heures est-il indemnisable ?",
    answer:
      "Oui, dès lors que l'arrêt empêche objectivement la poursuite du travail (averse violente, gel matinal, rafales). Il faut simplement déduire la carence d'1 heure. Exemple : la pluie démarre à 10 h, la journée reprend à 14 h : 4 heures d'arrêt → carence 1 h → 3 heures indemnisées. Le chef de chantier doit noter sur le constat les horaires précis de début et de fin d'arrêt, ainsi que les éventuels travaux de repli effectués (mise hors d'eau, bâchage, nettoyage) — ce temps de repli, lui, est du temps de travail normal et n'est pas indemnisé par la CIBTP.",
  },
  {
    question: "Barème indicatif 2026 ou taux régionaux applicables ?",
    answer:
      "L'outil utilise un barème indicatif national pour 2026 : carence 1 heure, taux 75 %, plafond horaire ≈ 11,55 €, plafond annuel 55 jours. Les taux et plafonds exacts sont fixés chaque année par décret (Code du travail) et peuvent évoluer en cours d'année avec la revalorisation du SMIC. Les caisses CIBTP régionales appliquent toutes les mêmes paramètres, mais peuvent avoir des règles de déclaration ou des outils en ligne légèrement différents (CIBTP Île-de-France, Sud-Est, Grand Est, etc.). Vérifiez toujours auprès de votre caisse régionale pour le dossier réel.",
  },
];
