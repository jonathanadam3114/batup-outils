import { useMemo, useState } from 'react';
import { ArrowRight, AlertTriangle, HelpCircle, ExternalLink } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';

interface IndexBTOption {
  code: string;
  label: string;
}

const INDEX_BT_OPTIONS: IndexBTOption[] = [
  { code: 'BT01', label: "BT01 — Tous corps d'état (le plus utilisé)" },
  { code: 'BT02', label: "BT02 — Travaux d'aménagement et de finition" },
  { code: 'BT03', label: 'BT03 — Maçonnerie et béton armé' },
  { code: 'BT06', label: 'BT06 — Ossatures et charpentes en bois' },
  { code: 'BT07', label: 'BT07 — Ossatures et charpentes métalliques' },
  { code: 'BT08', label: 'BT08 — Plâtrerie' },
  { code: 'BT09', label: 'BT09 — Carrelage et revêtement céramique' },
  { code: 'BT10', label: 'BT10 — Menuiserie' },
  { code: 'BT16a', label: 'BT16a — Plomberie et sanitaire' },
  { code: 'BT17', label: 'BT17 — Chauffage central et eau chaude' },
  { code: 'BT38', label: 'BT38 — Peinture et papier peint' },
  { code: 'BT40', label: 'BT40 — Étanchéité' },
  { code: 'BT41', label: 'BT41 — Travaux de toiture' },
  { code: 'BT47', label: 'BT47 — Électricité (courants forts)' },
  { code: 'BT49', label: 'BT49 — Couverture en tuiles' },
  { code: 'BT50', label: 'BT50 — Rénovation-Entretien' },
  { code: 'BT51', label: 'BT51 — Menuiserie en PVC' },
  { code: 'BT53', label: 'BT53 — Stores et fermetures' },
];

interface Inputs {
  indexCode: string;
  prixInitial: number;
  bt0: number;
  btn: number;
  coefFixe: number;
  coefVariable: number;
}

const DEFAULTS: Inputs = {
  indexCode: 'BT01',
  prixInitial: 0,
  bt0: 0,
  btn: 0,
  coefFixe: 0.15,
  coefVariable: 0.85,
};

