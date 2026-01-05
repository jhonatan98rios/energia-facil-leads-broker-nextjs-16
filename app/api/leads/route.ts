import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/db/mongo";
import { MongoLeadRepository } from "@/lib/repositories/LeadRepository";
import { LeadService } from "@/lib/services/LeadService";
import { LeadClassifier } from "@/lib/services/LeadClassifier";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const companyName = formData.get("companyName") as string;
    const cnpj = formData.get("cnpj") as string;
    const averageBill = formData.get("averageBill") as string;
    const email = formData.get("email") as string;
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

    if (!companyName || !cnpj || !averageBill || !email) {
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

    console.log("Recebendo novo lead:", { companyName, cnpj, averageBill, email });
    
    if (file) {
      console.log("Arquivo recebido:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });
    } else {
      console.log("Nenhum arquivo foi enviado");
    } 

    if (extractedData) {
      console.log("Dados extraídos recebidos:", extractedData);
    }

    const db = await getMongoDb();
    const collection = db.collection("leads") as any;

    const repository = new MongoLeadRepository(collection);
    const classifier = new LeadClassifier();

    const service = new LeadService(repository, classifier);

    const lead = await service.createLead({
      companyName,
      cnpj,
      averageBill: Number(averageBill),
      email,
    });

    return NextResponse.json({ success: true, lead, extractedData }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar lead:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
