import fs from "fs";
import os from "os";
import path from "path";
import { execFileSync } from "child_process";
import crypto from "crypto";
import { pipeline } from "stream/promises";
import stream from "stream";

type InputFile = File | Buffer | ArrayBuffer;

// Returns either a PNG buffer (when conversion via pdftoppm succeeded)
// or a `text` property when a pure-JS fallback extracted text from the PDF.
export async function convertPdfToPng(input: InputFile): Promise<{ pngBuffer?: Buffer; filename: string; text?: string }> {
  const tmpDir = os.tmpdir();
  const id = crypto.randomBytes(8).toString("hex");
  const pdfPath = path.join(tmpDir, `upload-${id}.pdf`);
  const outPrefix = path.join(tmpDir, `upload-${id}`);
  const outPath = path.join(tmpDir, `upload-${id}.png`); // pdftoppm will append .png

  try {
    // Ensure we have a Buffer on disk
    if (Buffer.isBuffer(input)) {
      fs.writeFileSync(pdfPath, input);
    } else if (input instanceof ArrayBuffer) {
      fs.writeFileSync(pdfPath, Buffer.from(input));
    } else {
      // input is a File-like (Web File). Try to get arrayBuffer, else stream to disk
      try {
        const ab = await (input as File).arrayBuffer();
        fs.writeFileSync(pdfPath, Buffer.from(ab));
      } catch (err) {
        // Fallback: stream to file
        const writable = fs.createWriteStream(pdfPath);
        // @ts-ignore - may not have fromWeb in older Node
        const nodeReadable = (stream.Readable as any).fromWeb ? (stream.Readable as any).fromWeb((input as File).stream()) : stream.Readable.from((input as File).stream() as any);
        await pipeline(nodeReadable as any, writable);
      }
    }

    // Call pdftoppm to convert first page to PNG
    // Command: pdftoppm -png -singlefile -f 1 -l 1 input.pdf outPrefix
    try {
      execFileSync("pdftoppm", ["-png", "-singlefile", "-f", "1", "-l", "1", pdfPath, outPrefix], {
        stdio: "ignore",
        timeout: 30_000,
      });
    } catch (err: any) {
      // If the binary is missing, try a pure-JS fallback (pdf-parse) to extract text
      if (err && (err.code === "ENOENT" || (err.message && err.message.includes("pdftoppm ENOENT")))) {
        try {
          const pdfParseMod = (await import("pdf-parse")) as any;
          const pdfBuffer = fs.readFileSync(pdfPath);
          const parsed = await pdfParseMod(pdfBuffer);
          const text = parsed?.text || "";
          return { text, filename: path.basename(pdfPath) };
        } catch (e: any) {
          throw new Error(
            "Conversão falhou: não foi possível encontrar 'pdftoppm' e a tentativa de fallback com 'pdf-parse' falhou. Para hospedar em ambientes serverless, instale a dependência 'pdf-parse' ou forneça um conversor nativo."
          );
        }
      }
      throw err;
    }

    // pdftoppm writes outPrefix.png
    if (!fs.existsSync(outPath)) {
      // Try with appended -1 (some installs produce outPrefix-1.png)
      const alt = outPrefix + "-1.png";
      if (fs.existsSync(alt)) {
        return { pngBuffer: fs.readFileSync(alt), filename: path.basename(alt) };
      }
      throw new Error("Conversão falhou: arquivo PNG não encontrado (verifique se 'pdftoppm' está instalado)");
    }

    const pngBuffer = fs.readFileSync(outPath);
    return { pngBuffer, filename: path.basename(outPath) };
  } finally {
    // cleanup
    try { if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath); } catch (e) {}
    try { if (fs.existsSync(outPath)) fs.unlinkSync(outPath); } catch (e) {}
    try { const alt = outPrefix + "-1.png"; if (fs.existsSync(alt)) fs.unlinkSync(alt); } catch (e) {}
  }
}
