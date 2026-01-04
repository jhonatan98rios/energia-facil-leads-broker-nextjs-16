export const dynamic = "force-dynamic";

import { getMongoDb } from "@/lib/db/mongo";
import { Partner } from "@/lib/repositories/PartnerRepository";

export default async function AdminPartnersPage() {
  const db = await getMongoDb();
  const collection = db.collection<Partner>("partners");

  const partners = await collection
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <h1 className="text-2xl font-bold mb-6">
        Partners cadastrados
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse text-sm text-gray-900">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border">Empresa</th>
              <th className="p-3 border">Contato</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Perfil de cliente</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Criado em</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {partners.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-gray-500"
                >
                  Nenhum partner cadastrado
                </td>
              </tr>
            )}

            {partners.map((partner, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50"
              >
                <td className="p-3 border">
                  {partner.companyName}
                </td>

                <td className="p-3 border">
                  {partner.contactName}
                </td>

                <td className="p-3 border">
                  {partner.email}
                </td>

                <td className="p-3 border">
                  {partner.clientProfile}
                </td>

                <td className="p-3 border font-semibold">
                  {partner.status}
                </td>

                <td className="p-3 border">
                  {partner.createdAt
                    ? new Date(partner.createdAt).toLocaleString("pt-BR")
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
