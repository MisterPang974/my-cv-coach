import React from "react";
import { Mail, Phone, MapPin, Briefcase, Layers, Star, ChevronRight, Sparkles, Trash2, Grid3X3, ArrowRightCircle, Heart, Calendar, GraduationCap, Building2 } from "lucide-react";
import type { SidebarPosition, BulletStyle, BulletShapeId } from "@/lib/cv-sectors";

// ─── Types ─────────────────────────────────────────────────────────
type BulletType = "action" | "technique" | "relationnel";
interface CvEntry { id: number; input: string; selected: string; bullet: BulletType; }
interface CvProfile { nom: string; prenom: string; titre: string; email: string; telephone: string; adresse: string; codePostal: string; ville: string; }
interface Colors { primary: string; accent: string; swatch: string; }

export interface ProfessionalExperience {
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

export interface FormationEntry {
  id: number;
  dateDebut: string;
  dateFin: string;
  intitule: string;
  etablissement: string;
  ville: string;
}

export interface InterestEntry {
  id: number;
  text: string;
  icon: string;
  category: "loisir" | "benevolat" | "permis" | "langue" | "autre";
}

export type TextColorSection = "header" | "experiences" | "competences";
export type FontId = "dm-sans" | "montserrat" | "open-sans" | "playfair" | "roboto" | "lato";

export const fontOptions: { id: FontId; label: string; family: string }[] = [
  { id: "dm-sans", label: "DM Sans", family: "'DM Sans', system-ui, sans-serif" },
  { id: "montserrat", label: "Montserrat", family: "'Montserrat', system-ui, sans-serif" },
  { id: "open-sans", label: "Open Sans", family: "'Open Sans', system-ui, sans-serif" },
  { id: "playfair", label: "Playfair Display", family: "'Playfair Display', Georgia, serif" },
  { id: "roboto", label: "Roboto", family: "'Roboto', system-ui, sans-serif" },
  { id: "lato", label: "Lato", family: "'Lato', system-ui, sans-serif" },
];

const TEXT_BLACK = "hsl(var(--foreground))";
const TEXT_WHITE = "hsl(var(--primary-foreground))";
const TEXT_MUTED = "hsl(var(--muted-foreground))";

export interface CompetencyDomainData { id: string; label: string; items: { id: string; text: string; enabled: boolean; level?: number }[]; }

export type CvSectionId = "experiences" | "competences" | "formation" | "qualites" | "divers";

export type CaseStyle = "majuscules" | "standard";
export type TitleDecoration = "none" | "underline" | "border";
export type TextAlign = "left" | "center";

export interface TemplateProps {
  profile: CvProfile;
  experienceEntries: CvEntry[];
  atoutEntries: CvEntry[];
  entries: CvEntry[];
  removeEntry: (id: number) => void;
  colors: Colors;
  sidebarPos: SidebarPosition;
  bulletStyle: BulletStyle;
  bulletShape?: BulletShapeId;
  competencyBulletShape?: BulletShapeId;
  formationBulletShape?: BulletShapeId;
  diversBulletShape?: BulletShapeId;
  qualitesBulletShape?: BulletShapeId;
  gradient?: { id: string; label: string; from: string; to: string; angle?: number };
  gradientTarget?: "fond" | "rubriques";
  bgCircleColor?: string;
  textColors?: Record<TextColorSection, "noir" | "blanc">;
  titleColor?: string;
  fontFamily?: string;
  competencyDomains?: CompetencyDomainData[];
  professionalExperiences?: ProfessionalExperience[];
  removeProfessionalExperience?: (id: number) => void;
  formations?: FormationEntry[];
  removeFormation?: (id: number) => void;
  formationTitle?: string;
  getCompanyLogoUrl?: (company: string) => string | null;
  interests?: InterestEntry[];
  removeInterest?: (id: number) => void;
  interestDisplayMode?: "badges" | "list";
  sectionOrder?: CvSectionId[];
  qualities?: string[];
  removeQuality?: (idx: number) => void;
  levelDisplay?: "dots" | "bars" | "none";
  caseStyle?: CaseStyle;
  titleDecoration?: TitleDecoration;
  textAlign?: TextAlign;
}

// ─── Bullet renderers ──────────────────────────────────────────────
export const ModernBullet = ({ type, color, style = "mixte", shape }: { type: BulletType; color: string; style?: BulletStyle; shape?: BulletShapeId }) => {
  const sz = 14;
  if (shape) return <ShapeBullet shape={shape} color={color} />;
  const effectiveType = style === "mixte" ? type : style === "fleches" ? "action" : style === "carres" ? "technique" : "relationnel";
  switch (effectiveType) {
    case "action":
      return <svg width={sz} height={sz} viewBox="0 0 14 14" fill="none"><path d="M3 7h6M9 4l3 3-3 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case "technique":
      return <svg width={sz} height={sz} viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="2" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" /></svg>;
    case "relationnel":
      return <svg width={sz} height={sz} viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" /></svg>;
  }
};

// ─── 15 shape bullets ──────────────────────────────────────────────
export const ShapeBullet = ({ shape, color }: { shape: BulletShapeId; color: string }) => {
  const sz = 14;
  const svgProps = { width: sz, height: sz, viewBox: "0 0 14 14", fill: "none" as const };
  switch (shape) {
    case "fleche": return <svg {...svgProps}><path d="M3 7h6M9 4l3 3-3 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case "carre": return <svg {...svgProps}><rect x="2" y="2" width="10" height="10" rx="2" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" /></svg>;
    case "cercle": return <svg {...svgProps}><circle cx="7" cy="7" r="5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" /></svg>;
    case "losange": return <svg {...svgProps}><rect x="2" y="2" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" transform="rotate(45 7 7)" /></svg>;
    case "hexagone": return <svg {...svgProps}><polygon points="7,1 12.5,4 12.5,10 7,13 1.5,10 1.5,4" stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.1" /></svg>;
    case "check": return <svg {...svgProps}><path d="M3 7.5l2.5 3L11 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case "etoile": return <svg {...svgProps}><polygon points="7,1 8.8,5.2 13,5.5 9.8,8.3 10.8,12.5 7,10.2 3.2,12.5 4.2,8.3 1,5.5 5.2,5.2" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.2" /></svg>;
    case "triangle": return <svg {...svgProps}><polygon points="3,11 7,3 11,11" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.12" /></svg>;
    case "croix-plus": return <svg {...svgProps}><path d="M7 2v10M2 7h10" stroke={color} strokeWidth="2" strokeLinecap="round" /></svg>;
    case "tiret": return <svg {...svgProps}><line x1="2" y1="7" x2="12" y2="7" stroke={color} strokeWidth="2.5" strokeLinecap="round" /></svg>;
    case "chevron": return <svg {...svgProps}><path d="M4 3l5 4-5 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 3l5 4-5 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" /></svg>;
    case "double-fleche": return <svg {...svgProps}><path d="M1 7h10M8 4l3 3-3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 5l2 2-2 2" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" /></svg>;
    case "puce-pleine": return <svg {...svgProps}><circle cx="7" cy="7" r="5" fill={color} /><circle cx="7" cy="7" r="2.5" fill="white" /></svg>;
    case "anneau": return <svg {...svgProps}><circle cx="7" cy="7" r="5" stroke={color} strokeWidth="2" fill="none" /><circle cx="7" cy="7" r="1.5" fill={color} /></svg>;
    case "eclair": return <svg {...svgProps}><path d="M8 1L4 8h3l-1 5 5-7H8l1-5z" fill={color} fillOpacity="0.8" /></svg>;
    default: return <svg {...svgProps}><circle cx="7" cy="7" r="4" fill={color} fillOpacity="0.3" /></svg>;
  }
};

// ─── Sector logo SVG ───────────────────────────────────────────────
const SectorLogo = ({ sector, color, size = 48 }: { sector?: string; color: string; size?: number }) => {
  const s = (sector || "").toLowerCase();
  // Return a professional sector-specific icon
  if (s.includes("manuel") || s.includes("btp") || s.includes("artisan")) {
    return <svg width={size} height={size} viewBox="0 0 48 48" fill="none"><path d="M14 34L24 14L34 34H14Z" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" /><rect x="20" y="22" width="8" height="12" rx="1" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.08" /></svg>;
  }
  if (s.includes("tertiaire") || s.includes("vente")) {
    return <svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect x="8" y="12" width="32" height="24" rx="4" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.08" /><path d="M8 20h32" stroke={color} strokeWidth="1.5" /><circle cx="16" cy="28" r="3" fill={color} fillOpacity="0.15" /><line x1="22" y1="27" x2="36" y2="27" stroke={color} strokeWidth="1.5" strokeLinecap="round" /><line x1="22" y1="31" x2="30" y2="31" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" /></svg>;
  }
  if (s.includes("tech") || s.includes("digital")) {
    return <svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect x="10" y="8" width="28" height="22" rx="3" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.06" /><path d="M18 38h12M24 30v8" stroke={color} strokeWidth="2" strokeLinecap="round" /><circle cx="24" cy="19" r="5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1" /></svg>;
  }
  if (s.includes("soin") || s.includes("social") || s.includes("médical")) {
    return <svg width={size} height={size} viewBox="0 0 48 48" fill="none"><path d="M24 10C18 10 14 15 14 20C14 30 24 38 24 38C24 38 34 30 34 20C34 15 30 10 24 10Z" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.08" /><path d="M24 18v8M20 22h8" stroke={color} strokeWidth="2" strokeLinecap="round" /></svg>;
  }
  if (s.includes("logistique") || s.includes("transport")) {
    return <svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect x="6" y="18" width="24" height="16" rx="2" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.06" /><path d="M30 22h8l4 6v6h-12V22z" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" /><circle cx="16" cy="36" r="3" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15" /><circle cx="36" cy="36" r="3" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15" /></svg>;
  }
  // Default: abstract professional mark
  return <svg width={size} height={size} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.06" /><path d="M18 24l4 4 8-8" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
};

// ─── Shared pieces ─────────────────────────────────────────────────
const EmptyState = ({ color, label, dark }: { color: string; label?: string; dark?: boolean }) => (
  <div className="rounded-2xl border-2 border-dashed p-6 text-center mt-4" style={{ borderColor: `${color}20`, background: `${color}03` }}>
    <Briefcase className="w-7 h-7 mx-auto mb-2" style={{ color: `${color}25` }} />
    <p className={`text-[10px] font-medium ${dark ? "text-white/40" : "text-gray-400"}`}>{label || "Votre CV se construit ici en temps réel"}</p>
    <p className={`text-[9px] mt-1 ${dark ? "text-white/25" : "text-gray-300"}`}>Style télégraphique · Verbes d'action</p>
  </div>
);

// ─── Level indicators ──────────────────────────────────────────────
const LevelDots = ({ level = 0, max = 5, color }: { level: number; max?: number; color: string }) => (
  <div className="flex gap-[3px] items-center flex-shrink-0">
    {Array.from({ length: max }).map((_, i) => (
      <div key={i} className="w-[5px] h-[5px] rounded-full" style={{ background: i < level ? color : `${color}25` }} />
    ))}
  </div>
);

const LevelBar = ({ level = 0, max = 5, color }: { level: number; max?: number; color: string }) => (
  <div className="w-14 h-[4px] rounded-full overflow-hidden flex-shrink-0" style={{ background: `${color}18` }}>
    <div className="h-full rounded-full transition-all" style={{ width: `${(level / max) * 100}%`, background: color }} />
  </div>
);

// ─── Section heading with separator line ───────────────────────────
/** Apply case style to text */
const applyCase = (text: string, caseStyle?: CaseStyle): string => {
  if (caseStyle === "majuscules") return text.toUpperCase();
  return text;
};

const SectionHeading = ({ children, color, icon, caseStyle, decoration, align }: { children: React.ReactNode; color: string; icon?: React.ReactNode; caseStyle?: CaseStyle; decoration?: TitleDecoration; align?: TextAlign }) => {
  const decoStyle: React.CSSProperties = {};
  if (decoration === "underline") {
    decoStyle.textDecoration = "underline";
    decoStyle.textUnderlineOffset = "4px";
    decoStyle.textDecorationColor = `${color}60`;
  }
  if (decoration === "border") {
    decoStyle.border = `1.5px solid ${color}30`;
    decoStyle.padding = "4px 8px";
    decoStyle.borderRadius = "6px";
    decoStyle.background = `${color}06`;
  }
  return (
    <div className="flex items-center gap-2" style={{ borderBottom: decoration !== "border" ? `1.5px solid ${color}20` : undefined, marginBottom: `calc(10px * var(--cv-gap-scale, 1))`, paddingBottom: `calc(6px * var(--cv-gap-scale, 1))`, justifyContent: align === "center" ? "center" : undefined }}>
      {icon && <span style={{ color }}>{icon}</span>}
      <h3 className="font-black uppercase tracking-[0.2em]" style={{ color, fontSize: `calc(10px * var(--cv-title-scale, 1))`, ...decoStyle }}>{typeof children === "string" ? applyCase(children, caseStyle) : children}</h3>
    </div>
  );
};

/** Render competency domains with optional level indicators */
const DomainsBlock = ({ domains, colors, bulletStyle, bulletShape, competencyBulletShape, textColor, light, levelDisplay = "none" }: { domains?: CompetencyDomainData[]; colors: Colors; bulletStyle: BulletStyle; bulletShape?: BulletShapeId; competencyBulletShape?: BulletShapeId; textColor?: string; light?: boolean; levelDisplay?: "dots" | "bars" | "none" }) => {
  if (!domains || domains.length === 0) return null;
  const effectiveShape = competencyBulletShape || bulletShape;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: `calc(6px * var(--cv-gap-scale, 1))` }}>
      {domains.map(d => (
        <div key={d.id}>
          <p className="font-bold uppercase tracking-widest" style={{ color: textColor || colors.accent, fontSize: `calc(8px * var(--cv-font-scale, 1))`, marginBottom: `calc(2px * var(--cv-gap-scale, 1))` }}>{d.label}</p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {d.items.map(item => (
              <li key={item.id} className="flex items-center gap-1.5" style={{ color: textColor || (light ? "rgba(255,255,255,0.85)" : undefined), fontSize: `calc(9px * var(--cv-font-scale, 1))`, lineHeight: "var(--cv-line-height, 1.3)", paddingTop: `calc(1px * var(--cv-gap-scale, 1))`, paddingBottom: `calc(1px * var(--cv-gap-scale, 1))` }}>
                <span className="flex-shrink-0 w-[12px] h-[12px] flex items-center justify-center"><ModernBullet type="technique" color={colors.accent} style={bulletStyle} shape={effectiveShape} /></span>
                <span className="flex-1">{item.text}</span>
                {levelDisplay === "dots" && item.level != null && <LevelDots level={item.level} color={light ? "rgba(255,255,255,0.6)" : colors.accent} />}
                {levelDisplay === "bars" && item.level != null && <LevelBar level={item.level} color={light ? "rgba(255,255,255,0.5)" : colors.accent} />}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
/** Render professional experiences with timeline + optional company logos */
const ExperiencesBlock = ({ experiences, colors, bulletStyle, bulletShape, textColor, light, onRemove, useTimeline = true, getCompanyLogoUrl }: { experiences?: ProfessionalExperience[]; colors: Colors; bulletStyle: BulletStyle; bulletShape?: BulletShapeId; textColor?: string; light?: boolean; onRemove?: (id: number) => void; useTimeline?: boolean; getCompanyLogoUrl?: (company: string) => string | null }) => {
  if (!experiences || experiences.length === 0) return null;
  return (
    <div className={useTimeline ? "relative pl-3" : ""} style={!useTimeline ? { display: "flex", flexDirection: "column", gap: `calc(8px * var(--cv-gap-scale, 1))` } : undefined}>
      {useTimeline && <div className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full" style={{ background: `linear-gradient(180deg, ${colors.accent}, ${colors.primary}40, transparent)` }} />}
      {experiences.map((exp, idx) => {
        const logoUrl = exp.showLogo && getCompanyLogoUrl ? getCompanyLogoUrl(exp.entreprise) : null;
        return (
          <div key={exp.id} className={`${useTimeline ? "relative pl-3" : ""} group/item`} style={{ paddingBottom: `calc(8px * var(--cv-gap-scale, 1))` }}>
            {useTimeline && (
              <div className="absolute -left-3 top-[3px] w-[8px] h-[8px] rounded-full border-2 z-10" style={{ borderColor: colors.accent, background: light ? colors.primary : "white" }} />
            )}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-1.5">
                {logoUrl && (
                  <img src={logoUrl} alt="" className="w-4 h-4 rounded-sm mt-[1px] object-contain flex-shrink-0" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                )}
                {!logoUrl && exp.entreprise && exp.showLogo !== false && (
                  <Building2 className="w-3.5 h-3.5 mt-[1px] flex-shrink-0 opacity-20" style={{ color: textColor || (light ? "white" : colors.primary) }} />
                )}
                <div>
                  <p className="font-black leading-tight" style={{ color: textColor || (light ? "white" : colors.primary), fontSize: `calc(10px * var(--cv-font-scale, 1))` }}>{exp.poste}</p>
                  <p style={{ color: textColor ? `${textColor}99` : (light ? "rgba(255,255,255,0.6)" : TEXT_MUTED), fontSize: `calc(8px * var(--cv-font-scale, 1))` }}>
                    {exp.entreprise}{exp.ville ? ` · ${exp.ville}` : ""}{exp.dateDebut ? ` | ${formatDateDisplay(exp.dateDebut)}` : ""}{exp.aujourdhui ? " — Aujourd'hui" : exp.dateFin ? ` — ${formatDateDisplay(exp.dateFin)}` : ""}
                  </p>
                </div>
              </div>
              {onRemove && <button onClick={() => onRemove(exp.id)} className={`opacity-0 group-hover/item:opacity-100 transition-opacity ${light ? "text-white/30 hover:text-red-300" : "text-gray-300 hover:text-red-400"}`}><Trash2 className="w-2.5 h-2.5" /></button>}
            </div>
            {exp.missions.length > 0 && (
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {exp.missions.map((m, mi) => (
                  <li key={mi} className="flex items-center gap-1.5" style={{ color: textColor || (light ? "rgba(255,255,255,0.85)" : undefined), fontSize: `calc(9px * var(--cv-font-scale, 1))`, lineHeight: "var(--cv-line-height, 1.3)", paddingTop: `calc(1px * var(--cv-gap-scale, 1))`, paddingBottom: `calc(1px * var(--cv-gap-scale, 1))` }}>
                    <span className="flex-shrink-0 w-[12px] h-[12px] flex items-center justify-center"><ModernBullet type="action" color={colors.accent} style={bulletStyle} shape={bulletShape} /></span>
                    <span className="flex-1">{m}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

/** Render formation/diplômes block */
const FormationBlock = ({ formations, colors, bulletStyle, bulletShape, textColor, light, onRemove, title }: { formations?: FormationEntry[]; colors: Colors; bulletStyle: BulletStyle; bulletShape?: BulletShapeId; textColor?: string; light?: boolean; onRemove?: (id: number) => void; title?: string }) => {
  if (!formations || formations.length === 0) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: `calc(4px * var(--cv-gap-scale, 1))` }}>
      {formations.map(f => (
        <div key={f.id} className="group/item" style={{ paddingBottom: `calc(6px * var(--cv-gap-scale, 1))` }}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-black leading-tight" style={{ color: textColor || (light ? "white" : colors.primary), fontSize: `calc(10px * var(--cv-font-scale, 1))` }}>{f.intitule}</p>
              <p style={{ color: textColor ? `${textColor}99` : (light ? "rgba(255,255,255,0.6)" : TEXT_MUTED), fontSize: `calc(8px * var(--cv-font-scale, 1))` }}>
                {f.etablissement}{f.ville ? ` · ${f.ville}` : ""}{f.dateDebut ? ` | ${formatDateDisplay(f.dateDebut)}` : ""}{f.dateFin ? ` — ${formatDateDisplay(f.dateFin)}` : ""}
              </p>
            </div>
            {onRemove && <button onClick={() => onRemove(f.id)} className={`opacity-0 group-hover/item:opacity-100 transition-opacity ${light ? "text-white/30 hover:text-red-300" : "text-gray-300 hover:text-red-400"}`}><Trash2 className="w-2.5 h-2.5" /></button>}
          </div>
        </div>
      ))}
    </div>
  );
};
/** Render interests / divers block — badge or list mode, NO emojis */
const InterestsBlock = ({ interests, colors, bulletStyle, bulletShape, textColor, light, onRemove, displayMode = "badges" }: { interests?: InterestEntry[]; colors: Colors; bulletStyle: BulletStyle; bulletShape?: BulletShapeId; textColor?: string; light?: boolean; onRemove?: (id: number) => void; displayMode?: "badges" | "list" }) => {
  if (!interests || interests.length === 0) return null;
  if (displayMode === "badges") {
    return (
      <div className="flex flex-wrap" style={{ gap: `calc(4px * var(--cv-gap-scale, 1))` }}>
        {interests.map(i => (
          <span key={i.id} className="inline-flex items-center gap-1 px-2 py-0.5 font-medium group/item"
            style={{ borderRadius: "8px", background: light ? "rgba(255,255,255,0.12)" : `${colors.accent}08`, border: `1px solid ${light ? "rgba(255,255,255,0.15)" : `${colors.accent}18`}`, color: textColor || (light ? "rgba(255,255,255,0.85)" : undefined), fontSize: `calc(8px * var(--cv-font-scale, 1))` }}>
            <span className="flex-shrink-0 w-[10px] h-[10px] flex items-center justify-center"><ModernBullet type="action" color={colors.accent} style={bulletStyle} shape={bulletShape} /></span>
            {i.text}
            {onRemove && <button onClick={() => onRemove(i.id)} className={`opacity-0 group-hover/item:opacity-100 ml-0.5 ${light ? "text-white/30 hover:text-red-300" : "text-gray-300 hover:text-red-400"}`}><Trash2 className="w-2 h-2" /></button>}
          </span>
        ))}
      </div>
    );
  }
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {interests.map(i => (
        <li key={i.id} className="flex items-center gap-1.5 group/item" style={{ color: textColor || (light ? "rgba(255,255,255,0.85)" : undefined), fontSize: `calc(9px * var(--cv-font-scale, 1))`, lineHeight: "var(--cv-line-height, 1.3)", paddingTop: `calc(1px * var(--cv-gap-scale, 1))`, paddingBottom: `calc(1px * var(--cv-gap-scale, 1))` }}>
          <span className="flex-shrink-0 w-[12px] h-[12px] flex items-center justify-center"><ModernBullet type="action" color={colors.accent} style={bulletStyle} shape={bulletShape} /></span>
          <span className="flex-1">{i.text}</span>
          {onRemove && <button onClick={() => onRemove(i.id)} className={`opacity-0 group-hover/item:opacity-100 ${light ? "text-white/30 hover:text-red-300" : "text-gray-300 hover:text-red-400"}`}><Trash2 className="w-2 h-2" /></button>}
        </li>
      ))}
    </ul>
  );
};

/** Render qualities block — compact list with styled bullets */
const QualitiesBlock = ({ qualities, colors, bulletStyle, bulletShape, textColor, light, onRemove }: { qualities?: string[]; colors: Colors; bulletStyle: BulletStyle; bulletShape?: BulletShapeId; textColor?: string; light?: boolean; onRemove?: (idx: number) => void }) => {
  if (!qualities || qualities.length === 0) return null;
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {qualities.map((q, idx) => (
        <li key={idx} className="flex items-center gap-1.5 group/item" style={{ color: textColor || (light ? "rgba(255,255,255,0.85)" : undefined), fontSize: `calc(9px * var(--cv-font-scale, 1))`, lineHeight: "var(--cv-line-height, 1.3)", paddingTop: `calc(1px * var(--cv-gap-scale, 1))`, paddingBottom: `calc(1px * var(--cv-gap-scale, 1))` }}>
          <span className="flex-shrink-0 w-[12px] h-[12px] flex items-center justify-center"><ModernBullet type="relationnel" color={colors.accent} style={bulletStyle} shape={bulletShape} /></span>
          <span className="flex-1">{q}</span>
          {onRemove && <button onClick={() => onRemove(idx)} className={`opacity-0 group-hover/item:opacity-100 ${light ? "text-white/30 hover:text-red-300" : "text-gray-300 hover:text-red-400"}`}><Trash2 className="w-2 h-2" /></button>}
        </li>
      ))}
    </ul>
  );
};

const DeleteBtn = ({ onClick, light }: { onClick: () => void; light?: boolean }) => (
  <button onClick={onClick} className={`opacity-0 group-hover/item:opacity-100 transition-opacity ${light ? "text-white/30 hover:text-red-300" : "text-gray-300 hover:text-red-400"}`}>
    <Trash2 className="w-2.5 h-2.5" />
  </button>
);

/** Format date string to MM/YYYY if it looks like a date */
const formatDateDisplay = (d: string): string => {
  if (!d) return "";
  // Already MM/YYYY or YYYY
  if (/^\d{2}\/\d{4}$/.test(d)) return d;
  // ISO date or YYYY-MM
  const isoMatch = d.match(/^(\d{4})-(\d{2})/);
  if (isoMatch) return `${isoMatch[2]}/${isoMatch[1]}`;
  return d;
};

const withAlpha = (color: string, alpha: number) => {
  if (color.startsWith("hsl(")) return color.replace("hsl(", "hsla(").replace(")", `, ${alpha})`);
  if (color === "white") return `hsla(0, 0%, 100%, ${alpha})`;
  if (color === "black") return `hsla(215, 25%, 12%, ${alpha})`;
  return color;
};

const resolveTitleTextColor = (titleColor: string | undefined, headerColor: string | undefined, fallback: string) =>
  titleColor || headerColor || fallback;

const ContactLine = ({
  profile,
  light,
  colors,
  fontFamily,
  textColor,
  iconColor,
}: {
  profile: CvProfile;
  light?: boolean;
  colors: Colors;
  fontFamily?: string;
  textColor?: string;
  iconColor?: string;
}) => {
  const defaultIconColor = light ? "currentColor" : colors.accent;
  const fullAddress = [profile.adresse, profile.codePostal, profile.ville].filter(Boolean).join(", ");
  const resolvedTextColor = textColor || (light ? withAlpha(TEXT_WHITE, 0.72) : TEXT_MUTED);
  const resolvedIconColor = iconColor || (light ? withAlpha(TEXT_WHITE, 0.56) : defaultIconColor);
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1" style={{ ...(fontFamily ? { fontFamily } : {}), color: resolvedTextColor, fontSize: `calc(10px * var(--cv-font-scale, 1))` }}>
      {profile.telephone && <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" style={{ color: resolvedIconColor }} />{profile.telephone}</span>}
      {profile.email && <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" style={{ color: resolvedIconColor }} />{profile.email}</span>}
      {fullAddress && <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" style={{ color: resolvedIconColor }} />{fullAddress}</span>}
    </div>
  );
};

const NameBlock = ({
  profile,
  light,
  size = "md",
  fontFamily,
  color,
}: {
  profile: CvProfile;
  light?: boolean;
  size?: "sm" | "md" | "lg";
  fontFamily?: string;
  color?: string;
}) => {
  const fullName = [profile.prenom, profile.nom].filter(Boolean).join(" ") || "Votre Nom";
  const sizeClasses = size === "lg" ? "text-lg" : size === "md" ? "text-sm" : "text-[10px]";
  const resolvedColor = color || (light ? TEXT_WHITE : undefined);
  return <span className={`font-bold leading-tight ${sizeClasses}`} style={{ ...(fontFamily ? { fontFamily } : {}), ...(resolvedColor ? { color: resolvedColor } : {}) }}>{fullName}</span>;
};

/** Resolve text color for a section */
const sectionTextColor = (section: TextColorSection, textColors?: Record<TextColorSection, "noir" | "blanc">, fallback?: string): string => {
  if (!textColors) return fallback || "";
  return textColors[section] === "blanc" ? TEXT_WHITE : TEXT_BLACK;
};

// ─── Gradient helper ───────────────────────────────────────────────
const useGradientBg = (gradient?: TemplateProps["gradient"], target?: TemplateProps["gradientTarget"]) => {
  if (!gradient || target !== "fond") return {};
  return { background: `linear-gradient(${gradient.angle || 135}deg, ${gradient.from}, ${gradient.to})` };
};
const useGradientRubrique = (gradient?: TemplateProps["gradient"], target?: TemplateProps["gradientTarget"], fallback?: string) => {
  if (!gradient || target !== "rubriques") return fallback ? { background: fallback } : {};
  const dark = isGradientDark(gradient.from, gradient.to);
  return { background: `linear-gradient(${gradient.angle || 135}deg, ${gradient.from}, ${gradient.to})`, color: dark ? "white" : "hsl(215, 25%, 12%)" };
};

// ─── Auto-contrast: detect if a color/gradient is dark ─────────────
function parseHslLightness(hsl: string): number {
  const match = hsl.match(/hsl\(\s*[\d.]+\s*,\s*[\d.]+%?\s*,\s*([\d.]+)%/);
  return match ? parseFloat(match[1]) : 50;
}
function isGradientDark(from: string, to: string): boolean {
  const avg = (parseHslLightness(from) + parseHslLightness(to)) / 2;
  return avg < 60;
}
/** Returns text color class: dark text for light backgrounds, white for dark */
export function useAutoContrast(gradient?: TemplateProps["gradient"], target?: TemplateProps["gradientTarget"]): { isDark: boolean; textClass: string; textColor: string } {
  if (!gradient || target !== "fond") return { isDark: false, textClass: "text-gray-700", textColor: "hsl(215, 25%, 12%)" };
  const dark = isGradientDark(gradient.from, gradient.to);
  return dark
    ? { isDark: true, textClass: "text-white", textColor: "white" }
    : { isDark: false, textClass: "text-gray-700", textColor: "hsl(215, 25%, 12%)" };
}

// ─── Organic blob SVG ──────────────────────────────────────────────
const Blob = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path fill={color} d="M44.7,-76.4C58.8,-69.2,71.8,-58.5,79.6,-44.7C87.4,-30.9,89.9,-14,88.1,2.3C86.3,18.5,80.2,34.1,70.8,47.2C61.4,60.3,48.7,70.9,34.3,77.4C19.9,83.9,3.8,86.3,-11.2,83.5C-26.2,80.7,-40.1,72.7,-52.9,63C-65.7,53.3,-77.4,41.9,-83.3,27.7C-89.2,13.5,-89.3,-3.5,-84.8,-19.2C-80.3,-34.9,-71.2,-49.3,-58.5,-57.2C-45.8,-65.1,-29.5,-66.5,-14.4,-70.4C0.7,-74.3,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
  </svg>
);

/** Ordered section renderer — renders CV sections in the order specified by sectionOrder */
interface SectionRendererProps {
  sectionOrder?: CvSectionId[];
  renderExperiences: () => React.ReactNode;
  renderCompetences: () => React.ReactNode;
  renderFormation: () => React.ReactNode;
  renderQualites: () => React.ReactNode;
  renderDivers: () => React.ReactNode;
}
const OrderedSections = ({ sectionOrder, renderExperiences, renderCompetences, renderFormation, renderQualites, renderDivers }: SectionRendererProps) => {
  const order = sectionOrder || ["experiences", "competences", "formation", "qualites", "divers"];
  const renderers: Record<CvSectionId, () => React.ReactNode> = {
    experiences: renderExperiences,
    competences: renderCompetences,
    formation: renderFormation,
    qualites: renderQualites,
    divers: renderDivers,
  };
  return <>{order.map(s => <React.Fragment key={s}>{renderers[s]()}</React.Fragment>)}</>;
};

// ─── Impact decorative shapes: Chevron stripes + corner accent ─────
const ImpactStripes = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[20, 60, 100, 140, 180].map((y, i) => (
      <path key={i} d={`M0 ${y}L30 ${y - 15}L60 ${y}`} stroke={color} strokeWidth="1.5" opacity={0.12 - i * 0.015} />
    ))}
  </svg>
);

// ─── Mural decorative shapes: Grid overlay + diagonal accents ──────
const MuralGridAccent = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="40" height="40" rx="3" stroke={color} strokeWidth="1" opacity="0.08" />
    <rect x="60" y="60" width="50" height="50" rx="3" stroke={color} strokeWidth="1" opacity="0.06" />
    <line x1="0" y1="120" x2="120" y2="0" stroke={color} strokeWidth="1" opacity="0.05" />
    <circle cx="90" cy="30" r="12" stroke={color} strokeWidth="1" opacity="0.07" />
  </svg>
);

// ─── Magazine decorative: Diagonal ribbon + mosaic pattern ─────────
const MagazineRibbon = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path d="M0 80L400 0V30L0 80Z" fill={color} opacity="0.08" />
    <path d="M0 80L400 20V45L0 80Z" fill={color} opacity="0.05" />
  </svg>
);

const MagazineMosaic = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 120 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[20, 80, 140, 200, 260].map((y, i) => (
      <React.Fragment key={i}>
        <rect x={10 + (i % 3) * 8} y={y} width={28 - i * 3} height={28 - i * 3} rx={i % 2 === 0 ? 6 : 14} fill={color} opacity={0.07 - i * 0.008} />
        <circle cx={80 + (i % 2) * 20} cy={y + 15} r={4 + i} stroke={color} strokeWidth="1" opacity={0.06} fill="none" />
      </React.Fragment>
    ))}
  </svg>
);

// ─── Médical decorative shapes: Cross motif + soft arcs ────────────
const MedicalCrosses = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M70 40h20v20h20v20h-20v20h-20v-20h-20v-20h20z" fill={color} opacity="0.06" />
    <circle cx="130" cy="130" r="20" stroke={color} strokeWidth="1.5" opacity="0.08" strokeDasharray="4 3" />
    <path d="M10 140C40 120 60 130 90 110" stroke={color} strokeWidth="1.5" opacity="0.06" strokeLinecap="round" />
    <path d="M20 150C50 135 80 145 110 125" stroke={color} strokeWidth="1" opacity="0.04" strokeLinecap="round" />
  </svg>
);

// ─── Créatif decorative: Prism shards + radial burst ───────────────
const CreatifPrism = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="100,10 170,60 150,140 50,140 30,60" fill={color} opacity="0.04" />
    <polygon points="100,30 150,65 140,120 60,120 50,65" stroke={color} strokeWidth="1" opacity="0.08" fill="none" />
    <line x1="100" y1="10" x2="100" y2="140" stroke={color} strokeWidth="0.5" opacity="0.06" />
    <line x1="30" y1="60" x2="170" y2="60" stroke={color} strokeWidth="0.5" opacity="0.06" />
    <circle cx="100" cy="85" r="20" stroke={color} strokeWidth="1" opacity="0.05" fill="none" strokeDasharray="3 3" />
  </svg>
);

const CreatifBurst = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const x1 = 60 + Math.cos(angle) * 15;
      const y1 = 60 + Math.sin(angle) * 15;
      const x2 = 60 + Math.cos(angle) * (35 + (i % 3) * 10);
      const y2 = 60 + Math.sin(angle) * (35 + (i % 3) * 10);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1 + (i % 2) * 0.5} opacity={0.08 - (i % 4) * 0.01} strokeLinecap="round" />;
    })}
    <circle cx="60" cy="60" r="8" fill={color} opacity="0.06" />
  </svg>
);

// ─── Flux decorative: Flowing ribbons + aurora bands ───────────────
const FluxAurora = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <linearGradient id="flux-aurora-1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={color} stopOpacity="0" />
        <stop offset="30%" stopColor={color} stopOpacity="0.12" />
        <stop offset="70%" stopColor={color} stopOpacity="0.06" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0 100C80 40 160 120 240 70C320 20 360 90 400 60V80C360 100 320 50 240 90C160 140 80 60 0 120Z" fill="url(#flux-aurora-1)" />
    <path d="M0 130C100 80 200 150 300 100C350 75 380 110 400 95V110C380 120 350 90 300 115C200 165 100 95 0 145Z" fill={color} opacity="0.05" />
    <path d="M0 155C60 135 140 170 220 140C300 110 360 145 400 130V140C360 150 300 120 220 150C140 180 60 145 0 165Z" fill={color} opacity="0.03" />
  </svg>
);

const FluxOrb = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="flux-orb">
        <stop offset="0%" stopColor={color} stopOpacity="0.15" />
        <stop offset="60%" stopColor={color} stopOpacity="0.05" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#flux-orb)" />
    <circle cx="50" cy="50" r="25" stroke={color} strokeWidth="0.5" opacity="0.1" fill="none" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════
// 1. IMPACT — Contrasted sidebar (inspired by Marine Dupont)
//    Professional sidebar with contact, competences, qualités, divers.
//    Decorative: chevron stripes on sidebar + corner geometric accent.
// ═══════════════════════════════════════════════════════════════════
export const ImpactTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, sidebarPos, bulletStyle, bulletShape, gradient, gradientTarget, bgCircleColor, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, formationBulletShape, diversBulletShape, qualitesBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder, qualities, removeQuality, levelDisplay, caseStyle, titleDecoration, textAlign }: TemplateProps) => {
  const fondStyle = useGradientBg(gradient, gradientTarget);
  const rubriqueStyle = useGradientRubrique(gradient, gradientTarget, colors.primary);
  const { isDark } = useAutoContrast(gradient, gradientTarget);
  const headerTc = sectionTextColor("header", textColors, TEXT_WHITE);
  const compTc = sectionTextColor("competences", textColors, TEXT_WHITE);
  const expTc = sectionTextColor("experiences", textColors, TEXT_BLACK);
  const titleTc = resolveTitleTextColor(titleColor, headerTc, "white");
  const shapeCol = bgCircleColor || colors.accent;

  const sidebar = (
    <div className="w-[36%] flex flex-col overflow-hidden relative" style={{ background: rubriqueStyle.background || colors.primary, color: "white" }}>
      <ImpactStripes color={shapeCol} className="absolute top-0 right-0 w-12 h-full" style={{ opacity: 0.8 }} />
      <div className="absolute bottom-8 left-3 w-10 h-10" style={{ opacity: 0.1 }}>
        <svg viewBox="0 0 40 40" fill="none"><rect x="5" y="5" width="30" height="30" rx="2" transform="rotate(45 20 20)" stroke={shapeCol} strokeWidth="2" /></svg>
      </div>

      <div className="px-5 pt-6 pb-4 relative z-10">
        <h2 className="text-[20px] font-black uppercase leading-[1.08] tracking-tight" style={{ color: titleTc, fontFamily }}>
          {[profile.prenom, profile.nom].filter(Boolean).join("\n").split("\n").map((n, i) => <span key={i} className="block">{n || (i === 0 ? "PRÉNOM" : "NOM")}</span>)}
        </h2>
        <p className="text-[9px] font-medium uppercase tracking-[0.15em] mt-2 leading-snug" style={{ color: `${titleTc}bb` }}>
          {applyCase(profile.titre || "Titre du poste visé", caseStyle)}
        </p>
      </div>

      <div className="w-[85%] mx-auto h-[1px] relative z-10" style={{ background: "rgba(255,255,255,0.12)" }} />

      <div className="px-5 py-3 space-y-3 flex-1 overflow-y-auto text-[9px] relative z-10">
        <div>
          <p className="text-[7px] uppercase tracking-[0.25em] font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>{applyCase("Contact", caseStyle)}</p>
          <div className="space-y-1" style={{ color: withAlpha(headerTc, 0.8) }}>
            {profile.telephone && <div className="flex items-center gap-2"><Phone className="w-3 h-3 flex-shrink-0" style={{ color: shapeCol }} />{profile.telephone}</div>}
            {profile.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3 flex-shrink-0" style={{ color: shapeCol }} />{profile.email}</div>}
            {(profile.adresse || profile.ville) && <div className="flex items-center gap-2"><MapPin className="w-3 h-3 flex-shrink-0" style={{ color: shapeCol }} />{[profile.adresse, profile.codePostal, profile.ville].filter(Boolean).join(", ")}</div>}
          </div>
        </div>

        <div className="w-full h-[1px]" style={{ background: "rgba(255,255,255,0.08)" }} />

        {competencyDomains && competencyDomains.length > 0 && (
          <div>
            <p className="text-[7px] uppercase tracking-[0.25em] font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>{applyCase("Compétences", caseStyle)}</p>
            <DomainsBlock domains={competencyDomains} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} competencyBulletShape={competencyBulletShape} textColor={withAlpha(compTc, 0.85)} light levelDisplay={levelDisplay} />
          </div>
        )}

        {competencyDomains && competencyDomains.length > 0 && <div className="w-full h-[1px]" style={{ background: "rgba(255,255,255,0.08)" }} />}

        {qualities && qualities.length > 0 && (
          <div>
            <p className="text-[7px] uppercase tracking-[0.25em] font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>{applyCase("Qualités", caseStyle)}</p>
            <QualitiesBlock qualities={qualities} colors={colors} bulletStyle={bulletStyle} bulletShape={qualitesBulletShape} textColor="rgba(255,255,255,0.85)" light onRemove={removeQuality} />
          </div>
        )}

        {interests && interests.length > 0 && (
          <div>
            <p className="text-[7px] uppercase tracking-[0.25em] font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>{applyCase("Centres d'intérêt", caseStyle)}</p>
            <InterestsBlock interests={interests} colors={colors} bulletStyle={bulletStyle} bulletShape={diversBulletShape} textColor="rgba(255,255,255,0.85)" light onRemove={removeInterest} displayMode="list" />
          </div>
        )}
      </div>
    </div>
  );

  const main = (
    <div className="flex-1 flex flex-col bg-white relative overflow-hidden" style={{ ...fondStyle }}>
      <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${shapeCol}, ${colors.primary})` }} />
      <div className="absolute top-8 right-4 w-20 h-20 opacity-[0.05]">
        <svg viewBox="0 0 80 80" fill="none"><polygon points="40,5 75,40 40,75 5,40" stroke={shapeCol} strokeWidth="2" /><polygon points="40,20 60,40 40,60 20,40" fill={shapeCol} opacity="0.3" /></svg>
      </div>

      <div className="flex-1 px-6 py-5 overflow-y-auto relative z-10">
        {/* Expériences */}
        {professionalExperiences && professionalExperiences.length > 0 && (
          <>
            <SectionHeading color={expTc || colors.primary} icon={<Briefcase className="w-3.5 h-3.5" />} caseStyle={caseStyle} decoration={titleDecoration} align={textAlign}>Expérience Professionnelle</SectionHeading>
            <ExperiencesBlock experiences={professionalExperiences} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} getCompanyLogoUrl={getCompanyLogoUrl} textColor={expTc || (isDark ? "white" : undefined)} light={isDark} onRemove={removeProfessionalExperience} />
            <div style={{ marginTop: `calc(12px * var(--cv-gap-scale, 1))` }} />
          </>
        )}

        {/* Formation */}
        {formations && formations.length > 0 && (
          <>
            <SectionHeading color={expTc || colors.primary} icon={<GraduationCap className="w-3.5 h-3.5" />} caseStyle={caseStyle} decoration={titleDecoration} align={textAlign}>{formationTitle || "Formation"}</SectionHeading>
            <FormationBlock formations={formations} colors={colors} bulletStyle={bulletStyle} bulletShape={formationBulletShape} textColor={expTc} onRemove={removeFormation} />
            <div style={{ marginTop: `calc(12px * var(--cv-gap-scale, 1))` }} />
          </>
        )}

        {/* Atouts */}
        {atoutEntries.length > 0 && (
          <>
            <SectionHeading color={expTc || colors.primary} icon={<Star className="w-3.5 h-3.5" />} caseStyle={caseStyle} decoration={titleDecoration} align={textAlign}>Atouts</SectionHeading>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {atoutEntries.map(e => (
                <li key={e.id} className="flex items-center gap-2 group/item" style={{ fontSize: "9px", lineHeight: "1.3", paddingTop: "2px", paddingBottom: "2px" }}>
                  <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: shapeCol }} />
                  <span className="flex-1" style={{ color: expTc || undefined }}>{e.selected}</span>
                  <DeleteBtn onClick={() => removeEntry(e.id)} />
                </li>
              ))}
            </ul>
          </>
        )}

        {(!competencyDomains || competencyDomains.length === 0) && experienceEntries.length > 0 && (
          <>
            <SectionHeading color={expTc || colors.primary} icon={<Layers className="w-3.5 h-3.5" />} caseStyle={caseStyle} decoration={titleDecoration} align={textAlign}>Compétences</SectionHeading>
            <ul className="space-y-0.5">{experienceEntries.map(e => (
              <li key={e.id} className="flex items-start gap-2 text-[10px] group/item" style={{ color: expTc || undefined }}>
                <span className="mt-0.5"><ModernBullet type={e.bullet} color={shapeCol} style={bulletStyle} shape={bulletShape} /></span>
                <span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
              </li>
            ))}</ul>
          </>
        )}

        {professionalExperiences?.length === 0 && atoutEntries.length === 0 && (!competencyDomains || competencyDomains.length === 0) && (
          <EmptyState color={colors.primary} />
        )}
      </div>
    </div>
  );

  return (
    <div className="h-full flex text-[11px] leading-[1.4]" style={{ fontFamily: fontFamily || "'DM Sans', system-ui, sans-serif", flexDirection: sidebarPos === "right" ? "row-reverse" : "row" }}>
      {sidebar}{main}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 2. ARTISAN — Organic shapes, variable radius, warm textures
//    - Photo removed. bgCircleColor for background circles.
// ═══════════════════════════════════════════════════════════════════
export const ArtisanTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, sidebarPos, bulletStyle, bulletShape, gradient, gradientTarget, bgCircleColor, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, formationBulletShape, diversBulletShape, qualitesBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder, qualities, removeQuality, caseStyle, titleDecoration, textAlign }: TemplateProps) => {
  const fondStyle = useGradientBg(gradient, gradientTarget);
  const circleCol = bgCircleColor || colors.accent;
  const { isDark } = useAutoContrast(gradient, gradientTarget);
  const headerTc = sectionTextColor("header", textColors, TEXT_WHITE);
  const compTc = sectionTextColor("competences", textColors, colors.primary);
  const expTc = sectionTextColor("experiences", textColors, TEXT_BLACK);
  const titleTc = resolveTitleTextColor(titleColor, headerTc, withAlpha(TEXT_WHITE, 0.72));

  return (
    <div className="h-full flex flex-col text-[11px] leading-[1.8] relative overflow-hidden" style={{ fontFamily: fontFamily || "'DM Serif Display', Georgia, serif", background: `linear-gradient(180deg, hsl(40, 30%, 97%), hsl(35, 25%, 94%))`, ...fondStyle }}>
      <Blob color={circleCol} className="absolute -top-20 -right-20 w-56 h-56" style={{ opacity: 0.15 }} />
      <Blob color={circleCol} className="absolute bottom-10 -left-16 w-44 h-44" style={{ opacity: 0.12 }} />

      <div className="relative mx-4 mt-4 px-6 py-5 overflow-hidden" style={{ borderRadius: "28px 8px 28px 8px", background: `linear-gradient(135deg, ${colors.primary}, ${colors.swatch})`, boxShadow: `0 8px 32px ${colors.primary}25, 0 2px 8px ${colors.primary}15`, ...useGradientRubrique(gradient, gradientTarget) }}>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='%23fff'/%3E%3C/svg%3E\")" }} />
        <div className="relative">
          <p className="text-xl font-black uppercase tracking-wider leading-none" style={{ color: titleTc, fontFamily: fontFamily || "'DM Sans', sans-serif" }}>{profile.titre || "TITRE DU POSTE"}</p>
          <NameBlock profile={profile} light size="md" fontFamily={fontFamily} color={headerTc} />
        </div>
        <div className="relative mt-3" style={{ fontFamily: fontFamily || "'DM Sans', sans-serif" }}><ContactLine profile={profile} light colors={colors} fontFamily={fontFamily} textColor={withAlpha(headerTc, 0.72)} iconColor={titleTc} /></div>
      </div>

      <div className="flex-1 flex relative z-10 mt-4" style={{ flexDirection: sidebarPos === "left" ? "row-reverse" : "row" }}>
        <div className="flex-1 px-7 py-5 overflow-y-auto">
          {professionalExperiences && professionalExperiences.length > 0 && (
            <>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-3 pb-2 flex items-center gap-2" style={{ color: expTc || (isDark ? TEXT_WHITE : colors.primary), fontFamily: "'DM Sans', sans-serif" }}>
                <span className="w-6 h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.primary})` }} /> Expérience Professionnelle
              </h3>
              <ExperiencesBlock experiences={professionalExperiences} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} getCompanyLogoUrl={getCompanyLogoUrl} textColor={expTc || (isDark ? TEXT_WHITE : undefined)} light={isDark} onRemove={removeProfessionalExperience} />
              <div className="my-3" />
            </>
          )}
        {formations && formations.length > 0 && (
          <>
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] mb-3 pb-2 flex items-center gap-2" style={{ color: expTc || colors.primary }}>
              <GraduationCap className="w-3.5 h-3.5" /> {formationTitle || "Formation"}</h3>
            <FormationBlock formations={formations} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} textColor={expTc} onRemove={removeFormation} />
            <div className="my-3" />
          </>
        )}
          <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-4 pb-2 flex items-center gap-2" style={{ color: compTc || (isDark ? TEXT_WHITE : colors.primary), fontFamily: "'DM Sans', sans-serif" }}>
            <span className="w-6 h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.primary})` }} /> Compétences
          </h3>
          {competencyDomains && competencyDomains.length > 0 ? (
            <DomainsBlock domains={competencyDomains} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} competencyBulletShape={competencyBulletShape} textColor={compTc} light={isDark} />
          ) : experienceEntries.length > 0 ? (
            <ul className="space-y-0.5">{experienceEntries.map((e, i) => (
              <li key={e.id} className="flex items-start gap-3 group/item px-4 py-3 transition-all hover:translate-x-0.5"
                style={{ borderRadius: i % 2 === 0 ? "12px 4px 12px 4px" : "4px 12px 4px 12px", background: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)", boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)", backdropFilter: "blur(4px)" }}>
                <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} shape={bulletShape} /></span>
                <span className="flex-1" style={{ color: expTc || (isDark ? withAlpha(TEXT_WHITE, 0.85) : TEXT_BLACK), fontFamily: "'DM Sans', sans-serif" }}>{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} light={isDark} />
              </li>
            ))}</ul>
          ) : <EmptyState color={colors.accent} dark={isDark} />}
        </div>
        <div className="w-[34%] px-4 py-4 space-y-3" style={{ background: `${colors.primary}05` }}>
          <div className="p-3" style={{ borderRadius: "8px 20px 8px 20px", background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)", boxShadow: `0 4px 12px ${colors.primary}08` }}>
            <p className="text-[9px] uppercase tracking-widest font-semibold mb-2" style={{ color: compTc || colors.accent, fontFamily: "'DM Sans', sans-serif" }}>Atouts</p>
            {atoutEntries.length > 0 ? (
              <ul className="space-y-0.5">{atoutEntries.map(e => (
                <li key={e.id} className="flex items-start gap-2 text-[10px] group/item" style={{ color: compTc || TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>
                  <Star className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} /><span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
                </li>
              ))}</ul>
            ) : <p className="text-gray-400 italic text-[9px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Ajoutez…</p>}
          </div>
        </div>
      </div>
      {qualities && qualities.length > 0 && (
        <div className="px-5 py-2">
          <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: compTc || colors.accent }}>Qualités</p>
          <QualitiesBlock qualities={qualities} colors={colors} bulletStyle={bulletStyle} bulletShape={qualitesBulletShape} textColor={expTc} onRemove={removeQuality} />
        </div>
      )}
      {interests && interests.length > 0 && (
        <div className="px-5 py-2">
          <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: compTc || colors.accent }}>Divers</p>
          <InterestsBlock interests={interests} colors={colors} bulletStyle={bulletStyle} bulletShape={diversBulletShape || bulletShape} textColor={expTc} onRemove={removeInterest} displayMode={interestDisplayMode} />
        </div>
      )}
      <div className="px-6 py-2 text-[8px] text-gray-400 flex justify-between" style={{ fontFamily: "'DM Sans', sans-serif" }}><span>My CV Coach · Méthode Fred</span><span>L'Artisan</span></div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 3. CRÉATIF — Prismatic shards, radial bursts, gradient header with
