// ─── Sector detection & palette system ─────────────────────────────

export type SectorId =
  | "manuel" | "tertiaire" | "tech" | "soin" | "creatif"
  | "logistique" | "hotellerie" | "enseignement" | "agriculture"
  | "securite" | "environnement" | "artisanat" | "sport";

export type LayoutId = "impact" | "artisan" | "creatif" | "mural" | "magazine" | "medical" | "flux" | "serenite";
export type SidebarPosition = "left" | "right" | "top";
export type BulletStyle = "fleches" | "cercles" | "carres" | "mixte";

export interface SectorPalette {
  id: string;
  label: string;
  primary: string;
  accent: string;
  swatch: string;
  bg?: string;
}

export interface SectorGradient {
  id: string;
  label: string;
  from: string;
  to: string;
  angle?: number;
}

export interface SectorConfig {
  id: SectorId;
  label: string;
  emoji: string;
  layouts: LayoutId[];
  palettes: SectorPalette[];
}

// ─── Gradient library (shared across all sectors) ─────────────────
// Soft / Pastel gradients first (light, high-readability)
export const gradientLibrary: SectorGradient[] = [
  // ── Pastels & Soft (priorité) ──
  { id: "blanc-casse", label: "Blanc cassé → Blanc", from: "hsl(40, 20%, 96%)", to: "hsl(0, 0%, 100%)", angle: 180 },
  { id: "ciel-blanc", label: "Bleu ciel → Blanc", from: "hsl(205, 70%, 90%)", to: "hsl(0, 0%, 100%)", angle: 180 },
  { id: "menthe-blanc", label: "Menthe → Blanc", from: "hsl(165, 50%, 88%)", to: "hsl(0, 0%, 100%)", angle: 180 },
  { id: "peche-blanc", label: "Pêche → Blanc", from: "hsl(20, 80%, 90%)", to: "hsl(0, 0%, 100%)", angle: 180 },
  { id: "perle-blanc", label: "Gris perle → Blanc", from: "hsl(220, 10%, 92%)", to: "hsl(0, 0%, 100%)", angle: 180 },
  { id: "lavande-blanc", label: "Lavande → Blanc", from: "hsl(260, 40%, 90%)", to: "hsl(0, 0%, 100%)", angle: 180 },
  { id: "sable-blanc", label: "Sable → Blanc", from: "hsl(38, 35%, 90%)", to: "hsl(0, 0%, 100%)", angle: 160 },
  { id: "rose-blanc", label: "Rose poudré → Blanc", from: "hsl(340, 45%, 90%)", to: "hsl(0, 0%, 100%)", angle: 180 },
  // ── Vibrantes nouvelles ──
  { id: "jaune-soleil", label: "Jaune soleil → Or", from: "hsl(48, 95%, 70%)", to: "hsl(38, 90%, 82%)", angle: 135 },
  { id: "rose-fuchsia", label: "Rose fuchsia → Rose", from: "hsl(330, 80%, 60%)", to: "hsl(345, 70%, 80%)", angle: 135 },
  { id: "violet-prune", label: "Violet prune → Mauve", from: "hsl(285, 50%, 40%)", to: "hsl(270, 45%, 70%)", angle: 135 },
  { id: "orange-mandarine", label: "Orange mandarine → Pêche", from: "hsl(28, 90%, 58%)", to: "hsl(16, 80%, 75%)", angle: 135 },
  { id: "turquoise-azur", label: "Turquoise azur → Ciel", from: "hsl(178, 65%, 45%)", to: "hsl(195, 70%, 75%)", angle: 135 },
  { id: "gris-perle-deep", label: "Gris perle → Argent", from: "hsl(220, 8%, 70%)", to: "hsl(210, 12%, 88%)", angle: 180 },
  // ── Classiques ──
  { id: "lavande-ciel", label: "Lavande → Ciel", from: "hsl(270, 35%, 75%)", to: "hsl(205, 60%, 82%)", angle: 135 },
  { id: "menthe-givre", label: "Menthe givrée", from: "hsl(170, 45%, 72%)", to: "hsl(185, 55%, 85%)", angle: 140 },
  { id: "orange-rose", label: "Orange → Rose", from: "hsl(24, 75%, 72%)", to: "hsl(340, 55%, 78%)", angle: 135 },
  { id: "ocean-clair", label: "Océan clair", from: "hsl(210, 50%, 70%)", to: "hsl(195, 60%, 82%)", angle: 135 },
  { id: "terre-sable", label: "Terre → Sable", from: "hsl(15, 35%, 65%)", to: "hsl(40, 45%, 82%)", angle: 160 },
  { id: "acier-bleu", label: "Acier → Bleu", from: "hsl(215, 20%, 55%)", to: "hsl(213, 55%, 72%)", angle: 135 },
  // ── Radiaux (multi-stop simulés par angle) ──
  { id: "aurore-radial", label: "Aurore boréale", from: "hsl(180, 60%, 50%)", to: "hsl(280, 50%, 55%)", angle: 160 },
  { id: "sunset-radial", label: "Coucher de soleil", from: "hsl(15, 85%, 60%)", to: "hsl(45, 90%, 65%)", angle: 90 },
  { id: "ocean-profond", label: "Océan profond", from: "hsl(200, 70%, 35%)", to: "hsl(220, 60%, 55%)", angle: 180 },
  { id: "foret-emeraude", label: "Forêt émeraude", from: "hsl(145, 55%, 35%)", to: "hsl(165, 50%, 55%)", angle: 150 },
  { id: "cerise-corail", label: "Cerise → Corail", from: "hsl(350, 75%, 50%)", to: "hsl(15, 80%, 65%)", angle: 120 },
  { id: "indigo-violet", label: "Indigo → Violet", from: "hsl(240, 55%, 45%)", to: "hsl(290, 50%, 60%)", angle: 135 },
  // ── Sombres (optionnels) ──
  { id: "nuit-violette", label: "Nuit violette", from: "hsl(230, 40%, 20%)", to: "hsl(280, 50%, 40%)", angle: 135 },
  { id: "charbon-or", label: "Charbon → Or", from: "hsl(0, 0%, 15%)", to: "hsl(45, 85%, 55%)", angle: 150 },
  { id: "minuit-bleu", label: "Minuit bleu", from: "hsl(220, 50%, 15%)", to: "hsl(210, 60%, 35%)", angle: 180 },
  { id: "noir-rouge", label: "Noir → Rouge sombre", from: "hsl(0, 0%, 10%)", to: "hsl(350, 60%, 30%)", angle: 150 },
];

