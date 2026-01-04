export default function LeadQualification() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-sm font-semibold text-primary text-center mb-3">
          Nosso diferencial
        </p>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Leads preparados para o time comercial
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Qualificação técnica",
            "Intenção validada",
            "Classificação por perfil",
            "Lead educado",
          ].map((title) => (
            <div
              key={title}
              className="rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 font-bold">
                ✓
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">
                Processo focado em eficiência e fechamento real de contratos.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
