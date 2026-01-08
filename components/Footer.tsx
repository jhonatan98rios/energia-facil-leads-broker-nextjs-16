export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200" aria-label="Rodapé">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-primary mb-2">
            Energia Fácil
          </h2>
          <p className="text-sm text-gray-600">
            Conectamos sua empresa ao Mercado Livre de Energia de forma simples
            e transparente.
          </p>
        </div>

        <nav aria-label="Navegação da empresa">
          <h3 className="font-semibold text-gray-800 mb-3">Empresa</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/blog">Blog</a></li>
            <li><a href="/faq">Dúvidas</a></li>
            <li><a href="/comercializadoras">Comercializadoras</a></li>
          </ul>
        </nav>

        <nav aria-label="Navegação legal">
          <h3 className="font-semibold text-gray-800 mb-3">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/privacidade">Política de Privacidade</a></li>
            <li><a href="/lgpd">LGPD</a></li>
          </ul>
        </nav>

        <address className="not-italic">
          <h3 className="font-semibold text-gray-800 mb-3">
            Fale conosco
          </h3>
          <p className="text-sm text-gray-600">
            <a href="mailto:contato@energiafacil.com.br">contato@energiafacil.com.br</a>
          </p>
        </address>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} Energia Fácil. Todos os direitos reservados.
      </div>
    </footer>
  );
}
