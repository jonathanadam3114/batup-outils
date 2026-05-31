import { useMemo, useState } from 'react';
import { ArrowRight, Check, Minus } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Label, Button } from './ui';

type CAOption = 'lt30' | '30_80' | '80_200' | 'gt200';
type AssociesOption = 'seul' | '2_3' | '4plus';
type ActiviteOption = 'prestation_pure' | 'mixte' | 'negoce';
type PrioriteOption = 'simplicite' | 'protection' | 'fiscalite' | 'investisseurs';

type Statut = 'micro' | 'ei_reel' | 'eurl' | 'sarl' | 'sas';

interface Answers {
  ca: CAOption | null;
  associes: AssociesOption | null;
  activite: ActiviteOption | null;
  priorite: PrioriteOption | null;
}

const STATUT_LABELS: Record<Statut, string> = {
  micro: 'Micro-entreprise',
  ei_reel: 'EI au réel',
  eurl: 'EURL',
  sarl: 'SARL',
  sas: 'SAS / SASU',
};

const STATUT_TAGLINES: Record<Statut, string> = {
  micro: 'Simple, rapide, plafonnée',
  ei_reel: 'Réel avec patrimoine protégé depuis 2022',
  eurl: 'Société unipersonnelle, IR ou IS au choix',
  sarl: 'Cadre classique pour s’associer',
  sas: 'Modulable, idéale pour grandir',
};

interface CompareRow {
  key: string;
  label: string;
  cells: Record<Statut, { good: number; text: string }>;
}

const COMPARE_TABLE: CompareRow[] = [
  {
    key: 'charges',
    label: 'Charges sociales',
    cells: {
      micro: { good: 3, text: '21,2 % du CA' },
      ei_reel: { good: 2, text: '~45 % du bénéfice' },
      eurl: { good: 2, text: '~45 % bénéfice (IR) ou rémunération (IS)' },
      sarl: { good: 2, text: '~45 % rémunération gérant majoritaire' },
      sas: { good: 1, text: '~70-80 % rémunération président' },
    },
  },
  {
    key: 'fiscalite',
    label: 'Fiscalité',
    cells: {
      micro: { good: 2, text: 'IR forfaitaire (abattement 50 %)' },
      ei_reel: { good: 2, text: "IR sur bénéfice réel" },
      eurl: { good: 3, text: 'IR ou IS sur option' },
      sarl: { good: 3, text: 'IS (15 % puis 25 %)' },
      sas: { good: 3, text: 'IS + dividendes optimisables' },
    },
  },
  {
    key: 'patrimoine',
    label: 'Protection patrimoine',
    cells: {
      micro: { good: 2, text: 'Auto depuis 2022 (loi EI)' },
      ei_reel: { good: 3, text: 'Patrimoine pro séparé de droit' },
      eurl: { good: 3, text: 'Responsabilité limitée aux apports' },
      sarl: { good: 3, text: 'Responsabilité limitée aux apports' },
      sas: { good: 3, text: 'Responsabilité limitée aux apports' },
    },
  },
  {
    key: 'admin',
    label: 'Complexité admin',
    cells: {
      micro: { good: 3, text: 'Très simple — déclaration en ligne' },
      ei_reel: { good: 2, text: 'Comptabilité réelle + liasse' },
      eurl: { good: 2, text: 'Statuts + comptes annuels' },
      sarl: { good: 1, text: 'Statuts + AG + comptes annuels' },
      sas: { good: 1, text: 'Statuts sur mesure + formalisme' },
    },
  },
  {
    key: 'plafond',
    label: 'Plafond CA',
    cells: {
      micro: { good: 1, text: '77 700 € prestations / 188 700 € négoce' },
      ei_reel: { good: 3, text: 'Aucun plafond' },
      eurl: { good: 3, text: 'Aucun plafond' },
      sarl: { good: 3, text: 'Aucun plafond' },
      sas: { good: 3, text: 'Aucun plafond' },
    },
  },
  {
    key: 'associes',
    label: 'Accueil associés',
    cells: {
      micro: { good: 1, text: 'Impossible (1 personne)' },
      ei_reel: { good: 1, text: 'Impossible (1 personne)' },
      eurl: { good: 2, text: 'Passage en SARL si nouvel associé' },
      sarl: { good: 2, text: 'Cadre rigide, parts sociales' },
      sas: { good: 3, text: 'Très souple — actions, BSPCE, etc.' },
    },
  },
];

