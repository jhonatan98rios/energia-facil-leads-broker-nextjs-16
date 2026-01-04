import {
  CreatePartnerDTO,
  Partner,
  PartnerRepository,
} from "@/lib/repositories/PartnerRepository";

export class PartnerService {
  constructor(private readonly repository: PartnerRepository) {}

  async createPartner(data: CreatePartnerDTO): Promise<Partner> {
    const partner: Partner = {
      companyName: data.companyName,
      contactName: data.contactName,
      email: data.email,
      clientProfile: data.clientProfile,

      status: "PENDING",
      createdAt: new Date(),
    };

    return this.repository.create(partner);
  }
}
