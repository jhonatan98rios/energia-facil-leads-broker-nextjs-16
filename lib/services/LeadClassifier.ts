export type LeadTier = "LOW" | "MEDIUM" | "HIGH";

export interface LeadClassification {
  tier: LeadTier;
  reason: string;
}

export class LeadClassifier {
  classify(averageBill: number): LeadClassification {
    if (averageBill >= 50000) {
      return {
        tier: "HIGH",
        reason: "Alto consumo mensal de energia",
      };
    }

    if (averageBill >= 15000) {
      return {
        tier: "MEDIUM",
        reason: "Consumo médio compatível com Mercado Livre",
      };
    }

    return {
      tier: "LOW",
      reason: "Consumo abaixo do ideal para Mercado Livre",
    };
  }
}
