import { FileText, Target, Lightbulb, TrendingUp, Layout, PenLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const tips = [
  {
    icon: Target,
    title: "Adaptez chaque candidature",
    desc: "Personnalisez votre CV pour chaque offre. Reprenez les mots-clés de l'annonce dans vos expériences.",
  },
  {
    icon: TrendingUp,
    title: "Quantifiez vos résultats",
    desc: "« Augmenté les ventes de 23% » est plus impactant que « Responsable des ventes ».",
  },
  {
    icon: Layout,
    title: "Structure claire & aérée",
    desc: "Un recruteur passe 7 secondes sur un CV. Titres lisibles, espaces, hiérarchie visuelle.",
  },
  {
    icon: PenLine,
    title: "Verbes d'action forts",
    desc: "Commencez chaque point par un verbe : piloté, conçu, optimisé, lancé, négocié.",
  },
  {
    icon: FileText,
    title: "Une page, pas plus",
    desc: "Sauf 15+ ans d'expérience. Gardez uniquement ce qui est pertinent pour le poste visé.",
  },
  {
    icon: Lightbulb,
    title: "Compétences techniques visibles",
    desc: "Listez clairement vos outils et technologies. Les ATS scannent ces mots-clés en priorité.",
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
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Conseils d'experts</p>
          <h2 className="text-3xl md:text-4xl tracking-tight mb-4">
            Les 6 règles d'or d'un CV qui convertit
          </h2>
          <p className="text-muted-foreground text-lg">
            Appliquez ces principes pour transformer votre CV en machine à entretiens.
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
