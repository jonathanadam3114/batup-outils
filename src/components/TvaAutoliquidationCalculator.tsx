import { useMemo, useState } from 'react';
import { ArrowRight, Check, CheckCircle, Clipboard, Info, TrendingDown } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Button, Label } from './ui';

type Q1 = 'a' | 'b';
type Q2 = 'a' | 'b' | 'c' | 'd';
type Q3 = 'a' | 'b' | 'c' | 'd' | 'e';
type Q5 = 'a' | 'b' | 'c' | '';

type Verdict = 'autoliquidation' | 'tva-classique' | 'franchise';

interface Q3Result {
  rateLabel: string;
  rateDetail: string;
}

const Q3_TVA_RATE: Record<Q3, Q3Result> = {
  a: {
    rateLabel: '10 % ou 20 %',
    rateDetail:
      "10 % pour la rénovation d'un logement de plus de 2 ans (5,5 % si travaux d'amélioration énergétique éligibles). 20 % pour le neuf.",
  },
  b: {
    rateLabel: '10 % ou 20 %',
    rateDetail: "10 % si démolition liée à une rénovation d'un logement > 2 ans. 20 % sinon.",
  },
  c: {
    rateLabel: '20 %',
    rateDetail:
      "L'entretien-nettoyage hors travaux est au taux normal de 20 %. Le taux réduit ne s'applique que s'il est intégré à un chantier de rénovation.",
  },
  d: {
    rateLabel: '20 %',
    rateDetail: 'Les travaux publics (voirie, réseaux) sont au taux normal de 20 %.',
  },
  e: {
    rateLabel: '20 %',
    rateDetail: 'Prestations hors travaux immobiliers : taux normal de 20 % en règle générale.',
  },
};

interface Inputs {
  q1: Q1 | '';
  q2: Q2 | '';
  q3: Q3 | '';
  montantHT: number;
  q5: Q5;
}

const DEFAULTS: Inputs = {
  q1: '',
  q2: '',
  q3: '',
  montantHT: 0,
  q5: '',
};

const NUMBER_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });
function fmtEuro(n: number): string {
  if (!Number.isFinite(n) || n === 0) return '— €';
  return `${NUMBER_FMT.format(n)} €`;
}

function computeVerdict(inputs: Inputs): Verdict | null {
  const { q1, q2, q3, q5 } = inputs;
  if (!q1 || !q2 || !q3) return null;
  // Franchise en base trumps everything: pas de TVA dans tous les cas
  if (q5 === 'b') return 'franchise';
  const isAutoliq = q1 === 'a' && q2 === 'a' && (q3 === 'a' || q3 === 'b' || q3 === 'd');
  return isAutoliq ? 'autoliquidation' : 'tva-classique';
}

