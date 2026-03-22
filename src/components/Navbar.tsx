import { FileText, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "Diagnostic", path: "/diagnostic" },
  { label: "Générateur CV", path: "/cv-generator" },
];

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg">
          <FileText className="w-5 h-5 text-primary" />
          My CV Coach
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-colors ${
                location.pathname === item.path
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/diagnostic"
            className="rounded-lg bg-primary px-5 py-2 text-primary-foreground font-medium shadow-sm hover:shadow-md transition-[box-shadow] active:scale-[0.97]"
          >
            Commencer
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block py-2 ${
                location.pathname === item.path
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
