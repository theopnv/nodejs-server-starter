import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb";
import { makeExecutableSchema } from "@graphql-tools/schema";
import types from "./types";

const resolvers = {
  Query: {
    user: (_, args, { dataSources }) =>
      dataSources.users.findOne({ name: args.name }),
  },
  Mutation: {
    addUser: async (_, args, { dataSources }) =>
      dataSources.users.insertOne(args),
  },
};

const schema = makeExecutableSchema({
  typeDefs: [DIRECTIVES, types],
  resolvers,
});

export default schema;
