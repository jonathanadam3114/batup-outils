import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useSearch } from 'wouter';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { computeVerdict, type VerdictKind } from '@/lib/pricing';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';
import { ResultVerdict } from './ResultVerdict';
import { StickyResultBar } from './StickyResultBar';

interface Inputs {
  tauxHoraire: number;
  margeCible: number;
  heuresMO: number;
  coutMateriaux: number;
  coefficientMateriaux: number;
  sousTraitance: number;
  coefficientSousTraitance: number;
  fraisDivers: number;
}

const DEFAULTS: Inputs = {
  tauxHoraire: 0,
  margeCible: 23.08,
  heuresMO: 0,
  coutMateriaux: 0,
  coefficientMateriaux: 1.3,
  sousTraitance: 0,
  coefficientSousTraitance: 1.0,
  fraisDivers: 0,
};

const NUMBER_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const RATE_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });

function fmtEuro(n: number, decimals = 0): string {
  if (!Number.isFinite(n) || n === 0) return '— €';
  const fmt = decimals > 0 ? RATE_FMT : NUMBER_FMT;
  return `${fmt.format(decimals > 0 ? n : Math.round(n))} €`;
}

export function QuotePriceCalculator() {
  const search = useSearch();
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const rate = parseFloat(params.get('rate') ?? '');
    const margin = parseFloat(params.get('margin') ?? '');
    setInputs((prev) => ({
      ...prev,
      tauxHoraire: Number.isFinite(rate) && rate > 0 ? rate : prev.tauxHoraire,
      margeCible: Number.isFinite(margin) && margin >= 0 ? margin : prev.margeCible,
    }));
  }, [search]);

  const update = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const results = useMemo(() => {
    const labourRevenue = inputs.heuresMO * inputs.tauxHoraire;
    const materiauxFactures = inputs.coutMateriaux * inputs.coefficientMateriaux;
    // Sous-traitance refacturée : coefficient 1,0 = pass-through (comportement
    // par défaut, marge nulle). > 1,0 applique une marge de coordination.
    const sousTraitanceFacturee = inputs.sousTraitance * inputs.coefficientSousTraitance;
    const prixEstime =
      labourRevenue + materiauxFactures + sousTraitanceFacturee + inputs.fraisDivers;

    const coutHoraire =
      inputs.margeCible >= 100 || inputs.margeCible < 0
        ? inputs.tauxHoraire
        : inputs.tauxHoraire * (1 - inputs.margeCible / 100);
    const coutsDirectsReels =
      inputs.heuresMO * coutHoraire +
      inputs.coutMateriaux +
      inputs.sousTraitance +
      inputs.fraisDivers;

    const margeEuros = prixEstime - coutsDirectsReels;
    const margePct = prixEstime > 0 ? (margeEuros / prixEstime) * 100 : 0;
    const verdict: VerdictKind = computeVerdict(margePct, prixEstime, coutsDirectsReels);

    return { labourRevenue, materiauxFactures, prixEstime, coutsDirectsReels, margeEuros, margePct, verdict };
  }, [inputs]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: 'calculateur-prix-chantier' });
    if (inputs.tauxHoraire > 0) params.set('hourly_rate', inputs.tauxHoraire.toFixed(2));
    if (inputs.margeCible > 0) params.set('margin', inputs.margeCible.toFixed(2));
    if (results.prixEstime > 0) params.set('job_value', results.prixEstime.toFixed(0));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [inputs.tauxHoraire, inputs.margeCible, results.prixEstime]);

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Votre taux et votre marge</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Taux horaire facturé"
              hint={
                inputs.tauxHoraire > 0 ? undefined : (
                  <>
                    Je ne connais pas mon taux —{' '}
                    <Link
                      href="/calculateur-taux-horaire-btp"
                      className="text-brand-500 underline hover:text-brand-700"
                    >
                      calculez-le
                    </Link>
                  </>
                )
              }
              suffix="€/h HT"
              value={inputs.tauxHoraire}
              onChange={(v) => update('tauxHoraire', v)}
            />
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

        <Card>
          <CardHeader>
            <CardTitle>Votre chantier</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field label="Heures de main d'œuvre" suffix="h" value={inputs.heuresMO} onChange={(v) => update('heuresMO', v)} step="0.5" />
            <Field label="Coût matériaux (achat HT)" suffix="€" value={inputs.coutMateriaux} onChange={(v) => update('coutMateriaux', v)} />
            <Field label="Coefficient de vente matériaux" hint="1,30 ≈ 23 % de marge nette" suffix="" value={inputs.coefficientMateriaux} onChange={(v) => update('coefficientMateriaux', v)} step="0.05" />
            <Field label="Sous-traitance (coût HT)" hint="Montant facturé par votre sous-traitant" suffix="€" value={inputs.sousTraitance} onChange={(v) => update('sousTraitance', v)} />
            <Field label="Coefficient sous-traitance" hint="1,00 = refacturé au coût. 1,10–1,15 ajoute une marge de coordination." suffix="" value={inputs.coefficientSousTraitance} onChange={(v) => update('coefficientSousTraitance', v)} step="0.05" />
            <Field label="Frais divers chantier" hint="Location, déchèterie, divers" suffix="€" value={inputs.fraisDivers} onChange={(v) => update('fraisDivers', v)} />
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
                <p className="text-xs uppercase tracking-wider text-gray-500">Prix de vente HT recommandé</p>
                <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">{fmtEuro(results.prixEstime)}</p>
                <p className="mt-1 text-xs text-gray-500">HT, hors TVA</p>
              </div>

              <ResultVerdict verdict={results.verdict} />

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <Row label="Marge nette" value={`${results.margePct.toFixed(2)} %`} />
                <Row label="Marge €" value={fmtEuro(results.margeEuros)} />
                <Row label="Coût total estimé" value={fmtEuro(results.coutsDirectsReels)} />
              </div>

              <div className="space-y-2 pt-2">
                <a href={ctaSignupHref}>
                  <Button className="h-11 w-full rounded-full">
                    Essayer Batup gratuitement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <Link href="/calculateur-taux-horaire-btp">
                  <Button variant="outline" className="h-11 w-full rounded-full">
                    Recalculer mon taux horaire
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <StickyResultBar
        label="Prix HT recommandé"
        value={fmtEuro(results.prixEstime)}
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
