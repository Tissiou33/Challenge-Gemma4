import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, Gavel, ArrowLeft, ExternalLink, Calendar, MapPin } from "lucide-react";
import casesData from "@/lib/togo-cases.json";

type Case = {
  id: number;
  affaire: string;
  personne: string;
  date_arrestation: string | null;
  date_jugement: string | null;
  statut: string;
  chefs_accusation: string[];
  lois_evoquees: string[];
  articles_specifiques: string[];
  peine_prononcee: string;
  peine_legale_maximale: string;
  juridiction: string;
  nature_litige: string;
  organisations_alertees: string[];
  contexte: string;
  source: string;
};

const CASES = casesData as Case[];

export const Route = createFileRoute("/affaires")({
  head: () => ({
    meta: [
      { title: "Affaires judiciaires — Baa-tou" },
      {
        name: "description",
        content:
          "Recueil de cas réels du Barreau togolais utilisés pour entraîner Baa-tou : libertés publiques, droit pénal, droits humains.",
      },
    ],
  }),
  component: CasesPage,
});

function CasesPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Case | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return CASES;
    return CASES.filter(
      (c) =>
        c.affaire.toLowerCase().includes(q) ||
        c.personne.toLowerCase().includes(q) ||
        c.nature_litige.toLowerCase().includes(q) ||
        c.chefs_accusation.some((x) => x.toLowerCase().includes(q)) ||
        c.lois_evoquees.some((x) => x.toLowerCase().includes(q)),
    );
  }, [query]);

  if (active) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-6">
        <button
          onClick={() => setActive(null)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Retour aux affaires
        </button>
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
          {active.nature_litige}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold mt-3">{active.affaire}</h1>
        <p className="text-muted-foreground mt-1">{active.personne}</p>

        <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
          <InfoRow icon={<Calendar className="w-4 h-4" />} label="Arrestation" value={active.date_arrestation ?? "—"} />
          <InfoRow icon={<Calendar className="w-4 h-4" />} label="Jugement" value={active.date_jugement ?? "—"} />
          <InfoRow icon={<MapPin className="w-4 h-4" />} label="Juridiction" value={active.juridiction} />
          <InfoRow icon={<Gavel className="w-4 h-4" />} label="Statut" value={active.statut} />
        </div>

        <Section title="Contexte"><p>{active.contexte}</p></Section>

        <Section title="Chefs d'accusation">
          <ul className="list-disc pl-5 space-y-1">
            {active.chefs_accusation.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </Section>

        <Section title="Lois évoquées">
          <ul className="list-disc pl-5 space-y-1">
            {active.lois_evoquees.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
          {active.articles_specifiques.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              Articles : {active.articles_specifiques.join(", ")}
            </p>
          )}
        </Section>

        <Section title="Peines">
          <p><strong>Prononcée :</strong> {active.peine_prononcee}</p>
          <p><strong>Maximale légale :</strong> {active.peine_legale_maximale}</p>
        </Section>

        {active.organisations_alertees.length > 0 && (
          <Section title="Organisations alertées">
            <ul className="list-disc pl-5 space-y-1">
              {active.organisations_alertees.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </Section>
        )}

        {active.source && (
          <a
            href={active.source}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <ExternalLink className="w-4 h-4" /> Source
          </a>
        )}
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <Link to="/bibliotheque" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-3">
        <ArrowLeft className="w-4 h-4" /> Bibliothèque
      </Link>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <Gavel className="w-7 h-7 text-primary" /> Affaires judiciaires
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Cas réels issus du Barreau togolais utilisés pour le fine-tuning de Baa-tou.
          {" "}<span className="font-medium">{CASES.length} affaires</span> répertoriées.
        </p>
      </div>

      <div className="relative mb-5">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une affaire, une personne, une loi…"
          className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-border bg-card outline-none focus:border-primary text-sm"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c)}
            className="w-full text-left p-4 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                {c.nature_litige}
              </span>
              <span className="text-[10px] text-muted-foreground">{c.date_arrestation ?? c.date_jugement ?? ""}</span>
            </div>
            <h3 className="font-semibold mt-1.5 text-sm leading-snug">{c.affaire}</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{c.personne}</p>
            <p className="text-xs text-foreground/80 mt-1.5 line-clamp-2">{c.contexte}</p>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Aucun résultat pour « {query} ».
          </p>
        )}
      </div>
    </main>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 rounded-xl border border-border bg-card p-4">
      <h2 className="font-semibold text-sm text-primary mb-2">{title}</h2>
      <div className="text-sm leading-relaxed text-foreground/90 space-y-1">{children}</div>
    </section>
  );
}
