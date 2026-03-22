import { FileText } from "lucide-react";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
    <div className="container mx-auto px-6 h-16 flex items-center justify-between">
      <a href="/" className="flex items-center gap-2 font-display text-lg">
        <FileText className="w-5 h-5 text-primary" />
        My CV Coach
      </a>
      <div className="hidden sm:flex items-center gap-8 text-sm">
        <a href="#conseils" className="text-muted-foreground hover:text-foreground transition-colors">Conseils</a>
        <a href="#checklist" className="text-muted-foreground hover:text-foreground transition-colors">Checklist</a>
        <a
          href="#checklist"
          className="rounded-lg bg-primary px-5 py-2 text-primary-foreground font-medium shadow-sm hover:shadow-md transition-[box-shadow] active:scale-[0.97]"
        >
          Évaluer mon CV
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
