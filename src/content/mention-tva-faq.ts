import type { FAQItem } from '@/components/FAQAccordion';

export const mentionTvaFAQ: FAQItem[] = [
  {
    question: 'Quel taux de TVA pour des travaux de rénovation classique ?',
    answer:
      "Pour des travaux d'amélioration, de transformation, d'aménagement ou d'entretien portant sur un logement achevé depuis plus de deux ans, le taux applicable est 10 % (article 279-0 bis du CGI). Cela couvre la majorité des chantiers de rénovation : peinture, plomberie, électricité, carrelage, menuiserie, ravalement. Le client particulier doit signer une attestation TVA (CERFA 1300 ou 1301) à conserver 5 ans. Pour un local professionnel, un logement de moins de 2 ans, ou des travaux de construction neuve, le taux reste de 20 %.",
  },
  {
    question: 'Quand puis-je appliquer la TVA à 5,5 % ?',
    answer:
      "Le taux réduit de 5,5 % s'applique aux travaux d'amélioration de la qualité énergétique d'un logement achevé depuis plus de deux ans (article 278-0 bis A du CGI). Sont concernés : l'isolation thermique (combles, murs, planchers, fenêtres double vitrage à isolation renforcée), les pompes à chaleur air-eau, eau-eau ou géothermiques, les chaudières biomasse (granulés ou bûches), les chauffe-eau solaires, les VMC double flux. Les équipements doivent respecter les caractéristiques de l'arrêté du 30 décembre 2019. L'attestation TVA signée par le client est obligatoire.",
  },
  {
    question: 'La TVA à 10 % est-elle applicable sur les matériaux ?',
    answer:
      "Oui, mais sous condition. Quand l'entreprise fournit ET pose les matériaux dans le cadre d'un chantier de rénovation éligible, l'ensemble — main d'œuvre et matériaux — bénéficie du taux à 10 %. Mais si le particulier achète lui-même les matériaux dans un magasin de bricolage et fait seulement appel à un artisan pour la pose, l'achat des matériaux reste au taux à 20 % en magasin. Le taux réduit ne s'applique pas non plus aux gros équipements (chaudière classique non éligible, ascenseur, etc.) listés dans l'article 279-0 bis du CGI.",
  },
  {
    question: 'Qu’est-ce que l’attestation TVA obligatoire et qui doit la remplir ?',
    answer:
      "Pour bénéficier du taux à 10 % ou 5,5 %, le client particulier doit remplir et signer une attestation TVA avant la facturation : formulaire CERFA n° 1300-SD (simplifié) si les travaux sont inférieurs à 300 € TTC, formulaire CERFA n° 1301-SD (normal) au-delà. L'attestation engage la responsabilité du client sur l'ancienneté du logement (+ de 2 ans) et la nature des travaux. L'entreprise conserve une copie pendant 5 ans avec la facture. Sans cette attestation, l'administration redresse l'entreprise sur le différentiel de TVA (10 ou 14,5 points selon le taux appliqué).",
  },
  {
    question: 'La franchise en base permet-elle de facturer sans TVA ?',
    answer:
      "Oui. La franchise en base de TVA (article 293 B du CGI) dispense l'entreprise de collecter la TVA, quel que soit le client ou le type de travaux. Plafonds 2026 — la réforme du seuil unique à 25 000 € a été suspendue en mars 2025 : 37 500 € HT (seuil) / 41 250 € HT (seuil majoré) pour les prestations de service, 85 000 € HT (seuil) / 93 500 € HT (seuil majoré) pour les livraisons de biens. La mention « TVA non applicable — article 293 B du CGI » doit obligatoirement figurer sur chaque facture. Contrepartie : l'entreprise ne peut pas déduire la TVA sur ses propres achats (matériaux, outillage, sous-traitance), ce qui peut rendre la franchise moins avantageuse au-delà d'un certain volume d'achats.",
  },
  {
    question: 'Que se passe-t-il si je me trompe de taux de TVA ?',
    answer:
      "Si vous facturez à un taux inférieur à celui dû (10 % au lieu de 20 %, par exemple, sans attestation), l'administration peut redresser l'entreprise sur le différentiel de TVA, majoré d'intérêts de retard de 0,20 % par mois et d'une pénalité de 40 % en cas de manquement délibéré (article 1729 du CGI). Si vous facturez un taux supérieur à celui dû (20 % au lieu de 10 %), vous devez reverser la TVA facturée, mais le client peut vous demander une facture rectificative. Dans les deux cas, le contrôle est rétroactif sur 3 ans (délai de reprise de l'article L169 du LPF).",
  },
  {
    question: 'Comment refacturer un sous-traitant : avec ou sans TVA ?',
    answer:
      "Si vous êtes sous-traitant d'une entreprise du BTP titulaire du marché vis-à-vis du client final, vous facturez en autoliquidation : montant HT seul, sans ligne TVA, avec la mention obligatoire « TVA due par le preneur — Autoliquidation, article 283-2 nonies du CGI ». C'est le donneur d'ordre qui collecte et déduit la TVA sur sa propre déclaration CA3. Le mécanisme est neutre financièrement mais sécurise la collecte pour l'État. Cette règle s'applique sur tous les chantiers (rénovation, neuf, démolition, travaux publics), à condition que le donneur d'ordre soit un assujetti à la TVA établi en France.",
  },
  {
    question: 'Le taux à 5,5 % s’applique-t-il aussi à l’isolation ?',
    answer:
      "Oui, à condition que l'isolation respecte les caractéristiques techniques de l'arrêté du 30 décembre 2019. Pour l'isolation des combles, la résistance thermique R doit être ≥ 7 m².K/W (combles perdus) ou ≥ 6 m².K/W (rampants). Pour les murs : R ≥ 3,7 m².K/W. Pour les planchers bas : R ≥ 3 m².K/W. Pour les fenêtres : Uw ≤ 1,3 W/m².K et Sw ≥ 0,3. Si les performances ne sont pas atteintes (par exemple, un simple double vitrage classique sans isolation renforcée), le taux à 5,5 % ne s'applique pas — on retombe à 10 % pour rénovation classique sur logement de + 2 ans, ou 20 % sinon.",
  },
];
