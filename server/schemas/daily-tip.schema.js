import { gql } from "apollo-server-express";

const typeDefs = gql`
  type DailyTip {
    id: ID!
    title: String!
    description: String!
  }

  type Query {
    dailyTips: [DailyTip]
    dailyTip(id: ID!): DailyTip
  }

  type Mutation {
    createDailyTip(title: String!, description: String!): DailyTip
    updateDailyTip(id: ID!, title: String!, description: String!): DailyTip
    deleteDailyTip(id: ID!): DailyTip
  }
`;

export default typeDefs;
