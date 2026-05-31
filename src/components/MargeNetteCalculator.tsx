import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { computeVerdict, type VerdictKind } from '@/lib/pricing';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';
import { ResultVerdict } from './ResultVerdict';
import { StickyResultBar } from './StickyResultBar';

type Mode = 'coefficient' | 'marge';

interface Inputs {
  coutAchat: number;
  mode: Mode;
  coefficient: number;
  margeNette: number;
}

const DEFAULTS: Inputs = {
  coutAchat: 0,
  mode: 'coefficient',
  coefficient: 1.3,
  margeNette: 23.08,
};

const NUMBER_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const DECIMAL_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });

function fmtEuro(n: number, decimals = 0): string {
  if (!Number.isFinite(n) || n <= 0) return '— €';
  const fmt = decimals > 0 ? DECIMAL_FMT : NUMBER_FMT;
  return `${fmt.format(decimals > 0 ? n : Math.round(n))} €`;
}

function fmtCoef(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '—';
  return DECIMAL_FMT.format(n);
}

function fmtPct(n: number): string {
  if (!Number.isFinite(n)) return '— %';
  return `${DECIMAL_FMT.format(n)} %`;
}

export function MargeNetteCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const update = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const setMode = (mode: Mode) => setInputs((prev) => ({ ...prev, mode }));

  const results = useMemo(() => {
    const cout = inputs.coutAchat;
    let prixVente = 0;
    let coefficient = 0;
    let margeNette = 0;

    if (inputs.mode === 'coefficient') {
      coefficient = inputs.coefficient;
      prixVente = cout * coefficient;
      margeNette = prixVente > 0 ? ((prixVente - cout) / prixVente) * 100 : 0;
    } else {
      margeNette = inputs.margeNette;
      if (margeNette >= 100) {
        prixVente = 0;
      } else if (cout > 0) {
        prixVente = cout / (1 - margeNette / 100);
      }
      coefficient = cout > 0 ? prixVente / cout : 0;
    }

    const margeEuros = prixVente - cout;
    const verdict: VerdictKind = computeVerdict(margeNette, prixVente, cout);

    return { prixVente, coefficient, margeNette, margeEuros, verdict };
  }, [inputs]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: 'calculateur-marge-nette-coefficient' });
    if (results.coefficient > 0) params.set('coefficient', results.coefficient.toFixed(2));
    if (results.margeNette > 0) params.set('margin', results.margeNette.toFixed(2));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [results.coefficient, results.margeNette]);

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Votre coût d'achat</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Coût d'achat HT"
              hint="Prix payé au fournisseur, hors taxes"
              suffix="€"
              value={inputs.coutAchat}
              onChange={(v) => update('coutAchat', v)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mode de calcul</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div
              className="inline-flex w-full rounded-full border border-gray-200 bg-gray-50 p-1"
              role="tablist"
            >
              <button
                type="button"
                role="tab"
                aria-selected={inputs.mode === 'coefficient'}
                onClick={() => setMode('coefficient')}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  inputs.mode === 'coefficient'
                    ? 'bg-white text-brand-500 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Je connais le coefficient
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={inputs.mode === 'marge'}
                onClick={() => setMode('marge')}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  inputs.mode === 'marge'
                    ? 'bg-white text-brand-500 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Je vise une marge nette %
              </button>
            </div>

            {inputs.mode === 'coefficient' ? (
              <Field
                label="Coefficient multiplicateur"
                hint="1,30 ≈ 23,08 % de marge nette. 1,50 ≈ 33,33 %."
                suffix=""
                value={inputs.coefficient}
                onChange={(v) => update('coefficient', v)}
                step="0.05"
              />
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-1">
                    Marge nette cible
                    <span
                      title="Marge nette = (PV − coût) / PV × 100. 23,08 % = coefficient 1,30."
                      className="cursor-help text-gray-400"
                    >
                      <HelpCircle className="h-4 w-4" />
                    </span>
                  </Label>
                  <span className="text-sm font-semibold text-brand-500">
                    {inputs.margeNette.toFixed(2)} %
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={60}
                  step={0.5}
                  value={inputs.margeNette}
                  onChange={(e) => update('margeNette', e.target.value)}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-brand-500"
                />
                <Field
                  label="Ou saisissez une valeur précise"
                  suffix="%"
                  value={inputs.margeNette}
                  onChange={(v) => update('margeNette', v)}
                  step="0.01"
                />
              </div>
            )}

            <p className="rounded-md border border-brand-500/10 bg-brand-50 px-3 py-2 text-xs text-gray-700">
              Équivalence : <strong>{fmtPct(results.margeNette)}</strong> de marge nette
              {' '}≡ coefficient <strong>{fmtCoef(results.coefficient)}</strong>
            </p>
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
                  Prix de vente HT recommandé
                </p>
                <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">
                  {fmtEuro(results.prixVente)}
                </p>
                <p className="mt-1 text-xs text-gray-500">HT, hors TVA</p>
              </div>

              <ResultVerdict verdict={results.verdict} />

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <Row label="Coefficient" value={fmtCoef(results.coefficient)} />
                <Row label="Marge nette" value={fmtPct(results.margeNette)} />
                <Row label="Marge € (PV − coût)" value={fmtEuro(results.margeEuros)} />
                <Row label="Coût d'achat HT" value={fmtEuro(inputs.coutAchat)} />
              </div>

              <div className="space-y-2 pt-2">
                <a href={ctaSignupHref} data-testid="cta-signup">
                  <Button className="h-11 w-full rounded-full">
                    Essayer Batup gratuitement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <Link href="/calculateur-prix-chantier-btp">
                  <Button variant="outline" className="h-11 w-full rounded-full">
                    Calculer le prix d'un chantier
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <StickyResultBar
        label="Prix de vente HT"
        value={fmtEuro(results.prixVente)}
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
