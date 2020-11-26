import { MongoDataSource } from "apollo-datasource-mongodb";
import { UserDbObject } from "../generated/types";

interface Context {
  loggedInUser: UserDbObject;
}

export default class User extends MongoDataSource<UserDbObject, Context> {
  async findOne(query): Promise<UserDbObject | null> {
    try {
      const user = await this.collection.findOne(query);
      if (!user) {
        console.error(
          `User.findOne(${query}) failed because record does not exist.`
        );
      }
      return user;
    } catch (err) {
      console.error(`User.findOne(${query}) failed with error ${err}.`);
    }
    return null;
  }

  async insertOne(args): Promise<UserDbObject | null> {
    try {
      const result = await this.collection.insertOne(args);
      return this.findOneById(result.insertedId);
    } catch (err) {
      console.error(`User.createOne(${args}) failed with error ${err}.`);
    }
    return null;
  }
}