export function TvaAutoliquidationCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [copied, setCopied] = useState(false);

  const update = <K extends keyof Inputs>(key: K, value: Inputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const verdict = useMemo(() => computeVerdict(inputs), [inputs]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: 'calculateur-tva-autoliquidation' });
    if (verdict) params.set('tva_regime', verdict);
    if (inputs.montantHT > 0) params.set('amount_ht', inputs.montantHT.toFixed(2));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [verdict, inputs.montantHT]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API blocked — silently ignore
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Votre situation en 5 questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <QuestionBlock
              number={1}
              question="Vous facturez :"
              options={[
                {
                  value: 'a',
                  label: "Un autre pro du BTP qui fait le chantier pour son propre client",
                },
                { value: 'b', label: 'Le client final directement (maître d’ouvrage)' },
              ]}
              value={inputs.q1}
              onChange={(v) => update('q1', v as Q1)}
              name="q1"
            />

            <QuestionBlock
              number={2}
              question="Votre client est :"
              options={[
                { value: 'a', label: 'Une entreprise française assujettie à la TVA' },
                { value: 'b', label: 'Une entreprise UE assujettie à la TVA' },
                { value: 'c', label: 'Un particulier' },
                { value: 'd', label: 'Une entreprise étrangère hors UE' },
              ]}
              value={inputs.q2}
              onChange={(v) => update('q2', v as Q2)}
              name="q2"
            />

            <QuestionBlock
              number={3}
              question="Type de travaux :"
              options={[
                { value: 'a', label: 'Construction, rénovation ou réparation d’immeuble' },
                { value: 'b', label: 'Démolition d’immeuble' },
                { value: 'c', label: 'Entretien, nettoyage hors travaux' },
                { value: 'd', label: 'Travaux publics (voirie, réseaux)' },
                { value: 'e', label: 'Autre (location matériel, conception sans pose, etc.)' },
              ]}
              value={inputs.q3}
              onChange={(v) => update('q3', v as Q3)}
              name="q3"
            />

            <div className="space-y-1.5">
              <Label>Montant HT de la facture (optionnel)</Label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="any"
                  value={inputs.montantHT === 0 ? '' : inputs.montantHT}
                  onChange={(e) =>
                    update('montantHT', parseFloat(e.target.value.replace(',', '.')) || 0)
                  }
                  placeholder="0"
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  €
                </span>
              </div>
            </div>

            <QuestionBlock
              number={5}
              question="Vous êtes (optionnel) :"
              options={[
                { value: 'a', label: 'Auto-entrepreneur — régime micro (avec TVA)' },
                { value: 'b', label: 'En franchise en base (sous les seuils art. 293 B CGI)' },
                { value: 'c', label: 'Régime réel (TVA collectée et déductible)' },
              ]}
              value={inputs.q5}
              onChange={(v) => update('q5', v as Q5)}
              name="q5"
            />
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
            <CardHeader>
              <CardTitle>Votre verdict</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {!verdict ? (
                <div className="rounded-lg border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500">
                  Répondez aux 3 premières questions pour obtenir votre verdict.
                </div>
              ) : (
                <VerdictPanel
                  verdict={verdict}
                  q3={inputs.q3 as Q3}
                  montantHT={inputs.montantHT}
                  onCopy={handleCopy}
                  copied={copied}
                />
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

interface OptionDef {
  value: string;
  label: string;
}

function QuestionBlock({
  number,
  question,
  options,
  value,
  onChange,
  name,
}: {
  number: number;
  question: string;
  options: OptionDef[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-gray-900">
        <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
          {number}
        </span>
        {question}
      </legend>
      <div className="space-y-2">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition ${
                selected
                  ? 'border-brand-500 bg-brand-50 text-gray-900'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="mt-0.5 h-4 w-4 cursor-pointer accent-brand-500"
              />
              <span className="leading-snug">{opt.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

const AUTOLIQ_MENTION = '« TVA due par le preneur — Autoliquidation, article 283-2 nonies du CGI »';
const FRANCHISE_MENTION = '« TVA non applicable — art. 293 B du CGI »';

function VerdictPanel({
  verdict,
  q3,
  montantHT,
  onCopy,
  copied,
}: {
  verdict: Verdict;
  q3: Q3;
  montantHT: number;
  onCopy: (text: string) => void;
  copied: boolean;
}) {
  if (verdict === 'autoliquidation') {
    return (
      <div className="space-y-4">
        <div
          className="flex items-start gap-3 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-emerald-800"
          role="status"
          data-testid="verdict-autoliquidation"
        >
          <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0" />
          <div>
            <p className="text-base font-semibold">Votre facture doit être en autoliquidation</p>
            <p className="mt-1 text-sm leading-relaxed opacity-90">
              Les 3 conditions de l’article 283-2 nonies du CGI sont remplies. Vous ne facturez pas
              de TVA : c’est votre donneur d’ordre qui la collecte et la déduit.
            </p>
          </div>
        </div>

        <MentionBlock
          label="Mention obligatoire à recopier"
          mention={AUTOLIQ_MENTION}
          onCopy={onCopy}
          copied={copied}
        />

        <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
          <Row label="Montant facturé" value={fmtEuro(montantHT)} />
          <Row label="TVA à facturer" value="0 € (autoliquidation)" />
          <Row label="Total facture" value={fmtEuro(montantHT)} />
        </div>

        <p className="text-xs text-gray-500">
          Référence : article 283-2 nonies du CGI (loi de finances 2014). Omission de la mention :
          amende de 5 % du montant facturé (art. 1737 du CGI).
        </p>
      </div>
    );
  }

  if (verdict === 'franchise') {
    return (
      <div className="space-y-4">
        <div
          className="flex items-start gap-3 rounded-lg border border-rose-300 bg-rose-50 p-4 text-rose-800"
          role="status"
          data-testid="verdict-franchise"
        >
          <TrendingDown className="mt-0.5 h-6 w-6 flex-shrink-0" />
          <div>
            <p className="text-base font-semibold">Pas de TVA — franchise en base</p>
            <p className="mt-1 text-sm leading-relaxed opacity-90">
              Vous êtes en franchise en base : vous ne facturez jamais de TVA, dans tous les cas.
              L’autoliquidation ne s’applique donc pas. Pensez à surveiller vos seuils.
            </p>
          </div>
        </div>

        <MentionBlock
          label="Mention obligatoire à recopier"
          mention={FRANCHISE_MENTION}
          onCopy={onCopy}
          copied={copied}
        />

        <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
          <Row label="Montant facturé" value={fmtEuro(montantHT)} />
          <Row label="TVA à facturer" value="0 € (franchise)" />
          <Row label="Total facture" value={fmtEuro(montantHT)} />
        </div>

        <p className="text-xs text-gray-500">
          Référence : article 293 B du CGI. Plafonds 2026 : 37 500 € (seuil majoré 41 250 €) pour
          les prestations de service, 85 000 € (seuil majoré 93 500 €) pour les livraisons de biens.
          La réforme du seuil unique à 25 000 € a été suspendue en mars 2025.
        </p>
      </div>
    );
  }

  // TVA classique
  const tvaInfo = q3 ? Q3_TVA_RATE[q3] : { rateLabel: '20 %', rateDetail: '' };
  const numericRate = q3 === 'a' || q3 === 'b' ? 10 : 20;
  const tvaEuros = montantHT > 0 ? (montantHT * numericRate) / 100 : 0;
  const ttc = montantHT + tvaEuros;

  return (
    <div className="space-y-4">
      <div
        className="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-800"
        role="status"
        data-testid="verdict-tva-classique"
      >
        <Info className="mt-0.5 h-6 w-6 flex-shrink-0" />
        <div>
          <p className="text-base font-semibold">Facture TVA classique (vous collectez)</p>
          <p className="mt-1 text-sm leading-relaxed opacity-90">
            Les conditions de l’autoliquidation ne sont pas toutes réunies. Vous appliquez la TVA
            au taux qui correspond à la nature de vos travaux.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-3 text-sm">
        <p className="text-xs uppercase tracking-wider text-gray-500">Taux applicable</p>
        <p className="mt-1 text-2xl font-bold text-gray-900">{tvaInfo.rateLabel}</p>
        {tvaInfo.rateDetail && (
          <p className="mt-1 text-xs leading-relaxed text-gray-600">{tvaInfo.rateDetail}</p>
        )}
      </div>

      {montantHT > 0 && (
        <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
          <Row label="Montant HT" value={fmtEuro(montantHT)} />
          <Row label={`TVA (${numericRate} %)`} value={fmtEuro(tvaEuros)} />
          <Row label="Total TTC" value={fmtEuro(ttc)} />
        </div>
      )}

      <p className="text-xs text-gray-500">
        Rappel des taux BTP : 5,5 % travaux d’amélioration énergétique éligibles, 10 % rénovation
        de logement de + de 2 ans, 20 % neuf et autres.
      </p>
    </div>
  );
}

function MentionBlock({
  label,
  mention,
  onCopy,
  copied,
}: {
  label: string;
  mention: string;
  onCopy: (text: string) => void;
  copied: boolean;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</p>
      <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
        <code className="flex-1 whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-gray-900 sm:text-sm">
          {mention}
        </code>
        <button
          type="button"
          onClick={() => onCopy(mention)}
          className="inline-flex flex-shrink-0 items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 transition hover:border-brand-500 hover:text-brand-500"
          aria-label="Copier la mention"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copié
            </>
          ) : (
            <>
              <Clipboard className="h-3.5 w-3.5" />
              Copier
            </>
          )}
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
