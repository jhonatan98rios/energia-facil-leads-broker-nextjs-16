import { NextResponse } from "next/server";
// import { getMongoDb } from "@/lib/db/mongo";
// import { MongoLeadRepository } from "@/lib/repositories/LeadRepository";
// import { LeadService } from "@/lib/services/LeadService";
// import { LeadClassifier } from "@/lib/services/LeadClassifier";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { companyName, cnpj, averageBill, email } = body;

    if (!companyName || !cnpj || !averageBill || !email) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }

    console.log("Recebendo novo lead:", { companyName, cnpj, averageBill, email });

    return NextResponse.json({ success: true, body }, { status: 201 });
    
    


    // const db = await getMongoDb();
    // const collection = db.collection("leads") as any;

    // const repository = new MongoLeadRepository(collection);
    // const classifier = new LeadClassifier();

    // const service = new LeadService(repository, classifier);

    // const lead = await service.createLead({
    //   companyName,
    //   cnpj,
    //   averageBill: Number(averageBill),
    //   email,
    // });

    // return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar lead:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
