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

export interface CompetencyDomainData { id: string; label: string; items: { id: string; text: string; enabled: boolean }[]; }

export type CvSectionId = "experiences" | "competences" | "formation" | "qualites" | "divers";

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

/** Render competency domains */
const DomainsBlock = ({ domains, colors, bulletStyle, bulletShape, competencyBulletShape, textColor, light }: { domains?: CompetencyDomainData[]; colors: Colors; bulletStyle: BulletStyle; bulletShape?: BulletShapeId; competencyBulletShape?: BulletShapeId; textColor?: string; light?: boolean }) => {
  if (!domains || domains.length === 0) return null;
  const effectiveShape = competencyBulletShape || bulletShape;
  return (
    <div className="space-y-1.5">
      {domains.map(d => (
        <div key={d.id}>
          <p className="text-[8px] font-bold uppercase tracking-widest mb-0.5" style={{ color: textColor || colors.accent }}>{d.label}</p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {d.items.map(item => (
              <li key={item.id} className="flex items-center gap-1.5" style={{ color: textColor || (light ? "rgba(255,255,255,0.85)" : undefined), fontSize: "9px", lineHeight: "1.3", paddingTop: "1px", paddingBottom: "1px" }}>
                <span className="flex-shrink-0 w-[12px] h-[12px] flex items-center justify-center"><ModernBullet type="technique" color={colors.accent} style={bulletStyle} shape={effectiveShape} /></span>
                <span className="flex-1">{item.text}</span>
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
    <div className={useTimeline ? "relative pl-3" : "space-y-2"}>
      {useTimeline && <div className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full" style={{ background: `linear-gradient(180deg, ${colors.accent}, ${colors.primary}40, transparent)` }} />}
      {experiences.map((exp, idx) => {
        const logoUrl = exp.showLogo && getCompanyLogoUrl ? getCompanyLogoUrl(exp.entreprise) : null;
        return (
          <div key={exp.id} className={`${useTimeline ? "relative pl-3 pb-2" : "pb-2"} group/item`}>
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
                  <p className="text-[10px] font-black leading-tight" style={{ color: textColor || (light ? "white" : colors.primary) }}>{exp.poste}</p>
                  <p className="text-[8px]" style={{ color: textColor ? `${textColor}99` : (light ? "rgba(255,255,255,0.6)" : TEXT_MUTED) }}>
                    {exp.entreprise}{exp.ville ? ` · ${exp.ville}` : ""}{exp.dateDebut ? ` | ${formatDateDisplay(exp.dateDebut)}` : ""}{exp.aujourdhui ? " — Aujourd'hui" : exp.dateFin ? ` — ${formatDateDisplay(exp.dateFin)}` : ""}
                  </p>
                </div>
              </div>
              {onRemove && <button onClick={() => onRemove(exp.id)} className={`opacity-0 group-hover/item:opacity-100 transition-opacity ${light ? "text-white/30 hover:text-red-300" : "text-gray-300 hover:text-red-400"}`}><Trash2 className="w-2.5 h-2.5" /></button>}
            </div>
            {exp.missions.length > 0 && (
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {exp.missions.map((m, mi) => (
                  <li key={mi} className="flex items-center gap-1.5" style={{ color: textColor || (light ? "rgba(255,255,255,0.85)" : undefined), fontSize: "9px", lineHeight: "1.3", paddingTop: "1px", paddingBottom: "1px" }}>
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
    <div className="space-y-1">
      {formations.map(f => (
        <div key={f.id} className="group/item pb-1.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] font-black leading-tight" style={{ color: textColor || (light ? "white" : colors.primary) }}>{f.intitule}</p>
              <p className="text-[8px]" style={{ color: textColor ? `${textColor}99` : (light ? "rgba(255,255,255,0.6)" : TEXT_MUTED) }}>
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
      <div className="flex flex-wrap gap-1">
        {interests.map(i => (
          <span key={i.id} className="inline-flex items-center gap-1 px-2 py-0.5 text-[8px] font-medium group/item"
            style={{ borderRadius: "8px", background: light ? "rgba(255,255,255,0.12)" : `${colors.accent}08`, border: `1px solid ${light ? "rgba(255,255,255,0.15)" : `${colors.accent}18`}`, color: textColor || (light ? "rgba(255,255,255,0.85)" : undefined) }}>
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
        <li key={i.id} className="flex items-center gap-1.5 group/item" style={{ color: textColor || (light ? "rgba(255,255,255,0.85)" : undefined), fontSize: "9px", lineHeight: "1.3", paddingTop: "1px", paddingBottom: "1px" }}>
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
        <li key={idx} className="flex items-center gap-1.5 group/item" style={{ color: textColor || (light ? "rgba(255,255,255,0.85)" : undefined), fontSize: "9px", lineHeight: "1.3", paddingTop: "1px", paddingBottom: "1px" }}>
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
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px]" style={{ ...(fontFamily ? { fontFamily } : {}), color: resolvedTextColor }}>
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
  // Typography charter: name is BELOW the title, so uses a smaller size
  const sizeClasses = size === "lg" ? "text-sm" : size === "md" ? "text-xs" : "text-[10px]";
  const resolvedColor = color || (light ? TEXT_WHITE : undefined);
  return <span className={`font-semibold leading-tight ${sizeClasses}`} style={{ ...(fontFamily ? { fontFamily } : {}), ...(resolvedColor ? { color: resolvedColor } : {}) }}>{fullName}</span>;
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

// ═══════════════════════════════════════════════════════════════════
// 1. IMPACT — Glassmorphism sidebar, gradient accents, floating depth
//    - Photo removed. Competences moved to sidebar to fill right void.
// ═══════════════════════════════════════════════════════════════════
export const ImpactTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, sidebarPos, bulletStyle, bulletShape, gradient, gradientTarget, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder }: TemplateProps) => {
  const fondStyle = useGradientBg(gradient, gradientTarget);
  const rubriqueStyle = useGradientRubrique(gradient, gradientTarget, `linear-gradient(170deg, ${colors.primary}, ${colors.swatch})`);
  const { isDark } = useAutoContrast(gradient, gradientTarget);
  const headerTc = sectionTextColor("header", textColors, TEXT_WHITE);
  const compTc = sectionTextColor("competences", textColors, TEXT_WHITE);
  const expTc = sectionTextColor("experiences", textColors, TEXT_WHITE);
  const titleTc = resolveTitleTextColor(titleColor, headerTc, colors.accent);

  const sidebar = (
    <div className="w-[38%] flex flex-col relative overflow-hidden" style={{ background: `linear-gradient(170deg, ${colors.primary}, ${colors.swatch})`, ...rubriqueStyle }}>
      <Blob color="rgba(255,255,255,0.04)" className="absolute -bottom-20 -left-10 w-48 h-48" />
      <Blob color="rgba(255,255,255,0.03)" className="absolute -top-16 -right-12 w-40 h-40" />

      <div className="relative px-5 pt-6 pb-3 z-10">
        <p className="text-xl font-black uppercase tracking-wider leading-none"
          style={{ color: titleTc, fontFamily: fontFamily || undefined }}>
          {profile.titre || "TITRE DU POSTE"}
        </p>
        <NameBlock profile={profile} light size="md" fontFamily={fontFamily} color={headerTc} />
      </div>

      <div className="relative px-4 space-y-3 flex-1 z-10">
        <div className="p-3" style={{ borderRadius: "16px 4px 16px 4px", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
          <p className="text-[8px] uppercase tracking-[0.2em] font-bold mb-2" style={{ color: withAlpha(headerTc, 0.55) }}>Contact</p>
          <ContactLine profile={profile} light colors={colors} fontFamily={fontFamily} textColor={withAlpha(headerTc, 0.72)} iconColor={titleTc} />
        </div>
        <div className="p-3" style={{ borderRadius: "4px 16px 4px 16px", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
          <p className="text-[8px] text-white/35 uppercase tracking-[0.2em] font-bold mb-2" style={compTc ? { color: compTc } : undefined}>Compétences</p>
          {competencyDomains && competencyDomains.length > 0 ? (
            <DomainsBlock domains={competencyDomains} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} competencyBulletShape={competencyBulletShape} textColor={compTc} light />
          ) : experienceEntries.length > 0 ? (
            <ul className="space-y-0.5">{experienceEntries.map(e => (
              <li key={e.id} className="flex items-start gap-2 text-white/80 text-[10px] group/item" style={compTc ? { color: compTc } : undefined}>
                <span className="mt-0.5"><ModernBullet type={e.bullet} color={colors.accent} style={bulletStyle} shape={bulletShape} /></span>
                <span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} light />
              </li>
            ))}</ul>
          ) : <p className="text-white/25 italic text-[9px]">Ajoutez des compétences…</p>}
        </div>
      </div>
      <div className="relative z-10 px-5 py-2 text-[7px] text-white/15 text-center font-medium tracking-wider uppercase">My CV Coach</div>
    </div>
  );

  const main = (
    <div className="flex-1 flex flex-col relative overflow-hidden" style={{ background: isDark ? undefined : "white", ...fondStyle }}>
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.primary}, ${colors.accent})` }} />
      <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.04] rounded-full" style={{ background: `radial-gradient(circle, ${colors.accent}, transparent)` }} />

      <div className="flex-1 px-7 py-6 overflow-y-auto relative z-10">
        {/* Professional Experiences */}
        {professionalExperiences && professionalExperiences.length > 0 && (
          <>
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] mb-3 pb-2 flex items-center gap-2" style={{ color: expTc || (isDark ? "white" : colors.primary), borderBottom: `2px solid transparent`, borderImage: `linear-gradient(90deg, ${colors.accent}, ${colors.primary}) 1` }}>
              <Briefcase className="w-3.5 h-3.5" /> Expérience Professionnelle
            </h3>
            <ExperiencesBlock experiences={professionalExperiences} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} getCompanyLogoUrl={getCompanyLogoUrl} textColor={expTc || (isDark ? "white" : undefined)} light={isDark} onRemove={removeProfessionalExperience} />
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
        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] mb-5 pb-2.5 flex items-center gap-2" style={{ color: expTc || (isDark ? "white" : colors.primary), borderBottom: `2px solid transparent`, borderImage: `linear-gradient(90deg, ${colors.accent}, ${colors.primary}) 1` }}>
          <Star className="w-3.5 h-3.5" /> Atouts
        </h3>
        {atoutEntries.length > 0 ? (
          <ul className="space-y-0.5">{atoutEntries.map(e => (
            <li key={e.id} className="flex items-start gap-2.5 group/item rounded-xl px-4 py-3 transition-all hover:translate-x-0.5"
              style={{ background: isDark ? "rgba(255,255,255,0.08)" : `${colors.primary}04`, boxShadow: `0 1px 4px ${colors.primary}08`, border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : `${colors.primary}08`}` }}>
              <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} />
              <span className="flex-1" style={{ color: expTc || (isDark ? "rgba(255,255,255,0.85)" : undefined) }}>{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} light={isDark} />
            </li>
          ))}</ul>
        ) : <EmptyState color={colors.primary} label="Ajoutez des atouts…" dark={isDark} />}
      </div>
    </div>
  );

  return (
    <div className="h-full flex text-[11px] leading-[1.8]" style={{ fontFamily: fontFamily || "'DM Sans', system-ui, sans-serif", flexDirection: sidebarPos === "right" ? "row-reverse" : "row" }}>
      {sidebarPos === "top" ? <div className="h-full flex flex-col">{sidebar}{main}</div> : <>{sidebar}{main}</>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 2. ARTISAN — Organic shapes, variable radius, warm textures
//    - Photo removed. bgCircleColor for background circles.
// ═══════════════════════════════════════════════════════════════════
export const ArtisanTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, sidebarPos, bulletStyle, bulletShape, gradient, gradientTarget, bgCircleColor, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder }: TemplateProps) => {
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
      {interests && interests.length > 0 && (
        <div className="px-5 py-2">
          <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: compTc || colors.accent }}>Divers</p>
          <InterestsBlock interests={interests} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} textColor={expTc} onRemove={removeInterest} displayMode={interestDisplayMode} />
        </div>
      )}
      <div className="px-6 py-2 text-[8px] text-gray-400 flex justify-between" style={{ fontFamily: "'DM Sans', sans-serif" }}><span>My CV Coach · Méthode Fred</span><span>L'Artisan</span></div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 3. CRÉATIF — Sector logo replaces letter "A". Customizable circle bg.
// ═══════════════════════════════════════════════════════════════════
export const CreatifTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle, bulletShape, gradient, gradientTarget, bgCircleColor, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder }: TemplateProps) => {
  const fondStyle = useGradientBg(gradient, gradientTarget);
  const circleBg = bgCircleColor || "#1a1a1a";
  const headerTc = sectionTextColor("header", textColors, TEXT_BLACK);
  const compTc = sectionTextColor("competences", textColors, colors.primary);
  const expTc = sectionTextColor("experiences", textColors, TEXT_BLACK);
  const titleTc = resolveTitleTextColor(titleColor, headerTc, colors.accent);

  return (
    <div className="h-full flex flex-col text-[11px] leading-[1.8] relative overflow-hidden bg-white" style={{ fontFamily: fontFamily || "'DM Sans', system-ui, sans-serif", ...fondStyle }}>
      {/* Floating geometric shapes with gradients */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full" style={{ background: `radial-gradient(circle, ${colors.accent}12, transparent)` }} />
      <svg className="absolute top-1/4 -left-3 opacity-[0.08]" width="50" height="50" viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="4" fill="none" stroke={colors.primary} strokeWidth="2" transform="rotate(15 25 25)" /></svg>
      {/* Customizable background circle */}
      <div className="absolute bottom-1/3 right-4 w-14 h-14 rounded-full opacity-[0.12]" style={{ background: circleBg }} />
      <svg className="absolute bottom-16 left-8 opacity-[0.07]" width="70" height="35" viewBox="0 0 70 35"><path d="M5 30L35 5L65 30" stroke={colors.accent} strokeWidth="2.5" fill="none" strokeLinecap="round" /></svg>
      <Blob color={`${colors.primary}05`} className="absolute -bottom-24 -right-16 w-52 h-52" />

      {/* Header — sector logo instead of "A" */}
      <div className="relative px-7 pt-7 pb-4">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <p className="text-2xl font-black uppercase tracking-wider leading-none" style={{ color: titleTc }}>{profile.titre || "TITRE DU POSTE"}</p>
            <h2 className="text-sm font-semibold mt-1" style={{ color: headerTc }}>
              {[profile.prenom, profile.nom].filter(Boolean).join(" ") || "Votre Nom"}
            </h2>
          </div>
          {/* Sector professional logo */}
          <div className="w-14 h-14 rotate-3 flex items-center justify-center"
            style={{ borderRadius: "20px 6px 20px 6px", background: `linear-gradient(135deg, ${colors.primary}10, ${colors.accent}10)`, border: `2px solid ${colors.primary}20`, boxShadow: `0 8px 24px ${colors.primary}15` }}>
            <SectorLogo sector={profile.titre} color={colors.primary} size={32} />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="mx-7 p-[1px] rounded-xl mb-3" style={{ background: `linear-gradient(90deg, ${colors.primary}30, ${colors.accent}30)` }}>
        <div className="rounded-xl px-4 py-2 bg-white"><ContactLine profile={profile} colors={colors} fontFamily={fontFamily} textColor={withAlpha(headerTc, 0.72)} iconColor={titleTc} /></div>
      </div>

      <div className="flex-1 flex px-7 gap-4 overflow-y-auto pb-3 relative z-10">
        <div className="flex-1">
          {professionalExperiences && professionalExperiences.length > 0 && (
            <>
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] mb-3 flex items-center gap-2" style={{ color: expTc || colors.primary }}>
                <span className="w-6 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} /> Expérience Professionnelle
              </h3>
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
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em] mb-3 flex items-center gap-2" style={{ color: compTc || colors.primary, ...useGradientRubrique(gradient, gradientTarget) }}>
            <span className="w-6 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} /> Compétences
          </h3>
          {competencyDomains && competencyDomains.length > 0 ? (
            <DomainsBlock domains={competencyDomains} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} competencyBulletShape={competencyBulletShape} textColor={expTc} />
          ) : experienceEntries.length > 0 ? (
            <ul className="space-y-0.5">{experienceEntries.map((e, idx) => (
              <li key={e.id} className="flex items-start gap-2 group/item px-3 py-2 transition-all hover:translate-x-0.5" style={{
                borderRadius: idx % 3 === 0 ? "14px 4px 14px 4px" : idx % 3 === 1 ? "4px 14px 4px 14px" : "14px",
                borderLeft: `3px solid ${idx % 2 === 0 ? colors.primary : colors.accent}`,
                background: `linear-gradient(135deg, ${colors.primary}03, ${colors.accent}03)`,
                boxShadow: `0 2px 8px ${colors.primary}06`
              }}>
                <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} shape={bulletShape} /></span>
                <span className="flex-1" style={{ color: expTc || TEXT_BLACK }}>{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
              </li>
            ))}</ul>
          ) : <EmptyState color={colors.accent} />}
        </div>
        <div className="w-[33%] space-y-3">
          <div className="p-[1px]" style={{ borderRadius: "8px 20px 8px 20px", background: `linear-gradient(180deg, ${colors.primary}20, ${colors.accent}20)` }}>
            <div className="p-3 bg-white" style={{ borderRadius: "7px 19px 7px 19px" }}>
              <p className="text-[9px] uppercase tracking-widest font-black mb-2" style={{ color: compTc || colors.primary }}>Atouts</p>
              {atoutEntries.length > 0 ? (
                <ul className="space-y-0.5">{atoutEntries.map(e => (
                  <li key={e.id} className="flex items-start gap-1.5 text-[10px] group/item" style={{ color: compTc || TEXT_MUTED }}>
                    <span className="w-2 h-2 rounded-full mt-0.5 flex-shrink-0" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }} /><span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
                  </li>
                ))}</ul>
              ) : <p className="text-gray-400 italic text-[9px]">Ajoutez…</p>}
            </div>
          </div>
        </div>
      </div>
      {interests && interests.length > 0 && (
        <div className="px-5 py-2">
          <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: compTc || colors.accent }}>Divers</p>
          <InterestsBlock interests={interests} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} textColor={expTc} onRemove={removeInterest} displayMode={interestDisplayMode} />
        </div>
      )}
      <div className="px-7 py-2 text-[8px] text-gray-300 flex justify-between"><span>My CV Coach · Méthode Fred</span><span>Le Créatif</span></div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 4. MURAL — Photo removed.
// ═══════════════════════════════════════════════════════════════════
export const MuralTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, sidebarPos, bulletStyle, bulletShape, gradient, gradientTarget, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder }: TemplateProps) => {
  const fondStyle = useGradientBg(gradient, gradientTarget);
  const { isDark } = useAutoContrast(gradient, gradientTarget);
  const headerTc = sectionTextColor("header", textColors, TEXT_WHITE);
  const compTc = sectionTextColor("competences", textColors, colors.primary);
  const expTc = sectionTextColor("experiences", textColors, TEXT_BLACK);
  const titleTc = resolveTitleTextColor(titleColor, headerTc, colors.accent);
  return (
    <div className="h-full flex flex-col text-[11px] leading-[1.8] relative" style={{ fontFamily: fontFamily || "'DM Sans', system-ui, sans-serif", background: `linear-gradient(180deg, hsl(210,10%,96%), hsl(210,8%,93%))`, ...fondStyle }}>
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
      {interests && interests.length > 0 && (
        <div className="px-5 py-2">
          <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: compTc || colors.accent }}>Divers</p>
          <InterestsBlock interests={interests} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} textColor={expTc} onRemove={removeInterest} displayMode={interestDisplayMode} />
        </div>
      )}
      <div className="px-5 py-2 text-[8px] text-gray-400 flex justify-between" style={{ background: `linear-gradient(90deg, ${colors.primary}08, transparent)` }}><span>My CV Coach · Méthode Fred</span><span>Mural</span></div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 5. MAGAZINE — Right zone now shows coordinates. Photo removed.
// ═══════════════════════════════════════════════════════════════════
export const MagazineTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle, bulletShape, gradient, gradientTarget, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder }: TemplateProps) => {
  const fondStyle = useGradientBg(gradient, gradientTarget);
  const headerTc = sectionTextColor("header", textColors, TEXT_WHITE);
  const compTc = sectionTextColor("competences", textColors, colors.accent);
  const expTc = sectionTextColor("experiences", textColors, TEXT_BLACK);
  const titleTc = resolveTitleTextColor(titleColor, headerTc, withAlpha(TEXT_WHITE, 0.72));
  return (
    <div className="h-full flex flex-col text-[11px] leading-[1.8]" style={{ fontFamily: fontFamily || "'DM Sans', system-ui, sans-serif", ...fondStyle }}>
      {/* Split header — right zone now has full coordinates */}
      <div className="flex items-stretch relative overflow-hidden">
        <div className="flex-1 px-7 py-5 flex flex-col justify-center relative" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.swatch})`, ...useGradientRubrique(gradient, gradientTarget) }}>
          <Blob color="rgba(255,255,255,0.04)" className="absolute -bottom-10 -left-10 w-32 h-32" />
          <p className="text-xl font-black uppercase tracking-wider leading-none relative z-10" style={{ color: titleTc }}>{profile.titre || "TITRE DU POSTE"}</p>
          <NameBlock profile={profile} light size="lg" fontFamily={fontFamily} color={headerTc} />
        </div>
        <div className="w-[40%] px-5 py-4 flex flex-col justify-center relative" style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}dd)`, boxShadow: `inset 4px 0 12px rgba(0,0,0,0.1)` }}>
          {/* Full coordinates in right zone */}
          <div className="space-y-2 text-[10px]" style={{ color: withAlpha(headerTc, 0.8) }}>
            {(profile.prenom || profile.nom) && (
              <p className="font-bold text-xs" style={{ color: headerTc }}>{[profile.prenom, profile.nom].filter(Boolean).join(" ")}</p>
            )}
            {profile.telephone && <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" style={{ color: titleTc }} />{profile.telephone}</span>}
            {profile.email && <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" style={{ color: titleTc }} />{profile.email}</span>}
            {profile.adresse && <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" style={{ color: titleTc }} />{profile.adresse}</span>}
            {(profile.codePostal || profile.ville) && (
              <span className="flex items-center gap-1.5 ml-[18px]">{[profile.codePostal, profile.ville].filter(Boolean).join(" ")}</span>
            )}
          </div>
        </div>
      </div>

      <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent}, ${colors.primary})` }} />

      <div className="flex-1 flex overflow-y-auto bg-white">
        <div className="flex-1 px-6 py-5">
          {professionalExperiences && professionalExperiences.length > 0 && (
            <>
              <div className="mb-4 pb-2" style={{ borderBottom: "2px solid transparent", borderImage: `linear-gradient(90deg, ${colors.accent}, ${colors.primary}, transparent) 1` }}>
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: expTc || colors.primary }}>Expérience Professionnelle</h3>
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
          <div className="mb-4 pb-2" style={{ borderBottom: "2px solid transparent", borderImage: `linear-gradient(90deg, ${colors.accent}, ${colors.primary}, transparent) 1` }}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: compTc || colors.primary }}>Compétences professionnelles</h3>
          </div>
          {competencyDomains && competencyDomains.length > 0 ? (
            <DomainsBlock domains={competencyDomains} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} competencyBulletShape={competencyBulletShape} textColor={expTc} />
          ) : experienceEntries.length > 0 ? (
            <ul className="space-y-0.5">{experienceEntries.map(e => (
              <li key={e.id} className="flex items-start gap-2.5 group/item py-1.5 px-2 rounded-lg transition-all hover:bg-gray-50/80"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} shape={bulletShape} /></span>
                <span className="flex-1" style={{ color: expTc || TEXT_BLACK }}>{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
              </li>
            ))}</ul>
          ) : <EmptyState color={colors.primary} />}
        </div>
        <div className="w-[1px]" style={{ background: `linear-gradient(180deg, ${colors.primary}15, ${colors.accent}15, transparent)` }} />
        <div className="w-[35%] px-5 py-5">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 pb-2" style={{ color: compTc || colors.accent, borderBottom: "2px solid transparent", borderImage: `linear-gradient(90deg, ${colors.primary}, transparent) 1` }}>Atouts clés</h3>
          {atoutEntries.length > 0 ? (
            <ul className="space-y-0.5">{atoutEntries.map((e, idx) => (
              <li key={e.id} className="flex items-start gap-2.5 text-[10px] group/item" style={{ color: compTc || TEXT_MUTED }}>
                <span className="w-5 h-5 rounded-lg flex items-center justify-center text-[9px] text-white font-black flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${idx % 2 === 0 ? colors.primary : colors.accent}, ${idx % 2 === 0 ? colors.swatch : colors.primary})`, boxShadow: `0 2px 6px ${colors.primary}25` }}>
                  {idx + 1}
                </span>
                <span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
              </li>
            ))}</ul>
          ) : <p className="text-gray-400 italic text-[9px]">Ajoutez des atouts…</p>}
        </div>
      </div>
      {interests && interests.length > 0 && (
        <div className="px-5 py-2">
          <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: compTc || colors.accent }}>Divers</p>
          <InterestsBlock interests={interests} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} textColor={expTc} onRemove={removeInterest} displayMode={interestDisplayMode} />
        </div>
      )}
      <div className="px-6 py-2 text-[8px] text-gray-400 flex justify-between" style={{ background: `linear-gradient(90deg, ${colors.primary}05, transparent)` }}><span>My CV Coach · Méthode Fred</span><span>Magazine</span></div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 7. MÉDICAL — Photo removed, contacts fixed.