interface Recommendation {
  statut: Statut;
  score: number;
  reason: string;
}

function computeRecommendations(a: Answers): Recommendation[] {
  // Default neutral baseline
  const scores: Record<Statut, number> = {
    micro: 5,
    ei_reel: 5,
    eurl: 5,
    sarl: 5,
    sas: 5,
  };
  const reasons: Record<Statut, string[]> = {
    micro: [],
    ei_reel: [],
    eurl: [],
    sarl: [],
    sas: [],
  };

  // CA prévu
  if (a.ca === 'lt30') {
    scores.micro += 3;
    scores.ei_reel += 1;
    scores.eurl -= 1;
    scores.sarl -= 2;
    scores.sas -= 2;
    reasons.micro.push('CA < 30 k€ : la micro est imbattable en simplicité');
    reasons.ei_reel.push("CA < 30 k€ : alternative si gros achats matériaux");
  } else if (a.ca === '30_80') {
    scores.micro += 1;
    scores.ei_reel += 2;
    scores.eurl += 1;
    scores.sarl -= 1;
    scores.sas -= 1;
    reasons.micro.push('Sous plafond micro mais commencez à dépasser le seuil de rentabilité');
    reasons.ei_reel.push('Vous déduisez vos charges réelles');
  } else if (a.ca === '80_200') {
    scores.micro -= 3;
    scores.ei_reel += 2;
    scores.eurl += 3;
    scores.sarl += 2;
    scores.sas += 2;
    reasons.ei_reel.push("Bonne option si vous restez seul et voulez la simplicité");
    reasons.eurl.push("CA significatif : structure protégée et optionnable à l'IS");
  } else if (a.ca === 'gt200') {
    scores.micro -= 5;
    scores.ei_reel -= 1;
    scores.eurl += 2;
    scores.sarl += 3;
    scores.sas += 4;
    reasons.sarl.push("CA > 200 k€ : structure sociétaire indispensable");
    reasons.sas.push('Au-delà de 200 k€, la SAS apporte flexibilité et optimisation');
  }

  // Associés
  if (a.associes === 'seul') {
    scores.eurl += 1;
    reasons.eurl.push('Seul : EURL = SARL unipersonnelle, mêmes avantages');
  } else if (a.associes === '2_3') {
    scores.micro = -10;
    scores.ei_reel = -10;
    scores.eurl -= 5;
    scores.sarl += 3;
    scores.sas += 3;
    reasons.sarl.push("Plusieurs associés : la SARL est le choix classique");
    reasons.sas.push('Plusieurs associés : la SAS offre plus de souplesse statutaire');
  } else if (a.associes === '4plus') {
    scores.micro = -10;
    scores.ei_reel = -10;
    scores.eurl = -10;
    scores.sarl += 2;
    scores.sas += 5;
    reasons.sas.push("4+ associés : la SAS est le standard moderne (pacte d'associés, BSPCE)");
  }

  // Activité
  if (a.activite === 'prestation_pure') {
    scores.micro += 2;
    scores.ei_reel += 1;
    reasons.micro.push('Prestation pure : peu de TVA à récupérer, micro adaptée');
  } else if (a.activite === 'mixte') {
    scores.micro -= 1;
    scores.ei_reel += 2;
    scores.eurl += 1;
    scores.sarl += 1;
    reasons.ei_reel.push('Activité mixte : vous déduisez vos achats matériaux');
  } else if (a.activite === 'negoce') {
    scores.micro -= 3;
    scores.ei_reel += 1;
    scores.eurl += 1;
    scores.sarl += 2;
    scores.sas += 2;
    reasons.sarl.push("Négoce : récupération TVA et déduction achats indispensables");
    reasons.sas.push('Négoce : structure sociétaire pour gérer les flux importants');
  }

  // Priorité
  if (a.priorite === 'simplicite') {
    scores.micro += 3;
    scores.ei_reel += 1;
    scores.eurl -= 1;
    scores.sarl -= 2;
    scores.sas -= 2;
    reasons.micro.push("Priorité simplicité : aucun statut n'égale la micro");
  } else if (a.priorite === 'protection') {
    scores.micro -= 1;
    scores.ei_reel += 2;
    scores.eurl += 3;
    scores.sarl += 2;
    scores.sas += 2;
    reasons.eurl.push('Protection patrimoniale : responsabilité limitée aux apports');
    reasons.ei_reel.push('Patrimoine personnel séparé de droit depuis 2022');
  } else if (a.priorite === 'fiscalite') {
    scores.micro -= 1;
    scores.eurl += 2;
    scores.sarl += 3;
    scores.sas += 3;
    reasons.sarl.push("Optimisation fiscale : IS + arbitrage rémunération/dividendes");
    reasons.sas.push('Optimisation fiscale : dividendes hors cotisations sociales');
  } else if (a.priorite === 'investisseurs') {
    scores.micro = -10;
    scores.ei_reel = -10;
    scores.eurl -= 2;
    scores.sarl -= 1;
    scores.sas += 5;
    reasons.sas.push("Accueil d'investisseurs : la SAS est obligatoire (actions, BSA)");
  }

  const sorted = (Object.keys(scores) as Statut[])
    .map((statut) => ({
      statut,
      score: Math.max(0, Math.min(10, scores[statut])),
      reason:
        reasons[statut].length > 0
          ? reasons[statut].join(' · ')
          : 'Choix possible, mais d’autres statuts collent mieux à votre profil.',
    }))
    .sort((a, b) => b.score - a.score);

  return sorted;
}

