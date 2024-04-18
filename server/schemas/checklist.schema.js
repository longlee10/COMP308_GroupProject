import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Checklist {
    id: ID!
    patientName: String!
    selectedSymptoms: [String]
  }

  type Query {
    checklists: [Checklist]
    checklist(id: ID!): Checklist
  }

  type Mutation {
    createChecklist(
      patientName: String!
      selectedSymptoms: [String]!
    ): Checklist
    updateChecklist(
      id: ID!
      patientName: String!
      selectedSymptoms: [String]!
    ): Checklist
    deleteChecklist(id: ID!): Checklist
  }
`;

export default typeDefs;
