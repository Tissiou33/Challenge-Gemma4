async function loadPdfJs() {
  if (typeof window === "undefined") {
    throw new Error("L'extraction PDF est disponible uniquement côté navigateur.");
  }

  const [pdfjsLib, workerModule] = await Promise.all([
    import("pdfjs-dist"),
    // @ts-ignore - worker URL import handled by Vite
    import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
  ]);

  pdfjsLib.GlobalWorkerOptions.workerSrc = workerModule.default;
  return pdfjsLib;
}

export async function extractTextFromFile(file: File): Promise<string> {
  if (file.type === "text/plain" || file.name.endsWith(".txt")) {
    return await file.text();
  }
  if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
    const pdfjsLib = await loadPdfJs();
    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    let fullText = "";
    const maxPages = Math.min(pdf.numPages, 30);
    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items
        .map((item) => ("str" in item ? (item as { str: string }).str : ""))
        .join(" ");
      fullText += `\n\n--- Page ${i} ---\n${text}`;
    }
    if (pdf.numPages > maxPages) {
      fullText += `\n\n[Document tronqué — ${pdf.numPages - maxPages} page(s) supplémentaire(s) non analysée(s)]`;
    }
    return fullText.trim();
  }
  throw new Error("Format non supporté. Utilisez PDF ou TXT.");
}
