import { useMemo, useState } from 'react';
import { ArrowRight, Check, CheckCircle, Clipboard, FileSignature, Info, TrendingDown } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Button, Label } from './ui';

type Q1 = 'a' | 'b' | 'c' | 'd';
type Q2 = 'a' | 'b' | 'c' | 'd' | 'e';
type Q3 = 'a' | 'b' | 'c' | '';
type Q4 = 'a' | 'b';

type Verdict = 'tva-20' | 'tva-10' | 'tva-5-5' | 'autoliquidation' | 'franchise';

interface Inputs {
  q1: Q1 | '';
  q2: Q2 | '';
  q3: Q3;
  q4: Q4 | '';
  montantHT: number;
}

const DEFAULTS: Inputs = {
  q1: '',
  q2: '',
  q3: '',
  q4: '',
  montantHT: 0,
};

const NUMBER_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });
function fmtEuro(n: number): string {
  if (!Number.isFinite(n) || n === 0) return '— €';
  return `${NUMBER_FMT.format(n)} €`;
}

/**
 * Decision logic (in order of precedence):
 *  1. Franchise en base (q4=b) → overrides everything
 *  2. Sous-traitance BTP (q1=b, q2 in a/b/c/d) → autoliquidation
 *  3. Travaux énergétiques sur logement > 2 ans (q2=b, q3=a) → 5,5 %
 *  4. Travaux rénovation sur logement > 2 ans (q2=a, q3=a) → 10 %
 *  5. Par défaut → 20 %
 *
 * Question Q3 (bien immobilier) is only shown when q1='a' (particulier)
 * and q2 ∈ {a,b}. In other branches, q3 is irrelevant.
 */
function computeVerdict(inputs: Inputs): Verdict | null {
  const { q1, q2, q3, q4 } = inputs;
  if (!q1 || !q2 || !q4) return null;

  if (q4 === 'b') return 'franchise';

  // Sous-traitance BTP (donneur d'ordre = entreprise BTP)
  if (q1 === 'b' && (q2 === 'a' || q2 === 'b' || q2 === 'c' || q2 === 'd')) {
    return 'autoliquidation';
  }

  // Énergétique sur logement >2 ans
  if (q1 === 'a' && q2 === 'b') {
    if (!q3) return null;
    if (q3 === 'a') return 'tva-5-5';
  }

  // Rénovation classique sur logement >2 ans
  if (q1 === 'a' && q2 === 'a') {
    if (!q3) return null;
    if (q3 === 'a') return 'tva-10';
  }

  return 'tva-20';
}

const MENTION_BY_VERDICT: Record<Verdict, string> = {
  'tva-20':
    'Aucune mention spéciale requise — la facture affiche le taux normal de 20 % et le montant de TVA correspondant dans le tableau des totaux.',
  'tva-10':
    '« Travaux d’amélioration, de transformation, d’aménagement ou d’entretien portant sur un logement achevé depuis plus de 2 ans — taux réduit applicable (article 279-0 bis du CGI) — attestation client jointe »',
  'tva-5-5':
    '« Travaux d’amélioration de la qualité énergétique portant sur un logement achevé depuis plus de 2 ans (article 278-0 bis A du CGI) — attestation client jointe »',
  autoliquidation:
    '« TVA due par le preneur — Autoliquidation, article 283-2 nonies du CGI »',
  franchise: '« TVA non applicable — article 293 B du CGI »',
};

const SLUG_BY_VERDICT: Record<Verdict, string> = {
  'tva-20': 'tva-20',
  'tva-10': 'tva-10',
  'tva-5-5': 'tva-5-5',
  autoliquidation: 'autoliquidation',
  franchise: 'franchise',
};

