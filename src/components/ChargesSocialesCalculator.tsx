import { useMemo, useState } from 'react';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';
import { StickyResultBar } from './StickyResultBar';

type Statut = 'micro' | 'ei_reel' | 'eurl' | 'sarl' | 'sas';

interface Inputs {
  statut: Statut;
  ca: number;
  acre: boolean;
  beneficePct: number;
}

const DEFAULTS: Inputs = {
  statut: 'micro',
  ca: 0,
  acre: false,
  beneficePct: 30,
};

const NUMBER_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const PCT_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });

function fmtEuro(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— €';
  return `${NUMBER_FMT.format(Math.round(n))} €`;
}

function fmtPct(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— %';
  return `${PCT_FMT.format(n)} %`;
}

const STATUT_LABELS: Record<Statut, string> = {
  micro: 'Micro-entreprise',
  ei_reel: 'EI au réel',
  eurl: 'EURL (IR)',
  sarl: 'SARL (IS)',
  sas: 'SAS / SASU',
};

const STATUT_HINTS: Record<Statut, string> = {
  micro: 'Cotisations calculées sur le CA encaissé',
  ei_reel: 'TNS, cotisations sur le bénéfice',
  eurl: 'Gérant unique, TNS, cotisations sur le bénéfice',
  sarl: 'Gérant majoritaire TNS + IS',
  sas: 'Président assimilé salarié + IS (estimation indicative)',
};

interface Breakdown {
  label: string;
  amount: number;
}

interface Results {
  totalCotisations: number;
  breakdown: Breakdown[];
  resteAnnuel: number;
  resteMensuel: number;
  tauxEffectif: number;
  isAmount: number;
  warning?: string;
}

function computeResults(inputs: Inputs): Results {
  const { statut, ca, acre, beneficePct } = inputs;

  if (ca <= 0) {
    return {
      totalCotisations: 0,
      breakdown: [],
      resteAnnuel: 0,
      resteMensuel: 0,
      tauxEffectif: 0,
      isAmount: 0,
    };
  }

  if (statut === 'micro') {
    // Micro artisan BTP (prestations BIC) : 21,2 % + 0,3 % CFP
    const tauxUrssaf = acre ? 0.106 : 0.212;
    const cotisationsUrssaf = ca * tauxUrssaf;
    const cfp = ca * 0.003;
    const total = cotisationsUrssaf + cfp;
    const reste = ca - total;
    return {
      totalCotisations: total,
      breakdown: [
        {
          label: acre
            ? 'Cotisations URSSAF (10,6 % avec ACRE)'
            : 'Cotisations URSSAF (21,2 %)',
          amount: cotisationsUrssaf,
        },
        { label: 'CFP — formation pro (0,3 %)', amount: cfp },
      ],
      resteAnnuel: reste,
      resteMensuel: reste / 12,
      tauxEffectif: (total / ca) * 100,
      isAmount: 0,
    };
  }

  if (statut === 'ei_reel' || statut === 'eurl') {
    // TNS sur bénéfice : ~45 % décomposé, ~27 % avec ACRE
    const benefice = ca * (beneficePct / 100);
    const tauxTotal = acre ? 0.27 : 0.45;
    const total = benefice * tauxTotal;
    // Décomposition indicative (proportions des taux moyens TNS)
    const proportions = acre
      ? { urssaf: 0.5, retraite: 0.3, maladie: 0.15, csg: 0.05 }
      : { urssaf: 0.47, retraite: 0.31, maladie: 0.15, csg: 0.07 };
    const breakdown: Breakdown[] = [
      {
        label: 'Maladie-maternité + indemnités journalières',
        amount: total * proportions.maladie,
      },
      {
        label: 'Retraite de base + complémentaire',
        amount: total * proportions.retraite,
      },
      {
        label: 'Allocations familiales + invalidité-décès',
        amount: total * proportions.urssaf,
      },
      { label: 'CSG-CRDS', amount: total * proportions.csg },
    ];
    const reste = benefice - total;
    return {
      totalCotisations: total,
      breakdown,
      resteAnnuel: reste,
      resteMensuel: reste / 12,
      tauxEffectif: benefice > 0 ? (total / benefice) * 100 : 0,
      isAmount: 0,
      warning:
        "Reste avant impôt sur le revenu (IR). L'IR est calculé sur la déclaration personnelle du dirigeant.",
    };
  }

  // SARL ou SAS — fourchette indicative
  const benefice = ca * (beneficePct / 100);
  const tauxBas = statut === 'sarl' ? 0.45 : 0.7;
  const tauxHaut = statut === 'sarl' ? 0.55 : 0.82;
  // Hypothèse : 60 % du bénéfice en rémunération du dirigeant, 40 % en bénéfice imposable IS
  const remunerationDirigeant = benefice * 0.6;
  const beneficeImposable = benefice * 0.4;
  const cotisationsMoy =
    (remunerationDirigeant * tauxBas + remunerationDirigeant * tauxHaut) / 2;
  // IS : 15 % jusqu'à 42 500 €, 25 % au-dessus
  const isLow = Math.min(beneficeImposable, 42500) * 0.15;
  const isHigh = Math.max(0, beneficeImposable - 42500) * 0.25;
  const isAmount = isLow + isHigh;
  const totalCharges = cotisationsMoy + isAmount;
  const reste = benefice - totalCharges;
  return {
    totalCotisations: cotisationsMoy,
    breakdown: [
      {
        label:
          statut === 'sarl'
            ? `Cotisations TNS gérant majoritaire (${PCT_FMT.format(
                ((tauxBas + tauxHaut) / 2) * 100,
              )} % de la rémunération)`
            : `Cotisations assimilé salarié président SAS (${PCT_FMT.format(
                ((tauxBas + tauxHaut) / 2) * 100,
              )} % de la rémunération brute)`,
        amount: cotisationsMoy,
      },
      {
        label: `IS — 15 % jusqu'à 42 500 € puis 25 %`,
        amount: isAmount,
      },
    ],
    resteAnnuel: reste,
    resteMensuel: reste / 12,
    tauxEffectif: benefice > 0 ? (totalCharges / benefice) * 100 : 0,
    isAmount,
    warning:
      "Estimation très indicative : la fiscalité SARL/SAS dépend du partage rémunération/dividendes et de votre situation personnelle. Indispensable de consulter un expert-comptable.",
  };
}

