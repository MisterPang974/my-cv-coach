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
  // If style forces a shape, override
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
  <div className="rounded-xl border-2 border-dashed p-5 text-center mt-3" style={{ borderColor: `${color}25` }}>
    <Briefcase className="w-7 h-7 mx-auto mb-1.5" style={{ color: `${color}30` }} />
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
  <div className={`flex flex-wrap gap-x-4 gap-y-1 text-[10px] ${light ? "text-white/55" : "text-gray-500"}`}>
    {profile.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" style={!light ? { color: colors.accent } : undefined} />{profile.email}</span>}
    {profile.telephone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" style={!light ? { color: colors.accent } : undefined} />{profile.telephone}</span>}
    {profile.ville && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" style={!light ? { color: colors.accent } : undefined} />{profile.ville}</span>}
  </div>
);

// ─── 1. IMPACT (sidebar left, glassmorphism) ───────────────────────
export const ImpactTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, sidebarPos, bulletStyle }: TemplateProps) => {
  const sidebar = (
    <div className="w-[38%] flex flex-col" style={{ background: colors.primary }}>
      <div className="px-5 pt-7 pb-4">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-white/30 text-xl font-bold" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)" }}>
          {profile.nom?.[0]?.toUpperCase() || "?"}
        </div>
        <h2 className="text-white text-center text-sm font-bold tracking-wide">{profile.nom || "Votre Nom"}</h2>
        <p className="text-white/60 text-center text-[10px] mt-0.5">{profile.titre || "Titre du poste"}</p>
      </div>
      <div className="px-5 space-y-3 flex-1">
        <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.07)" }}>
          <p className="text-[9px] text-white/40 uppercase tracking-widest font-semibold mb-2">Contact</p>
          <ContactLine profile={profile} light colors={colors} />
        </div>
        <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.07)" }}>
          <p className="text-[9px] text-white/40 uppercase tracking-widest font-semibold mb-2">Atouts</p>
          {atoutEntries.length > 0 ? (
            <ul className="space-y-1.5">{atoutEntries.map(e => (
              <li key={e.id} className="flex items-start gap-2 text-white/80 text-[10px] group/item">
                <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} />
                <span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} light />
              </li>
            ))}</ul>
          ) : <p className="text-white/30 italic text-[9px]">Ajoutez des atouts…</p>}
        </div>
      </div>
      <div className="px-5 py-2 text-[8px] text-white/20 text-center">My CV Coach</div>
    </div>
  );

  const main = (
    <div className="flex-1 flex flex-col bg-white">
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.primary})` }} />
      <div className="flex-1 px-6 py-5 overflow-y-auto">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 pb-2 flex items-center gap-2" style={{ color: colors.primary, borderBottom: `2px solid ${colors.accent}` }}>
          <Layers className="w-3.5 h-3.5" /> Compétences
        </h3>
        {experienceEntries.length > 0 ? (
          <ul className="space-y-1.5">{experienceEntries.map(e => (
            <li key={e.id} className="flex items-start gap-2.5 group/item rounded-lg px-2 py-1 hover:bg-gray-50 transition-colors">
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

// ─── 2. ARTISAN (organic, serif, right sidebar) ────────────────────
export const ArtisanTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, sidebarPos, bulletStyle }: TemplateProps) => (
  <div className="h-full flex flex-col text-[11px] leading-[1.6]" style={{ fontFamily: "'DM Serif Display', Georgia, serif", background: "hsl(40, 30%, 97%)" }}>
    <div className="px-7 py-6 relative" style={{ background: colors.primary }}>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v22H20v-1.5z' fill='%23fff' fill-opacity='0.08'/%3E%3C/svg%3E\")" }} />
      <div className="relative flex items-end gap-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white/40 text-lg font-bold" style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.25)" }}>
          {profile.nom?.[0]?.toUpperCase() || "?"}
        </div>
        <div>
          <h2 className="text-white text-base font-bold">{profile.nom || "Votre Nom"}</h2>
          <p className="text-white/65 text-xs italic">{profile.titre || "Titre du poste"}</p>
        </div>
      </div>
      <div className="relative mt-3" style={{ fontFamily: "'DM Sans', sans-serif" }}><ContactLine profile={profile} light colors={colors} /></div>
    </div>
    <div className="flex-1 flex" style={{ flexDirection: sidebarPos === "left" ? "row-reverse" : "row" }}>
      <div className="flex-1 px-6 py-5 overflow-y-auto">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 pb-1.5" style={{ color: colors.primary, borderBottom: `2px solid ${colors.accent}`, fontFamily: "'DM Sans', sans-serif" }}>Compétences</h3>
        {experienceEntries.length > 0 ? (
          <ul className="space-y-1.5">{experienceEntries.map(e => (
            <li key={e.id} className="flex items-start gap-2.5 group/item px-2 py-1 rounded-lg hover:bg-white/60 transition-colors">
              <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} /></span>
              <span className="flex-1 text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
            </li>
          ))}</ul>
        ) : <EmptyState color={colors.accent} />}
      </div>
      <div className="w-[34%] border-l px-4 py-5 space-y-3" style={{ borderColor: `${colors.primary}15`, background: `${colors.primary}06` }}>
        <p className="text-[9px] uppercase tracking-widest font-semibold" style={{ color: colors.accent, fontFamily: "'DM Sans', sans-serif" }}>Atouts</p>
        {atoutEntries.length > 0 ? (
          <ul className="space-y-1.5">{atoutEntries.map(e => (
            <li key={e.id} className="flex items-start gap-2 text-[10px] text-gray-600 group/item" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <Star className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} /><span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
            </li>
          ))}</ul>
        ) : <p className="text-gray-400 italic text-[9px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Ajoutez des atouts…</p>}
      </div>
    </div>
    <div className="px-6 py-2 border-t text-[8px] text-gray-400 flex justify-between" style={{ borderColor: `${colors.primary}10`, fontFamily: "'DM Sans', sans-serif" }}>
      <span>My CV Coach · Méthode Fred</span><span>L'Artisan</span>
    </div>
  </div>
);

// ─── 3. CRÉATIF (asymmetric, floating shapes) ──────────────────────
export const CreatifTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle }: TemplateProps) => (
  <div className="h-full flex flex-col text-[11px] leading-[1.6] relative overflow-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-[0.06]" style={{ background: colors.accent }} />
    <div className="absolute top-1/3 -left-4 w-16 h-16 rotate-45 rounded-md opacity-[0.05]" style={{ background: colors.primary }} />
    <div className="absolute bottom-1/4 right-8 w-10 h-10 rounded-full opacity-[0.04]" style={{ background: colors.accent }} />
    <svg className="absolute bottom-12 left-6 opacity-[0.06]" width="60" height="30" viewBox="0 0 60 30"><path d="M5 25L30 5L55 25" stroke={colors.primary} strokeWidth="3" fill="none" /></svg>
    <div className="relative px-7 pt-7 pb-5 flex items-end gap-5">
      <div className="flex-1">
        <h2 className="text-xl font-black tracking-tight leading-none" style={{ color: colors.primary }}>{profile.nom || "Votre Nom"}</h2>
        <div className="mt-1.5 inline-block rounded-full px-3 py-0.5 text-[10px] font-semibold text-white" style={{ background: colors.accent }}>{profile.titre || "Titre du poste"}</div>
      </div>
      <div className="w-12 h-12 rounded-2xl rotate-3 flex items-center justify-center text-white text-base font-bold shadow-lg" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        {profile.nom?.[0]?.toUpperCase() || "?"}
      </div>
    </div>
    <div className="mx-7 rounded-xl px-4 py-2 mb-3" style={{ background: `${colors.primary}08` }}><ContactLine profile={profile} colors={colors} /></div>
    <div className="flex-1 flex px-7 gap-4 overflow-y-auto pb-3">
      <div className="flex-1">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2" style={{ color: colors.primary }}>
          <span className="w-5 h-0.5 rounded-full" style={{ background: colors.accent }} /> Compétences
        </h3>
        {experienceEntries.length > 0 ? (
          <ul className="space-y-1.5">{experienceEntries.map((e, idx) => (
            <li key={e.id} className="flex items-start gap-2 group/item px-2 py-1 rounded-xl hover:bg-gray-50 transition-colors" style={{ borderLeft: `3px solid ${idx % 2 === 0 ? colors.primary : colors.accent}` }}>
              <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} /></span>
              <span className="flex-1 text-gray-700">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
            </li>
          ))}</ul>
        ) : <EmptyState color={colors.accent} />}
      </div>
      <div className="w-[33%] space-y-3">
        <div className="rounded-2xl p-3" style={{ background: `${colors.primary}08`, border: `1px solid ${colors.primary}12` }}>
          <p className="text-[9px] uppercase tracking-widest font-bold mb-2" style={{ color: colors.accent }}>Atouts</p>
          {atoutEntries.length > 0 ? (
            <ul className="space-y-1.5">{atoutEntries.map(e => (
              <li key={e.id} className="flex items-start gap-1.5 text-[10px] text-gray-600 group/item">
                <span className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: colors.accent }} /><span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
              </li>
            ))}</ul>
          ) : <p className="text-gray-400 italic text-[9px]">Ajoutez des atouts…</p>}
        </div>
      </div>
    </div>
    <div className="px-7 py-2 text-[8px] text-gray-300 flex justify-between"><span>My CV Coach · Méthode Fred</span><span>Le Créatif</span></div>
  </div>
);

// ─── 4. MURAL (robust blocks, structured — Manual/Technique) ───────
export const MuralTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, sidebarPos, bulletStyle }: TemplateProps) => (
  <div className="h-full flex flex-col text-[11px] leading-[1.6]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
    {/* Heavy top bar */}
    <div className="px-7 py-5" style={{ background: colors.primary }}>
      <h2 className="text-white text-lg font-black tracking-wide uppercase">{profile.nom || "VOTRE NOM"}</h2>
      <div className="flex items-center gap-2 mt-1">
        <span className="w-8 h-1 rounded-full" style={{ background: colors.accent }} />
        <p className="text-white/70 text-xs font-medium">{profile.titre || "Titre du poste"}</p>
      </div>
      <div className="mt-3"><ContactLine profile={profile} light colors={colors} /></div>
    </div>
    {/* Grid body */}
    <div className="flex-1 flex" style={{ flexDirection: sidebarPos === "left" ? "row-reverse" : "row" }}>
      <div className="flex-1 px-6 py-5 overflow-y-auto">
        <div className="flex items-center gap-2 mb-3">
          <Grid3X3 className="w-4 h-4" style={{ color: colors.primary }} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: colors.primary }}>Compétences</h3>
          <div className="flex-1 h-px" style={{ background: `${colors.primary}20` }} />
        </div>
        {experienceEntries.length > 0 ? (
          <div className="grid grid-cols-1 gap-1.5">
            {experienceEntries.map(e => (
              <div key={e.id} className="flex items-start gap-2.5 group/item rounded-lg p-2 border transition-colors hover:shadow-sm" style={{ borderColor: `${colors.primary}15`, background: `${colors.primary}04` }}>
                <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} /></span>
                <span className="flex-1 text-gray-700 font-medium">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
              </div>
            ))}
          </div>
        ) : <EmptyState color={colors.primary} label="Blocs compétences ici" />}
      </div>
      {/* Side strip */}
      <div className="w-[30%] py-5 px-4" style={{ background: `${colors.primary}08`, borderLeft: `3px solid ${colors.accent}` }}>
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-2 h-2 rounded-sm" style={{ background: colors.accent }} />
          <p className="text-[9px] uppercase tracking-widest font-black" style={{ color: colors.primary }}>Atouts</p>
        </div>
        {atoutEntries.length > 0 ? (
          <ul className="space-y-2">{atoutEntries.map(e => (
            <li key={e.id} className="flex items-start gap-2 text-[10px] text-gray-600 group/item p-1.5 rounded border" style={{ borderColor: `${colors.accent}20` }}>
              <ArrowRightCircle className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} /><span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
            </li>
          ))}</ul>
        ) : <p className="text-gray-400 italic text-[9px]">Ajoutez des atouts…</p>}
      </div>
    </div>
    <div className="px-6 py-2 text-[8px] text-gray-400 flex justify-between" style={{ borderTop: `2px solid ${colors.primary}` }}><span>My CV Coach · Méthode Fred</span><span>Mural</span></div>
  </div>
);

// ─── 5. MAGAZINE (clean columns, data-focused — Tertiaire/Vente) ───
export const MagazineTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle }: TemplateProps) => (
  <div className="h-full flex flex-col text-[11px] leading-[1.6]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
    {/* Header band */}
    <div className="flex items-stretch">
      <div className="flex-1 px-7 py-5 flex flex-col justify-center" style={{ background: colors.primary }}>
        <h2 className="text-white text-lg font-bold">{profile.nom || "Votre Nom"}</h2>
        <p className="text-white/70 text-xs mt-0.5">{profile.titre || "Titre du poste"}</p>
      </div>
      <div className="w-[35%] px-5 py-4 flex flex-col justify-center" style={{ background: colors.accent }}>
        <ContactLine profile={profile} light colors={colors} />
      </div>
    </div>
    {/* 2-column body */}
    <div className="flex-1 flex overflow-y-auto">
      <div className="flex-1 px-6 py-5 border-r" style={{ borderColor: `${colors.primary}10` }}>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 pb-1.5" style={{ color: colors.primary, borderBottom: `2px solid ${colors.accent}` }}>Compétences professionnelles</h3>
        {experienceEntries.length > 0 ? (
          <ul className="space-y-2">{experienceEntries.map(e => (
            <li key={e.id} className="flex items-start gap-2.5 group/item py-1">
              <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} /></span>
              <span className="flex-1 text-gray-700">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
            </li>
          ))}</ul>
        ) : <EmptyState color={colors.primary} />}
      </div>
      <div className="w-[35%] px-5 py-5">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 pb-1.5" style={{ color: colors.accent, borderBottom: `2px solid ${colors.primary}` }}>Atouts clés</h3>
        {atoutEntries.length > 0 ? (
          <ul className="space-y-2">{atoutEntries.map((e, idx) => (
            <li key={e.id} className="flex items-start gap-2 text-[10px] text-gray-600 group/item">
              <span className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] text-white font-bold flex-shrink-0" style={{ background: idx % 2 === 0 ? colors.primary : colors.accent }}>{idx + 1}</span>
              <span className="flex-1">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
            </li>
          ))}</ul>
        ) : <p className="text-gray-400 italic text-[9px]">Ajoutez des atouts…</p>}
      </div>
    </div>
    <div className="px-6 py-2 border-t text-[8px] text-gray-400 flex justify-between" style={{ borderColor: `${colors.primary}15` }}><span>My CV Coach · Méthode Fred</span><span>Magazine</span></div>
  </div>
);

// ─── 6. DASHBOARD (glassmorphism, monospace — Tech/Digital) ────────
export const DashboardTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle }: TemplateProps) => (
  <div className="h-full flex flex-col text-[11px] leading-[1.6]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: colors.primary }}>
    {/* Top bar */}
    <div className="px-6 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ background: colors.accent, boxShadow: `0 0 6px ${colors.accent}` }} />
        <span className="text-white/60 text-[10px] font-mono uppercase tracking-widest">cv.dashboard</span>
      </div>
      <span className="text-white/30 text-[9px] font-mono">v2026.1</span>
    </div>
    {/* Name area */}
    <div className="px-6 py-5">
      <h2 className="text-white text-lg font-bold">{profile.nom || "Votre Nom"}</h2>
      <p className="font-mono text-[10px] mt-0.5" style={{ color: colors.accent }}>{`> ${profile.titre || "titre_poste"}`}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {[profile.email, profile.telephone, profile.ville].filter(Boolean).map((v, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] text-white/60 font-mono" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {i === 0 ? <Mail className="w-2.5 h-2.5" /> : i === 1 ? <Phone className="w-2.5 h-2.5" /> : <MapPin className="w-2.5 h-2.5" />}{v}
          </span>
        ))}
      </div>
    </div>
    {/* Widgets */}
    <div className="flex-1 px-5 pb-4 grid grid-cols-2 gap-3 overflow-y-auto">
      {/* Compétences widget */}
      <div className="col-span-2 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
        <h3 className="text-[9px] font-mono uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: colors.accent }}>
          <Layers className="w-3 h-3" /> skills.map()
        </h3>
        {experienceEntries.length > 0 ? (
          <div className="space-y-1.5">{experienceEntries.map(e => (
            <div key={e.id} className="flex items-start gap-2 group/item px-2 py-1 rounded-md transition-colors" style={{ background: "rgba(255,255,255,0.02)" }}>
              <span className="mt-0.5"><ModernBullet type={e.bullet} color={colors.accent} style={bulletStyle} /></span>
              <span className="flex-1 text-white/75 font-mono text-[10px]">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} light />
            </div>
          ))}</div>
        ) : <p className="text-white/20 italic text-[9px] font-mono">// Ajoutez des compétences…</p>}
      </div>
      {/* Atouts widget */}
      <div className="col-span-2 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 className="text-[9px] font-mono uppercase tracking-widest mb-3" style={{ color: colors.accent }}>const atouts = []</h3>
        {atoutEntries.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">{atoutEntries.map(e => (
            <span key={e.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] text-white/70 font-mono group/item" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${colors.accent}30` }}>
              {e.selected}<DeleteBtn onClick={() => removeEntry(e.id)} light />
            </span>
          ))}</div>
        ) : <p className="text-white/20 italic text-[9px] font-mono">// Ajoutez des atouts…</p>}
      </div>
    </div>
    <div className="px-5 py-2 text-[8px] text-white/15 font-mono flex justify-between"><span>my-cv-coach://méthode-fred</span><span>Dashboard</span></div>
  </div>
);