//    angled clip-path. Wow-factor via layered gradient shapes.
// ═══════════════════════════════════════════════════════════════════
export const CreatifTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle, bulletShape, gradient, gradientTarget, bgCircleColor, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, formationBulletShape, diversBulletShape, qualitesBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder, qualities, removeQuality, levelDisplay, caseStyle, titleDecoration, textAlign }: TemplateProps) => {
  const fondStyle = useGradientBg(gradient, gradientTarget);
  const headerTc = sectionTextColor("header", textColors, TEXT_WHITE);
  const compTc = sectionTextColor("competences", textColors, colors.primary);
  const expTc = sectionTextColor("experiences", textColors, TEXT_BLACK);
  const titleTc = resolveTitleTextColor(titleColor, headerTc, "white");
  const shapeCol = bgCircleColor || colors.accent;

  return (
    <div className="h-full flex flex-col text-[11px] leading-[1.4] relative overflow-hidden" style={{ fontFamily: fontFamily || "'DM Sans', system-ui, sans-serif", background: "#fafbfc", ...fondStyle }}>
      {/* Layered gradient background shapes */}
      <div className="absolute top-0 left-0 w-full h-[55%]" style={{ background: `linear-gradient(160deg, ${colors.primary}, ${colors.accent}cc, ${shapeCol}90)`, clipPath: "polygon(0 0, 100% 0, 100% 70%, 0% 100%)" }} />
      <div className="absolute top-[5%] right-[-5%] w-[45%] h-[40%]" style={{ background: `radial-gradient(circle at 30% 40%, ${shapeCol}30, transparent 70%)`, borderRadius: "50%" }} />

      {/* Decorative prism + burst */}
      <CreatifPrism color="rgba(255,255,255,0.5)" className="absolute top-8 right-4 w-28 h-28" />
      <CreatifBurst color={shapeCol} className="absolute bottom-16 left-6 w-20 h-20" style={{ opacity: 0.4 }} />
      <CreatifBurst color="rgba(255,255,255,0.3)" className="absolute top-[20%] left-[15%] w-14 h-14" />

      {/* Floating gradient orbs */}
      <div className="absolute bottom-[25%] right-8 w-20 h-20 rounded-full" style={{ background: `radial-gradient(circle, ${shapeCol}20, transparent)` }} />
      <div className="absolute top-[35%] left-3 w-10 h-10 rounded-full" style={{ background: `radial-gradient(circle, ${colors.primary}15, transparent)` }} />

      {/* Header — strong white text on gradient */}
      <div className="relative px-7 pt-8 pb-10 z-10">
        <p className="text-[28px] font-black uppercase leading-[1.0] tracking-tight" style={{ color: titleTc, textShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
          {profile.titre || "TITRE DU POSTE"}
        </p>
        <h2 className="text-[14px] font-semibold mt-2" style={{ color: `${headerTc}dd` }}>
          {[profile.prenom, profile.nom].filter(Boolean).join(" ") || "Votre Nom"}
        </h2>
        <div className="mt-3">
          <ContactLine profile={profile} light colors={colors} fontFamily={fontFamily} textColor={withAlpha(headerTc, 0.75)} iconColor="rgba(255,255,255,0.7)" />
        </div>
      </div>

      {/* Angled separator with gradient */}
      <div className="relative z-10 -mt-4 mx-5">
        <div className="h-[3px] rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${shapeCol}50, rgba(255,255,255,0.4), transparent)` }} />
      </div>

      {/* Content — two columns */}
      <div className="flex-1 flex px-5 pt-4 pb-3 gap-5 overflow-y-auto relative z-10">
        {/* Left — Main content */}
        <div className="flex-1 space-y-3">
          {professionalExperiences && professionalExperiences.length > 0 && (
            <div className="p-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", boxShadow: `0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)` }}>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2" style={{ color: colors.primary }}>
                <span className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.accent}25, ${colors.primary}15)` }}><Briefcase className="w-3 h-3" style={{ color: colors.accent }} /></span>
                Expérience Professionnelle
              </h3>
              <ExperiencesBlock experiences={professionalExperiences} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} getCompanyLogoUrl={getCompanyLogoUrl} textColor={expTc} onRemove={removeProfessionalExperience} />
            </div>
          )}

          {formations && formations.length > 0 && (
            <div className="p-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", boxShadow: `0 4px 20px rgba(0,0,0,0.05)` }}>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2" style={{ color: colors.primary }}>
                <GraduationCap className="w-3.5 h-3.5" style={{ color: colors.accent }} /> {formationTitle || "Formation"}
              </h3>
              <FormationBlock formations={formations} colors={colors} bulletStyle={bulletStyle} bulletShape={formationBulletShape} textColor={expTc} onRemove={removeFormation} />
            </div>
          )}

          {competencyDomains && competencyDomains.length > 0 && (
            <div className="p-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", boxShadow: `0 4px 20px rgba(0,0,0,0.05)` }}>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2" style={{ color: colors.primary }}>
                <Layers className="w-3.5 h-3.5" style={{ color: colors.accent }} /> Compétences
              </h3>
              <DomainsBlock domains={competencyDomains} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} competencyBulletShape={competencyBulletShape} textColor={expTc} levelDisplay={levelDisplay} />
            </div>
          )}

          {!competencyDomains?.length && !professionalExperiences?.length && (
            <EmptyState color={colors.accent} />
          )}
        </div>

        {/* Right — Sidebar with gradient border cards */}
        <div className="w-[33%] space-y-3">
          {atoutEntries.length > 0 && (
            <div className="p-[1.5px] rounded-xl" style={{ background: `linear-gradient(180deg, ${colors.accent}40, ${colors.primary}20, transparent)` }}>
              <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)" }}>
                <p className="text-[8px] uppercase tracking-[0.2em] font-black mb-2" style={{ color: colors.accent }}>Atouts</p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>{atoutEntries.map(e => (
                  <li key={e.id} className="flex items-center gap-1.5 group/item" style={{ fontSize: "9px", lineHeight: "1.3", paddingTop: "1px", paddingBottom: "1px" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})` }} />
                    <span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
                  </li>
                ))}</ul>
              </div>
            </div>
          )}

          {qualities && qualities.length > 0 && (
            <div className="p-[1.5px] rounded-xl" style={{ background: `linear-gradient(180deg, ${colors.primary}30, ${colors.accent}15, transparent)` }}>
              <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.92)" }}>
                <p className="text-[8px] uppercase tracking-[0.2em] font-black mb-2" style={{ color: colors.primary }}>Qualités</p>
                <QualitiesBlock qualities={qualities} colors={colors} bulletStyle={bulletStyle} bulletShape={qualitesBulletShape} textColor={expTc} onRemove={removeQuality} />
              </div>
            </div>
          )}

          {interests && interests.length > 0 && (
            <div className="p-3 rounded-xl" style={{ background: `linear-gradient(180deg, ${shapeCol}08, ${colors.primary}04)` }}>
              <p className="text-[8px] uppercase tracking-[0.2em] font-black mb-2" style={{ color: colors.accent }}>Divers</p>
              <InterestsBlock interests={interests} colors={colors} bulletStyle={bulletStyle} bulletShape={diversBulletShape || bulletShape} textColor={expTc} onRemove={removeInterest} displayMode={interestDisplayMode} />
            </div>
          )}
        </div>
      </div>

      <div className="px-7 py-1.5 text-[7px] text-gray-300 flex justify-between relative z-10"><span>My CV Coach · Méthode Fred</span><span>Le Créatif</span></div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 4. MURAL — Grid overlays + diagonal accent shapes