// ─── 15 bullet styles ──────────────────────────────────────────────
export type BulletShapeId =
  | "fleche" | "carre" | "cercle" | "losange" | "hexagone"
  | "check" | "etoile" | "triangle" | "croix-plus" | "tiret"
  | "chevron" | "double-fleche" | "puce-pleine" | "anneau" | "eclair";

export interface BulletShapeDef {
  id: BulletShapeId;
  label: string;
  emoji: string;
}

export const bulletShapes: BulletShapeDef[] = [
  { id: "fleche", label: "Flèche", emoji: "→" },
  { id: "carre", label: "Carré", emoji: "■" },
  { id: "cercle", label: "Cercle", emoji: "●" },
  { id: "losange", label: "Losange", emoji: "◆" },
  { id: "hexagone", label: "Hexagone", emoji: "⬡" },
  { id: "check", label: "Check 2026", emoji: "✓" },
  { id: "etoile", label: "Étoile", emoji: "★" },
  { id: "triangle", label: "Triangle", emoji: "▶" },
  { id: "croix-plus", label: "Croix +", emoji: "✚" },
  { id: "tiret", label: "Tiret", emoji: "—" },
  { id: "chevron", label: "Chevron", emoji: "»" },
  { id: "double-fleche", label: "Double flèche", emoji: "⇒" },
  { id: "puce-pleine", label: "Puce pleine", emoji: "⦿" },
  { id: "anneau", label: "Anneau", emoji: "◎" },
  { id: "eclair", label: "Éclair", emoji: "⚡" },
];

