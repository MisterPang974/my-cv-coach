// ─── Sector detection & palette system ─────────────────────────────

export type SectorId = "manuel" | "tertiaire" | "tech" | "soin" | "creatif";
export type LayoutId = "impact" | "artisan" | "creatif" | "mural" | "magazine" | "medical" | "flux";
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

export interface SectorConfig {
  id: SectorId;
  label: string;
  emoji: string;
  layouts: LayoutId[];
  palettes: SectorPalette[];
}

// ─── Keywords → sector mapping ─────────────────────────────────────
const sectorKeywords: Record<SectorId, string[]> = {
  manuel: [
    "maçon", "maçonnerie", "btp", "chantier", "plombier", "plomberie",
    "électricien", "menuisier", "peintre", "carreleur", "couvreur",
    "manutention", "manutentionnaire", "agent de nettoyage", "nettoyage",
    "ménage", "entretien", "chauffeur", "livreur", "livraison",
    "mécanicien", "soudeur", "charpentier", "ouvrier", "manoeuvre",
    "jardinier", "paysagiste", "cuisine", "cuisinier", "boulanger",
    "boucher", "poissonnier", "restauration",
  ],
  tertiaire: [
    "commercial", "vente", "vendeur", "vendeuse", "caisse", "caissier",
    "caissière", "accueil", "hôtesse", "secrétaire", "secrétariat",
    "assistant", "assistante", "administration", "administratif",
    "comptable", "comptabilité", "rh", "ressources humaines",
    "management", "manager", "directeur", "responsable",
    "banque", "assurance", "finance", "immobilier", "agent immobilier",
    "logistique", "achat", "juriste", "droit",
  ],
  tech: [
    "développeur", "developpeur", "informatique", "programmeur",
    "web", "data", "designer", "ux", "ui", "devops", "cloud",
    "réseau", "cybersécurité", "système", "ingénieur", "technicien",
    "support", "helpdesk", "intégrateur", "analyste", "consultant it",
    "product", "scrum", "agile", "fullstack", "frontend", "backend",
  ],
  soin: [
    "aide-soignant", "aide soignant", "infirmier", "infirmière",
    "médecin", "pharmacien", "auxiliaire", "éducateur", "éducatrice",
    "social", "assistante sociale", "garde d'enfants", "petite enfance",
    "atsem", "animateur", "animatrice", "psychologue", "orthophoniste",
    "kiné", "kinésithérapeute", "sage-femme", "ambulancier",
    "aide à domicile", "aesh", "moniteur",
  ],
  creatif: [
    "graphiste", "designer", "photographe", "vidéaste", "monteur",
    "communication", "marketing", "community manager", "rédacteur",
    "journaliste", "styliste", "architecte", "décorateur",
    "illustrateur", "motion", "directeur artistique", "chef de projet",
    "événementiel",
  ],
};

export function detectSector(jobTitle: string): SectorId {
  const lower = jobTitle.toLowerCase().trim();
  if (!lower) return "tertiaire"; // default
  for (const [sector, keywords] of Object.entries(sectorKeywords)) {
    for (const kw of keywords) {
      if (lower.includes(kw) || kw.includes(lower)) {
        return sector as SectorId;
      }
    }
  }
  return "tertiaire";
}

// ─── Layouts metadata ──────────────────────────────────────────────
export const layoutMeta: Record<LayoutId, { label: string; desc: string; emoji: string }> = {
  impact: { label: "Impact", desc: "Sidebar gauche, glassmorphism", emoji: "⚡" },
  artisan: { label: "Artisan", desc: "Textures organiques, serif", emoji: "🪵" },
  creatif: { label: "Créatif", desc: "Asymétrique, formes flottantes", emoji: "🎨" },
  mural: { label: "Mural", desc: "Blocs robustes, structuré", emoji: "🧱" },
  magazine: { label: "Magazine", desc: "Colonnes nettes, chiffres", emoji: "📰" },
  
  medical: { label: "Médical", desc: "Formes douces, apaisant", emoji: "💚" },
  flux: { label: "Flux", desc: "Connexions, flèches directionnelles", emoji: "➡️" },
};

