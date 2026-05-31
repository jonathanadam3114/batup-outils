import { useMemo, useState, type ReactNode } from 'react';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';
import { StickyResultBar } from './StickyResultBar';
import { computeHeuresSup } from '@/lib/heures-sup-math';

type Convention = 'ouvrier' | 'etam';
type ZoneTrajet = '1A' | '1B' | '2' | '3' | '4' | '5';

interface Inputs {
  heuresSemaine: number;
  tauxHoraire: number;
  convention: Convention;
  niveau: string;
  joursChantier: number;
  zoneTrajet: ZoneTrajet;
  grandDeplacement: boolean;
}

const DEFAULTS: Inputs = {
  heuresSemaine: 35,
  tauxHoraire: 12,
  convention: 'ouvrier',
  niveau: 'N2P1',
  joursChantier: 5,
  zoneTrajet: '2',
  grandDeplacement: false,
};

// Barème indicatif 2026 — convention collective ouvriers BTP / URSSAF.
// La formule (panier 10,30 €, carence, split 25/50) vit dans heures-sup-math.

const ZONE_INDEMNITES: Record<ZoneTrajet, number> = {
  '1A': 1.33,
  '1B': 2.67,
  '2': 5.33,
  '3': 8,
  '4': 10.67,
  '5': 13.33,
};

const ZONE_LABELS: Record<ZoneTrajet, string> = {
  '1A': 'Zone 1A — 0 à 5 km',
  '1B': 'Zone 1B — 5 à 10 km',
  '2': 'Zone 2 — 10 à 20 km',
  '3': 'Zone 3 — 20 à 30 km',
  '4': 'Zone 4 — 30 à 40 km',
  '5': 'Zone 5 — 40 à 50 km',
};

const NIVEAUX_OUVRIER = [
  'N1P1', 'N1P2', 'N2P1', 'N2P2', 'N3P1', 'N3P2', 'N4P1', 'N4P2',
];
const NIVEAUX_ETAM = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const NUMBER_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const RATE_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });

function fmtEuro(n: number, decimals = 0): string {
  if (!Number.isFinite(n) || n <= 0) return '— €';
  const fmt = decimals > 0 ? RATE_FMT : NUMBER_FMT;
  return `${fmt.format(decimals > 0 ? n : Math.round(n))} €`;
}

