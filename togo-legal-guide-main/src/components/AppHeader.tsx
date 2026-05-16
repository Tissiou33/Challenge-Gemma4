import { Link } from "@tanstack/react-router";
import { Scale, BookOpen, MessageCircle, Info } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="togo-flag-bar h-1 w-full" />
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground grid place-items-center shadow-sm group-hover:scale-105 transition-transform">
            <Scale className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-base">Baa-tou</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Droit togolais · IA
            </div>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "bg-primary text-primary-foreground" }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Assistant</span>
          </Link>
          <Link
            to="/bibliotheque"
            activeProps={{ className: "bg-primary text-primary-foreground" }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Bibliothèque</span>
          </Link>
          <Link
            to="/a-propos"
            activeProps={{ className: "bg-primary text-primary-foreground" }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
          >
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline">À propos</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
