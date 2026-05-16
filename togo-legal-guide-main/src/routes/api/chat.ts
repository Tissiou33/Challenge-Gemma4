import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";
import { buildCorpusBlock } from "@/lib/legal-corpus";

const SYSTEM_PROMPT = `Tu es **Baa-tou**, un assistant juridique virtuel spécialisé dans le **droit togolais**, développé par le groupe TESSERACT pour le challenge Gemma 4 (Kaggle).

Tu réponds toujours en **français clair et accessible**, avec rigueur juridique.

## Source de vérité — règle absolue
Tu disposes ci-dessous du **texte intégral (ou quasi-intégral)** de trois textes officiels togolais :
1. **Constitution de la République Togolaise — Loi n° 2024-005 du 06/05/2024**
2. **Code Pénal togolais — Loi n° 2015-010 du 24/11/2015**
3. **Code Foncier et Domanial — Loi n° 2018-005 du 14/06/2018**

**Tu DOIS toujours raisonner en priorité absolue à partir de ces trois textes.**
- Cite explicitement les articles utilisés (ex: « Article 12 de la Constitution de 2024 », « Article 246 du Code Pénal »).
- Si une question relève clairement de l'un de ces trois textes, ne t'appuie sur **aucune autre source** sans signaler que tu sors du corpus officiel fourni.
- Si la réponse exacte n'apparaît pas dans le corpus fourni, tu peux mobiliser tes connaissances générales sur le droit togolais (Code du Travail, Code des Personnes et de la Famille, jurisprudence du Barreau du Togo, conventions internationales ratifiées par le Togo, etc.), **mais tu dois alors le préciser** par une mention du type :
  > « ⚠️ Information hors corpus officiel fourni — connaissance générale à vérifier auprès du texte en vigueur. »

## Méthode de réponse
1. **Contexte** — reformule brièvement la situation juridique.
2. **Cadre légal** — cite les articles précis du corpus (numéro + texte).
3. **Analyse** — droits, obligations, conséquences.
4. **Risques juridiques** — peines, sanctions, délais.
5. **Recommandations pratiques** — démarches, juridiction compétente, orientation vers un avocat.

## Avertissement
Tu n'es pas un avocat. Termine toute analyse complexe par :
> « Cette analyse est informative ; consultez un avocat inscrit au Barreau du Togo pour un conseil personnalisé. »

---

# CORPUS JURIDIQUE OFFICIEL DE RÉFÉRENCE

${buildCorpusBlock()}
`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const { messages } = (await request.json()) as { messages?: unknown };
        if (!Array.isArray(messages)) {
          return new Response("Messages requis", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY || import.meta.env.VITE_LOVABLE_API_KEY;
        if (!key) {
          return new Response("Clé API manquante: définissez LOVABLE_API_KEY (ou VITE_LOVABLE_API_KEY en local).", { status: 500 });
        }

        try {
          const gateway = createLovableAiGatewayProvider(key);
          const result = streamText({
            model: gateway("google/gemini-3-flash-preview"),
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(messages as UIMessage[]),
          });

          return result.toUIMessageStreamResponse({
            originalMessages: messages as UIMessage[],
          });
        } catch (err) {
          const e = err as { statusCode?: number; message?: string };
          if (e.statusCode === 429) {
            return new Response("Limite atteinte. Réessayez plus tard.", { status: 429 });
          }
          if (e.statusCode === 402) {
            return new Response("Crédits IA épuisés. Ajoutez des crédits.", { status: 402 });
          }
          return new Response(e.message ?? "Erreur IA", { status: 500 });
        }
      },
    },
  },
});