export function HeuresSupCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const updateNum = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const updateField = <K extends keyof Inputs>(key: K, value: Inputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const niveauxOptions = inputs.convention === 'ouvrier' ? NIVEAUX_OUVRIER : NIVEAUX_ETAM;

  const results = useMemo(
    () =>
      computeHeuresSup({
        heuresSemaine: inputs.heuresSemaine,
        tauxHoraire: inputs.tauxHoraire,
        joursChantier: inputs.joursChantier,
        indemniteTrajetJour: ZONE_INDEMNITES[inputs.zoneTrajet],
        grandDeplacement: inputs.grandDeplacement,
      }),
    [inputs],
  );

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: 'calculateur-heures-supplementaires-btp' });
    if (inputs.tauxHoraire > 0) params.set('hourly_rate', inputs.tauxHoraire.toFixed(2));
    if (results.extrasMois > 0) params.set('monthly_extras', results.extrasMois.toFixed(0));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [inputs.tauxHoraire, results.extrasMois]);

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Heures et taux horaire</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Heures travaillées cette semaine"
              hint="Heures réellement effectuées, hors trajet domicile-chantier"
              suffix="h"
              value={inputs.heuresSemaine}
              onChange={(v) => updateNum('heuresSemaine', v)}
              step="0.5"
            />
            <Field
              label="Taux horaire brut"
              hint="Hors primes et indemnités"
              suffix="€/h"
              value={inputs.tauxHoraire}
              onChange={(v) => updateNum('tauxHoraire', v)}
              step="0.5"
            />
            <div className="space-y-1.5">
              <Label>Convention applicable</Label>
              <Select
                value={inputs.convention}
                onChange={(v) => updateField('convention', v as Convention)}
              >
                <option value="ouvrier">Ouvriers du bâtiment</option>
                <option value="etam">ETAM bâtiment</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>
                Niveau / position
              </Label>
              <Select
                value={inputs.niveau}
                onChange={(v) => updateField('niveau', v)}
              >
                {niveauxOptions.map((n) => (
                  <option key={n} value={n}>
                    {inputs.convention === 'ouvrier' ? `Ouvrier ${n}` : `ETAM ${n}`}
                  </option>
                ))}
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paniers, trajets, grand déplacement</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Jours de chantier hors siège"
              hint="Jours ouvrant droit au panier et à l'indemnité de trajet"
              suffix="jours"
              value={inputs.joursChantier}
              onChange={(v) => updateNum('joursChantier', v)}
              step="1"
            />
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1">
                Zone d'indemnité de trajet
                <span title="Distance entre le siège et le chantier. Barème CCN ouvriers BTP." className="cursor-help text-gray-400">
                  <HelpCircle className="h-4 w-4" />
                </span>
              </Label>
              <Select
                value={inputs.zoneTrajet}
                onChange={(v) => updateField('zoneTrajet', v as ZoneTrajet)}
              >
                {(Object.keys(ZONE_LABELS) as ZoneTrajet[]).map((z) => (
                  <option key={z} value={z}>
                    {ZONE_LABELS[z]} — {ZONE_INDEMNITES[z].toFixed(2)} €/jour
                  </option>
                ))}
              </Select>
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputs.grandDeplacement}
                  onChange={(e) => updateField('grandDeplacement', e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                Grand déplacement (découcher)
              </Label>
              <p className="text-xs text-gray-500">
                Forfait nuitée + repas de 85 €/jour (barème indicatif 2026, dans la limite URSSAF d'exonération).
              </p>
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
                <p className="text-xs uppercase tracking-wider text-gray-500">Total brut semaine</p>
                <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">{fmtEuro(results.totalSemaine)}</p>
                <p className="mt-1 text-xs text-gray-500">Brut hebdomadaire incluant heures sup, panier, trajet, grand déplacement</p>
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <Row label="Salaire de base" value={fmtEuro(results.salaireBase, 2)} />
                <Row
                  label={`Heures sup 25 % (${results.heures25.toFixed(1)} h)`}
                  value={fmtEuro(results.majoration25, 2)}
                />
                <Row
                  label={`Heures sup 50 % (${results.heures50.toFixed(1)} h)`}
                  value={fmtEuro(results.majoration50, 2)}
                />
                <Row label="Panier (semaine)" value={fmtEuro(results.panierSemaine, 2)} />
                <Row label="Indemnité trajet (semaine)" value={fmtEuro(results.indemniteSemaine, 2)} />
                {inputs.grandDeplacement && (
                  <Row label="Grand déplacement (semaine)" value={fmtEuro(results.grandDeplSemaine, 2)} />
                )}
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <Row label="Total brut mois" value={fmtEuro(results.totalMois)} />
                <Row label="Panier (mois)" value={fmtEuro(results.panierMois)} />
                <Row label="Indemnité trajet (mois)" value={fmtEuro(results.indemniteMois)} />
                {inputs.grandDeplacement && (
                  <Row label="Grand déplacement (mois)" value={fmtEuro(results.grandDeplMois)} />
                )}
              </div>

              <div className="space-y-2 pt-2">
                <a href={ctaSignupHref} data-testid="cta-signup">
                  <Button className="h-11 w-full rounded-full">
                    Essayer Batup gratuitement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <p className="text-xs text-center text-gray-500">
                  Vous gérez {fmtEuro(results.extrasMois)} d'extras par mois — Batup Pointage les calcule automatiquement.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <StickyResultBar
        label="Total brut semaine"
        value={fmtEuro(results.totalSemaine)}
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
