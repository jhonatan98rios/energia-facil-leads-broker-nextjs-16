"use client";

import { useRef, useState, useTransition } from "react";

type ExtractResult = any;

interface FileUploadProps {
  onExtracted: (result: ExtractResult, file: File) => void;
}

export default function FileUpload({ onExtracted }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function validateFile(file: File) {
    const allowed = ["application/pdf", "image/png", "image/jpeg"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!allowed.includes(file.type) || file.size > maxSize) {
      return false;
    }
    return true;
  }

  async function uploadForExtraction(file: File) {
    setFileError(null);
    startTransition(async () => {
      try {
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/uploads/extract", {
          method: "POST",
          body: fd,
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Erro na extração");
        }

        const data = await res.json();
        setFileName(file.name);
        onExtracted(data, file);
      } catch (err: any) {
        setFileError(err?.message || "Erro ao processar arquivo");
      }
    });
  }

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const selected = fileList[0];
    if (!validateFile(selected)) {
      setFileError("Apenas PDF/JPG/PNG. Máx 5MB por arquivo.");
      return;
    }
    uploadForExtraction(selected);
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`mt-2 rounded-xl border p-6 text-center ${
          dragActive ? "border-(--color-primary) bg-white" : "border border-gray-300 bg-gray-50"
        }`}
        role="group"
        aria-labelledby="file-upload-label"
      >
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          id="file-upload"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-8 w-8 text-gray-400"
          >
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4 4-4" />
            <rect x="3" y="15" width="18" height="6" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {
            isPending ? 
            <p className="text-sm text-gray-600">
              Processando arquivo...
            </p> : 
            <p className="text-sm text-gray-600">
              Arraste o arquivo aqui ou 
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="font-semibold text-(--color-primary) underline ml-1"
              >
                selecione
              </button>
            </p>
          }

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center justify-center rounded-xl border border-(--color-primary) text-(--color-primary) px-4 py-2 text-sm font-semibold hover:bg-(--color-primary) hover:text-white transition"
          >
            {isPending ? "Carregando..." : "Selecionar arquivo"}
          </button>
        </div>
      </div>

      {fileError && (
        <div className="mt-2 text-sm text-red-600" role="alert">
          {fileError}
        </div>
      )}

      {fileName && (
        <div className="mt-4 text-sm text-gray-700">Arquivo processado: {fileName}</div>
      )}
    </div>
  );
}
