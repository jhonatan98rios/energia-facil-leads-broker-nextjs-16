
"use client";

export default function LGPDPage() {
	return (
		<main className="bg-neutral-100 min-h-screen mt-14">
			<section className="bg-white">
				<div className="max-w-4xl mx-auto px-6 pt-20 pb-4">
					<h1 className="text-5xl font-bold text-gray-900 mb-4">
						LGPD – Lei Geral de Proteção de Dados
					</h1>
					<p className="text-gray-600 text-lg mb-12">
						Última atualização: {new Date().toLocaleDateString("pt-BR")}
					</p>

					<div className="prose prose-lg max-w-none text-gray-700 space-y-8">
						{/* Introdução */}
						<section>
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								1. O que é a LGPD?
							</h2>
							<p>
								A Lei Geral de Proteção de Dados (LGPD) – Lei nº 13.709/2018 – regula o tratamento de dados pessoais no Brasil, garantindo direitos aos titulares e impondo obrigações às empresas quanto à coleta, uso, armazenamento e compartilhamento de dados.
							</p>
						</section>

						{/* Compromisso */}
						<section>
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								2. Nosso Compromisso com a LGPD
							</h2>
							<p>
								A Energia Fácil está comprometida com a transparência, segurança e privacidade dos dados pessoais de seus usuários, clientes e parceiros, em conformidade com a LGPD.
							</p>
						</section>

						{/* Dados tratados */}
						<section>
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								3. Quais Dados Tratamos?
							</h2>
							<ul className="list-disc list-inside space-y-3 ml-4">
								<li>Informações de contato (nome, e-mail, telefone, endereço da empresa)</li>
								<li>Dados da conta de luz (consumo, despesas, histórico)</li>
								<li>Dados públicos do CNPJ (razão social, setor, porte, informações cadastrais)</li>
								<li>Informações técnicas (IP, navegador, interações no site)</li>
							</ul>
						</section>

						{/* Finalidades do tratamento */}
						<section>
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								4. Para que Utilizamos seus Dados?
							</h2>
							<ul className="list-disc list-inside space-y-3 ml-4">
								<li>Processar simulações e análises de viabilidade</li>
								<li>Criar perfis energéticos enriquecidos</li>
								<li>Melhorar nossos serviços e conteúdos</li>
								<li>Comunicar sobre nossos serviços</li>
								<li>Cumprir obrigações legais e regulatórias</li>
							</ul>
						</section>

						{/* Compartilhamento e comercialização */}
						<section>
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								5. Compartilhamento e Comercialização de Dados
							</h2>
							<div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
								<p className="font-semibold text-blue-900 mb-3">
									⚠️ Informação Importante
								</p>
								<p>
									Seus dados enriquecidos <strong>podem ser comercializados</strong> com empresas comercializadoras de energia credenciadas, conforme descrito em nossa Política de Privacidade.
								</p>
							</div>
							<ul className="list-disc list-inside space-y-3 ml-4 my-4">
								<li>Venda individual de leads para comercializadoras</li>
								<li>Venda em pacotes para empresas parceiras</li>
								<li>Uso agregado para relatórios e analytics de mercado</li>
							</ul>
							<p>
								O compartilhamento é feito sempre com base em finalidades legítimas e mediante consentimento do titular.
							</p>
						</section>

						{/* Direitos do titular */}
						<section>
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								6. Seus Direitos segundo a LGPD
							</h2>
							<ul className="list-disc list-inside space-y-3 ml-4 my-4">
								<li><strong>Acesso:</strong> saber quais dados tratamos sobre você</li>
								<li><strong>Correção:</strong> solicitar atualização de dados incorretos</li>
								<li><strong>Exclusão:</strong> pedir a exclusão de seus dados (salvo obrigações legais)</li>
								<li><strong>Portabilidade:</strong> receber seus dados em formato estruturado</li>
								<li><strong>Revogação de consentimento:</strong> retirar consentimento a qualquer momento</li>
							</ul>
							<p className="mt-4">
								Para exercer seus direitos, entre em contato conosco pelo e-mail abaixo.
							</p>
						</section>

						{/* Segurança e retenção */}
						<section>
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								7. Segurança e Retenção dos Dados
							</h2>
							<p>
								Adotamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados, alterações ou destruição. Retemos os dados pelo tempo necessário para cumprir obrigações legais e comerciais.
							</p>
						</section>

						{/* Cookies */}
						<section>
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								8. Cookies
							</h2>
							<p>
								Utilizamos cookies para melhorar sua experiência, analisar o uso do site e personalizar conteúdo. Você pode gerenciar cookies nas configurações do seu navegador.
							</p>
						</section>

						{/* Contato */}
						<section>
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								9. Contato
							</h2>
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
