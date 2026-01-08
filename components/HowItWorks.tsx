const steps = [
  {
    title: "Você preenche a simulação",
    desc: "Envie seus dados e anexe a conta de luz em poucos minutos.",
  },
  {
    title: "Analisamos seu perfil energético",
    desc: "Especialistas avaliam seu consumo e identificam oportunidades de economia.",
  },
  {
    title: "Conectamos à melhor oferta",
    desc: "Receba propostas personalizadas das melhores comercializadoras do mercado.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-32" aria-labelledby="how-it-works-title">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 id="how-it-works-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Como funciona
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Veja como é simples economizar com o Mercado Livre de Energia:
          </p>
        </div>

        <ol className="relative flex flex-col md:flex-row items-center md:justify-between gap-12 md:gap-0">
          {steps.map((step, i) => (
            <li key={i} className="flex flex-col items-center text-center flex-1 relative">
              <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-primary)] text-white text-2xl font-bold shadow-lg mb-4">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-gray-600 text-sm max-w-xs">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
