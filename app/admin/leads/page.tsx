import { getMongoDb } from "@/lib/db/mongo";
import { MongoLeadRepository } from "@/lib/repositories/LeadRepository";

export default async function AdminLeadsPage() {
  const db = await getMongoDb();
  const collection = db.collection("leads") as any;

  const repository = new MongoLeadRepository(collection);
  const leads = await repository.findAll();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Admin · Leads captados
      </h1>

      <div className="overflow-x-auto bg-white border rounded">
        <table className="w-full text-sm border-collapse text-gray-900">
          <thead className="bg-gray-100 text-gray-900">
            <tr>
              <th className="border px-3 py-2 text-left">Empresa</th>
              <th className="border px-3 py-2 text-left">CNPJ</th>
              <th className="border px-3 py-2 text-left">Email</th>
              <th className="border px-3 py-2 text-left">Conta média</th>
              <th className="border px-3 py-2 text-left">Tier</th>
              <th className="border px-3 py-2 text-left">Motivo</th>
              <th className="border px-3 py-2 text-left">Criado em</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {leads.map((lead, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-3 py-2">
                  {lead.companyName}
                </td>

                <td className="border px-3 py-2">
                  {lead.cnpj}
                </td>

                <td className="border px-3 py-2">
                  {lead.email}
                </td>

                <td className="border px-3 py-2">
                  R$ {lead.averageBill.toLocaleString("pt-BR")}
                </td>

                <td className="border px-3 py-2 font-semibold">
                  {lead.tier}
                </td>

                <td className="border px-3 py-2 max-w-md">
                  {lead.classificationReason}
                </td>

                <td className="border px-3 py-2 whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {leads.length === 0 && (
          <p className="p-4 text-gray-500">
            Nenhum lead encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
