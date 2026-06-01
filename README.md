# outils.batup.fr — Calculateurs gratuits pour les professionnels du BTP

Calculateurs et simulateurs gratuits pour les artisans, entreprises et chefs de chantier du BTP, accessibles sur **[outils.batup.fr](https://outils.batup.fr)**.

---

## Pour l'équipe marketing

### Ce qu'est ce site

Un mini-site indépendant (séparé de l'application Batup) qui propose **19 outils gratuits** pour les professionnels du BTP. Chaque outil a une page dédiée, optimisée pour le référencement naturel (SEO), et se termine par un appel à l'action vers l'inscription sur **[app.batup.fr](https://app.batup.fr)**.

Ce sont des **lead magnets** : un artisan cherche "calculateur taux horaire BTP" sur Google, trouve notre outil, s'en sert, puis découvre Batup.

### Liste des 19 outils (avec leur URL)

| Outil | URL |
|---|---|
| Calculateur de taux horaire BTP | `/calculateur-taux-horaire-btp` |
| Calculateur de prix chantier | `/calculateur-prix-chantier-btp` |
| Calculateur marge nette / coefficient | `/calculateur-marge-nette-coefficient-btp` |
| Calculateur révision de prix (Index BT) | `/calculateur-revision-prix-index-bt` |
| Calculateur heures supplémentaires BTP | `/calculateur-heures-supplementaires-btp` |
| Calculateur coût salarié employeur | `/calculateur-cout-salarie-btp` |
| Calculateur jours d'intempéries CIBTP | `/calculateur-jours-intemperies-cibtp` |
| Calculateur prime d'ancienneté CCN Bâtiment | `/calculateur-prime-anciennete-ccn-batiment` |
| Calculateur TVA autoliquidation | `/calculateur-tva-autoliquidation-btp` |
| Générateur de mention TVA (facture/devis) | `/generateur-mention-tva-facture-btp` |
| Calculateur charges sociales artisan | `/calculateur-charges-sociales-artisan-btp` |
| Comparateur statut juridique artisan | `/comparateur-statut-juridique-artisan-btp` |
| Vérificateur mentions obligatoires (facture/devis) | `/verificateur-mentions-obligatoires-facture-devis-btp` |
| Calculateur situation de travaux | `/calculateur-situation-travaux` |
| Calculateur DGD (Décompte Général Définitif) | `/calculateur-dgd-decompte-general-definitif` |
| Calculateur retenue de garantie | `/calculateur-retenue-de-garantie` |
| Simulateur assurance décennale BTP | `/simulateur-decennale-btp` |
| Simulateur RC Pro BTP | `/simulateur-rc-pro-btp` |
| Calculateur ROI certification RGE | `/calculateur-roi-certification-rge` |

### Comment fonctionne un outil ?

Chaque page est structurée ainsi :
1. **Formulaire de calcul** — l'utilisateur saisit ses données, le résultat s'affiche instantanément.
2. **Résultats commentés** — explication du résultat (conseils, seuils, réglementation).
3. **Appel à l'action** — bouton vers l'inscription Batup (`app.batup.fr/signup?source=nom-de-l-outil`), qui personnalise la page d'inscription avec les données du calculateur.

### Comment mettre à jour le contenu d'un outil

Les textes (titres, descriptions, explications) sont directement dans les fichiers `.tsx` de `src/pages/`. Chaque fichier correspond à un outil. Pour modifier un texte :

1. Ouvrir le fichier correspondant dans `src/pages/` (ex. `calculateur-taux-horaire.tsx` pour le calculateur taux horaire).
2. Modifier le texte dans le JSX (entre les balises HTML).
3. Créer un commit et pousser sur la branche `main` → le site se redéploie automatiquement en moins de 2 minutes via Cloudflare Pages.

> **Attention :** ne pas modifier les fonctions de calcul (dans `src/lib/`) sans vérification technique — elles sont validées par des tests unitaires.

### Comment ajouter un nouveau calculateur

Chaque nouveau calculateur est un fichier TypeScript React dans `src/pages/`. Le process complet est documenté dans `docs/how-to-add-tool.md` (à créer si besoin). En attendant, l'équipe technique peut dupliquer une page existante comme base.

---

## Pour l'équipe technique

### Architecture

Mini-site Vite + React + Tailwind, déployé sur **Cloudflare Pages**. Séparé intentionnellement de l'app Batup principale pour :
- Bundle ~50 KB vs ~1 MB dans le SaaS → chargement instantané
- Déploiements en ~30 secondes vs ~5 minutes
- Cadence indépendante — le marketing peut itérer sans toucher à l'app
- Autorité de domaine SEO séparée sur `outils.batup.fr`

### Structure du projet

```
src/
  pages/          — Un fichier par outil (19 calculateurs)
  components/     — Composants partagés (layout, CTA signup, etc.)
  lib/            — Logique de calcul et utilitaires
    pricing.ts    — Formules mathématiques des calculateurs
    urls.ts       — URLs des hôtes (app.batup.fr, www.batup.fr) — hardcodées
  App.tsx         — Routes de l'application
  main.tsx        — Point d'entrée
scripts/
  prerender.ts    — Génère le HTML statique pour le SEO (lancé au build)
```

### Commandes

```bash
npm install
npm run dev        # Développement local → localhost:5173
npm run build      # Build production → dist/ (inclut le prérendu SEO)
npm run preview    # Servir dist/ localement
npm run typecheck  # Vérification TypeScript
npm test           # Tests unitaires (formules de calcul)
```

### Déploiement

Push sur `main` → Cloudflare Pages détecte le push, lance `npm run build`, publie `dist/` sur `outils.batup.fr` automatiquement.

- **Build command :** `npm run build`
- **Output directory :** `dist`
- **Node version :** 20

### CTA et tracking

- Chaque outil pointe vers `https://app.batup.fr/signup?source=<slug-outil>` — le slug identifie l'outil dans le dashboard admin Batup (colonne "Origine" dans `/admin`).
- Les liens marketing vont vers `https://www.batup.fr`.
- Ces URLs sont centralisées dans `src/lib/urls.ts` — ne pas les modifier directement dans les composants.

### Contrat de duplication de code

Les formules de `src/lib/pricing.ts` sont dupliquées depuis l'app Batup principale. Ce choix est délibéré : ces valeurs sont fixées par la réalité comptable et réglementaire (taux horaires, marges), donc la duplication est peu risquée. En cas de changement, mettre à jour les deux repos.