// ═══════════════════════════════════════════════════════════════════
export const MuralTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, sidebarPos, bulletStyle, bulletShape, gradient, gradientTarget, bgCircleColor, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, formationBulletShape, diversBulletShape, qualitesBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder, qualities, removeQuality, caseStyle, titleDecoration, textAlign }: TemplateProps) => {
  const fondStyle = useGradientBg(gradient, gradientTarget);
  const { isDark } = useAutoContrast(gradient, gradientTarget);
  const headerTc = sectionTextColor("header", textColors, TEXT_WHITE);
  const compTc = sectionTextColor("competences", textColors, colors.primary);
  const expTc = sectionTextColor("experiences", textColors, TEXT_BLACK);
  const titleTc = resolveTitleTextColor(titleColor, headerTc, colors.accent);
  const shapeCol = bgCircleColor || colors.accent;
  return (
    <div className="h-full flex flex-col text-[11px] leading-[1.8] relative" style={{ fontFamily: fontFamily || "'DM Sans', system-ui, sans-serif", background: `linear-gradient(180deg, hsl(210,10%,96%), hsl(210,8%,93%))`, ...fondStyle }}>
      {/* Decorative grid + diagonal shapes */}
      <MuralGridAccent color={shapeCol} className="absolute top-24 -right-4 w-28 h-28" />
      <MuralGridAccent color={shapeCol} className="absolute bottom-20 -left-6 w-24 h-24" style={{ transform: "rotate(90deg)" }} />
      <div className="absolute top-[55%] right-12 w-8 h-8" style={{ opacity: 0.06 }}>
        <svg viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="24" height="24" rx="2" fill={shapeCol} /></svg>
      </div>
      <div className="px-7 py-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.swatch})`, boxShadow: `0 6px 24px ${colors.primary}30`, ...useGradientRubrique(gradient, gradientTarget) }}>
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]"><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="none" stroke="white" strokeWidth="0.5"/></pattern><rect width="100%" height="100%" fill="url(#grid)"/></svg>
        <div className="relative">
          <p className="text-2xl font-black uppercase tracking-wider leading-none" style={{ color: titleTc }}>{profile.titre || "TITRE DU POSTE"}</p>
          <NameBlock profile={profile} light size="lg" color={headerTc} />
          <div className="mt-3"><ContactLine profile={profile} light colors={colors} fontFamily={fontFamily} textColor={withAlpha(headerTc, 0.72)} iconColor={titleTc} /></div>
        </div>
      </div>

      <div className="flex-1 flex" style={{ flexDirection: sidebarPos === "left" ? "row-reverse" : "row" }}>
        <div className="flex-1 px-5 py-4 overflow-y-auto">
          {professionalExperiences && professionalExperiences.length > 0 && (
            <>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4" style={{ color: colors.primary }} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: expTc || colors.primary }}>Expérience Professionnelle</h3>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${colors.primary}25, transparent)` }} />
              </div>
              <ExperiencesBlock experiences={professionalExperiences} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} getCompanyLogoUrl={getCompanyLogoUrl} textColor={expTc} onRemove={removeProfessionalExperience} />
              <div className="my-3" />
            </>
          )}
        {formations && formations.length > 0 && (
          <>
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] mb-3 pb-2 flex items-center gap-2" style={{ color: expTc || colors.primary }}>
              <GraduationCap className="w-3.5 h-3.5" /> {formationTitle || "Formation"}</h3>
            <FormationBlock formations={formations} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} textColor={expTc} onRemove={removeFormation} />
            <div className="my-3" />
          </>
        )}
          <div className="flex items-center gap-2 mb-3">
            <Grid3X3 className="w-4 h-4" style={{ color: colors.primary }} />
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: compTc || colors.primary }}>Compétences</h3>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${colors.primary}25, transparent)` }} />
          </div>
          {competencyDomains && competencyDomains.length > 0 ? (
            <DomainsBlock domains={competencyDomains} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} competencyBulletShape={competencyBulletShape} textColor={expTc} />
          ) : experienceEntries.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">{experienceEntries.map(e => (
              <div key={e.id} className="flex items-start gap-2.5 group/item p-2.5 transition-all hover:translate-y-[-1px]"
                style={{ borderRadius: "8px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(4px)", boxShadow: `0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)`, borderLeft: `4px solid ${e.bullet === "technique" ? colors.primary : colors.accent}` }}>
                <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} shape={bulletShape} /></span>
                <span className="flex-1 font-medium" style={{ color: expTc || TEXT_BLACK }}>{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
              </div>
            ))}</div>
          ) : <EmptyState color={colors.primary} label="Blocs compétences ici" />}
        </div>

        <div className="w-[30%] py-4 px-3 relative" style={{ background: `${colors.primary}06` }}>
          <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: `linear-gradient(180deg, ${colors.accent}, ${colors.primary})` }} />
          <div className="flex items-center gap-1.5 mb-3 ml-2">
            <span className="w-3 h-3 rounded-sm" style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`, boxShadow: `0 2px 4px ${colors.accent}30` }} />
            <p className="text-[9px] uppercase tracking-[0.2em] font-black" style={{ color: compTc || colors.primary }}>Atouts</p>
          </div>
          {atoutEntries.length > 0 ? (
            <ul className="space-y-2 ml-2">{atoutEntries.map(e => (
              <li key={e.id} className="flex items-start gap-2 text-[10px] group/item p-2 bg-white/60 rounded-lg"
                style={{ color: compTc || TEXT_MUTED, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: `1px solid ${colors.accent}15` }}>
                <ArrowRightCircle className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} /><span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
              </li>
            ))}</ul>
          ) : <p className="text-gray-400 italic text-[9px] ml-2">Ajoutez…</p>}
        </div>
      </div>
      {qualities && qualities.length > 0 && (
        <div className="px-5 py-2">
          <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: compTc || colors.accent }}>Qualités</p>
          <QualitiesBlock qualities={qualities} colors={colors} bulletStyle={bulletStyle} bulletShape={qualitesBulletShape} textColor={expTc} onRemove={removeQuality} />
        </div>
      )}
      {interests && interests.length > 0 && (
        <div className="px-5 py-2">
          <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: compTc || colors.accent }}>Divers</p>
          <InterestsBlock interests={interests} colors={colors} bulletStyle={bulletStyle} bulletShape={diversBulletShape || bulletShape} textColor={expTc} onRemove={removeInterest} displayMode={interestDisplayMode} />
        </div>
      )}
      <div className="px-5 py-2 text-[8px] text-gray-400 flex justify-between" style={{ background: `linear-gradient(90deg, ${colors.primary}08, transparent)` }}><span>My CV Coach · Méthode Fred</span><span>Mural</span></div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 5. MAGAZINE — Diagonal gradient ribbons, mosaic accents, two-tone
