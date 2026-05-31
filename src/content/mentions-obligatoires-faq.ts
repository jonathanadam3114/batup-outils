import type { FAQItem } from '@/components/FAQAccordion';

export const mentionsObligatoiresFAQ: FAQItem[] = [
  {
    question: 'Quelles sont les mentions obligatoires sur un devis BTP ?',
    answer:
      "Un devis BTP doit comporter une vingtaine de mentions cumulatives : numéro unique et date d'établissement, identification complète de l'entreprise (raison sociale, adresse, SIRET, code APE, RCS ou RM, forme juridique, capital si société, n° TVA intracommunautaire), identification du client, description détaillée des travaux avec décompte main d'œuvre et matériaux (Code conso art. L 111-1 et décret 2017-1166), durée de validité du devis, délai d'exécution, modalités de paiement, assurance décennale (nom assureur, n° contrat, couverture géographique — loi Spinetta), rappel des garanties légales, coordonnées du médiateur de la consommation pour les particuliers, et l'emplacement de signature du client précédée de « Bon pour accord ».",
  },
  {
    question: 'Quelles sont les mentions obligatoires sur une facture BTP ?',
    answer:
      "Une facture BTP cumule les mentions du droit commun (CGI art. 242 nonies A) et les obligations propres au bâtiment : numéro séquentiel, date d'émission, date de la prestation si différente, identification complète émetteur et client (avec n° TVA intra du client si B2B), désignation détaillée des prestations avec quantités et prix unitaires HT, taux et montant de TVA par ligne, total HT et TTC, date d'échéance, conditions d'escompte, pénalités de retard (3× taux légal minimum), indemnité forfaitaire de recouvrement de 40 €, mention TVA spécifique (autoliquidation, taux réduit, franchise), assurance décennale et mention du médiateur de la consommation si le client est un particulier.",
  },
  {
    question: 'Quelle amende si une mention est manquante sur ma facture ?',
    answer:
      "Les sanctions varient selon la mention omise. Une mention de facturation de droit commun manquante (date, identification, conditions de paiement) est sanctionnée par une amende administrative de 75 000 € (personne physique) à 2 000 000 € (personne morale) — Code commerce L 441-9. Une mention TVA erronée ou omise expose à 5 % du montant facturé (CGI art. 1737). L'absence de la mention médiateur de la consommation coûte jusqu'à 15 000 € (personne morale). Et l'absence d'assurance décennale mentionnée peut être qualifiée de pratique commerciale trompeuse (art. L 132-2 Code conso, amende jusqu'à 300 000 €).",
  },
  {
    question: 'Dois-je faire signer mes devis par le client ?',
    answer:
      "Oui, la signature du client précédée de la mention manuscrite « Bon pour accord » (ou « Bon pour travaux ») est obligatoire pour rendre le devis contractuellement opposable. Sans cette signature, le devis n'est qu'une proposition commerciale et le client peut refuser de payer en invoquant l'absence d'accord sur les prix ou la nature des travaux. La jurisprudence est constante : en cas de litige, c'est au professionnel d'apporter la preuve de l'accord — un devis signé suffit, un échange mail seul est insuffisant pour les particuliers (art. L 111-1 Code conso).",
  },
  {
    question: 'Comment numéroter mes devis et factures BTP ?',
    answer:
      "La numérotation doit être chronologique, séquentielle, sans rupture ni doublon (CGI art. 242 nonies A). Vous pouvez utiliser une série unique (F-2026-0001, F-2026-0002…) ou des séries distinctes par chantier, par établissement ou par année — à condition que chaque série soit elle-même séquentielle. Devis et factures peuvent avoir des préfixes différents (D- et F-). Toute rupture dans la séquence doit être justifiée (annulation, avoir) et tracée. Une numérotation aléatoire ou re-utilisée est considérée comme une dissimulation et peut entraîner un rejet de comptabilité avec taxation d'office.",
  },
  {
    question: 'Dois-je mentionner l’assurance décennale sur tous mes documents ?',
    answer:
      "Oui, dès lors que vous exercez une activité de construction soumise à l'obligation d'assurance décennale (loi Spinetta — art. L 241-1 Code des assurances). Vous devez indiquer : le nom de l'assureur ou de l'organisme de garantie, le numéro de contrat, la couverture géographique (France métropolitaine, DROM, etc.). Cette obligation a été renforcée par la loi Macron du 6 août 2015 : la mention doit figurer sur les devis et factures destinés à des consommateurs ET sur ceux destinés aux professionnels. L'omission est constitutive d'une pratique commerciale trompeuse.",
  },
  {
    question: 'Quelle mention TVA selon le type de travaux ?',
    answer:
      "Quatre cas types. En franchise en base (sous les seuils art. 293 B CGI, plafonds 2026 : 39 100 € prestations / 101 000 € travaux) : « TVA non applicable, art. 293 B du CGI ». En sous-traitance BTP avec donneur d'ordre assujetti : « Autoliquidation — TVA due par le preneur, art. 283-2 nonies du CGI ». En rénovation de logement de plus de 2 ans pour un particulier : taux 10 % avec attestation client à conserver. En travaux d'amélioration énergétique éligibles (isolation, chaudière à condensation) : taux 5,5 %. Pour le neuf et la plupart des autres cas : 20 %. Notre Calculateur TVA autoliquidation BTP vous guide.",
  },
  {
    question: 'La mention médiateur de la consommation est-elle obligatoire pour les pros ?',
    answer:
      "Non, l'obligation de mentionner un médiateur de la consommation agréé par la CECMC ne concerne que les relations B2C (entreprise vers particulier — art. L 612-1 Code conso). Si vous facturez exclusivement des professionnels (B2B), vous n'avez pas à mentionner de médiateur. Mais dès qu'un seul devis ou une seule facture est émise à destination d'un particulier, vous devez avoir adhéré à un médiateur de la consommation et mentionner ses coordonnées sur le document. L'adhésion coûte entre 100 et 300 € par an selon l'organisme (Médiateur du bâtiment, CM2C, etc.).",
  },
  {
    question: 'Que se passe-t-il si je ne mentionne pas les pénalités de retard ?',
    answer:
      "Deux conséquences cumulatives. Juridiquement, en l'absence de mention contractuelle des pénalités, c'est le taux d'intérêt légal qui s'applique d'office (deux fois par an, fixé par arrêté — 4,22 % au 1er semestre 2026 pour les créances pro), ce qui est dérisoire face à un retard de paiement. Administrativement, l'absence des mentions « pénalités de retard » et « indemnité forfaitaire de 40 € » est sanctionnée par une amende de la DGCCRF pouvant aller jusqu'à 75 000 € (personne physique) ou 2 000 000 € (personne morale) — art. L 441-16 Code commerce. C'est l'une des mentions les plus contrôlées.",
  },
];
