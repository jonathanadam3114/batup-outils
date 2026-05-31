import { useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Button } from './ui';
import { StickyResultBar } from './StickyResultBar';

type DocType = 'facture' | 'devis';

type Category =
  | 'identification'
  | 'client'
  | 'prestations'
  | 'paiement'
  | 'btp';

interface ChecklistItem {
  id: string;
  label: string;
  legalRef: string;
  risk: string;
  category: Category;
}

const CATEGORY_LABEL: Record<Category, string> = {
  identification: 'Identification de l’entreprise',
  client: 'Identification du client',
  prestations: 'Détail des prestations',
  paiement: 'Modalités de paiement',
  btp: 'Mentions BTP-spécifiques',
};

const DEVIS_ITEMS: ChecklistItem[] = [
  // Identification entreprise
  {
    id: 'd-num',
    label: 'Numéro de devis unique',
    legalRef: 'CGI art. 242 nonies A',
    risk: 'Comptabilité non probante, taxation d’office possible.',
    category: 'identification',
  },
  {
    id: 'd-date',
    label: 'Date d’établissement du devis',
    legalRef: 'Code conso art. L 111-1',
    risk: 'Durée de validité non opposable, contestation client facile.',
    category: 'identification',
  },
  {
    id: 'd-raison',
    label: 'Nom et adresse de l’entreprise (raison sociale)',
    legalRef: 'Décret 2017-1166',
    risk: 'Document non identifiant, amende DGCCRF jusqu’à 15 000 €.',
    category: 'identification',
  },
  {
    id: 'd-siret',
    label: 'SIRET de l’entreprise',
    legalRef: 'Code commerce L 441-9',
    risk: 'Amende administrative jusqu’à 75 000 € (PP) / 2 000 000 € (PM) — doublée en cas de récidive.',
    category: 'identification',
  },
  {
    id: 'd-forme',
    label: 'Forme juridique + capital social (si société)',
    legalRef: 'Code commerce R 123-237',
    risk: 'Amende pénale jusqu’à 750 €, contestation de la personnalité morale.',
    category: 'identification',
  },
  {
    id: 'd-rcs',
    label: 'Numéro RCS (commerçant) ou RM (artisan)',
    legalRef: 'Décret 84-406',
    risk: 'Amende pénale jusqu’à 750 € + nullité commerciale potentielle.',
    category: 'identification',
  },
  {
    id: 'd-ape',
    label: 'Code APE / NAF',
    legalRef: 'Décret 73-314',
    risk: 'Amende administrative, document non traçable INSEE.',
    category: 'identification',
  },
  {
    id: 'd-tva',
    label: 'Numéro de TVA intracommunautaire (si assujetti)',
    legalRef: 'CGI art. 242 nonies A',
    risk: 'Rejet de la déduction TVA côté client, redressement possible.',
    category: 'identification',
  },
  // Client
  {
    id: 'd-client',
    label: 'Nom et adresse du client',
    legalRef: 'Code conso art. L 111-1',
    risk: 'Devis non opposable, impossible de prouver l’accord du client.',
    category: 'client',
  },
  // Prestations
  {
    id: 'd-descr',
    label: 'Description détaillée des travaux (matériaux, quantités, prix unitaire)',
    legalRef: 'Décret 2017-1166',
    risk: 'Devis non conforme particulier, amende DGCCRF jusqu’à 15 000 €.',
    category: 'prestations',
  },
  {
    id: 'd-mo-mat',
    label: 'Décompte main d’œuvre / matériaux',
    legalRef: 'Code conso art. L 111-1',
    risk: 'Pratique commerciale trompeuse, sanction DGCCRF.',
    category: 'prestations',
  },
  // Paiement
  {
    id: 'd-validite',
    label: 'Durée de validité du devis',
    legalRef: 'Code civil art. 1114',
    risk: 'Engagement de l’entreprise sans limite de temps, risque commercial.',
    category: 'paiement',
  },
  {
    id: 'd-delai',
    label: 'Délai d’exécution prévisionnel',
    legalRef: 'Code conso art. L 216-1',
    risk: 'Droit de rétractation client renforcé, résolution facile du contrat.',
    category: 'paiement',
  },
  {
    id: 'd-modal',
    label: 'Modalités de paiement (acompte, échelonnement)',
    legalRef: 'Code commerce L 441-10',
    risk: 'Application des délais légaux par défaut (30 jours), trésorerie tendue.',
    category: 'paiement',
  },
  {
    id: 'd-gratuit',
    label: 'Mention « Devis gratuit » ou prix du devis si payant',
    legalRef: 'Arrêté 2 mars 1990',
    risk: 'Devis payant non opposable, impossibilité de facturer son établissement.',
    category: 'paiement',
  },
  {
    id: 'd-signature',
    label: 'Signature du client précédée de « Bon pour accord/travaux »',
    legalRef: 'Code civil art. 1366',
    risk: 'Devis non contractuel, impossible de réclamer le paiement en cas de litige.',
    category: 'paiement',
  },
  // BTP-spécifiques
  {
    id: 'd-decennale',
    label: 'Assurance décennale : assureur + n° contrat + couverture géographique',
    legalRef: 'Loi Spinetta — C. assurances art. L 241-1 ; sanction C. conso art. L 132-2',
    risk: "Mention obligatoire (loi Spinetta, art. L 241-1 C. ass.) ; absence sur le document = pratique commerciale trompeuse art. L 132-2 C. conso (amende 300 000 € PP / 1,5 M€ PM ou 10 % du CA). Défaut de souscription elle-même : art. L 243-3 C. ass. (75 000 € + 6 mois).",
    category: 'btp',
  },
  {
    id: 'd-garanties',
    label: 'Mentions garanties légales (parfait achèvement, biennale, décennale)',
    legalRef: 'Code civil art. 1792 et suivants',
    risk: 'Vice du consentement, nullité du contrat à la demande du client.',
    category: 'btp',
  },
  {
    id: 'd-mediateur',
    label: 'Médiateur de la consommation (si client particulier)',
    legalRef: 'Code conso art. L 612-1',
    risk: 'Amende administrative jusqu’à 3 000 € (PP) / 15 000 € (PM).',
    category: 'btp',
  },
  {
    id: 'd-labels',
    label: 'Labels / certifications (RGE, Qualibat) si applicable',
    legalRef: 'Décret 2014-812',
    risk: 'Perte de l’éligibilité aides de l’État (MaPrimeRénov’, CEE).',
    category: 'btp',
  },
];

