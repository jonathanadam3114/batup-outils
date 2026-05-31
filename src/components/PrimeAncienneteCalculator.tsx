import { useMemo, useState, type ReactNode } from 'react';
import { ArrowRight, HelpCircle, Info } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';

type Contrat = 'ouvrier' | 'etam' | 'cadre';

interface Inputs {
  salaireBrut: number;
  anciennete: number;
  contrat: Contrat;
}

const DEFAULTS: Inputs = {
  salaireBrut: 2200,
  anciennete: 5,
  contrat: 'ouvrier',
};

// Barème canonique — CCN ouvriers du bâtiment (article 6.2, accord 8 oct. 1990
// et accords régionaux types). Paliers de 3 ans, taux croissant de 3 % à 15 %.
const PALIERS_OUVRIER: { seuil: number; taux: number }[] = [
  { seuil: 15, taux: 0.15 },
  { seuil: 12, taux: 0.12 },
  { seuil: 9, taux: 0.09 },
  { seuil: 6, taux: 0.06 },
  { seuil: 3, taux: 0.03 },
];

// Barème CCN ETAM bâtiment (article 14) — paliers de 3 ans, plafond à 5 %.
const PALIERS_ETAM: { seuil: number; taux: number }[] = [
  { seuil: 15, taux: 0.05 },
  { seuil: 12, taux: 0.04 },
  { seuil: 9, taux: 0.03 },
  { seuil: 6, taux: 0.02 },
  { seuil: 3, taux: 0.01 },
];

function getPaliers(contrat: Contrat): { seuil: number; taux: number }[] {
  if (contrat === 'ouvrier') return PALIERS_OUVRIER;
  if (contrat === 'etam') return PALIERS_ETAM;
  return [];
}

const CHARGES_PATRONALES_BTP = 0.42;

const NUMBER_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const RATE_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });

function fmtEuro(n: number, decimals = 0): string {
  if (!Number.isFinite(n) || n <= 0) return '— €';
  const fmt = decimals > 0 ? RATE_FMT : NUMBER_FMT;
  return `${fmt.format(decimals > 0 ? n : Math.round(n))} €`;
}

function getTaux(annees: number, paliers: { seuil: number; taux: number }[]): number {
  for (const p of paliers) {
    if (annees >= p.seuil) return p.taux;
  }
  return 0;
}

function nextPalier(
  annees: number,
  paliers: { seuil: number; taux: number }[],
): { seuil: number; taux: number } | null {
  // Find the next higher palier strictly above the current one.
  const sorted = [...paliers].sort((a, b) => a.seuil - b.seuil);
  for (const p of sorted) {
    if (annees < p.seuil) return p;
  }
  return null;
}

