import TestDatabaseManager from "./TestDatabasemanager";
import ApolloServerManager from "../src/ApolloServerManager";
import { ApolloServerTestClient } from "apollo-server-testing";

interface Options {
  dbManager: TestDatabaseManager;
  serverManager: ApolloServerManager;
  testClient: ApolloServerTestClient;
}

const options: Options = {
  dbManager: null,
  serverManager: null,
  testClient: null,
};

export default options;