const FACTURE_ITEMS: ChecklistItem[] = [
  // Identification entreprise
  {
    id: 'f-num',
    label: 'Numéro de facture séquentiel (sans rupture)',
    legalRef: 'CGI art. 242 nonies A',
    risk: 'Comptabilité rejetée, taxation d’office, amende 15 € par facture.',
    category: 'identification',
  },
  {
    id: 'f-date',
    label: 'Date d’émission de la facture',
    legalRef: 'CGI art. 289',
    risk: 'Exigibilité TVA non datable, redressement fiscal.',
    category: 'identification',
  },
  {
    id: 'f-date-vente',
    label: 'Date de la vente / prestation (si différente)',
    legalRef: 'CGI art. 289',
    risk: 'Exigibilité TVA contestable, rejet déduction client.',
    category: 'identification',
  },
  {
    id: 'f-raison',
    label: 'Nom et adresse de l’entreprise (raison sociale)',
    legalRef: 'Code commerce L 441-9',
    risk: 'Amende administrative jusqu’à 75 000 € (PP) / 2 000 000 € (PM) — doublée en cas de récidive.',
    category: 'identification',
  },
  {
    id: 'f-siret',
    label: 'SIRET',
    legalRef: 'Code commerce L 441-9',
    risk: 'Amende administrative jusqu’à 75 000 € (PP) / 2 000 000 € (PM) — doublée en cas de récidive.',
    category: 'identification',
  },
  {
    id: 'f-forme',
    label: 'Forme juridique + capital (si société)',
    legalRef: 'Code commerce R 123-237',
    risk: 'Amende pénale jusqu’à 750 €.',
    category: 'identification',
  },
  {
    id: 'f-rcs',
    label: 'Numéro RCS / RM',
    legalRef: 'Décret 84-406',
    risk: 'Amende pénale jusqu’à 750 €.',
    category: 'identification',
  },
  {
    id: 'f-ape',
    label: 'Code APE / NAF',
    legalRef: 'Décret 73-314',
    risk: 'Amende administrative, traçabilité INSEE impossible.',
    category: 'identification',
  },
  {
    id: 'f-tva',
    label: 'Numéro TVA intracommunautaire (si assujetti)',
    legalRef: 'CGI art. 242 nonies A',
    risk: 'Rejet de déduction TVA côté client, redressement TVA.',
    category: 'identification',
  },
  // Client
  {
    id: 'f-client',
    label: 'Nom et adresse du client',
    legalRef: 'CGI art. 242 nonies A',
    risk: 'Facture non probante, rejet déduction TVA client.',
    category: 'client',
  },
  {
    id: 'f-tva-client',
    label: 'Numéro TVA intra du client (si B2B)',
    legalRef: 'CGI art. 242 nonies A',
    risk: 'Rejet de la livraison intracommunautaire exonérée, TVA due.',
    category: 'client',
  },
  // Prestations
  {
    id: 'f-descr',
    label: 'Désignation détaillée des prestations (quantité, prix unitaire HT)',
    legalRef: 'CGI art. 242 nonies A',
    risk: 'Facture non probante, redressement TVA et IS.',
    category: 'prestations',
  },
  {
    id: 'f-totaux',
    label: 'Prix HT, taux TVA par ligne, montant TVA, prix TTC',
    legalRef: 'CGI art. 242 nonies A',
    risk: 'Amende de 15 € par mention manquante (CGI art. 1737).',
    category: 'prestations',
  },
  {
    id: 'f-reduc',
    label: 'Réduction de prix éventuelle (escompte, remise)',
    legalRef: 'CGI art. 242 nonies A',
    risk: 'Base TVA mal établie, redressement de la base imposable.',
    category: 'prestations',
  },
  // Paiement
  {
    id: 'f-echeance',
    label: 'Date d’échéance de paiement',
    legalRef: 'Code commerce L 441-9',
    risk: 'Délai légal de 30 jours imposé, trésorerie tendue.',
    category: 'paiement',
  },
  {
    id: 'f-escompte',
    label: 'Conditions d’escompte (ou mention « pas d’escompte »)',
    legalRef: 'Code commerce L 441-9',
    risk: 'Amende administrative jusqu’à 75 000 € (PP) / 2 000 000 € (PM).',
    category: 'paiement',
  },
  {
    id: 'f-penalites',
    label: 'Pénalités de retard (taux ≥ 3× intérêt légal)',
    legalRef: 'Code commerce L 441-10',
    risk: 'Amende jusqu’à 75 000 € (PP) / 2 000 000 € (PM), pénalités plafonnées au taux légal.',
    category: 'paiement',
  },
  {
    id: 'f-indemnite',
    label: 'Indemnité forfaitaire de recouvrement (40 €)',
    legalRef: 'Code commerce L 441-10 + Décret 2012-1115',
    risk: 'Amende jusqu’à 75 000 € (PP) / 2 000 000 € (PM).',
    category: 'paiement',
  },
  // BTP-spécifiques
  {
    id: 'f-mention-tva',
    label: 'Mention TVA (autoliquidation, taux réduit, franchise selon cas)',
    legalRef: 'CGI art. 283-2 nonies / art. 293 B ; sanction CGI art. 1737-II',
    risk: 'Amende de 15 € par mention manquante, plafonnée à 25 % du montant facturé (CGI art. 1737-II).',
    category: 'btp',
  },
  {
    id: 'f-decennale',
    label: 'Assurance décennale (assureur + n° contrat + couverture)',
    legalRef: 'Loi Spinetta — C. assurances art. L 241-1 ; sanction C. conso art. L 132-2',
    risk: "Mention obligatoire (loi Spinetta, art. L 241-1 C. ass.) ; absence sur le document = pratique commerciale trompeuse art. L 132-2 C. conso (amende 300 000 € PP / 1,5 M€ PM ou 10 % du CA). Défaut de souscription elle-même : art. L 243-3 C. ass. (75 000 € + 6 mois).",
    category: 'btp',
  },
  {
    id: 'f-garanties',
    label: 'Garanties légales applicables (parfait achèvement, biennale, décennale)',
    legalRef: 'Code civil art. 1792 et suivants',
    risk: 'Vice du consentement, contestation possible par le client.',
    category: 'btp',
  },
  {
    id: 'f-mediateur',
    label: 'Médiateur de la consommation (si client particulier)',
    legalRef: 'Code conso art. L 612-1',
    risk: 'Amende administrative jusqu’à 3 000 € (PP) / 15 000 € (PM).',
    category: 'btp',
  },
];

