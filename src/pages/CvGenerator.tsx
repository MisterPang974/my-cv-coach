import { useState, useRef, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import { A4AutoFitWrapper } from "@/components/A4AutoFitWrapper";
import Footer from "@/components/Footer";
import {
  Wand2, Copy, Check, Plus, Trash2, User, Briefcase, Palette, Star, Settings2, ChevronRight, Type, AlertTriangle, ToggleLeft, ToggleRight, Gauge, Layers, Send, FolderPlus, GraduationCap, Building2, Eye, EyeOff, ArrowUp, ArrowDown, GripVertical, Sparkles, Heart
} from "lucide-react";
import { detectSector, sectorConfigs, layoutMeta, gradientLibrary, bulletShapes, type SectorId, type LayoutId, type SidebarPosition, type BulletStyle, type SectorPalette, type SectorGradient, type BulletShapeId } from "@/lib/cv-sectors";
import { templateRegistry, ModernBullet, ShapeBullet, fontOptions, type TemplateProps, type TextColorSection, type FontId } from "@/components/cv-templates";

// ─── Types ─────────────────────────────────────────────────────────
type BulletType = "action" | "technique" | "relationnel";
interface Transformation { text: string; bullet: BulletType; }
interface CvEntry { id: number; input: string; selected: string; bullet: BulletType; }
interface CvProfile { nom: string; prenom: string; titre: string; email: string; telephone: string; adresse: string; codePostal: string; ville: string; }

// ─── Professional Experience ───────────────────────────────────────
export interface ExperienceEntry {
  id: number;
  dateDebut: string;
  dateFin: string;
  aujourdhui: boolean;
  poste: string;
  entreprise: string;
  ville: string;
  missions: string[];
  showLogo: boolean;
}

// ─── Formation ────────────────────────────────────────────────────
export interface FormationEntry {
  id: number;
  dateDebut: string;
  dateFin: string;
  intitule: string;
  etablissement: string;
  ville: string;
}

// ─── Divers & Centres d'intérêt ───────────────────────────────────
export interface InterestEntry {
  id: number;
  text: string;
  icon: string; // lucide icon key or emoji
  category: "loisir" | "benevolat" | "permis" | "langue" | "autre";
}

const INTEREST_SUGGESTIONS: { text: string; category: InterestEntry["category"] }[] = [
  { text: "Sport collectif", category: "loisir" },
  { text: "Musique", category: "loisir" },
  { text: "Lecture", category: "loisir" },
  { text: "Voyages", category: "loisir" },
  { text: "Cuisine", category: "loisir" },
  { text: "Bénévolat associatif", category: "benevolat" },
  { text: "Permis B", category: "permis" },
  { text: "Anglais courant", category: "langue" },
];

// ─── Qualities AI suggestions by sector ───────────────────────────
const QUALITIES_BY_SECTOR: Record<string, string[]> = {
  manuel: ["Rigueur et précision", "Résistance physique", "Sens de la sécurité", "Autonomie sur le terrain", "Esprit d'équipe"],
  tertiaire: ["Sens du contact", "Organisation", "Réactivité", "Esprit d'analyse", "Aisance rédactionnelle"],
  soin: ["Empathie et bienveillance", "Patience", "Sens de l'écoute", "Discrétion professionnelle", "Résistance au stress"],
  tech: ["Esprit logique", "Curiosité technique", "Rigueur méthodologique", "Adaptabilité", "Veille technologique"],
  creatif: ["Créativité", "Sens esthétique", "Ouverture d'esprit", "Sensibilité artistique", "Capacité d'innovation"],
  logistique: ["Sens de l'organisation", "Réactivité", "Rigueur", "Gestion du stress", "Ponctualité"],
  default: ["Ponctualité et assiduité", "Autonomie et prise d'initiative", "Travail en équipe", "Adaptabilité", "Sens de l'organisation"],
};

// ─── Competencies Domain System ────────────────────────────────────
interface CompetencyItem { id: string; text: string; enabled: boolean; level?: number; }
interface CompetencyDomain { id: string; label: string; enabled: boolean; items: CompetencyItem[]; custom?: boolean; }

const DEFAULT_DOMAINS: CompetencyDomain[] = [
  {
    id: "administratif", label: "Administratif", enabled: true, items: [
      { id: "a1", text: "Gestion documentaire et archivage", enabled: true, level: 4 },
      { id: "a2", text: "Rédaction de courriers et comptes-rendus", enabled: true, level: 3 },
      { id: "a3", text: "Maîtrise des outils bureautiques (Pack Office)", enabled: true, level: 4 },
      { id: "a4", text: "Organisation et planification d'agendas", enabled: false, level: 3 },
    ],
  },
  {
    id: "technique", label: "Technique", enabled: true, items: [
      { id: "t1", text: "Application des procédures et normes en vigueur", enabled: true, level: 4 },
      { id: "t2", text: "Utilisation d'outils et équipements spécialisés", enabled: true, level: 3 },
      { id: "t3", text: "Lecture de plans et documentation technique", enabled: false, level: 2 },
      { id: "t4", text: "Maintenance préventive et curative", enabled: false, level: 2 },
    ],
  },
  {
    id: "relationnel", label: "Relationnel", enabled: true, items: [
      { id: "r1", text: "Communication professionnelle et écoute active", enabled: true, level: 4 },
      { id: "r2", text: "Travail en équipe pluridisciplinaire", enabled: true, level: 4 },
      { id: "r3", text: "Gestion des conflits et médiation", enabled: false, level: 3 },
      { id: "r4", text: "Accueil et orientation du public", enabled: false, level: 3 },
    ],
  },
  {
    id: "manutention", label: "Manutention / Logistique", enabled: false, items: [
      { id: "m1", text: "Chargement / déchargement de marchandises", enabled: true, level: 3 },
      { id: "m2", text: "Conduite d'engins de manutention (CACES)", enabled: true, level: 3 },
      { id: "m3", text: "Gestion des stocks et inventaires", enabled: false, level: 2 },
      { id: "m4", text: "Préparation de commandes", enabled: false, level: 3 },
    ],
  },
  {
    id: "securite", label: "Sécurité / Normes", enabled: false, items: [
      { id: "s1", text: "Respect des consignes de sécurité et EPI", enabled: true, level: 4 },
      { id: "s2", text: "Application des normes HACCP / hygiène", enabled: true, level: 3 },
      { id: "s3", text: "Gestes de premiers secours (SST)", enabled: false, level: 2 },
      { id: "s4", text: "Veille réglementaire", enabled: false, level: 2 },
    ],
  },
  {
    id: "informatique", label: "Informatique & Digital", enabled: false, items: [
      { id: "i1", text: "Bureautique : Pack Office (Word, Excel, PowerPoint)", enabled: true, level: 4 },
      { id: "i2", text: "Google Workspace (Docs, Sheets, Drive)", enabled: true, level: 3 },
      { id: "i3", text: "Outils collaboratifs : Teams, Zoom, Slack", enabled: true, level: 3 },
      { id: "i4", text: "Logiciels métiers : ERP, CRM, outils de gestion", enabled: false, level: 2 },
      { id: "i5", text: "Veille numérique et culture digitale", enabled: false, level: 2 },
    ],
  },
];

// Layout capacity (max active competency items for clean A4 rendering)
const LAYOUT_MAX_COMPETENCIES: Record<string, number> = {
  impact: 10,
  artisan: 12,
  creatif: 10,
  mural: 14,
  magazine: 12,
  medical: 12,
  flux: 10,
  serenite: 11,
};

// ─── Transformations (Méthode Fred) ────────────────────────────────
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

// ─── Main Component ────────────────────────────────────────────────
const CvGenerator = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Transformation[]>([]);
  const [entries, setEntries] = useState<CvEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [searching, setSearching] = useState(false);
  const [profile, setProfile] = useState<CvProfile>({ nom: "", prenom: "", titre: "", email: "", telephone: "", adresse: "", codePostal: "", ville: "" });
  const [step, setStep] = useState<"titre" | "details">("titre");

  // Sector-aware state
  const [detectedSector, setDetectedSector] = useState<SectorId>("tertiaire");
  const [activeLayout, setActiveLayout] = useState<LayoutId>("magazine");
  const [activePalette, setActivePalette] = useState<SectorPalette>(sectorConfigs.tertiaire.palettes[0]);
  const [sidebarPos, setSidebarPos] = useState<SidebarPosition>("left");
  const [bulletStyle, setBulletStyle] = useState<BulletStyle>("mixte");
  const [activeGradient, setActiveGradient] = useState<SectorGradient | null>(null);
  const [gradientTarget, setGradientTarget] = useState<"fond" | "rubriques">("fond");
  const [activeBulletShape, setActiveBulletShape] = useState<BulletShapeId | null>(null);
  const [competencyBulletShape, setCompetencyBulletShape] = useState<BulletShapeId | null>(null);
  const [formationBulletShape, setFormationBulletShape] = useState<BulletShapeId | null>(null);
  const [diversBulletShape, setDiversBulletShape] = useState<BulletShapeId | null>(null);
  const [qualitesBulletShape, setQualitesBulletShape] = useState<BulletShapeId | null>(null);
  const [bgCircleColor, setBgCircleColor] = useState<string>("");
  const [levelDisplay, setLevelDisplay] = useState<"dots" | "bars" | "none">("none");
  const [textColors, setTextColors] = useState<Record<TextColorSection, "noir" | "blanc">>({ header: "noir", experiences: "noir", competences: "noir" });
  const [titleColor, setTitleColor] = useState<string>("");
  const [selectedFont, setSelectedFont] = useState<FontId>("dm-sans");
  const [dispatchTarget, setDispatchTarget] = useState<string | null>(null);

  // Competency domains state
  const [domains, setDomains] = useState<CompetencyDomain[]>(DEFAULT_DOMAINS);
  const [newDomainName, setNewDomainName] = useState("");

  // Professional experiences state
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [editingExp, setEditingExp] = useState<ExperienceEntry>({ id: 0, dateDebut: "", dateFin: "", aujourdhui: false, poste: "", entreprise: "", ville: "", missions: [], showLogo: true });
  const [newMission, setNewMission] = useState("");

  // Formation state
  const [formations, setFormations] = useState<FormationEntry[]>([]);
  const [editingFormation, setEditingFormation] = useState<FormationEntry>({ id: 0, dateDebut: "", dateFin: "", intitule: "", etablissement: "", ville: "" });
  const [formationMode, setFormationMode] = useState<"diplomes" | "parcours">("diplomes");

  // Interests state
  const [interests, setInterests] = useState<InterestEntry[]>([]);
  const [newInterestText, setNewInterestText] = useState("");
  const [interestDisplayMode, setInterestDisplayMode] = useState<"badges" | "list">("badges");

  // Qualities state
  const [qualities, setQualities] = useState<string[]>([]);
  const [newQualityText, setNewQualityText] = useState("");
  const [qualitiesMode, setQualitiesMode] = useState<"libre" | "ia">("libre");

  // Section order for reordering
  type CvSection = "experiences" | "competences" | "formation" | "qualites" | "divers";
  const [sectionOrder, setSectionOrder] = useState<CvSection[]>(["experiences", "competences", "formation", "qualites", "divers"]);
  const moveSectionUp = (idx: number) => {
    if (idx <= 0) return;
    setSectionOrder(prev => { const next = [...prev]; [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]; return next; });
  };
  const moveSectionDown = (idx: number) => {
    if (idx >= sectionOrder.length - 1) return;
    setSectionOrder(prev => { const next = [...prev]; [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]; return next; });
  };
  const SECTION_LABELS: Record<CvSection, string> = { experiences: "Expériences", competences: "Compétences", formation: "Formation", qualites: "Qualités", divers: "Divers & Intérêts" };

  // White palette option (always available)
  const whitePalette: SectorPalette = { id: "blanc", label: "Blanc pur", primary: "#2d2d2d", accent: "#555555", swatch: "#ffffff", bg: "#ffffff" };

  // ─── A4 Space Intelligence ────────────────────────────────────────
  const activeCompetencyCount = useMemo(() => {
    return domains.filter(d => d.enabled).reduce((sum, d) => sum + d.items.filter(i => i.enabled).length, 0);
  }, [domains]);

  const maxCompetencies = LAYOUT_MAX_COMPETENCIES[activeLayout] || 12;
  const totalContentItems = activeCompetencyCount + entries.length + formations.length + experiences.length + interests.length;
  const isOverloaded = activeCompetencyCount > maxCompetencies;
  const usagePercent = Math.min(100, Math.round((totalContentItems / (maxCompetencies + 8)) * 100));

  const toggleDomain = (domainId: string) => {
    setDomains(prev => prev.map(d => d.id === domainId ? { ...d, enabled: !d.enabled } : d));
  };
  const toggleCompetencyItem = (domainId: string, itemId: string) => {
    setDomains(prev => prev.map(d => d.id === domainId ? { ...d, items: d.items.map(i => i.id === itemId ? { ...i, enabled: !i.enabled } : i) } : d));
  };
  const addCustomDomain = () => {
    if (!newDomainName.trim() || domains.filter(d => d.custom).length >= 2) return;
    const id = `custom-${Date.now()}`;
    setDomains(prev => [...prev, { id, label: newDomainName.trim(), enabled: true, custom: true, items: [] }]);
    setNewDomainName("");
  };
  const addCustomCompetency = (domainId: string, text: string) => {
    if (!text.trim()) return;
    setDomains(prev => prev.map(d => d.id === domainId ? { ...d, items: [...d.items, { id: `ci-${Date.now()}`, text: text.trim(), enabled: true }] } : d));
  };
  const removeCustomDomain = (domainId: string) => {
    setDomains(prev => prev.filter(d => d.id !== domainId));
  };
  const removeCompetencyItem = (domainId: string, itemId: string) => {
    setDomains(prev => prev.map(d => d.id === domainId ? { ...d, items: d.items.filter(i => i.id !== itemId) } : d));
  };

  // Experience CRUD
  const addExperience = () => {
    if (!editingExp.poste.trim()) return;
    setExperiences(prev => [...prev, { ...editingExp, id: Date.now(), missions: editingExp.missions.filter(m => m.trim()) }]);
    setEditingExp({ id: 0, dateDebut: "", dateFin: "", aujourdhui: false, poste: "", entreprise: "", ville: "", missions: [], showLogo: true });
  };
  const removeExperience = (id: number) => setExperiences(prev => prev.filter(e => e.id !== id));
  const toggleExpLogo = (id: number) => setExperiences(prev => prev.map(e => e.id === id ? { ...e, showLogo: !e.showLogo } : e));
  const addMissionToEditing = () => {
    if (!newMission.trim()) return;
    setEditingExp(prev => ({ ...prev, missions: [...prev.missions, newMission.trim()] }));
    setNewMission("");
  };
  const removeMissionFromEditing = (idx: number) => {
    setEditingExp(prev => ({ ...prev, missions: prev.missions.filter((_, i) => i !== idx) }));
  };
  const MAX_EXPERIENCES = 5;

  // Formation CRUD
  const addFormation = () => {
    if (!editingFormation.intitule.trim()) return;
    setFormations(prev => [...prev, { ...editingFormation, id: Date.now() }]);
    setEditingFormation({ id: 0, dateDebut: "", dateFin: "", intitule: "", etablissement: "", ville: "" });
  };
  const removeFormation = (id: number) => setFormations(prev => prev.filter(f => f.id !== id));

  // Interests CRUD
  const addInterest = (text: string, category: InterestEntry["category"]) => {
    if (!text.trim()) return;
    setInterests(prev => [...prev, { id: Date.now(), text: text.trim(), icon: "", category }]);
  };
  const addCustomInterest = () => {
    if (!newInterestText.trim()) return;
    addInterest(newInterestText.trim(), "autre");
    setNewInterestText("");
  };
  const removeInterest = (id: number) => setInterests(prev => prev.filter(i => i.id !== id));

  // Qualities CRUD
  const addQuality = (text: string) => { if (text.trim() && !qualities.includes(text.trim())) setQualities(prev => [...prev, text.trim()]); };
  const removeQuality = (idx: number) => setQualities(prev => prev.filter((_, i) => i !== idx));
  const generateAIQualities = () => {
    const sectorQualities = QUALITIES_BY_SECTOR[detectedSector] || QUALITIES_BY_SECTOR.default;
    setQualities(sectorQualities);
    setQualitiesMode("ia");
  };

  // Company logo URL helper (Google S2 Favicon service - free, no API key)
  const getCompanyLogoUrl = (company: string): string | null => {
    if (!company || company.trim().length < 2) return null;
    const domain = company.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "") + ".com";
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  };

  const a4Ref = useRef<HTMLDivElement>(null);

  // Auto-detect sector when titre changes
  useEffect(() => {
    if (profile.titre.length > 2) {
      const sector = detectSector(profile.titre);
      setDetectedSector(sector);
      const cfg = sectorConfigs[sector];
      setActiveLayout(cfg.layouts[0]);
      setActivePalette(cfg.palettes[0]);
      // Auto-set bullet style per sector
      if (sector === "manuel") setBulletStyle("carres");
      else if (sector === "tertiaire" || sector === "creatif") setBulletStyle("fleches");
      else if (sector === "soin") setBulletStyle("cercles");
      else setBulletStyle("mixte");
    }
  }, [profile.titre]);

  const sectorCfg = sectorConfigs[detectedSector];
  const colors = activePalette;
  const experienceEntries = entries.filter(e => e.input !== "Atout");
  const atoutEntries = entries.filter(e => e.input === "Atout");

  const parseHslLightness = (hsl: string): number => {
    const match = hsl.match(/hsl\(\s*[\d.]+\s*,\s*[\d.]+%\s*,\s*([\d.]+)%\s*\)/i);
    return match ? Number(match[1]) : 100;
  };

  const isGradientDark = (from: string, to: string) => ((parseHslLightness(from) + parseHslLightness(to)) / 2) < 58;

  const getSectionBackgroundTone = (section: TextColorSection): "dark" | "light" => {
    if (section === "header") {
      if (activeGradient && gradientTarget === "rubriques") return isGradientDark(activeGradient.from, activeGradient.to) ? "dark" : "light";
      return "dark";
    }

    if (activeGradient && gradientTarget === "fond") {
      return isGradientDark(activeGradient.from, activeGradient.to) ? "dark" : "light";
    }

    return "light";
  };

  // Contrast warning logic
  const getContrastWarning = (section: TextColorSection): string | null => {
    const wantsWhiteText = textColors[section] === "blanc";
    const backgroundTone = getSectionBackgroundTone(section);

    if ((wantsWhiteText && backgroundTone === "light") || (!wantsWhiteText && backgroundTone === "dark")) {
      return "Attention, le texte risque d'être illisible à cause du manque de contraste !";
    }

    return null;
  };

  const handleTransform = () => {
    if (!input.trim()) return;
    setSearching(true);
    setTimeout(() => { setSuggestions(findSuggestions(input)); setSearching(false); }, 350);
  };
  const addEntry = (t: Transformation) => { setEntries(p => [...p, { id: Date.now(), input, selected: t.text, bullet: t.bullet }]); setInput(""); setSuggestions([]); setDispatchTarget(null); };
  const addAtout = (text: string) => { setEntries(p => [...p, { id: Date.now(), input: "Atout", selected: text, bullet: "action" }]); };
  const dispatchToCompetency = (text: string, domainId: string) => {
    addCustomCompetency(domainId, text);
    setDispatchTarget(null);
  };
  const dispatchToNewDomain = (text: string, domainLabel: string) => {
    const id = `custom-${Date.now()}`;
    setDomains(prev => [...prev, { id, label: domainLabel.trim(), enabled: true, custom: true, items: [{ id: `ci-${Date.now()}`, text: text.trim(), enabled: true }] }]);
    setDispatchTarget(null);
  };
  const removeEntry = (id: number) => { setEntries(p => p.filter(e => e.id !== id)); };
  const copyAll = () => {
    const symbols: Record<BulletType, string> = { action: "→", technique: "■", relationnel: "●" };
    navigator.clipboard.writeText(entries.map(e => `${symbols[e.bullet]} ${e.selected}`).join("\n"));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  const updateProfile = (field: keyof CvProfile, value: string) => setProfile(p => ({ ...p, [field]: value }));
  const updateTextColor = (section: TextColorSection, val: "noir" | "blanc") => setTextColors(p => ({ ...p, [section]: val }));

  const currentFont = fontOptions.find(f => f.id === selectedFont)?.family;
  const Template = templateRegistry[activeLayout];
  const activeDomains = domains.filter(d => d.enabled).map(d => ({ ...d, items: d.items.filter(i => i.enabled).map(i => ({ ...i, level: i.level })) })).filter(d => d.items.length > 0);
  const formationTitle = formationMode === "parcours" ? "Parcours de formation" : "Formation & Diplômes";
  const templateProps: TemplateProps = { profile, experienceEntries, atoutEntries, entries, removeEntry, colors, sidebarPos, bulletStyle, bulletShape: activeBulletShape || undefined, competencyBulletShape: competencyBulletShape || undefined, formationBulletShape: formationBulletShape || undefined, diversBulletShape: diversBulletShape || undefined, qualitesBulletShape: qualitesBulletShape || undefined, gradient: activeGradient || undefined, gradientTarget, bgCircleColor: bgCircleColor || undefined, textColors, titleColor: titleColor || undefined, fontFamily: currentFont, competencyDomains: activeDomains, professionalExperiences: experiences, removeProfessionalExperience: removeExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder: sectionOrder as any, qualities, removeQuality, levelDisplay };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            {/* Header */}
            <div className="animate-fade-up max-w-2xl mb-6">
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Méthode Fred · Générateur Next-Gen</p>
              <h1 className="text-3xl md:text-4xl tracking-tight mb-2">Générateur de CV</h1>
              <p className="text-muted-foreground">L'IA détecte votre secteur et propose les meilleurs designs 2026.</p>
            </div>

            {/* ═══ STEP 1: TITRE VISÉ — Hero block ═══ */}
            <div className="animate-fade-up-delay-1 mb-8 rounded-2xl p-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(24, 85%, 52%), hsl(24, 90%, 46%))",
                boxShadow: "0 8px 32px hsla(24, 85%, 52%, 0.25), 0 2px 8px hsla(24, 85%, 52%, 0.15)",
              }}>
              {/* Decorative blobs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20" style={{ background: "radial-gradient(circle, white, transparent)" }} />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white, transparent)" }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h2 className="text-white text-lg font-black tracking-tight">Quel poste visez-vous ?</h2>
                    <p className="text-white/70 text-xs">Saisissez votre titre — l'algorithme adapte tout automatiquement</p>
                  </div>
                </div>
                <input
                  value={profile.titre}
                  onChange={e => updateProfile("titre", e.target.value)}
                  placeholder="Ex : Commercial, Maçon, Développeur, Aide-soignant…"
                  className="w-full rounded-xl px-5 py-4 text-base font-semibold bg-white/95 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
                  style={{ backdropFilter: "blur(8px)" }}
                />

                {/* Sector detected badge + Suivant */}
                <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm text-white">
                    <span>{sectorCfg.emoji}</span>
                    <span className="font-medium">Secteur :</span>
                    <span className="font-black">{sectorCfg.label}</span>
                    <span className="text-white/50 text-xs ml-1">· {sectorCfg.layouts.length} modèles</span>
                  </div>

                  {profile.titre.length > 2 && step === "titre" && (
                    <button
                      onClick={() => setStep("details")}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-bold shadow-lg hover:shadow-xl transition-all active:scale-[0.97]"
                      style={{ color: "hsl(24, 85%, 45%)" }}
                    >
                      Suivant <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                  {step === "details" && (
                    <button
                      onClick={() => setStep("titre")}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 px-5 py-2 text-sm text-white font-medium hover:bg-white/25 transition-all active:scale-[0.97]"
                    >
                      ← Modifier le titre
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Layout selector */}
            <div className="animate-fade-up-delay-1 flex flex-wrap gap-3 mb-4">
              {sectorCfg.layouts.map(lid => {
                const meta = layoutMeta[lid];
                return (
                  <button key={lid} onClick={() => setActiveLayout(lid)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all active:scale-[0.97] ${activeLayout === lid ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-card text-foreground border border-border hover:shadow-md"}`}>
                    <span>{meta.emoji}</span>
                    <span>{meta.label}</span>
                    <span className={`text-[10px] hidden sm:inline ${activeLayout === lid ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{meta.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Palette + customization row */}
            <div className="animate-fade-up-delay-2 space-y-3 mb-8">
              {/* Row 1: Colors + Sidebar + Legacy bullets */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-xl bg-card border border-border px-4 py-2">
                  <Palette className="w-4 h-4 text-muted-foreground" />
                  {[whitePalette, ...sectorCfg.palettes].map(p => (
                    <button key={p.id} onClick={() => { setActivePalette(p); setActiveGradient(null); }} title={p.label}
                      className={`w-7 h-7 rounded-full transition-all active:scale-[0.95] ${activePalette.id === p.id && !activeGradient ? "ring-2 ring-offset-2 ring-ring scale-110" : "hover:scale-105"}`}
                      style={{ background: p.swatch, border: p.id === "blanc" ? "2px solid hsl(0,0%,85%)" : "none" }} />
                  ))}
                </div>
                {activeLayout === "impact" && (
                <div className="flex items-center gap-1.5 rounded-xl bg-card border border-border px-3 py-2">
                  <Settings2 className="w-4 h-4 text-muted-foreground" />
                  {(["left", "right", "top"] as SidebarPosition[]).map(pos => (
                    <button key={pos} onClick={() => setSidebarPos(pos)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${sidebarPos === pos ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
                      {pos === "left" ? "← Gauche" : pos === "right" ? "Droite →" : "↑ Haut"}
                    </button>
                  ))}
                </div>
                )}
              </div>

              {/* Row 2: Gradient library */}
              <div className="rounded-xl bg-card border border-border px-4 py-3">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-muted-foreground">🎨 Dégradés</span>
                  <div className="flex items-center gap-1 rounded-lg bg-secondary p-0.5">
                    {(["fond", "rubriques"] as const).map(t => (
                      <button key={t} onClick={() => setGradientTarget(t)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${gradientTarget === t ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                        {t === "fond" ? "Fond" : "Rubriques"}
                      </button>
                    ))}
                  </div>
                  {activeGradient && (
                    <button onClick={() => setActiveGradient(null)} className="text-[10px] text-muted-foreground hover:text-destructive transition-colors ml-auto">✕ Retirer</button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {gradientLibrary.map(g => (
                    <button key={g.id} onClick={() => setActiveGradient(g)} title={g.label}
                      className={`w-8 h-8 rounded-lg transition-all active:scale-[0.95] ${activeGradient?.id === g.id ? "ring-2 ring-offset-2 ring-ring scale-110" : "hover:scale-105"}`}
                      style={{ background: `linear-gradient(${g.angle || 135}deg, ${g.from}, ${g.to})`, boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }} />
                  ))}
                </div>
              </div>

              {/* Row 2.5: Background shape color — extended palette */}
              {activeLayout && (
                <div className="rounded-xl bg-card border border-border px-4 py-3">
                  <span className="text-xs font-semibold text-muted-foreground mb-2 block">🎨 Couleur des formes d'arrière-plan</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { c: "", label: "Auto" },
                      { c: "#1a1a1a", label: "Noir" },
                      { c: colors.primary, label: "Primaire" },
                      { c: colors.accent, label: "Accent" },
                      { c: "hsl(24,85%,52%)", label: "Orange" },
                      { c: "hsl(213,65%,38%)", label: "Bleu" },
                      { c: "hsl(150,40%,35%)", label: "Vert" },
                      { c: "hsl(350,60%,40%)", label: "Rouge" },
                      { c: "hsl(48,95%,55%)", label: "Jaune soleil" },
                      { c: "hsl(330,80%,55%)", label: "Rose fuchsia" },
                      { c: "hsl(285,50%,40%)", label: "Violet prune" },
                      { c: "hsl(28,90%,55%)", label: "Orange mandarine" },
                      { c: "hsl(178,65%,45%)", label: "Turquoise azur" },
                      { c: "hsl(220,8%,72%)", label: "Gris perle" },
                      { c: "hsl(200,70%,40%)", label: "Bleu océan" },
                      { c: "hsl(145,55%,38%)", label: "Émeraude" },
                      { c: "hsl(15,85%,55%)", label: "Corail" },
                      { c: "#ffffff", label: "Blanc" },
                    ].map(({ c, label }, i) => (
                      <button key={i} onClick={() => setBgCircleColor(c)} title={label}
                        className={`w-7 h-7 rounded-full transition-all active:scale-[0.95] ${bgCircleColor === c ? "ring-2 ring-offset-2 ring-ring scale-110" : "hover:scale-105"}`}
                        style={{ background: c || colors.accent, border: c === "#ffffff" ? "2px solid hsl(0,0%,85%)" : "none" }} />
                    ))}
                  </div>
                </div>
              )}


              {/* Row 5: Style du texte — font, text colors per section, title color */}
              <div className="rounded-xl bg-card border border-border px-4 py-3 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <Type className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-semibold text-muted-foreground">Style du texte</span>
                </div>

                {/* Font selector */}
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1.5 font-medium">Police (Nom & Coordonnées)</p>
                  <div className="flex flex-wrap gap-1.5">
                    {fontOptions.map(f => (
                      <button key={f.id} onClick={() => setSelectedFont(f.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-[0.97] ${selectedFont === f.id ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                        style={{ fontFamily: f.family }}>
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text color per section */}
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1.5 font-medium">Couleur du texte par rubrique</p>
                  <div className="space-y-2">
                    {([
                      { key: "header" as TextColorSection, label: "En-tête (Header)" },
                      { key: "experiences" as TextColorSection, label: "Expériences" },
                      { key: "competences" as TextColorSection, label: "Compétences" },
                    ]).map(s => (
                      <div key={s.key}>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-foreground font-medium w-28">{s.label}</span>
                          <div className="flex gap-1">
                            {(["noir", "blanc"] as const).map(c => (
                              <button key={c} onClick={() => updateTextColor(s.key, c)}
                                className={`px-3 py-1 rounded-md text-[10px] font-medium transition-all active:scale-[0.97] ${textColors[s.key] === c ? "ring-2 ring-ring shadow-sm" : "hover:bg-secondary"}`}
                                style={{ background: c === "noir" ? "hsl(215, 25%, 12%)" : "white", color: c === "noir" ? "white" : "hsl(215, 25%, 12%)", border: c === "blanc" ? "1px solid hsl(0,0%,85%)" : "none" }}>
                                {c === "noir" ? "Noir" : "Blanc"}
                              </button>
                            ))}
                          </div>
                          {getContrastWarning(s.key) && (
                            <span className="flex items-center gap-1 text-[9px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                              <AlertTriangle className="w-3 h-3" /> {getContrastWarning(s.key)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Title color */}
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1.5 font-medium">Couleur du Poste Visé</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "Auto", value: "" },
                      { label: "Noir", value: "hsl(215, 25%, 12%)" },
                      { label: "Blanc", value: "white" },
                      { label: "Orange Action", value: "hsl(24, 85%, 52%)" },
                      { label: "Bleu Profond", value: "hsl(213, 65%, 38%)" },
                      { label: "Vert Émeraude", value: "hsl(150, 40%, 35%)" },
                      { label: "Rouge Vif", value: "hsl(350, 70%, 50%)" },
                    ].map(c => (
                      <button key={c.label} onClick={() => setTitleColor(c.value)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all active:scale-[0.97] ${titleColor === c.value ? "ring-2 ring-ring shadow-sm" : "hover:bg-secondary"}`}
                        style={{ background: c.value || undefined, color: c.value && c.value !== "white" ? "white" : undefined, border: c.value === "white" ? "1px solid hsl(0,0%,85%)" : undefined }}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
               </div>

              {/* Row 6: Réorganiser les rubriques */}
              <div className="rounded-xl bg-card border border-border px-4 py-3 space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-semibold text-muted-foreground">Ordre des rubriques</span>
                </div>
                <p className="text-[10px] text-muted-foreground">L'en-tête reste fixe. Déplacez les rubriques ci-dessous.</p>
                <div className="space-y-1.5">
                  {sectionOrder.map((sec, idx) => (
                    <div key={sec} className="flex items-center gap-2 rounded-lg bg-secondary/50 border border-border px-3 py-2">
                      <GripVertical className="w-3.5 h-3.5 text-muted-foreground/50" />
                      <span className="text-xs font-medium text-foreground flex-1">{SECTION_LABELS[sec]}</span>
                      <button onClick={() => moveSectionUp(idx)} disabled={idx === 0}
                        className="p-1 rounded hover:bg-background transition-colors disabled:opacity-20">
                        <ArrowUp className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                      <button onClick={() => moveSectionDown(idx)} disabled={idx === sectionOrder.length - 1}
                        className="p-1 rounded hover:bg-background transition-colors disabled:opacity-20">
                        <ArrowDown className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ═══ STEP 2: Détails (shown after Suivant) ═══ */}
            {step === "details" && (
              <div className="grid lg:grid-cols-[1fr,minmax(460px,580px)] gap-8 items-start animate-fade-up">
                {/* LEFT — Controls */}
                <div className="space-y-5">
                  <div className="rounded-2xl bg-card p-5 shadow-sm border border-border/50 space-y-3">
                    <h3 className="font-semibold text-sm flex items-center gap-2"><User className="w-4 h-4 text-primary" />Informations personnelles</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {([
                        { key: "nom", placeholder: "Nom", required: true },
                        { key: "prenom", placeholder: "Prénom", required: true },
                        { key: "adresse", placeholder: "Adresse complète", full: true },
                        { key: "codePostal", placeholder: "Code Postal" },
                        { key: "ville", placeholder: "Ville", required: true },
                        { key: "telephone", placeholder: "Téléphone", required: true },
                        { key: "email", placeholder: "Email", required: true },
                      ] as { key: keyof CvProfile; placeholder: string; required?: boolean; full?: boolean }[]).map(f => (
                        <input key={f.key} value={profile[f.key]} onChange={e => updateProfile(f.key, e.target.value)}
                          placeholder={f.placeholder + (f.required ? " *" : "")}
                          className={`rounded-xl border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${f.full ? "sm:col-span-2" : ""}`} />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-card p-5 shadow-sm border border-border/50">
                    <h3 className="font-semibold text-sm flex items-center gap-2 mb-3"><Briefcase className="w-4 h-4 text-primary" />Saisissez une expérience ou tâche</h3>
                    <div className="flex gap-3">
                      <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleTransform()}
                        placeholder="Ex : agent de nettoyage, vente, cuisine…"
                        className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                      <button onClick={handleTransform} disabled={!input.trim() || searching}
                        className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-accent-foreground font-medium shadow-md hover:shadow-lg transition-shadow disabled:opacity-40 active:scale-[0.97]">
                        <Wand2 className={`w-4 h-4 ${searching ? "animate-spin" : ""}`} /> Transformer
                      </button>
                    </div>
                    <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5"><ModernBullet type="action" color="hsl(24, 85%, 52%)" /> Action</span>
                      <span className="inline-flex items-center gap-1.5"><ModernBullet type="technique" color="hsl(213, 65%, 38%)" /> Technique</span>
                      <span className="inline-flex items-center gap-1.5"><ModernBullet type="relationnel" color="hsl(24, 85%, 52%)" /> Relationnel</span>
                    </div>
                    {suggestions.length > 0 && (
                      <div className="mt-5 space-y-3">
                        <p className="text-sm text-muted-foreground">Compétences suggérées pour « <span className="font-medium text-foreground">{input}</span> » :</p>
                        {suggestions.map((s, i) => (
                          <div key={i} className="rounded-xl border border-border bg-background overflow-hidden">
                            <button onClick={() => addEntry(s)}
                              className="w-full text-left p-3.5 hover:bg-secondary/50 transition-all active:scale-[0.98] group flex items-start gap-3">
                              <span className="mt-0.5"><ModernBullet type={s.bullet} color={s.bullet === "technique" ? "hsl(213, 65%, 38%)" : "hsl(24, 85%, 52%)"} /></span>
                              <span className="text-sm leading-relaxed flex-1">{s.text}</span>
                              <Plus className="w-4 h-4 ml-auto mt-0.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            </button>
                            {/* ── Dispatch to competency domain ── */}
                            <div className="border-t border-border/50 bg-secondary/30 px-3.5 py-2.5 flex flex-wrap items-center gap-2">
                              <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1"><Send className="w-3 h-3" /> Envoyer vers :</span>
                              {domains.filter(d => d.enabled).map(d => (
                                <button key={d.id}
                                  onClick={() => setDispatchTarget(dispatchTarget === `${i}-${d.id}` ? null : `${i}-${d.id}`)}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all active:scale-[0.97] ${dispatchTarget === `${i}-${d.id}` ? "bg-primary text-primary-foreground shadow-sm" : "bg-background border border-border text-foreground hover:bg-accent/20"}`}>
                                  {d.label}
                                </button>
                              ))}
                              <button
                                onClick={() => {
                                  const name = prompt("Nom du nouveau domaine :");
                                  if (name && name.trim()) dispatchToNewDomain(s.text, name);
                                }}
                                className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-background border border-dashed border-primary/40 text-primary hover:bg-primary/5 transition-all active:scale-[0.97] flex items-center gap-1">
                                <FolderPlus className="w-3 h-3" /> Nouveau
                              </button>
                              {dispatchTarget?.startsWith(`${i}-`) && (
                                <button
                                  onClick={() => {
                                    const domainId = dispatchTarget.split("-").slice(1).join("-");
                                    dispatchToCompetency(s.text, domainId);
                                  }}
                                  className="ml-auto px-3 py-1 rounded-lg text-[10px] font-bold bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all active:scale-[0.97] flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Insérer
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ═══ Dynamic Section Panels — follow sectionOrder ═══ */}
                  {sectionOrder.map(sec => {
                    if (sec === "experiences") return (
                      <div key="experiences" className="rounded-2xl bg-card p-5 shadow-sm border border-border/50 space-y-4">
                        <h3 className="font-semibold text-sm flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /> EXPÉRIENCE PROFESSIONNELLE</h3>

                        {/* Puces Expériences — encapsulated */}
                        <div className="rounded-xl bg-secondary/40 border border-border px-4 py-3">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-semibold text-muted-foreground">✦ Puces Expériences</span>
                            {activeBulletShape && (
                              <button onClick={() => setActiveBulletShape(null)} className="text-[10px] text-muted-foreground hover:text-destructive transition-colors ml-auto">✕ Auto</button>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {bulletShapes.map(bs => (
                              <button key={bs.id} onClick={() => setActiveBulletShape(bs.id)} title={bs.label}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all active:scale-[0.95] ${activeBulletShape === bs.id ? "bg-primary text-primary-foreground ring-2 ring-offset-1 ring-ring" : "bg-secondary text-muted-foreground hover:bg-accent/20"}`}>
                                <ShapeBullet shape={bs.id} color={activeBulletShape === bs.id ? "white" : "currentColor"} />
                              </button>
                            ))}
                          </div>
                        </div>

                        {experiences.length >= MAX_EXPERIENCES && (
                          <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-[11px] text-amber-700">
                            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                            <p>Attention, pour tenir sur une page, privilégiez vos <strong>3 à 5 expériences</strong> les plus récentes ou significatives.</p>
                          </div>
                        )}

                        {/* Existing experiences list */}
                        {experiences.map(exp => (
                          <div key={exp.id} className="rounded-xl border border-border bg-background p-3.5 space-y-1.5">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-2.5">
                                {exp.showLogo && exp.entreprise && (
                                  <img src={getCompanyLogoUrl(exp.entreprise)!} alt="" className="w-6 h-6 rounded mt-0.5 object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                )}
                                <div>
                                  <p className="text-sm font-bold text-foreground">{exp.poste}</p>
                                  <p className="text-xs text-muted-foreground">{exp.entreprise}{exp.ville ? `, ${exp.ville}` : ""}</p>
                                  <p className="text-[10px] text-muted-foreground">{exp.dateDebut}{exp.aujourdhui ? " — Aujourd'hui" : exp.dateFin ? ` — ${exp.dateFin}` : ""}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <button onClick={() => toggleExpLogo(exp.id)} className="text-muted-foreground hover:text-primary transition-colors" title={exp.showLogo ? "Masquer le logo" : "Afficher le logo"}>
                                  {exp.showLogo ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                                </button>
                                <button onClick={() => removeExperience(exp.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </div>
                            {exp.missions.length > 0 && (
                              <ul className="space-y-0.5">
                                {exp.missions.map((m, mi) => (
                                  <li key={mi} className="flex items-center gap-2 text-[11px] text-foreground">
                                    <span className="flex-shrink-0"><ModernBullet type="action" color="hsl(24, 85%, 52%)" style={bulletStyle} shape={activeBulletShape || undefined} /></span>
                                    <span className="flex-1">{m}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}

                        {/* New experience form */}
                        <div className="rounded-xl border border-dashed border-primary/30 bg-primary/[0.02] p-4 space-y-3">
                          <p className="text-xs font-semibold text-primary">+ Nouvelle expérience</p>
                          <div className="grid sm:grid-cols-2 gap-2">
                            <div className="flex gap-2 items-center">
                              <input value={editingExp.dateDebut} onChange={e => setEditingExp(p => ({ ...p, dateDebut: e.target.value }))}
                                placeholder="MM/AAAA (ex: 01/2022)" className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                              <span className="text-muted-foreground text-xs">—</span>
                              {editingExp.aujourdhui ? (
                                <span className="flex-1 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs text-primary font-medium text-center">Aujourd'hui</span>
                              ) : (
                                <input value={editingExp.dateFin} onChange={e => setEditingExp(p => ({ ...p, dateFin: e.target.value }))}
                                  placeholder="MM/AAAA (ex: 09/2024)" className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                              )}
                            </div>
                            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                              <input type="checkbox" checked={editingExp.aujourdhui} onChange={e => setEditingExp(p => ({ ...p, aujourdhui: e.target.checked, dateFin: "" }))} className="rounded border-primary text-primary focus:ring-primary" />
                              Poste actuel
                            </label>
                          </div>
                          <input value={editingExp.poste} onChange={e => setEditingExp(p => ({ ...p, poste: e.target.value }))}
                            placeholder="Intitulé du poste *" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-semibold placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                          <div className="grid sm:grid-cols-2 gap-2">
                            <input value={editingExp.entreprise} onChange={e => setEditingExp(p => ({ ...p, entreprise: e.target.value }))}
                              placeholder="Nom de l'entreprise" className="rounded-lg border border-input bg-background px-3 py-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                            <input value={editingExp.ville} onChange={e => setEditingExp(p => ({ ...p, ville: e.target.value }))}
                              placeholder="Ville" className="rounded-lg border border-input bg-background px-3 py-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                          </div>

                          {/* Missions */}
                          <div className="space-y-2">
                            <p className="text-[10px] text-muted-foreground font-medium">Missions & Tâches</p>
                            {editingExp.missions.map((m, mi) => (
                              <div key={mi} className="flex items-center gap-2 text-xs text-foreground bg-background rounded-lg px-3 py-1.5 border border-border">
                                <span className="flex-shrink-0"><ModernBullet type="action" color="hsl(24, 85%, 52%)" style={bulletStyle} shape={activeBulletShape || undefined} /></span>
                                <span className="flex-1">{m}</span>
                                <button onClick={() => removeMissionFromEditing(mi)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            ))}
                            <div className="flex gap-2">
                              <input value={newMission} onChange={e => setNewMission(e.target.value)} onKeyDown={e => e.key === "Enter" && addMissionToEditing()}
                                placeholder="Décrivez une mission…" className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                              <button onClick={addMissionToEditing} disabled={!newMission.trim()}
                                className="rounded-lg bg-accent px-3 py-2 text-accent-foreground text-xs font-medium disabled:opacity-40 active:scale-[0.97]">
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <button onClick={addExperience} disabled={!editingExp.poste.trim()}
                            className="w-full rounded-xl bg-primary px-4 py-2.5 text-primary-foreground text-sm font-medium shadow-sm hover:shadow-md transition-all disabled:opacity-40 active:scale-[0.97]">
                            Ajouter cette expérience
                          </button>
                        </div>
                      </div>
                    );

                    if (sec === "formation") return (
                      <div key="formation" className="rounded-2xl bg-card p-5 shadow-sm border border-border/50 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm flex items-center gap-2"><GraduationCap className="w-4 h-4 text-primary" /> {formationTitle}</h3>
                          <div className="flex items-center gap-1 rounded-lg bg-secondary p-0.5">
                            {(["diplomes", "parcours"] as const).map(m => (
                              <button key={m} onClick={() => setFormationMode(m)}
                                className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${formationMode === m ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                                {m === "diplomes" ? "Diplômes" : "Parcours"}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Puces Formation */}
                        <div className="rounded-xl bg-secondary/40 border border-border px-4 py-3">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-semibold text-muted-foreground">✦ Puces Formation</span>
                            {formationBulletShape && (
                              <button onClick={() => setFormationBulletShape(null)} className="text-[10px] text-muted-foreground hover:text-destructive transition-colors ml-auto">✕ Auto</button>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {bulletShapes.map(bs => (
                              <button key={bs.id} onClick={() => setFormationBulletShape(bs.id)} title={bs.label}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all active:scale-[0.95] ${formationBulletShape === bs.id ? "bg-primary text-primary-foreground ring-2 ring-offset-1 ring-ring" : "bg-secondary text-muted-foreground hover:bg-accent/20"}`}>
                                <ShapeBullet shape={bs.id} color={formationBulletShape === bs.id ? "white" : "currentColor"} />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Existing formations */}
                        {formations.map(f => (
                          <div key={f.id} className="rounded-xl border border-border bg-background p-3.5 space-y-0.5">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm font-bold text-foreground">{f.intitule}</p>
                                <p className="text-xs text-muted-foreground">{f.etablissement}{f.ville ? `, ${f.ville}` : ""}</p>
                                <p className="text-[10px] text-muted-foreground">{f.dateDebut}{f.dateFin ? ` — ${f.dateFin}` : ""}</p>
                              </div>
                              <button onClick={() => removeFormation(f.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>
                        ))}

                        {/* New formation form */}
                        <div className="rounded-xl border border-dashed border-primary/30 bg-primary/[0.02] p-4 space-y-3">
                          <p className="text-xs font-semibold text-primary">+ {formationMode === "parcours" ? "Nouvelle formation" : "Nouveau diplôme"}</p>
                          <div className="grid sm:grid-cols-2 gap-2">
                            <input value={editingFormation.dateDebut} onChange={e => setEditingFormation(p => ({ ...p, dateDebut: e.target.value }))}
                              placeholder="MM/AAAA (ex: 09/2018)" className="rounded-lg border border-input bg-background px-3 py-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                            <input value={editingFormation.dateFin} onChange={e => setEditingFormation(p => ({ ...p, dateFin: e.target.value }))}
                              placeholder="MM/AAAA (ex: 06/2020)" className="rounded-lg border border-input bg-background px-3 py-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                          </div>
                          <input value={editingFormation.intitule} onChange={e => setEditingFormation(p => ({ ...p, intitule: e.target.value }))}
                            placeholder={formationMode === "parcours" ? "Intitulé de la formation / VAE *" : "Intitulé du diplôme *"}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-semibold placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                          <div className="grid sm:grid-cols-2 gap-2">
                            <input value={editingFormation.etablissement} onChange={e => setEditingFormation(p => ({ ...p, etablissement: e.target.value }))}
                              placeholder="Nom de l'école / organisme" className="rounded-lg border border-input bg-background px-3 py-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                            <input value={editingFormation.ville} onChange={e => setEditingFormation(p => ({ ...p, ville: e.target.value }))}
                              placeholder="Ville" className="rounded-lg border border-input bg-background px-3 py-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                          </div>
                          <button onClick={addFormation} disabled={!editingFormation.intitule.trim()}
                            className="w-full rounded-xl bg-primary px-4 py-2.5 text-primary-foreground text-sm font-medium shadow-sm hover:shadow-md transition-all disabled:opacity-40 active:scale-[0.97]">
                            Ajouter
                          </button>
                        </div>

                        {formations.length > 3 && (
                          <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-[11px] text-amber-700">
                            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                            <p>Pour tenir sur une page A4, limitez-vous à <strong>2-3 formations</strong> maximum ou passez en mise en page deux colonnes.</p>
                          </div>
                        )}
                      </div>
                    );

                    if (sec === "competences") return (
                      <div key="competences" className="rounded-2xl bg-card p-5 shadow-sm border border-border/50 space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h3 className="font-semibold text-sm flex items-center gap-2"><Layers className="w-4 h-4 text-primary" /> COMPÉTENCES PAR DOMAINE</h3>
                          <div className="flex items-center gap-2">
                            <Gauge className="w-3.5 h-3.5 text-muted-foreground" />
                            <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${usagePercent}%`, background: isOverloaded ? "hsl(0, 70%, 55%)" : usagePercent > 75 ? "hsl(35, 90%, 55%)" : "hsl(150, 50%, 45%)" }} />
                            </div>
                            <span className={`text-[10px] font-medium ${isOverloaded ? "text-red-500" : "text-muted-foreground"}`}>{activeCompetencyCount}/{maxCompetencies}</span>
                          </div>
                        </div>

                        {/* Level display mode */}
                        <div className="rounded-xl bg-secondary/40 border border-border px-4 py-3">
                          <p className="text-xs font-semibold text-muted-foreground mb-2">📊 Indicateurs de niveau</p>
                          <div className="flex items-center gap-1 rounded-lg bg-secondary p-0.5">
                            {(["none", "dots", "bars"] as const).map(m => (
                              <button key={m} onClick={() => setLevelDisplay(m)}
                                className={`px-3 py-1.5 rounded-md text-[10px] font-medium transition-all ${levelDisplay === m ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                                {m === "none" ? "Masqué" : m === "dots" ? "●●●○○ Points" : "▬▬▬ Barres"}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Puces Compétences — encapsulated */}
                        <div className="rounded-xl bg-secondary/40 border border-border px-4 py-3">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-semibold text-muted-foreground">✦ Puces Compétences</span>
                            {competencyBulletShape && (
                              <button onClick={() => setCompetencyBulletShape(null)} className="text-[10px] text-muted-foreground hover:text-destructive transition-colors ml-auto">✕ Auto</button>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {bulletShapes.map(bs => (
                              <button key={bs.id} onClick={() => setCompetencyBulletShape(bs.id)} title={bs.label}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all active:scale-[0.95] ${competencyBulletShape === bs.id ? "bg-accent text-accent-foreground ring-2 ring-offset-1 ring-ring" : "bg-secondary text-muted-foreground hover:bg-accent/20"}`}>
                                <ShapeBullet shape={bs.id} color={competencyBulletShape === bs.id ? "white" : "currentColor"} />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Predictive hint */}
                        <p className="text-[10px] text-muted-foreground bg-secondary/50 rounded-lg px-3 py-1.5">
                          💡 Le modèle <span className="font-bold text-foreground">{layoutMeta[activeLayout].label}</span> accepte idéalement <span className="font-bold text-foreground">{maxCompetencies} compétences</span> max pour une mise en page A4 optimale.
                        </p>

                        {/* Overload alert */}
                        {isOverloaded && (
                          <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-[11px] text-red-700">
                            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                            <p>Votre CV est trop chargé. Pour une lecture optimale, choisissez vos <strong>4 domaines</strong> et <strong>4 sous-compétences</strong> les plus percutants.</p>
                          </div>
                        )}

                        {/* Domain list */}
                        <div className="space-y-3">
                          {domains.map(domain => (
                            <div key={domain.id} className={`rounded-xl border transition-all ${domain.enabled ? "border-primary/20 bg-primary/[0.02]" : "border-border bg-secondary/30 opacity-60"}`}>
                              <div className="flex items-center gap-2 px-4 py-2.5">
                                <button onClick={() => toggleDomain(domain.id)} className="text-primary">
                                  {domain.enabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5 text-muted-foreground" />}
                                </button>
                                <span className={`text-xs font-semibold flex-1 ${domain.enabled ? "text-foreground" : "text-muted-foreground"}`}>{domain.label}</span>
                                <span className="text-[10px] text-muted-foreground">{domain.items.filter(i => i.enabled).length}/{domain.items.length}</span>
                                {domain.custom && (
                                  <button onClick={() => removeCustomDomain(domain.id)} className="text-muted-foreground hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                                )}
                              </div>
                              {domain.enabled && (
                                <div className="px-4 pb-3 space-y-1.5">
                                  {domain.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-2 group">
                                      <input type="checkbox" checked={item.enabled} onChange={() => {
                                        if (!item.enabled && isOverloaded) return;
                                        toggleCompetencyItem(domain.id, item.id);
                                      }} className="rounded border-primary text-primary focus:ring-primary flex-shrink-0" disabled={!item.enabled && isOverloaded} />
                                      <span className={`text-[11px] leading-relaxed flex-1 ${item.enabled ? "text-foreground" : "text-muted-foreground line-through"}`}>{item.text}</span>
                                      {/* Level selector dots */}
                                      {levelDisplay !== "none" && item.enabled && (
                                        <div className="flex gap-0.5 flex-shrink-0">
                                          {[1, 2, 3, 4, 5].map(l => (
                                            <button key={l} onClick={() => {
                                              setDomains(prev => prev.map(d => d.id === domain.id ? { ...d, items: d.items.map(i => i.id === item.id ? { ...i, level: l } : i) } : d));
                                            }}
                                              className={`w-3.5 h-3.5 rounded-full transition-all ${(item.level || 0) >= l ? "bg-accent" : "bg-secondary border border-border"}`}
                                              title={`Niveau ${l}/5`} />
                                          ))}
                                        </div>
                                      )}
                                      {domain.custom && (
                                        <button onClick={() => removeCompetencyItem(domain.id, item.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 transition-all"><Trash2 className="w-3 h-3" /></button>
                                      )}
                                    </div>
                                  ))}
                                  {/* Add custom competency to domain */}
                                  <div className="flex gap-2 mt-2">
                                    <input placeholder="Ajouter une compétence…" className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-[11px] placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                      onKeyDown={e => { if (e.key === "Enter") { addCustomCompetency(domain.id, (e.target as HTMLInputElement).value); (e.target as HTMLInputElement).value = ""; } }} />
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Add custom domain */}
                        {domains.filter(d => d.custom).length < 2 && (
                          <div className="flex gap-2">
                            <input value={newDomainName} onChange={e => setNewDomainName(e.target.value)} placeholder="Nouveau domaine personnalisé…"
                              className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                              onKeyDown={e => e.key === "Enter" && addCustomDomain()} />
                            <button onClick={addCustomDomain} disabled={!newDomainName.trim()}
                              className="rounded-xl bg-primary px-4 py-2.5 text-primary-foreground text-sm font-medium shadow-sm hover:shadow-md transition-all disabled:opacity-40 active:scale-[0.97]">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    );

                    if (sec === "qualites") return (
                      <div key="qualites" className="rounded-2xl bg-card p-5 shadow-sm border border-border/50 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm flex items-center gap-2"><Heart className="w-4 h-4 text-primary" /> QUALITÉS</h3>
                          <div className="flex items-center gap-1 rounded-lg bg-secondary p-0.5">
                            {(["libre", "ia"] as const).map(m => (
                              <button key={m} onClick={() => m === "ia" ? generateAIQualities() : setQualitiesMode(m)}
                                className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${qualitiesMode === m ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                                {m === "libre" ? "Saisie libre" : "✨ Générer par IA"}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Puces Qualités */}
                        <div className="rounded-xl bg-secondary/40 border border-border px-4 py-3">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-semibold text-muted-foreground">✦ Puces Qualités</span>
                            {qualitesBulletShape && (
                              <button onClick={() => setQualitesBulletShape(null)} className="text-[10px] text-muted-foreground hover:text-destructive transition-colors ml-auto">✕ Auto</button>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {bulletShapes.map(bs => (
                              <button key={bs.id} onClick={() => setQualitesBulletShape(bs.id)} title={bs.label}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all active:scale-[0.95] ${qualitesBulletShape === bs.id ? "bg-primary text-primary-foreground ring-2 ring-offset-1 ring-ring" : "bg-secondary text-muted-foreground hover:bg-accent/20"}`}>
                                <ShapeBullet shape={bs.id} color={qualitesBulletShape === bs.id ? "white" : "currentColor"} />
                              </button>
                            ))}
                          </div>
                        </div>

                        {qualitiesMode === "ia" && qualities.length > 0 && (
                          <p className="text-[10px] text-muted-foreground bg-secondary/50 rounded-lg px-3 py-1.5">
                            ✨ Qualités suggérées pour le secteur <span className="font-bold text-foreground">{sectorCfg.label}</span>. Modifiez ou ajoutez les vôtres.
                          </p>
                        )}

                        {qualities.length > 0 && (
                          <div className="space-y-1">
                            {qualities.map((q, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-foreground bg-background rounded-lg px-3 py-1.5 border border-border">
                                <span className="flex-shrink-0"><ShapeBullet shape={qualitesBulletShape || "cercle"} color={colors.accent} /></span>
                                <span className="flex-1">{q}</span>
                                <button onClick={() => removeQuality(idx)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <input value={newQualityText} onChange={e => setNewQualityText(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { addQuality(newQualityText); setNewQualityText(""); } }}
                            placeholder="Ajouter une qualité…"
                            className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                          <button onClick={() => { addQuality(newQualityText); setNewQualityText(""); }} disabled={!newQualityText.trim()}
                            className="rounded-xl bg-primary px-4 py-2.5 text-primary-foreground text-sm font-medium shadow-sm hover:shadow-md transition-all disabled:opacity-40 active:scale-[0.97]">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );

                    if (sec === "divers") return (
                      <div key="divers" className="rounded-2xl bg-card p-5 shadow-sm border border-border/50 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm flex items-center gap-2">🎯 DIVERS & CENTRES D'INTÉRÊT</h3>
                          <div className="flex items-center gap-1 rounded-lg bg-secondary p-0.5">
                            {(["badges", "list"] as const).map(m => (
                              <button key={m} onClick={() => setInterestDisplayMode(m)}
                                className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${interestDisplayMode === m ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                                {m === "badges" ? "Badges" : "Liste"}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Puces Divers */}
                        <div className="rounded-xl bg-secondary/40 border border-border px-4 py-3">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-semibold text-muted-foreground">✦ Puces Divers</span>
                            {diversBulletShape && (
                              <button onClick={() => setDiversBulletShape(null)} className="text-[10px] text-muted-foreground hover:text-destructive transition-colors ml-auto">✕ Auto</button>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {bulletShapes.map(bs => (
                              <button key={bs.id} onClick={() => setDiversBulletShape(bs.id)} title={bs.label}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all active:scale-[0.95] ${diversBulletShape === bs.id ? "bg-primary text-primary-foreground ring-2 ring-offset-1 ring-ring" : "bg-secondary text-muted-foreground hover:bg-accent/20"}`}>
                                <ShapeBullet shape={bs.id} color={diversBulletShape === bs.id ? "white" : "currentColor"} />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Quick suggestions */}
                        <div className="flex flex-wrap gap-1.5">
                          {INTEREST_SUGGESTIONS.filter(s => !interests.some(i => i.text === s.text)).map(s => (
                            <button key={s.text} onClick={() => addInterest(s.text, s.category)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] border border-border bg-background hover:bg-secondary hover:shadow-sm transition-all active:scale-[0.97]">
                              {s.text}
                            </button>
                          ))}
                        </div>

                        {interests.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {interests.map(i => (
                              <span key={i.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-primary/5 border border-primary/15 text-foreground">
                                {i.text}
                                <button onClick={() => removeInterest(i.id)} className="text-muted-foreground hover:text-destructive transition-colors ml-0.5"><Trash2 className="w-3 h-3" /></button>
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <input value={newInterestText} onChange={e => setNewInterestText(e.target.value)} onKeyDown={e => e.key === "Enter" && addCustomInterest()}
                            placeholder="Ajouter un centre d'intérêt personnalisé…"
                            className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                          <button onClick={addCustomInterest} disabled={!newInterestText.trim()}
                            className="rounded-xl bg-primary px-4 py-2.5 text-primary-foreground text-sm font-medium shadow-sm hover:shadow-md transition-all disabled:opacity-40 active:scale-[0.97]">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {interests.length > 6 && (
                          <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-[11px] text-amber-700">
                            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                            <p>Cette rubrique est votre variable d'ajustement. <strong>4-5 éléments</strong> suffisent pour un CV professionnel.</p>
                          </div>
                        )}
                      </div>
                    );

                    return null;
                  })}

                  <div className="rounded-2xl bg-accent/8 border border-accent/20 p-5">
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-accent" /> Atouts à valoriser</h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {atouts.map(a => (
                        <button key={a} onClick={() => addAtout(a)}
                          className="text-left rounded-xl border border-border bg-background p-3 text-sm hover:bg-secondary hover:shadow-sm transition-all active:scale-[0.98] group flex items-center gap-2">
                          <Plus className="w-3.5 h-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />{a}
                        </button>
                      ))}
                    </div>
                  </div>

                  {entries.length > 0 && (
                    <button onClick={copyAll}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-primary-foreground font-medium shadow-md hover:shadow-lg transition-shadow active:scale-[0.97]">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copié !" : "Copier toutes les compétences"}
                    </button>
                  )}
                </div>

                {/* RIGHT — A4 Preview */}
                <div className="animate-fade-up-delay-2 sticky top-20">
                  <div ref={a4Ref}
                    className="bg-white rounded-2xl overflow-hidden mx-auto"
                    style={{
                      aspectRatio: "210 / 297",
                      maxHeight: "82vh",
                      boxShadow: `0 4px 24px -4px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04), 0 20px 40px -12px ${colors.primary}15`,
                    }}>
                    <A4AutoFitWrapper className="w-full h-full">
                      {Template && <Template {...templateProps} />}
                    </A4AutoFitWrapper>
                  </div>
                </div>
              </div>
            )}

            {/* A4 Preview shown even in step titre (below) */}
            {step === "titre" && profile.titre.length > 2 && (
              <div className="animate-fade-up max-w-xl mx-auto">
                <p className="text-center text-sm text-muted-foreground mb-4">Aperçu du modèle <span className="font-bold text-foreground">{layoutMeta[activeLayout].label}</span></p>
                <div
                  className="bg-white rounded-2xl overflow-hidden mx-auto"
                  style={{
                    aspectRatio: "210 / 297",
                    maxHeight: "50vh",
                    boxShadow: `0 4px 24px -4px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04), 0 20px 40px -12px ${colors.primary}15`,
                  }}>
                  <A4AutoFitWrapper className="w-full h-full">
                    {Template && <Template {...templateProps} />}
                  </A4AutoFitWrapper>
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
