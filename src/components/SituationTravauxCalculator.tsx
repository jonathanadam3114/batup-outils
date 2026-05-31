import { useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';
import { StickyResultBar } from './StickyResultBar';
import { retenueGarantieFromTTC } from '@/lib/retenue-garantie-math';

interface Inputs {
  montantMarcheHT: number;
  tvaPct: number;
  avancementPct: number;
  dejaFactureHT: number;
  acomptesEncaissesHT: number;
  retenueActive: boolean;
}

const DEFAULTS: Inputs = {
  montantMarcheHT: 0,
  tvaPct: 20,
  avancementPct: 30,
  dejaFactureHT: 0,
  acomptesEncaissesHT: 0,
  retenueActive: true,
};

const NUMBER_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });

function fmtEuro(n: number): string {
  if (!Number.isFinite(n) || n === 0) return '— €';
  return `${NUMBER_FMT.format(Math.round(n))} €`;
}

function fmtEuroSigned(n: number): string {
  if (!Number.isFinite(n) || n === 0) return '— €';
  const sign = n < 0 ? '-' : '';
  return `${sign}${NUMBER_FMT.format(Math.abs(Math.round(n)))} €`;
}

export function SituationTravauxCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const updateNumber = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const updateBool = (key: keyof Inputs, value: boolean) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const results = useMemo(() => {
    const avancement = Math.max(0, Math.min(100, inputs.avancementPct));
    const travauxRealisesHT = inputs.montantMarcheHT * (avancement / 100);
    const situationBruteHT = Math.max(0, travauxRealisesHT - inputs.dejaFactureHT);
    const tvaSituationBrute = situationBruteHT * (inputs.tvaPct / 100);
    const situationBruteTTC = situationBruteHT + tvaSituationBrute;
    const retenueGarantie = inputs.retenueActive
      ? retenueGarantieFromTTC(situationBruteTTC)
      : 0;
    const situationTTC = situationBruteTTC - retenueGarantie;
    const netAPercevoir = situationTTC - inputs.acomptesEncaissesHT;
    const resteAFacturerHT = Math.max(0, inputs.montantMarcheHT - travauxRealisesHT);
    const avancementResiduel = Math.max(0, 100 - avancement);
    const tropFacture =
      inputs.dejaFactureHT > 0 && inputs.dejaFactureHT > travauxRealisesHT;

    return {
      travauxRealisesHT,
      situationBruteHT,
      tvaSituationBrute,
      situationBruteTTC,
      retenueGarantie,
      situationTTC,
      netAPercevoir,
      resteAFacturerHT,
      avancementResiduel,
      tropFacture,
    };
  }, [inputs]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: 'calculateur-situation-travaux' });
    if (inputs.montantMarcheHT > 0) params.set('marche', inputs.montantMarcheHT.toFixed(0));
    if (inputs.avancementPct > 0) params.set('avancement', inputs.avancementPct.toFixed(0));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [inputs.montantMarcheHT, inputs.avancementPct]);

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Votre marché</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Montant total HT du marché"
              hint="Montant initial du marché signé, hors taxes et hors avenants"
              suffix="€"
              value={inputs.montantMarcheHT}
              onChange={(v) => updateNumber('montantMarcheHT', v)}
            />
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1">
                Taux de TVA applicable
                <span
                  title="20 % en neuf, 10 % en rénovation logement +2 ans, 5,5 % en travaux d'amélioration énergétique éligibles."
                  className="cursor-help text-gray-400"
                >
                  <HelpCircle className="h-4 w-4" />
                </span>
              </Label>
              <select
                value={inputs.tvaPct}
                onChange={(e) => updateNumber('tvaPct', e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="20">20 % (neuf)</option>
                <option value="10">10 % (rénovation logement)</option>
                <option value="5.5">5,5 % (efficacité énergétique)</option>
                <option value="0">0 % (autoliquidation)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avancement de la situation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1">
                  Avancement cumulé du chantier
                  <span
                    title="Pourcentage global d'avancement du chantier à la date de la situation, validé par le maître d'œuvre."
                    className="cursor-help text-gray-400"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </span>
                </Label>
                <span className="text-sm font-semibold text-brand-500">
                  {inputs.avancementPct.toFixed(0)} %
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={inputs.avancementPct}
                onChange={(e) => updateNumber('avancementPct', e.target.value)}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-brand-500"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Déjà facturé HT (cumul situations précédentes)"
                hint="Somme HT des situations N-1, N-2, etc. Mettre 0 pour la situation 1."
                suffix="€"
                value={inputs.dejaFactureHT}
                onChange={(v) => updateNumber('dejaFactureHT', v)}
              />
              <Field
                label="Acomptes déjà encaissés"
                hint="Avance de démarrage, acomptes ponctuels. À déduire du net à percevoir."
                suffix="€"
                value={inputs.acomptesEncaissesHT}
                onChange={(v) => updateNumber('acomptesEncaissesHT', v)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Retenue de garantie</CardTitle>
          </CardHeader>
          <CardContent>
            <ToggleRow
              label="Retenue de garantie 5 % activée ?"
              hint="Loi 71-584 du 16 juillet 1971 : 5 % du montant TTC prélevé sur chaque situation, libéré 1 an après réception. Désactiver si caution bancaire en substitution."
              value={inputs.retenueActive}
              onChange={(v) => updateBool('retenueActive', v)}
            />
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
            <CardHeader>
              <CardTitle>Situation à facturer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Situation N à facturer (TTC)
                </p>
                <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">
                  {fmtEuro(results.situationTTC)}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Net à percevoir après acomptes : {fmtEuroSigned(results.netAPercevoir)}
                </p>
              </div>

              {results.tropFacture && (
                <div
                  className="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-800"
                  role="alert"
                  data-testid="warning-trop-facture"
                >
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div className="text-xs leading-relaxed">
                    <p className="font-semibold">Risque de trop-perçu</p>
                    <p className="mt-0.5 opacity-90">
                      Vous avez déjà facturé plus que les travaux réalisés à date — vérifiez vos
                      cumuls avant d'émettre cette situation.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-4 text-sm">
                <Row
                  label="Travaux réalisés HT (cumul)"
                  value={fmtEuro(results.travauxRealisesHT)}
                />
                <Row
                  label="− Déjà facturé HT"
                  value={fmtEuro(inputs.dejaFactureHT)}
                  muted
                />
                <Row
                  label="= Situation brute HT"
                  value={fmtEuro(results.situationBruteHT)}
                  bold
                />
                <Row
                  label={`+ TVA ${inputs.tvaPct} %`}
                  value={fmtEuro(results.tvaSituationBrute)}
                  muted
                />
                <Row
                  label="= Situation brute TTC"
                  value={fmtEuro(results.situationBruteTTC)}
                  bold
                />
                {inputs.retenueActive && (
                  <Row
                    label="− Retenue de garantie 5 % (sur TTC)"
                    value={fmtEuro(results.retenueGarantie)}
                    muted
                  />
                )}
                <Row
                  label="= Situation TTC à percevoir"
                  value={fmtEuro(results.situationTTC)}
                  bold
                />
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <Row label="Reste à facturer HT" value={fmtEuro(results.resteAFacturerHT)} />
                <Row
                  label="Avancement résiduel"
                  value={`${results.avancementResiduel.toFixed(0)} %`}
                />
              </div>

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

      <StickyResultBar
        label="Situation à facturer TTC"
        value={fmtEuro(results.situationTTC)}
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

function ToggleRow({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-md border border-gray-200 bg-white p-3">
      <div className="space-y-1">
        <Label>{label}</Label>
        {hint && <p className="text-xs text-gray-500">{hint}</p>}
      </div>
      <div className="inline-flex rounded-full border border-gray-200 bg-gray-50 p-1">
        <button
          type="button"
          onClick={() => onChange(false)}
          aria-pressed={!value}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            !value ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Non
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          aria-pressed={value}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            value ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Oui
        </button>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  muted = false,
  bold = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? 'text-gray-500' : 'text-gray-600'}>{label}</span>
      <span
        className={
          bold ? 'font-semibold text-gray-900' : muted ? 'text-gray-500' : 'font-semibold text-gray-900'
        }
      >
        {value}
      </span>
    </div>
  );
}
