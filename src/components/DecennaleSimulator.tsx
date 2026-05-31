import { useMemo, useState } from 'react';
import { ArrowRight, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';
import { StickyResultBar } from './StickyResultBar';

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

interface MetierInfo {
  label: string;
  base: number;
}

const METIERS: Record<MetierKey, MetierInfo> = {
  couvreur: { label: 'Couvreur', base: 2200 },
  macon: { label: 'Maçon / gros œuvre', base: 1800 },
  electricien: { label: 'Électricien', base: 1600 },
  entreprise_generale: { label: 'Entreprise générale du bâtiment', base: 1600 },
  plombier: { label: 'Plombier / chauffagiste', base: 1400 },
  plaquiste: { label: 'Plaquiste', base: 1200 },
  carreleur: { label: 'Carreleur', base: 1100 },
  menuisier: { label: 'Menuisier', base: 950 },
  peintre: { label: 'Peintre', base: 900 },
  paysagiste: { label: 'Paysagiste', base: 850 },
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
  anciennete: number;
  effectif: EffectifKey;
  sinistralite: SinistraliteKey;
}

const DEFAULTS: Inputs = {
  metier: 'electricien',
  caHT: 80000,
  anciennete: 1,
  effectif: '1',
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
    const tranches = Math.floor((inputs.caHT - 1) / 50000); // 0 for <=50k, 1 for 50k-100k, etc.
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

  // Anciennete factor
  if (inputs.anciennete < 3) {
    factors.push({
      label: `Activité depuis ${inputs.anciennete} an${inputs.anciennete > 1 ? 's' : ''}`,
      detail: `+30 % (surprime primo-souscription, moins de 3 ans)`,
      multiplier: 1.3,
      positive: false,
    });
  } else {
    factors.push({
      label: `Activité depuis ${inputs.anciennete >= 20 ? '20 ans et +' : `${inputs.anciennete} ans`}`,
      detail: `Pas de surprime primo-souscription`,
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

  // Sinistralite factor
  if (inputs.sinistralite === '1') {
    factors.push({
      label: '1 sinistre déclaré',
      detail: '+40 % (sinistre dans les 5 dernières années)',
      multiplier: 1.4,
      positive: false,
    });
  } else if (inputs.sinistralite === '2+') {
    factors.push({
      label: '2 sinistres ou plus',
      detail: '+100 % (risque possible de refus de cotation)',
      multiplier: 2,
      positive: false,
    });
  } else {
    factors.push({
      label: 'Aucun sinistre déclaré',
      detail: 'Dossier propre — pas de majoration',
      multiplier: 1,
      positive: true,
    });
  }

  return factors;
}

export function DecennaleSimulator() {
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
    const rawMultiplier = factors.reduce((acc, f) => acc * f.multiplier, 1);
    // Garde-fou : sur des combinaisons extrêmes (gros CA × primo × gros
    // effectif × sinistralité), le produit des facteurs peut atteindre ~8×,
    // ce qui surestime la prime. On plafonne le multiplicateur global à 5×.
    const MULTIPLIER_CAP = 5;
    const cappedMultiplier = Math.min(rawMultiplier, MULTIPLIER_CAP);
    const isCapped = rawMultiplier > MULTIPLIER_CAP;
    const adjustedBase = base * cappedMultiplier;
    const min = adjustedBase * 0.85;
    const max = adjustedBase * 1.3;
    const moyMensuel = (min + max) / 2 / 12;
    return {
      base,
      min,
      max,
      moyMensuel,
      factors,
      isCapped,
      isHigh: min > 5000,
      isRefus: inputs.sinistralite === '2+',
    };
  }, [inputs]);

  const ctaBrokerHref = '#';

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({
      source: 'simulateur-decennale',
      metier: inputs.metier,
    });
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [inputs.metier]);

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
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
                Le métier déclaré est le facteur qui influence le plus la prime décennale.
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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Ancienneté de l'activité</Label>
                <span className="text-sm font-semibold text-brand-500">
                  {inputs.anciennete >= 20 ? '20 ans et +' : `${inputs.anciennete} an${inputs.anciennete > 1 ? 's' : ''}`}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={inputs.anciennete}
                onChange={(e) => update('anciennete', parseInt(e.target.value, 10))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-brand-500"
              />
              <p className="text-xs text-gray-500">
                Surprime de 30 % en dessous de 3 ans d'activité (primo-souscription).
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

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="sinistralite">Sinistralité sur les 5 dernières années</Label>
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
                +40 % pour 1 sinistre, +100 % au-delà — voire refus de cotation chez certains assureurs.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
            <CardHeader>
              <CardTitle>Votre fourchette estimée</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">Prime décennale annuelle</p>
                <p className="mt-1 text-3xl font-bold leading-tight text-brand-500 sm:text-4xl">
                  Entre {fmtEuro(results.min)} et {fmtEuro(results.max)}
                </p>
                <p className="mt-1 text-xs text-gray-500">par an, HT</p>
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <Row label="Mensualité estimée" value={`${fmtEuro(results.moyMensuel)}/mois`} />
                <Row label="Base de tarif métier" value={`${fmtEuro(results.base)}/an`} />
              </div>

              {results.isCapped && (
                <p className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600">
                  Fourchette plafonnée : le cumul de vos facteurs de majoration dépasse ×5. Sur des
                  profils aussi atypiques, seul un courtier peut chiffrer précisément le risque.
                </p>
              )}

              {results.isRefus ? (
                <div
                  className="flex items-start gap-3 rounded-lg border border-rose-300 bg-rose-50 p-4 text-rose-800"
                  role="status"
                >
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold">Risque de refus de cotation</p>
                    <p className="mt-1 opacity-90">
                      Au-delà de 2 sinistres, plusieurs assureurs refusent de cotiser. Passez par un courtier spécialisé risques aggravés.
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
                      Au-delà de 5 000 €/an, comparez impérativement au moins 3 devis courtiers BTP spécialisés.
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="space-y-2 pt-2">
                <a href={ctaBrokerHref} data-testid="cta-broker">
                  <Button className="h-11 w-full rounded-full">
                    Comparez avec 3 courtiers BTP partenaires en 2 min
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href={ctaSignupHref} data-testid="cta-signup">
                  <Button variant="outline" className="h-11 w-full rounded-full">
                    Ou essayez Batup pour piloter votre activité après souscription
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>

              <p className="border-t border-gray-100 pt-4 text-xs leading-relaxed text-gray-500">
                Fourchette indicative basée sur les barèmes courtiers BTP 2026. Votre devis réel dépend du courtier, de la compagnie d'assurance et des spécificités de votre dossier.
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

      <StickyResultBar
        label="Décennale / an"
        value={`${fmtEuro(results.min)} – ${fmtEuro(results.max)}`}
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
