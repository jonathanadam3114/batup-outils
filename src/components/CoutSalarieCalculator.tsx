import { useMemo, useState, type ReactNode } from 'react';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';
import { StickyResultBar } from './StickyResultBar';

type Convention = 'ouvrier' | 'etam' | 'cadre';
type Region = 'idf' | 'autres';
type Effectif = 'tpe' | 'pe' | 'me';

interface Inputs {
  salaireBrut: number;
  convention: Convention;
  region: Region;
  effectif: Effectif;
}

const DEFAULTS: Inputs = {
  salaireBrut: 2200,
  convention: 'ouvrier',
  region: 'autres',
  effectif: 'tpe',
};

// Taux indicatifs 2026 — basés sur les barèmes URSSAF, CIBTP et conventions BTP
const TAUX_PATRONAL: Record<Effectif, number> = {
  tpe: 0.40,
  pe: 0.43,
  me: 0.45,
};

const TAUX_CIBTP: Record<Region, number> = {
  idf: 0.21,
  autres: 0.19,
};

// Léger ajustement convention : un cadre coûte un peu plus (Apec, prévoyance)
const SURCOUT_CONVENTION: Record<Convention, number> = {
  ouvrier: 0,
  etam: 0.005,
  cadre: 0.015,
};

const TAUX_SALARIAL = 0.23;
const HEURES_MENSUELLES = 151.67;

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

export function CoutSalarieCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const updateNum = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const updateField = <K extends keyof Inputs>(key: K, value: Inputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const results = useMemo(() => {
    const tauxPatronal = TAUX_PATRONAL[inputs.effectif] + SURCOUT_CONVENTION[inputs.convention];
    const tauxCibtp = TAUX_CIBTP[inputs.region];

    const chargesPatronales = inputs.salaireBrut * tauxPatronal;
    const cibtp = inputs.salaireBrut * tauxCibtp;
    const coutTotal = inputs.salaireBrut + chargesPatronales + cibtp;
    const salaireNet = inputs.salaireBrut * (1 - TAUX_SALARIAL);
    const coutHoraireCharge = coutTotal / HEURES_MENSUELLES;
    const ratioPour1NetPaye = salaireNet > 0 ? coutTotal / salaireNet : 0;

    return {
      tauxPatronal,
      tauxCibtp,
      chargesPatronales,
      cibtp,
      coutTotal,
      salaireNet,
      coutHoraireCharge,
      ratioPour1NetPaye,
    };
  }, [inputs]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: 'calculateur-cout-salarie-btp' });
    if (results.coutHoraireCharge > 0) params.set('cout_horaire', results.coutHoraireCharge.toFixed(2));
    if (inputs.salaireBrut > 0) params.set('brut', inputs.salaireBrut.toFixed(0));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [results.coutHoraireCharge, inputs.salaireBrut]);

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Salaire et profil</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Salaire brut mensuel"
              hint="Sur 12 mois, hors primes ponctuelles"
              suffix="€/mois"
              value={inputs.salaireBrut}
              onChange={(v) => updateNum('salaireBrut', v)}
              step="50"
            />
            <div className="space-y-1.5">
              <Label>Convention applicable</Label>
              <Select
                value={inputs.convention}
                onChange={(v) => updateField('convention', v as Convention)}
              >
                <option value="ouvrier">Ouvrier du bâtiment</option>
                <option value="etam">ETAM bâtiment</option>
                <option value="cadre">Cadre bâtiment</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Région et effectif</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1">
                Région CIBTP
                <span title="Le taux CIBTP varie entre l'Île-de-France et les autres régions." className="cursor-help text-gray-400">
                  <HelpCircle className="h-4 w-4" />
                </span>
              </Label>
              <Select
                value={inputs.region}
                onChange={(v) => updateField('region', v as Region)}
              >
                <option value="idf">Île-de-France (~21 %)</option>
                <option value="autres">Autres régions (~19 %)</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1">
                Effectif de l'entreprise
                <span title="Le taux de charges patronales varie avec l'effectif (réduction Fillon, forfait social, OPCO)." className="cursor-help text-gray-400">
                  <HelpCircle className="h-4 w-4" />
                </span>
              </Label>
              <Select
                value={inputs.effectif}
                onChange={(v) => updateField('effectif', v as Effectif)}
              >
                <option value="tpe">Moins de 11 salariés (~40 %)</option>
                <option value="pe">11 à 49 salariés (~43 %)</option>
                <option value="me">50 salariés et plus (~45 %)</option>
              </Select>
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
                <p className="text-xs uppercase tracking-wider text-gray-500">Coût total employeur</p>
                <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">{fmtEuro(results.coutTotal)}</p>
                <p className="mt-1 text-xs text-gray-500">Par mois, charges patronales et CIBTP incluses</p>
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <Row label="Brut mensuel" value={fmtEuro(inputs.salaireBrut)} />
                <Row
                  label={`Charges patronales (${(results.tauxPatronal * 100).toFixed(1)} %)`}
                  value={fmtEuro(results.chargesPatronales)}
                />
                <Row
                  label={`CIBTP (${(results.tauxCibtp * 100).toFixed(0)} %)`}
                  value={fmtEuro(results.cibtp)}
                />
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <Row label="Salaire net estimé" value={fmtEuro(results.salaireNet)} />
                <Row label="Coût horaire chargé" value={fmtRate(results.coutHoraireCharge)} />
              </div>

              {results.ratioPour1NetPaye > 0 && (
                <div className="rounded-md bg-brand-50 px-4 py-3 text-xs text-gray-700">
                  Pour <span className="font-semibold">1 € de net</span> versé à votre salarié,
                  vous payez <span className="font-semibold text-brand-500">{results.ratioPour1NetPaye.toFixed(2)} €</span> de coût total.
                </div>
              )}

              <div className="space-y-2 pt-2">
                <a href={ctaSignupHref} data-testid="cta-signup">
                  <Button className="h-11 w-full rounded-full">
                    Essayer Batup gratuitement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <p className="text-xs text-center text-gray-500">
                  Coût horaire chargé : {fmtRate(results.coutHoraireCharge)} — Batup l'intègre automatiquement dans la rentabilité de chaque chantier.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <StickyResultBar
        label="Coût total employeur"
        value={fmtEuro(results.coutTotal)}
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

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
    >
      {children}
    </select>
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
