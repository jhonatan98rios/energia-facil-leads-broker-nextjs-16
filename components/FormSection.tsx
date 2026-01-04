"use client";

import { formatCNPJ, formatCurrency } from "@/lib/utils/utils";
import { useRef, useState, useTransition } from "react";

export default function FormSection() {
  const formRef = useRef<HTMLFormElement>(null);

  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [cnpj, setCnpj] = useState<string>("");
  const [bill, setBill] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const payload = {
      companyName: formData.get("company"),
      cnpj: cnpj.replace(/\D/g, ""),
      averageBill: Number(bill.replace(/\D/g, "")),
      email: formData.get("email"),
    };

    if (payload.cnpj.length !== 14) {
      setStatus("error");
      setMessage("CNPJ inválido.");
      return;
    }

    if (!payload.averageBill || payload.averageBill <= 0) {
      setStatus("error");
      setMessage("Informe um valor válido de conta de energia.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Erro ao enviar dados");
        }

        setStatus("success");
        setMessage("Simulação enviada com sucesso!");
        formRef.current?.reset();
        setBill("");
        setCnpj("");

      } catch (error) {
        setStatus("error");
        setMessage(
          "Não foi possível enviar sua simulação. Tente novamente."
        );
      }
    });
  }

  function handleReset() {
    setStatus("idle");
    setMessage("");
  }

  return (
    <section id="form" className="bg-neutral-100 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Simulação gratuita
          </h2>

          <p className="text-gray-600 text-center mt-2">
            Descubra se sua empresa pode economizar com o Mercado Livre de Energia.
          </p>

          {/* FEEDBACK */}
          {status !== "idle" && (
            <div
              className={`mt-6 rounded-xl p-4 text-sm text-center ${
                status === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
              role="status"
              aria-live="polite"
            >
              {message}
            </div>
          )}

          {/* FORM */}
          {status !== "success" && (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
              aria-label="Formulário de simulação de economia de energia"
            >
              <div>
                <label htmlFor="company" className="label">
                  Nome da empresa
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="input"
                  placeholder="Ex: Metalúrgica ABC Ltda"
                  required
                />
              </div>

              <div>
                <label htmlFor="cnpj" className="label">
                  CNPJ
                </label>
                {/* <input
                  id="cnpj"
                  name="cnpj"
                  type="text"
                  className="input"
                  placeholder="00.000.000/0001-00"
                  inputMode="numeric"
                  required
                /> */}
                <input
                  id="cnpj"
                  name="cnpj"
                  type="text"
                  className="input"
                  placeholder="00.000.000/0001-00"
                  value={cnpj}
                  onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
                  required
                  aria-invalid={cnpj.replace(/\D/g, "").length !== 14}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="bill" className="label">
                  Valor médio mensal da conta de energia
                </label>
                {/* <input
                  id="bill"
                  name="bill"
                  type="text"
                  className="input"
                  placeholder="Ex: R$ 12.000"
                  required
                /> */}
                <input
                  id="bill"
                  name="bill"
                  type="text"
                  className="input"
                  placeholder="Ex: R$ 12.000"
                  value={bill}
                  onChange={(e) => setBill(formatCurrency(e.target.value))}
                  required
                />
                <p className="helper">
                  Considerar apenas energia elétrica (últimos 3 meses).
                </p>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="label">
                  Email para receber a simulação
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="md:col-span-2 mt-4 bg-(--color-primary) text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {isPending ? "Enviando..." : "Simular economia"}
              </button>
            </form>
          )}

          {/* CTA PÓS SUCESSO */}
          {status === "success" && (
            <div className="mt-8 text-center">
              <p className="text-gray-700 mb-4">
                Deseja cadastrar outra empresa?
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center rounded-xl
                  border border-(--color-primary)
                  text-(--color-primary)
                  px-6 py-3 text-sm font-semibold
                  hover:bg-(--color-primary)
                  hover:text-white
                  transition"
              >
                Nova simulação
              </button>
            </div>
          )}

          <p className="text-xs text-gray-400 text-center mt-6">
            Seus dados estão protegidos. Não enviamos spam.
          </p>
        </div>
      </div>
    </section>
  );
}
