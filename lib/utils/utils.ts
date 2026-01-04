export function formatCNPJ(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18);
}

export function formatCurrency(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) return "";

  // Limite de segurança (ex: até 9 dígitos = 999 milhões)
  const limited = digits.slice(0, 9);

  const number = limited.replace(/^0+/, "");

  return "R$ " + number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}