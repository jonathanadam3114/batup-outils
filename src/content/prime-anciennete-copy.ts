export const primeAncienneteCopy = {
  seo: {
    title:
      "Calculateur prime d'ancienneté CCN bâtiment — barème ouvriers et ETAM 2026 | Batup",
    description:
      "Calculez en 30 secondes la prime d'ancienneté d'un ouvrier ou ETAM du bâtiment selon le barème CCN : 3 % à 3 ans, 6 % à 6 ans, jusqu'à 15 % à 15 ans (ouvriers, art. 6.2). Outil gratuit pour artisans et PME du BTP.",
    canonicalPath: '/calculateur-prime-anciennete-ccn-batiment',
  },
  webApplication: {
    name: "Calculateur prime d'ancienneté CCN bâtiment",
    description:
      "Calculateur gratuit qui chiffre la prime mensuelle et annuelle d'ancienneté d'un ouvrier ou ETAM du bâtiment à partir du barème canonique de la convention collective : ouvriers (CCN art. 6.2) 0 % avant 3 ans, 3 % à 3 ans, 6 % à 6 ans, 9 % à 9 ans, 12 % à 12 ans, 15 % à 15 ans (plafond) ; ETAM (CCN art. 14) 1 % à 3 ans, 2 % à 6 ans, 3 % à 9 ans, 4 % à 12 ans, 5 % à 15 ans (plafond).",
  },
  hero: {
    h1: "Calculateur prime d'ancienneté CCN bâtiment : barème ouvriers (3 → 15 %) et ETAM (1 → 5 %)",
    lede:
      "Quelle prime d'ancienneté votre ouvrier ou votre ETAM doit-il toucher chaque mois ? Quel coût employeur réel cela représente sur l'année, charges comprises ? L'outil ci-dessous applique le barème canonique 2026 des conventions collectives nationales (art. 6.2 pour les ouvriers, art. 14 pour les ETAM) et chiffre la prime à intégrer en paie.",
  },
  ctaBanner: {
    title: "La prime d'ancienneté devrait remonter automatiquement en paie",
    subtitle:
      "Batup connaît la date d'embauche de chaque salarié, applique le bon palier d'ancienneté CCN, alimente la fiche de paie et met à jour le coût horaire chargé utilisé dans chaque devis. Plus de paliers oubliés, plus de marge surestimée.",
  },
  methodology: {
    title: "Comment on calcule la prime d'ancienneté CCN bâtiment",
    intro:
      "La méthode reprend les barèmes canoniques fixés par la convention collective nationale ouvriers du bâtiment (article 6.2, accord du 8 octobre 1990) et la CCN ETAM bâtiment (article 14). Les accords régionaux peuvent fixer des taux légèrement différents d'une caisse CIBTP à l'autre, mais l'écart reste marginal.",
    blocks: [
      {
        heading: '1. Barème ouvriers (CCN art. 6.2) : 3 / 6 / 9 / 12 / 15 %',
        body: "La CCN ouvriers du bâtiment prévoit un barème progressif par palier de 3 ans : 0 % avant 3 ans, 3 % de 3 à 5 ans, 6 % de 6 à 8 ans, 9 % de 9 à 11 ans, 12 % de 12 à 14 ans, et 15 % à partir de 15 ans (plafond définitif). Le palier s'applique dès l'année anniversaire, sur le salaire minimum conventionnel de la classification. Exemple : un ouvrier embauché le 15 avril 2023 passe au palier 3 % au 1er avril 2026.",
      },
      {
        heading: '2. Barème ETAM (CCN art. 14) : 1 / 2 / 3 / 4 / 5 %',
        body: "Les ETAM (employés, techniciens, agents de maîtrise) du bâtiment ont aussi droit à une prime d'ancienneté, avec un barème distinct et un plafond plus bas : 0 % avant 3 ans, 1 % de 3 à 5 ans, 2 % de 6 à 8 ans, 3 % de 9 à 11 ans, 4 % de 12 à 14 ans, 5 % à partir de 15 ans (plafond). Même logique de palier triennal que les ouvriers, mais sur la grille de salaire minimum conventionnel ETAM.",
      },
      {
        heading: '3. Assiette : salaire minimum conventionnel, pas le brut réel',
        body: "Légalement, la prime se calcule sur le salaire minimum conventionnel de la classification (Niveau-Position), pas sur le brut réel négocié. Si l'ouvrier est payé au-dessus du minimum, la prime se calcule sur le minimum — le reste constitue de la « rémunération libre ». Dans l'outil, par simplification, on utilise le brut saisi : si vous souhaitez l'estimation légale stricte, saisissez le minimum conventionnel de la classification. La prime est ensuite ajoutée au brut, soumise aux mêmes cotisations sociales et imposable au titre de l'IR.",
      },
      {
        heading: '4. Coût employeur : prime × 1,42 environ',
        body: "Côté employeur, la prime d'ancienneté n'est pas neutre : elle augmente le brut, donc déclenche des charges patronales supplémentaires (URSSAF, retraite, prévoyance, CIBTP, accident du travail). Avec un taux global de charges patronales BTP autour de 42 %, chaque euro de prime versé au salarié coûte environ 1,42 € à l'entreprise — à intégrer dans le coût horaire chargé et la marge de chaque chantier.",
      },
      {
        heading: '5. Cadres bâtiment : pas de barème conventionnel',
        body: "La CCN cadres du bâtiment ne prévoit pas de prime d'ancienneté barémée. L'ancienneté joue plutôt sur la classification (position 1 à 4) et sur les augmentations individuelles négociées chaque année. C'est pourquoi l'outil affiche « non applicable » pour les cadres : il n'existe pas de taux canonique à appliquer mécaniquement.",
      },
    ],
  },
};