const CATEGORY_ORDER: Category[] = [
  'identification',
  'client',
  'prestations',
  'paiement',
  'btp',
];

export function MentionsObligatoiresChecker() {
  const [docType, setDocType] = useState<DocType>('facture');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const items = docType === 'facture' ? FACTURE_ITEMS : DEVIS_ITEMS;

  const groupedItems = useMemo(() => {
    const groups: Record<Category, ChecklistItem[]> = {
      identification: [],
      client: [],
      prestations: [],
      paiement: [],
      btp: [],
    };
    for (const item of items) groups[item.category].push(item);
    return groups;
  }, [items]);

  const missing = useMemo(
    () => items.filter((item) => !checked[item.id]),
    [items, checked],
  );

  const isCompliant = missing.length === 0;

  const switchDocType = (next: DocType) => {
    setDocType(next);
    setChecked({});
  };

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkAll = () => {
    const next: Record<string, boolean> = {};
    for (const item of items) next[item.id] = true;
    setChecked(next);
  };

  const reset = () => setChecked({});

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({
      source: 'verificateur-mentions-obligatoires',
      doc_type: docType,
      missing_count: String(missing.length),
    });
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [docType, missing.length]);

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>1. Quel document vérifier ?</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="grid grid-cols-2 gap-3"
              role="tablist"
              aria-label="Type de document"
            >
              <DocTypeButton
                active={docType === 'facture'}
                onClick={() => switchDocType('facture')}
                label="Facture"
                hint="CGI art. 242 nonies A"
              />
              <DocTypeButton
                active={docType === 'devis'}
                onClick={() => switchDocType('devis')}
                label="Devis"
                hint="Code conso art. L 111-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              2. Cochez les mentions présentes sur votre {docType}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={checkAll}
                className="rounded-full border border-gray-200 bg-white px-3 py-1 font-medium text-gray-700 transition hover:border-brand-500 hover:text-brand-500"
              >
                Tout cocher
              </button>
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-gray-200 bg-white px-3 py-1 font-medium text-gray-700 transition hover:border-brand-500 hover:text-brand-500"
              >
                Réinitialiser
              </button>
              <span className="ml-auto text-gray-500">
                {items.length - missing.length} / {items.length} cochées
              </span>
            </div>

            {CATEGORY_ORDER.map((cat) => {
              const catItems = groupedItems[cat];
              if (catItems.length === 0) return null;
              return (
                <fieldset key={cat} className="space-y-2">
                  <legend className="text-sm font-semibold text-gray-900">
                    {CATEGORY_LABEL[cat]}
                  </legend>
                  <div className="space-y-2">
                    {catItems.map((item) => {
                      const isChecked = !!checked[item.id];
                      const inputId = `${docType}-${item.id}`;
                      return (
                        <label
                          key={item.id}
                          htmlFor={inputId}
                          className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition ${
                            isChecked
                              ? 'border-emerald-300 bg-emerald-50 text-gray-900'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <input
                            id={inputId}
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggle(item.id)}
                            className="mt-0.5 h-4 w-4 cursor-pointer accent-emerald-500"
                          />
                          <span className="flex-1 leading-snug">
                            <span className="block font-medium text-gray-900">
                              {item.label}
                            </span>
                            <span className="mt-0.5 block text-xs text-gray-500">
                              {item.legalRef}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              );
            })}
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
              <VerdictPanel
                docType={docType}
                isCompliant={isCompliant}
                missing={missing}
                totalCount={items.length}
              />

              <div className="space-y-2 pt-2">
                <a href={ctaSignupHref} data-testid="cta-signup">
                  <Button className="h-11 w-full rounded-full">
                    Essayer Batup gratuitement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <p className="text-center text-xs text-gray-500">
                  Mentions légales pré-remplies sur chaque devis et facture.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <StickyResultBar
        label={`Conformité ${docType}`}
        value={
          isCompliant
            ? 'Conforme'
            : `${missing.length} mention${missing.length > 1 ? 's' : ''} manquante${missing.length > 1 ? 's' : ''}`
        }
        ctaHref={ctaSignupHref}
      />
    </div>
  );
}

function DocTypeButton({
  active,
  onClick,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-lg border p-3 text-left transition ${
        active
          ? 'border-brand-500 bg-brand-50 text-gray-900'
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
      }`}
    >
      <span className="block text-sm font-semibold">{label}</span>
      <span className="mt-0.5 block text-xs text-gray-500">{hint}</span>
    </button>
  );
}

function VerdictPanel({
  docType,
  isCompliant,
  missing,
  totalCount,
}: {
  docType: DocType;
  isCompliant: boolean;
  missing: ChecklistItem[];
  totalCount: number;
}) {
  if (totalCount === 0) return null;

  if (isCompliant) {
    return (
      <div className="space-y-4">
        <div
          className="flex items-start gap-3 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-emerald-800"
          role="status"
          data-testid="verdict-compliant"
        >
          <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0" />
          <div>
            <p className="text-base font-semibold">
              Votre {docType} est conforme
            </p>
            <p className="mt-1 text-sm leading-relaxed opacity-90">
              Toutes les mentions obligatoires sont présentes. Aucun risque
              d’amende DGCCRF ou de redressement TVA sur ce point.
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Rappel : la conformité doit être maintenue sur chaque document
          émis. Une seule facture non conforme peut déclencher un contrôle.
        </p>
      </div>
    );
  }

  const isCritical = missing.length >= 5;

  return (
    <div className="space-y-4">
      <div
        className={`flex items-start gap-3 rounded-lg border p-4 ${
          isCritical
            ? 'border-rose-300 bg-rose-50 text-rose-800'
            : 'border-amber-300 bg-amber-50 text-amber-800'
        }`}
        role="status"
        data-testid="verdict-missing"
      >
        {isCritical ? (
          <XCircle className="mt-0.5 h-6 w-6 flex-shrink-0" />
        ) : (
          <AlertCircle className="mt-0.5 h-6 w-6 flex-shrink-0" />
        )}
        <div>
          <p className="text-base font-semibold">
            {missing.length} mention{missing.length > 1 ? 's' : ''} manquante
            {missing.length > 1 ? 's' : ''} sur votre {docType}
          </p>
          <p className="mt-1 text-sm leading-relaxed opacity-90">
            {isCritical
              ? 'Votre document expose votre entreprise à des sanctions cumulables. Corrigez avant émission.'
              : 'Quelques ajustements suffisent à rendre votre document conforme.'}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          À corriger
        </p>
        <ul className="space-y-2">
          {missing.map((item) => (
            <li
              key={item.id}
              className="rounded-lg border border-gray-200 bg-white p-3 text-sm"
            >
              <p className="font-semibold text-gray-900">{item.label}</p>
              <p className="mt-1 text-xs text-gray-500">{item.legalRef}</p>
              <p className="mt-1 text-xs leading-relaxed text-rose-700">
                Risque : {item.risk}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
