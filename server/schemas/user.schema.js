import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    password: String!
    address: String!
    phone: String!
    role: String!
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    currentUser: User
  }

  type Mutation {
    signUp(username: String!, password: String!): Boolean
    signIn(username: String!, password: String!): Boolean
    signOut: Boolean
  }
`;

export default typeDefs;
