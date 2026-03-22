import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";

const items = [
  { id: 1, text: "Mon CV tient sur une page (ou deux si +15 ans d'expérience)" },
  { id: 2, text: "Chaque expérience commence par un verbe d'action" },
  { id: 3, text: "J'ai quantifié au moins 3 réalisations avec des chiffres" },
  { id: 4, text: "Mes compétences techniques sont listées clairement" },
  { id: 5, text: "Pas de fautes d'orthographe (relu par un tiers)" },
  { id: 6, text: "Mon CV est adapté à l'offre ciblée" },
  { id: 7, text: "Mes coordonnées et LinkedIn sont à jour" },
  { id: 8, text: "Le design est sobre, lisible et professionnel" },
  { id: 9, text: "J'ai un titre de profil clair en haut du CV" },
  { id: 10, text: "Format PDF avec un nom de fichier professionnel" },
];

const Checklist = () => {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const toggle = (id: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const score = Math.round((checked.size / items.length) * 100);
  const getScoreMessage = () => {
    if (score === 100) return "🎉 Parfait ! Votre CV est prêt.";
    if (score >= 70) return "👍 Bon travail ! Encore quelques ajustements.";
    if (score >= 40) return "💪 Vous êtes sur la bonne voie.";
    return "📝 Commencez par cocher les éléments essentiels.";
  };

  return (
    <section id="checklist" className="py-24" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 text-center">Auto-évaluation</p>
            <h2 className="text-3xl md:text-4xl tracking-tight mb-4 text-center">
              Votre CV est-il prêt ?
            </h2>
            <p className="text-muted-foreground text-lg text-center mb-10">
              Cochez chaque critère rempli pour obtenir votre score.
            </p>
          </div>

          {/* Score bar */}
          <div
            className="mb-8 rounded-xl bg-card p-6 shadow-sm"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-lg">{score}%</span>
              <span className="text-sm text-muted-foreground">{checked.size}/{items.length} critères</span>
            </div>
            <div className="h-3 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-3">{getScoreMessage()}</p>
          </div>

          {/* Checklist items */}
          <div className="space-y-3">
            {items.map((item, i) => {
              const isChecked = checked.has(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className={`w-full flex items-center gap-4 rounded-xl p-4 text-left transition-[background,box-shadow,transform] duration-200 active:scale-[0.98] ${
                    isChecked
                      ? "bg-primary/5 shadow-sm"
                      : "bg-card hover:bg-secondary shadow-sm"
                  }`}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(12px)",
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.15 + i * 0.05}s`,
                  }}
                >
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                      isChecked
                        ? "bg-primary"
                        : "border-2 border-border"
                    }`}
                  >
                    {isChecked && <Check className="w-4 h-4 text-primary-foreground" />}
                  </div>
                  <span
                    className={`text-sm leading-snug transition-colors ${
                      isChecked ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checklist;