//    sidebar with radial gradient glow. Modern editorial feel.
// ═══════════════════════════════════════════════════════════════════
export const MagazineTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle, bulletShape, gradient, gradientTarget, bgCircleColor, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, formationBulletShape, diversBulletShape, qualitesBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder, qualities, removeQuality, levelDisplay, caseStyle, titleDecoration, textAlign }: TemplateProps) => {
  const fondStyle = useGradientBg(gradient, gradientTarget);
  const headerTc = sectionTextColor("header", textColors, TEXT_WHITE);
  const compTc = sectionTextColor("competences", textColors, "rgba(255,255,255,0.9)");
  const expTc = sectionTextColor("experiences", textColors, TEXT_BLACK);
  const titleTc = resolveTitleTextColor(titleColor, headerTc, "white");
  const shapeCol = bgCircleColor || colors.accent;

  return (
    <div className="h-full flex text-[11px] leading-[1.4]" style={{ fontFamily: fontFamily || "'DM Sans', system-ui, sans-serif", ...fondStyle }}>
      {/* LEFT SIDEBAR — full gradient with radial glow */}
      <div className="w-[34%] flex flex-col relative overflow-hidden" style={{ background: `linear-gradient(200deg, ${colors.primary}, ${colors.accent}dd, ${shapeCol}bb)` }}>
        {/* Radial glow orb */}
        <div className="absolute top-[15%] left-[20%] w-32 h-32 rounded-full" style={{ background: `radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)` }} />
        <div className="absolute bottom-[10%] right-[-10%] w-24 h-24 rounded-full" style={{ background: `radial-gradient(circle, ${shapeCol}25, transparent 70%)` }} />
        {/* Mosaic pattern */}
        <MagazineMosaic color="rgba(255,255,255,0.4)" className="absolute top-0 right-0 w-20 h-full" style={{ opacity: 0.5 }} />
        
        {/* Name + Title */}
        <div className="px-5 pt-7 pb-4 relative z-10">
          <h2 className="text-[20px] font-black uppercase leading-[1.05] tracking-tight" style={{ color: titleTc, fontFamily, textShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
            {profile.prenom && <span className="block">{profile.prenom}</span>}
            <span className="block">{profile.nom || "NOM"}</span>
          </h2>
          <div className="mt-2 h-[2px] w-12 rounded-full" style={{ background: `linear-gradient(90deg, rgba(255,255,255,0.6), transparent)` }} />
          <p className="text-[9px] font-medium uppercase tracking-[0.15em] mt-2" style={{ color: `${titleTc}cc` }}>{profile.titre || "Titre du poste"}</p>
        </div>

        <div className="px-5 py-3 space-y-3 flex-1 overflow-y-auto relative z-10">
          {/* Contact */}
          <div>
            <p className="text-[7px] uppercase tracking-[0.25em] font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>Contact</p>
            <div className="space-y-1.5 text-[9px]" style={{ color: "rgba(255,255,255,0.85)" }}>
              {profile.telephone && <div className="flex items-center gap-2"><Phone className="w-3 h-3 flex-shrink-0" style={{ color: "rgba(255,255,255,0.5)" }} />{profile.telephone}</div>}
              {profile.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3 flex-shrink-0" style={{ color: "rgba(255,255,255,0.5)" }} /><span className="break-all">{profile.email}</span></div>}
              {(profile.adresse || profile.ville) && <div className="flex items-center gap-2"><MapPin className="w-3 h-3 flex-shrink-0" style={{ color: "rgba(255,255,255,0.5)" }} />{[profile.adresse, profile.codePostal, profile.ville].filter(Boolean).join(", ")}</div>}
            </div>
          </div>

          <div className="w-full h-[1px]" style={{ background: "rgba(255,255,255,0.12)" }} />

          {/* Compétences in sidebar with levels */}
          {competencyDomains && competencyDomains.length > 0 && (
            <div>
              <p className="text-[7px] uppercase tracking-[0.25em] font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>Compétences</p>
              <DomainsBlock domains={competencyDomains} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} competencyBulletShape={competencyBulletShape} textColor="rgba(255,255,255,0.85)" light levelDisplay={levelDisplay} />
            </div>
          )}

          {/* Atouts */}
          {atoutEntries.length > 0 && (
            <div>
              <p className="text-[7px] uppercase tracking-[0.25em] font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>Atouts</p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {atoutEntries.map(e => (
                  <li key={e.id} className="flex items-center gap-1.5 group/item" style={{ fontSize: "9px", lineHeight: "1.3", paddingTop: "1px", paddingBottom: "1px", color: "rgba(255,255,255,0.85)" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(255,255,255,0.4)" }} />
                    <span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} light />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Qualités */}
          {qualities && qualities.length > 0 && (
            <div>
              <p className="text-[7px] uppercase tracking-[0.25em] font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>Qualités</p>
              <QualitiesBlock qualities={qualities} colors={colors} bulletStyle={bulletStyle} bulletShape={qualitesBulletShape} textColor="rgba(255,255,255,0.85)" light onRemove={removeQuality} />
            </div>
          )}

          {/* Divers */}
          {interests && interests.length > 0 && (
            <div>
              <p className="text-[7px] uppercase tracking-[0.25em] font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>Centres d'intérêt</p>
              <InterestsBlock interests={interests} colors={colors} bulletStyle={bulletStyle} bulletShape={diversBulletShape || bulletShape} textColor="rgba(255,255,255,0.85)" light onRemove={removeInterest} displayMode="list" />
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT — clean white with diagonal ribbon accent */}
      <div className="flex-1 flex flex-col bg-white overflow-y-auto relative">
        {/* Diagonal gradient ribbon at top */}
        <MagazineRibbon color={shapeCol} className="absolute top-0 left-0 w-full h-16" />
        <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.primary}, ${shapeCol})` }} />

        <div className="flex-1 px-6 py-5 relative z-10">
          {/* Expériences */}
          {professionalExperiences && professionalExperiences.length > 0 && (
            <>
              <SectionHeading color={expTc || colors.primary} icon={<Briefcase className="w-3.5 h-3.5" />}>Expériences Professionnelles</SectionHeading>
              <ExperiencesBlock experiences={professionalExperiences} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} getCompanyLogoUrl={getCompanyLogoUrl} textColor={expTc} onRemove={removeProfessionalExperience} />
              <div className="my-4" />
            </>
          )}

          {/* Formation */}
          {formations && formations.length > 0 && (
            <>
              <SectionHeading color={expTc || colors.primary} icon={<GraduationCap className="w-3.5 h-3.5" />}>{formationTitle || "Formation"}</SectionHeading>
              <FormationBlock formations={formations} colors={colors} bulletStyle={bulletStyle} bulletShape={formationBulletShape} textColor={expTc} onRemove={removeFormation} />
              <div className="my-4" />
            </>
          )}

          {/* Fallback competences if not in sidebar */}
          {!competencyDomains?.length && experienceEntries.length > 0 && (
            <>
              <SectionHeading color={colors.primary} icon={<Layers className="w-3.5 h-3.5" />}>Compétences</SectionHeading>
              <ul className="space-y-0.5">{experienceEntries.map(e => (
                <li key={e.id} className="flex items-start gap-2.5 group/item py-1 text-[10px]" style={{ color: expTc || undefined }}>
                  <span className="mt-0.5"><ModernBullet type={e.bullet} color={colors.accent} style={bulletStyle} shape={bulletShape} /></span>
                  <span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
                </li>
              ))}</ul>
            </>
          )}
        </div>

        <div className="px-6 py-1.5 text-[7px] text-gray-300 flex justify-between"><span>My CV Coach</span><span>Magazine</span></div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 7. MÉDICAL — Cross motifs + soft arc decorative shapes
// ═══════════════════════════════════════════════════════════════════
export const MedicalTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle, bulletShape, gradient, gradientTarget, bgCircleColor, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, formationBulletShape, diversBulletShape, qualitesBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder, qualities, removeQuality, caseStyle, titleDecoration, textAlign }: TemplateProps) => {
  const fondStyle = useGradientBg(gradient, gradientTarget);
  const headerTc = sectionTextColor("header", textColors, TEXT_WHITE);
  const compTc = sectionTextColor("competences", textColors, colors.primary);
  const expTc = sectionTextColor("experiences", textColors, TEXT_BLACK);
  const titleTc = resolveTitleTextColor(titleColor, headerTc, withAlpha(TEXT_WHITE, 0.72));
  const shapeCol = bgCircleColor || colors.accent;
  return (
    <div className="h-full flex flex-col text-[11px] leading-[1.8] relative overflow-hidden" style={{ fontFamily: fontFamily || "'DM Sans', system-ui, sans-serif", background: `linear-gradient(180deg, ${colors.primary}06, white, ${shapeCol}04)`, ...fondStyle }}>
      {/* Decorative medical crosses + arcs */}
      <MedicalCrosses color={shapeCol} className="absolute top-16 -right-8 w-36 h-36" />
      <MedicalCrosses color={shapeCol} className="absolute bottom-8 -left-10 w-32 h-32" style={{ transform: "rotate(180deg)" }} />
      <div className="absolute top-[40%] right-6 w-10 h-10" style={{ opacity: 0.05 }}>
        <svg viewBox="0 0 40 40" fill="none"><path d="M15 10h10v8h8v10h-8v8h-10v-8h-8v-10h8z" fill={shapeCol} /></svg>
      </div>

      <div className="relative mx-5 mt-4 px-6 py-5 overflow-hidden" style={{ borderRadius: "24px", background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, boxShadow: `0 8px 32px ${colors.primary}20, 0 4px 12px ${colors.accent}15`, ...useGradientRubrique(gradient, gradientTarget) }}>
        <Blob color="rgba(255,255,255,0.05)" className="absolute -bottom-12 -right-8 w-40 h-40" />
        <div className="relative z-10">
          <p className="text-xl font-black uppercase tracking-wider leading-none" style={{ color: titleTc }}>{profile.titre || "TITRE DU POSTE"}</p>
          <NameBlock profile={profile} light size="md" fontFamily={fontFamily} color={headerTc} />
          <div className="mt-2"><ContactLine profile={profile} light colors={colors} fontFamily={fontFamily} textColor={withAlpha(headerTc, 0.72)} iconColor={titleTc} /></div>
        </div>
      </div>

      <div className="flex-1 px-5 py-4 overflow-y-auto space-y-3 relative z-10">
        <OrderedSections sectionOrder={sectionOrder}
          renderExperiences={() => professionalExperiences && professionalExperiences.length > 0 ? (
            <div className="p-4" style={{ borderRadius: "20px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", boxShadow: `0 4px 20px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px ${colors.accent}10` }}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 flex items-center gap-2" style={{ color: expTc || colors.primary }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.accent}20, ${colors.primary}15)` }}><Briefcase className="w-3 h-3" style={{ color: colors.accent }} /></span>
                EXPÉRIENCE PROFESSIONNELLE
              </h3>
              <ExperiencesBlock experiences={professionalExperiences} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} getCompanyLogoUrl={getCompanyLogoUrl} textColor={expTc} onRemove={removeProfessionalExperience} />
            </div>
          ) : null}
          renderFormation={() => formations && formations.length > 0 ? (
            <div className="p-4" style={{ borderRadius: "20px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", boxShadow: `0 4px 20px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px ${colors.accent}10` }}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 flex items-center gap-2" style={{ color: expTc || colors.primary }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.accent}20, ${colors.primary}15)` }}><GraduationCap className="w-3 h-3" style={{ color: colors.accent }} /></span>
                {(formationTitle || "FORMATION").toUpperCase()}
              </h3>
              <FormationBlock formations={formations} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} textColor={expTc} onRemove={removeFormation} />
            </div>
          ) : null}
          renderCompetences={() => (
            <div className="p-4" style={{ borderRadius: "20px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", boxShadow: `0 4px 20px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px ${colors.accent}10` }}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 flex items-center gap-2" style={{ color: compTc || colors.primary }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.accent}20, ${colors.primary}15)` }}><Layers className="w-3 h-3" style={{ color: colors.accent }} /></span>
                COMPÉTENCES
              </h3>
              {competencyDomains && competencyDomains.length > 0 ? (
                <DomainsBlock domains={competencyDomains} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} competencyBulletShape={competencyBulletShape} textColor={expTc} />
              ) : experienceEntries.length > 0 ? (
                <ul className="space-y-0.5">{experienceEntries.map(e => (
                  <li key={e.id} className="flex items-start gap-2.5 group/item px-3 py-1.5 rounded-2xl transition-all hover:bg-white/80" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                    <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} shape={bulletShape} /></span>
                    <span className="flex-1" style={{ color: expTc || TEXT_BLACK }}>{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
                  </li>
                ))}</ul>
              ) : <EmptyState color={colors.accent} />}
            </div>
          )}
          renderQualites={() => qualities && qualities.length > 0 ? (
            <div className="p-4" style={{ borderRadius: "20px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", boxShadow: `0 4px 20px rgba(0,0,0,0.04), 0 0 0 1px ${colors.accent}10` }}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 flex items-center gap-2" style={{ color: compTc || colors.accent }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}10)` }}><Heart className="w-3 h-3" style={{ color: colors.primary }} /></span>
                QUALITÉS
              </h3>
              <QualitiesBlock qualities={qualities} colors={colors} bulletStyle={bulletStyle} bulletShape={qualitesBulletShape} textColor={expTc} onRemove={removeQuality} />
            </div>
          ) : null}
          renderDivers={() => (
            <>
              <div className="p-4" style={{ borderRadius: "20px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", boxShadow: `0 4px 20px rgba(0,0,0,0.04), 0 0 0 1px ${colors.primary}08` }}>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 flex items-center gap-2" style={{ color: compTc || colors.accent }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}10)` }}><Star className="w-3 h-3" style={{ color: colors.primary }} /></span>
                  QUALITÉS HUMAINES
                </h3>
                {atoutEntries.length > 0 ? (
                  <div className="flex flex-wrap gap-2">{atoutEntries.map(e => (
                    <span key={e.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] group/item"
                      style={{ color: compTc || TEXT_MUTED, borderRadius: "20px", background: `linear-gradient(135deg, ${colors.accent}08, ${colors.primary}05)`, border: `1px solid ${colors.accent}15`, boxShadow: `0 2px 6px ${colors.accent}06` }}>
                      {e.selected}<DeleteBtn onClick={() => removeEntry(e.id)} />
                    </span>
                  ))}</div>
                ) : <p className="text-gray-400 italic text-[9px]">Ajoutez des atouts…</p>}
              </div>
              {interests && interests.length > 0 && (
                <div className="px-1 py-2">
                  <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: compTc || colors.accent }}>DIVERS</p>
                  <InterestsBlock interests={interests} colors={colors} bulletStyle={bulletStyle} bulletShape={diversBulletShape || bulletShape} textColor={expTc} onRemove={removeInterest} displayMode={interestDisplayMode} />
                </div>
              )}
            </>
          )}
        />
      </div>
      <div className="px-6 py-2 text-[8px] text-gray-400 flex justify-between"><span>My CV Coach · Méthode Fred</span><span>Médical</span></div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 8. FLUX — Aurora bands, flowing gradient ribbons, radial orbs.
