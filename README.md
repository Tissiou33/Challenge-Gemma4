# Challenge-Gemma4-
real-world challenge using Gemma 4 models


# Baa-tou — Résumé Technique

## Technologies

### Frontend
- **React 19** + **Vite** — interface utilisateur avec hot-reload en développement
- **TypeScript 5.9** — typage strict sur tout le projet
- **TailwindCSS v4** + **shadcn/ui** — design system avec composants accessibles
- **Wouter** — routeur léger (3 pages : Assistant, Bibliothèque, À propos)
- **TanStack Query** — gestion du cache et des requêtes API (invalidation automatique)
- **react-markdown + remark-gfm** — rendu du Markdown dans les réponses IA
- **jsPDF** — génération de PDF côté navigateur
- **Web Speech API** — saisie vocale (fr-FR, natif dans le navigateur)

### Backend
- **Node.js 24** + **Express 5** — serveur API REST
- **Drizzle ORM** — requêtes SQL typées, migrations, schéma déclaratif
- **Pino** — logging structuré (JSON)
- **Zod** — validation des entrées/sorties de l'API
- **esbuild** — bundler ultra-rapide pour la compilation du serveur

### IA
- **Gemini** (`gemini-3-flash-preview`) via le proxy Replit AI Integrations
- **Streaming SSE** (Server-Sent Events) — les réponses s'affichent en temps réel

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Navigateur (Client)                │
│  React + Vite (:25405)                              │
│  ├── Page Chat     → fetch SSE + TanStack Query     │
│  ├── Page Bibliothèque → données statiques          │
│  └── Page À propos → contenu statique               │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP / SSE  via proxy Replit
                       │  (routes /api/*)
┌──────────────────────▼──────────────────────────────┐
│              API Server — Express (:8080)           │
│  ├── GET    /api/gemini/conversations               │
│  ├── POST   /api/gemini/conversations               │
│  ├── GET    /api/gemini/conversations/:id           │
│  ├── PATCH  /api/gemini/conversations/:id           │
│  ├── DELETE /api/gemini/conversations/:id           │
│  └── POST   /api/gemini/conversations/:id/messages  │
│             └── stream SSE → Gemini API             │
└──────────────────────┬──────────────────────────────┘
                       │ Drizzle ORM
┌──────────────────────▼──────────────────────────────┐
│               PostgreSQL (Replit DB)                │
└─────────────────────────────────────────────────────┘
```

Le contrat API est défini en **OpenAPI** (`lib/api-spec/openapi.yaml`).
Les hooks React et les schémas Zod sont **générés automatiquement** via Orval.

---

## Base de données

### Table `conversations`
| Colonne     | Type      | Description                        |
|-------------|-----------|------------------------------------|
| `id`        | serial PK | Identifiant auto-incrémenté        |
| `title`     | text      | Titre de la consultation           |
| `createdAt` | timestamp | Date de création                   |

### Table `messages`
| Colonne          | Type       | Description                        |
|------------------|------------|------------------------------------|
| `id`             | serial PK  | Identifiant auto-incrémenté        |
| `conversationId` | integer FK | Référence vers `conversations.id`  |
| `role`           | text       | `"user"` ou `"assistant"`          |
| `content`        | text       | Contenu du message                 |
| `createdAt`      | timestamp  | Date d'envoi                       |

---

## Organisation du code (monorepo pnpm)

```
artifacts/
├── api-server/              → Serveur Express
└── baa-tou/                 → Application React
lib/
├── api-spec/                → Contrat OpenAPI (source de vérité)
├── api-client-react/        → Hooks React générés (Orval)
├── api-zod/                 → Schémas Zod générés (Orval)
├── db/                      → Schéma Drizzle + connexion PostgreSQL
└── integrations-gemini-ai/  → Wrapper SDK Gemini
```

---

## Fonctionnalités

- Chat avec réponses IA en streaming temps réel (SSE)
- Historique des conversations persisté en base de données
- Renommage des conversations (double-clic dans la barre latérale)
- Recherche dans l'historique avec surlignage des mots-clés
- Export PDF des conversations (mise en page juridique)
- Copier une réponse en un clic
- Mode sombre / clair (préférence sauvegardée localement)
- Saisie vocale (fr-FR)
- Upload de documents PDF/TXT pour analyse
- Bibliothèque des 6 codes juridiques togolais
- Page À propos (contexte du projet, groupe TESSERACT)

