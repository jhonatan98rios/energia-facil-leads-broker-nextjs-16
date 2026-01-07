import { Collection } from "mongodb";
import type { ExtractedBill } from "@/lib/clients/OpenAIExtractorClient";


export interface CreateLeadDTO {
  companyName: string;
  cnpj: string;
  averageBill: number;
  email: string;
  contactName: string;
  contactRole: string;
  extractedData?: ExtractedBill | null;
  openCnpjData?: any | null;
}


export interface Lead {
  companyName: string;
  cnpj: string;
  averageBill: number;
  email: string;
  contactName: string;
  contactRole: string;
  extractedData?: ExtractedBill | null;
  openCnpjData?: any | null;

  tier: "LOW" | "MEDIUM" | "HIGH";
  classificationReason: string;

  createdAt: Date;
}

export interface LeadRepository {
  create(data: Lead): Promise<Lead>;
  findAll(): Promise<Lead[]>;
}

export class MongoLeadRepository implements LeadRepository {
  constructor(private readonly collection: Collection<Lead>) {}

  async create(data: Lead): Promise<Lead> {
    await this.collection.insertOne(data);
    return data;
  }

  async findAll(): Promise<Lead[]> {
    return this.collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
  }
}