// ═══════════════════════════════════════════════════════════════════
export const MedicalTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle, bulletShape, gradient, gradientTarget, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, formationBulletShape, diversBulletShape, qualitesBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder, qualities, removeQuality }: TemplateProps) => {
  const fondStyle = useGradientBg(gradient, gradientTarget);
  const headerTc = sectionTextColor("header", textColors, TEXT_WHITE);
  const compTc = sectionTextColor("competences", textColors, colors.primary);
  const expTc = sectionTextColor("experiences", textColors, TEXT_BLACK);
  const titleTc = resolveTitleTextColor(titleColor, headerTc, withAlpha(TEXT_WHITE, 0.72));
  return (
    <div className="h-full flex flex-col text-[11px] leading-[1.8] relative overflow-hidden" style={{ fontFamily: fontFamily || "'DM Sans', system-ui, sans-serif", background: `linear-gradient(180deg, ${colors.primary}06, white, ${colors.accent}04)`, ...fondStyle }}>
      <div className="absolute top-20 -right-16 w-48 h-48 rounded-full" style={{ background: `radial-gradient(circle, ${colors.accent}08, transparent)` }} />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full" style={{ background: `radial-gradient(circle, ${colors.primary}06, transparent)` }} />

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
                  <InterestsBlock interests={interests} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} textColor={expTc} onRemove={removeInterest} displayMode={interestDisplayMode} />
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
// 8. FLUX — Photo removed.
// ═══════════════════════════════════════════════════════════════════
export const FluxTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle, bulletShape, gradient, gradientTarget, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder }: TemplateProps) => {
  const fondStyle = useGradientBg(gradient, gradientTarget);
  const headerTc = sectionTextColor("header", textColors, TEXT_WHITE);
  const compTc = sectionTextColor("competences", textColors, colors.primary);
  const expTc = sectionTextColor("experiences", textColors, TEXT_BLACK);
  const titleTc = resolveTitleTextColor(titleColor, headerTc, withAlpha(TEXT_WHITE, 0.72));
  return (
    <div className="h-full flex flex-col text-[11px] leading-[1.8] relative" style={{ fontFamily: fontFamily || "'DM Sans', system-ui, sans-serif", background: `linear-gradient(180deg, white, ${colors.primary}04)`, ...fondStyle }}>
      <div className="px-7 py-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.swatch})`, boxShadow: `0 6px 24px ${colors.primary}25`, ...useGradientRubrique(gradient, gradientTarget) }}>
        <div className="absolute top-0 right-0 w-2/5 h-full" style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}cc)`, clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)" }} />
        <Blob color="rgba(255,255,255,0.04)" className="absolute -bottom-16 left-10 w-36 h-36" />
        <div className="relative z-10">
          <p className="text-2xl font-black uppercase tracking-wider leading-none" style={{ color: titleTc }}>{profile.titre || "TITRE DU POSTE"}</p>
          <NameBlock profile={profile} light size="lg" fontFamily={fontFamily} color={headerTc} />
          <div className="mt-3"><ContactLine profile={profile} light colors={colors} fontFamily={fontFamily} textColor={withAlpha(headerTc, 0.72)} iconColor={titleTc} /></div>
        </div>
      </div>

      <div className="flex-1 px-6 py-5 overflow-y-auto relative">
        <div className="absolute left-[42px] top-5 bottom-5 w-[2px]" style={{ background: `linear-gradient(180deg, ${colors.accent}, ${colors.primary}, ${colors.accent}30, transparent)`, borderRadius: "2px" }} />

        {professionalExperiences && professionalExperiences.length > 0 && (
          <>
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] mb-3 ml-10 flex items-center gap-2" style={{ color: expTc || colors.primary }}>
              <Briefcase className="w-4 h-4" style={{ color: colors.accent }} /> Expérience Professionnelle
            </h3>
            <div className="ml-10"><ExperiencesBlock experiences={professionalExperiences} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} getCompanyLogoUrl={getCompanyLogoUrl} textColor={expTc} onRemove={removeProfessionalExperience} /></div>
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

        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] mb-4 ml-10 flex items-center gap-2" style={{ color: compTc || colors.primary }}>
          <ArrowRightCircle className="w-4 h-4" style={{ color: colors.accent, filter: `drop-shadow(0 0 4px ${colors.accent}40)` }} /> Parcours & compétences
        </h3>

        {competencyDomains && competencyDomains.length > 0 ? (
          <div className="ml-10"><DomainsBlock domains={competencyDomains} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} competencyBulletShape={competencyBulletShape} textColor={expTc} /></div>
        ) : experienceEntries.length > 0 ? (
          <div className="space-y-0.5 ml-3">{experienceEntries.map(e => (
            <div key={e.id} className="flex items-start gap-3 group/item relative">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                style={{ background: `linear-gradient(135deg, ${e.bullet === "technique" ? colors.primary : colors.accent}, ${e.bullet === "technique" ? colors.swatch : colors.primary})`, boxShadow: `0 2px 8px ${colors.accent}30` }}>
                <div className="w-2 h-2 rounded-full bg-white/80" />
              </div>
              <div className="flex-1 p-2.5 transition-all hover:translate-x-0.5"
                style={{ borderRadius: "12px 4px 12px 4px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(4px)", boxShadow: `0 2px 10px rgba(0,0,0,0.05), 0 0 0 1px ${colors.primary}08`, borderLeft: `3px solid ${e.bullet === "technique" ? colors.primary : colors.accent}` }}>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} shape={bulletShape} /></span>
                  <span className="flex-1" style={{ color: expTc || TEXT_BLACK }}>{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
                </div>
              </div>
            </div>
          ))}</div>
        ) : <div className="ml-10"><EmptyState color={colors.accent} label="Le flux de compétences apparaît ici" /></div>}

        <div className="mt-5 ml-10">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2" style={{ color: compTc || colors.accent }}>
            <span className="w-6 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})` }} /> Atouts
          </h3>
          {atoutEntries.length > 0 ? (
            <div className="flex flex-wrap gap-2">{atoutEntries.map(e => (
              <span key={e.id} className="p-[1px] group/item" style={{ borderRadius: "10px", background: `linear-gradient(135deg, ${colors.accent}30, ${colors.primary}30)` }}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] bg-white" style={{ color: compTc || TEXT_MUTED, borderRadius: "9px" }}>
                  <ChevronRight className="w-2.5 h-2.5" style={{ color: colors.accent }} />{e.selected}<DeleteBtn onClick={() => removeEntry(e.id)} />
                </span>
              </span>
            ))}</div>
          ) : <p className="text-gray-400 italic text-[9px]">Ajoutez des atouts…</p>}
        </div>
      </div>
      {interests && interests.length > 0 && (
        <div className="px-5 py-2">
          <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: compTc || colors.accent }}>Divers</p>
          <InterestsBlock interests={interests} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} textColor={expTc} onRemove={removeInterest} displayMode={interestDisplayMode} />
        </div>
      )}
      <div className="px-6 py-2 text-[8px] text-gray-400 flex justify-between" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}08, transparent)` }}><span>My CV Coach · Méthode Fred</span><span>Flux</span></div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 9. SÉRÉNITÉ — Photo removed. Contacts bug fixed.
// ═══════════════════════════════════════════════════════════════════
export const SereniteTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle, bulletShape, gradient, gradientTarget, textColors, titleColor, fontFamily, competencyDomains, competencyBulletShape, professionalExperiences, removeProfessionalExperience, formations, removeFormation, formationTitle, getCompanyLogoUrl, interests, removeInterest, interestDisplayMode, sectionOrder }: TemplateProps) => {
  const fondStyle = useGradientBg(gradient, gradientTarget);
  const headerTc = sectionTextColor("header", textColors, TEXT_WHITE);
  const compTc = sectionTextColor("competences", textColors, colors.primary);
  const expTc = sectionTextColor("experiences", textColors, TEXT_BLACK);
  const titleTc = resolveTitleTextColor(titleColor, headerTc, withAlpha(TEXT_WHITE, 0.72));
  return (
    <div className="h-full flex flex-col text-[11px] leading-[1.8] relative overflow-hidden" style={{ fontFamily: fontFamily || "'DM Sans', system-ui, sans-serif", background: `linear-gradient(180deg, ${colors.primary}05, white 40%, ${colors.accent}04 100%)`, ...fondStyle }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-48 rounded-full" style={{ background: `radial-gradient(ellipse, ${colors.primary}08, transparent)` }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full" style={{ background: `radial-gradient(circle, ${colors.accent}06, transparent)` }} />

      {/* Header — contacts now properly displayed */}
      <div className="relative mx-5 mt-5 px-6 py-6 overflow-hidden"
        style={{ borderRadius: "32px", background: `linear-gradient(160deg, ${colors.primary}ee, ${colors.accent}dd)`, boxShadow: `0 12px 40px ${colors.primary}18, 0 4px 16px ${colors.accent}12`, ...useGradientRubrique(gradient, gradientTarget) }}>
        <Blob color="rgba(255,255,255,0.06)" className="absolute -top-12 -right-12 w-44 h-44" />
        <Blob color="rgba(255,255,255,0.04)" className="absolute bottom-0 left-0 w-32 h-32" />
        <div className="relative z-10">
          <p className="text-2xl font-black uppercase tracking-wider leading-none" style={{ color: titleTc }}>{profile.titre || "TITRE DU POSTE"}</p>
          <NameBlock profile={profile} light size="lg" fontFamily={fontFamily} color={headerTc} />
          <div className="mt-3">
            <ContactLine profile={profile} light colors={colors} fontFamily={fontFamily} textColor={withAlpha(headerTc, 0.72)} iconColor={titleTc} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex px-5 pt-4 pb-3 gap-4 overflow-y-auto relative z-10">
        <div className="flex-1 space-y-3">
          {professionalExperiences && professionalExperiences.length > 0 && (
            <>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-2" style={{ color: expTc || colors.primary }}>
                <span className="w-8 h-8 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}10, ${colors.accent}08)` }}>
                  <Briefcase className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                </span>
                Expérience Professionnelle
              </h3>
              <ExperiencesBlock experiences={professionalExperiences} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} getCompanyLogoUrl={getCompanyLogoUrl} textColor={expTc} onRemove={removeProfessionalExperience} />
            </>
          )}
          {formations && formations.length > 0 && (
            <>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-2" style={{ color: expTc || colors.primary }}>
                <span className="w-8 h-8 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}10, ${colors.accent}08)` }}>
                  <GraduationCap className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                </span>
                {formationTitle || "Formation"}
              </h3>
              <FormationBlock formations={formations} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} textColor={expTc} onRemove={removeFormation} />
            </>
          )}
          <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-2" style={{ color: compTc || colors.primary }}>
            <span className="w-8 h-8 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}10, ${colors.accent}08)` }}>
              <Layers className="w-3.5 h-3.5" style={{ color: colors.accent }} />
            </span>
            Compétences
          </h3>
          {competencyDomains && competencyDomains.length > 0 ? (
            <DomainsBlock domains={competencyDomains} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} competencyBulletShape={competencyBulletShape} textColor={expTc} />
          ) : experienceEntries.length > 0 ? (
            <ul className="space-y-0.5">{experienceEntries.map(e => (
              <li key={e.id} className="flex items-start gap-2.5 group/item px-4 py-2.5 transition-all hover:translate-x-0.5"
                style={{ borderRadius: "20px", background: "rgba(255,255,255,0.65)", backdropFilter: "blur(8px)", boxShadow: `0 2px 12px rgba(0,0,0,0.03), 0 0 0 1px ${colors.accent}08` }}>
                <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} shape={bulletShape} /></span>
                <span className="flex-1" style={{ color: expTc || TEXT_BLACK }}>{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
              </li>
            ))}</ul>
          ) : <EmptyState color={colors.accent} />}
        </div>

        <div className="w-[34%] space-y-3">
          <div className="p-4" style={{ borderRadius: "24px", background: `linear-gradient(160deg, ${colors.primary}06, ${colors.accent}04)`, backdropFilter: "blur(12px)", boxShadow: `0 4px 16px rgba(0,0,0,0.03)` }}>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3 flex items-center gap-2" style={{ color: compTc || colors.accent }}>
              <Heart className="w-3.5 h-3.5" /> Qualités
            </h3>
            {atoutEntries.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">{atoutEntries.map(e => (
                <span key={e.id} className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] group/item"
                  style={{ color: compTc || TEXT_MUTED, borderRadius: "16px", background: "rgba(255,255,255,0.6)", border: `1px solid ${colors.accent}12`, boxShadow: `0 1px 4px ${colors.accent}06` }}>
                  {e.selected}<DeleteBtn onClick={() => removeEntry(e.id)} />
                </span>
              ))}</div>
            ) : <p className="text-gray-400 italic text-[9px]">Ajoutez des qualités…</p>}
          </div>
        </div>
      </div>
      {interests && interests.length > 0 && (
        <div className="px-5 py-2">
          <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: compTc || colors.accent }}>Divers</p>
          <InterestsBlock interests={interests} colors={colors} bulletStyle={bulletStyle} bulletShape={bulletShape} textColor={expTc} onRemove={removeInterest} displayMode={interestDisplayMode} />
        </div>
      )}
      <div className="px-6 py-2 text-[8px] text-gray-400 flex justify-between"><span>My CV Coach · Méthode Fred</span><span>Sérénité</span></div>
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
