import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Alert {
    id: ID!
    patientName: String!
    responderName: String!
    responderAddress: String!
    responderPhone: String!
    message: String!
  }

  type Query {
    alerts: [Alert]
    alert(id: ID!): Alert
  }

  type Mutation {
    createAlert(
      patientName: String!
      responderName: String!
      responderAddress: String!
      responderPhone: String!
      message: String!
    ): Alert
    updateAlert(
      id: ID!
      patientName: String!
      responderName: String!
      responderAddress: String!
      responderPhone: String!
      message: String!
    ): Alert
    deleteAlert(id: ID!): Alert
  }
`;

export default typeDefs;
