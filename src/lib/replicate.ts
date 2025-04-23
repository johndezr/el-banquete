import Replicate from 'replicate';

interface IReplicateService {
  generateText(prompt: string, systemPrompt: string): Promise<string[]>;
}

class ReplicateService implements IReplicateService {
  private static instance: ReplicateService;
  private replicate: Replicate;

  private constructor() {
    this.replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY!,
    });
  }

  public static getInstance() {
    if (!ReplicateService.instance) {
      ReplicateService.instance = new ReplicateService();
    }
    return ReplicateService.instance;
  }
  public async generateText(prompt: string, systemPrompt: string): Promise<string[]> {
    return (await this.replicate.run(
      `${process.env.REPLICATE_OWNER}/${process.env.REPLICATE_MODEL}`,
      {
        input: {
          prompt,
          max_tokens: 500,
          system_prompt: systemPrompt,
        },
      }
    )) as string[];
  }
}

export default ReplicateService;
