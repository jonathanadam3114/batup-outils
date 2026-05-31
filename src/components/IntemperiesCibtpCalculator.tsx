import { useMemo, useState, type ReactNode } from 'react';
import { AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';
import { StickyResultBar } from './StickyResultBar';

interface Inputs {
  tauxHoraire: number;
  heuresParJour: number;
  joursArret: number;
  nbSalaries: number;
  cumulAnnee: number;
}

const DEFAULTS: Inputs = {
  tauxHoraire: 13,
  heuresParJour: 7,
  joursArret: 1,
  nbSalaries: 1,
  cumulAnnee: 0,
};

// Barème 2026 — Code du travail L. 5424-6 à L. 5424-15, D. 5424-7
// Plafond horaire indemnité = 75 % × (120 % × PHSS).
// PHSS 2026 ≈ 29,00 €/h (sous réserve du décret PASS 2026).
// → plafond horaire travail = 1,20 × 29,00 = 34,80 €/h
// → plafond indemnité = 0,75 × 34,80 ≈ 26,10 €/h
const CARENCE_HEURES = 1;
const TAUX_INDEMNITE = 0.75;
const PHSS_2026 = 29.0;
const PLAFOND_HORAIRE_SALAIRE = PHSS_2026 * 1.2; // 34,80 €/h
const PLAFOND_HORAIRE = PLAFOND_HORAIRE_SALAIRE * TAUX_INDEMNITE; // 26,10 €/h
const PLAFOND_JOURS_CAMPAGNE = 55;
const HEURES_MAX_PAR_JOUR = 8;

const NUMBER_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const RATE_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });

function fmtEuro(n: number, decimals = 0): string {
  if (!Number.isFinite(n) || n <= 0) return '— €';
  const fmt = decimals > 0 ? RATE_FMT : NUMBER_FMT;
  return `${fmt.format(decimals > 0 ? n : Math.round(n))} €`;
}

function fmtRate(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— €/h';
  return `${RATE_FMT.format(n)} €/h`;
}

