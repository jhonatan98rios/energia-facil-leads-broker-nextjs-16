export default function HowItWorks() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {[
          "Você preenche a simulação",
          "Analisamos seu perfil energético",
          "Conectamos à melhor oferta"
        ].map((text, i) => (
          <div key={i} className="text-center">
            <div className="text-primary text-3xl font-bold mb-2">{i + 1}</div>
            <p className="text-gray-700">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
