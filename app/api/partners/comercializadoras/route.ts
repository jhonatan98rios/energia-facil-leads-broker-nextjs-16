import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/db/mongo";
import { MongoPartnerRepository } from "@/lib/repositories/PartnerRepository";
import { PartnerService } from "@/lib/services/PartnerService";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { companyName, contactName, email, clientProfile } = body;

    if (!companyName || !contactName || !email || !clientProfile) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }

    console.log("Recebendo nova comercializadora:", {
      companyName,
      contactName,
      email,
      clientProfile,
    });

    const db = await getMongoDb();
    const collection = db.collection("partners") as any;

    const repository = new MongoPartnerRepository(collection);
    const service = new PartnerService(repository);

    const partner = await service.createPartner({
      companyName,
      contactName,
      email,
      clientProfile,
    });

    return NextResponse.json(
      { success: true, partner },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar comercializadora:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
