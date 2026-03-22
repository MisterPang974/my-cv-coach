import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-accent/6 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            La Méthode Fred · 14 ans d'expertise
          </div>

          <h1 className="animate-fade-up-delay-1 text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6">
            Décrochez le job
            <br />
            <span className="text-primary">que vous méritez</span>
          </h1>

          <p className="animate-fade-up-delay-2 text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
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
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-border bg-background px-7 py-3.5 font-semibold hover:bg-secondary transition-colors duration-200 active:scale-[0.97]"
            >
              Générateur de CV
            </Link>
          </div>

          <div className="animate-fade-up-delay-3 flex gap-12 mt-16 pt-8 border-t border-border">
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
      </div>
    </section>
  );
};

export default Hero;
