export function formatOpenCNPJData(data: any) {
  if (!data) return null;
  return {
    cnpj: data.cnpj,
    razao_social: data.razao_social,
    nome_fantasia: data.nome_fantasia,
    situacao_cadastral: data.situacao_cadastral,
    data_inicio_atividade: data.data_inicio_atividade,
    porte_empresa: data.porte,
    capital_social: data.capital_social,
    cnae_principal: data.cnae_principal?.codigo,
    cnae_principal_desc: data.cnae_principal?.descricao,
    cnaes_secundarios: data.cnaes_secundarios?.map((c: any) => c.codigo),
    natureza_juridica: data.natureza_juridica,
    tipo: data.matriz_filial,
    endereco: {
      logradouro: data.logradouro,
      numero: data.numero,
      complemento: data.complemento,
      bairro: data.bairro,
      cep: data.cep,
      municipio: data.municipio,
      uf: data.uf,
    },
    email: data.email,
    telefones: data.telefones,
    socios: data.qsa?.map((s: any) => ({
      nome: s.nome_socio,
      qualificacao: s.qualificacao_socio,
    })),
  };
}
