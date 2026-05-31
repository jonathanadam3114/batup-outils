export const tvaAutoliquidationCopy = {
  seo: {
    title: 'Calculateur TVA autoliquidation BTP — sous-traitance | Batup',
    description:
      "Déterminez en 30 secondes si votre facture de sous-traitance BTP doit être en autoliquidation de TVA (art. 283-2 nonies CGI). Mention exacte à recopier, taux applicable, régime franchise. Outil gratuit pour artisans.",
    canonicalPath: '/calculateur-tva-autoliquidation-btp',
  },
  webApplication: {
    name: 'Calculateur TVA autoliquidation sous-traitance BTP',
    description:
      "Arbre de décision gratuit qui identifie le régime de TVA applicable à une facture BTP (autoliquidation art. 283-2 nonies CGI, TVA classique avec taux 5,5 / 10 / 20 %, franchise en base art. 293 B CGI) et fournit la mention exacte à recopier sur la facture.",
  },
  hero: {
    h1: 'Autoliquidation TVA en sous-traitance BTP : faut-il l’appliquer ?',
    lede: "Cinq questions, un verdict clair : votre facture passe-t-elle en autoliquidation, en TVA classique ou en franchise en base ? Avec la mention exacte à recopier et la référence légale (article 283-2 nonies du CGI).",
  },
  ctaBanner: {
    title: 'Plus jamais d’erreur de régime TVA',
    subtitle:
      "Batup détecte automatiquement le régime applicable (auto-liquidation, taux réduit 10 %, franchise en base) à partir du client et du type de travaux, puis écrit la mention exacte sur chaque facture. Fini les redressements TVA.",
  },
  methodology: {
    title: 'Comment on détermine le régime de TVA applicable',
    intro:
      "Le régime d'autoliquidation en sous-traitance BTP a été introduit par la loi de finances 2014 (article 283-2 nonies du CGI). Il ne s'applique que si trois conditions cumulatives sont remplies. Sinon, vous restez sur la TVA classique avec un taux qui dépend du chantier — ou sur la franchise en base si vous y êtes soumis.",
    blocks: [
      {
        heading: '1. Vous êtes bien sous-traitant, pas titulaire du marché',
        body: "L'autoliquidation ne s'applique que si vous facturez un autre professionnel du BTP qui est lui-même titulaire du marché vis-à-vis du maître d'ouvrage final. Si vous facturez directement le client final (particulier, syndic, promoteur, collectivité), vous êtes en TVA classique. Le statut « sous-traitant » au sens de l'article 283-2 nonies est large : il couvre toute entreprise du BTP intervenant sur un chantier pour le compte d'une autre.",
      },
      {
        heading: '2. Votre client est un assujetti à la TVA établi en France',
        body: "Le donneur d'ordre doit être une entreprise assujettie et redevable de la TVA en France. Si votre client est un particulier, une entreprise étrangère hors UE, ou une structure exonérée, l'autoliquidation ne joue pas. Pour un client UE assujetti, c'est le régime des prestations intracommunautaires qui s'applique, pas l'autoliquidation sous-traitance.",
      },
      {
        heading: '3. Les travaux portent sur un immeuble',
        body: "Sont concernés : la construction, la rénovation, la réparation, la démolition, l'entretien-nettoyage rattaché à des travaux immobiliers, et les travaux publics (voirie, réseaux). Sont exclus : la simple location de matériel sans pose, les prestations d'étude ou de conception non rattachées à des travaux, et la fabrication d'éléments en atelier livrés sans pose.",
      },
      {
        heading: '4. La mention obligatoire sur la facture',
        body: "Si l'autoliquidation s'applique, votre facture doit porter la mention « TVA due par le preneur — Autoliquidation, article 283-2 nonies du CGI ». Vous ne facturez pas de TVA : le montant est en HT seul. C'est votre client qui collecte et déduit la TVA dans sa propre déclaration. Une omission de cette mention expose à un redressement et à une amende de 5 % du montant facturé (art. 1737 du CGI).",
      },
      {
        heading: '5. Le cas particulier de la franchise en base',
        body: "Si vous êtes en franchise en base de TVA (art. 293 B du CGI, plafonds 2026 : 37 500 € — seuil majoré 41 250 € — pour les prestations de service, 85 000 € — seuil majoré 93 500 € — pour les livraisons de biens ; plafonds 2026 — la réforme du seuil unique à 25 000 € a été suspendue en mars 2025), l'autoliquidation ne s'applique pas : vous ne facturez aucune TVA dans tous les cas, et la mention « TVA non applicable — art. 293 B du CGI » remplace toute autre mention TVA.",
      },
    ],
  },
};
