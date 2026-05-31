import type { FAQItem } from '@/components/FAQAccordion';

export const chargesSocialesFAQ: FAQItem[] = [
  {
    question: 'Quel est le taux de cotisations sociales pour un artisan BTP en micro-entreprise ?',
    answer:
      "Pour un artisan du bâtiment en micro-entreprise (prestations BIC, code APE 41 à 43), le taux global URSSAF appliqué au CA encaissé est de 21,2 % en 2026, auquel s'ajoute 0,3 % de contribution à la formation professionnelle. Avec l'ACRE la première année, le taux est divisé par deux (10,6 %). À noter : les cotisations sont calculées sur le CA encaissé, pas sur le bénéfice. Vous payez donc des cotisations même les mois où vous n'avez aucun bénéfice net.",
  },
  {
    question: "Comment l'ACRE réduit-elle mes cotisations sociales ?",
    answer:
      "L'Aide aux Créateurs et Repreneurs d'Entreprise (ACRE) est une exonération partielle de cotisations pendant les 12 premiers mois d'activité. Concrètement, le taux est divisé par deux : 10,6 % au lieu de 21,2 % pour un micro-entrepreneur BTP, environ 27 % au lieu de 45 % pour un TNS au réel. Conditions principales : être demandeur d'emploi, jeune de moins de 26 ans, bénéficiaire du RSA, ou créer dans une zone d'urbanisme prioritaire. La demande se fait à l'URSSAF dans les 45 jours suivant la création.",
  },
  {
    question: 'Combien gagne réellement un artisan BTP après cotisations sociales ?',
    answer:
      "Pour un micro-entrepreneur facturant 80 000 € HT/an, les cotisations URSSAF + CFP représentent environ 17 200 €, soit un reste de 62 800 € avant impôt sur le revenu et avant achats. Pour un EI au réel avec 80 000 € de CA et 30 000 € de bénéfice, les cotisations TNS sont d'environ 13 500 €, soit un reste de 16 500 € avant IR. Ces chiffres restent indicatifs : vos vrais résultats dépendent de votre achat-revente, de votre TVA, et de votre marge nette opérationnelle.",
  },
  {
    question: 'Faut-il payer la TVA en plus des cotisations sociales ?',
    answer:
      "La TVA n'est pas une charge personnelle mais une taxe que vous collectez pour l'État. En micro-entreprise, vous bénéficiez de la franchise en base de TVA (art. 293 B CGI) jusqu'à 37 500 € de CA HT pour les prestations de service (seuil majoré 41 250 €) ou 85 000 € pour les livraisons de biens (seuil majoré 93 500 €) en 2026 : vous facturez sans TVA et ne la récupérez pas sur vos achats. Plafonds 2026 — la réforme du seuil unique à 25 000 € a été suspendue en mars 2025. Au-delà, ou en EI au réel / SARL / SAS, vous facturez la TVA et la reversez. En BTP rénovation logement, le taux est de 10 % ; en neuf, 20 %. La TVA est neutre fiscalement mais lourde en trésorerie : il faut la mettre de côté chaque mois.",
  },
  {
    question: 'Faut-il choisir micro-entreprise ou EI au réel pour démarrer ?',
    answer:
      "La micro est plus simple administrativement, mais elle pénalise les artisans avec beaucoup d'achats matériaux : vous payez des cotisations sur tout le CA sans pouvoir déduire vos achats. L'EI au réel est plus optimisée dès que vous avez 30 % et plus de matériaux dans votre CA : vous ne payez les cotisations que sur le bénéfice réel. Règle empirique : sous 50 000 € de CA et avec peu de matériaux → micro. Au-dessus de 80 000 € ou avec beaucoup d'achats → EI au réel ou EURL.",
  },
  {
    question: "Quelle est la différence entre cotisations SARL gérant majoritaire et SAS président ?",
    answer:
      "Le gérant majoritaire de SARL est travailleur non salarié (TNS) : il paye environ 45 % de cotisations sur sa rémunération, sans assurance chômage. Le président de SAS est assimilé salarié : il paye environ 70 à 80 % de cotisations (part employeur + part salarié) mais bénéficie du régime général de la Sécurité sociale. La SAS coûte plus cher en cotisations mais offre une meilleure protection sociale et permet de moduler facilement rémunération et dividendes (les dividendes ne supportent pas les cotisations sociales).",
  },
  {
    question: "Le versement libératoire de l'impôt vaut-il le coup ?",
    answer:
      "Le versement libératoire (1,7 % du CA pour les prestations BIC en BTP) règle l'IR en même temps que les cotisations. Il n'est intéressant que si votre foyer fiscal est dans la tranche à 30 % ou plus. Si vous êtes non imposable ou dans la tranche à 11 %, le barème progressif classique est plus avantageux car vous bénéficiez de l'abattement forfaitaire de 50 % sur le CA (régime micro-BIC services). À simuler chaque année selon les revenus globaux du foyer.",
  },
  {
    question: "Qu'est-ce qui n'est PAS inclus dans cette estimation ?",
    answer:
      "Cette estimation ne couvre que les cotisations sociales obligatoires. Ne sont pas comptés : l'impôt sur le revenu (IR) ou l'IS, la TVA, la CFE (cotisation foncière des entreprises, 200 à 3 000 €/an), la RC pro et la décennale (1 500 à 4 000 €/an en BTP), la mutuelle obligatoire, la prévoyance, l'éventuelle complémentaire retraite Madelin. Comptez 5 000 à 8 000 € supplémentaires par an pour ces postes selon votre métier et votre couverture.",
  },
  {
    question: 'Ces chiffres sont-ils exacts ?',
    answer:
      "Les chiffres affichés sont indicatifs et calculés sur la base du barème 2026 publié par l'URSSAF, la SSI et la CIPAV. Ils correspondent aux taux moyens constatés pour un artisan BTP standard. Votre situation réelle peut varier selon : zone géographique (ZRR, QPV), formation continue, complémentaire santé, prévoyance, options retraite, etc. Confirmez avec votre comptable avant toute décision juridique, fiscale ou de trésorerie. Cet outil est une aide à la réflexion, pas un avis comptable.",
  },
];
