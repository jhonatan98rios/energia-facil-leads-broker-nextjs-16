export default function Benefits() {
  const benefits = [
    {
      title: "Sem investimento inicial",
      description:
        "A migração para o Mercado Livre não exige obras ou troca de equipamentos."
    },
    {
      title: "Economia previsível",
      description:
        "Contratos com preço definido evitam surpresas na conta de energia.",
    },
    {
      title: "Energia limpa",
      description:
        "Tenha acesso a fontes renováveis como solar e eólica.",
    },
    {
      title: "Processo simples",
      description:
        "Nós cuidamos da análise e conectamos você às melhores ofertas.",
    },
  ];

  return (
    <section
      id="benefits"
      className="relative bg-gray-50 py-20"
    >
      {/* glow decorativo */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <p className="text-sm font-semibold text-primary text-center mb-3">
          Por que empresas estão migrando
        </p>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Vantagens do Mercado Livre de Energia
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 transition-all duration-300 bg-white shadow-sm hover:shadow-md`}
            >
              {/* ícone simples */}
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 font-bold">
                ✓
              </div>

              <h3 className="font-semibold text-gray-800 mb-2">
                {benefit.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