const CA_LABELS: Record<CAOption, string> = {
  lt30: 'Moins de 30 000 €',
  '30_80': '30 000 à 80 000 €',
  '80_200': '80 000 à 200 000 €',
  gt200: 'Plus de 200 000 €',
};

const ASSOCIES_LABELS: Record<AssociesOption, string> = {
  seul: 'Seul',
  '2_3': '2 ou 3 associés',
  '4plus': '4 associés ou plus',
};

const ACTIVITE_LABELS: Record<ActiviteOption, string> = {
  prestation_pure: 'Prestation pure (main d’œuvre)',
  mixte: 'Prestation + achat-revente matériaux',
  negoce: 'Négoce (achat-revente dominant)',
};

const PRIORITE_LABELS: Record<PrioriteOption, string> = {
  simplicite: 'Simplicité administrative',
  protection: 'Protection du patrimoine personnel',
  fiscalite: 'Optimisation fiscale',
  investisseurs: 'Accueillir des investisseurs',
};

export function StatutJuridiqueComparator() {
  const [answers, setAnswers] = useState<Answers>({
    ca: null,
    associes: null,
    activite: null,
    priorite: null,
  });

  const allAnswered = answers.ca && answers.associes && answers.activite && answers.priorite;

  const recommendations = useMemo(() => computeRecommendations(answers), [answers]);
  const top = recommendations[0];
  const alternatives = recommendations.slice(1, 3);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({
      source: 'comparateur-statut-juridique',
    });
    if (top && allAnswered) params.set('statut_recommande', top.statut);
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [top, allAnswered]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>1. Quel CA prévoyez-vous la première année ?</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                name="ca"
                value={answers.ca}
                options={Object.entries(CA_LABELS) as [CAOption, string][]}
                onChange={(v) => setAnswers((a) => ({ ...a, ca: v as CAOption }))}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Vous lancez seul ou avec des associés ?</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                name="associes"
                value={answers.associes}
                options={Object.entries(ASSOCIES_LABELS) as [AssociesOption, string][]}
                onChange={(v) => setAnswers((a) => ({ ...a, associes: v as AssociesOption }))}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Quel type d’activité ?</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                name="activite"
                value={answers.activite}
                options={Object.entries(ACTIVITE_LABELS) as [ActiviteOption, string][]}
                onChange={(v) => setAnswers((a) => ({ ...a, activite: v as ActiviteOption }))}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Quelle est votre priorité ?</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                name="priorite"
                value={answers.priorite}
                options={Object.entries(PRIORITE_LABELS) as [PrioriteOption, string][]}
                onChange={(v) => setAnswers((a) => ({ ...a, priorite: v as PrioriteOption }))}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-20 space-y-4">
            <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
              <CardHeader>
                <CardTitle>Notre recommandation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {!allAnswered && (
                  <p className="text-sm text-gray-600">
                    Répondez aux 4 questions pour obtenir une recommandation personnalisée.
                  </p>
                )}

                {allAnswered && top && (
                  <>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Statut recommandé
                      </p>
                      <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">
                        {STATUT_LABELS[top.statut]}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Note : <strong>{top.score.toFixed(1)} / 10</strong> ·{' '}
                        {STATUT_TAGLINES[top.statut]}
                      </p>
                    </div>

                    <div className="rounded-md border border-brand-500/10 bg-white px-3 py-3 text-xs text-gray-700">
                      <p className="font-semibold text-gray-900">Pourquoi ce statut ?</p>
                      <p className="mt-1 leading-relaxed">{top.reason}</p>
                    </div>

                    {alternatives.length > 0 && (
                      <div className="space-y-2 border-t border-gray-100 pt-4">
                        <p className="text-xs uppercase tracking-wider text-gray-500">
                          Alternatives à considérer
                        </p>
                        {alternatives.map((r) => (
                          <div
                            key={r.statut}
                            className="flex items-start justify-between gap-3 text-sm"
                          >
                            <div>
                              <p className="font-semibold text-gray-900">
                                {STATUT_LABELS[r.statut]}
                              </p>
                              <p className="text-xs text-gray-500">{r.reason}</p>
                            </div>
                            <span className="whitespace-nowrap text-sm font-semibold text-gray-700">
                              {r.score.toFixed(1)}/10
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                <div className="space-y-2 pt-2">
                  <a href={ctaSignupHref} data-testid="cta-signup">
                    <Button className="h-11 w-full rounded-full">
                      Essayer Batup gratuitement
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <p className="text-center text-xs text-gray-500">
                    Devis conformes, marges, pointage — gratuit 30 jours, sans carte.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tableau comparatif des 5 statuts</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="py-3 pr-4 font-medium text-gray-600">Critère</th>
                {(Object.keys(STATUT_LABELS) as Statut[]).map((s) => (
                  <th
                    key={s}
                    className={`py-3 px-3 font-semibold ${
                      allAnswered && top?.statut === s ? 'text-brand-500' : 'text-gray-900'
                    }`}
                  >
                    {STATUT_LABELS[s]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_TABLE.map((row) => (
                <tr key={row.key} className="border-b border-gray-100 align-top">
                  <td className="py-3 pr-4 font-medium text-gray-700">{row.label}</td>
                  {(Object.keys(STATUT_LABELS) as Statut[]).map((s) => (
                    <td
                      key={s}
                      className={`py-3 px-3 text-xs ${
                        allAnswered && top?.statut === s ? 'bg-brand-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-1.5">
                        <ScoreIcon good={row.cells[s].good} />
                        <span className="text-gray-700">{row.cells[s].text}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs text-gray-500">
            Barème indicatif 2026. Confirmez avec votre comptable avant toute décision.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function RadioGroup<T extends string>({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: T | null;
  options: [T, string][];
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map(([key, label]) => {
        const selected = value === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(key)}
            className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
              selected
                ? 'border-brand-500 bg-brand-50 text-gray-900'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <span
                className={`inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border ${
                  selected ? 'border-brand-500 bg-brand-500' : 'border-gray-300 bg-white'
                }`}
              >
                {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>
              <span>{label}</span>
            </span>
            <Label className="sr-only">
              {name} {label}
            </Label>
          </button>
        );
      })}
    </div>
  );
}

function ScoreIcon({ good }: { good: number }) {
  if (good >= 3) {
    return (
      <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-green-600" aria-label="favorable" />
    );
  }
  if (good === 2) {
    return (
      <Minus
        className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-500"
        aria-label="neutre"
      />
    );
  }
  return (
    <span
      className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-red-400"
      aria-label="défavorable"
    />
  );
}
