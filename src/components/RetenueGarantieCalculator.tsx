import { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, HelpCircle, ShieldCheck } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';
import { StickyResultBar } from './StickyResultBar';
import { montantTTC, retenueGarantieFromTTC } from '@/lib/retenue-garantie-math';

interface Inputs {
  montantHT: number;
  tvaPct: number;
  dateReception: string;
  reservesLevees: boolean;
  cautionBancaire: boolean;
}

function defaultReceptionDate(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

const DEFAULTS: Inputs = {
  montantHT: 0,
  tvaPct: 20,
  dateReception: defaultReceptionDate(),
  reservesLevees: false,
  cautionBancaire: false,
};

const NUMBER_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const DATE_FMT = new Intl.DateTimeFormat('fr-FR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

function fmtEuro(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— €';
  return `${NUMBER_FMT.format(Math.round(n))} €`;
}

function fmtDate(d: Date | null): string {
  if (!d || Number.isNaN(d.getTime())) return '—';
  return DATE_FMT.format(d);
}

function addOneYear(d: Date): Date {
  const out = new Date(d.getTime());
  out.setFullYear(out.getFullYear() + 1);
  return out;
}

export function RetenueGarantieCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const updateNumber = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const updateString = (key: keyof Inputs, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const updateBool = (key: keyof Inputs, value: boolean) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const results = useMemo(() => {
    const ttc = montantTTC(inputs.montantHT, inputs.tvaPct);
    const retenueTheorique = retenueGarantieFromTTC(ttc);
    const retenueEffective = inputs.cautionBancaire ? 0 : retenueTheorique;

    const dateReception = inputs.dateReception ? new Date(inputs.dateReception) : null;
    const dateLiberation =
      dateReception && !Number.isNaN(dateReception.getTime()) ? addOneYear(dateReception) : null;

    const today = new Date();
    const aujourdHui = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return {
      montantTTC: ttc,
      retenueTheorique,
      retenueEffective,
      dateReception,
      dateLiberation,
      aujourdHui,
    };
  }, [inputs]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: 'calculateur-retenue-de-garantie' });
    if (inputs.montantHT > 0) params.set('job_value', inputs.montantHT.toFixed(0));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [inputs.montantHT]);

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
              hint="Montant total du contrat, hors taxes"
              suffix="€"
              value={inputs.montantHT}
              onChange={(v) => updateNumber('montantHT', v)}
            />
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1">
                Taux de TVA applicable
                <span
                  title="20 % en neuf, 10 % en rénovation logement, 5,5 % en travaux d'efficacité énergétique."
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
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Date de réception des travaux</Label>
              <Input
                type="date"
                value={inputs.dateReception}
                onChange={(e) => updateString('dateReception', e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Point de départ légal du délai de libération (Loi 71-584 du 16 juillet 1971).
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Situation contractuelle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ToggleRow
              label="Les réserves ont-elles été levées ?"
              hint="Si non, la retenue reste bloquée jusqu'à levée des réserves, même après 1 an."
              value={inputs.reservesLevees}
              onChange={(v) => updateBool('reservesLevees', v)}
            />
            <ToggleRow
              label="Caution bancaire fournie en substitution ?"
              hint="Une caution bancaire (ou garantie à première demande) remplace la retenue : aucun montant immobilisé."
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
              <CardTitle>Votre retenue de garantie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Montant retenu (5 % du TTC)
                </p>
                <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">
                  {fmtEuro(results.retenueEffective)}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {inputs.cautionBancaire
                    ? 'Couvert par caution bancaire — 0 € immobilisé'
                    : `Calculé sur ${fmtEuro(results.montantTTC)} TTC`}
                </p>
              </div>

              {inputs.cautionBancaire && results.retenueTheorique > 0 && (
                <div
                  className="flex items-start gap-3 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-emerald-800"
                  role="status"
                >
                  <ShieldCheck className="mt-0.5 h-6 w-6 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold">Trésorerie préservée</p>
                    <p className="mt-1 text-sm leading-relaxed opacity-90">
                      Avec une caution bancaire, vous évitez d'immobiliser{' '}
                      {fmtEuro(results.retenueTheorique)} pendant 1 an.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <CalendarDays className="h-4 w-4 text-brand-500" />
                  Échéancier
                </div>
                <Timeline
                  aujourdHui={results.aujourdHui}
                  dateReception={results.dateReception}
                  dateLiberation={results.dateLiberation}
                  reservesLevees={inputs.reservesLevees}
                />
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <Row label="Montant HT" value={fmtEuro(inputs.montantHT)} />
                <Row label="Montant TTC" value={fmtEuro(results.montantTTC)} />
                <Row label="Retenue théorique 5 %" value={fmtEuro(results.retenueTheorique)} />
                <Row
                  label="Date libération prévisionnelle"
                  value={fmtDate(results.dateLiberation)}
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
        label="Retenue 5 % du TTC"
        value={fmtEuro(results.retenueEffective)}
        ctaHref={ctaSignupHref}
      />
    </div>
  );
}

function Timeline({
  aujourdHui,
  dateReception,
  dateLiberation,
  reservesLevees,
}: {
  aujourdHui: Date;
  dateReception: Date | null;
  dateLiberation: Date | null;
  reservesLevees: boolean;
}) {
  const stages = [
    { label: 'Aujourd\'hui', date: aujourdHui, tone: 'text-gray-700' },
    {
      label: 'Réception des travaux',
      date: dateReception,
      tone: 'text-gray-700',
    },
    {
      label: reservesLevees
        ? 'Libération de la retenue'
        : 'Libération (si réserves levées)',
      date: dateLiberation,
      tone: 'text-brand-500',
    },
  ];
  return (
    <ol className="relative ml-2 border-l-2 border-gray-200 pl-4">
      {stages.map((s, i) => (
        <li key={s.label} className="relative pb-3 last:pb-0">
          <span
            className={`absolute -left-[22px] mt-1 inline-block h-3 w-3 rounded-full border-2 border-white ${
              i === stages.length - 1 ? 'bg-brand-500' : 'bg-gray-400'
            }`}
            aria-hidden
          />
          <div className="flex items-center justify-between gap-3">
            <span className={`text-sm font-medium ${s.tone}`}>{s.label}</span>
            <span className="text-xs text-gray-500">{fmtDate(s.date)}</span>
          </div>
        </li>
      ))}
    </ol>
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
