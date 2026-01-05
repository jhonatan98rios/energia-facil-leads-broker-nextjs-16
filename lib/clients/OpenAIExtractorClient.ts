import { convertPdfToPng } from "@/lib/utils/pdfToPng";

export interface ILLMClient {
  extractFromFile(file: File, prompt: string): Promise<any>;
}

export class OpenAIExtractorClient implements ILLMClient {
  private apiKey: string | undefined;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY;
  }

  async extractFromFile(file: File, prompt: string) {
    if (!this.apiKey) {
      // Return simulated response when no API key provided
      return {
        simulated: true,
        prompt,
        file: { name: file.name, size: file.size, type: file.type },
        extracted: {
          supplier: "Empresa Exemplo",
          dueDate: "2026-01-15",
          amount: "R$ 1.234,56",
        },
      };
    }

    // If PDF, delegate conversion (including any streaming fallback) to util
    let mime = file.type || "application/octet-stream";
    let buffer: Buffer;

    if (mime === "application/pdf") {
      try {
        const converted = await convertPdfToPng(file);
        // If conversion produced an image, use the image flow
        if (converted.pngBuffer) {
          buffer = converted.pngBuffer as Buffer;
          mime = "image/png";
          const base64 = buffer.toString("base64");

          const messages = [
            {
              role: "user",
              // Use plain text prompt then include image as data URL object where supported
              content: [
                { type: "text", text: prompt },
                { type: "image_url", image_url: { url: `data:${mime};base64,${base64}` } },
              ],
            },
          ];

          const body = { model: "gpt-4o-mini", messages, max_tokens: 1024 };

          var res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify(body),
          });
        } else if (converted.text) {
          // Fallback: use extracted PDF text and send it as text to the LLM
          const pdfText = converted.text;
          const messages = [
            { role: "user", content: `${prompt}\n\nTexto extraído do PDF:\n${pdfText}` },
          ];

          const body = { model: "gpt-4o-mini", messages, max_tokens: 1024 };

          var res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify(body),
          });
        } else {
          throw new Error("Conversão de PDF retornou formato desconhecido");
        }
      } catch (err: any) {
        throw new Error(`Erro ao converter/analisar PDF: ${err.message}`);
      }
    } else {
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);

      const base64 = buffer.toString("base64");

      const messages = [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: `data:${mime};base64,${base64}` } },
          ],
        },
      ];

      const body = { model: "gpt-4o-mini", messages, max_tokens: 1024 };

      var res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(body),
      });
    }

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "OpenAI error");
    }

    const json = await res.json();

    // Parse the response and extract only the data
    const content = json.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("Nenhum conteúdo extraído da resposta da OpenAI");
    }

    // Remove markdown code blocks if present
    const jsonString = (typeof content === "string" ? content : JSON.stringify(content))
      .replace(/^```json\n?/, "")
      .replace(/\n?```$/, "")
      .trim();

    // Parse the JSON
    const extracted = JSON.parse(jsonString);

    return extracted;
  }
}
