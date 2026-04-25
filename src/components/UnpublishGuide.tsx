import { Globe, MousePointerClick, Settings2, PowerOff, CheckCircle2, Smartphone, Monitor } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const desktopSteps = [
  {
    icon: Monitor,
    title: "Ouvrez l'éditeur Lovable",
    description: "Rendez-vous sur votre projet dans Lovable depuis un ordinateur.",
  },
  {
    icon: MousePointerClick,
    title: "Cliquez sur « Publish »",
    description: "Le bouton se trouve en haut à droite de l'éditeur (icône globe).",
  },
  {
    icon: Settings2,
    title: "Ouvrez les options de publication",
    description: "Dans la fenêtre qui s'affiche, repérez la section gérant le site déjà en ligne.",
  },
  {
    icon: PowerOff,
    title: "Cliquez sur « Unpublish »",
    description: "Confirmez pour retirer complètement votre site de l'URL publique.",
  },
];

const mobileSteps = [
  {
    icon: Smartphone,
    title: "Passez en mode Preview",
    description: "Depuis votre projet sur mobile, basculez en mode aperçu.",
  },
  {
    icon: MousePointerClick,
    title: "Touchez le bouton « ... »",
    description: "Il se situe en bas à droite de l'écran.",
  },
  {
    icon: Globe,
    title: "Sélectionnez « Publish »",
    description: "Le menu de publication s'ouvre avec les options disponibles.",
  },
  {
    icon: PowerOff,
    title: "Touchez « Unpublish »",
    description: "Confirmez pour rendre votre site inaccessible publiquement.",
  },
];

const StepCard = ({ step, index }: { step: typeof desktopSteps[number]; index: number }) => {
  const Icon = step.icon;
  return (
    <Card className="relative p-5 hover:shadow-lg transition-shadow">
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md">
        {index + 1}
      </div>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
        </div>
      </div>
    </Card>
  );
};

const UnpublishGuide = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3">Guide rapide</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Comment dépublier votre site ?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Suivez ces étapes simples pour retirer votre site de la mise en ligne publique. Choisissez la méthode adaptée à votre appareil.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Desktop */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Monitor className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Sur ordinateur</h3>
            </div>
            <div className="space-y-4">
              {desktopSteps.map((step, i) => (
                <StepCard key={i} step={step} index={i} />
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Smartphone className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Sur mobile</h3>
            </div>
            <div className="space-y-4">
              {mobileSteps.map((step, i) => (
                <StepCard key={i} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>

        <Card className="mt-8 p-5 border-primary/20 bg-primary/5">
          <div className="flex gap-3 items-start">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-1">Confirmation</p>
              <p className="text-muted-foreground">
                Une fois dépublié, votre URL publique <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">.lovable.app</span> ne sera plus accessible. Vous pourrez republier à tout moment depuis le même menu.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default UnpublishGuide;
