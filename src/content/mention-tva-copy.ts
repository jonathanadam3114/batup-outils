export const mentionTvaCopy = {
  seo: {
    title: 'Générateur de mention TVA pour facture BTP — taux 20 / 10 / 5,5 % | Batup',
    description:
      "Générez en 30 secondes la mention TVA exacte à mettre sur votre facture BTP : taux 20 %, 10 %, 5,5 %, autoliquidation (art. 283-2 nonies CGI) ou franchise en base (art. 293 B CGI). Outil gratuit pour artisans et entreprises du bâtiment.",
    canonicalPath: '/generateur-mention-tva-facture-btp',
  },
  webApplication: {
    name: 'Générateur de mention TVA pour facture BTP',
    description:
      "Arbre de décision gratuit qui détermine le taux de TVA applicable à une facture BTP (20 %, 10 %, 5,5 %, autoliquidation art. 283-2 nonies CGI ou franchise en base art. 293 B CGI) et fournit la mention légale exacte à recopier sur la facture, avec preview HT / TVA / TTC.",
  },
  hero: {
    h1: 'Quelle mention de TVA mettre sur ma facture BTP ?',
    lede: "Quatre questions pour le bon taux et la mention exacte à recopier : TVA 20 %, 10 % rénovation, 5,5 % rénovation énergétique, autoliquidation sous-traitance, ou franchise en base. Avec les références CGI et le calcul HT / TVA / TTC.",
  },
  ctaBanner: {
    title: 'Plus jamais d’erreur de taux de TVA sur vos factures',
    subtitle:
      "Batup détecte automatiquement le taux applicable (20 %, 10 %, 5,5 %, autoliquidation ou franchise) selon le client et le type de travaux, puis écrit la mention exacte sur chaque facture. Plus jamais de redressement TVA.",
  },
  methodology: {
    title: 'Comment on détermine le taux de TVA applicable',
    intro:
      "Le BTP cumule cinq régimes de TVA différents : le taux normal de 20 %, le taux intermédiaire de 10 %, le taux réduit de 5,5 %, l'autoliquidation sous-traitance, et la franchise en base. Le bon taux dépend du client, du type de travaux et de l'ancienneté du bien. Voici la grille de lecture.",
    blocks: [
      {
        heading: '1. TVA à 20 % — le taux normal (par défaut)',
        body: "C'est le taux applicable par défaut sur tous les travaux qui ne rentrent pas dans une catégorie spécifique : construction neuve, extension augmentant la surface de plus de 10 %, surélévation, démolition isolée, location de matériel sans pose, prestations intellectuelles (étude, conception, BE) non rattachées à un chantier de rénovation, travaux sur local professionnel ou commercial. Aucune mention particulière n'est requise sur la facture : il suffit d'indiquer « TVA 20 % » dans le tableau des totaux.",
      },
      {
        heading: '2. TVA à 10 % — rénovation d’un logement de + 2 ans (art. 279-0 bis CGI)',
        body: "Le taux intermédiaire de 10 % s'applique aux travaux d'amélioration, de transformation, d'aménagement ou d'entretien portant sur un local d'habitation achevé depuis plus de deux ans. Le logement doit être à usage d'habitation (résidence principale ou secondaire). L'attestation TVA — formulaire CERFA n° 1300 simplifié ou normal selon le montant — doit être remplie et signée par le client particulier avant la facturation, et conservée 5 ans par l'entreprise. Sans attestation, le taux applicable redevient 20 %.",
      },
      {
        heading: '3. TVA à 5,5 % — performance énergétique (art. 278-0 bis A CGI)',
        body: "Le taux réduit de 5,5 % s'applique aux travaux d'amélioration de la qualité énergétique sur un logement achevé depuis plus de deux ans : isolation thermique (combles, murs, planchers, fenêtres double vitrage), pompe à chaleur (air-eau, eau-eau, géothermique), chaudière biomasse (granulés, bûches), chauffe-eau solaire, VMC double flux. Les équipements doivent respecter les caractéristiques techniques de l'arrêté du 30 décembre 2019. L'attestation TVA est également obligatoire et conservée 5 ans.",
      },
      {
        heading: '4. Autoliquidation — sous-traitance BTP (art. 283-2 nonies CGI)',
        body: "Si vous êtes sous-traitant d'une entreprise du BTP titulaire du marché, vous facturez le donneur d'ordre en HT seul, sans TVA. C'est lui qui collecte et déduit la TVA dans sa propre déclaration CA3. La mention « TVA due par le preneur — Autoliquidation, article 283-2 nonies du CGI » est obligatoire sur la facture, sous peine d'une amende de 5 % du montant facturé (art. 1737 du CGI). Le régime s'applique sur tous les types de travaux (rénovation, neuf, démolition, travaux publics).",
      },
      {
        heading: '5. Franchise en base — sous les seuils (art. 293 B CGI)',
        body: "Si votre entreprise est en franchise en base de TVA (CA HT inférieur à 37 500 € pour les prestations de service — seuil majoré 41 250 € — et 85 000 € pour les livraisons de biens — seuil majoré 93 500 € — en 2026), vous ne facturez jamais de TVA, quel que soit le client ou le type de travaux. Plafonds 2026 — la réforme du seuil unique à 25 000 € a été suspendue en mars 2025. La mention « TVA non applicable — article 293 B du CGI » doit figurer sur toutes les factures. Vous ne pouvez pas non plus déduire la TVA sur vos propres achats. La sortie de franchise est automatique au dépassement des seuils majorés.",
      },
      {
        heading: "6. L'attestation TVA — sécurité fiscale obligatoire",
        body: "Pour appliquer le taux à 10 % ou 5,5 %, le particulier client doit signer une attestation TVA (CERFA 1300-SD simplifié si travaux < 300 € TTC, ou CERFA 1301-SD normal au-delà) avant le démarrage du chantier ou au plus tard à la facturation. Cette attestation engage la responsabilité du client sur la nature et l'ancienneté du logement. L'entreprise la conserve 5 ans avec la copie de la facture. Sans cette attestation, l'administration redresse l'entreprise sur la différence de TVA en cas de contrôle.",
      },
    ],
  },
};
