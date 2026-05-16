// Corpus juridique togolais de référence pour Baa-tou.
// Les textes intégraux sont chargés depuis les fichiers .md (extraits
// des documents officiels uploadés par l'équipe TESSERACT).
import constitutionRaw from "./constitution-2024.md?raw";
import codePenalRaw from "./code-penal-2015.md?raw";
import codeFoncierRaw from "./code-foncier-2018.md?raw";

// Limite par document pour rester sous la fenêtre de contexte du modèle
// tout en couvrant l'essentiel des articles. Gemini 3 Flash supporte
// largement ces volumes (~30k tokens au total ici).
const MAX_PER_DOC = 45_000;

function clean(raw: string): string {
  return raw
    // supprime les images et liens parsed-documents
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/`parsed-documents:\/\/[^`]+`/g, "")
    // supprime les en-têtes de pagination du Journal Officiel
    .replace(/JOURNAL OFFICIEL DE LA REPUBLIQUE TOGOLAISE/gi, "")
    .replace(/^## Page \d+\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max) + "\n\n[...extrait tronqué — texte intégral disponible dans la base de Baa-tou]";
}

export const LEGAL_CORPUS = {
  constitution: {
    title: "Constitution togolaise — Loi n° 2024-005 du 06/05/2024",
    content: truncate(clean(constitutionRaw), MAX_PER_DOC),
  },
  codePenal: {
    title: "Code Pénal togolais — Loi n° 2015-010 du 24/11/2015",
    content: truncate(clean(codePenalRaw), MAX_PER_DOC),
  },
  codeFoncier: {
    title: "Code Foncier et Domanial — Loi n° 2018-005 du 14/06/2018",
    content: truncate(clean(codeFoncierRaw), MAX_PER_DOC),
  },
} as const;

export function buildCorpusBlock(): string {
  return Object.values(LEGAL_CORPUS)
    .map(
      (doc) =>
        `===== DOCUMENT DE RÉFÉRENCE : ${doc.title} =====\n${doc.content}\n===== FIN DU DOCUMENT =====`,
    )
    .join("\n\n");
}
