import { Db, MongoClient } from "mongodb";

abstract class ADatabaseManager {
  db: Db;
  client: MongoClient;

  abstract start(): Promise<Db | null>;

  async connect(uri: string, name: string): Promise<Db | null> {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      await this.client.connect();
      this.db = this.client.db(name);
      return this.db;
    } catch (err) {
      console.error(err);
    }
    return null;
  }

  async stop(): Promise<void> {
    await this.client.close();
  }

  async drop(): Promise<void> {
    this.db.dropDatabase();
  }
}

class AppDatabaseManager extends ADatabaseManager {
  readonly uri: string = `mongodb://${process.env.MONGO_DATABASE_USERNAME}:${process.env.MONGO_DATABASE_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}`;

  async connect(): Promise<Db | null> {
    return super.connect(this.uri, process.env.MONGO_INITDB_DATABASE);
  }

  async start(): Promise<Db> {
    return this.connect();
  }
}

export { ADatabaseManager, AppDatabaseManager };
