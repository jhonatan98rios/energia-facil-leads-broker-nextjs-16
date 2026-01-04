export default function MarketProblem() {
  const problems = [
    {
      title: "Lead frio e desqualificado",
      description:
        "Empresas curiosas, fora do perfil regulatório ou sem maturidade para migrar."
    },
    {
      title: "Custo comercial elevado",
      description:
        "Times gastam tempo e energia em reuniões que não evoluem para contrato."
    },
    {
      title: "Baixa previsibilidade",
      description:
        "Pipeline instável dificulta projeções e crescimento sustentável."
    },
    {
      title: "Falta de educação do lead",
      description:
        "O contato não entende o Mercado Livre e exige esforço excessivo de explicação."
    }
  ];

  return (
    <section className="relative bg-white py-20">
      {/* glow decorativo (mais sutil que o benefits) */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-100 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <p className="text-sm font-semibold text-primary text-center mb-3">
          O cenário atual
        </p>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Os desafios da aquisição no Mercado Livre
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="rounded-xl p-6 transition-all duration-300 bg-gray-50 shadow-sm hover:shadow-md"
            >
              {/* ícone simples (negação implícita, sem agressividade) */}
              <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mb-4 font-bold">
                ✕
              </div>

              <h3 className="font-semibold text-gray-800 mb-2">
                {problem.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
