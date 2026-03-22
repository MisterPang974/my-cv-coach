import { Mail, Phone, MapPin, Briefcase, Layers, Star, ChevronRight, Sparkles, Trash2, Grid3X3, ArrowRightCircle } from "lucide-react";
import type { SidebarPosition, BulletStyle } from "@/lib/cv-sectors";

// ─── Types ─────────────────────────────────────────────────────────
type BulletType = "action" | "technique" | "relationnel";
interface CvEntry { id: number; input: string; selected: string; bullet: BulletType; }
interface CvProfile { nom: string; titre: string; email: string; telephone: string; ville: string; }
interface Colors { primary: string; accent: string; swatch: string; }

export interface TemplateProps {
  profile: CvProfile;
  experienceEntries: CvEntry[];
  atoutEntries: CvEntry[];
  entries: CvEntry[];
  removeEntry: (id: number) => void;
  colors: Colors;
  sidebarPos: SidebarPosition;
  bulletStyle: BulletStyle;
}

// ─── Bullet renderers ──────────────────────────────────────────────
export const ModernBullet = ({ type, color, style = "mixte" }: { type: BulletType; color: string; style?: BulletStyle }) => {
  const sz = 14;
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

// ─── Shared pieces ─────────────────────────────────────────────────
const EmptyState = ({ color, label }: { color: string; label?: string }) => (
  <div className="rounded-2xl border-2 border-dashed p-5 text-center mt-3" style={{ borderColor: `${color}20`, background: `${color}03` }}>
    <Briefcase className="w-7 h-7 mx-auto mb-1.5" style={{ color: `${color}25` }} />
    <p className="text-gray-400 text-[10px] font-medium">{label || "Votre CV se construit ici en temps réel"}</p>
    <p className="text-gray-300 text-[9px] mt-0.5">Style télégraphique · Verbes d'action</p>
  </div>
);

const DeleteBtn = ({ onClick, light }: { onClick: () => void; light?: boolean }) => (
  <button onClick={onClick} className={`opacity-0 group-hover/item:opacity-100 transition-opacity ${light ? "text-white/30 hover:text-red-300" : "text-gray-300 hover:text-red-400"}`}>
    <Trash2 className="w-2.5 h-2.5" />
  </button>
);

const ContactLine = ({ profile, light, colors }: { profile: CvProfile; light?: boolean; colors: Colors }) => (
  <div className={`flex flex-wrap gap-x-4 gap-y-1 text-[10px] ${light ? "text-white/60" : "text-gray-500"}`}>
    {profile.email && <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" style={!light ? { color: colors.accent } : undefined} />{profile.email}</span>}
    {profile.telephone && <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" style={!light ? { color: colors.accent } : undefined} />{profile.telephone}</span>}
    {profile.ville && <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" style={!light ? { color: colors.accent } : undefined} />{profile.ville}</span>}
  </div>
);

// ─── Organic blob SVG ──────────────────────────────────────────────
const Blob = ({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path fill={color} d="M44.7,-76.4C58.8,-69.2,71.8,-58.5,79.6,-44.7C87.4,-30.9,89.9,-14,88.1,2.3C86.3,18.5,80.2,34.1,70.8,47.2C61.4,60.3,48.7,70.9,34.3,77.4C19.9,83.9,3.8,86.3,-11.2,83.5C-26.2,80.7,-40.1,72.7,-52.9,63C-65.7,53.3,-77.4,41.9,-83.3,27.7C-89.2,13.5,-89.3,-3.5,-84.8,-19.2C-80.3,-34.9,-71.2,-49.3,-58.5,-57.2C-45.8,-65.1,-29.5,-66.5,-14.4,-70.4C0.7,-74.3,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════
// 1. IMPACT — Glassmorphism sidebar, gradient accents, floating depth
// ═══════════════════════════════════════════════════════════════════
export const ImpactTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, sidebarPos, bulletStyle }: TemplateProps) => {
  const sidebar = (
    <div className="w-[38%] flex flex-col relative overflow-hidden" style={{ background: `linear-gradient(170deg, ${colors.primary}, ${colors.swatch})` }}>
      {/* Background blob */}
      <Blob color="rgba(255,255,255,0.04)" className="absolute -bottom-20 -left-10 w-48 h-48" />
      <Blob color="rgba(255,255,255,0.03)" className="absolute -top-16 -right-12 w-40 h-40" />

      <div className="relative px-5 pt-7 pb-4 z-10">
        <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center text-white/50 text-2xl font-black"
          style={{
            borderRadius: "24px 8px 24px 8px",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: `0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)`,
          }}>
          {profile.nom?.[0]?.toUpperCase() || "?"}
        </div>
        <h2 className="text-white text-center text-sm font-black tracking-wider uppercase">{profile.nom || "Votre Nom"}</h2>
        <p className="text-center text-[10px] mt-1 font-medium px-3 py-0.5 rounded-full mx-auto w-fit"
          style={{ background: `${colors.accent}30`, color: colors.accent, backdropFilter: "blur(8px)" }}>
          {profile.titre || "Titre du poste"}
        </p>
      </div>

      <div className="relative px-4 space-y-3 flex-1 z-10">
        <div className="p-3" style={{ borderRadius: "16px 4px 16px 4px", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
          <p className="text-[8px] text-white/35 uppercase tracking-[0.2em] font-bold mb-2">Contact</p>
          <ContactLine profile={profile} light colors={colors} />
        </div>
        <div className="p-3" style={{ borderRadius: "4px 16px 4px 16px", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
          <p className="text-[8px] text-white/35 uppercase tracking-[0.2em] font-bold mb-2">Atouts</p>
          {atoutEntries.length > 0 ? (
            <ul className="space-y-1.5">{atoutEntries.map(e => (
              <li key={e.id} className="flex items-start gap-2 text-white/80 text-[10px] group/item">
                <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} />
                <span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} light />
              </li>
            ))}</ul>
          ) : <p className="text-white/25 italic text-[9px]">Ajoutez des atouts…</p>}
        </div>
      </div>
      <div className="relative z-10 px-5 py-2 text-[7px] text-white/15 text-center font-medium tracking-wider uppercase">My CV Coach</div>
    </div>
  );

  const main = (
    <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
      {/* Gradient top stripe */}
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.primary}, ${colors.accent})` }} />
      {/* Subtle radial glow */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.04] rounded-full" style={{ background: `radial-gradient(circle, ${colors.accent}, transparent)` }} />

      <div className="flex-1 px-6 py-5 overflow-y-auto relative z-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] mb-4 pb-2 flex items-center gap-2" style={{ color: colors.primary, borderBottom: `2px solid transparent`, borderImage: `linear-gradient(90deg, ${colors.accent}, ${colors.primary}) 1` }}>
          <Layers className="w-3.5 h-3.5" /> Compétences
        </h3>
        {experienceEntries.length > 0 ? (
          <ul className="space-y-2">{experienceEntries.map(e => (
            <li key={e.id} className="flex items-start gap-2.5 group/item rounded-xl px-3 py-2 transition-all hover:translate-x-0.5"
              style={{ background: `${colors.primary}04`, boxShadow: `0 1px 4px ${colors.primary}08`, border: `1px solid ${colors.primary}08` }}>
              <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} /></span>
              <span className="flex-1 text-gray-700">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
            </li>
          ))}</ul>
        ) : <EmptyState color={colors.primary} />}
      </div>
    </div>
  );

  return (
    <div className="h-full flex text-[11px] leading-[1.6]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", flexDirection: sidebarPos === "right" ? "row-reverse" : "row" }}>
      {sidebarPos === "top" ? <div className="h-full flex flex-col">{sidebar}{main}</div> : <>{sidebar}{main}</>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// 2. ARTISAN — Organic shapes, variable radius, warm textures
// ═══════════════════════════════════════════════════════════════════
export const ArtisanTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, sidebarPos, bulletStyle }: TemplateProps) => (
  <div className="h-full flex flex-col text-[11px] leading-[1.6] relative overflow-hidden" style={{ fontFamily: "'DM Serif Display', Georgia, serif", background: `linear-gradient(180deg, hsl(40, 30%, 97%), hsl(35, 25%, 94%))` }}>
    {/* Organic blob backgrounds */}
    <Blob color={`${colors.accent}08`} className="absolute -top-20 -right-20 w-56 h-56" />
    <Blob color={`${colors.primary}06`} className="absolute bottom-10 -left-16 w-44 h-44" />

    {/* Header with organic radius */}
    <div className="relative mx-4 mt-4 px-6 py-5 overflow-hidden" style={{ borderRadius: "28px 8px 28px 8px", background: `linear-gradient(135deg, ${colors.primary}, ${colors.swatch})`, boxShadow: `0 8px 32px ${colors.primary}25, 0 2px 8px ${colors.primary}15` }}>
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='%23fff'/%3E%3C/svg%3E\")" }} />
      <div className="relative flex items-end gap-4">
        <div className="w-14 h-14 flex items-center justify-center text-white/50 text-xl font-bold" style={{ borderRadius: "50% 30% 50% 30%", background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.2)", boxShadow: "inset 0 2px 4px rgba(255,255,255,0.1)" }}>
          {profile.nom?.[0]?.toUpperCase() || "?"}
        </div>
        <div>
          <h2 className="text-white text-lg font-bold leading-tight">{profile.nom || "Votre Nom"}</h2>
          <p className="text-white/60 text-xs italic mt-0.5">{profile.titre || "Titre du poste"}</p>
        </div>
      </div>
      <div className="relative mt-3" style={{ fontFamily: "'DM Sans', sans-serif" }}><ContactLine profile={profile} light colors={colors} /></div>
    </div>

    <div className="flex-1 flex relative z-10 mt-3" style={{ flexDirection: sidebarPos === "left" ? "row-reverse" : "row" }}>
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-3 pb-1.5 flex items-center gap-2" style={{ color: colors.primary, fontFamily: "'DM Sans', sans-serif" }}>
          <span className="w-6 h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.primary})` }} />
          Compétences
        </h3>
        {experienceEntries.length > 0 ? (
          <ul className="space-y-2">{experienceEntries.map((e, i) => (
            <li key={e.id} className="flex items-start gap-2.5 group/item px-3 py-2 transition-all hover:translate-x-0.5"
              style={{ borderRadius: i % 2 === 0 ? "12px 4px 12px 4px" : "4px 12px 4px 12px", background: "rgba(255,255,255,0.6)", boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)", backdropFilter: "blur(4px)" }}>
              <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} /></span>
              <span className="flex-1 text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
            </li>
          ))}</ul>
        ) : <EmptyState color={colors.accent} />}
      </div>
      <div className="w-[34%] px-4 py-4 space-y-3" style={{ background: `${colors.primary}05` }}>
        <div className="p-3" style={{ borderRadius: "8px 20px 8px 20px", background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)", boxShadow: `0 4px 12px ${colors.primary}08` }}>
          <p className="text-[9px] uppercase tracking-widest font-semibold mb-2" style={{ color: colors.accent, fontFamily: "'DM Sans', sans-serif" }}>Atouts</p>
          {atoutEntries.length > 0 ? (
            <ul className="space-y-1.5">{atoutEntries.map(e => (
              <li key={e.id} className="flex items-start gap-2 text-[10px] text-gray-600 group/item" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <Star className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} /><span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
              </li>
            ))}</ul>
          ) : <p className="text-gray-400 italic text-[9px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Ajoutez…</p>}
        </div>
      </div>
    </div>
    <div className="px-6 py-2 text-[8px] text-gray-400 flex justify-between" style={{ fontFamily: "'DM Sans', sans-serif" }}><span>My CV Coach · Méthode Fred</span><span>L'Artisan</span></div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════
// 3. CRÉATIF — Bold asymmetry, overflowing titles, floating geometry
// ═══════════════════════════════════════════════════════════════════
export const CreatifTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle }: TemplateProps) => (
  <div className="h-full flex flex-col text-[11px] leading-[1.6] relative overflow-hidden bg-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
    {/* Floating geometric shapes with gradients */}
    <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full" style={{ background: `radial-gradient(circle, ${colors.accent}12, transparent)` }} />
    <svg className="absolute top-1/4 -left-3 opacity-[0.08]" width="50" height="50" viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="4" fill="none" stroke={colors.primary} strokeWidth="2" transform="rotate(15 25 25)" /></svg>
    <div className="absolute bottom-1/3 right-4 w-14 h-14 rounded-full opacity-[0.06]" style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})` }} />
    <svg className="absolute bottom-16 left-8 opacity-[0.07]" width="70" height="35" viewBox="0 0 70 35"><path d="M5 30L35 5L65 30" stroke={colors.accent} strokeWidth="2.5" fill="none" strokeLinecap="round" /></svg>
    <Blob color={`${colors.primary}05`} className="absolute -bottom-24 -right-16 w-52 h-52" />

    {/* Header — bold, overflowing feel */}
    <div className="relative px-7 pt-7 pb-4">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-black tracking-[-0.02em] leading-[0.9]" style={{ color: colors.primary }}>
            {(profile.nom || "Votre Nom").split(" ").map((w, i) => (
              <span key={i} className={i === 0 ? "" : "block"} style={i > 0 ? { color: colors.accent } : undefined}>{w} </span>
            ))}
          </h2>
          <div className="mt-2 inline-flex items-center gap-1.5">
            <span className="w-5 h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})` }} />
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: colors.accent }}>{profile.titre || "Titre"}</span>
          </div>
        </div>
        <div className="w-14 h-14 rotate-6 flex items-center justify-center text-white text-lg font-black"
          style={{ borderRadius: "20px 6px 20px 6px", background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, boxShadow: `0 8px 24px ${colors.primary}30, 0 4px 8px ${colors.accent}20` }}>
          {profile.nom?.[0]?.toUpperCase() || "?"}
        </div>
      </div>
    </div>

    {/* Contact — gradient border card */}
    <div className="mx-7 p-[1px] rounded-xl mb-3" style={{ background: `linear-gradient(90deg, ${colors.primary}30, ${colors.accent}30)` }}>
      <div className="rounded-xl px-4 py-2 bg-white"><ContactLine profile={profile} colors={colors} /></div>
    </div>

    <div className="flex-1 flex px-7 gap-4 overflow-y-auto pb-3 relative z-10">
      <div className="flex-1">
        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] mb-3 flex items-center gap-2" style={{ color: colors.primary }}>
          <span className="w-6 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} /> Compétences
        </h3>
        {experienceEntries.length > 0 ? (
          <ul className="space-y-2">{experienceEntries.map((e, idx) => (
            <li key={e.id} className="flex items-start gap-2 group/item px-3 py-2 transition-all hover:translate-x-0.5" style={{
              borderRadius: idx % 3 === 0 ? "14px 4px 14px 4px" : idx % 3 === 1 ? "4px 14px 4px 14px" : "14px",
              borderLeft: `3px solid ${idx % 2 === 0 ? colors.primary : colors.accent}`,
              background: `linear-gradient(135deg, ${colors.primary}03, ${colors.accent}03)`,
              boxShadow: `0 2px 8px ${colors.primary}06`
            }}>
              <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} /></span>
              <span className="flex-1 text-gray-700">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
            </li>
          ))}</ul>
        ) : <EmptyState color={colors.accent} />}
      </div>
      <div className="w-[33%] space-y-3">
        <div className="p-[1px]" style={{ borderRadius: "8px 20px 8px 20px", background: `linear-gradient(180deg, ${colors.primary}20, ${colors.accent}20)` }}>
          <div className="p-3 bg-white" style={{ borderRadius: "7px 19px 7px 19px" }}>
            <p className="text-[9px] uppercase tracking-widest font-black mb-2" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Atouts</p>
            {atoutEntries.length > 0 ? (
              <ul className="space-y-1.5">{atoutEntries.map(e => (
                <li key={e.id} className="flex items-start gap-1.5 text-[10px] text-gray-600 group/item">
                  <span className="w-2 h-2 rounded-full mt-0.5 flex-shrink-0" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }} /><span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
                </li>
              ))}</ul>
            ) : <p className="text-gray-400 italic text-[9px]">Ajoutez…</p>}
          </div>
        </div>
      </div>
    </div>
    <div className="px-7 py-2 text-[8px] text-gray-300 flex justify-between"><span>My CV Coach · Méthode Fred</span><span>Le Créatif</span></div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════
