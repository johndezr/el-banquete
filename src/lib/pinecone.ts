import { Pinecone, QueryResponse, RecordMetadata } from '@pinecone-database/pinecone';

interface IPineconeService {
  query(key: number[], namespace: string): Promise<QueryResponse<RecordMetadata>>;
  upsert(
    key: string,
    records: number[],
    namespace: string,
    metadata: { type: string; content: string }
  ): Promise<void>;
}

class PineconeService implements IPineconeService {
  private static instance: PineconeService;
  private pinecone: Pinecone;
  private index;

  private constructor() {
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    this.index = this.pinecone.index('platon-banquete');
  }

  public static getInstance() {
    if (!PineconeService.instance) {
      PineconeService.instance = new PineconeService();
    }
    return PineconeService.instance;
  }

  public async query(vector: number[], namespace: string) {
    const result = await this.index.namespace(namespace).query({
      topK: 3,
      includeValues: true,
      includeMetadata: true,
      vector: vector,
    });
    return result;
  }

  public async upsert(
    key: string,
    records: number[],
    namespace: string,
    metadata: { type: string; content: string }
  ) {
    await this.index.namespace(namespace).upsert([
      {
        id: key,
        values: records,
        metadata,
      },
    ]);
  }
}

export default PineconeService;