//    Organic motion feel with layered translucent gradient shapes.
// ═══════════════════════════════════════════════════════════════════
export const FluxTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle, bulletShape, gradient, gradientTarget, bgCircleColor, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, formationBulletShape, diversBulletShape, qualitesBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder, qualities, removeQuality, levelDisplay, caseStyle, titleDecoration, textAlign }: TemplateProps) => {
  const fondStyle = useGradientBg(gradient, gradientTarget);
  const headerTc = sectionTextColor("header", textColors, TEXT_WHITE);
  const compTc = sectionTextColor("competences", textColors, colors.primary);
  const expTc = sectionTextColor("experiences", textColors, TEXT_BLACK);
  const titleTc = resolveTitleTextColor(titleColor, headerTc, "white");
  const shapeCol = bgCircleColor || colors.accent;

  return (
    <div className="h-full flex flex-col text-[11px] leading-[1.4] relative overflow-hidden" style={{ fontFamily: fontFamily || "'DM Sans', system-ui, sans-serif", background: `linear-gradient(170deg, ${colors.primary}08, white, ${shapeCol}06)`, ...fondStyle }}>
      {/* Aurora gradient bands at bottom */}
      <FluxAurora color={shapeCol} className="absolute bottom-0 left-0 w-full h-48" style={{ opacity: 0.7 }} />
      
      {/* Radial orbs */}
      <FluxOrb color={shapeCol} className="absolute top-[30%] right-[-3%] w-32 h-32" />
      <FluxOrb color={colors.primary} className="absolute bottom-[20%] left-[-5%] w-28 h-28" style={{ opacity: 0.5 }} />
      
      {/* Flowing diagonal gradient stripe */}
      <div className="absolute top-0 right-0 w-[60%] h-[35%]" style={{ background: `linear-gradient(150deg, ${colors.primary}dd, ${colors.accent}aa, ${shapeCol}80)`, clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 80%)", opacity: 0.95 }} />

      {/* Header — positioned over the gradient stripe */}
      <div className="relative px-7 pt-7 pb-6 z-10">
        <div className="flex items-start gap-4">
          {/* Left: title info on white area */}
          <div className="flex-1">
            <p className="text-[24px] font-black uppercase leading-[1.0] tracking-tight" style={{ color: colors.primary }}>
              {profile.titre || "TITRE DU POSTE"}
            </p>
            <h2 className="text-[13px] font-bold mt-1.5" style={{ color: expTc }}>
              {[profile.prenom, profile.nom].filter(Boolean).join(" ") || "Votre Nom"}
            </h2>
          </div>
          {/* Right: contact on gradient area */}
          <div className="pt-2 text-right">
            <div className="space-y-1 text-[9px]" style={{ color: "rgba(255,255,255,0.85)" }}>
              {profile.telephone && <div className="flex items-center justify-end gap-1.5"><span>{profile.telephone}</span><Phone className="w-3 h-3" style={{ color: "rgba(255,255,255,0.6)" }} /></div>}
              {profile.email && <div className="flex items-center justify-end gap-1.5"><span>{profile.email}</span><Mail className="w-3 h-3" style={{ color: "rgba(255,255,255,0.6)" }} /></div>}
              {(profile.adresse || profile.ville) && <div className="flex items-center justify-end gap-1.5"><span>{[profile.codePostal, profile.ville].filter(Boolean).join(" ")}</span><MapPin className="w-3 h-3" style={{ color: "rgba(255,255,255,0.6)" }} /></div>}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient separator */}
      <div className="relative z-10 mx-6">
        <div className="h-[2px] rounded-full" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent}, ${shapeCol}, transparent)` }} />
      </div>

      {/* Content area */}
      <div className="flex-1 flex px-5 pt-4 pb-3 gap-5 overflow-y-auto relative z-10">
        {/* Main column */}
        <div className="flex-1 space-y-3">
          {professionalExperiences && professionalExperiences.length > 0 && (
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2" style={{ color: colors.primary }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.accent}20, ${colors.primary}15)` }}><Briefcase className="w-3 h-3" style={{ color: colors.accent }} /></span>
                Expérience Professionnelle
              </h3>
              <ExperiencesBlock experiences={professionalExperiences} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} getCompanyLogoUrl={getCompanyLogoUrl} textColor={expTc} onRemove={removeProfessionalExperience} />
            </div>
          )}

          {formations && formations.length > 0 && (
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2" style={{ color: colors.primary }}>
                <GraduationCap className="w-3.5 h-3.5" style={{ color: colors.accent }} /> {formationTitle || "Formation"}
              </h3>
              <FormationBlock formations={formations} colors={colors} bulletStyle={bulletStyle} bulletShape={formationBulletShape} textColor={expTc} onRemove={removeFormation} />
            </div>
          )}

          {competencyDomains && competencyDomains.length > 0 && (
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2" style={{ color: colors.primary }}>
                <Layers className="w-3.5 h-3.5" style={{ color: colors.accent }} /> Compétences
              </h3>
              <DomainsBlock domains={competencyDomains} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} competencyBulletShape={competencyBulletShape} textColor={expTc} levelDisplay={levelDisplay} />
            </div>
          )}

          {!competencyDomains?.length && !professionalExperiences?.length && experienceEntries.length > 0 && (
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: colors.primary }}>Compétences</h3>
              <ul className="space-y-0.5">{experienceEntries.map(e => (
                <li key={e.id} className="flex items-start gap-2 group/item" style={{ fontSize: "9px", lineHeight: "1.3" }}>
                  <span className="mt-0.5"><ModernBullet type={e.bullet} color={colors.accent} style={bulletStyle} shape={bulletShape} /></span>
                  <span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
                </li>
              ))}</ul>
            </div>
          )}

          {!competencyDomains?.length && !professionalExperiences?.length && experienceEntries.length === 0 && (
            <EmptyState color={colors.accent} label="Le flux de compétences apparaît ici" />
          )}
        </div>

        {/* Right sidebar — gradient border cards */}
        <div className="w-[30%] space-y-3">
          {atoutEntries.length > 0 && (
            <div className="p-[1.5px] rounded-xl" style={{ background: `linear-gradient(180deg, ${colors.accent}35, ${colors.primary}15, transparent)` }}>
              <div className="p-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)" }}>
                <p className="text-[8px] uppercase tracking-[0.2em] font-black mb-1.5" style={{ color: colors.accent }}>Atouts</p>
                <div className="flex flex-wrap gap-1.5">{atoutEntries.map(e => (
                  <span key={e.id} className="inline-flex items-center gap-1 px-2 py-0.5 text-[8px] group/item"
                    style={{ borderRadius: "8px", background: `linear-gradient(135deg, ${colors.accent}08, ${colors.primary}05)`, border: `1px solid ${colors.accent}15` }}>
                    <ChevronRight className="w-2 h-2" style={{ color: colors.accent }} />{e.selected}<DeleteBtn onClick={() => removeEntry(e.id)} />
                  </span>
                ))}</div>
              </div>
            </div>
          )}

          {qualities && qualities.length > 0 && (
            <div className="p-2.5 rounded-xl" style={{ background: `linear-gradient(180deg, ${colors.primary}08, ${shapeCol}04)` }}>
              <p className="text-[8px] uppercase tracking-[0.2em] font-black mb-1.5" style={{ color: colors.primary }}>Qualités</p>
              <QualitiesBlock qualities={qualities} colors={colors} bulletStyle={bulletStyle} bulletShape={qualitesBulletShape} textColor={expTc} onRemove={removeQuality} />
            </div>
          )}

          {interests && interests.length > 0 && (
            <div className="p-2.5 rounded-xl" style={{ background: `linear-gradient(180deg, ${shapeCol}06, transparent)` }}>
              <p className="text-[8px] uppercase tracking-[0.2em] font-black mb-1.5" style={{ color: colors.accent }}>Divers</p>
              <InterestsBlock interests={interests} colors={colors} bulletStyle={bulletStyle} bulletShape={diversBulletShape || bulletShape} textColor={expTc} onRemove={removeInterest} displayMode={interestDisplayMode} />
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-1.5 text-[7px] text-gray-300 flex justify-between relative z-10"><span>My CV Coach · Méthode Fred</span><span>Flux</span></div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 9. SÉRÉNITÉ — Geometric waves, flowing lines, diamond accents
//    Distinct from Artisan: uses angular/geometric decorative elements
//    instead of organic blobs. bgCircleColor controls shape tint.
// ═══════════════════════════════════════════════════════════════════

const SereniteWave = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path d="M0 60C60 20 120 80 200 50C280 20 340 90 400 60V120H0Z" fill={color} />
    <path d="M0 75C80 40 160 95 240 65C320 35 360 80 400 70V120H0Z" fill={color} opacity="0.5" />
  </svg>
);

const SereniteCornerGeo = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="30" width="50" height="50" rx="6" transform="rotate(45 55 55)" fill={color} opacity="0.12" />
    <rect x="70" y="10" width="35" height="35" rx="4" transform="rotate(30 87 27)" fill={color} opacity="0.08" />
    <circle cx="140" cy="50" r="18" fill={color} opacity="0.06" />
    <polygon points="20,120 50,90 80,120" fill={color} opacity="0.1" />
    <line x1="10" y1="160" x2="170" y2="100" stroke={color} strokeWidth="1.5" opacity="0.08" />
    <line x1="30" y1="170" x2="160" y2="130" stroke={color} strokeWidth="1" opacity="0.06" />
  </svg>
);