// ─── 7. MÉDICAL (soft forms, calming — Soin/Social) ────────────────
export const MedicalTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle }: TemplateProps) => (
  <div className="h-full flex flex-col text-[11px] leading-[1.6]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: `${colors.primary}06` }}>
    {/* Soft header */}
    <div className="px-7 py-6 flex items-center gap-5" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
      <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold" style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.3)" }}>
        {profile.nom?.[0]?.toUpperCase() || "?"}
      </div>
      <div>
        <h2 className="text-white text-base font-bold">{profile.nom || "Votre Nom"}</h2>
        <p className="text-white/70 text-xs">{profile.titre || "Titre du poste"}</p>
        <div className="mt-2"><ContactLine profile={profile} light colors={colors} /></div>
      </div>
    </div>
    {/* Body with rounded sections */}
    <div className="flex-1 px-6 py-5 overflow-y-auto space-y-4">
      <div className="rounded-2xl bg-white p-4 shadow-sm" style={{ border: `1px solid ${colors.accent}20` }}>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 flex items-center gap-2" style={{ color: colors.primary }}>
          <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `${colors.accent}20` }}><Layers className="w-3 h-3" style={{ color: colors.accent }} /></span>
          Compétences
        </h3>
        {experienceEntries.length > 0 ? (
          <ul className="space-y-1.5">{experienceEntries.map(e => (
            <li key={e.id} className="flex items-start gap-2.5 group/item px-2 py-1 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} /></span>
              <span className="flex-1 text-gray-700">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
            </li>
          ))}</ul>
        ) : <EmptyState color={colors.accent} />}
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-sm" style={{ border: `1px solid ${colors.primary}15` }}>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 flex items-center gap-2" style={{ color: colors.accent }}>
          <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `${colors.primary}15` }}><Star className="w-3 h-3" style={{ color: colors.primary }} /></span>
          Qualités humaines
        </h3>
        {atoutEntries.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">{atoutEntries.map(e => (
            <span key={e.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] text-gray-600 group/item" style={{ background: `${colors.accent}12`, border: `1px solid ${colors.accent}20` }}>
              {e.selected}<DeleteBtn onClick={() => removeEntry(e.id)} />
            </span>
          ))}</div>
        ) : <p className="text-gray-400 italic text-[9px]">Ajoutez des atouts…</p>}
      </div>
    </div>
    <div className="px-6 py-2 text-[8px] text-gray-400 flex justify-between"><span>My CV Coach · Méthode Fred</span><span>Médical</span></div>
  </div>
);

