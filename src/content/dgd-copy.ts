export const dgdCopy = {
  seo: {
    title: 'Calculateur DGD bâtiment — décompte général définitif | Batup',
    description:
      "Calculez en 1 minute le solde du DGD (décompte général définitif) de votre chantier BTP : marché initial, avenants, révisions de prix, pénalités, retenue de garantie et acomptes perçus. Outil gratuit conforme CCAG travaux.",
    canonicalPath: '/calculateur-dgd-decompte-general-definitif',
  },
  webApplication: {
    name: 'Calculateur DGD (décompte général définitif) BTP',
    description:
      "Calculateur gratuit qui détermine le solde du décompte général définitif (DGD) d'un chantier BTP : marché initial, avenants signés, révisions de prix sur indices BT, pénalités de retard, retenue de garantie 5 % (Loi 71-584) et acomptes déjà perçus. Conforme aux principes du CCAG travaux.",
  },
  hero: {
    h1: 'Calculateur DGD : décompte général définitif',
    lede: "Le DGD est le moment où la trésorerie se joue : avenants, révisions, pénalités, retenue, acomptes — chaque ligne compte. Cet outil applique les règles du CCAG travaux et de la Loi 71-584, et vous donne le solde exact à percevoir (ou à rembourser) en fin de chantier. Gratuit, sans inscription.",
  },
  ctaBanner: {
    title: 'Le DGD est le moment où la trésorerie se joue',
    subtitle:
      "Batup suit en temps réel avenants, révisions, retenues et pénalités sur chaque chantier. Au moment du DGD, vous avez le décompte prêt en 1 clic — pas de mauvaise surprise, pas de litige avec le maître d'ouvrage.",
  },
  methodology: {
    title: 'Comment se calcule un décompte général définitif (DGD)',
    intro:
      "Le DGD est le solde définitif d'un chantier : il fixe la somme due (ou à reverser) après la réception et avant la libération de la retenue de garantie. Pour les marchés publics, le mécanisme est cadré par le CCAG travaux 2021 (articles 12 et suivants). Pour les marchés privés, la pratique s'aligne le plus souvent sur ce même cadre. Voici les composants que le calculateur additionne.",
    blocks: [
      {
        heading: '1. Marché initial + avenants + révisions = montant définitif HT',
        body: "On part du montant HT du marché signé initialement. On ajoute les avenants validés (travaux modificatifs, travaux supplémentaires) et les révisions de prix appliquées via les indices BT (BT01 pour le tous corps d'état, ou les indices spécifiques par métier publiés par l'INSEE). Ces 3 composants forment le montant total des prestations réalisées HT, avant pénalités. Tout avenant non signé au moment du DGD est exclu et doit faire l'objet d'un recours séparé.",
      },
      {
        heading: '2. Pénalités de retard : à déduire systématiquement',
        body: "Si le chantier a connu du retard imputable à l'entreprise, des pénalités sont appliquées selon la formule du CCAP. Le CCAG travaux 2021 fixe par défaut la pénalité à 1/3000 du montant HT par jour de retard, plafonnée à 10 % du marché. Les pénalités se calculent à partir de la date de fin contractuelle (réception ou achèvement) et se déduisent du montant définitif HT. Vérifiez les délais d'intempéries (CIBTP) et de prolongation justifiée avant d'accepter le décompte du maître d'œuvre.",
      },
      {
        heading: "3. TVA et acomptes : la conversion en TTC, puis l'imputation des sommes perçues",
        body: "Sur le montant définitif HT, on applique la TVA du marché (20 %, 10 % ou 5,5 %) pour obtenir le montant définitif TTC. On soustrait ensuite la totalité des acomptes et situations déjà encaissés TTC depuis le début du chantier. Si le total des acomptes dépasse le montant définitif TTC (par exemple à cause de pénalités importantes ou d'une révision négative), le DGD est négatif : vous devez rembourser le trop-perçu au maître d'ouvrage.",
      },
      {
        heading: '4. Retenue de garantie : à libérer 1 an après réception sans réserves',
        body: "La retenue de 5 % (Loi 71-584 du 16 juillet 1971) reste consignée jusqu'à 1 an après la date de réception, ou jusqu'à la levée écrite des réserves. Elle s'ajoute au solde du DGD au moment de sa libération, sauf si une caution bancaire personnelle et solidaire a été substituée dès le départ — auquel cas la retenue est nulle et le DGD intègre 100 % du dû. Activez l'option « Caution bancaire en substitution » du calculateur pour modéliser ce cas.",
      },
    ],
  },
};
