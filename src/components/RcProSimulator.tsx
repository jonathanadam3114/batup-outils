import { useMemo, useState } from 'react';
import { ArrowRight, AlertTriangle, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';

type MetierKey =
  | 'electricien'
  | 'plombier'
  | 'macon'
  | 'carreleur'
  | 'peintre'
  | 'plaquiste'
  | 'couvreur'
  | 'menuisier'
  | 'paysagiste'
  | 'entreprise_generale';

type EffectifKey = '1' | '2-5' | '6-19' | '20+';
type SinistraliteKey = 'aucune' | '1' | '2+';
type DecennaleKey = 'oui' | 'non';

interface MetierInfo {
  label: string;
  base: number;
}

// Base RC Pro 2026 — environ 30-50 % de la décennale équivalente
const METIERS: Record<MetierKey, MetierInfo> = {
  couvreur: { label: 'Couvreur', base: 800 },
  macon: { label: 'Maçon / gros œuvre', base: 700 },
  electricien: { label: 'Électricien', base: 650 },
  entreprise_generale: { label: 'Entreprise générale du bâtiment', base: 650 },
  plombier: { label: 'Plombier / chauffagiste', base: 550 },
  plaquiste: { label: 'Plaquiste', base: 500 },
  carreleur: { label: 'Carreleur', base: 450 },
  menuisier: { label: 'Menuisier', base: 400 },
  peintre: { label: 'Peintre', base: 400 },
  paysagiste: { label: 'Paysagiste', base: 350 },
};

const EFFECTIF_LABELS: Record<EffectifKey, string> = {
  '1': '1 seul',
  '2-5': '2 à 5',
  '6-19': '6 à 19',
  '20+': '20 et plus',
};

interface Inputs {
  metier: MetierKey;
  caHT: number;
  effectif: EffectifKey;
  hasDecennale: DecennaleKey;
  sinistralite: SinistraliteKey;
}

const DEFAULTS: Inputs = {
  metier: 'electricien',
  caHT: 80000,
  effectif: '1',
  hasDecennale: 'non',
  sinistralite: 'aucune',
};

const NUMBER_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });

function fmtEuro(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— €';
  return `${NUMBER_FMT.format(Math.round(n))} €`;
}

interface FactorImpact {
  label: string;
  detail: string;
  multiplier: number;
  positive: boolean;
}

function computeFactors(inputs: Inputs): FactorImpact[] {
  const factors: FactorImpact[] = [];

  // CA factor
  if (inputs.caHT > 50000) {
    const tranches = Math.floor((inputs.caHT - 1) / 50000);
    const raw = 1 + 0.1 * tranches;
    const mult = Math.min(raw, 2.5);
    factors.push({
      label: `Chiffre d'affaires ${NUMBER_FMT.format(inputs.caHT)} € HT`,
      detail: `+${Math.round((mult - 1) * 100)} % (tranche au-delà de 50 000 €)`,
      multiplier: mult,
      positive: false,
    });
  } else {
    factors.push({
      label: `Chiffre d'affaires sous 50 000 € HT`,
      detail: `Tarif de base de la tranche minimale`,
      multiplier: 1,
      positive: true,
    });
  }

  // Effectif factor
  if (inputs.effectif === '2-5') {
    factors.push({
      label: 'Effectif 2 à 5 personnes',
      detail: 'Pas de surprime effectif',
      multiplier: 1,
      positive: true,
    });
  } else if (inputs.effectif === '6-19') {
    factors.push({
      label: 'Effectif 6 à 19 personnes',
      detail: '+20 % (tranche > 5 salariés)',
      multiplier: 1.2,
      positive: false,
    });
  } else if (inputs.effectif === '20+') {
    factors.push({
      label: 'Effectif 20 personnes et +',
      detail: '+60 % (3 tranches au-dessus de 5 salariés)',
      multiplier: 1.6,
      positive: false,
    });
  } else {
    factors.push({
      label: 'Travailleur seul',
      detail: 'Pas de surprime effectif',
      multiplier: 1,
      positive: true,
    });
  }

  // Sinistralité factor (RC Pro : +30 % / +80 %)
  if (inputs.sinistralite === '1') {
    factors.push({
      label: '1 sinistre RC Pro déclaré',
      detail: '+30 % (sinistre dans les 5 dernières années)',
      multiplier: 1.3,
      positive: false,
    });
  } else if (inputs.sinistralite === '2+') {
    factors.push({
      label: '2 sinistres RC Pro ou plus',
      detail: '+80 % (dossier difficile à placer)',
      multiplier: 1.8,
      positive: false,
    });
  } else {
    factors.push({
      label: 'Aucun sinistre RC Pro déclaré',
      detail: 'Dossier propre — pas de majoration',
      multiplier: 1,
      positive: true,
    });
  }

  // Package décennale factor (rabais 15 %)
  if (inputs.hasDecennale === 'oui') {
    factors.push({
      label: 'Décennale déjà souscrite — package combiné',
      detail: '−15 % (rabais courant pour un seul courtier)',
      multiplier: 0.85,
      positive: true,
    });
  } else {
    factors.push({
      label: 'Pas de décennale chez le même courtier',
      detail: 'Pas de rabais package combiné',
      multiplier: 1,
      positive: false,
    });
  }

  return factors;
}

