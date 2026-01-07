"use client";

export default function PrivacyPolicy() {
  return (
    <main className="bg-neutral-100 min-h-screen mt-14">
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 pt-20 pb-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Política de Privacidade
          </h1>
          <p className="text-gray-600 text-lg mb-12">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                1. Introdução
              </h2>
              <p>
                A Energia Fácil ("nós", "nosso" ou "nossa") opera a plataforma
                Energia Fácil. Esta página informa você sobre nossas práticas de
                privacidade em relação à coleta, uso e divulgação de dados
                pessoais quando você utiliza nosso site e serviços.
              </p>
              <p>
                Somos uma plataforma de intermediação que conecta empresas
                interessadas em migrar para o Mercado Livre de Energia com
                empresas comercializadoras de energia. Fornecemos conteúdo,
                treinamento e assessoria sobre o mercado de energia, além de
                coletar e processar leads qualificados.
              </p>
            </section>

            {/* Data Collection */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                2. Dados que Coletamos
              </h2>
              <p>Coletamos as seguintes categorias de dados:</p>
              <ul className="list-disc list-inside space-y-3 ml-4">
                <li>
                  <strong>Informações de Contato:</strong> nome, e-mail, telefone
                  e endereço da sua empresa
                </li>
                <li>
                  <strong>Dados da Conta de Luz:</strong> consumo energético,
                  despesas com energia e histórico de consumo
                </li>
                <li>
                  <strong>Dados Públicos do CNPJ:</strong> razão social, setor de
                  atividade, porte da empresa e informações cadastrais públicas
                </li>
                <li>
                  <strong>Informações Técnicas:</strong> IP, tipo de navegador e
                  dados de interação com nosso site
                </li>
              </ul>
            </section>

            {/* Data Usage */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                3. Como Utilizamos Seus Dados
              </h2>
              <p>Utilizamos os dados coletados para:</p>
              <ul className="list-disc list-inside space-y-3 ml-4">
                <li>
                  Processar sua simulação e análise de viabilidade de migração
                </li>
                <li>
                  Criar um perfil energético enriquecido da sua empresa
                </li>
                <li>
                  Melhorar nossos serviços e conteúdo educativo sobre o mercado
                  de energia
                </li>
                <li>Comunicar-nos com você sobre nossos serviços</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>
            </section>

            {/* Data Commercialization */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                4. Comercialização de Dados
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <p className="font-semibold text-blue-900 mb-3">
                  ⚠️ Informação Importante
                </p>
                <p>
                  Seus dados enriquecidos <strong>serão comercializados</strong>{" "}
                  com empresas comercializadoras de energia credenciadas. Este é
                  nosso principal modelo de negócio.
                </p>
              </div>
              <p>
                Após processar sua simulação, enriquecemos seus dados com
                informações públicas do CNPJ, dados de consumo energético e
                análise de viabilidade de migração. Estes dados consolidados são
                então:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 my-4">
                <li>
                  <strong>Vendidos em varejo:</strong> comercializadoras
                  individuais adquirem leads específicos de seu interesse
                </li>
                <li>
                  <strong>Vendidos em pacote:</strong> conjuntos de leads são
                  comercializados a empresas parceiras
                </li>
                <li>
                  <strong>Utilizados para analytics:</strong> agregamos dados
                  para criar relatórios de mercado e insights
                </li>
              </ul>
              <p>
                Ao fornecer seus dados, você concorda expressamente com a
                comercialização destes dados com empresas comercializadoras de
                energia do Mercado Livre.
              </p>
            </section>

            {/* Third Parties */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                5. Compartilhamento com Terceiros
              </h2>
              <p>
                Compartilhamos seus dados com:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 my-4">
                <li>
                  <strong>Empresas Comercializadoras de Energia:</strong> para
                  fins comerciais de oferta de energia
                </li>
                <li>
                  <strong>Fornecedores de Dados Públicos:</strong> para validação
                  e enriquecimento de informações cadastrais
                </li>
                <li>
                  <strong>Prestadores de Serviços:</strong> plataformas de
                  análise e processamento de dados
                </li>
              </ul>
              <p className="mt-4">
                Exigimos que todos os terceiros mantenham a confidencialidade e
                segurança de seus dados e os utilizem apenas para os fins
                especificados.
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                6. Segurança de Dados
              </h2>
              <p>
                Implementamos medidas técnicas e organizacionais adequadas para
                proteger seus dados contra acesso não autorizado, alteração,
                divulgação ou destruição. Utilizamos encriptação e sistemas de
                segurança de padrão industrial.
              </p>
              <p className="mt-4">
                No entanto, nenhum método de transmissão pela internet ou
                armazenamento eletrônico é completamente seguro, então não
                podemos garantir segurança absoluta.
              </p>
            </section>

            {/* User Rights */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                7. Seus Direitos
              </h2>
              <p>
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem
                direito a:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 my-4">
                <li>
                  <strong>Acesso:</strong> solicitar cópia dos dados que
                  coletamos sobre você
                </li>
                <li>
                  <strong>Correção:</strong> solicitar correção de dados
                  incorretos
                </li>
                <li>
                  <strong>Exclusão:</strong> solicitar a exclusão de seus dados
                  (limitado pelas obrigações legais)
                </li>
                <li>
                  <strong>Portabilidade:</strong> receber seus dados em formato
                  estruturado
                </li>
                <li>
                  <strong>Revogação de Consentimento:</strong> retirar seu
                  consentimento a qualquer momento
                </li>
              </ul>
              <p className="mt-4">
                Para exercer estes direitos, entre em contato conosco através do
                e-mail fornecido na seção de contato abaixo.
              </p>
            </section>

            {/* Retention */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                8. Retenção de Dados
              </h2>
              <p>
                Retemos seus dados enquanto forem necessários para o
                cumprimento de nossas obrigações legais e comerciais, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 my-4">
                <li>Mientras necessário para fornecer nossos serviços</li>
                <li>Para fins comerciais de comercialização de leads</li>
                <li>De acordo com requisitos regulatórios e legais</li>
              </ul>
              <p className="mt-4">
                Após este período, deletaremos ou anonimizaremos seus dados, a
                menos que tenhamos obrigação legal de reter.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                9. Cookies
              </h2>
              <p>
                Utilizamos cookies para melhorar sua experiência em nosso site,
                analisar o uso e personalizar o conteúdo. Você pode controlar
                as configurações de cookies em seu navegador.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                10. Alterações na Política
              </h2>
              <p>
                Podemos atualizar esta política de privacidade periodicamente.
                Notificaremos você sobre mudanças materiais e sua continuação
                no uso de nossos serviços constitui aceitação das mudanças.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                11. Contato
              </h2>
              <p>
                Se tiver dúvidas sobre esta política de privacidade ou sobre
                como tratamos seus dados, entre em contato conosco em:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4 space-y-2">
                <p>
                  <strong>Email:</strong> privacidade@energiafacil.com.br
                </p>
                <p>
                  <strong>Empresa:</strong> Energia Fácil
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