// ─── Keywords → sector mapping ─────────────────────────────────────
const sectorKeywords: Record<SectorId, string[]> = {
  soin: [
    "aide-soignant", "aide soignant", "aide soignante", "infirmier", "infirmière",
    "médecin", "pharmacien", "auxiliaire", "auxiliaire de vie",
    "éducateur", "éducatrice", "éducateur spécialisé",
    "social", "assistante sociale", "assistant social", "travailleur social",
    "garde d'enfants", "petite enfance", "atsem",
    "psychologue", "orthophoniste", "kiné", "kinésithérapeute",
    "sage-femme", "ambulancier", "aide à domicile", "aesh",
    "moniteur éducateur", "conseiller en insertion",
    "accompagnant", "accompagnante", "amp", "aes",
    "diététicien", "ergothérapeute", "ostéopathe",
    "aide médico-psychologique", "service à la personne",
    "agent de service hospitalier", "ash", "brancardier",
  ],
  logistique: [
    "chauffeur", "chauffeur routier", "chauffeur livreur", "conducteur",
    "livreur", "livraison", "transporteur", "routier",
    "magasinier", "cariste", "préparateur de commandes",
    "agent logistique", "responsable logistique", "supply chain",
    "manutentionnaire", "manutention", "docker", "affréteur",
    "exploitant transport", "dispatcher", "agent de quai",
    "gestionnaire de stock", "inventoriste",
  ],
  manuel: [
    "maçon", "maçonnerie", "btp", "chantier", "plombier", "plomberie",
    "électricien", "menuisier", "peintre en bâtiment", "carreleur", "couvreur",
    "mécanicien", "soudeur", "charpentier", "ouvrier", "manoeuvre",
    "conducteur d'engins", "grutier", "coffreur", "ferblantier",
    "technicien de maintenance", "technicien industriel",
    "opérateur de production", "agent de fabrication",
    "tourneur", "fraiseur", "usineur", "chaudronnier",
    "tuyauteur", "monteur", "câbleur", "frigoriste",
  ],
  hotellerie: [
    "cuisine", "cuisinier", "cuisinière", "boulanger", "boulangère",
    "boucher", "bouchère", "poissonnier", "restauration",
    "serveur", "serveuse", "barman", "barmaid",
    "réceptionniste hôtel", "hôtellerie", "hôtel",
    "chef de cuisine", "commis de cuisine", "pâtissier",
    "traiteur", "sommelier", "maître d'hôtel",
    "femme de chambre", "valet de chambre", "gouvernante",
    "plongeur", "équipier", "employé de restauration",
  ],
  tertiaire: [
    "commercial", "vente", "vendeur", "vendeuse",
    "caisse", "caissier", "caissière",
    "accueil", "hôtesse", "hôtesse d'accueil",
    "secrétaire", "secrétariat", "assistant", "assistante",
    "administration", "administratif",
    "comptable", "comptabilité", "rh", "ressources humaines",
    "management", "manager", "directeur", "responsable",
    "banque", "assurance", "finance", "immobilier", "agent immobilier",
    "achat", "acheteur", "juriste", "droit", "notaire",
    "gestionnaire", "chargé de clientèle", "conseiller clientèle",
    "attaché commercial", "chef de secteur",
    "téléconseiller", "agent administratif",
  ],
  tech: [
    "développeur", "developpeur", "informatique", "programmeur",
    "web", "data", "data analyst", "data scientist",
    "designer ux", "designer ui", "ux", "ui", "devops", "cloud",
    "réseau", "cybersécurité", "système", "ingénieur informatique",
    "technicien informatique", "support informatique",
    "helpdesk", "intégrateur", "analyste", "consultant it",
    "product owner", "product manager", "scrum master",
    "agile", "fullstack", "frontend", "backend",
    "administrateur système", "architecte logiciel",
    "testeur", "qa", "chef de projet digital",
  ],
  enseignement: [
    "professeur", "enseignant", "enseignante", "instituteur", "institutrice",
    "formateur", "formatrice", "animateur", "animatrice",
    "éducateur de jeunes enfants", "eje",
    "conseiller pédagogique", "directeur d'école",
    "professeur des écoles", "maître de conférences",
    "chargé de formation", "tuteur", "moniteur auto-école",
    "coach", "intervenant", "médiateur scolaire",
  ],
  agriculture: [
    "agriculteur", "agricultrice", "ouvrier agricole",
    "jardinier", "paysagiste", "élagueur",
    "viticulteur", "horticulteur", "maraîcher",
    "agent d'entretien des espaces verts",
    "berger", "éleveur", "aquaculteur", "sylviculteur",
    "technicien agricole", "responsable d'exploitation",
  ],
  securite: [
    "agent de sécurité", "vigile", "gardien", "gardiennage",
    "agent de prévention", "ssiap", "rondier",
    "maître-chien", "agent cynophile",
    "pompier", "sapeur-pompier",
    "agent de surveillance", "vidéoprotection",
    "agent de nettoyage", "nettoyage", "ménage", "entretien",
    "agent de propreté", "technicien de surface",
  ],
  environnement: [
    "environnement", "écologue", "technicien environnement",
    "agent de tri", "agent de déchetterie", "éboueur",
    "ripeur", "recyclage", "développement durable",
    "chargé de mission environnement", "hydraulicien",
    "technicien assainissement", "agent de l'eau",
  ],
  artisanat: [
    "artisan", "tapissier", "ébéniste", "relieur",
    "céramiste", "potier", "verrier", "bijoutier",
    "cordonnier", "couturier", "couturière", "tailleur",
    "sellier", "maroquinier", "horloger",
    "fleuriste", "encadreur", "luthier",
  ],
  sport: [
    "coach sportif", "éducateur sportif", "moniteur sportif",
    "préparateur physique", "entraîneur",
    "maître-nageur", "mns", "bpjeps",
    "animateur sportif", "agent sportif",
    "kinésiologue", "professeur de yoga", "professeur de fitness",
  ],
  creatif: [
    "graphiste", "designer", "photographe", "vidéaste", "monteur vidéo",
    "communication", "marketing", "community manager", "rédacteur",
    "journaliste", "styliste", "architecte", "architecte d'intérieur",
    "décorateur", "décoratrice",
    "illustrateur", "motion designer", "directeur artistique",
    "chef de projet événementiel", "événementiel",
    "webdesigner", "infographiste", "scénographe",
  ],
};

