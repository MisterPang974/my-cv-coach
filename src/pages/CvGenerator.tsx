import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wand2, Copy, Check, Plus, Trash2, ArrowRight, Square, Circle, User, Briefcase, Mail, Phone, MapPin } from "lucide-react";

// Bullet types
type BulletType = "action" | "technique" | "relationnel";

interface Transformation {
  text: string;
  bullet: BulletType;
}

// Mapping tâches → compétences (Méthode Fred)
const transformations: Record<string, Transformation[]> = {
  "nettoyage": [
    { text: "Application rigoureuse des normes d'hygiène et de propreté", bullet: "technique" },
    { text: "Maîtrise des protocoles de nettoyage et désinfection", bullet: "technique" },
    { text: "Organisation autonome du poste de travail", bullet: "action" },
    { text: "Respect des standards sanitaires en environnement professionnel", bullet: "action" },
  ],
  "agent de nettoyage": [
    { text: "Application rigoureuse des normes d'hygiène et de propreté", bullet: "technique" },
    { text: "Organisation méthodique des interventions de nettoyage", bullet: "action" },
    { text: "Gestion autonome du matériel et des produits d'entretien", bullet: "technique" },
    { text: "Respect des plannings et des consignes de sécurité", bullet: "action" },
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
  "garde d'enfants": [
    { text: "Prise en charge éducative et sécuritaire d'enfants", bullet: "relationnel" },
    { text: "Animation d'activités d'éveil adaptées par tranche d'âge", bullet: "action" },
    { text: "Communication bienveillante avec les familles", bullet: "relationnel" },
  ],
  "restauration": [
    { text: "Service en salle selon les standards de l'établissement", bullet: "action" },
    { text: "Maîtrise des techniques de mise en place et de découpe", bullet: "technique" },
    { text: "Conseil gastronomique personnalisé auprès de la clientèle", bullet: "relationnel" },
  ],
  "sécurité": [
    { text: "Surveillance et protection des biens et des personnes", bullet: "action" },
    { text: "Application des procédures de sécurité et gestion des incidents", bullet: "technique" },
    { text: "Rédaction de rapports d'intervention et main courante", bullet: "technique" },
  ],
  "btp": [
    { text: "Réalisation de travaux de construction selon les normes en vigueur", bullet: "technique" },
    { text: "Lecture et interprétation de plans techniques", bullet: "technique" },
    { text: "Respect des consignes de sécurité sur chantier", bullet: "action" },
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

const bulletColors: Record<BulletType, string> = {
  action: "text-accent",
  technique: "text-primary",
  relationnel: "text-accent",
};

interface CvEntry {
  id: number;
  input: string;
  selected: string;
  bullet: BulletType;
}

interface CvProfile {
  nom: string;
  titre: string;
  email: string;
  telephone: string;
  ville: string;
}

const CvGenerator = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Transformation[]>([]);
  const [entries, setEntries] = useState<CvEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [searching, setSearching] = useState(false);
  const [profile, setProfile] = useState<CvProfile>({
    nom: "",
    titre: "",
    email: "",
    telephone: "",
    ville: "",
  });
  const a4Ref = useRef<HTMLDivElement>(null);

  const handleTransform = () => {
    if (!input.trim()) return;
    setSearching(true);
    setTimeout(() => {
      setSuggestions(findSuggestions(input));
      setSearching(false);
    }, 350);
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

  const updateProfile = (field: keyof CvProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Group entries by source
  const experienceEntries = entries.filter((e) => e.input !== "Atout");
  const atoutEntries = entries.filter((e) => e.input === "Atout");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Header */}
            <div className="animate-fade-up max-w-2xl mb-10">
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">
                Méthode Fred · Générateur intelligent
              </p>
              <h1 className="text-3xl md:text-4xl tracking-tight mb-3">
                Générateur de CV
              </h1>
              <p className="text-muted-foreground">
                Saisissez vos expériences, l'intelligence métier transforme vos tâches en compétences percutantes.
              </p>
            </div>

            <div className="grid lg:grid-cols-[1fr,minmax(520px,640px)] gap-8 items-start">
              {/* LEFT — Controls */}
              <div className="space-y-6">
                {/* Profile fields */}
                <div className="animate-fade-up rounded-xl bg-card p-6 shadow-sm space-y-4">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Informations personnelles
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input value={profile.nom} onChange={(e) => updateProfile("nom", e.target.value)} placeholder="Nom complet" className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    <input value={profile.titre} onChange={(e) => updateProfile("titre", e.target.value)} placeholder="Titre visé (ex: Agent polyvalent)" className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    <input value={profile.email} onChange={(e) => updateProfile("email", e.target.value)} placeholder="Email" className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    <input value={profile.telephone} onChange={(e) => updateProfile("telephone", e.target.value)} placeholder="Téléphone" className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    <input value={profile.ville} onChange={(e) => updateProfile("ville", e.target.value)} placeholder="Ville" className="col-span-full sm:col-span-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>

                {/* Experience input */}
                <div className="animate-fade-up-delay-1 rounded-xl bg-card p-6 shadow-sm">
                  <h3 className="font-semibold text-sm flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Saisissez une expérience ou tâche
                  </h3>
                  <div className="flex gap-3">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleTransform()}
                      placeholder="Ex : agent de nettoyage, vente, cuisine…"
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

                  {/* Bullet legend */}
                  <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><ArrowRight className="w-3 h-3 text-accent" /> Action</span>
                    <span className="inline-flex items-center gap-1"><Square className="w-3 h-3 text-primary" /> Technique</span>
                    <span className="inline-flex items-center gap-1"><Circle className="w-3 h-3 text-accent" /> Relationnel</span>
                  </div>

                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="mt-5 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Compétences suggérées pour « <span className="font-medium text-foreground">{input}</span> » :
                      </p>
                      {suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => addEntry(s)}
                          className="w-full text-left rounded-lg border border-border bg-background p-3.5 hover:bg-secondary hover:shadow-sm transition-[background,box-shadow] active:scale-[0.98] group flex items-start gap-3"
                        >
                          <BulletIcon type={s.bullet} className={`w-4 h-4 mt-0.5 flex-shrink-0 ${bulletColors[s.bullet]}`} />
                          <span className="text-sm leading-relaxed">{s.text}</span>
                          <Plus className="w-4 h-4 ml-auto mt-0.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Atouts rapides */}
                <div className="animate-fade-up-delay-2 rounded-xl bg-accent/8 border border-accent/20 p-6">
                  <h3 className="font-semibold text-sm mb-3">⭐ Atouts à valoriser</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {atouts.map((a) => (
                      <button
                        key={a}
                        onClick={() => addAtout(a)}
                        className="text-left rounded-lg border border-border bg-background p-3 text-sm hover:bg-secondary hover:shadow-sm transition-[background,box-shadow] active:scale-[0.98] group flex items-center gap-2"
                      >
                        <Plus className="w-3.5 h-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Copy all button */}
                {entries.length > 0 && (
                  <button
                    onClick={copyAll}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-primary-foreground font-medium shadow-sm hover:shadow-md transition-[box-shadow] active:scale-[0.97]"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copié !" : "Copier toutes les compétences"}
                  </button>
                )}
              </div>

              {/* RIGHT — A4 Preview */}
              <div className="animate-fade-up-delay-2 sticky top-24">
                <div
                  ref={a4Ref}
                  className="bg-white rounded-lg shadow-xl ring-1 ring-black/5 mx-auto overflow-hidden"
                  style={{ aspectRatio: "210 / 297", maxHeight: "85vh" }}
                >
                  <div className="h-full flex flex-col text-gray-800 text-[11px] leading-[1.5]">
                    {/* A4 Header bar */}
                    <div className="px-8 py-6" style={{ backgroundColor: "hsl(213, 65%, 38%)" }}>
                      <h2 className="text-white text-xl font-bold tracking-wide">
                        {profile.nom || "Votre Nom"}
                      </h2>
                      <p className="text-white/80 text-sm mt-0.5">
                        {profile.titre || "Titre du poste visé"}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-white/70 text-[10px]">
                        {profile.email && (
                          <span className="inline-flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {profile.email}
                          </span>
                        )}
                        {profile.telephone && (
                          <span className="inline-flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {profile.telephone}
                          </span>
                        )}
                        {profile.ville && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {profile.ville}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* A4 Body */}
                    <div className="flex-1 px-8 py-6 overflow-y-auto space-y-5">
                      {/* Compétences section */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1.5 border-b-2" style={{ color: "hsl(213, 65%, 38%)", borderColor: "hsl(213, 65%, 38%)" }}>
                          Compétences professionnelles
                        </h3>
                        {experienceEntries.length > 0 ? (
                          <ul className="space-y-1.5">
                            {experienceEntries.map((entry) => (
                              <li key={entry.id} className="flex items-start gap-2 group/item">
                                <BulletIcon type={entry.bullet} className={`w-3 h-3 mt-0.5 flex-shrink-0 ${entry.bullet === "technique" ? "text-blue-700" : "text-orange-500"}`} />
                                <span className="flex-1">{entry.selected}</span>
                                <button
                                  onClick={() => removeEntry(entry.id)}
                                  className="opacity-0 group-hover/item:opacity-100 text-gray-300 hover:text-red-400 transition-opacity"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-400 italic text-[10px]">
                            Saisissez une expérience à gauche pour voir les compétences apparaître ici…
                          </p>
                        )}
                      </div>

                      {/* Atouts section */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1.5 border-b-2" style={{ color: "hsl(24, 85%, 52%)", borderColor: "hsl(24, 85%, 52%)" }}>
                          Atouts
                        </h3>
                        {atoutEntries.length > 0 ? (
                          <ul className="space-y-1.5">
                            {atoutEntries.map((entry) => (
                              <li key={entry.id} className="flex items-start gap-2 group/item">
                                <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0 text-orange-500" />
                                <span className="flex-1">{entry.selected}</span>
                                <button
                                  onClick={() => removeEntry(entry.id)}
                                  className="opacity-0 group-hover/item:opacity-100 text-gray-300 hover:text-red-400 transition-opacity"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-400 italic text-[10px]">
                            Ajoutez des atouts depuis la section à gauche…
                          </p>
                        )}
                      </div>

                      {/* Empty state guide */}
                      {entries.length === 0 && (
                        <div className="mt-4 rounded-lg border border-dashed border-gray-200 p-5 text-center">
                          <Briefcase className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-400 text-[10px] font-medium">
                            Votre CV se construit ici en temps réel
                          </p>
                          <p className="text-gray-300 text-[9px] mt-1">
                            Style télégraphique · Verbes d'action · Pas de « Je… »
                          </p>
                        </div>
                      )}
                    </div>

                    {/* A4 Footer */}
                    <div className="px-8 py-3 border-t border-gray-100 text-[9px] text-gray-400 flex justify-between">
                      <span>My CV Coach · Méthode Fred</span>
                      <span>→ Action · ■ Technique · ● Relationnel</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CvGenerator;