export function RcProSimulator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const update = <K extends keyof Inputs>(key: K, value: Inputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const updateNumber = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }) as Inputs);
  };

  const results = useMemo(() => {
    const base = METIERS[inputs.metier].base;
    const factors = computeFactors(inputs);
    const adjustedMultiplier = factors.reduce((acc, f) => acc * f.multiplier, 1);
    const adjustedBase = base * adjustedMultiplier;
    const min = adjustedBase * 0.8;
    const max = adjustedBase * 1.25;
    const moyMensuel = (min + max) / 2 / 12;

    // Économie potentielle si pas encore en package
    const factorsWithoutPackage = computeFactors({ ...inputs, hasDecennale: 'oui' });
    const multWithPackage = factorsWithoutPackage.reduce((acc, f) => acc * f.multiplier, 1);
    const baseWithPackage = base * multWithPackage;
    const moyWithPackage = (baseWithPackage * 0.8 + baseWithPackage * 1.25) / 2;
    const moyCurrent = (min + max) / 2;
    const economiePackage = inputs.hasDecennale === 'non' ? moyCurrent - moyWithPackage : 0;

    return {
      base,
      min,
      max,
      moyMensuel,
      factors,
      isRefus: inputs.sinistralite === '2+',
      isHigh: min > 2000,
      economiePackage,
    };
  }, [inputs]);

  const ctaBrokerHref = '#';

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({
      source: 'simulateur-rc-pro',
      metier: inputs.metier,
    });
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [inputs.metier]);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Votre métier et votre structure</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="metier">Métier exercé</Label>
              <select
                id="metier"
                value={inputs.metier}
                onChange={(e) => update('metier', e.target.value as MetierKey)}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                {(Object.keys(METIERS) as MetierKey[]).map((key) => (
                  <option key={key} value={key}>
                    {METIERS[key].label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">
                Le métier déclaré détermine la base tarifaire RC Pro — environ 30-50 % de la prime décennale équivalente.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label>Chiffre d'affaires annuel HT</Label>
              <div className="relative">
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={1000}
                  value={inputs.caHT === 0 ? '' : inputs.caHT}
                  onChange={(e) => updateNumber('caHT', e.target.value)}
                  placeholder="80000"
                  className="pr-16"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  € HT/an
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Majoration de 10 % par tranche de 50 000 € au-delà du palier de base.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="effectif">Effectif</Label>
              <select
                id="effectif"
                value={inputs.effectif}
                onChange={(e) => update('effectif', e.target.value as EffectifKey)}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                {(Object.keys(EFFECTIF_LABELS) as EffectifKey[]).map((key) => (
                  <option key={key} value={key}>
                    {EFFECTIF_LABELS[key]}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">
                +20 % par tranche de 5 salariés au-delà du dirigeant.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="decennale">Vous avez déjà une décennale ?</Label>
              <select
                id="decennale"
                value={inputs.hasDecennale}
                onChange={(e) => update('hasDecennale', e.target.value as DecennaleKey)}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="non">Non, RC Pro seule</option>
                <option value="oui">Oui — package combiné</option>
              </select>
              <p className="text-xs text-gray-500">
                Regrouper RC Pro + décennale chez le même courtier permet un rabais courant de 15 %.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sinistralite">Sinistralité RC Pro (5 dernières années)</Label>
              <select
                id="sinistralite"
                value={inputs.sinistralite}
                onChange={(e) => update('sinistralite', e.target.value as SinistraliteKey)}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="aucune">Aucun sinistre</option>
                <option value="1">1 sinistre déclaré</option>
                <option value="2+">2 sinistres ou plus</option>
              </select>
              <p className="text-xs text-gray-500">
                +30 % pour 1 sinistre, +80 % au-delà.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
            <CardHeader>
              <CardTitle>Votre fourchette RC Pro estimée</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">Prime RC Pro annuelle</p>
                <p className="mt-1 text-4xl font-bold leading-tight text-brand-500 sm:text-5xl">
                  Entre {fmtEuro(results.min)} et {fmtEuro(results.max)}
                </p>
                <p className="mt-1 text-xs text-gray-500">par an, HT</p>
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <Row label="Mensualité estimée" value={`${fmtEuro(results.moyMensuel)}/mois`} />
                <Row label="Base de tarif métier" value={`${fmtEuro(results.base)}/an`} />
              </div>

              {results.economiePackage > 0 ? (
                <div
                  className="flex items-start gap-3 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-emerald-800"
                  role="status"
                >
                  <PiggyBank className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold">Économie potentielle de {fmtEuro(results.economiePackage)}/an</p>
                    <p className="mt-1 opacity-90">
                      En souscrivant RC Pro + décennale ensemble chez le même courtier (rabais package de 15 %).
                    </p>
                  </div>
                </div>
              ) : null}

              {results.isRefus ? (
                <div
                  className="flex items-start gap-3 rounded-lg border border-rose-300 bg-rose-50 p-4 text-rose-800"
                  role="status"
                >
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold">Dossier difficile à placer</p>
                    <p className="mt-1 opacity-90">
                      Au-delà de 2 sinistres RC Pro, plusieurs assureurs refusent de cotiser. Passez par un courtier spécialisé risques aggravés.
                    </p>
                  </div>
                </div>
              ) : results.isHigh ? (
                <div
                  className="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-800"
                  role="status"
                >
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold">Tarif élevé, faites jouer la concurrence</p>
                    <p className="mt-1 opacity-90">
                      Au-delà de 2 000 €/an, comparez impérativement au moins 3 devis courtiers BTP spécialisés.
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="space-y-2 pt-2">
                <a href={ctaBrokerHref} data-testid="cta-broker">
                  <Button className="h-11 w-full rounded-full">
                    Comparez 3 devis RC Pro BTP gratuits
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href={ctaSignupHref} data-testid="cta-signup">
                  <Button variant="outline" className="h-11 w-full rounded-full">
                    Ou centralisez tous vos contrats d'assurance dans Batup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>

              <p className="border-t border-gray-100 pt-4 text-xs leading-relaxed text-gray-500">
                Fourchette indicative — votre devis réel dépend du courtier, de la compagnie d'assurance et des spécificités de votre dossier (art. L 113-1 du Code des assurances).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Facteurs qui influencent votre tarif</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {results.factors.map((f, i) => (
                <FactorRow key={i} factor={f} />
              ))}
            </CardContent>
          </Card>
        </div>
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

function FactorRow({ factor }: { factor: FactorImpact }) {
  const Icon = factor.positive ? TrendingDown : TrendingUp;
  const cls = factor.positive
    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
    : 'border-amber-200 bg-amber-50 text-amber-800';
  return (
    <div className={`flex items-start gap-2 rounded-md border p-3 text-sm ${cls}`}>
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0" />
      <div>
        <p className="font-medium">{factor.label}</p>
        <p className="mt-0.5 text-xs opacity-90">{factor.detail}</p>
      </div>
    </div>
  );
}
