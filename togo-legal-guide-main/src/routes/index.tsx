import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Send, Mic, MicOff, Paperclip, Sparkles, FileText, Loader2, X,
} from "lucide-react";
import { extractTextFromFile } from "@/lib/extract-pdf";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Assistant juridique — Baa-tou" },
      { name: "description", content: "Posez vos questions sur le droit togolais, analysez un document, ou utilisez la voix." },
    ],
  }),
  component: ChatPage,
});

const SUGGESTIONS = [
  "Quelles sont mes obligations en cas de licenciement ?",
  "Comment immatriculer un terrain au Togo ?",
  "Quelles sont les peines pour vol aggravé ?",
  "Procédure de divorce par consentement mutuel",
];

function ChatPage() {
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const [attachedDoc, setAttachedDoc] = useState<{ name: string; text: string } | null>(null);
  const [extracting, setExtracting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (e) => toast.error(e.message || "Erreur du serveur"),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;

    let finalText = content;
    if (attachedDoc) {
      finalText = `J'ai joint le document **${attachedDoc.name}**. Analyse son contenu juridique (contexte, codes concernés, risques, recommandations) :\n\n---\n${attachedDoc.text.slice(0, 12000)}\n---\n\nMa question : ${content}`;
    }
    setInput("");
    setAttachedDoc(null);
    await sendMessage({ text: finalText });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setExtracting(true);
    try {
      const text = await extractTextFromFile(file);
      if (!text.trim()) throw new Error("Aucun texte trouvé dans le document.");
      setAttachedDoc({ name: file.name, text });
      toast.success(`Document chargé : ${file.name}`);
      if (!input) setInput("Analyse ce document juridiquement.");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setExtracting(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const toggleRecord = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      toast.error("Reconnaissance vocale non supportée par votre navigateur.");
      return;
    }
    if (recording) {
      recognitionRef.current?.stop();
      setRecording(false);
      return;
    }
    const recog = new SR();
    recog.lang = "fr-FR";
    recog.interimResults = true;
    recog.continuous = false;
    let finalText = "";
    recog.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalText += t;
        else interim += t;
      }
      setInput(finalText + interim);
    };
    recog.onerror = (e: any) => {
      toast.error("Erreur micro : " + e.error);
      setRecording(false);
    };
    recog.onend = () => setRecording(false);
    recognitionRef.current = recog;
    recog.start();
    setRecording(true);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-6 flex flex-col" style={{ minHeight: "calc(100vh - 140px)" }}>
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
          <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground grid place-items-center mb-4 shadow-lg">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Assistant juridique <span className="text-primary">togolais</span>
          </h1>
          <p className="text-muted-foreground max-w-md mb-8">
            Posez votre question, parlez au micro, ou téléchargez un document à analyser.
          </p>
          <div className="grid sm:grid-cols-2 gap-2 w-full max-w-xl">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="text-left text-sm p-3 rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pb-4">
          {messages.map((m) => (
            <MessageBubble key={m.id} role={m.role} parts={m.parts} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Baa-tou réfléchit…
            </div>
          )}
        </div>
      )}

      <div className="sticky bottom-2 mt-2">
        {attachedDoc && (
          <div className="flex items-center gap-2 mb-2 px-3 py-2 rounded-lg bg-accent/30 border border-accent text-sm">
            <FileText className="w-4 h-4 text-primary" />
            <span className="flex-1 truncate font-medium">{attachedDoc.name}</span>
            <button onClick={() => setAttachedDoc(null)} className="hover:bg-background rounded p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-end gap-2 p-2 rounded-2xl border-2 border-border bg-card shadow-sm focus-within:border-primary transition-colors"
        >
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.txt,application/pdf,text/plain"
            onChange={handleFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={extracting}
            title="Joindre un document (PDF/TXT)"
            className="p-2 rounded-lg hover:bg-muted disabled:opacity-50"
          >
            {extracting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Paperclip className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={toggleRecord}
            title={recording ? "Arrêter" : "Parler"}
            className={`p-2 rounded-lg transition-colors ${recording ? "bg-destructive text-destructive-foreground animate-pulse" : "hover:bg-muted"}`}
          >
            {recording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={recording ? "Parlez maintenant…" : "Posez votre question juridique…"}
            rows={1}
            className="flex-1 resize-none bg-transparent outline-none px-2 py-2 text-sm max-h-32"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </main>
  );
}

function MessageBubble({ role, parts }: { role: string; parts: any[] }) {
  const text = parts.map((p) => (p.type === "text" ? p.text : "")).join("");
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-card border border-border rounded-bl-sm"
        }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap">{text}</div>
        ) : (
          <div className="prose-chat">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
