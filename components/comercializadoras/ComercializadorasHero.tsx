export default function ComercializadorasHero() {
  return (
    <section className="relative overflow-hidden mt-14">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
          Leads qualificados para{" "}
          <span className="text-[var(--color-primary)]">
            Comercializadoras de Energia
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Empresas já analisadas, elegíveis e com intenção real de migração para o
          Mercado Livre de Energia.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 text-gray-700">
          <span>✔️ Leads B2B validados</span>
          <span>✔️ Perfil energético analisado</span>
          <span>✔️ Intenção real</span>
        </div>

        <button className="mt-16 inline-flex flex-col items-center gap-2 text-[var(--color-primary)] font-medium hover:opacity-80 transition">
          Quero receber leads qualificados
          <span className="animate-bounce text-2xl">↓</span>
        </button>
      </div>
    </section>
  );
}
