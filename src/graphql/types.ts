import { gql } from "apollo-server-koa";

export default gql`
  type Query {
    user(name: String): User
  }
  type Mutation {
    addUser(name: String!): User!
  }
  type User @entity {
    _id: String! @id
    name: String! @column
  }
`;
