import "mocha";
import { createTestClient } from "apollo-server-testing";
import ApolloServerManager from "../src/ApolloServerManager";
import options from "./common";
import TestDatabaseManager from "./TestDatabasemanager";

function importTest(name, path) {
  describe(name, function () {
    require(path);
  });
}

describe("all", function () {
  before(async function () {
    options.dbManager = new TestDatabaseManager();
    options.serverManager = new ApolloServerManager(options.dbManager);
    const server = await options.serverManager.start();
    options.testClient = createTestClient(server);
  });
  after(async function () {
    await options.dbManager.stop();
    await options.serverManager.stop();
  });
  beforeEach(async function () {
    const collections = options.dbManager.db.collections;
    for (const key in collections) {
      await options.dbManager.db.dropCollection(key);
    }
  });
  importTest("user", "./user.test");
});