export function MentionTvaGenerator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [copied, setCopied] = useState(false);

  const update = <K extends keyof Inputs>(key: K, value: Inputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const verdict = useMemo(() => computeVerdict(inputs), [inputs]);

  // Q3 is only relevant if q1='a' (particulier) and q2 ∈ {a, b}
  const showQ3 = inputs.q1 === 'a' && (inputs.q2 === 'a' || inputs.q2 === 'b');

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: 'generateur-mention-tva' });
    if (verdict) params.set('regime', SLUG_BY_VERDICT[verdict]);
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
            <CardTitle>Votre situation en 4 questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <QuestionBlock
              number={1}
              question="Type de client :"
              options={[
                { value: 'a', label: 'Particulier (maître d’ouvrage final)' },
                {
                  value: 'b',
                  label: 'Entreprise du BTP (donneur d’ordre — sous-traitance)',
                },
                { value: 'c', label: 'Entreprise (autre que BTP, B2B classique)' },
                { value: 'd', label: 'Bailleur social / collectivité publique' },
              ]}
              value={inputs.q1}
              onChange={(v) => update('q1', v as Q1)}
              name="q1"
            />

            <QuestionBlock
              number={2}
              question="Vous facturez :"
              options={[
                { value: 'a', label: 'Travaux d’amélioration / rénovation / entretien' },
                {
                  value: 'b',
                  label:
                    'Travaux d’amélioration énergétique éligibles MaPrimeRénov / CEE (isolation, PAC, chaudière biomasse…)',
                },
                {
                  value: 'c',
                  label: 'Travaux neufs (construction / extension > 10 % surface ou > 25 % bâti)',
                },
                { value: 'd', label: 'Démolition' },
                {
                  value: 'e',
                  label: 'Location matériel / prestations intellectuelles (BE, étude)',
                },
              ]}
              value={inputs.q2}
              onChange={(v) => update('q2', v as Q2)}
              name="q2"
            />

            {showQ3 && (
              <QuestionBlock
                number={3}
                question="Bien immobilier concerné :"
                options={[
                  {
                    value: 'a',
                    label: 'Logement achevé depuis + de 2 ans (résidence principale ou secondaire)',
                  },
                  { value: 'b', label: 'Logement < 2 ans ou en construction' },
                  { value: 'c', label: 'Local professionnel / commercial' },
                ]}
                value={inputs.q3}
                onChange={(v) => update('q3', v as Q3)}
                name="q3"
              />
            )}

            <QuestionBlock
              number={4}
              question="Régime TVA de votre entreprise :"
              options={[
                { value: 'a', label: 'Régime réel normal (CA3) — vous collectez la TVA' },
                {
                  value: 'b',
                  label:
                    'Franchise en base (CA HT < 39 100 € prestations ou < 101 000 € travaux en 2026)',
                },
              ]}
              value={inputs.q4}
              onChange={(v) => update('q4', v as Q4)}
              name="q4"
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
                  {showQ3
                    ? 'Répondez aux 4 questions pour obtenir votre verdict.'
                    : 'Répondez aux questions 1, 2 et 4 pour obtenir votre verdict.'}
                </div>
              ) : (
                <VerdictPanel
                  verdict={verdict}
                  montantHT={inputs.montantHT}
                  onCopy={handleCopy}
                  copied={copied}
                />
              )}

              <p className="text-xs text-gray-500">
                Cet outil donne une indication fiscale fiable dans les cas standards. Vérifiez le
                régime applicable avec votre expert-comptable, surtout pour des cas complexes (LMNP,
                bail commercial mixte, SCI, etc.).
              </p>

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

interface VerdictStyle {
  border: string;
  bg: string;
  text: string;
  rate: string;
  icon: typeof Info;
  title: string;
  blurb: string;
  legalRef: string;
  testId: string;
  taux: number | null; // null = no TVA computed (autoliq, franchise)
  tauxLabel: string;
  needsAttestation: boolean;
}

