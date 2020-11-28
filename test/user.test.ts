import "mocha";
import { gql } from "apollo-server-koa";
import { expect } from "chai";
import { ObjectId } from "mongodb";
import { UserDbObject } from "../src/generated/types";
import options from "./common";

it("Add a valid user", async () => {
  // Preparation
  const user = { name: "John" };
  const ADD_USER = gql`
    mutation addUser($name: String!) {
      addUser(name: $name) {
        _id
        name
      }
    }
  `;

  // GraphQL
  const { data } = await options.testClient.mutate({
    mutation: ADD_USER,
    variables: {
      ...user,
    },
  });
  expect(ObjectId.isValid(data.addUser._id)).to.be.equal(true);
  expect(data.addUser.name).to.be.equal(user.name);

  // Database
  const dbUser = await options.dbManager.db
    .collection<UserDbObject>("users")
    .findOne({ name: user.name });
  expect(ObjectId.isValid(dbUser._id)).to.be.equal(true);
  expect(dbUser.name).to.be.equal(user.name);
});

it("get a valid user", async () => {
  // Preparation (insert a new user in DB)
  const result = await options.dbManager.db
    .collection<UserDbObject>("users")
    .insertOne({ name: "John" });
  const dbUser = await options.dbManager.db
    .collection<UserDbObject>("users")
    .findOne({ _id: result.insertedId });
  const GET_USER = gql`
    query User($name: String) {
      user(name: $name) {
        _id
        name
      }
    }
  `;

  // GraphQL
  const {
    data: { user },
  } = await options.testClient.query({
    query: GET_USER,
    variables: {
      name: "John",
    },
  });
  expect(ObjectId.isValid(user._id)).to.be.equal(true);
  expect(user.name).to.be.equal(dbUser.name);
});
