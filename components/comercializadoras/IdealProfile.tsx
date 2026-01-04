export default function IdealProfile() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Ideal para
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li>✔️ Comercializadoras focadas em eficiência</li>
            <li>✔️ Times comerciais enxutos</li>
            <li>✔️ Estratégia de longo prazo</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Não indicado para
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li>✕ Busca apenas volume</li>
            <li>✕ Leads sem filtro</li>
            <li>✕ Vendas exclusivamente por preço</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