// 4. MURAL — Heavy blocks, industrial shadows, structured grid
// ═══════════════════════════════════════════════════════════════════
export const MuralTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, sidebarPos, bulletStyle }: TemplateProps) => (
  <div className="h-full flex flex-col text-[11px] leading-[1.6] relative" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: `linear-gradient(180deg, hsl(210,10%,96%), hsl(210,8%,93%))` }}>
    {/* Heavy top bar with gradient */}
    <div className="px-7 py-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.swatch})`, boxShadow: `0 6px 24px ${colors.primary}30` }}>
      {/* Geometric pattern overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]"><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="none" stroke="white" strokeWidth="0.5"/></pattern><rect width="100%" height="100%" fill="url(#grid)"/></svg>
      <div className="relative">
        <h2 className="text-white text-xl font-black tracking-[0.1em] uppercase leading-none">{profile.nom || "VOTRE NOM"}</h2>
        <div className="flex items-center gap-3 mt-2">
          <span className="w-10 h-1.5" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)`, borderRadius: "4px" }} />
          <p className="text-white/75 text-xs font-bold uppercase tracking-wider">{profile.titre || "Titre du poste"}</p>
        </div>
        <div className="mt-3"><ContactLine profile={profile} light colors={colors} /></div>
      </div>
    </div>

    <div className="flex-1 flex" style={{ flexDirection: sidebarPos === "left" ? "row-reverse" : "row" }}>
      <div className="flex-1 px-5 py-4 overflow-y-auto">
        <div className="flex items-center gap-2 mb-3">
          <Grid3X3 className="w-4 h-4" style={{ color: colors.primary }} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: colors.primary }}>Compétences</h3>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${colors.primary}25, transparent)` }} />
        </div>
        {experienceEntries.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {experienceEntries.map(e => (
              <div key={e.id} className="flex items-start gap-2.5 group/item p-2.5 transition-all hover:translate-y-[-1px]"
                style={{ borderRadius: "8px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(4px)", boxShadow: `0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)`, borderLeft: `4px solid ${e.bullet === "technique" ? colors.primary : colors.accent}` }}>
                <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} /></span>
                <span className="flex-1 text-gray-700 font-medium">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
              </div>
            ))}
          </div>
        ) : <EmptyState color={colors.primary} label="Blocs compétences ici" />}
      </div>

      <div className="w-[30%] py-4 px-3 relative" style={{ background: `${colors.primary}06` }}>
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: `linear-gradient(180deg, ${colors.accent}, ${colors.primary})` }} />
        <div className="flex items-center gap-1.5 mb-3 ml-2">
          <span className="w-3 h-3 rounded-sm" style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`, boxShadow: `0 2px 4px ${colors.accent}30` }} />
          <p className="text-[9px] uppercase tracking-[0.2em] font-black" style={{ color: colors.primary }}>Atouts</p>
        </div>
        {atoutEntries.length > 0 ? (
          <ul className="space-y-2 ml-2">{atoutEntries.map(e => (
            <li key={e.id} className="flex items-start gap-2 text-[10px] text-gray-600 group/item p-2 bg-white/60 rounded-lg"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: `1px solid ${colors.accent}15` }}>
              <ArrowRightCircle className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} /><span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
            </li>
          ))}</ul>
        ) : <p className="text-gray-400 italic text-[9px] ml-2">Ajoutez…</p>}
      </div>
    </div>
    <div className="px-5 py-2 text-[8px] text-gray-400 flex justify-between" style={{ background: `linear-gradient(90deg, ${colors.primary}08, transparent)` }}><span>My CV Coach · Méthode Fred</span><span>Mural</span></div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════
// 5. MAGAZINE — Split header, gradient borders, numbered badges
// ═══════════════════════════════════════════════════════════════════
export const MagazineTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle }: TemplateProps) => (
  <div className="h-full flex flex-col text-[11px] leading-[1.6]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
    {/* Split header with gradient transition */}
    <div className="flex items-stretch relative overflow-hidden">
      <div className="flex-1 px-7 py-5 flex flex-col justify-center relative" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.swatch})` }}>
        <Blob color="rgba(255,255,255,0.04)" className="absolute -bottom-10 -left-10 w-32 h-32" />
        <h2 className="text-white text-lg font-black relative z-10 leading-tight">{profile.nom || "Votre Nom"}</h2>
        <p className="text-white/65 text-xs mt-0.5 relative z-10 font-medium">{profile.titre || "Titre du poste"}</p>
      </div>
      <div className="w-[35%] px-5 py-4 flex flex-col justify-center relative" style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}dd)`, boxShadow: `inset 4px 0 12px rgba(0,0,0,0.1)` }}>
        <ContactLine profile={profile} light colors={colors} />
      </div>
    </div>

    {/* Gradient separator */}
    <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent}, ${colors.primary})` }} />

    <div className="flex-1 flex overflow-y-auto bg-white">
      <div className="flex-1 px-6 py-5">
        {/* Gradient underline heading */}
        <div className="mb-4 pb-2" style={{ borderBottom: "2px solid transparent", borderImage: `linear-gradient(90deg, ${colors.accent}, ${colors.primary}, transparent) 1` }}>
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: colors.primary }}>Compétences professionnelles</h3>
        </div>
        {experienceEntries.length > 0 ? (
          <ul className="space-y-2">{experienceEntries.map(e => (
            <li key={e.id} className="flex items-start gap-2.5 group/item py-1.5 px-2 rounded-lg transition-all hover:bg-gray-50/80"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
              <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} /></span>
              <span className="flex-1 text-gray-700">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
            </li>
          ))}</ul>
        ) : <EmptyState color={colors.primary} />}
      </div>
      <div className="w-[1px]" style={{ background: `linear-gradient(180deg, ${colors.primary}15, ${colors.accent}15, transparent)` }} />
      <div className="w-[35%] px-5 py-5">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 pb-2" style={{ color: colors.accent, borderBottom: "2px solid transparent", borderImage: `linear-gradient(90deg, ${colors.primary}, transparent) 1` }}>Atouts clés</h3>
        {atoutEntries.length > 0 ? (
          <ul className="space-y-2.5">{atoutEntries.map((e, idx) => (
            <li key={e.id} className="flex items-start gap-2.5 text-[10px] text-gray-600 group/item">
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
    <div className="px-6 py-2 text-[8px] text-gray-400 flex justify-between" style={{ background: `linear-gradient(90deg, ${colors.primary}05, transparent)` }}><span>My CV Coach · Méthode Fred</span><span>Magazine</span></div>
  </div>
);


// ═══════════════════════════════════════════════════════════════════
// 7. MÉDICAL — Soft circles, calming gradient, floating pill cards
// ═══════════════════════════════════════════════════════════════════
export const MedicalTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle }: TemplateProps) => (
  <div className="h-full flex flex-col text-[11px] leading-[1.6] relative overflow-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: `linear-gradient(180deg, ${colors.primary}06, white, ${colors.accent}04)` }}>
    {/* Soft ambient circles */}
    <div className="absolute top-20 -right-16 w-48 h-48 rounded-full" style={{ background: `radial-gradient(circle, ${colors.accent}08, transparent)` }} />
    <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full" style={{ background: `radial-gradient(circle, ${colors.primary}06, transparent)` }} />

    {/* Soft header */}
    <div className="relative mx-5 mt-4 px-6 py-5 flex items-center gap-5 overflow-hidden" style={{ borderRadius: "24px", background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, boxShadow: `0 8px 32px ${colors.primary}20, 0 4px 12px ${colors.accent}15` }}>
      <Blob color="rgba(255,255,255,0.05)" className="absolute -bottom-12 -right-8 w-40 h-40" />
      <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold relative z-10"
        style={{ background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.25)", boxShadow: "0 4px 12px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.2)" }}>
        {profile.nom?.[0]?.toUpperCase() || "?"}
      </div>
      <div className="relative z-10">
        <h2 className="text-white text-base font-bold">{profile.nom || "Votre Nom"}</h2>
        <p className="text-white/70 text-xs font-medium">{profile.titre || "Titre du poste"}</p>
        <div className="mt-2"><ContactLine profile={profile} light colors={colors} /></div>
      </div>
    </div>

    <div className="flex-1 px-5 py-4 overflow-y-auto space-y-3 relative z-10">
      {/* Competences card */}
      <div className="p-4" style={{ borderRadius: "20px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", boxShadow: `0 4px 20px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px ${colors.accent}10` }}>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 flex items-center gap-2" style={{ color: colors.primary }}>
          <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.accent}20, ${colors.primary}15)` }}><Layers className="w-3 h-3" style={{ color: colors.accent }} /></span>
          Compétences
        </h3>
        {experienceEntries.length > 0 ? (
          <ul className="space-y-2">{experienceEntries.map(e => (
            <li key={e.id} className="flex items-start gap-2.5 group/item px-3 py-1.5 rounded-2xl transition-all hover:bg-white/80" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
              <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} /></span>
              <span className="flex-1 text-gray-700">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
            </li>
          ))}</ul>
        ) : <EmptyState color={colors.accent} />}
      </div>

      {/* Atouts card */}
      <div className="p-4" style={{ borderRadius: "20px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", boxShadow: `0 4px 20px rgba(0,0,0,0.04), 0 0 0 1px ${colors.primary}08` }}>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 flex items-center gap-2" style={{ color: colors.accent }}>
          <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}10)` }}><Star className="w-3 h-3" style={{ color: colors.primary }} /></span>
          Qualités humaines
        </h3>
        {atoutEntries.length > 0 ? (
          <div className="flex flex-wrap gap-2">{atoutEntries.map(e => (
            <span key={e.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] text-gray-600 group/item"
              style={{ borderRadius: "20px", background: `linear-gradient(135deg, ${colors.accent}08, ${colors.primary}05)`, border: `1px solid ${colors.accent}15`, boxShadow: `0 2px 6px ${colors.accent}06` }}>
              {e.selected}<DeleteBtn onClick={() => removeEntry(e.id)} />
            </span>
          ))}</div>
        ) : <p className="text-gray-400 italic text-[9px]">Ajoutez des atouts…</p>}
      </div>
    </div>
    <div className="px-6 py-2 text-[8px] text-gray-400 flex justify-between"><span>My CV Coach · Méthode Fred</span><span>Médical</span></div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════
// 8. FLUX — Diagonal cuts, timeline nodes, gradient flow
// ═══════════════════════════════════════════════════════════════════
export const FluxTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle }: TemplateProps) => (
  <div className="h-full flex flex-col text-[11px] leading-[1.6] relative" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: `linear-gradient(180deg, white, ${colors.primary}04)` }}>
    {/* Header with diagonal accent */}
    <div className="px-7 py-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.swatch})`, boxShadow: `0 6px 24px ${colors.primary}25` }}>
      <div className="absolute top-0 right-0 w-2/5 h-full" style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}cc)`, clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)" }} />
      <Blob color="rgba(255,255,255,0.04)" className="absolute -bottom-16 left-10 w-36 h-36" />
      <div className="relative z-10">
        <h2 className="text-white text-lg font-black uppercase tracking-[0.08em] leading-none">{profile.nom || "Votre Nom"}</h2>
        <p className="text-white/70 text-xs font-bold mt-1 uppercase tracking-wider">{profile.titre || "Titre du poste"}</p>
        <div className="mt-3"><ContactLine profile={profile} light colors={colors} /></div>
      </div>
    </div>

    {/* Flow body — timeline with gradient line */}
    <div className="flex-1 px-6 py-5 overflow-y-auto relative">
      {/* Vertical gradient flow line */}
      <div className="absolute left-[42px] top-5 bottom-5 w-[2px]" style={{ background: `linear-gradient(180deg, ${colors.accent}, ${colors.primary}, ${colors.accent}30, transparent)`, borderRadius: "2px" }} />

      <h3 className="text-[10px] font-black uppercase tracking-[0.25em] mb-4 ml-10 flex items-center gap-2" style={{ color: colors.primary }}>
        <ArrowRightCircle className="w-4 h-4" style={{ color: colors.accent, filter: `drop-shadow(0 0 4px ${colors.accent}40)` }} /> Parcours & compétences
      </h3>

      {experienceEntries.length > 0 ? (
        <div className="space-y-2.5 ml-3">{experienceEntries.map(e => (
          <div key={e.id} className="flex items-start gap-3 group/item relative">
            {/* Timeline node */}
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 z-10"
              style={{ background: `linear-gradient(135deg, ${e.bullet === "technique" ? colors.primary : colors.accent}, ${e.bullet === "technique" ? colors.swatch : colors.primary})`, boxShadow: `0 2px 8px ${colors.accent}30` }}>
              <div className="w-2 h-2 rounded-full bg-white/80" />
            </div>
            <div className="flex-1 p-2.5 transition-all hover:translate-x-0.5"
              style={{ borderRadius: "12px 4px 12px 4px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(4px)", boxShadow: `0 2px 10px rgba(0,0,0,0.05), 0 0 0 1px ${colors.primary}08`, borderLeft: `3px solid ${e.bullet === "technique" ? colors.primary : colors.accent}` }}>
              <div className="flex items-start gap-2">
                <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} /></span>
                <span className="flex-1 text-gray-700">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
              </div>
            </div>
          </div>
        ))}</div>
      ) : <div className="ml-10"><EmptyState color={colors.accent} label="Le flux de compétences apparaît ici" /></div>}

      {/* Atouts — gradient bordered section */}
      <div className="mt-5 ml-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2" style={{ color: colors.accent }}>
          <span className="w-6 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})` }} /> Atouts
        </h3>
        {atoutEntries.length > 0 ? (
          <div className="flex flex-wrap gap-2">{atoutEntries.map(e => (
            <span key={e.id} className="p-[1px] group/item" style={{ borderRadius: "10px", background: `linear-gradient(135deg, ${colors.accent}30, ${colors.primary}30)` }}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] text-gray-600 bg-white" style={{ borderRadius: "9px" }}>
                <ChevronRight className="w-2.5 h-2.5" style={{ color: colors.accent }} />{e.selected}<DeleteBtn onClick={() => removeEntry(e.id)} />
              </span>
            </span>
          ))}</div>
        ) : <p className="text-gray-400 italic text-[9px]">Ajoutez des atouts…</p>}
      </div>
    </div>
    <div className="px-6 py-2 text-[8px] text-gray-400 flex justify-between" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}08, transparent)` }}><span>My CV Coach · Méthode Fred</span><span>Flux</span></div>
  </div>
);

// ─── Template registry ─────────────────────────────────────────────
export const templateRegistry: Record<string, React.FC<TemplateProps>> = {
  impact: ImpactTemplate,
  artisan: ArtisanTemplate,
  creatif: CreatifTemplate,
  mural: MuralTemplate,
  magazine: MagazineTemplate,
  medical: MedicalTemplate,
  flux: FluxTemplate,
};
