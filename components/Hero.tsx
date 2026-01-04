"use client";

export default function Hero() {
  const scrollToBenefits = () => {
    const el = document.getElementById("benefits");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden mt-14">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-transparent" />

      {/* Glow */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[var(--color-primary)]/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Sua empresa pode estar pagando{" "}
          <span className="text-[var(--color-primary)]">
            energia mais cara
          </span>{" "}
          do que deveria
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Descubra se você pode economizar até{" "}
          <strong>30%</strong> migrando para o{" "}
          <strong>Mercado Livre de Energia</strong> — sem investimento inicial.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 text-gray-700">
          <span>✔️ Economia previsível</span>
          <span>✔️ Energia limpa</span>
          <span>✔️ Processo simples</span>
        </div>

        {/* CTA */}
        <button
          onClick={scrollToBenefits}
          className="mt-16 inline-flex flex-col items-center gap-2 text-[var(--color-primary)] font-medium hover:opacity-80 transition"
        >
          Descobrir se posso economizar
          <span className="animate-bounce text-2xl">↓</span>
        </button>
      </div>
    </section>
  );
}