// ─── Sector configs ────────────────────────────────────────────────
export const sectorConfigs: Record<SectorId, SectorConfig> = {
  manuel: {
    id: "manuel",
    label: "Manuel / Technique",
    emoji: "🔧",
    layouts: ["mural", "flux", "artisan", "impact", "creatif"],
    palettes: [
      { id: "acier", label: "Acier", primary: "hsl(215, 15%, 30%)", accent: "hsl(35, 80%, 50%)", swatch: "hsl(215, 15%, 35%)" },
      { id: "chantier", label: "Chantier", primary: "hsl(25, 65%, 35%)", accent: "hsl(45, 90%, 55%)", swatch: "hsl(25, 65%, 40%)" },
      { id: "foret", label: "Forêt", primary: "hsl(150, 30%, 28%)", accent: "hsl(35, 60%, 50%)", swatch: "hsl(150, 30%, 35%)" },
      { id: "beton", label: "Béton", primary: "hsl(200, 8%, 25%)", accent: "hsl(200, 40%, 50%)", swatch: "hsl(200, 8%, 32%)" },
      { id: "cuivre", label: "Cuivre", primary: "hsl(15, 50%, 30%)", accent: "hsl(20, 75%, 55%)", swatch: "hsl(15, 50%, 38%)" },
    ],
  },
  tertiaire: {
    id: "tertiaire",
    label: "Tertiaire / Vente",
    emoji: "💼",
    layouts: ["magazine", "impact", "creatif", "mural", "flux"],
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
    layouts: ["impact", "flux", "magazine", "creatif", "mural"],
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
    label: "Soin / Social",
    emoji: "💚",
    layouts: ["medical", "artisan", "magazine", "impact", "creatif"],
    palettes: [
      { id: "douceur", label: "Douceur", primary: "hsl(200, 35%, 35%)", accent: "hsl(170, 45%, 50%)", swatch: "hsl(200, 35%, 42%)" },
      { id: "lavande", label: "Lavande", primary: "hsl(270, 25%, 40%)", accent: "hsl(290, 35%, 60%)", swatch: "hsl(270, 25%, 48%)" },
      { id: "nature", label: "Nature", primary: "hsl(140, 30%, 32%)", accent: "hsl(80, 40%, 50%)", swatch: "hsl(140, 30%, 40%)" },
      { id: "aurore", label: "Aurore", primary: "hsl(340, 30%, 38%)", accent: "hsl(15, 60%, 60%)", swatch: "hsl(340, 30%, 45%)" },
      { id: "ciel", label: "Ciel", primary: "hsl(205, 45%, 35%)", accent: "hsl(195, 55%, 55%)", swatch: "hsl(205, 45%, 42%)" },
    ],
  },
  creatif: {
    id: "creatif",
    label: "Créatif / Communication",
    emoji: "🎨",
    layouts: ["creatif", "magazine", "impact", "flux", "artisan"],
    palettes: [
      { id: "bold", label: "Bold", primary: "hsl(350, 70%, 40%)", accent: "hsl(45, 90%, 55%)", swatch: "hsl(350, 70%, 48%)" },
      { id: "neon", label: "Néon", primary: "hsl(250, 40%, 22%)", accent: "hsl(55, 95%, 55%)", swatch: "hsl(250, 40%, 30%)" },
      { id: "pastel", label: "Pastel", primary: "hsl(220, 30%, 35%)", accent: "hsl(340, 50%, 65%)", swatch: "hsl(220, 30%, 42%)" },
      { id: "terracotta", label: "Terracotta", primary: "hsl(15, 45%, 32%)", accent: "hsl(30, 65%, 55%)", swatch: "hsl(15, 45%, 40%)" },
      { id: "studio", label: "Studio", primary: "hsl(0, 0%, 12%)", accent: "hsl(0, 75%, 55%)", swatch: "hsl(0, 0%, 18%)" },
    ],
  },
};
