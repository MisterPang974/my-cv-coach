import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wand2, Copy, Check, Plus, Trash2, BookOpen, ChevronDown, ChevronUp, ArrowRight, Square, Circle } from "lucide-react";

// Verbes d'action par domaine (Annexe 4 - Evolution Pro)
const verbesAction: Record<string, string[]> = {
  "Administratif": ["Acheter", "Agencer", "Archiver", "Cataloguer", "Centraliser", "Classifier", "Commander", "Compiler", "Constituer", "Contrôler", "Documenter", "Effectuer", "Élaborer", "Enregistrer", "Envoyer", "Inspecter", "Inventorier", "Mettre en œuvre", "Organiser", "Présenter"],
  "Financier": ["Administrer", "Analyser", "Anticiper", "Auditer", "Budgétiser", "Calculer", "Chiffrer", "Commercialiser", "Consolider", "Engager", "Équilibrer", "Estimer", "Évaluer", "Gérer", "Planifier", "Prévoir", "Réguler", "Vérifier"],
  "Gestion": ["Affecter", "Améliorer", "Analyser", "Anticiper", "Auditer", "Augmenter", "Centraliser", "Concevoir", "Coordonner", "Décider", "Déléguer", "Diriger", "Élaborer", "Engager", "Établir", "Évaluer", "Générer", "Optimiser", "Piloter"],
  "Service & Conseil": ["Accueillir", "Aider", "Arranger", "Changer", "Clarifier", "Commander", "Conseiller", "Démontrer", "Diagnostiquer", "Écouter", "Éduquer", "Évaluer", "Expliquer", "Faciliter", "Guider", "Intervenir", "Livrer", "Optimiser", "Préparer", "Présenter"],
  "Communication": ["Activer", "Animer", "Comprendre", "Consolider", "Correspondre", "Créer", "Développer", "Écrire", "Exposer", "Exprimer", "Formuler", "Identifier", "Influencer", "Interpréter", "Lancer", "Négocier", "Persuader", "Promouvoir", "Publier", "Recruter"],
};

// 10 Commandements du CV Créatif (MON CV CREATIF BON)
const commandements = [
  "Avant de rédiger ton CV, un bilan de compétences tu feras.",
  "Avec précision ton projet professionnel (fonction, secteur, lieu) tu définiras.",
  "La finalité du CV (décrocher des entretiens) jamais tu n'oublieras.",
  "Les 4C (Créativité, Clarté, Cohérence, Commercial), tu respecteras.",
  "Grâce à la créativité, ton CV jamais on n'oubliera.",
  "Au recruteur, ton parcours cohérent semblera.",
  "Au recruteur, ton CV toujours clair apparaîtra.",
  "De chaque point de ton CV, un atout tu feras.",
  "Les avis et conseils de tous, tu écouteras.",
  "Les chiffres tu regarderas, les résultats tu chercheras.",
];

// Bullet type mapping: action = arrow, technique = square, relationnel = circle
type BulletType = "action" | "technique" | "relationnel";

interface Transformation {
  text: string;
  bullet: BulletType;
}