export function IntemperiesCibtpCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const updateNum = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const results = useMemo(() => {
    const heuresJour = Math.min(Math.max(inputs.heuresParJour, 0), HEURES_MAX_PAR_JOUR);
    const heuresIndemnisablesJour = Math.max(0, heuresJour - CARENCE_HEURES);

    const tauxBrut = Math.max(0, inputs.tauxHoraire) * TAUX_INDEMNITE;
    const tauxApplique = Math.min(tauxBrut, PLAFOND_HORAIRE);
    const plafonne = tauxBrut > PLAFOND_HORAIRE;

    const indemniteJourParSalarie = heuresIndemnisablesJour * tauxApplique;
    const indemniteTotalSalarie = indemniteJourParSalarie * Math.max(0, inputs.joursArret);
    const indemniteTotale = indemniteTotalSalarie * Math.max(0, inputs.nbSalaries);

    const cumulApresPeriode = Math.max(0, inputs.cumulAnnee) + Math.max(0, inputs.joursArret);
    const resteAvantPeriode = Math.max(0, PLAFOND_JOURS_CAMPAGNE - Math.max(0, inputs.cumulAnnee));
    const resteApresPeriode = Math.max(0, PLAFOND_JOURS_CAMPAGNE - cumulApresPeriode);
    const depassePlafond = inputs.joursArret > resteAvantPeriode;
    const proche = !depassePlafond && resteApresPeriode <= 5 && inputs.joursArret > 0;

    return {
      heuresJour,
      heuresIndemnisablesJour,
      tauxBrut,
      tauxApplique,
      plafonne,
      indemniteJourParSalarie,
      indemniteTotalSalarie,
      indemniteTotale,
      cumulApresPeriode,
      resteAvantPeriode,
      resteApresPeriode,
      depassePlafond,
      proche,
    };
  }, [inputs]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: 'calculateur-intemperies-cibtp' });
    if (results.indemniteTotale > 0) {
      params.set('indemnite', results.indemniteTotale.toFixed(0));
    }
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [results.indemniteTotale]);

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Salaire et arrêt</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Taux horaire brut du salarié"
              hint="Salaire horaire de base, hors primes"
              suffix="€/h"
              value={inputs.tauxHoraire}
              onChange={(v) => updateNum('tauxHoraire', v)}
              step="0.5"
            />
            <Field
              label="Heures travaillées par jour"
              hint="Journée type du salarié (max 8 h)"
              suffix="h"
              value={inputs.heuresParJour}
              onChange={(v) => updateNum('heuresParJour', v)}
              step="0.5"
            />
            <Field
              label="Jours d'intempéries sur la période"
              hint="Jours d'arrêt à indemniser maintenant"
              suffix="jours"
              value={inputs.joursArret}
              onChange={(v) => updateNum('joursArret', v)}
              step="1"
            />
            <Field
              label="Salariés concernés"
              hint="Équipe immobilisée par l'arrêt"
              suffix="pers."
              value={inputs.nbSalaries}
              onChange={(v) => updateNum('nbSalaries', v)}
              step="1"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plafond par campagne CIBTP</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field
              label={
                <span className="flex items-center gap-1">
                  Jours déjà indemnisés sur la campagne en cours
                  <span
                    title="Cumul intempéries du salarié depuis le 1er novembre. Plafond légal de 55 jours par salarié et par campagne intempéries (1er novembre — 31 mars), art. L. 5424-15."
                    className="cursor-help text-gray-400"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </span>
                </span>
              }
              hint="Pour vérifier le reste de plafond avant blocage"
              suffix="jours"
              value={inputs.cumulAnnee}
              onChange={(v) => updateNum('cumulAnnee', v)}
              step="1"
            />
            <div className="rounded-md bg-gray-50 p-3 text-xs text-gray-600">
              <p className="font-semibold text-gray-700">Plafond légal</p>
              <p className="mt-1">55 jours maximum par salarié et par campagne intempéries (1er novembre — 31 mars), tous arrêts confondus. Art. L. 5424-15 du Code du travail.</p>
              <p className="mt-2">Reste avant cette période : <span className="font-semibold text-gray-900">{results.resteAvantPeriode} j</span></p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20">
          <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
            <CardHeader>
              <CardTitle>Votre résultat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">Indemnité CIBTP totale</p>
                <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">
                  {fmtEuro(results.indemniteTotale)}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Remboursement employeur estimé pour la période
                </p>
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <Row
                  label={`Heures indemnisables / jour (−${CARENCE_HEURES} h carence)`}
                  value={`${RATE_FMT.format(results.heuresIndemnisablesJour)} h`}
                />
                <Row
                  label={
                    results.plafonne
                      ? 'Taux indemnisation (plafonné)'
                      : 'Taux indemnisation (75 %)'
                  }
                  value={fmtRate(results.tauxApplique)}
                />
                <Row
                  label="Indemnité par jour et par salarié"
                  value={fmtEuro(results.indemniteJourParSalarie, 2)}
                />
                <Row
                  label={`× ${inputs.nbSalaries} salarié(s) × ${inputs.joursArret} jour(s)`}
                  value={fmtEuro(results.indemniteTotale, 2)}
                />
              </div>

              {results.plafonne && (
                <div
                  className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800"
                  role="status"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <p>
                    Indemnité horaire plafonnée à {RATE_FMT.format(PLAFOND_HORAIRE)} €/h
                    (75 % × 120 % du PHSS, art. D. 5424-7). Au-delà, l'employeur paie l'écart de sa poche.
                  </p>
                </div>
              )}

              {results.depassePlafond && (
                <div
                  className="flex items-start gap-2 rounded-md border border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-800"
                  role="status"
                  data-testid="verdict-plafond-depasse"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <p>
                    <span className="font-semibold">Plafond de campagne dépassé.</span>{' '}
                    Reste indemnisable sur la campagne (1er nov. — 31 mars) : {results.resteAvantPeriode} j. Au-delà, la caisse CIBTP ne rembourse plus.
                  </p>
                </div>
              )}

              {results.proche && (
                <div
                  className="flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800"
                  role="status"
                  data-testid="verdict-plafond-proche"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <p>
                    Plafond 55 j de campagne proche : il restera {results.resteApresPeriode} j après cette période.
                  </p>
                </div>
              )}

              <div className="rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-600">
                <span className="font-semibold text-gray-700">À noter :</span> l'article L. 5424-12 énonce
                la carence d'1 heure « par arrêt » ; la pratique des caisses CIBTP applique cette carence
                « par jour calendaire ». L'outil suit la pratique CIBTP.
              </div>

              <div className="rounded-md bg-brand-50 px-4 py-3 text-xs text-gray-700">
                Cette indemnité est <span className="font-semibold">remboursée par la caisse CIBTP</span> de votre région à l'employeur. Le salarié, lui, perçoit son salaire normal sur la fiche de paie.
              </div>

              <div className="space-y-2 pt-2">
                <a href={ctaSignupHref} data-testid="cta-signup">
                  <Button className="h-11 w-full rounded-full">
                    Essayer Batup gratuitement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <p className="text-xs text-center text-gray-500">
                  Vous payez le salaire, la CIBTP vous rembourse — Batup détecte les arrêts depuis les pointages et prépare le dossier automatiquement.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <StickyResultBar
        label="Indemnité CIBTP totale"
        value={fmtEuro(results.indemniteTotale)}
        ctaHref={ctaSignupHref}
      />
    </div>
  );
}

function Field({
  label,
  hint,
  suffix,
  value,
  onChange,
  step = 'any',
}: {
  label: ReactNode;
  hint?: ReactNode;
  suffix: string;
  value: number;
  onChange: (v: string) => void;
  step?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type="number"
          inputMode="decimal"
          min={0}
          step={step}
          value={value === 0 ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className={suffix ? 'pr-16' : ''}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
