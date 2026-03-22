import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-accent/6 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Votre coach CV personnel
          </div>

          <h1 className="animate-fade-up-delay-1 text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6">
            Décrochez le job
            <br />
            <span className="text-primary">que vous méritez</span>
          </h1>

          <p className="animate-fade-up-delay-2 text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
            Optimisez votre CV avec des conseils d'experts, une checklist personnalisée
            et les bonnes pratiques des recruteurs.
          </p>

          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4">
            <a
              href="#checklist"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-[box-shadow,transform] duration-200 active:scale-[0.97]"
            >
              Évaluer mon CV
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#conseils"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-border bg-background px-7 py-3.5 font-semibold hover:bg-secondary transition-colors duration-200 active:scale-[0.97]"
            >
              Voir les conseils
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-up-delay-3 flex gap-12 mt-16 pt-8 border-t border-border">
            {[
              { value: "87%", label: "de nos utilisateurs décrochent un entretien" },
              { value: "2.4x", label: "plus de rappels recruteurs" },
              { value: "< 6 min", label: "pour évaluer votre CV" },
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
