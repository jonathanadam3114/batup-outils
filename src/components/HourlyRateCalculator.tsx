import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { calculateBillableHourlyRate } from '@/lib/pricing';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';
import { StickyResultBar } from './StickyResultBar';

interface Inputs {
  salaires: number;
  localVehicules: number;
  assurancesAdmin: number;
  marketingAutres: number;
  nbPersonnes: number;
  joursParAn: number;
  heuresParJour: number;
  margeCible: number;
}

const DEFAULTS: Inputs = {
  salaires: 0,
  localVehicules: 0,
  assurancesAdmin: 0,
  marketingAutres: 0,
  nbPersonnes: 1,
  joursParAn: 220,
  heuresParJour: 8,
  margeCible: 23.08,
};

const NUMBER_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const RATE_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });

function fmtEuro(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— €';
  return `${NUMBER_FMT.format(Math.round(n))} €`;
}
function fmtRate(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— €/h';
  return `${RATE_FMT.format(n)} €/h`;
}

export function HourlyRateCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const update = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const results = useMemo(() => {
    const totalCharges =
      inputs.salaires + inputs.localVehicules + inputs.assurancesAdmin + inputs.marketingAutres;
    const heuresProductives = inputs.joursParAn * inputs.heuresParJour * inputs.nbPersonnes;
    const coutHoraire = heuresProductives > 0 ? totalCharges / heuresProductives : 0;
    const tauxFacturer = calculateBillableHourlyRate(coutHoraire, inputs.margeCible);
    const caMin =
      totalCharges > 0 && inputs.margeCible < 100
        ? totalCharges / (1 - inputs.margeCible / 100)
        : 0;
    return {
      totalCharges,
      heuresProductives,
      coutHoraire,
      tauxFacturer,
      caMin,
      caMinMensuel: caMin / 12,
    };
  }, [inputs]);

  const ctaTool2Href = useMemo(() => {
    const params = new URLSearchParams();
    if (results.tauxFacturer > 0) params.set('rate', results.tauxFacturer.toFixed(2));
    if (inputs.margeCible > 0) params.set('margin', inputs.margeCible.toFixed(2));
    const qs = params.toString();
    return `/calculateur-prix-chantier-btp${qs ? `?${qs}` : ''}`;
  }, [results.tauxFacturer, inputs.margeCible]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: 'calculateur-taux-horaire' });
    if (results.tauxFacturer > 0) params.set('hourly_rate', results.tauxFacturer.toFixed(2));
    if (inputs.margeCible > 0) params.set('margin', inputs.margeCible.toFixed(2));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [results.tauxFacturer, inputs.margeCible]);

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Vos charges fixes annuelles</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field label="Coûts salariaux totaux" hint="Vous + équipe, brut chargé" suffix="€/an" value={inputs.salaires} onChange={(v) => update('salaires', v)} />
            <Field label="Local + véhicules" hint="Loyer, leasing, carburant, entretien" suffix="€/an" value={inputs.localVehicules} onChange={(v) => update('localVehicules', v)} />
            <Field label="Assurances + admin + logiciels" hint="RC pro, décennale, comptable, abonnements" suffix="€/an" value={inputs.assurancesAdmin} onChange={(v) => update('assurancesAdmin', v)} />
            <Field label="Marketing + autres" hint="Pub, déplacements, divers" suffix="€/an" value={inputs.marketingAutres} onChange={(v) => update('marketingAutres', v)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Votre activité</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre de personnes facturables" suffix="pers." value={inputs.nbPersonnes} onChange={(v) => update('nbPersonnes', v)} step="1" />
            <Field label="Jours travaillés / an / personne" hint="365 − week-ends − congés − fériés − intempéries" suffix="jours" value={inputs.joursParAn} onChange={(v) => update('joursParAn', v)} step="1" />
            <Field label="Heures facturables / jour" hint="Hors trajets, pauses, administratif" suffix="h" value={inputs.heuresParJour} onChange={(v) => update('heuresParJour', v)} step="0.5" />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1">
                  Marge nette cible
                  <span title="Marge nette = (PV − coût) / PV × 100. 23,08 % = coefficient 1,30." className="cursor-help text-gray-400">
                    <HelpCircle className="h-4 w-4" />
                  </span>
                </Label>
                <span className="text-sm font-semibold text-brand-500">{inputs.margeCible.toFixed(2)} %</span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                step={0.5}
                value={inputs.margeCible}
                onChange={(e) => update('margeCible', e.target.value)}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-brand-500"
              />
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
                <p className="text-xs uppercase tracking-wider text-gray-500">Taux horaire à facturer</p>
                <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">{fmtRate(results.tauxFacturer)}</p>
                <p className="mt-1 text-xs text-gray-500">HT, hors TVA</p>
              </div>
              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <Row label="Coût de revient horaire" value={fmtRate(results.coutHoraire)} />
                <Row label="Heures facturables / an" value={`${NUMBER_FMT.format(results.heuresProductives)} h`} />
                <Row label="CA minimum annuel" value={fmtEuro(results.caMin)} />
                <Row label="CA minimum mensuel" value={fmtEuro(results.caMinMensuel)} />
              </div>
              <div className="space-y-2 pt-2">
                <a href={ctaSignupHref}>
                  <Button className="h-11 w-full rounded-full">
                    Essayer Batup gratuitement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <Link href={ctaTool2Href}>
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
        label="Taux à facturer"
        value={fmtRate(results.tauxFacturer)}
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
          className="pr-16"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
          {suffix}
        </span>
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