const EURO_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const EURO_2_FMT = new Intl.NumberFormat('fr-FR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const COEF_FMT = new Intl.NumberFormat('fr-FR', {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});
const PCT_FMT = new Intl.NumberFormat('fr-FR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const RATIO_FMT = new Intl.NumberFormat('fr-FR', {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});
const INPUT_FMT = new Intl.NumberFormat('fr-FR', {
  maximumFractionDigits: 2,
});

function fmtEuro(n: number): string {
  if (!Number.isFinite(n) || n === 0) return '— €';
  return `${EURO_FMT.format(Math.round(n))} €`;
}

function fmtEuroSigned(n: number): string {
  if (!Number.isFinite(n) || n === 0) return '— €';
  const sign = n > 0 ? '+ ' : '− ';
  return `${sign}${EURO_2_FMT.format(Math.abs(n))} €`;
}

function fmtPctSigned(n: number): string {
  if (!Number.isFinite(n) || n === 0) return '— %';
  const sign = n > 0 ? '+ ' : '− ';
  return `${sign}${PCT_FMT.format(Math.abs(n))} %`;
}

function fmtCoef(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '—';
  return COEF_FMT.format(n);
}

function fmtRatio(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '—';
  return RATIO_FMT.format(n);
}

function fmtInputNum(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '—';
  return INPUT_FMT.format(n);
}

export function RevisionPrixIndexBTCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const updateNum = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const updateStr = (key: keyof Inputs, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const results = useMemo(() => {
    const { prixInitial, bt0, btn, coefFixe, coefVariable } = inputs;
    const coefSum = coefFixe + coefVariable;
    const coefSumWarning = Math.abs(coefSum - 1) > 0.01;
    const isValid =
      prixInitial > 0 && bt0 > 0 && btn > 0 && Number.isFinite(coefFixe) && Number.isFinite(coefVariable);

    if (!isValid) {
      return {
        ratio: 0,
        coefRevision: 0,
        prixRevise: 0,
        ecartAbsolu: 0,
        ecartRelatif: 0,
        coefSumWarning,
        isValid: false,
      };
    }

    const ratio = btn / bt0;
    const coefRevision = coefFixe + coefVariable * ratio;
    const prixRevise = prixInitial * coefRevision;
    const ecartAbsolu = prixRevise - prixInitial;
    const ecartRelatif = (ecartAbsolu / prixInitial) * 100;

    return {
      ratio,
      coefRevision,
      prixRevise,
      ecartAbsolu,
      ecartRelatif,
      coefSumWarning,
      isValid: true,
    };
  }, [inputs]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: 'calculateur-revision-prix-index-bt' });
    if (inputs.prixInitial > 0) params.set('prix_initial', inputs.prixInitial.toFixed(2));
    if (results.prixRevise > 0) params.set('prix_revise', results.prixRevise.toFixed(2));
    if (inputs.indexCode) params.set('index', inputs.indexCode);
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [inputs.prixInitial, inputs.indexCode, results.prixRevise]);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Votre marché</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="index-bt-select">Type d'index BT</Label>
              <select
                id="index-bt-select"
                value={inputs.indexCode}
                onChange={(e) => updateStr('indexCode', e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                {INDEX_BT_OPTIONS.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">
                BT01 est l'index par défaut pour les marchés tous corps d'état. Pour un lot
                unique, choisissez l'index du corps de métier concerné.
              </p>
            </div>

            <Field
              label="Prix initial du marché HT"
              hint="Montant contractuel hors taxes (P₀)"
              suffix="€"
              value={inputs.prixInitial}
              onChange={(v) => updateNum('prixInitial', v)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valeurs d'index INSEE</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Index à la date d'origine (BT₀)"
              hint="Valeur du mois zéro contractuel (offre ou M − 1 de la signature)"
              suffix=""
              value={inputs.bt0}
              onChange={(v) => updateNum('bt0', v)}
              step="0.1"
            />
            <Field
              label="Index à la date de révision (BTₙ)"
              hint="Valeur du mois d'exécution réelle des prestations"
              suffix=""
              value={inputs.btn}
              onChange={(v) => updateNum('btn', v)}
              step="0.1"
            />
            <div className="sm:col-span-2">
              <a
                href="https://www.insee.fr/fr/statistiques/serie/010534269"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-brand-500 hover:text-brand-700"
              >
                Consulter les valeurs d'index BT sur insee.fr
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <span className="flex items-center gap-1">
                Coefficients de la formule
                <span
                  title="Convention CCAG-Travaux : part fixe 0,15 + part variable 0,85 = 1. La somme des coefficients doit toujours faire 1."
                  className="cursor-help text-gray-400"
                >
                  <HelpCircle className="h-4 w-4" />
                </span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Coefficient fixe"
                hint="Standard CCAG-Travaux : 0,15"
                suffix=""
                value={inputs.coefFixe}
                onChange={(v) => updateNum('coefFixe', v)}
                step="0.01"
              />
              <Field
                label="Coefficient variable"
                hint="Standard CCAG-Travaux : 0,85"
                suffix=""
                value={inputs.coefVariable}
                onChange={(v) => updateNum('coefVariable', v)}
                step="0.01"
              />
            </div>

            {results.coefSumWarning && (
              <div className="flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>
                  La somme des coefficients doit être égale à 1 (actuellement{' '}
                  <strong>{fmtRatio(inputs.coefFixe + inputs.coefVariable)}</strong>). La
                  convention CCAG-Travaux est 0,15 + 0,85 = 1.
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
            <CardHeader>
              <CardTitle>Votre résultat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Prix révisé HT
                </p>
                <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">
                  {fmtEuro(results.prixRevise)}
                </p>
                <p className="mt-1 text-xs text-gray-500">HT, hors TVA</p>
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <Row label="Coefficient de révision" value={fmtCoef(results.coefRevision)} />
                <Row label="Ratio BTₙ / BT₀" value={fmtRatio(results.ratio)} />
                <Row
                  label="Écart en €"
                  value={fmtEuroSigned(results.ecartAbsolu)}
                  emphasized
                />
                <Row
                  label="Écart en %"
                  value={fmtPctSigned(results.ecartRelatif)}
                  emphasized
                />
                <Row label="Prix initial HT (P₀)" value={fmtEuro(inputs.prixInitial)} />
              </div>

              {results.isValid && (
                <details className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700">
                  <summary className="cursor-pointer font-medium text-gray-900">
                    Voir le détail du calcul
                  </summary>
                  <div className="mt-3 space-y-2">
                    <p className="font-mono text-[11px] leading-relaxed text-gray-800">
                      Pₙ = P₀ × ({fmtRatio(inputs.coefFixe)} +{' '}
                      {fmtRatio(inputs.coefVariable)} × BTₙ / BT₀)
                    </p>
                    <p className="font-mono text-[11px] leading-relaxed text-gray-800">
                      Pₙ = {EURO_2_FMT.format(inputs.prixInitial)} × ({fmtRatio(inputs.coefFixe)}{' '}
                      + {fmtRatio(inputs.coefVariable)} × {fmtInputNum(inputs.btn)} /{' '}
                      {fmtInputNum(inputs.bt0)})
                    </p>
                    <p className="font-mono text-[11px] leading-relaxed text-gray-800">
                      Pₙ = {EURO_2_FMT.format(inputs.prixInitial)} × (
                      {fmtRatio(inputs.coefFixe)} +{' '}
                      {fmtRatio(inputs.coefVariable * results.ratio)})
                    </p>
                    <p className="font-mono text-[11px] leading-relaxed text-gray-800">
                      Pₙ = {EURO_2_FMT.format(inputs.prixInitial)} ×{' '}
                      {fmtCoef(results.coefRevision)}
                    </p>
                    <p className="font-mono text-[11px] font-semibold leading-relaxed text-brand-700">
                      Pₙ = {EURO_2_FMT.format(results.prixRevise)} €
                    </p>
                    <p className="pt-2 text-[11px] text-gray-500">
                      Index appliqué : <strong>{inputs.indexCode}</strong>. Formule
                      conforme à l'article 10.4 du CCAG-Travaux.
                    </p>
                  </div>
                </details>
              )}

              <p className="rounded-md border border-brand-500/10 bg-white px-3 py-2 text-[11px] leading-relaxed text-gray-600">
                Les valeurs BT₀ et BTₙ sont publiées chaque mois par l'INSEE et accessibles
                gratuitement sur{' '}
                <a
                  href="https://www.insee.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-500 underline hover:text-brand-700"
                >
                  insee.fr
                </a>
                . La série en vigueur est en base 100 = janvier 2010.
              </p>

              <div className="space-y-2 pt-2">
                <a href={ctaSignupHref} data-testid="cta-signup">
                  <Button className="h-11 w-full rounded-full">
                    Essayer Batup gratuitement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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

function Row({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span
        className={`font-semibold ${emphasized ? 'text-brand-700' : 'text-gray-900'}`}
      >
        {value}
      </span>
    </div>
  );
}