export function ChargesSocialesCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const update = (key: keyof Inputs, value: string | boolean | Statut) => {
    setInputs((prev) => {
      if (typeof value === 'boolean') return { ...prev, [key]: value };
      if (key === 'statut') return { ...prev, statut: value as Statut };
      const num = parseFloat(String(value).replace(',', '.')) || 0;
      return { ...prev, [key]: num };
    });
  };

  const results = useMemo(() => computeResults(inputs), [inputs]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({
      source: 'calculateur-charges-sociales-artisan',
      statut: inputs.statut,
    });
    if (inputs.ca > 0) params.set('ca', String(Math.round(inputs.ca)));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [inputs.statut, inputs.ca]);

  const showBeneficeSlider =
    inputs.statut === 'ei_reel' ||
    inputs.statut === 'eurl' ||
    inputs.statut === 'sarl' ||
    inputs.statut === 'sas';

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Votre statut juridique</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {(Object.keys(STATUT_LABELS) as Statut[]).map((s) => {
                const selected = inputs.statut === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => update('statut', s)}
                    className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                      selected
                        ? 'border-brand-500 bg-brand-50 text-gray-900'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="block font-semibold">{STATUT_LABELS[s]}</span>
                    <span className="mt-0.5 block text-xs text-gray-500">
                      {STATUT_HINTS[s]}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vos chiffres prévus</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field
              label="CA annuel prévu"
              hint="Chiffre d'affaires HT facturé sur 12 mois"
              suffix="€/an"
              value={inputs.ca}
              onChange={(v) => update('ca', v)}
            />
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                ACRE (1ère année) ?
                <span
                  title="ACRE = -50 % de cotisations pendant 12 mois. Conditions : demandeur d'emploi, jeune < 26 ans, RSA, etc."
                  className="cursor-help text-gray-400"
                >
                  <HelpCircle className="h-4 w-4" />
                </span>
              </Label>
              <div className="inline-flex w-full rounded-full border border-gray-200 bg-gray-50 p-1">
                <button
                  type="button"
                  onClick={() => update('acre', false)}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    !inputs.acre
                      ? 'bg-white text-brand-500 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Non
                </button>
                <button
                  type="button"
                  onClick={() => update('acre', true)}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    inputs.acre
                      ? 'bg-white text-brand-500 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Oui (-50 %)
                </button>
              </div>
            </div>

            {showBeneficeSlider && (
              <div className="space-y-2 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-1">
                    Bénéfice prévu (% du CA)
                    <span
                      title="Pour EI/EURL/SARL/SAS, les cotisations s'appliquent au bénéfice, pas au CA. Estimez votre marge nette d'exploitation."
                      className="cursor-help text-gray-400"
                    >
                      <HelpCircle className="h-4 w-4" />
                    </span>
                  </Label>
                  <span className="text-sm font-semibold text-brand-500">
                    {inputs.beneficePct.toFixed(0)} %
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={70}
                  step={1}
                  value={inputs.beneficePct}
                  onChange={(e) => update('beneficePct', e.target.value)}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-brand-500"
                />
                <p className="text-xs text-gray-500">
                  Bénéfice estimé : {fmtEuro(inputs.ca * (inputs.beneficePct / 100))}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
            <CardHeader>
              <CardTitle>Vos cotisations estimées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Cotisations totales estimées
                </p>
                <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">
                  {fmtEuro(results.totalCotisations + results.isAmount)}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Barème indicatif 2026, hors IR personnel
                </p>
              </div>

              {results.breakdown.length > 0 && (
                <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                  {results.breakdown.map((b) => (
                    <Row key={b.label} label={b.label} value={fmtEuro(b.amount)} />
                  ))}
                </div>
              )}

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <Row label="Reste pour vous (annuel)" value={fmtEuro(results.resteAnnuel)} />
                <Row label="Reste pour vous (mensuel)" value={fmtEuro(results.resteMensuel)} />
                <Row label="Taux effectif" value={fmtPct(results.tauxEffectif)} />
              </div>

              {results.warning && (
                <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                  {results.warning}
                </p>
              )}

              <div className="space-y-2 pt-2">
                <a href={ctaSignupHref} data-testid="cta-signup">
                  <Button className="h-11 w-full rounded-full">
                    Essayer Batup gratuitement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <p className="text-center text-xs text-gray-500">
                  Vos charges réelles, chantier par chantier — pas juste la marge brute.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <StickyResultBar
        label="Cotisations totales"
        value={fmtEuro(results.totalCotisations + results.isAmount)}
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
  label: string;
  hint?: string;
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
          className={suffix ? 'pr-20' : ''}
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
    <div className="flex items-start justify-between gap-3">
      <span className="text-gray-600">{label}</span>
      <span className="whitespace-nowrap font-semibold text-gray-900">{value}</span>
    </div>
  );
}