const VERDICT_STYLES: Record<Verdict, VerdictStyle> = {
  'tva-20': {
    border: 'border-blue-300',
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    rate: '20 %',
    icon: Info,
    title: 'TVA au taux normal de 20 %',
    blurb:
      'Vous appliquez le taux normal de TVA. Il couvre les travaux neufs, la location de matériel, les prestations intellectuelles et les chantiers sur local professionnel.',
    legalRef: 'Article 278 du CGI — taux normal de TVA.',
    testId: 'verdict-tva-20',
    taux: 20,
    tauxLabel: '20 %',
    needsAttestation: false,
  },
  'tva-10': {
    border: 'border-indigo-300',
    bg: 'bg-indigo-50',
    text: 'text-indigo-800',
    rate: '10 %',
    icon: Info,
    title: 'TVA au taux intermédiaire de 10 %',
    blurb:
      "Travaux d'amélioration, de transformation, d'aménagement ou d'entretien sur un logement de plus de 2 ans. L'attestation TVA (CERFA 1300 ou 1301) signée par le client est obligatoire et à conserver 5 ans.",
    legalRef: 'Article 279-0 bis du CGI — taux intermédiaire BTP rénovation.',
    testId: 'verdict-tva-10',
    taux: 10,
    tauxLabel: '10 %',
    needsAttestation: true,
  },
  'tva-5-5': {
    border: 'border-emerald-300',
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    rate: '5,5 %',
    icon: CheckCircle,
    title: 'TVA au taux réduit de 5,5 %',
    blurb:
      "Travaux d'amélioration de la qualité énergétique sur un logement de plus de 2 ans : isolation thermique, PAC, chaudière biomasse, VMC double flux. Les équipements doivent respecter les caractéristiques de l'arrêté du 30 décembre 2019.",
    legalRef: 'Article 278-0 bis A du CGI — taux réduit performance énergétique.',
    testId: 'verdict-tva-5-5',
    taux: 5.5,
    tauxLabel: '5,5 %',
    needsAttestation: true,
  },
  autoliquidation: {
    border: 'border-amber-300',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    rate: '0 %',
    icon: FileSignature,
    title: 'Autoliquidation — sous-traitance BTP',
    blurb:
      "Vous facturez un donneur d'ordre du BTP : facture en HT seul, sans TVA. C'est lui qui collecte et déduit la TVA sur sa CA3. Omission de la mention = amende de 5 % du montant facturé (art. 1737 CGI).",
    legalRef: 'Article 283-2 nonies du CGI — autoliquidation sous-traitance BTP.',
    testId: 'verdict-autoliquidation',
    taux: 0,
    tauxLabel: '0 % (autoliq.)',
    needsAttestation: false,
  },
  franchise: {
    border: 'border-rose-300',
    bg: 'bg-rose-50',
    text: 'text-rose-800',
    rate: 'Pas de TVA',
    icon: TrendingDown,
    title: 'Franchise en base — pas de TVA',
    blurb:
      "Votre entreprise est en franchise en base : aucune TVA collectée quel que soit le client ou le type de travaux. Pas de déduction non plus sur vos propres achats. Surveillez le franchissement des seuils en cours d'année.",
    legalRef: 'Article 293 B du CGI — franchise en base. Plafonds 2026 : 39 100 € / 101 000 €.',
    testId: 'verdict-franchise',
    taux: 0,
    tauxLabel: '0 % (franchise)',
    needsAttestation: false,
  },
};

function VerdictPanel({
  verdict,
  montantHT,
  onCopy,
  copied,
}: {
  verdict: Verdict;
  montantHT: number;
  onCopy: (text: string) => void;
  copied: boolean;
}) {
  const style = VERDICT_STYLES[verdict];
  const Icon = style.icon;
  const mention = MENTION_BY_VERDICT[verdict];
  const tvaEuros = montantHT > 0 && style.taux !== null ? (montantHT * style.taux) / 100 : 0;
  const ttc = montantHT + tvaEuros;

  return (
    <div className="space-y-4">
      <div
        className={`flex items-start gap-3 rounded-lg border p-4 ${style.border} ${style.bg} ${style.text}`}
        role="status"
        data-testid={style.testId}
      >
        <Icon className="mt-0.5 h-6 w-6 flex-shrink-0" />
        <div>
          <p className="text-base font-semibold">{style.title}</p>
          <p className="mt-1 text-sm leading-relaxed opacity-90">{style.blurb}</p>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-3 text-sm">
        <p className="text-xs uppercase tracking-wider text-gray-500">Taux applicable</p>
        <p className="mt-1 text-2xl font-bold text-gray-900">{style.rate}</p>
        <p className="mt-1 text-xs leading-relaxed text-gray-600">{style.legalRef}</p>
      </div>

      <MentionBlock
        label={
          verdict === 'tva-20' ? 'Mention sur la facture' : 'Mention obligatoire à recopier'
        }
        mention={mention}
        onCopy={onCopy}
        copied={copied}
      />

      {style.needsAttestation && (
        <div className="rounded-lg border border-indigo-200 bg-indigo-50/60 p-3 text-xs leading-relaxed text-indigo-900">
          <p className="font-semibold">Attestation TVA obligatoire</p>
          <p className="mt-1 opacity-90">
            Le client particulier doit remplir et signer le formulaire CERFA n° 1300-SD (travaux
            &lt; 300 € TTC) ou CERFA n° 1301-SD (au-delà) avant la facturation. À conserver 5 ans
            avec la copie de la facture. Sans attestation, l’administration redresse l’entreprise
            sur le différentiel de TVA en cas de contrôle.
          </p>
        </div>
      )}

      {montantHT > 0 && (
        <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
          <Row label="Montant HT" value={fmtEuro(montantHT)} />
          <Row label={`TVA (${style.tauxLabel})`} value={fmtEuro(tvaEuros)} />
          <Row label="Total TTC" value={fmtEuro(ttc)} />
        </div>
      )}
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
