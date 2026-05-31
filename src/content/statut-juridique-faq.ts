import type { FAQItem } from '@/components/FAQAccordion';

export const statutJuridiqueFAQ: FAQItem[] = [
  {
    question: 'Quel statut juridique choisir pour démarrer une activité BTP en 2026 ?',
    answer:
      "Si vous démarrez seul, sans associé, avec moins de 77 700 € de CA prévu en prestations pures (ou 188 700 € en achat-revente) et que vous voulez aller vite, la micro-entreprise reste imbattable la première année. Dès que vous prévoyez plus de 80 000 € de CA ou que vous achetez beaucoup de matériaux, basculez en EI au réel ou EURL pour déduire vos charges. Avec un ou plusieurs associés, la SARL ou la SAS deviennent obligatoires. Le comparateur ci-dessus vous donne la réponse adaptée à votre profil.",
  },
  {
    question: "Quelle est la différence entre EURL et SARL ?",
    answer:
      "L'EURL est une SARL avec un seul associé : juridiquement c'est la même forme, le régime social et fiscal change. En EURL à l'IR (par défaut), le bénéfice est imposé directement sur la déclaration personnelle du gérant. En EURL à l'IS (sur option), la société paye l'IS et le gérant ne paye des cotisations que sur sa rémunération. La SARL classique (2 associés et plus) est obligatoirement à l'IS sauf option SARL de famille. Concrètement : EURL pour démarrer seul avec une structure protectrice, SARL quand vous vous associez.",
  },
  {
    question: 'SAS ou SARL : laquelle choisir pour une entreprise BTP ?',
    answer:
      "SARL : cadre rigide mais protecteur, parts sociales, gérant majoritaire en TNS (~45 % de cotisations). SAS : grande liberté statutaire, actions, président assimilé salarié (70-80 % de cotisations mais protection régime général). La SAS est plus chère en cotisations mais permet de moduler facilement rémunération et dividendes (les dividendes en SAS échappent aux cotisations sociales). Pour le BTP : SARL si vous voulez le cadre rassurant, SAS si vous prévoyez de lever des fonds ou de faire entrer/sortir des associés. La SAS est devenue le standard des sociétés modernes.",
  },
  {
    question: "L'EI au réel protège-t-elle mon patrimoine personnel ?",
    answer:
      "Depuis le 15 mai 2022, l'Entrepreneur Individuel bénéficie automatiquement de la séparation patrimoine professionnel / patrimoine personnel : seuls les biens utilisés pour l'activité peuvent être saisis par les créanciers professionnels. Votre résidence principale est insaisissable de plein droit. C'est un changement majeur qui a rendu l'EI au réel quasi aussi protectrice qu'une EURL, avec moins de formalisme et zéro coût de constitution. Pour la majorité des artisans solo qui veulent quitter la micro, l'EI au réel est aujourd'hui le bon compromis.",
  },
  {
    question: 'À partir de quel CA faut-il quitter la micro-entreprise ?',
    answer:
      "Plafonds 2026 : 77 700 € HT pour les prestations pures (BIC services artisan), 188 700 € HT pour l'achat-revente de matériaux (loi de finances 2023, seuils gelés jusqu'à fin 2026). Vous restez en micro tant que vous êtes sous ces seuils sur 2 années consécutives. Mais le vrai seuil économique est différent : dès que vos achats matériaux dépassent 30 % du CA, ou dès 60 000 € de CA en prestations BIC, l'EI au réel devient plus rentable car vous déduisez vos charges réelles au lieu de subir l'abattement forfaitaire de 50 %.",
  },
  {
    question: 'Quel statut récupère la TVA sur les achats de matériaux ?',
    answer:
      "Tous les statuts hors micro en franchise. Attention : il faut distinguer le plafond du régime micro (77 700 € prestations / 188 700 € achat-revente en 2026) du seuil de franchise en base de TVA (art. 293 B CGI : 37 500 € prestations / 85 000 € livraisons de biens en 2026). En micro sous franchise TVA, vous ne facturez pas la TVA mais ne la récupérez pas non plus. Au-dessus du seuil de franchise (ou sur option), vous facturez la TVA et la récupérez sur vos achats. En EI au réel, EURL, SARL, SAS : récupération automatique. Pour un artisan BTP qui achète 30 000 € de matériaux/an, ça représente 6 000 € de TVA récupérée — un argument lourd pour quitter la micro dès que possible.",
  },
  {
    question: "Le statut peut-il être changé en cours de route ?",
    answer:
      "Oui, mais avec des coûts et des contraintes. De micro vers EI au réel : changement automatique au dépassement des plafonds, ou sur option. De micro vers EURL/SARL/SAS : il faut créer la société, transférer le fonds de commerce, faire publier l'annonce légale (200 à 400 €), payer le greffe (60 à 250 €) et changer tous les contrats clients en cours. C'est faisable mais ça coûte 1 000 à 2 500 € avec un expert-comptable. Mieux vaut bien choisir dès le départ si vous anticipez une croissance rapide.",
  },
  {
    question: 'Faut-il un capital social minimum pour créer une SARL ou une SAS ?',
    answer:
      "Non, le capital social est libre depuis longtemps : 1 € minimum théoriquement, mais cette pratique est mal vue par les banques et fournisseurs. En BTP, un capital de 3 000 à 8 000 € est un minimum crédible. Au-delà de 10 000 €, vous gagnez en crédibilité bancaire et facilitez vos demandes de financement. Le capital peut être libéré partiellement à la création (20 % minimum en SAS, 50 % en SARL) et le reste dans les 5 ans. Apport en nature possible (véhicule, outils) avec valorisation par un commissaire aux apports si > 30 000 €.",
  },
  {
    question: 'Cette recommandation remplace-t-elle un avis d’expert-comptable ?',
    answer:
      "Non. Cet outil donne une orientation basée sur les seuils légaux et les retours terrain les plus courants en BTP. Votre situation personnelle (régime matrimonial, dettes existantes, foyer fiscal, perspectives de cession dans 5-10 ans, projets de recrutement, etc.) peut totalement changer le bon choix. Les chiffres et seuils sont indicatifs (barème 2026). Confirmez avec votre comptable avant toute décision juridique ou d'immatriculation. La consultation d'un expert-comptable coûte 150 à 300 € — c'est un investissement minuscule par rapport à un mauvais statut.",
  },
];
