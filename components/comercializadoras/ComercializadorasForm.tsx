"use client";

import { useRef, useState, useTransition } from "react";

export default function ComercializadorasForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const payload = {
      companyName: formData.get("companyName"),
      contactName: formData.get("contactName"),
      email: formData.get("email"),
      clientProfile: formData.get("clientProfile"),
    };

    // validações simples
    if (!payload.companyName || !payload.contactName || !payload.email) {
      setStatus("error");
      setMessage("Preencha todos os campos obrigatórios.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/partners/comercializadoras", {
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
        setMessage(
          "Cadastro enviado com sucesso! Nosso time entrará em contato."
        );
        formRef.current?.reset();
      } catch (error) {
        setStatus("error");
        setMessage(
          "Não foi possível enviar seu cadastro. Tente novamente."
        );
      }
    });
  }

  function handleReset() {
    setStatus("idle");
    setMessage("");
  }

  return (
    <section className="bg-neutral-100 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Receba leads qualificados
          </h2>

          <p className="text-gray-600 text-center mt-2">
            Cadastre sua comercializadora e entenda como funciona a parceria.
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
              className="mt-10 grid grid-cols-1 gap-6"
              aria-label="Formulário de cadastro de comercializadoras"
            >
              <div>
                <label htmlFor="companyName" className="label">
                  Nome da comercializadora
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  className="input"
                  placeholder="Ex: Energia XYZ"
                  required
                />
              </div>

              <div>
                <label htmlFor="contactName" className="label">
                  Nome do responsável
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  className="input"
                  placeholder="Ex: João Silva"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="label">
                  Email corporativo
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input"
                  placeholder="joao@empresa.com.br"
                  required
                />
              </div>

              <div>
                <label htmlFor="clientProfile" className="label">
                  Perfil de cliente desejado
                </label>
                <select
                  id="clientProfile"
                  name="clientProfile"
                  className="input"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  <option value="pequeno-medio">
                    Pequenas e médias empresas
                  </option>
                  <option value="medio-grande">
                    Médias e grandes empresas
                  </option>
                  <option value="alta-demanda">
                    Alto consumo energético
                  </option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="mt-4 bg-[var(--color-primary)] text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {isPending ? "Enviando..." : "Quero receber leads qualificados"}
              </button>
            </form>
          )}

          {/* CTA PÓS SUCESSO */}
          {status === "success" && (
            <div className="mt-8 text-center">
              <p className="text-gray-700 mb-4">
                Deseja cadastrar outra comercializadora?
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center rounded-xl
                  border border-[var(--color-primary)]
                  text-[var(--color-primary)]
                  px-6 py-3 text-sm font-semibold
                  hover:bg-[var(--color-primary)]
                  hover:text-white
                  transition"
              >
                Novo cadastro
              </button>
            </div>
          )}

          <p className="text-xs text-gray-400 text-center mt-6">
            Seus dados estão protegidos. Não compartilhamos informações.
          </p>
        </div>
      </div>
    </section>
  );
}
