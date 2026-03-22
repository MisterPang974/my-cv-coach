import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Wand2, Copy, Check, Plus, Trash2, ArrowRight, Square, Circle,
  User, Briefcase, Mail, Phone, MapPin, Palette, Layers, Pen, Zap,
  Shield, Clock, Eye, Star, ChevronRight, Sparkles
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────
type BulletType = "action" | "technique" | "relationnel";
type ThemeId = "impact" | "artisan" | "creatif";
type ColorId = "bleu" | "emeraude" | "orange" | "anthracite";

interface Transformation { text: string; bullet: BulletType; }
interface CvEntry { id: number; input: string; selected: string; bullet: BulletType; }
interface CvProfile { nom: string; titre: string; email: string; telephone: string; ville: string; }

// ─── Themes ────────────────────────────────────────────────────────
const themes: Record<ThemeId, { label: string; icon: React.ReactNode; desc: string }> = {
  impact: { label: "L'Impact", icon: <Zap className="w-4 h-4" />, desc: "Moderne / Tech" },
  artisan: { label: "L'Artisan", icon: <Pen className="w-4 h-4" />, desc: "Organique / Solide" },
  creatif: { label: "Le Créatif", icon: <Sparkles className="w-4 h-4" />, desc: "Audacieux" },
};

const colorPalettes: Record<ColorId, { label: string; primary: string; accent: string; swatch: string }> = {
  bleu: { label: "Bleu Profond", primary: "hsl(213, 65%, 28%)", accent: "hsl(213, 80%, 55%)", swatch: "hsl(213, 65%, 38%)" },
  emeraude: { label: "Vert Émeraude", primary: "hsl(160, 60%, 28%)", accent: "hsl(160, 70%, 45%)", swatch: "hsl(160, 60%, 38%)" },
  orange: { label: "Orange Brûlé", primary: "hsl(20, 75%, 35%)", accent: "hsl(24, 85%, 52%)", swatch: "hsl(20, 75%, 42%)" },
  anthracite: { label: "Gris Anthracite", primary: "hsl(220, 10%, 22%)", accent: "hsl(220, 15%, 45%)", swatch: "hsl(220, 10%, 30%)" },
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

// ─── Bullet SVG Icons (modern styled) ──────────────────────────────
const ModernBullet = ({ type, color }: { type: BulletType; color: string }) => {
  const size = 14;
  switch (type) {
    case "action":
      return (
        <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
          <path d="M3 7h6M9 4l3 3-3 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "technique":
      return (
        <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
          <rect x="2" y="2" width="10" height="10" rx="2" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" />
        </svg>
      );
    case "relationnel":
      return (
        <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" />
        </svg>
      );
  }
};

// ─── A4 Preview Components per Theme ───────────────────────────────
const ImpactPreview = ({ profile, experienceEntries, atoutEntries, entries, removeEntry, colors }: any) => (
  <div className="h-full flex text-[11px] leading-[1.6] font-sans" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
    {/* Sidebar */}
    <div className="w-[38%] flex flex-col" style={{ background: colors.primary }}>
      <div className="px-5 pt-8 pb-5">
        {/* Avatar placeholder */}
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white/30 text-2xl font-bold"
          style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)" }}>
          {profile.nom ? profile.nom[0]?.toUpperCase() : "?"}
        </div>
        <h2 className="text-white text-center text-sm font-bold tracking-wide">{profile.nom || "Votre Nom"}</h2>
        <p className="text-white/60 text-center text-[10px] mt-0.5">{profile.titre || "Titre du poste"}</p>
      </div>

      <div className="px-5 space-y-3 flex-1">
        {/* Contact */}
        <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}>
          <p className="text-[9px] text-white/40 uppercase tracking-widest font-semibold mb-2">Contact</p>
          <div className="space-y-1.5 text-white/70 text-[10px]">
            {profile.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3 flex-shrink-0" /><span className="truncate">{profile.email}</span></div>}
            {profile.telephone && <div className="flex items-center gap-2"><Phone className="w-3 h-3 flex-shrink-0" /><span>{profile.telephone}</span></div>}
            {profile.ville && <div className="flex items-center gap-2"><MapPin className="w-3 h-3 flex-shrink-0" /><span>{profile.ville}</span></div>}
          </div>
        </div>

        {/* Atouts */}
        <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}>
          <p className="text-[9px] text-white/40 uppercase tracking-widest font-semibold mb-2">Atouts</p>
          {atoutEntries.length > 0 ? (
            <ul className="space-y-1.5">
              {atoutEntries.map((e: CvEntry) => (
                <li key={e.id} className="flex items-start gap-2 text-white/80 text-[10px] group/del">
                  <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} />
                  <span className="flex-1">{e.selected}</span>
                  <button onClick={() => removeEntry(e.id)} className="opacity-0 group-hover/del:opacity-100 text-white/30 hover:text-red-400 transition-opacity"><Trash2 className="w-2.5 h-2.5" /></button>
                </li>
              ))}
            </ul>
          ) : <p className="text-white/30 italic text-[9px]">Ajoutez des atouts…</p>}
        </div>
      </div>

      <div className="px-5 py-3 text-[8px] text-white/20 text-center">My CV Coach · Méthode Fred</div>
    </div>

    {/* Main content */}
    <div className="flex-1 flex flex-col bg-white">
      {/* Top accent line */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.primary})` }} />
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 pb-2 flex items-center gap-2" style={{ color: colors.primary, borderBottom: `2px solid ${colors.accent}` }}>
          <Layers className="w-3.5 h-3.5" />
          Compétences professionnelles
        </h3>
        {experienceEntries.length > 0 ? (
          <ul className="space-y-2">
            {experienceEntries.map((entry: CvEntry) => (
              <li key={entry.id} className="flex items-start gap-2.5 group/item rounded-lg px-2.5 py-1.5 hover:bg-gray-50 transition-colors">
                <span className="mt-0.5 flex-shrink-0"><ModernBullet type={entry.bullet} color={entry.bullet === "technique" ? colors.primary : colors.accent} /></span>
                <span className="flex-1 text-gray-700">{entry.selected}</span>
                <button onClick={() => removeEntry(entry.id)} className="opacity-0 group-hover/item:opacity-100 text-gray-300 hover:text-red-400 transition-opacity"><Trash2 className="w-3 h-3" /></button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-gray-100 p-6 text-center mt-4">
            <Briefcase className="w-8 h-8 text-gray-200 mx-auto mb-2" />
            <p className="text-gray-300 text-[10px] font-medium">Votre CV se construit ici en temps réel</p>
            <p className="text-gray-200 text-[9px] mt-1">Style télégraphique · Verbes d'action · Pas de « Je… »</p>
          </div>
        )}
      </div>
      <div className="px-6 py-2 border-t border-gray-50 text-[8px] text-gray-300 flex justify-between">
        <span>→ Action · ■ Technique · ● Relationnel</span>
        <span>L'Impact</span>
      </div>
    </div>
  </div>
);

const ArtisanPreview = ({ profile, experienceEntries, atoutEntries, entries, removeEntry, colors }: any) => (
  <div className="h-full flex flex-col text-[11px] leading-[1.6]" style={{ fontFamily: "'DM Serif Display', Georgia, serif", background: "hsl(40, 30%, 97%)" }}>
    {/* Header with texture feel */}
    <div className="px-8 py-7 relative" style={{ background: colors.primary }}>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v22H20v-1.5z' fill='%23fff' fill-opacity='0.08'/%3E%3C/svg%3E\")" }} />
      <div className="relative flex items-end gap-5">
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-white/40 text-xl font-bold"
          style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.25)" }}>
          {profile.nom ? profile.nom[0]?.toUpperCase() : "?"}
        </div>
        <div>
          <h2 className="text-white text-lg font-bold">{profile.nom || "Votre Nom"}</h2>
          <p className="text-white/65 text-xs italic">{profile.titre || "Titre du poste"}</p>
        </div>
      </div>
      <div className="relative flex flex-wrap gap-x-5 gap-y-1 mt-4 text-white/55 text-[10px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {profile.email && <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" />{profile.email}</span>}
        {profile.telephone && <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" />{profile.telephone}</span>}
        {profile.ville && <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{profile.ville}</span>}
      </div>
    </div>

    <div className="flex-1 flex">
      {/* Main */}
      <div className="flex-1 px-7 py-5 overflow-y-auto">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-3 pb-2" style={{ color: colors.primary, borderBottom: `2px solid ${colors.accent}`, fontFamily: "'DM Sans', sans-serif" }}>
          Compétences professionnelles
        </h3>
        {experienceEntries.length > 0 ? (
          <ul className="space-y-2">
            {experienceEntries.map((entry: CvEntry) => (
              <li key={entry.id} className="flex items-start gap-2.5 group/item px-2 py-1 rounded-lg hover:bg-white/60 transition-colors">
                <span className="mt-0.5 flex-shrink-0"><ModernBullet type={entry.bullet} color={entry.bullet === "technique" ? colors.primary : colors.accent} /></span>
                <span className="flex-1 text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>{entry.selected}</span>
                <button onClick={() => removeEntry(entry.id)} className="opacity-0 group-hover/item:opacity-100 text-gray-300 hover:text-red-400 transition-opacity"><Trash2 className="w-3 h-3" /></button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border-2 border-dashed p-6 text-center mt-4" style={{ borderColor: `${colors.accent}40` }}>
            <Briefcase className="w-8 h-8 mx-auto mb-2" style={{ color: `${colors.accent}40` }} />
            <p className="text-gray-400 text-[10px] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Votre CV se construit ici en temps réel</p>
          </div>
        )}
      </div>

      {/* Right sidebar */}
      <div className="w-[35%] border-l px-5 py-5 space-y-4" style={{ borderColor: `${colors.primary}15`, background: `${colors.primary}06` }}>
        <div>
          <p className="text-[9px] uppercase tracking-widest font-semibold mb-2" style={{ color: colors.accent, fontFamily: "'DM Sans', sans-serif" }}>Atouts</p>
          {atoutEntries.length > 0 ? (
            <ul className="space-y-1.5">
              {atoutEntries.map((e: CvEntry) => (
                <li key={e.id} className="flex items-start gap-2 text-[10px] text-gray-600 group/del" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <Star className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} />
                  <span className="flex-1">{e.selected}</span>
                  <button onClick={() => removeEntry(e.id)} className="opacity-0 group-hover/del:opacity-100 text-gray-300 hover:text-red-400 transition-opacity"><Trash2 className="w-2.5 h-2.5" /></button>
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-400 italic text-[9px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Ajoutez des atouts…</p>}
        </div>
      </div>
    </div>

    <div className="px-7 py-2 border-t text-[8px] text-gray-400 flex justify-between" style={{ borderColor: `${colors.primary}10`, fontFamily: "'DM Sans', sans-serif" }}>
      <span>My CV Coach · Méthode Fred</span>
      <span>L'Artisan</span>
    </div>
  </div>
);

const CreatifPreview = ({ profile, experienceEntries, atoutEntries, entries, removeEntry, colors }: any) => (
  <div className="h-full flex flex-col text-[11px] leading-[1.6] relative overflow-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
    {/* Floating geometric shapes */}
    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-[0.06]" style={{ background: colors.accent }} />
    <div className="absolute top-1/3 -left-4 w-16 h-16 rotate-45 rounded-md opacity-[0.05]" style={{ background: colors.primary }} />
    <div className="absolute bottom-1/4 right-8 w-10 h-10 rounded-full opacity-[0.04]" style={{ background: colors.accent }} />
    <svg className="absolute bottom-12 left-6 opacity-[0.06]" width="60" height="30" viewBox="0 0 60 30"><path d="M5 25L30 5L55 25" stroke={colors.primary} strokeWidth="3" fill="none" /></svg>

    {/* Header — asymmetric */}
    <div className="relative px-7 pt-8 pb-6 flex items-end gap-5">
      <div className="flex-1">
        <h2 className="text-2xl font-black tracking-tight leading-none" style={{ color: colors.primary }}>
          {profile.nom || "Votre Nom"}
        </h2>
        <div className="mt-1.5 inline-block rounded-full px-3 py-0.5 text-[10px] font-semibold text-white" style={{ background: colors.accent }}>
          {profile.titre || "Titre du poste"}
        </div>
      </div>
      <div className="w-14 h-14 rounded-2xl rotate-3 flex items-center justify-center text-white text-lg font-bold shadow-lg" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        {profile.nom ? profile.nom[0]?.toUpperCase() : "?"}
      </div>
    </div>

    {/* Contact bar */}
    <div className="mx-7 rounded-xl px-4 py-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-500 mb-4" style={{ background: `${colors.primary}08` }}>
      {profile.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" style={{ color: colors.accent }} />{profile.email}</span>}
      {profile.telephone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" style={{ color: colors.accent }} />{profile.telephone}</span>}
      {profile.ville && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" style={{ color: colors.accent }} />{profile.ville}</span>}
    </div>

    <div className="flex-1 flex px-7 gap-5 overflow-y-auto pb-4">
      {/* Left main */}
      <div className="flex-1">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2" style={{ color: colors.primary }}>
          <span className="w-6 h-0.5 rounded-full" style={{ background: colors.accent }} />
          Compétences
        </h3>
        {experienceEntries.length > 0 ? (
          <ul className="space-y-2">
            {experienceEntries.map((entry: CvEntry, idx: number) => (
              <li key={entry.id} className="flex items-start gap-2.5 group/item px-2 py-1.5 rounded-xl hover:bg-gray-50 transition-colors"
                style={{ borderLeft: `3px solid ${idx % 2 === 0 ? colors.primary : colors.accent}` }}>
                <span className="mt-0.5 flex-shrink-0"><ModernBullet type={entry.bullet} color={entry.bullet === "technique" ? colors.primary : colors.accent} /></span>
                <span className="flex-1 text-gray-700">{entry.selected}</span>
                <button onClick={() => removeEntry(entry.id)} className="opacity-0 group-hover/item:opacity-100 text-gray-300 hover:text-red-400 transition-opacity"><Trash2 className="w-3 h-3" /></button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border-2 border-dashed p-6 text-center mt-2" style={{ borderColor: `${colors.accent}30` }}>
            <Sparkles className="w-8 h-8 mx-auto mb-2" style={{ color: `${colors.accent}40` }} />
            <p className="text-gray-400 text-[10px] font-medium">Saisissez une expérience pour commencer</p>
          </div>
        )}
      </div>

      {/* Right column */}
      <div className="w-[34%] space-y-3">
        <div className="rounded-2xl p-3.5" style={{ background: `${colors.primary}08`, border: `1px solid ${colors.primary}12` }}>
          <p className="text-[9px] uppercase tracking-widest font-bold mb-2" style={{ color: colors.accent }}>Atouts</p>
          {atoutEntries.length > 0 ? (
            <ul className="space-y-1.5">
              {atoutEntries.map((e: CvEntry) => (
                <li key={e.id} className="flex items-start gap-1.5 text-[10px] text-gray-600 group/del">
                  <span className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: colors.accent }} />
                  <span className="flex-1">{e.selected}</span>
                  <button onClick={() => removeEntry(e.id)} className="opacity-0 group-hover/del:opacity-100 text-gray-300 hover:text-red-400 transition-opacity"><Trash2 className="w-2.5 h-2.5" /></button>
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-400 italic text-[9px]">Ajoutez des atouts…</p>}
        </div>
      </div>
    </div>

    <div className="px-7 py-2 text-[8px] text-gray-300 flex justify-between">
      <span>My CV Coach · Méthode Fred</span>
      <span>Le Créatif</span>
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────
const CvGenerator = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Transformation[]>([]);
  const [entries, setEntries] = useState<CvEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [searching, setSearching] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemeId>("impact");
  const [activeColor, setActiveColor] = useState<ColorId>("bleu");
  const [profile, setProfile] = useState<CvProfile>({ nom: "", titre: "", email: "", telephone: "", ville: "" });
  const a4Ref = useRef<HTMLDivElement>(null);

  const colors = colorPalettes[activeColor];
  const experienceEntries = entries.filter((e) => e.input !== "Atout");
  const atoutEntries = entries.filter((e) => e.input === "Atout");

  const handleTransform = () => {
    if (!input.trim()) return;
    setSearching(true);
    setTimeout(() => { setSuggestions(findSuggestions(input)); setSearching(false); }, 350);
  };
  const addEntry = (t: Transformation) => { setEntries((p) => [...p, { id: Date.now(), input, selected: t.text, bullet: t.bullet }]); setInput(""); setSuggestions([]); };
  const addAtout = (text: string) => { setEntries((p) => [...p, { id: Date.now(), input: "Atout", selected: text, bullet: "action" }]); };
  const removeEntry = (id: number) => { setEntries((p) => p.filter((e) => e.id !== id)); };
  const copyAll = () => {
    const symbols: Record<BulletType, string> = { action: "→", technique: "■", relationnel: "●" };
    navigator.clipboard.writeText(entries.map((e) => `${symbols[e.bullet]} ${e.selected}`).join("\n"));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  const updateProfile = (field: keyof CvProfile, value: string) => setProfile((p) => ({ ...p, [field]: value }));

  const previewProps = { profile, experienceEntries, atoutEntries, entries, removeEntry, colors };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6">
            {/* Header */}
            <div className="animate-fade-up max-w-2xl mb-8">
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Méthode Fred · Générateur Next-Gen</p>
              <h1 className="text-3xl md:text-4xl tracking-tight mb-3">Générateur de CV</h1>
              <p className="text-muted-foreground">Saisissez vos expériences, choisissez votre style, et créez un CV qui marque les esprits.</p>
            </div>

            {/* Theme & Color selectors */}
            <div className="animate-fade-up-delay-1 flex flex-wrap gap-4 mb-8">
              {/* Theme picker */}
              <div className="flex gap-2">
                {(Object.entries(themes) as [ThemeId, typeof themes.impact][]).map(([id, t]) => (
                  <button key={id} onClick={() => setActiveTheme(id)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all active:scale-[0.97] ${activeTheme === id ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-card text-foreground border border-border hover:shadow-md"}`}>
                    {t.icon}
                    <span>{t.label}</span>
                    <span className={`text-[10px] ${activeTheme === id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{t.desc}</span>
                  </button>
                ))}
              </div>

              {/* Color palette */}
              <div className="flex items-center gap-2 rounded-xl bg-card border border-border px-4 py-2">
                <Palette className="w-4 h-4 text-muted-foreground" />
                {(Object.entries(colorPalettes) as [ColorId, typeof colorPalettes.bleu][]).map(([id, c]) => (
                  <button key={id} onClick={() => setActiveColor(id)} title={c.label}
                    className={`w-7 h-7 rounded-full transition-all active:scale-[0.95] ${activeColor === id ? "ring-2 ring-offset-2 ring-ring scale-110" : "hover:scale-105"}`}
                    style={{ background: c.swatch }} />
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr,minmax(480px,600px)] gap-8 items-start">
              {/* LEFT — Controls */}
              <div className="space-y-5">
                {/* Profile */}
                <div className="rounded-2xl bg-card p-5 shadow-sm border border-border/50 space-y-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2"><User className="w-4 h-4 text-primary" />Informations personnelles</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {(["nom", "titre", "email", "telephone", "ville"] as (keyof CvProfile)[]).map((f) => (
                      <input key={f} value={profile[f]} onChange={(e) => updateProfile(f, e.target.value)}
                        placeholder={{ nom: "Nom complet", titre: "Titre visé", email: "Email", telephone: "Téléphone", ville: "Ville" }[f]}
                        className={`rounded-xl border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${f === "ville" ? "sm:col-span-1" : ""}`} />
                    ))}
                  </div>
                </div>

                {/* Experience input */}
                <div className="rounded-2xl bg-card p-5 shadow-sm border border-border/50">
                  <h3 className="font-semibold text-sm flex items-center gap-2 mb-3"><Briefcase className="w-4 h-4 text-primary" />Saisissez une expérience ou tâche</h3>
                  <div className="flex gap-3">
                    <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleTransform()}
                      placeholder="Ex : agent de nettoyage, vente, cuisine…"
                      className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    <button onClick={handleTransform} disabled={!input.trim() || searching}
                      className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-accent-foreground font-medium shadow-md hover:shadow-lg transition-shadow disabled:opacity-40 active:scale-[0.97]">
                      <Wand2 className={`w-4 h-4 ${searching ? "animate-spin" : ""}`} /> Transformer
                    </button>
                  </div>

                  {/* Legend */}
                  <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><ModernBullet type="action" color="hsl(24, 85%, 52%)" /> Action</span>
                    <span className="inline-flex items-center gap-1.5"><ModernBullet type="technique" color="hsl(213, 65%, 38%)" /> Technique</span>
                    <span className="inline-flex items-center gap-1.5"><ModernBullet type="relationnel" color="hsl(24, 85%, 52%)" /> Relationnel</span>
                  </div>

                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="mt-5 space-y-2">
                      <p className="text-sm text-muted-foreground">Compétences suggérées pour « <span className="font-medium text-foreground">{input}</span> » :</p>
                      {suggestions.map((s, i) => (
                        <button key={i} onClick={() => addEntry(s)}
                          className="w-full text-left rounded-xl border border-border bg-background p-3.5 hover:bg-secondary hover:shadow-sm transition-all active:scale-[0.98] group flex items-start gap-3">
                          <span className="mt-0.5"><ModernBullet type={s.bullet} color={s.bullet === "technique" ? "hsl(213, 65%, 38%)" : "hsl(24, 85%, 52%)"} /></span>
                          <span className="text-sm leading-relaxed">{s.text}</span>
                          <Plus className="w-4 h-4 ml-auto mt-0.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Atouts */}
                <div className="rounded-2xl bg-accent/8 border border-accent/20 p-5">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-accent" /> Atouts à valoriser</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {atouts.map((a) => (
                      <button key={a} onClick={() => addAtout(a)}
                        className="text-left rounded-xl border border-border bg-background p-3 text-sm hover:bg-secondary hover:shadow-sm transition-all active:scale-[0.98] group flex items-center gap-2">
                        <Plus className="w-3.5 h-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        {a}
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
              <div className="animate-fade-up-delay-2 sticky top-24">
                <div ref={a4Ref}
                  className="bg-white rounded-2xl overflow-hidden mx-auto"
                  style={{
                    aspectRatio: "210 / 297",
                    maxHeight: "85vh",
                    boxShadow: `0 4px 24px -4px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04), 0 20px 40px -12px ${colors.primary}15`,
                  }}>
                  {activeTheme === "impact" && <ImpactPreview {...previewProps} />}
                  {activeTheme === "artisan" && <ArtisanPreview {...previewProps} />}
                  {activeTheme === "creatif" && <CreatifPreview {...previewProps} />}
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
