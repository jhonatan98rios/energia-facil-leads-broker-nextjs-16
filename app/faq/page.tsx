import FAQAccordion from '@/components/faq/FAQAccordion'
import { faqItems } from './data'


export default function FAQPage() {
  // Generate JSON-LD for FAQPage
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
  };

  return (
    <section className="relative overflow-hidden bg-neutral-100 min-h-screen mt-14">
      {/* JSON-LD structured data for FAQ rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-transparent" />

      {/* Glow */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[var(--color-primary)]/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <header className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Dúvidas frequentes
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo o que você precisa saber sobre economia de energia e Mercado Livre.
          </p>
        </header>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <FAQAccordion key={index} question={item.question}>
              {item.answer}
            </FAQAccordion>
          ))}
        </div>
      </div>
    </section>
  )
}