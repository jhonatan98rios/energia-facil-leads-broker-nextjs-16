import type { ILLMClient } from "@/lib/clients/OpenAIExtractorClient";

export class ExtractService {
  constructor(
      private readonly llmClient: ILLMClient,
      private readonly prompt: string
    ) {}

  async extract(file: File) {
    // Delegate to the injected LLM client
    const result = await this.llmClient.extractFromFile(file, this.prompt);
    return result;
  }
}
