export const dynamic = "force-dynamic";

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
              <th className="border px-3 py-2 text-left">Distribuidora</th>
              <th className="border px-3 py-2 text-left">Nº Instalação</th>
              <th className="border px-3 py-2 text-left">CNPJ Titular</th>
              <th className="border px-3 py-2 text-left">Grupo Tarifário</th>
              <th className="border px-3 py-2 text-left">Tensão</th>
              <th className="border px-3 py-2 text-left">Tipo Ligação</th>
              <th className="border px-3 py-2 text-left">Consumo Médio (kWh)</th>
              <th className="border px-3 py-2 text-left">Consumo Últ. Mês (kWh)</th>
              <th className="border px-3 py-2 text-left">Histórico (kWh)</th>
              <th className="border px-3 py-2 text-left">Demanda Contratada (kW)</th>
              <th className="border px-3 py-2 text-left">Demanda Medida (kW)</th>
              <th className="border px-3 py-2 text-left">Valor Total (R$)</th>
              <th className="border px-3 py-2 text-left">Valor Energia (R$)</th>
              <th className="border px-3 py-2 text-left">Bandeira</th>
              <th className="border px-3 py-2 text-left">Período</th>
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

                <td className="border px-3 py-2">{lead.extractedData?.distribuidora ?? "-"}</td>
                <td className="border px-3 py-2">{lead.extractedData?.numero_instalacao ?? "-"}</td>
                <td className="border px-3 py-2">{lead.extractedData?.cnpj_titular ?? "-"}</td>
                <td className="border px-3 py-2">{lead.extractedData?.grupo_tarifario ?? "-"}</td>
                <td className="border px-3 py-2">{lead.extractedData?.tensao_fornecimento ?? "-"}</td>
                <td className="border px-3 py-2">{lead.extractedData?.tipo_ligacao ?? "-"}</td>

                <td className="border px-3 py-2">{typeof lead.extractedData?.consumo_medio_kwh === 'number' ? lead.extractedData.consumo_medio_kwh.toLocaleString('pt-BR') : "-"}</td>
                <td className="border px-3 py-2">{typeof lead.extractedData?.consumo_ultimo_mes_kwh === 'number' ? lead.extractedData.consumo_ultimo_mes_kwh.toLocaleString('pt-BR') : "-"}</td>
                <td className="border px-3 py-2">{Array.isArray(lead.extractedData?.historico_consumo_kwh) ? (lead.extractedData!.historico_consumo_kwh.join(", ")) : "-"}</td>

                <td className="border px-3 py-2">{typeof lead.extractedData?.demanda_contratada_kw === 'number' ? lead.extractedData.demanda_contratada_kw : "-"}</td>
                <td className="border px-3 py-2">{typeof lead.extractedData?.demanda_medida_kw === 'number' ? lead.extractedData.demanda_medida_kw : "-"}</td>

                <td className="border px-3 py-2">{typeof lead.extractedData?.valor_total_fatura === 'number' ? lead.extractedData.valor_total_fatura.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : "-"}</td>
                <td className="border px-3 py-2">{typeof lead.extractedData?.valor_energia === 'number' ? lead.extractedData.valor_energia.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : "-"}</td>
                <td className="border px-3 py-2">{lead.extractedData?.bandeira_tarifaria ?? "-"}</td>
                <td className="border px-3 py-2">{lead.extractedData?.periodo_referencia ?? "-"}</td>

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
