import { ArrowRight, Sparkles, Zap, Award, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const methodeItems = [
  { icon: Zap, label: "Style télégraphique", desc: "Pas de « Je… » — des verbes d'action percutants" },
  { icon: Award, label: "Preuves", desc: "Chaque tâche devient une compétence vérifiable" },
  { icon: Shield, label: "Atouts", desc: "Ponctualité, Réactivité, Respect des consignes" },
];

const Hero = () => {
  const methodeRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (methodeRef.current) obs.observe(methodeRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-accent/6 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 pt-20 pb-12">
        {/* Title + CTA row */}
        <div className="max-w-3xl mb-12">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            My CV Coach · 14 ans d'expertise
          </div>

          <h1 className="animate-fade-up-delay-1 text-4xl md:text-6xl leading-[1.05] tracking-tight mb-5">
            Décrochez le job
            <br />
            <span className="text-primary">que vous méritez</span>
          </h1>

          <p className="animate-fade-up-delay-2 text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            Diagnostic d'employabilité, générateur de compétences percutantes
            et modèles de CV professionnels — tout en un.
          </p>

          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4">
            <Link
              to="/diagnostic"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-[box-shadow,transform] duration-200 active:scale-[0.97]"
            >
              Faire mon diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/cv-generator"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3.5 text-accent-foreground font-semibold shadow-lg shadow-accent/20 hover:shadow-xl transition-[box-shadow,transform] duration-200 active:scale-[0.97]"
            >
              Générateur de CV
            </Link>
          </div>
        </div>

        {/* MÉTHODE FRED — prominent orange block */}
        <div
          ref={methodeRef}
          className="rounded-2xl bg-accent p-8 md:p-10 shadow-xl shadow-accent/15 mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            filter: visible ? "blur(0)" : "blur(4px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-accent-foreground tracking-tight">
                La Méthode Fred
              </h2>
              <p className="text-accent-foreground/70 text-sm">Les 3 piliers d'un CV qui décroche des entretiens</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {methodeItems.map((item, i) => (
              <div
                key={item.label}
                className="rounded-xl bg-white/15 backdrop-blur-sm p-5 hover:bg-white/25 transition-colors"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.15 + i * 0.1}s`,
                }}
              >
                <item.icon className="w-6 h-6 text-accent-foreground mb-3" />
                <h3 className="font-bold text-accent-foreground mb-1 text-base">{item.label}</h3>
                <p className="text-accent-foreground/80 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="animate-fade-up-delay-3 flex gap-12 pt-6 border-t border-border">
          {[
            { value: "87%", label: "de nos utilisateurs décrochent un entretien" },
            { value: "2.4x", label: "plus de rappels recruteurs" },
            { value: "14 ans", label: "d'expertise en coaching emploi" },
          ].map((stat) => (
            <div key={stat.label} className="hidden sm:block">
              <div className="text-2xl font-bold font-display text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1 max-w-[160px]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
