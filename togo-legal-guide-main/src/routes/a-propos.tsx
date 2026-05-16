import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale, Sparkles, Database, Users, Trophy, BookOpen } from "lucide-react";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Baa-tou" },
      {
        name: "description",
        content:
          "Baa-tou (« loi » en kabiyè) est un assistant juridique togolais développé par le groupe TESSERACT pour le challenge Gemma 4 sur Kaggle.",
      },
      { property: "og:title", content: "À propos — Baa-tou" },
      { property: "og:url", content: "/a-propos" },
    ],
    links: [{ rel: "canonical", href: "/a-propos" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="togo-flag-bar h-1.5 w-24 rounded-full mb-6" />
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
        À propos de <span className="text-primary">Baa-tou</span>
      </h1>
      <p className="text-muted-foreground mb-8">
        <em>Baa-tou</em> signifie « la loi » en <strong>kabiyè</strong>, langue
        parlée dans le nord du Togo. Notre mission : rendre le droit togolais
        accessible à tous, en français clair, partout, à tout moment.
      </p>

      <section className="grid sm:grid-cols-2 gap-4 mb-10">
        <Card icon={<Trophy className="w-5 h-5" />} title="Challenge Gemma 4 — Kaggle">
          Baa-tou est développé dans le cadre du <strong>challenge Gemma 4</strong>{" "}
          lancé sur Kaggle, une compétition mondiale autour des modèles ouverts
          de Google DeepMind.
        </Card>
        <Card icon={<Users className="w-5 h-5" />} title="Groupe TESSERACT">
          Projet conçu et porté par le collectif <strong>TESSERACT</strong>,
          une équipe pluridisciplinaire passionnée par l'IA appliquée au
          droit africain.
        </Card>
        <Card icon={<Sparkles className="w-5 h-5" />} title="Modèle Gemma 4 fine-tuné">
          Le modèle a été <strong>minutieusement fine-tuné</strong> sur de
          nombreux documents juridiques togolais : Constitution de 2024,
          Code Pénal, Code Foncier et Domanial, Code du Travail, lois
          spéciales et règlements en vigueur.
        </Card>
        <Card icon={<Database className="w-5 h-5" />} title="100+ cas du Barreau togolais">
          Plus de <strong>100 cas réels</strong> issus de conflits traités par
          le Barreau togolais ont été intégrés à l'entraînement pour ancrer
          les réponses dans la pratique judiciaire locale.
        </Card>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 mb-8">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" /> Ce que Baa-tou peut faire
        </h2>
        <ul className="space-y-2 text-sm">
          <li>• Répondre à vos questions juridiques en français.</li>
          <li>• Analyser un document (PDF / TXT) que vous lui fournissez.</li>
          <li>• Recevoir vos questions à l'oral (reconnaissance vocale).</li>
          <li>• Citer les codes et articles pertinents du droit togolais.</li>
          <li>• Vous orienter vers un avocat lorsque c'est nécessaire.</li>
        </ul>
      </section>

      <section className="rounded-2xl border-2 border-dashed border-accent/60 bg-accent/10 p-5 mb-8 text-sm">
        <strong>Avertissement : </strong> Baa-tou fournit une information
        juridique à titre indicatif. Il ne remplace en aucun cas la consultation
        d'un avocat inscrit au <strong>Barreau du Togo</strong>.
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
        >
          <Scale className="w-4 h-4" /> Poser une question
        </Link>
        <Link
          to="/bibliotheque"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted"
        >
          <BookOpen className="w-4 h-4" /> Bibliothèque
        </Link>
      </div>
    </main>
  );
}

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary grid place-items-center">
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}
