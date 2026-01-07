import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/db/mongo";
import { MongoLeadRepository } from "@/lib/repositories/LeadRepository";
import { LeadService } from "@/lib/services/LeadService";
import { LeadClassifier } from "@/lib/services/LeadClassifier";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const cnpj = formData.get("cnpj") as string;
    const email = formData.get("email") as string;
    const contactName = formData.get("contactName") as string;
    const contactRole = formData.get("contactRole") as string;
    const file = formData.get("file") as File;
    const extractedDataRaw = formData.get("extractedData") as string | null;
    let extractedData: any = null;
    if (extractedDataRaw) {
      try {
        extractedData = JSON.parse(extractedDataRaw as string);
      } catch (e) {
        return NextResponse.json({ error: "extractedData JSON inválido" }, { status: 400 });
      }
    }

    if (
      !cnpj || 
      !email || 
      !extractedData || 
      !extractedData.extracted
    ) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { error: "Arquivo de conta de luz é obrigatório" },
        { status: 400 }
      );
    }

    console.log("Recebendo novo lead:", { cnpj, email, contactName, contactRole });

    if (extractedData && typeof extractedData === "object") {
      if ("extracted" in extractedData && extractedData.extracted != null) {
        extractedData = (extractedData as any).extracted;
      }
    }

    const db = await getMongoDb();
    const collection = db.collection("leads") as any;

    const repository = new MongoLeadRepository(collection);
    const classifier = new LeadClassifier();

    const service = new LeadService(repository, classifier);

    // Enriquecimento de dados
    const openCnpjData = await service.enrichWithOpenCNPJ(cnpj);

    // Nome da empresa do OpenCNPJ, valor da conta do arquivo extraído
    const companyName = openCnpjData?.razao_social || "";
    // Tenta pegar o valor da conta de luz do campo extraído (ajuste conforme seu schema)
    let averageBill = null;
    if (extractedData && typeof extractedData === "object") {
      // Tenta pegar valor total da fatura, se existir
      averageBill = extractedData.valor_total_fatura || extractedData.valor_energia || null;
    }

    const lead = await service.createLead({
      companyName,
      cnpj,
      averageBill: averageBill ? Number(averageBill) : 0,
      email,
      contactName,
      contactRole,
      extractedData: extractedData ?? null,
      openCnpjData: openCnpjData ?? null,
    });

    return NextResponse.json({ success: true, lead, extractedData, openCnpjData }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar lead:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
