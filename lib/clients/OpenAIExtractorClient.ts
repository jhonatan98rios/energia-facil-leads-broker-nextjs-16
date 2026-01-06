import { convertPdfToPng } from "@/lib/utils/pdfToPng";
import { z } from "zod";

export interface ILLMClient {
  extractFromFile(file: File, prompt: string): Promise<ExtractedBill>;
}

export class OpenAIExtractorClient implements ILLMClient {
  private apiKey: string | undefined;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY;
  }

  async extractFromFile(file: File, prompt: string) {
    if (!this.apiKey) {
      // Return simulated response when no API key provided
      const simulated = {
        distribuidora: "Empresa Exemplo",
        numero_instalacao: null,
        cnpj_titular: null,
        grupo_tarifario: null,
        tensao_fornecimento: null,
        tipo_ligacao: null,

        consumo_medio_kwh: null,
        consumo_ultimo_mes_kwh: null,
        historico_consumo_kwh: null,

        demanda_contratada_kw: null,
        demanda_medida_kw: null,

        valor_total_fatura: 1234.56,
        valor_energia: null,
        bandeira_tarifaria: null,

        periodo_referencia: null,
      };

      const validated = OpenAIExtractorClient.schema.safeParse(simulated);
      if (!validated.success) {
        throw new Error("Simulated extractor produced invalid data");
      }

      return validated.data;
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

    // Validate extracted payload with Zod schema before returning
    const validation = OpenAIExtractorClient.schema.safeParse(extracted);
    if (!validation.success) {
      // Attach parsing errors to thrown error to help debugging
      const err = new Error("Extração inválida: formato diferente do esperado");
      // @ts-ignore - attach details for debugging/logging
      err.details = validation.error.format();
      throw err;
    }

    return validation.data;
  }

  // Zod schema describing the expected extraction result
  static schema = z.object({
    distribuidora: z.string().nullable(),
    numero_instalacao: z.string().nullable(),
    cnpj_titular: z.string().nullable(),
    grupo_tarifario: z.union([z.literal("A"), z.literal("B")]).nullable(),
    tensao_fornecimento: z.string().nullable(),
    tipo_ligacao: z.union([
      z.literal("MONOFASICA"),
      z.literal("BIFASICA"),
      z.literal("TRIFASICA"),
    ]).nullable(),

    consumo_medio_kwh: z.number().nullable(),
    consumo_ultimo_mes_kwh: z.number().nullable(),
    historico_consumo_kwh: z.array(z.number()).nullable(),

    demanda_contratada_kw: z.number().nullable(),
    demanda_medida_kw: z.number().nullable(),

    valor_total_fatura: z.number().nullable(),
    valor_energia: z.number().nullable(),
    bandeira_tarifaria: z.string().nullable(),

    periodo_referencia: z.string().nullable(),
  });
}

// Export a TypeScript type for the validated extracted bill structure
export type ExtractedBill = z.infer<typeof OpenAIExtractorClient.schema>;