// ─── 8. FLUX (flow-based, arrows — Manual/Technique) ───────────────
export const FluxTemplate = ({ profile, experienceEntries, atoutEntries, removeEntry, colors, bulletStyle }: TemplateProps) => (
  <div className="h-full flex flex-col text-[11px] leading-[1.6]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
    {/* Top with diagonal accent */}
    <div className="px-7 py-5 relative overflow-hidden" style={{ background: colors.primary }}>
      <div className="absolute top-0 right-0 w-1/3 h-full" style={{ background: colors.accent, clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }} />
      <div className="relative">
        <h2 className="text-white text-base font-black uppercase tracking-wider">{profile.nom || "Votre Nom"}</h2>
        <p className="text-white/65 text-xs font-medium mt-0.5">{profile.titre || "Titre du poste"}</p>
        <div className="mt-3"><ContactLine profile={profile} light colors={colors} /></div>
      </div>
    </div>
    {/* Flow body — timeline style */}
    <div className="flex-1 px-6 py-5 overflow-y-auto relative">
      {/* Vertical flow line */}
      <div className="absolute left-10 top-5 bottom-5 w-px" style={{ background: `${colors.accent}25` }} />
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ml-8 flex items-center gap-2" style={{ color: colors.primary }}>
        <ArrowRightCircle className="w-3.5 h-3.5" style={{ color: colors.accent }} /> Parcours & compétences
      </h3>
      {experienceEntries.length > 0 ? (
        <div className="space-y-2 ml-3">{experienceEntries.map(e => (
          <div key={e.id} className="flex items-start gap-3 group/item relative">
            <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 z-10" style={{ background: "white", border: `2px solid ${e.bullet === "technique" ? colors.primary : colors.accent}` }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: e.bullet === "technique" ? colors.primary : colors.accent }} />
            </div>
            <div className="flex-1 rounded-lg p-2 border transition-colors hover:shadow-sm" style={{ borderColor: `${colors.primary}12`, background: `${colors.primary}03` }}>
              <div className="flex items-start gap-2">
                <span className="mt-0.5"><ModernBullet type={e.bullet} color={e.bullet === "technique" ? colors.primary : colors.accent} style={bulletStyle} /></span>
                <span className="flex-1 text-gray-700">{e.selected}</span><DeleteBtn onClick={() => removeEntry(e.id)} />
              </div>
            </div>
          </div>
        ))}</div>
      ) : <div className="ml-8"><EmptyState color={colors.accent} label="Le flux de compétences apparaît ici" /></div>}

      {/* Atouts at bottom */}
      <div className="mt-5 ml-8">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 flex items-center gap-2" style={{ color: colors.accent }}>
          <span className="w-4 h-0.5 rounded-full" style={{ background: colors.primary }} /> Atouts
        </h3>
        {atoutEntries.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">{atoutEntries.map(e => (
            <span key={e.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] text-gray-600 group/item" style={{ border: `1px solid ${colors.accent}25`, background: `${colors.accent}08` }}>
              <ChevronRight className="w-2.5 h-2.5" style={{ color: colors.accent }} />{e.selected}<DeleteBtn onClick={() => removeEntry(e.id)} />
            </span>
          ))}</div>
        ) : <p className="text-gray-400 italic text-[9px]">Ajoutez des atouts…</p>}
      </div>
    </div>
    <div className="px-6 py-2 text-[8px] text-gray-400 flex justify-between" style={{ borderTop: `2px solid ${colors.accent}` }}><span>My CV Coach · Méthode Fred</span><span>Flux</span></div>
  </div>
);

// ─── Template registry ─────────────────────────────────────────────
export const templateRegistry: Record<string, React.FC<TemplateProps>> = {
  impact: ImpactTemplate,
  artisan: ArtisanTemplate,
  creatif: CreatifTemplate,
  mural: MuralTemplate,
  magazine: MagazineTemplate,
  dashboard: DashboardTemplate,
  medical: MedicalTemplate,
  flux: FluxTemplate,
};
