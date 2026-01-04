import { LeadRepository, CreateLeadDTO, Lead } from "@/lib/repositories/LeadRepository";
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
}
