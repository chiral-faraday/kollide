import { injectable } from "inversify";
import { ISyphorService, SyphorServiceCredentials } from "../common/protocol";
import neo4j, { Driver } from "neo4j-driver";
@injectable()
export class SyphorServiceImpl implements ISyphorService {
  private driver: Driver | undefined;

  async initialize(credentials: SyphorServiceCredentials): Promise<void> {
    await this.recreateDriver(credentials);
  }

  private async recreateDriver(credentials: SyphorServiceCredentials): Promise<void> {
    if (this.driver) {
      await this.driver.close();
    }

    this.driver = neo4j.driver(
      credentials.url ?? "bolt://localhost:7687",
      neo4j.auth.basic(credentials.username, credentials.password),
    );
  }

  async runQuery(query: string): Promise<any[]> {
    if (!this.driver) {
      throw new Error("SyphorService not initialized");
    }

    const session = this.driver.session();

    try {
      const result = await session.run(query);
      return result.records.map((r) => r.toObject());
    } finally {
      await session.close();
    }
  }

  async updateCredentials(credentials: SyphorServiceCredentials): Promise<void> {
    await this.recreateDriver(credentials);
  }
}