export function detectSector(jobTitle: string): SectorId {
  const lower = jobTitle.toLowerCase().trim();
  if (!lower) return "tertiaire";
  // Try longest match first (multi-word keywords)
  const allSectors = Object.entries(sectorKeywords) as [SectorId, string[]][];
  // Sort keywords by length desc for best match
  let bestMatch: SectorId | null = null;
  let bestLen = 0;
  for (const [sector, keywords] of allSectors) {
    for (const kw of keywords) {
      if ((lower.includes(kw) || kw.includes(lower)) && kw.length > bestLen) {
        bestMatch = sector;
        bestLen = kw.length;
      }
    }
  }
  return bestMatch || "tertiaire";
}

// ─── Layouts metadata ──────────────────────────────────────────────
export const layoutMeta: Record<LayoutId, { label: string; desc: string; emoji: string }> = {
  impact: { label: "Impact", desc: "Sidebar gauche, glassmorphism", emoji: "⚡" },
  artisan: { label: "Artisan", desc: "Textures organiques, serif", emoji: "🪵" },
  creatif: { label: "Créatif", desc: "Asymétrique, formes flottantes", emoji: "🎨" },
  mural: { label: "Mural", desc: "Blocs robustes, structuré", emoji: "🧱" },
  magazine: { label: "Magazine", desc: "Colonnes nettes, chiffres", emoji: "📰" },
  medical: { label: "Médical", desc: "Formes douces, apaisant", emoji: "💚" },
  flux: { label: "Flux", desc: "Timeline, flux directionnel", emoji: "➡️" },
  serenite: { label: "Sérénité", desc: "Arrondis doux, fondus élégants", emoji: "🕊️" },
};

