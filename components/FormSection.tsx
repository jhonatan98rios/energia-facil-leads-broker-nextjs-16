"use client";

import { formatCNPJ } from "@/lib/utils/utils";
import { useRef, useState, useTransition } from "react";
import FileUpload from "./FileUpload";

export default function FormSection() {
  const formRef = useRef<HTMLFormElement>(null);

  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [cnpj, setCnpj] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [contactRole, setContactRole] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<any | null>(null);

  // extractedData will hold the result returned by the extraction API
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formDataFromDOM = new FormData(event.currentTarget);

    const payload = {
      cnpj: cnpj.replace(/\D/g, ""),
      email: formDataFromDOM.get("email"),
      contactName: formDataFromDOM.get("contactName"),
      contactRole: formDataFromDOM.get("contactRole"),
    };

    if (payload.cnpj.length !== 14) {
      setStatus("error");
      setMessage("CNPJ inválido.");
      return;
    }

    if (!file) {
      setStatus("error");
      setMessage("Por favor, anexe a conta de luz.");
      return;
    }

    startTransition(async () => {
      try {
        // Criar FormData para multipart upload
        const multipartFormData = new FormData();
        multipartFormData.append("cnpj", payload.cnpj);
        multipartFormData.append("email", payload.email as string);
        multipartFormData.append("contactName", payload.contactName as string);
        multipartFormData.append("contactRole", payload.contactRole as string);

        // Adicionar arquivo se existir
        if (file) {
          multipartFormData.append("file", file);
        }

        // Adicionar dados extraídos (JSON) se existirem
        if (extractedData) {
          multipartFormData.append("extractedData", JSON.stringify(extractedData));
        }

        const response = await fetch("/api/leads", {
          method: "POST",
          body: multipartFormData,
        });

        if (!response.ok) {
          throw new Error("Erro ao enviar dados");
        }

        setStatus("success");
        setMessage("Simulação enviada com sucesso!");
        formRef.current?.reset();
        setCnpj("");
        setFile(null);

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


              <div className="md:col-span-2">
                <label htmlFor="cnpj" className="label">
                  CNPJ
                </label>
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

              <div>
                <label htmlFor="contactName" className="label">
                  Nome do responsável
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  className="input"
                  placeholder="e.g. John Doe"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="contactRole" className="label">
                  Cargo do responsável
                </label>
                <input
                  id="contactRole"
                  name="contactRole"
                  type="text"
                  className="input"
                  placeholder="e.g. CFO"
                  value={contactRole}
                  onChange={(e) => setContactRole(e.target.value)}
                  required
                />
              </div>


              {/* Valor da conta será extraído automaticamente da conta de luz */}

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

              <div className="md:col-span-2">
                <label className="label">Anexar conta de luz</label>

                <FileUpload
                  onExtracted={(data, uploadedFile) => {
                    setExtractedData(data);
                    setFile(uploadedFile);
                  }}
                />

                <p className="helper">PDF, JPG, PNG — máximo 5MB por arquivo.</p>

                {extractedData && (
                  <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                    <strong className="block text-sm text-gray-800 mb-1">Dados extraídos:</strong>
                    <pre className="whitespace-pre-wrap overflow-x-auto text-xs">{JSON.stringify(extractedData, null, 2)}</pre>
                  </div>
                )}
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
