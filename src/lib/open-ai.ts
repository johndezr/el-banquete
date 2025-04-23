import { OpenAI } from 'openai';

interface IOpenAIService {
  embed(input: string): Promise<number[]>;
}

class OpenAIService implements IOpenAIService {
  private static instance: OpenAIService;
  private openai: OpenAI;

  private constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY!,
    });
  }

  public static getInstance() {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  public async embed(input: string) {
    const response = await this.openai.embeddings.create({
      model: process.env.OPEN_AI_EMBEDDING_MODEL!,
      input,
    });
    return response.data[0].embedding;
  }
}

export default OpenAIService;
