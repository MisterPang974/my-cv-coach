import { FileText, Target, Lightbulb, Palette, Type, CheckSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const tips = [
  {
    icon: Target,
    title: "Les 4C à respecter",
    desc: "Créativité, Clarté, Cohérence, Commercial — les 4 piliers d'un CV qui retient l'attention des recruteurs.",
  },
  {
    icon: FileText,
    title: "Bilan de compétences d'abord",
    desc: "Identifiez vos savoir-faire, savoir-être et savoirs avant de rédiger. Utilisez la méthode de l'interview croisée.",
  },
  {
    icon: Lightbulb,
    title: "Des tâches aux compétences",
    desc: "Reformulez vos tâches quotidiennes avec des verbes d'action : piloter, concevoir, optimiser, négocier.",
  },
  {
    icon: Palette,
    title: "Couleurs et illustrations",
    desc: "Utilisez des icônes métiers, logos et couleurs en cohérence avec votre secteur. Connaissez la symbolique des couleurs.",
  },
  {
    icon: Type,
    title: "Typographie soignée",
    desc: "Une ou deux polices classiques maximum. Corps 12 pour les paragraphes. Envoyez toujours en PDF.",
  },
  {
    icon: CheckSquare,
    title: "Chiffres et résultats",
    desc: "« Augmenté les ventes de 23% » vaut mieux que « Responsable des ventes ». Quantifiez chaque réalisation.",
  },
];

const Tips = () => {
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

  return (
    <section id="conseils" className="py-24 bg-card" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Méthode Fred</p>
          <h2 className="text-3xl md:text-4xl tracking-tight mb-4">
            Les 6 principes du CV Créatif
          </h2>
          <p className="text-muted-foreground text-lg">
            Inspirés des 10 commandements du CV et de la méthode d'évolution professionnelle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, i) => (
            <div
              key={tip.title}
              className="group rounded-xl bg-background p-7 shadow-sm hover:shadow-md transition-[box-shadow,transform] duration-300 active:scale-[0.98]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                filter: visible ? "blur(0)" : "blur(4px)",
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`,
              }}
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <tip.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-sans">{tip.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tips;