export function PrimeAncienneteCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const updateNum = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const updateField = <K extends keyof Inputs>(key: K, value: Inputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const results = useMemo(() => {
    const applicable = inputs.contrat === 'ouvrier' || inputs.contrat === 'etam';
    const paliers = getPaliers(inputs.contrat);
    const annees = Math.max(0, Math.floor(inputs.anciennete));
    const brut = Math.max(0, inputs.salaireBrut);

    const taux = applicable ? getTaux(annees, paliers) : 0;
    const primeMensuelle = brut * taux;
    const primeAnnuelle = primeMensuelle * 12;
    const coutEmployeur = primeAnnuelle * (1 + CHARGES_PATRONALES_BTP);

    const prochain = applicable ? nextPalier(annees, paliers) : null;
    const primeProchainPalier = prochain ? brut * prochain.taux : 0;

    return {
      applicable,
      annees,
      taux,
      primeMensuelle,
      primeAnnuelle,
      coutEmployeur,
      prochain,
      primeProchainPalier,
    };
  }, [inputs]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: 'calculateur-prime-anciennete-ccn' });
    if (results.primeMensuelle > 0) {
      params.set('prime_mensuelle', results.primeMensuelle.toFixed(0));
    }
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [results.primeMensuelle]);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Salaire et ancienneté</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Salaire brut mensuel"
              hint="Brut de base, hors heures sup et indemnités"
              suffix="€/mois"
              value={inputs.salaireBrut}
              onChange={(v) => updateNum('salaireBrut', v)}
              step="50"
            />
            <Field
              label="Années d'ancienneté"
              hint="Dans l'entreprise actuelle (palier atteint)"
              suffix="ans"
              value={inputs.anciennete}
              onChange={(v) => updateNum('anciennete', v)}
              step="1"
            />
            <div className="sm:col-span-2 space-y-1.5">
              <Label className="flex items-center gap-1">
                Type de contrat
                <span
                  title="Ouvriers : CCN art. 6.2, barème 3/6/9/12/15 %. ETAM : CCN art. 14, barème 1/2/3/4/5 %. Cadres : pas de prime conventionnelle barémée."
                  className="cursor-help text-gray-400"
                >
                  <HelpCircle className="h-4 w-4" />
                </span>
              </Label>
              <Select
                value={inputs.contrat}
                onChange={(v) => updateField('contrat', v as Contrat)}
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
            <CardTitle>
              {inputs.contrat === 'ouvrier' && 'Barème ouvriers du bâtiment (CCN, art. 6.2)'}
              {inputs.contrat === 'etam' && 'Barème ETAM bâtiment (CCN, art. 14)'}
              {inputs.contrat === 'cadre' && 'Cadres bâtiment — pas de barème conventionnel'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {inputs.contrat === 'cadre' ? (
              <p className="text-sm text-gray-600">
                La convention collective nationale des cadres du bâtiment ne prévoit pas de
                prime d'ancienneté barémée. L'ancienneté joue sur la classification (position
                1 à 4) et sur les augmentations individuelles négociées.
              </p>
            ) : (
              <>
                <div className="overflow-hidden rounded-md border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium">Ancienneté</th>
                        <th className="px-3 py-2 text-right font-medium">Taux</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(inputs.contrat === 'ouvrier'
                        ? [
                            { lib: 'Moins de 3 ans', t: 0 },
                            { lib: '3 à 5 ans', t: 0.03 },
                            { lib: '6 à 8 ans', t: 0.06 },
                            { lib: '9 à 11 ans', t: 0.09 },
                            { lib: '12 à 14 ans', t: 0.12 },
                            { lib: '15 ans et plus (plafond)', t: 0.15 },
                          ]
                        : [
                            { lib: 'Moins de 3 ans', t: 0 },
                            { lib: '3 à 5 ans', t: 0.01 },
                            { lib: '6 à 8 ans', t: 0.02 },
                            { lib: '9 à 11 ans', t: 0.03 },
                            { lib: '12 à 14 ans', t: 0.04 },
                            { lib: '15 ans et plus (plafond)', t: 0.05 },
                          ]
                      ).map((row) => {
                        const active =
                          results.applicable &&
                          Math.abs(row.t - results.taux) < 0.0001 &&
                          row.t > 0;
                        return (
                          <tr
                            key={row.lib}
                            className={`border-t border-gray-100 ${
                              active ? 'bg-brand-50/60 font-semibold text-brand-700' : 'text-gray-700'
                            }`}
                          >
                            <td className="px-3 py-2">{row.lib}</td>
                            <td className="px-3 py-2 text-right">{(row.t * 100).toFixed(0)} %</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  Barème canonique CCN — les accords régionaux peuvent fixer des taux légèrement
                  différents. L'assiette légale est le salaire minimum conventionnel de la
                  classification (Niveau-Position) ; l'outil simplifie en utilisant le brut réel.
                </p>
              </>
            )}
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
              {!results.applicable ? (
                <div
                  className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-3 text-sm text-amber-800"
                  role="status"
                  data-testid="verdict-non-applicable"
                >
                  <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <p>
                    <span className="font-semibold">Non applicable / barème individuel négocié.</span> La CCN cadres du bâtiment ne prévoit pas de prime d'ancienneté barémée. L'ancienneté joue sur la classification (position 1 à 4) et sur les augmentations individuelles.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Prime d'ancienneté mensuelle
                    </p>
                    <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">
                      {fmtEuro(results.primeMensuelle, 2)}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Taux appliqué :{' '}
                      <span className="font-semibold text-gray-900">
                        {(results.taux * 100).toFixed(0)} %
                      </span>{' '}
                      pour {results.annees} an(s) d'ancienneté
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                    <Row label="Brut mensuel de référence" value={fmtEuro(inputs.salaireBrut)} />
                    <Row
                      label={`Prime mensuelle (${(results.taux * 100).toFixed(0)} %)`}
                      value={fmtEuro(results.primeMensuelle, 2)}
                    />
                    <Row label="Prime annuelle (× 12)" value={fmtEuro(results.primeAnnuelle)} />
                    <Row
                      label="Coût employeur annuel chargé (× 1,42)"
                      value={fmtEuro(results.coutEmployeur)}
                    />
                  </div>

                  {results.prochain && results.primeProchainPalier > 0 && (
                    <div className="rounded-md bg-brand-50 px-4 py-3 text-xs text-gray-700">
                      Prochain palier à <span className="font-semibold">{results.prochain.seuil} ans</span> ({(results.prochain.taux * 100).toFixed(0)} %) : la prime passerait à{' '}
                      <span className="font-semibold text-brand-500">
                        {fmtEuro(results.primeProchainPalier, 2)}/mois
                      </span>
                      .
                    </div>
                  )}

                  <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <p>
                      <span className="font-semibold">Assiette légale :</span> la prime se calcule
                      sur le salaire minimum conventionnel de la classification (Niveau-Position),
                      pas sur le brut réel. Si votre salarié est payé au-dessus du minimum, la
                      prime se calcule sur le minimum (le reste est rémunération libre). L'outil
                      simplifie en utilisant le brut saisi.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <a href={ctaSignupHref} data-testid="cta-signup">
                      <Button className="h-11 w-full rounded-full">
                        Essayer Batup gratuitement
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                    <p className="text-xs text-center text-gray-500">
                      Batup applique le bon palier à chaque date anniversaire et met à jour le coût horaire chargé en temps réel.
                    </p>
                  </div>
                </>
              )}
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
  label: ReactNode;
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
