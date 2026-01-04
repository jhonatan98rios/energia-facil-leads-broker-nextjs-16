import { Collection } from "mongodb";

export type PartnerStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface CreatePartnerDTO {
  companyName: string;
  contactName: string;
  email: string;
  clientProfile: string;
}

export interface Partner {
  companyName: string;
  contactName: string;
  email: string;
  clientProfile: string;

  status: PartnerStatus;

  createdAt: Date;
}

export interface PartnerRepository {
  create(data: Partner): Promise<Partner>;
}

export class MongoPartnerRepository implements PartnerRepository {
  constructor(private readonly collection: Collection<Partner>) {}

  async create(data: Partner): Promise<Partner> {
    await this.collection.insertOne(data);
    return data;
  }
}
