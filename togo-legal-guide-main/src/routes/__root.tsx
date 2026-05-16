import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  Link,
  useRouter,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { AppHeader } from "@/components/AppHeader";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Page introuvable.</p>
        <Link to="/" className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Une erreur est survenue</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Baa-tou — Assistant juridique du droit togolais" },
      { name: "description", content: "Assistant IA pour le droit togolais : analyse de documents, questions vocales et bibliothèque juridique (Constitution, Code Pénal, Foncier, Travail)." },
      { name: "theme-color", content: "#118B32" },
      { property: "og:title", content: "Baa-tou — Assistant juridique du droit togolais" },
      { property: "og:description", content: "Assistant IA pour le droit togolais : analyse de documents, questions vocales et bibliothèque juridique (Constitution, Code Pénal, Foncier, Travail)." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Baa-tou — Assistant juridique du droit togolais" },
      { name: "twitter:description", content: "Assistant IA pour le droit togolais : analyse de documents, questions vocales et bibliothèque juridique (Constitution, Code Pénal, Foncier, Travail)." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/311203fb-8cc8-4851-9d23-5370f8c1744b" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/311203fb-8cc8-4851-9d23-5370f8c1744b" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen togo-gradient-soft">
        <AppHeader />
        <Outlet />
        <footer className="border-t border-border mt-12 py-6 text-center text-xs text-muted-foreground">
          <div className="togo-flag-bar h-1 w-24 mx-auto mb-3 rounded-full" />
          Baa-tou · Information juridique — ne remplace pas un avocat.
        </footer>
        <Toaster position="top-center" />
      </div>
    </QueryClientProvider>
  );
}