// Mapping tâches → compétences percutantes (style télégraphique, pas de "Je")
const transformations: Record<string, Transformation[]> = {
  "nettoyage": [
    { text: "Application rigoureuse des normes d'hygiène et de propreté", bullet: "technique" },
    { text: "Maîtrise des protocoles de nettoyage et désinfection", bullet: "technique" },
    { text: "Respect des standards sanitaires en environnement professionnel", bullet: "action" },
  ],
  "ménage": [
    { text: "Entretien méthodique des espaces professionnels", bullet: "action" },
    { text: "Application des normes d'hygiène et de salubrité", bullet: "technique" },
    { text: "Gestion autonome de l'entretien multi-surfaces", bullet: "action" },
  ],
  "caisse": [
    { text: "Gestion de caisse et encaissement multicanal", bullet: "action" },
    { text: "Traitement rigoureux des transactions financières", bullet: "technique" },
    { text: "Maîtrise des outils d'encaissement et clôture de caisse", bullet: "technique" },
  ],
  "vente": [
    { text: "Conseil client personnalisé et fidélisation", bullet: "relationnel" },
    { text: "Développement du chiffre d'affaires par la vente additionnelle", bullet: "action" },
    { text: "Analyse des besoins clients et proposition de solutions adaptées", bullet: "relationnel" },
  ],
  "accueil": [
    { text: "Prise en charge professionnelle et orientation des visiteurs", bullet: "relationnel" },
    { text: "Gestion du standard téléphonique et traitement des demandes", bullet: "action" },
    { text: "Première interface de l'image de marque de l'entreprise", bullet: "relationnel" },
  ],
  "cuisine": [
    { text: "Préparation culinaire dans le respect des normes HACCP", bullet: "technique" },
    { text: "Élaboration de menus et gestion des approvisionnements", bullet: "action" },
    { text: "Maîtrise des techniques culinaires et mise en place", bullet: "technique" },
  ],
  "livraison": [
    { text: "Gestion logistique de tournées et livraison en temps réel", bullet: "action" },
    { text: "Optimisation des itinéraires et respect des délais", bullet: "technique" },
    { text: "Relation client terrain et gestion des réclamations", bullet: "relationnel" },
  ],
  "manutention": [
    { text: "Opérations de chargement/déchargement conformes aux règles de sécurité", bullet: "technique" },
    { text: "Conduite d'engins de manutention (CACES)", bullet: "technique" },
    { text: "Gestion des flux de marchandises en entrepôt", bullet: "action" },
  ],
  "secrétariat": [
    { text: "Gestion administrative et organisation de l'agenda direction", bullet: "action" },
    { text: "Rédaction de courriers professionnels et comptes-rendus", bullet: "technique" },
    { text: "Coordination des flux d'information internes et externes", bullet: "relationnel" },
  ],
  "informatique": [
    { text: "Administration et maintenance du parc informatique", bullet: "technique" },
    { text: "Support technique utilisateur (niveaux 1 et 2)", bullet: "relationnel" },
    { text: "Déploiement et configuration de solutions logicielles", bullet: "technique" },
  ],
  "management": [
    { text: "Encadrement et animation d'équipes pluridisciplinaires", bullet: "relationnel" },
    { text: "Pilotage de la performance et suivi des indicateurs", bullet: "action" },
    { text: "Conduite du changement et développement des collaborateurs", bullet: "relationnel" },
  ],
  "communication": [
    { text: "Conception et déploiement de stratégies de communication", bullet: "action" },
    { text: "Gestion de l'image de marque sur les canaux digitaux et print", bullet: "technique" },
    { text: "Animation de communautés et relations presse", bullet: "relationnel" },
  ],
  "comptabilité": [
    { text: "Tenue de la comptabilité générale et analytique", bullet: "technique" },
    { text: "Établissement des déclarations fiscales et sociales", bullet: "technique" },
    { text: "Analyse financière et reporting à la direction", bullet: "action" },
  ],
  "logistique": [
    { text: "Pilotage de la supply chain et gestion des stocks", bullet: "action" },
    { text: "Optimisation des flux logistiques et réduction des coûts", bullet: "technique" },
    { text: "Coordination des transporteurs et planification des expéditions", bullet: "action" },
  ],
  "service": [
    { text: "Service en salle selon les standards de l'établissement", bullet: "action" },
    { text: "Maîtrise des techniques de mise en place et de découpe", bullet: "technique" },
    { text: "Conseil œnologique et gastronomique personnalisé", bullet: "relationnel" },
  ],
  "garde d'enfants": [
    { text: "Prise en charge éducative et sécuritaire d'enfants", bullet: "relationnel" },
    { text: "Animation d'activités d'éveil adaptées par tranche d'âge", bullet: "action" },
    { text: "Communication bienveillante avec les familles", bullet: "relationnel" },
  ],
};

const atouts = [
  "Ponctualité et assiduité",
  "Réactivité face aux imprévus",
  "Respect des consignes de sécurité",
  "Autonomie et prise d'initiative",
  "Travail en équipe et adaptabilité",
  "Rigueur et sens de l'organisation",
];

