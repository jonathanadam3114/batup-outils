import type { FAQItem } from '@/components/FAQAccordion';

export const retenueGarantieFAQ: FAQItem[] = [
  {
    question: 'Qu\'est-ce que la retenue de garantie de 5 % dans le BTP ?',
    answer:
      "C'est une somme que le client (maître d'ouvrage) est autorisé à retenir sur chaque acompte ou paiement, dans la limite de 5 % du montant TTC, pour garantir la bonne exécution des travaux pendant l'année qui suit la réception. Elle est encadrée par la Loi n° 71-584 du 16 juillet 1971 modifiée, qui s'applique à tous les marchés de travaux privés sans seuil de montant minimal. Au-dessus de 5 %, la clause est nulle de plein droit et l'entrepreneur peut exiger le versement immédiat.",
  },
  {
    question: 'La retenue se calcule sur le HT ou sur le TTC ?',
    answer:
      "Sur le montant TTC du marché. Pour un chantier de 50 000 € HT avec TVA à 20 %, le montant TTC est de 60 000 € et la retenue maximale légale est de 3 000 €. C'est un point souvent mal compris : beaucoup d'artisans calculent la retenue sur le HT par habitude et sous-estiment ainsi le montant réellement immobilisé. Le calculateur ci-dessus applique automatiquement la formule sur le TTC selon le taux de TVA que vous indiquez.",
  },
  {
    question: 'Au bout de combien de temps la retenue est-elle libérée ?',
    answer:
      "1 an à compter de la date de réception des travaux, sans démarche particulière. La libération est automatique de plein droit, sauf si le maître d'ouvrage saisit le juge pendant ce délai pour faire reconnaître l'existence de désordres non résolus. Cette automaticité a été renforcée par la jurisprudence : le client n'a pas à donner son accord exprès, c'est le silence pendant 1 an qui vaut libération. Si vous n'avez rien reçu après 12 mois, envoyez une mise en demeure recommandée.",
  },
  {
    question: 'Que se passe-t-il si des réserves ont été émises ?',
    answer:
      "Si la réception est prononcée avec réserves, la retenue reste bloquée jusqu'à la levée écrite de toutes les réserves. Une fois les réserves levées, un nouveau délai d'un an démarre — ou la libération devient immédiate si plus d'un an s'est écoulé depuis la réception initiale. Conservez précieusement les courriers de levée de réserves : ils déclenchent l'obligation de libération. Sans ce document, le client peut indéfiniment retarder le paiement.",
  },
  {
    question: 'Comment fonctionne la caution bancaire en substitution ?',
    answer:
      "L'entrepreneur a le droit, sans accord préalable du client, de remplacer la retenue par une caution personnelle et solidaire émise par un établissement bancaire ou un organisme de cautionnement agréé (CGI, BTP Banque, SACAM). Le client est légalement obligé d'accepter cette caution et de verser 100 % du marché. Coût annuel : 1 à 3 % du montant garanti selon votre dossier. C'est un excellent levier de trésorerie sur les chantiers importants : le coût de la caution est en général très inférieur au coût d'opportunité de 5 % immobilisé pendant un an.",
  },
  {
    question: 'Quels sont les marchés concernés par la retenue de 5 % ?',
    answer:
      "Tous les marchés de travaux privés, quel que soit leur montant : la Loi 71-584 ne fixe aucun seuil minimal. Sont concernés les marchés de construction neuve, de rénovation, d'extension, d'agencement, et plus largement tous les marchés de travaux immobiliers. Ne sont pas concernés les contrats de pure fourniture, de prestation intellectuelle ou de maintenance courante (qui ne sont pas des marchés de travaux). La retenue reste un plafond facultatif : le client ne peut l'imposer que si le contrat la prévoit, et jamais au-delà de 5 % du TTC.",
  },
  {
    question: 'Le client peut-il refuser de libérer la retenue après 1 an ?',
    answer:
      "Non, sauf à avoir saisi le juge avant l'échéance pour faire reconnaître des désordres précis et non résolus. Si le client refuse sans avoir engagé d'action judiciaire, vous pouvez envoyer une mise en demeure recommandée avec accusé de réception, puis saisir le tribunal judiciaire (procédure simplifiée pour les sommes inférieures à 10 000 €). Dans 95 % des cas, la mise en demeure suffit. Pensez à conserver le procès-verbal de réception, les éventuelles levées de réserves et toutes les factures de la retenue : ce sont vos pièces justificatives.",
  },
  {
    question: 'La retenue peut-elle être inférieure à 5 % ?',
    answer:
      "Oui, le taux de 5 % est un plafond, pas une obligation. Le contrat peut prévoir une retenue de 2 %, 3 % ou 0 %. En revanche, le contrat ne peut pas dépasser 5 %, et toute clause stipulant un taux supérieur est nulle de plein droit, ramenant automatiquement la retenue à 0 € (et non à 5 % comme on le croit souvent). Si votre client propose une retenue de 7 %, refusez : c'est non seulement illégal, mais surtout vous donne le droit de réclamer 100 % du paiement sans retenue.",
  },
  {
    question: 'Comment suivre toutes ses retenues de garantie quand on a plusieurs chantiers ?',
    answer:
      "Excel devient vite ingérable au-delà de 5 chantiers : il faut suivre le montant retenu, la date de réception, le statut des réserves, la date de libération prévue et les relances client. Beaucoup d'artisans perdent ainsi plusieurs milliers d'euros par an de retenues oubliées. Batup centralise tous ces suivis, déclenche des alertes 30 jours avant chaque date de libération et automatise les courriers de réclamation. Vous récupérez en moyenne 3 à 5 % de trésorerie supplémentaire sur l'année dès la première utilisation.",
  },
];
