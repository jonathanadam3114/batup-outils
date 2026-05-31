import { lazy, Suspense } from 'react';
import { Route, Switch } from 'wouter';

const Home = lazy(() => import('./pages/home'));
const NotFound = lazy(() => import('./pages/not-found'));

// Pricing & marge
const CalculateurTauxHoraire = lazy(() => import('./pages/calculateur-taux-horaire'));
const CalculateurPrixChantier = lazy(() => import('./pages/calculateur-prix-chantier'));
const CalculateurMargeNette = lazy(() => import('./pages/calculateur-marge-nette'));
const CalculateurRevisionPrixBT = lazy(
  () => import('./pages/calculateur-revision-prix-index-bt')
);

// Paie & RH
const CalculateurHeuresSup = lazy(() => import('./pages/calculateur-heures-sup'));
const CalculateurCoutSalarie = lazy(() => import('./pages/calculateur-cout-salarie'));
const CalculateurIntemperies = lazy(() => import('./pages/calculateur-intemperies-cibtp'));
const CalculateurPrimeAnciennete = lazy(
  () => import('./pages/calculateur-prime-anciennete')
);

// Fiscal & légal
const CalculateurTvaAutoliquidation = lazy(
  () => import('./pages/calculateur-tva-autoliquidation')
);
const GenerateurMentionTva = lazy(() => import('./pages/generateur-mention-tva'));
const CalculateurChargesSociales = lazy(() => import('./pages/calculateur-charges-sociales'));
const ComparateurStatutJuridique = lazy(
  () => import('./pages/comparateur-statut-juridique')
);
const VerificateurMentions = lazy(
  () => import('./pages/verificateur-mentions-obligatoires')
);

// Cash, marchés & assurances
const CalculateurSituation = lazy(() => import('./pages/calculateur-situation-travaux'));
const CalculateurDGD = lazy(() => import('./pages/calculateur-dgd'));
const CalculateurRetenueGarantie = lazy(
  () => import('./pages/calculateur-retenue-garantie')
);
const SimulateurDecennale = lazy(() => import('./pages/simulateur-decennale'));
const SimulateurRcPro = lazy(() => import('./pages/simulateur-rc-pro'));
const CalculateurRoiRge = lazy(() => import('./pages/calculateur-roi-rge'));

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-brand-500" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Home} />

        {/* Pricing & marge */}
        <Route path="/calculateur-taux-horaire-btp" component={CalculateurTauxHoraire} />
        <Route path="/calculateur-prix-chantier-btp" component={CalculateurPrixChantier} />
        <Route
          path="/calculateur-marge-nette-coefficient-btp"
          component={CalculateurMargeNette}
        />
        <Route
          path="/calculateur-revision-prix-index-bt"
          component={CalculateurRevisionPrixBT}
        />

        {/* Paie & RH */}
        <Route
          path="/calculateur-heures-supplementaires-btp"
          component={CalculateurHeuresSup}
        />
        <Route path="/calculateur-cout-salarie-btp" component={CalculateurCoutSalarie} />
        <Route path="/calculateur-jours-intemperies-cibtp" component={CalculateurIntemperies} />
        <Route
          path="/calculateur-prime-anciennete-ccn-batiment"
          component={CalculateurPrimeAnciennete}
        />

        {/* Fiscal & légal */}
        <Route
          path="/calculateur-tva-autoliquidation-btp"
          component={CalculateurTvaAutoliquidation}
        />
        <Route path="/generateur-mention-tva-facture-btp" component={GenerateurMentionTva} />
        <Route
          path="/calculateur-charges-sociales-artisan-btp"
          component={CalculateurChargesSociales}
        />
        <Route
          path="/comparateur-statut-juridique-artisan-btp"
          component={ComparateurStatutJuridique}
        />
        <Route
          path="/verificateur-mentions-obligatoires-facture-devis-btp"
          component={VerificateurMentions}
        />

        {/* Cash, marchés & assurances */}
        <Route path="/calculateur-situation-travaux" component={CalculateurSituation} />
        <Route
          path="/calculateur-dgd-decompte-general-definitif"
          component={CalculateurDGD}
        />
        <Route path="/calculateur-retenue-de-garantie" component={CalculateurRetenueGarantie} />
        <Route path="/simulateur-decennale-btp" component={SimulateurDecennale} />
        <Route path="/simulateur-rc-pro-btp" component={SimulateurRcPro} />
        <Route path="/calculateur-roi-certification-rge" component={CalculateurRoiRge} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}
