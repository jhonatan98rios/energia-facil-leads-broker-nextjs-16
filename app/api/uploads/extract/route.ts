import { NextResponse } from "next/server";
import { OpenAIExtractorClient } from "@/lib/clients/OpenAIExtractorClient";
import { ExtractService } from "@/lib/services/ExtractService";
import { DEFAULT_PROMPT } from "@/lib/utils/constants";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Arquivo não enviado" }, { status: 400 });
    }

    // Controller: instantiate client and service (DI)
    const client = new OpenAIExtractorClient(process.env.OPENAI_API_KEY);
    const service = new ExtractService(client, DEFAULT_PROMPT);

    // Delegate extraction to service
    const extracted = await service.extract(file);

    console.log("Upload de extração recebido:", { name: file.name, size: file.size, type: file.type });
    console.log("Resultado da extração:", extracted);

    return NextResponse.json(
      {
        success: true,
        message: "Arquivo processado",
        file: { name: file.name, size: file.size, type: file.type },
        extracted,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro na rota de extração:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