const findSuggestions = (input: string): Transformation[] => {
  const lower = input.toLowerCase().trim();
  if (!lower) return [];
  if (transformations[lower]) return transformations[lower];
  for (const [key, values] of Object.entries(transformations)) {
    if (key.includes(lower) || lower.includes(key)) return values;
  }
  if (lower.length > 2) {
    return [
      { text: `Maîtrise opérationnelle en ${lower}`, bullet: "technique" },
      { text: `Expertise technique dans le domaine du/de la ${lower}`, bullet: "technique" },
      { text: `Application des bonnes pratiques professionnelles en ${lower}`, bullet: "action" },
    ];
  }
  return [];
};

const BulletIcon = ({ type, className }: { type: BulletType; className?: string }) => {
  switch (type) {
    case "action": return <ArrowRight className={className} />;
    case "technique": return <Square className={className} />;
    case "relationnel": return <Circle className={className} />;
  }
};

const bulletLabel: Record<BulletType, string> = {
  action: "Action",
  technique: "Technique",
  relationnel: "Relationnel",
};

interface CvEntry {
  id: number;
  input: string;
  selected: string;
  bullet: BulletType;
}

const CvGenerator = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Transformation[]>([]);
  const [entries, setEntries] = useState<CvEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [searching, setSearching] = useState(false);
  const [showCommandements, setShowCommandements] = useState(false);
  const [showVerbes, setShowVerbes] = useState(false);
  const [showAtouts, setShowAtouts] = useState(false);

  const handleTransform = () => {
    if (!input.trim()) return;
    setSearching(true);
    setTimeout(() => {
      setSuggestions(findSuggestions(input));
      setSearching(false);
    }, 400);
  };

  const addEntry = (t: Transformation) => {
    setEntries((prev) => [...prev, { id: Date.now(), input, selected: t.text, bullet: t.bullet }]);
    setInput("");
    setSuggestions([]);
  };

  const addAtout = (text: string) => {
    setEntries((prev) => [...prev, { id: Date.now(), input: "Atout", selected: text, bullet: "action" }]);
  };

  const removeEntry = (id: number) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const copyAll = () => {
    const symbols: Record<BulletType, string> = { action: "→", technique: "■", relationnel: "●" };
    const text = entries.map((e) => `${symbols[e.bullet]} ${e.selected}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="animate-fade-up mb-12">
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
                Méthode Fred · Générateur intelligent
              </p>
              <h1 className="text-3xl md:text-4xl tracking-tight mb-4">
                Transformez vos tâches en compétences
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Style télégraphique, verbes d'action, résultats chiffrés.
                Jamais de « Je… » — toujours des preuves.
              </p>
            </div>

            {/* Bullet legend */}
            <div className="animate-fade-up mb-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><ArrowRight className="w-3.5 h-3.5 text-accent" /> Action</span>
              <span className="inline-flex items-center gap-1.5"><Square className="w-3.5 h-3.5 text-primary" /> Technique</span>
              <span className="inline-flex items-center gap-1.5"><Circle className="w-3.5 h-3.5 text-accent" /> Relationnel</span>
            </div>

            {/* 10 Commandements */}
            <div className="animate-fade-up-delay-1 mb-4">
              <button
                onClick={() => setShowCommandements(!showCommandements)}
                className="w-full flex items-center justify-between rounded-xl bg-primary/5 border border-primary/20 p-4 text-left hover:bg-primary/10 transition-colors active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-sm">Les 10 Commandements du CV Créatif</span>
                </div>
                {showCommandements ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              {showCommandements && (
                <div className="mt-2 rounded-xl bg-card p-5 shadow-sm">
                  <ol className="space-y-2">
                    {commandements.map((c, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="text-accent font-bold flex-shrink-0">{i + 1}.</span>
                        <span className="text-muted-foreground">{c}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Verbes d'action */}
            <div className="animate-fade-up-delay-1 mb-4">
              <button
                onClick={() => setShowVerbes(!showVerbes)}
                className="w-full flex items-center justify-between rounded-xl bg-secondary border border-border p-4 text-left hover:bg-secondary/80 transition-colors active:scale-[0.99]"
              >
                <span className="font-semibold text-sm">📋 Verbes d'action par domaine</span>
                {showVerbes ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              {showVerbes && (
                <div className="mt-2 rounded-xl bg-card p-5 shadow-sm space-y-4">
                  {Object.entries(verbesAction).map(([domain, verbes]) => (
                    <div key={domain}>
                      <h4 className="text-sm font-semibold text-primary mb-1">{domain}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{verbes.join(" · ")}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Atouts */}
            <div className="animate-fade-up-delay-1 mb-8">
              <button
                onClick={() => setShowAtouts(!showAtouts)}
                className="w-full flex items-center justify-between rounded-xl bg-accent/5 border border-accent/20 p-4 text-left hover:bg-accent/10 transition-colors active:scale-[0.99]"
              >
                <span className="font-semibold text-sm">⭐ Atouts clés à valoriser</span>
                {showAtouts ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              {showAtouts && (
                <div className="mt-2 rounded-xl bg-card p-5 shadow-sm">
                  <div className="grid sm:grid-cols-2 gap-2">
                    {atouts.map((a) => (
                      <button
                        key={a}
                        onClick={() => addAtout(a)}
                        className="text-left rounded-lg border border-border bg-background p-3 text-sm hover:bg-secondary hover:shadow-sm transition-[background,box-shadow] active:scale-[0.98] group flex items-center gap-2"
                      >
                        <Plus className="w-3.5 h-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="animate-fade-up-delay-2 bg-card rounded-xl p-6 shadow-sm mb-8">
              <label className="text-sm font-medium mb-2 block">
                Décrivez une tâche ou un domaine
              </label>
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTransform()}
                  placeholder="Ex : nettoyage, vente, management, cuisine…"
                  className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={handleTransform}
                  disabled={!input.trim() || searching}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-accent-foreground font-medium shadow-sm hover:shadow-md transition-[box-shadow,opacity] disabled:opacity-40 active:scale-[0.97]"
                >
                  <Wand2 className={`w-4 h-4 ${searching ? "animate-spin" : ""}`} />
                  Transformer
                </button>
              </div>

              {suggestions.length > 0 && (
                <div className="mt-6 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Suggestions pour « <span className="font-medium text-foreground">{input}</span> » :
                  </p>
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => addEntry(s)}
                      className="w-full text-left rounded-lg border border-border bg-background p-4 hover:bg-secondary hover:shadow-sm transition-[background,box-shadow] active:scale-[0.98] group"
                    >
                      <div className="flex items-start gap-3">
                        <BulletIcon type={s.bullet} className={`w-4 h-4 mt-0.5 flex-shrink-0 ${s.bullet === "technique" ? "text-primary" : "text-accent"}`} />
                        <div>
                          <span className="text-sm leading-relaxed">{s.text}</span>
                          <span className="ml-2 text-[10px] uppercase tracking-wider text-muted-foreground">{bulletLabel[s.bullet]}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected entries */}
            {entries.length > 0 && (
              <div className="animate-fade-up bg-card rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold font-sans">
                    Mes compétences ({entries.length})
                  </h3>
                  <button
                    onClick={copyAll}
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline active:scale-[0.97]"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copié !" : "Tout copier"}
                  </button>
                </div>
                <div className="space-y-2">
                  {entries.map((entry) => (
                    <div key={entry.id} className="flex items-start gap-3 rounded-lg bg-background p-4 group">
                      <BulletIcon type={entry.bullet} className={`w-4 h-4 mt-0.5 flex-shrink-0 ${entry.bullet === "technique" ? "text-primary" : "text-accent"}`} />
                      <div className="flex-1">
                        <p className="text-sm">{entry.selected}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Source : « {entry.input} » · <span className="uppercase text-[10px] tracking-wider">{bulletLabel[entry.bullet]}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => removeEntry(entry.id)}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CvGenerator;
