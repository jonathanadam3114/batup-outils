import { useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle, HelpCircle, TrendingDown } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';

interface Inputs {
  marcheInitialHT: number;
  avenantsHT: number;
  revisionsHT: number;
  penalitesHT: number;
  acomptesPercusTTC: number;
  retenueGarantieTTC: number;
  retenueAutoCompute: boolean;
  cautionBancaire: boolean;
  tvaPct: number;
}

const DEFAULTS: Inputs = {
  marcheInitialHT: 0,
  avenantsHT: 0,
  revisionsHT: 0,
  penalitesHT: 0,
  acomptesPercusTTC: 0,
  retenueGarantieTTC: 0,
  retenueAutoCompute: true,
  cautionBancaire: false,
  tvaPct: 20,
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

type Verdict = 'a-percevoir' | 'equilibre' | 'trop-percu';

const VERDICT_CONFIG: Record<
  Verdict,
  { label: string; description: string; classes: string; Icon: typeof CheckCircle }
> = {
  'a-percevoir': {
    label: 'Solde à percevoir',
    description:
      "Le maître d'ouvrage vous doit le solde indiqué ci-dessus. À encaisser sous 30 jours après acceptation du DGD (CCAG-Travaux 2021 art. 12.4.4 + art. R. 2191-11 du Code de la commande publique).",
    classes: 'bg-emerald-50 border-emerald-300 text-emerald-800',
    Icon: CheckCircle,
  },
  equilibre: {
    label: 'Solde quasi nul',
    description:
      "Le décompte est équilibré : les acomptes couvrent presque exactement le montant définitif. Vérifiez les arrondis avant signature.",
    classes: 'bg-amber-50 border-amber-300 text-amber-800',
    Icon: AlertTriangle,
  },
  'trop-percu': {
    label: 'Trop-perçu à rembourser',
    description:
      "Les acomptes encaissés dépassent le montant définitif TTC : vous devez rembourser la différence au maître d'ouvrage. Négociez un échéancier ou contestez les pénalités si elles sont injustifiées.",
    classes: 'bg-rose-50 border-rose-300 text-rose-800',
    Icon: TrendingDown,
  },
};

function computeVerdict(solde: number, montantDefinitifTTC: number): Verdict {
  if (montantDefinitifTTC <= 0) return 'equilibre';
  const ratio = solde / montantDefinitifTTC;
  if (ratio < -0.001) return 'trop-percu';
  if (ratio < 0.005) return 'equilibre';
  return 'a-percevoir';
}

export function DGDCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const updateNumber = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const updateBool = (key: keyof Inputs, value: boolean) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const results = useMemo(() => {
    const marcheTotalHT =
      inputs.marcheInitialHT + inputs.avenantsHT + inputs.revisionsHT;
    const montantDefinitifHT = Math.max(0, marcheTotalHT - inputs.penalitesHT);
    const tva = montantDefinitifHT * (inputs.tvaPct / 100);
    const montantDefinitifTTC = montantDefinitifHT + tva;

    const retenueAuto = montantDefinitifTTC * 0.05;
    const retenueSaisie = inputs.retenueAutoCompute
      ? retenueAuto
      : inputs.retenueGarantieTTC;
    const retenueEffective = inputs.cautionBancaire ? 0 : retenueSaisie;
    const solde =
      montantDefinitifTTC - inputs.acomptesPercusTTC - retenueEffective;

    const verdict = computeVerdict(solde, montantDefinitifTTC);

    return {
      marcheTotalHT,
      montantDefinitifHT,
      tva,
      montantDefinitifTTC,
      retenueAuto,
      retenueEffective,
      solde,
      verdict,
    };
  }, [inputs]);

  const verdictCfg = VERDICT_CONFIG[results.verdict];
  const VerdictIcon = verdictCfg.Icon;

  const headlineColor =
    results.verdict === 'trop-percu'
      ? 'text-rose-600'
      : results.verdict === 'equilibre'
        ? 'text-amber-600'
        : 'text-brand-500';

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: 'calculateur-dgd' });
    if (inputs.marcheInitialHT > 0)
      params.set('marche', inputs.marcheInitialHT.toFixed(0));
    if (Number.isFinite(results.solde) && results.solde !== 0)
      params.set('solde', results.solde.toFixed(0));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [inputs.marcheInitialHT, results.solde]);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Montants contractuels</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Montant initial du marché HT"
              hint="Montant du marché signé à la commande, hors avenants"
              suffix="€"
              value={inputs.marcheInitialHT}
              onChange={(v) => updateNumber('marcheInitialHT', v)}
            />
            <Field
              label="Total des avenants HT"
              hint="Somme des avenants signés (travaux supplémentaires, modifications)"
              suffix="€"
              value={inputs.avenantsHT}
              onChange={(v) => updateNumber('avenantsHT', v)}
            />
            <Field
              label="Révisions de prix (Index BT) HT"
              hint="Cumul des révisions appliquées sur les indices BT INSEE. 0 si marché à prix ferme."
              suffix="€"
              value={inputs.revisionsHT}
              onChange={(v) => updateNumber('revisionsHT', v)}
            />
            <Field
              label="Pénalités de retard HT"
              hint="Pénalités appliquées par le maître d'ouvrage. Plafonnées à 10 % du marché selon CCAG travaux 2021."
              suffix="€"
              value={inputs.penalitesHT}
              onChange={(v) => updateNumber('penalitesHT', v)}
            />
            <div className="space-y-1.5 sm:col-span-2">
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
            <CardTitle>Acomptes et retenue de garantie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field
              label="Acomptes / situations déjà perçus TTC"
              hint="Somme TTC de toutes les situations et acomptes déjà encaissés depuis le début du chantier"
              suffix="€"
              value={inputs.acomptesPercusTTC}
              onChange={(v) => updateNumber('acomptesPercusTTC', v)}
            />
            <ToggleRow
              label="Calcul auto de la retenue (5 % du marché TTC) ?"
              hint="Activé par défaut : la retenue est calculée à 5 % du montant définitif TTC, conformément à la Loi 71-584. Désactivez si vous voulez saisir un montant manuel (cas particulier d'avenants intermédiaires)."
              value={inputs.retenueAutoCompute}
              onChange={(v) => updateBool('retenueAutoCompute', v)}
            />
            {inputs.retenueAutoCompute ? (
              <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    Retenue de garantie 5 % (TTC) — calculée auto
                  </span>
                  <span className="font-semibold text-gray-900">
                    {fmtEuro(results.retenueAuto)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  5 % du montant définitif TTC. Libérée 1 an après réception sans réserves
                  (Loi 71-584 du 16 juillet 1971).
                </p>
              </div>
            ) : (
              <Field
                label="Retenue de garantie 5 % retenue (TTC)"
                hint="Montant TTC déjà retenu sur les situations précédentes (Loi 71-584, calculée sur le TTC). Libérée 1 an après réception sans réserves."
                suffix="€"
                value={inputs.retenueGarantieTTC}
                onChange={(v) => updateNumber('retenueGarantieTTC', v)}
              />
            )}
            <ToggleRow
              label="Caution bancaire en substitution ?"
              hint="Si oui, aucune retenue n'a été prélevée : la caution remplace la consignation. Le solde du DGD inclut alors 100 % du dû."
              value={inputs.cautionBancaire}
              onChange={(v) => updateBool('cautionBancaire', v)}
            />
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
            <CardHeader>
              <CardTitle>Solde du DGD</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Solde DGD à percevoir (TTC)
                </p>
                <p className={`mt-1 text-4xl font-bold sm:text-5xl ${headlineColor}`}>
                  {fmtEuroSigned(results.solde)}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {results.solde < 0
                    ? "Trop-perçu à rembourser au maître d'ouvrage"
                    : 'Hors retenue de garantie consignée'}
                </p>
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

              <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-4 text-sm">
                <Row label="Marché initial HT" value={fmtEuro(inputs.marcheInitialHT)} />
                <Row label="+ Avenants HT" value={fmtEuro(inputs.avenantsHT)} muted />
                <Row label="+ Révisions de prix HT" value={fmtEuro(inputs.revisionsHT)} muted />
                <Row
                  label="= Marché total HT"
                  value={fmtEuro(results.marcheTotalHT)}
                  bold
                />
                <Row
                  label="− Pénalités HT"
                  value={fmtEuro(inputs.penalitesHT)}
                  muted
                />
                <Row
                  label="= Montant définitif HT"
                  value={fmtEuro(results.montantDefinitifHT)}
                  bold
                />
                <Row label={`+ TVA ${inputs.tvaPct} %`} value={fmtEuro(results.tva)} muted />
                <Row
                  label="= Montant définitif TTC"
                  value={fmtEuro(results.montantDefinitifTTC)}
                  bold
                />
                <Row
                  label="− Acomptes perçus TTC"
                  value={fmtEuro(inputs.acomptesPercusTTC)}
                  muted
                />
                <Row
                  label={
                    inputs.cautionBancaire
                      ? '− Retenue (caution = 0)'
                      : '− Retenue de garantie 5 % (TTC)'
                  }
                  value={fmtEuro(results.retenueEffective)}
                  muted
                />
                <Row label="= Solde DGD TTC" value={fmtEuroSigned(results.solde)} bold />
              </div>

              {results.retenueEffective > 0 && !inputs.cautionBancaire && (
                <div className="rounded-lg border border-gray-200 bg-white p-3 text-xs text-gray-600">
                  <p className="font-semibold text-gray-900">
                    Retenue de garantie consignée (TTC) : {fmtEuro(results.retenueEffective)}
                  </p>
                  <p className="mt-1">
                    À libérer 1 an après la réception sans réserves (Loi 71-584 du 16 juillet
                    1971), ou après la levée écrite des réserves.
                  </p>
                </div>
              )}

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
