import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle, AlertTriangle, TrendingDown } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';
import { StickyResultBar } from './StickyResultBar';

interface Inputs {
  coutCertif: number;
  coutMaintien: number;
  heuresFormation: number;
  coutHoraire: number;
  chantiersParAn: number;
  caChantier: number;
  margeNettePct: number;
}

const DEFAULTS: Inputs = {
  coutCertif: 1200,
  coutMaintien: 300,
  heuresFormation: 21,
  coutHoraire: 50,
  chantiersParAn: 5,
  caChantier: 8000,
  margeNettePct: 23,
};

const NUMBER_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });

function fmtEuro(n: number): string {
  if (!Number.isFinite(n)) return '— €';
  const sign = n < 0 ? '−' : '';
  return `${sign}${NUMBER_FMT.format(Math.abs(Math.round(n)))} €`;
}

function fmtPct(n: number): string {
  if (!Number.isFinite(n)) return '— %';
  const sign = n < 0 ? '−' : '';
  return `${sign}${NUMBER_FMT.format(Math.abs(Math.round(n)))} %`;
}

type VerdictKind = 'rentable' | 'limite' | 'perte';

const VERDICT_CONFIG: Record<
  VerdictKind,
  { label: string; description: string; classes: string; Icon: typeof CheckCircle }
> = {
  rentable: {
    label: 'Investissement très rentable',
    description:
      "Votre ROI année 1 dépasse 100 %. La certification RGE s'amortit largement dès la première année grâce au volume de chantiers MaPrimeRénov espéré.",
    classes: 'bg-emerald-50 border-emerald-300 text-emerald-800',
    Icon: CheckCircle,
  },
  limite: {
    label: 'Rentable, mais profil patient nécessaire',
    description:
      "Votre ROI année 1 est positif mais inférieur à 100 %. La certification se rentabilise progressivement — c'est un investissement à horizon 2-3 ans plus qu'un coup commercial immédiat.",
    classes: 'bg-amber-50 border-amber-300 text-amber-800',
    Icon: AlertTriangle,
  },
  perte: {
    label: 'Peu rentable au volume actuel',
    description:
      "Au volume de chantiers RGE actuellement espéré, l'investissement ne s'amortit pas la première année. Augmentez le nombre de chantiers visés, ou réévaluez si l'absence de label vous fait vraiment perdre des affaires.",
    classes: 'bg-rose-50 border-rose-300 text-rose-800',
    Icon: TrendingDown,
  },
};

