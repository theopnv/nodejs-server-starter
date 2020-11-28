import { Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { ADatabaseManager } from "../src/DatabaseManager";

class TestDatabaseManager extends ADatabaseManager {
  mongod: MongoMemoryServer;

  constructor() {
    super();
    this.mongod = new MongoMemoryServer();
  }

  async connect(): Promise<Db | null> {
    const uri = await this.mongod.getUri();
    return super.connect(uri, "test");
  }

  async start(): Promise<Db> {
    return this.connect();
  }

  async stop(): Promise<void> {
    await super.stop();
    await this.mongod.stop();
  }
}

export default TestDatabaseManager;