// ─── Sector configs ────────────────────────────────────────────────
export const sectorConfigs: Record<SectorId, SectorConfig> = {
  manuel: {
    id: "manuel",
    label: "BTP / Technique / Industrie",
    emoji: "🔧",
    layouts: ["mural", "flux", "artisan", "impact", "creatif", "magazine", "serenite"],
    palettes: [
      { id: "acier", label: "Acier", primary: "hsl(215, 15%, 30%)", accent: "hsl(35, 80%, 50%)", swatch: "hsl(215, 15%, 35%)" },
      { id: "chantier", label: "Chantier", primary: "hsl(25, 65%, 35%)", accent: "hsl(45, 90%, 55%)", swatch: "hsl(25, 65%, 40%)" },
      { id: "foret", label: "Forêt", primary: "hsl(150, 30%, 28%)", accent: "hsl(35, 60%, 50%)", swatch: "hsl(150, 30%, 35%)" },
      { id: "beton", label: "Béton", primary: "hsl(200, 8%, 25%)", accent: "hsl(200, 40%, 50%)", swatch: "hsl(200, 8%, 32%)" },
      { id: "cuivre", label: "Cuivre", primary: "hsl(15, 50%, 30%)", accent: "hsl(20, 75%, 55%)", swatch: "hsl(15, 50%, 38%)" },
    ],
  },
  logistique: {
    id: "logistique",
    label: "Logistique / Transport",
    emoji: "🚛",
    layouts: ["flux", "mural", "magazine", "impact", "artisan", "creatif", "serenite"],
    palettes: [
      { id: "route", label: "Route", primary: "hsl(215, 25%, 28%)", accent: "hsl(45, 80%, 50%)", swatch: "hsl(215, 25%, 35%)" },
      { id: "cargo", label: "Cargo", primary: "hsl(200, 20%, 22%)", accent: "hsl(24, 75%, 50%)", swatch: "hsl(200, 20%, 30%)" },
      { id: "signal", label: "Signal", primary: "hsl(210, 30%, 25%)", accent: "hsl(120, 50%, 45%)", swatch: "hsl(210, 30%, 32%)" },
      { id: "ardoise", label: "Ardoise", primary: "hsl(220, 12%, 20%)", accent: "hsl(195, 60%, 50%)", swatch: "hsl(220, 12%, 28%)" },
      { id: "asphalte", label: "Asphalte", primary: "hsl(0, 0%, 18%)", accent: "hsl(35, 85%, 55%)", swatch: "hsl(0, 0%, 25%)" },
    ],
  },
  hotellerie: {
    id: "hotellerie",
    label: "Hôtellerie / Restauration",
    emoji: "🍽️",
    layouts: ["artisan", "magazine", "impact", "creatif", "serenite", "mural", "flux"],
    palettes: [
      { id: "gastronomie", label: "Gastronomie", primary: "hsl(350, 45%, 28%)", accent: "hsl(45, 80%, 55%)", swatch: "hsl(350, 45%, 35%)" },
      { id: "bistrot", label: "Bistrot", primary: "hsl(25, 40%, 25%)", accent: "hsl(35, 65%, 50%)", swatch: "hsl(25, 40%, 32%)" },
      { id: "palace", label: "Palace", primary: "hsl(220, 20%, 15%)", accent: "hsl(45, 75%, 55%)", swatch: "hsl(220, 20%, 22%)" },
      { id: "terrasse", label: "Terrasse", primary: "hsl(140, 25%, 30%)", accent: "hsl(80, 40%, 50%)", swatch: "hsl(140, 25%, 38%)" },
      { id: "epice", label: "Épicé", primary: "hsl(15, 55%, 32%)", accent: "hsl(40, 75%, 55%)", swatch: "hsl(15, 55%, 40%)" },
    ],
  },
  tertiaire: {
    id: "tertiaire",
    label: "Tertiaire / Vente / Bureautique",
    emoji: "💼",
    layouts: ["magazine", "impact", "creatif", "mural", "flux", "serenite", "artisan"],
    palettes: [
      { id: "corporate", label: "Corporate", primary: "hsl(213, 65%, 28%)", accent: "hsl(24, 85%, 52%)", swatch: "hsl(213, 65%, 35%)" },
      { id: "prestige", label: "Prestige", primary: "hsl(220, 20%, 18%)", accent: "hsl(45, 80%, 55%)", swatch: "hsl(220, 20%, 25%)" },
      { id: "emeraude", label: "Émeraude", primary: "hsl(160, 50%, 25%)", accent: "hsl(160, 65%, 42%)", swatch: "hsl(160, 50%, 33%)" },
      { id: "bordeaux", label: "Bordeaux", primary: "hsl(350, 55%, 30%)", accent: "hsl(350, 60%, 50%)", swatch: "hsl(350, 55%, 38%)" },
      { id: "ocean", label: "Océan", primary: "hsl(200, 60%, 28%)", accent: "hsl(185, 60%, 45%)", swatch: "hsl(200, 60%, 35%)" },
    ],
  },
  tech: {
    id: "tech",
    label: "Tech / Digital",
    emoji: "💻",
    layouts: ["impact", "flux", "magazine", "creatif", "mural", "serenite", "artisan"],
    palettes: [
      { id: "midnight", label: "Midnight", primary: "hsl(230, 25%, 15%)", accent: "hsl(180, 70%, 50%)", swatch: "hsl(230, 25%, 20%)" },
      { id: "matrix", label: "Matrix", primary: "hsl(150, 40%, 18%)", accent: "hsl(140, 70%, 50%)", swatch: "hsl(150, 40%, 25%)" },
      { id: "synthwave", label: "Synthwave", primary: "hsl(260, 30%, 20%)", accent: "hsl(320, 65%, 55%)", swatch: "hsl(260, 30%, 28%)" },
      { id: "arctic", label: "Arctic", primary: "hsl(210, 40%, 22%)", accent: "hsl(195, 80%, 55%)", swatch: "hsl(210, 40%, 30%)" },
      { id: "carbon", label: "Carbon", primary: "hsl(0, 0%, 15%)", accent: "hsl(45, 90%, 55%)", swatch: "hsl(0, 0%, 22%)" },
    ],
  },
  soin: {
    id: "soin",
    label: "Santé / Social / Service à la personne",
    emoji: "💚",
    layouts: ["serenite", "medical", "artisan", "magazine", "impact", "creatif", "flux"],
    palettes: [
      { id: "douceur", label: "Douceur", primary: "hsl(200, 35%, 35%)", accent: "hsl(170, 45%, 50%)", swatch: "hsl(200, 35%, 42%)" },
      { id: "lavande", label: "Lavande", primary: "hsl(270, 25%, 40%)", accent: "hsl(290, 35%, 60%)", swatch: "hsl(270, 25%, 48%)" },
      { id: "nature", label: "Nature", primary: "hsl(140, 30%, 32%)", accent: "hsl(80, 40%, 50%)", swatch: "hsl(140, 30%, 40%)" },
      { id: "aurore", label: "Aurore", primary: "hsl(340, 30%, 38%)", accent: "hsl(15, 60%, 60%)", swatch: "hsl(340, 30%, 45%)" },
      { id: "ciel", label: "Ciel", primary: "hsl(205, 45%, 35%)", accent: "hsl(195, 55%, 55%)", swatch: "hsl(205, 45%, 42%)" },
    ],
  },
  enseignement: {
    id: "enseignement",
    label: "Enseignement / Formation",
    emoji: "📚",
    layouts: ["magazine", "serenite", "impact", "artisan", "creatif", "mural", "flux"],
    palettes: [
      { id: "campus", label: "Campus", primary: "hsl(213, 50%, 30%)", accent: "hsl(45, 70%, 52%)", swatch: "hsl(213, 50%, 38%)" },
      { id: "tableau", label: "Tableau", primary: "hsl(150, 25%, 25%)", accent: "hsl(40, 55%, 50%)", swatch: "hsl(150, 25%, 33%)" },
      { id: "encre", label: "Encre", primary: "hsl(220, 30%, 22%)", accent: "hsl(350, 50%, 50%)", swatch: "hsl(220, 30%, 30%)" },
      { id: "craie", label: "Craie", primary: "hsl(0, 0%, 20%)", accent: "hsl(195, 50%, 50%)", swatch: "hsl(0, 0%, 28%)" },
      { id: "savoir", label: "Savoir", primary: "hsl(270, 20%, 30%)", accent: "hsl(280, 40%, 55%)", swatch: "hsl(270, 20%, 38%)" },
    ],
  },
  agriculture: {
    id: "agriculture",
    label: "Agriculture / Espaces verts",
    emoji: "🌿",
    layouts: ["artisan", "mural", "flux", "serenite", "magazine", "impact", "creatif"],
    palettes: [
      { id: "prairie", label: "Prairie", primary: "hsl(120, 30%, 25%)", accent: "hsl(80, 50%, 50%)", swatch: "hsl(120, 30%, 32%)" },
      { id: "terroir", label: "Terroir", primary: "hsl(25, 40%, 28%)", accent: "hsl(40, 55%, 50%)", swatch: "hsl(25, 40%, 35%)" },
      { id: "vignoble", label: "Vignoble", primary: "hsl(350, 35%, 28%)", accent: "hsl(45, 65%, 50%)", swatch: "hsl(350, 35%, 35%)" },
      { id: "mousse", label: "Mousse", primary: "hsl(140, 35%, 22%)", accent: "hsl(100, 40%, 48%)", swatch: "hsl(140, 35%, 30%)" },
      { id: "soleil", label: "Soleil", primary: "hsl(35, 40%, 25%)", accent: "hsl(45, 80%, 55%)", swatch: "hsl(35, 40%, 32%)" },
    ],
  },
  securite: {
    id: "securite",
    label: "Sécurité / Propreté",
    emoji: "🛡️",
    layouts: ["mural", "flux", "impact", "magazine", "serenite", "artisan", "creatif"],
    palettes: [
      { id: "garde", label: "Garde", primary: "hsl(215, 30%, 22%)", accent: "hsl(45, 70%, 50%)", swatch: "hsl(215, 30%, 30%)" },
      { id: "vigilance", label: "Vigilance", primary: "hsl(0, 0%, 18%)", accent: "hsl(350, 60%, 50%)", swatch: "hsl(0, 0%, 25%)" },
      { id: "proprete", label: "Propreté", primary: "hsl(200, 35%, 30%)", accent: "hsl(170, 50%, 48%)", swatch: "hsl(200, 35%, 38%)" },
      { id: "uniforme", label: "Uniforme", primary: "hsl(210, 20%, 20%)", accent: "hsl(210, 50%, 50%)", swatch: "hsl(210, 20%, 28%)" },
      { id: "alerte", label: "Alerte", primary: "hsl(220, 25%, 18%)", accent: "hsl(24, 80%, 52%)", swatch: "hsl(220, 25%, 25%)" },
    ],
  },
  environnement: {
    id: "environnement",
    label: "Environnement / Développement durable",
    emoji: "♻️",
    layouts: ["serenite", "artisan", "flux", "magazine", "impact", "creatif", "mural"],
    palettes: [
      { id: "ecologie", label: "Écologie", primary: "hsl(140, 40%, 25%)", accent: "hsl(160, 55%, 45%)", swatch: "hsl(140, 40%, 32%)" },
      { id: "recyclage", label: "Recyclage", primary: "hsl(195, 35%, 28%)", accent: "hsl(120, 45%, 48%)", swatch: "hsl(195, 35%, 35%)" },
      { id: "terre", label: "Terre", primary: "hsl(25, 35%, 25%)", accent: "hsl(80, 40%, 48%)", swatch: "hsl(25, 35%, 32%)" },
      { id: "riviere", label: "Rivière", primary: "hsl(200, 45%, 28%)", accent: "hsl(180, 50%, 50%)", swatch: "hsl(200, 45%, 35%)" },
      { id: "canopee", label: "Canopée", primary: "hsl(130, 35%, 20%)", accent: "hsl(100, 50%, 50%)", swatch: "hsl(130, 35%, 28%)" },
    ],
  },
  artisanat: {
    id: "artisanat",
    label: "Artisanat / Métiers d'art",
    emoji: "✂️",
    layouts: ["artisan", "creatif", "magazine", "impact", "serenite", "mural", "flux"],
    palettes: [
      { id: "atelier", label: "Atelier", primary: "hsl(25, 45%, 28%)", accent: "hsl(40, 60%, 52%)", swatch: "hsl(25, 45%, 35%)" },
      { id: "porcelaine", label: "Porcelaine", primary: "hsl(210, 20%, 30%)", accent: "hsl(45, 50%, 55%)", swatch: "hsl(210, 20%, 38%)" },
      { id: "cuir", label: "Cuir", primary: "hsl(15, 40%, 25%)", accent: "hsl(30, 55%, 50%)", swatch: "hsl(15, 40%, 32%)" },
      { id: "fil-dor", label: "Fil d'or", primary: "hsl(0, 0%, 15%)", accent: "hsl(45, 75%, 55%)", swatch: "hsl(0, 0%, 22%)" },
      { id: "patine", label: "Patine", primary: "hsl(160, 20%, 28%)", accent: "hsl(35, 45%, 50%)", swatch: "hsl(160, 20%, 35%)" },
    ],
  },
  sport: {
    id: "sport",
    label: "Sport / Bien-être",
    emoji: "🏅",
    layouts: ["impact", "flux", "mural", "creatif", "magazine", "serenite", "artisan"],
    palettes: [
      { id: "performance", label: "Performance", primary: "hsl(215, 45%, 25%)", accent: "hsl(24, 85%, 52%)", swatch: "hsl(215, 45%, 32%)" },
      { id: "energie", label: "Énergie", primary: "hsl(350, 50%, 35%)", accent: "hsl(45, 80%, 55%)", swatch: "hsl(350, 50%, 42%)" },
      { id: "zen", label: "Zen", primary: "hsl(170, 30%, 28%)", accent: "hsl(140, 40%, 50%)", swatch: "hsl(170, 30%, 35%)" },
      { id: "terrain", label: "Terrain", primary: "hsl(120, 25%, 25%)", accent: "hsl(80, 50%, 48%)", swatch: "hsl(120, 25%, 32%)" },
      { id: "podium", label: "Podium", primary: "hsl(0, 0%, 12%)", accent: "hsl(45, 85%, 55%)", swatch: "hsl(0, 0%, 20%)" },
    ],
  },
  creatif: {
    id: "creatif",
    label: "Créatif / Communication",
    emoji: "🎨",
    layouts: ["creatif", "magazine", "impact", "flux", "artisan", "serenite", "mural"],
    palettes: [
      { id: "bold", label: "Bold", primary: "hsl(350, 70%, 40%)", accent: "hsl(45, 90%, 55%)", swatch: "hsl(350, 70%, 48%)" },
      { id: "neon", label: "Néon", primary: "hsl(250, 40%, 22%)", accent: "hsl(55, 95%, 55%)", swatch: "hsl(250, 40%, 30%)" },
      { id: "pastel", label: "Pastel", primary: "hsl(220, 30%, 35%)", accent: "hsl(340, 50%, 65%)", swatch: "hsl(220, 30%, 42%)" },
      { id: "terracotta", label: "Terracotta", primary: "hsl(15, 45%, 32%)", accent: "hsl(30, 65%, 55%)", swatch: "hsl(15, 45%, 40%)" },
      { id: "studio", label: "Studio", primary: "hsl(0, 0%, 12%)", accent: "hsl(0, 75%, 55%)", swatch: "hsl(0, 0%, 18%)" },
    ],
  },
};
