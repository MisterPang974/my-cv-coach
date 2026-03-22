import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wand2, Copy, Check, Plus, Trash2 } from "lucide-react";

// Mapping de phrases simples → compétences percutantes
const transformations: Record<string, string[]> = {
  "nettoyage": ["Application rigoureuse des normes d'hygiène et de propreté", "Maîtrise des protocoles de nettoyage et de désinfection", "Respect des standards sanitaires en environnement professionnel"],
  "ménage": ["Entretien méthodique des espaces professionnels", "Application des normes d'hygiène et de salubrité", "Gestion autonome de l'entretien de locaux multi-surfaces"],
  "caisse": ["Gestion de la caisse et encaissement multicanal", "Traitement rigoureux des transactions financières", "Maîtrise des outils d'encaissement et de clôture de caisse"],
  "vente": ["Conseil client personnalisé et fidélisation", "Développement du chiffre d'affaires par la vente additionnelle", "Analyse des besoins clients et proposition de solutions adaptées"],
  "accueil": ["Prise en charge professionnelle et orientation des visiteurs", "Gestion du standard téléphonique et traitement des demandes", "Première interface de l'image de marque de l'entreprise"],
  "cuisine": ["Préparation culinaire dans le respect des normes HACCP", "Élaboration de menus et gestion des approvisionnements", "Maîtrise des techniques culinaires et de la mise en place"],
  "livraison": ["Gestion logistique de tournées et livraison en temps réel", "Optimisation des itinéraires et respect des délais", "Relation client terrain et gestion des réclamations"],
  "manutention": ["Opérations de chargement/déchargement conformes aux règles de sécurité", "Conduite d'engins de manutention (CACES)", "Gestion des flux de marchandises en entrepôt"],
  "secrétariat": ["Gestion administrative et organisation de l'agenda direction", "Rédaction de courriers professionnels et comptes-rendus", "Coordination des flux d'information internes et externes"],
  "informatique": ["Administration et maintenance du parc informatique", "Support technique utilisateur (niveaux 1 et 2)", "Déploiement et configuration de solutions logicielles"],
  "management": ["Encadrement et animation d'équipes pluridisciplinaires", "Pilotage de la performance et suivi des indicateurs", "Conduite du changement et développement des collaborateurs"],
  "communication": ["Conception et déploiement de stratégies de communication", "Gestion de l'image de marque sur les canaux digitaux et print", "Animation de communautés et relations presse"],
  "comptabilité": ["Tenue de la comptabilité générale et analytique", "Établissement des déclarations fiscales et sociales", "Analyse financière et reporting à la direction"],
  "logistique": ["Pilotage de la supply chain et gestion des stocks", "Optimisation des flux logistiques et réduction des coûts", "Coordination des transporteurs et planification des expéditions"],
  "jardinage": ["Entretien paysager et aménagement d'espaces verts", "Maîtrise des techniques de taille, tonte et plantation", "Application des normes phytosanitaires et développement durable"],
  "garde d'enfants": ["Prise en charge éducative et sécuritaire d'enfants", "Animation d'activités d'éveil adaptées à chaque tranche d'âge", "Communication bienveillante avec les familles"],
  "service": ["Service en salle selon les standards de l'établissement", "Maîtrise des techniques de mise en place et de découpe", "Conseil œnologique et gastronomique personnalisé"],
};

const findSuggestions = (input: string): string[] => {
  const lower = input.toLowerCase().trim();
  if (!lower) return [];

  // Exact match
  if (transformations[lower]) return transformations[lower];

  // Partial match
  for (const [key, values] of Object.entries(transformations)) {
    if (key.includes(lower) || lower.includes(key)) return values;
  }

  // Fallback: generate generic professional phrasing
  if (lower.length > 2) {
    return [
      `Maîtrise opérationnelle en ${lower}`,
      `Expertise technique dans le domaine du/de la ${lower}`,
      `Application des bonnes pratiques professionnelles en ${lower}`,
    ];
  }

  return [];
};

interface CvEntry {
  id: number;
  input: string;
  selected: string;
}

const CvGenerator = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [entries, setEntries] = useState<CvEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleTransform = () => {
    if (!input.trim()) return;
    setSearching(true);
    // Simulate a brief processing delay
    setTimeout(() => {
      setSuggestions(findSuggestions(input));
      setSearching(false);
    }, 400);
  };

  const addEntry = (text: string) => {
    setEntries((prev) => [...prev, { id: Date.now(), input, selected: text }]);
    setInput("");
    setSuggestions([]);
  };

  const removeEntry = (id: number) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const copyAll = () => {
    const text = entries.map((e) => `• ${e.selected}`).join("\n");
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
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                Générateur intelligent
              </p>
              <h1 className="text-3xl md:text-4xl tracking-tight mb-4">
                Transformez vos tâches en compétences
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Tapez une tâche simple et découvrez comment la formuler de manière
                percutante pour votre CV. Basé sur la Méthode Fred.
              </p>
            </div>

            {/* Input area */}
            <div className="animate-fade-up-delay-1 bg-card rounded-xl p-6 shadow-sm mb-8">
              <label className="text-sm font-medium mb-2 block">
                Décrivez une tâche ou un domaine
              </label>
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTransform()}
                  placeholder="Ex : nettoyage, vente, management, cuisine..."
                  className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={handleTransform}
                  disabled={!input.trim() || searching}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-primary-foreground font-medium shadow-sm hover:shadow-md transition-[box-shadow,opacity] disabled:opacity-40 active:scale-[0.97]"
                >
                  <Wand2 className={`w-4 h-4 ${searching ? "animate-spin" : ""}`} />
                  Transformer
                </button>
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="mt-6 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Suggestions pour « <span className="font-medium text-foreground">{input || "..."}</span> » :
                  </p>
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => addEntry(s)}
                      className="w-full text-left rounded-lg border border-border bg-background p-4 hover:bg-secondary hover:shadow-sm transition-[background,box-shadow] active:scale-[0.98] group"
                    >
                      <div className="flex items-start gap-3">
                        <Plus className="w-4 h-4 text-primary mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-sm leading-relaxed">{s}</span>
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
                    <div
                      key={entry.id}
                      className="flex items-start gap-3 rounded-lg bg-background p-4 group"
                    >
                      <span className="text-primary mt-0.5">•</span>
                      <div className="flex-1">
                        <p className="text-sm">{entry.selected}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Source : « {entry.input} »
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