export function RoiRgeCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const updateNumber = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }) as Inputs);
  };

  const updateSlider = (key: keyof Inputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }) as Inputs);
  };

  const results = useMemo(() => {
    const coutTotalInitial = inputs.coutCertif + inputs.heuresFormation * inputs.coutHoraire;
    const margeParChantier = inputs.caChantier * (inputs.margeNettePct / 100);
    const margeSuppAnnuelle = inputs.chantiersParAn * margeParChantier;

    const gainNetAn1 = margeSuppAnnuelle - coutTotalInitial - inputs.coutMaintien;
    const roiAn1Pct = coutTotalInitial > 0 ? (gainNetAn1 / coutTotalInitial) * 100 : 0;

    const breakEven =
      margeParChantier > 0 ? Math.ceil(coutTotalInitial / margeParChantier) : Infinity;

    const gainNet3Ans = 3 * margeSuppAnnuelle - coutTotalInitial - 3 * inputs.coutMaintien;
    const roi3AnsPct = coutTotalInitial > 0 ? (gainNet3Ans / coutTotalInitial) * 100 : 0;

    let verdict: VerdictKind = 'perte';
    if (roiAn1Pct >= 100) verdict = 'rentable';
    else if (roiAn1Pct > 0) verdict = 'limite';

    return {
      coutTotalInitial,
      margeParChantier,
      margeSuppAnnuelle,
      gainNetAn1,
      roiAn1Pct,
      breakEven,
      roi3AnsPct,
      verdict,
    };
  }, [inputs]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({
      source: 'calculateur-roi-rge',
      roi_an1: Math.round(results.roiAn1Pct).toString(),
      chantiers_breakeven: Number.isFinite(results.breakEven)
        ? results.breakEven.toString()
        : '0',
    });
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [results.roiAn1Pct, results.breakEven]);

  const verdictCfg = VERDICT_CONFIG[results.verdict];
  const VerdictIcon = verdictCfg.Icon;

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Coût de la certification RGE</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Coût total de la certification</Label>
              <div className="relative">
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={50}
                  value={inputs.coutCertif === 0 ? '' : inputs.coutCertif}
                  onChange={(e) => updateNumber('coutCertif', e.target.value)}
                  placeholder="1200"
                  className="pr-8"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  €
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Audit + dossier d'admission QualibatRGE (~1 200 € en 2026).
              </p>
            </div>

            <div className="space-y-1.5">
              <Label>Coût annuel de maintien</Label>
              <div className="relative">
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={25}
                  value={inputs.coutMaintien === 0 ? '' : inputs.coutMaintien}
                  onChange={(e) => updateNumber('coutMaintien', e.target.value)}
                  placeholder="300"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  €/an
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Audit de suivi tous les 4 ans + contrôle chantier.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label>Heures de formation FEEBat</Label>
              <div className="relative">
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={1}
                  value={inputs.heuresFormation === 0 ? '' : inputs.heuresFormation}
                  onChange={(e) => updateNumber('heuresFormation', e.target.value)}
                  placeholder="21"
                  className="pr-8"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  h
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Module FEEBat RENOVE : 21 h obligatoires (3 jours).
              </p>
            </div>

            <div className="space-y-1.5">
              <Label>Coût horaire de votre temps</Label>
              <div className="relative">
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={5}
                  value={inputs.coutHoraire === 0 ? '' : inputs.coutHoraire}
                  onChange={(e) => updateNumber('coutHoraire', e.target.value)}
                  placeholder="50"
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  €/h
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Coût d'opportunité — heures non facturées pendant la formation.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vos chantiers RGE-éligibles</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <div className="flex items-center justify-between">
                <Label>Chantiers RGE-éligibles par an grâce au label</Label>
                <span className="text-sm font-semibold text-brand-500">
                  {inputs.chantiersParAn} chantier{inputs.chantiersParAn > 1 ? 's' : ''}/an
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                step={1}
                value={inputs.chantiersParAn}
                onChange={(e) => updateSlider('chantiersParAn', parseInt(e.target.value, 10))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-brand-500"
              />
              <p className="text-xs text-gray-500">
                Nombre de chantiers MaPrimeRénov / CEE / éco-PTZ que vous espérez décrocher chaque année grâce au label RGE.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label>CA moyen par chantier RGE</Label>
              <div className="relative">
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={500}
                  value={inputs.caChantier === 0 ? '' : inputs.caChantier}
                  onChange={(e) => updateNumber('caChantier', e.target.value)}
                  placeholder="8000"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  € HT
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Chantier MaPrimeRénov type : isolation, PAC, menuiseries.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label>Marge nette par chantier</Label>
              <div className="relative">
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={100}
                  step={1}
                  value={inputs.margeNettePct === 0 ? '' : inputs.margeNettePct}
                  onChange={(e) => updateNumber('margeNettePct', e.target.value)}
                  placeholder="23"
                  className="pr-8"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  %
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Marge nette = (PV − coût) / PV × 100. 23 % est la médiane BTP 2026.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
            <CardHeader>
              <CardTitle>Votre rentabilité RGE</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Marge supplémentaire annuelle
                </p>
                <p className="mt-1 text-4xl font-bold leading-tight text-brand-500 sm:text-5xl">
                  {fmtEuro(results.margeSuppAnnuelle)}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  grâce au label RGE, avant amortissement
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs uppercase tracking-wider text-gray-500">ROI année 1</p>
                <p
                  className={`mt-1 text-3xl font-bold ${
                    results.roiAn1Pct >= 100
                      ? 'text-emerald-600'
                      : results.roiAn1Pct > 0
                        ? 'text-amber-600'
                        : 'text-rose-600'
                  }`}
                >
                  {fmtPct(results.roiAn1Pct)}
                </p>
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <Row label="Coût total initial" value={fmtEuro(results.coutTotalInitial)} />
                <Row label="Marge par chantier RGE" value={fmtEuro(results.margeParChantier)} />
                <Row
                  label="Break-even (chantiers/an)"
                  value={
                    Number.isFinite(results.breakEven) ? `${results.breakEven} chantiers` : '—'
                  }
                />
                <Row label="ROI sur 3 ans" value={fmtPct(results.roi3AnsPct)} />
              </div>

              <div
                className={`flex items-start gap-3 rounded-lg border p-4 ${verdictCfg.classes}`}
                role="status"
                data-testid={`verdict-${results.verdict}`}
              >
                <VerdictIcon className="mt-0.5 h-6 w-6 flex-shrink-0" />
                <div>
                  <p className="text-base font-semibold">{verdictCfg.label}</p>
                  <p className="mt-1 text-sm leading-relaxed opacity-90">
                    {verdictCfg.description}
                  </p>
                </div>
              </div>

              {Number.isFinite(results.breakEven) && (
                <div className="rounded-lg border border-brand-100 bg-brand-50/40 p-4 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold text-brand-700">Break-even :</span> vous devez
                    décrocher au moins{' '}
                    <span className="font-semibold">
                      {results.breakEven} chantier{results.breakEven > 1 ? 's' : ''} RGE/an
                    </span>{' '}
                    pour rentabiliser votre certification dès l'année 1.
                  </p>
                </div>
              )}

              <div className="pt-2">
                <a href={ctaSignupHref} data-testid="cta-signup">
                  <Button className="h-11 w-full rounded-full">
                    Automatiser le suivi de mes chantiers RGE
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">
                  Le label RGE seul ne suffit pas — il faut aussi tracker les chantiers éligibles
                  MaPrimeRénov et générer les attestations. Batup automatise ça en quelques clics.
                </p>
              </div>

              <p className="border-t border-gray-100 pt-4 text-xs leading-relaxed text-gray-500">
                Barème indicatif — confirmez les coûts avec votre organisme de qualification
                (Qualibat, Qualit'EnR, RGE Éco-Artisan). La formation FEEBat est souvent prise en
                charge par votre OPCO Constructys ou le FAFCEA.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <StickyResultBar
        label="Marge supplémentaire / an"
        value={fmtEuro(results.margeSuppAnnuelle)}
        ctaHref={ctaSignupHref}
      />
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