const SereniteDiamondRow = ({ color, style }: { color: string; style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 400 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-4">
    {[40, 100, 160, 220, 280, 340].map((x, i) => (
      <rect key={i} x={x - 4} y="4" width="8" height="8" rx="1" transform={`rotate(45 ${x} 8)`} fill={color} opacity={0.15 - i * 0.015} />
    ))}
    <line x1="0" y1="8" x2="400" y2="8" stroke={color} strokeWidth="0.5" opacity="0.1" />
  </svg>
);

export const SereniteTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle, bulletShape, gradient, gradientTarget, bgCircleColor, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, formationBulletShape, diversBulletShape, qualitesBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder, qualities, removeQuality, levelDisplay, caseStyle, titleDecoration, textAlign }: TemplateProps) => {
  const fondStyle = useGradientBg(gradient, gradientTarget);
  const headerTc = sectionTextColor("header", textColors, TEXT_BLACK);
  const compTc = sectionTextColor("competences", textColors, colors.primary);
  const expTc = sectionTextColor("experiences", textColors, TEXT_BLACK);
  const titleTc = resolveTitleTextColor(titleColor, headerTc, colors.accent);
  const shapeCol = bgCircleColor || colors.accent;

  return (
    <div className="h-full flex flex-col text-[11px] leading-[1.4] relative overflow-hidden" style={{ fontFamily: fontFamily || "'DM Sans', system-ui, sans-serif", background: "#fcfcfd", ...fondStyle }}>
      {/* Decorative geometric elements — NOT blobs */}
      <SereniteCornerGeo color={shapeCol} className="absolute -top-4 -right-4 w-44 h-44" />
      <SereniteCornerGeo color={shapeCol} className="absolute bottom-12 -left-8 w-36 h-36" style={{ transform: "rotate(180deg)" }} />
      <div className="absolute top-[45%] right-4 w-12 h-12" style={{ opacity: 0.08 }}>
        <svg viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="4" transform="rotate(45 24 24)" fill={shapeCol} /></svg>
      </div>
      <div className="absolute top-[28%] left-6 w-8 h-8" style={{ opacity: 0.06 }}>
        <svg viewBox="0 0 32 32" fill="none"><polygon points="16,2 30,16 16,30 2,16" fill={shapeCol} /></svg>
      </div>

      {/* Header — strong name identity */}
      <div className="relative px-7 pt-7 pb-3 z-10">
        <h2 className="text-[26px] font-black uppercase leading-[1.05] tracking-tight" style={{ color: headerTc, fontFamily }}>
          {[profile.prenom, profile.nom].filter(Boolean).join(" ") || "PRÉNOM NOM"}
        </h2>
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] mt-1" style={{ color: titleTc }}>
          {profile.titre || "Votre titre de poste"}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[9px]" style={{ color: TEXT_MUTED }}>
          {profile.telephone && <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" style={{ color: shapeCol }} />{profile.telephone}</span>}
          {profile.email && <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" style={{ color: shapeCol }} />{profile.email}</span>}
          {(profile.adresse || profile.ville) && <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" style={{ color: shapeCol }} />{[profile.adresse, profile.codePostal, profile.ville].filter(Boolean).join(", ")}</span>}
        </div>
      </div>

      {/* Diamond accent separator */}
      <div className="relative z-10 mx-5">
        <SereniteDiamondRow color={shapeCol} />
      </div>

      {/* Two-column content */}
      <div className="flex-1 flex px-5 pt-3 pb-3 gap-5 overflow-y-auto relative z-10">
        {/* Left — Expériences + Formation */}
        <div className="flex-1 space-y-4">
          {professionalExperiences && professionalExperiences.length > 0 && (
            <div>
              <SectionHeading color={expTc || colors.primary} icon={<Briefcase className="w-3.5 h-3.5" />}>Expérience Professionnelle</SectionHeading>
              <ExperiencesBlock experiences={professionalExperiences} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} getCompanyLogoUrl={getCompanyLogoUrl} textColor={expTc} onRemove={removeProfessionalExperience} />
            </div>
          )}

          {formations && formations.length > 0 && (
            <div>
              <SectionHeading color={expTc || colors.primary} icon={<GraduationCap className="w-3.5 h-3.5" />}>{formationTitle || "Formation"}</SectionHeading>
              <FormationBlock formations={formations} colors={colors} bulletStyle={bulletStyle} bulletShape={formationBulletShape} textColor={expTc} onRemove={removeFormation} />
            </div>
          )}

          {!professionalExperiences?.length && !formations?.length && experienceEntries.length > 0 && (
            <div>
              <SectionHeading color={compTc || colors.primary} icon={<Layers className="w-3.5 h-3.5" />}>Compétences</SectionHeading>
              <ul className="space-y-0.5">{experienceEntries.map(e => (
                <li key={e.id} className="flex items-start gap-2.5 group/item px-3 py-1.5 rounded-lg" style={{ background: `${shapeCol}04` }}>
                  <span className="mt-0.5"><ModernBullet type={e.bullet} color={shapeCol} style={bulletStyle} shape={bulletShape} /></span>
                  <span className="flex-1" style={{ color: expTc || undefined }}>{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
                </li>
              ))}</ul>
            </div>
          )}

          {!professionalExperiences?.length && !formations?.length && experienceEntries.length === 0 && (
            <EmptyState color={shapeCol} />
          )}
        </div>

        {/* Right — Compétences + Qualités + Divers */}
        <div className="w-[36%] space-y-3">
          {competencyDomains && competencyDomains.length > 0 && (
            <div className="p-3 rounded-lg" style={{ background: `${shapeCol}06`, borderLeft: `2px solid ${shapeCol}20` }}>
              <p className="text-[8px] font-bold uppercase tracking-[0.15em] mb-2 flex items-center gap-1.5" style={{ color: compTc || colors.primary }}>
                <Layers className="w-3 h-3" /> Compétences
              </p>
              <DomainsBlock domains={competencyDomains} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} competencyBulletShape={competencyBulletShape} textColor={expTc} levelDisplay={levelDisplay} />
            </div>
          )}

          {qualities && qualities.length > 0 && (
            <div className="p-3 rounded-lg" style={{ background: `${colors.accent}06`, borderLeft: `2px solid ${colors.accent}15` }}>
              <p className="text-[8px] font-bold uppercase tracking-[0.15em] mb-2 flex items-center gap-1.5" style={{ color: compTc || colors.accent }}>
                <Heart className="w-3 h-3" /> Qualités
              </p>
              <QualitiesBlock qualities={qualities} colors={colors} bulletStyle={bulletStyle} bulletShape={qualitesBulletShape} textColor={expTc} onRemove={removeQuality} />
            </div>
          )}

          {atoutEntries.length > 0 && (
            <div className="p-3 rounded-lg" style={{ background: `${shapeCol}04`, borderLeft: `2px solid ${shapeCol}12` }}>
              <p className="text-[8px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: compTc || colors.accent }}>Atouts</p>
              <div className="flex flex-wrap gap-1">{atoutEntries.map(e => (
                <span key={e.id} className="inline-flex items-center gap-1 px-2 py-0.5 text-[8px] group/item"
                  style={{ borderRadius: "4px", background: `${shapeCol}08`, border: `1px solid ${shapeCol}12`, color: compTc || TEXT_MUTED }}>
                  {e.selected}<DeleteBtn onClick={() => removeEntry(e.id)} />
                </span>
              ))}</div>
            </div>
          )}

          {interests && interests.length > 0 && (
            <div className="p-3 rounded-lg" style={{ background: `${shapeCol}03` }}>
              <p className="text-[8px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: compTc || colors.accent }}>Centres d'intérêt</p>
              <InterestsBlock interests={interests} colors={colors} bulletStyle={bulletStyle} bulletShape={diversBulletShape || bulletShape} textColor={expTc} onRemove={removeInterest} displayMode={interestDisplayMode} />
            </div>
          )}
        </div>
      </div>

      {/* Bottom wave decoration */}
      <SereniteWave color={`${shapeCol}10`} className="absolute bottom-4 left-0 w-full h-12" />

      <div className="px-6 py-1.5 text-[7px] text-gray-300 flex justify-between relative z-10"><span>My CV Coach</span><span>Sérénité</span></div>
    </div>
  );
};

// ─── Template registry ─────────────────────────────────────────────
export const templateRegistry: Record<string, React.FC<TemplateProps>> = {
  impact: ImpactTemplate,
  artisan: ArtisanTemplate,
  creatif: CreatifTemplate,
  mural: MuralTemplate,
  magazine: MagazineTemplate,
  medical: MedicalTemplate,
  flux: FluxTemplate,
  serenite: SereniteTemplate,
};
