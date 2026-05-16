import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, BookOpen, ChevronRight, ArrowLeft, Gavel } from "lucide-react";
import { TOGO_LEGAL_DOCS, type LegalDoc } from "@/lib/togo-legal-docs";

export const Route = createFileRoute("/bibliotheque")({
  head: () => ({
    meta: [
      { title: "Bibliothèque juridique — Baa-tou" },
      { name: "description", content: "Constitution, Code Pénal, Code Foncier, Code du Travail et autres textes du droit togolais." },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<LegalDoc | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return TOGO_LEGAL_DOCS;
    return TOGO_LEGAL_DOCS.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.sections.some(
          (s) => s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q),
        ),
    );
  }, [query]);

  if (active) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-6">
        <button
          onClick={() => setActive(null)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
        <div className="mb-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
            {active.category} · {active.year}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mt-3">{active.title}</h1>
          <p className="text-muted-foreground mt-2">{active.summary}</p>
        </div>
        <div className="space-y-4">
          {active.sections.map((s, i) => (
            <article key={i} className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <h2 className="font-semibold text-base mb-2 text-primary">{s.title}</h2>
              <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">{s.content}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground text-center">
          Extraits à valeur informative. Consultez le texte officiel pour usage juridique.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-primary" /> Bibliothèque juridique
        </h1>
        <p className="text-muted-foreground mt-1">Textes de référence du droit togolais.</p>
      </div>

      <div className="relative mb-5">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un texte, un mot-clé…"
          className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-border bg-card outline-none focus:border-primary text-sm"
        />
      </div>

      <Link
        to="/affaires"
        className="flex items-center justify-between gap-3 p-4 mb-4 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground grid place-items-center">
            <Gavel className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-sm">Affaires judiciaires togolaises</div>
            <div className="text-xs text-muted-foreground">Cas réels du Barreau utilisés pour entraîner Baa-tou</div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-primary" />
      </Link>

      <div className="grid sm:grid-cols-2 gap-3">
        {filtered.map((d) => (
          <button
            key={d.id}
            onClick={() => setActive(d)}
            className="text-left p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                {d.category}
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
            <h3 className="font-semibold mt-1.5 text-sm leading-snug">{d.title}</h3>
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{d.summary}</p>
            <div className="text-[10px] text-muted-foreground mt-2">{d.year}</div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground col-span-2 text-center py-8">
            Aucun résultat pour « {query} ».
          </p>
        )}
      </div>
    </main>
  );
}
