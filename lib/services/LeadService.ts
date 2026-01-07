import { LeadRepository, CreateLeadDTO, Lead } from "@/lib/repositories/LeadRepository";
import { formatOpenCNPJData } from "../utils/openCNPJEnrichment";
import { LeadClassifier } from "./LeadClassifier";

export class LeadService {
  constructor(
    private readonly repository: LeadRepository,
    private readonly classifier: LeadClassifier
  ) {}

  async createLead(input: CreateLeadDTO): Promise<Lead> {
    const classification = this.classifier.classify(input.averageBill);

    const lead: Lead = {
      ...input,
      tier: classification.tier,
      classificationReason: classification.reason,
      createdAt: new Date(),
    };

    return this.repository.create(lead);
  }

  async enrichWithOpenCNPJ(cnpj: string) {
    try {
      const cleanCnpj = cnpj.replace(/\D/g, "");
      const url = `https://api.opencnpj.org/${cleanCnpj}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao buscar dados do OpenCNPJ");
      const rawCnpjData = await res.json();
      const openCnpjData = formatOpenCNPJData(rawCnpjData);
      console.log("[OpenCNPJ] Dados enriquecidos:", openCnpjData);
      return openCnpjData;
    } catch (err) {
      console.warn("[OpenCNPJ] Falha ao enriquecer lead:", err);
      return null;
    }
  }
}
