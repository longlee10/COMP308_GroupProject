import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID
    fullName: String
    username: String
  }

  type VitalSign {
    id: ID
    temperature: Float
    bloodPressure: Float
    heartRate: Float
    respiratoryRate: Float
    oxygenSaturation: Float
    disease: Boolean
    patient: User
  }

  type PredictResponse {
    result: Boolean
    message: String
  }

  type Query {
    vitalSigns: [VitalSign]
    vitalSign(id: ID!): VitalSign
  }

  type Mutation {
    createVitalSign(
      temperature: Float!
      bloodPressure: Float!
      heartRate: Float!
      respiratoryRate: Float!
      oxygenSaturation: Float!
    ): VitalSign
    updateVitalSign(
      id: ID!
      temperature: Float!
      bloodPressure: Float!
      heartRate: Float!
      respiratoryRate: Float!
      oxygenSaturation: Float!
    ): VitalSign
    deleteVitalSign(id: ID!): VitalSign
    predictDisease(id: ID!): PredictResponse
  }
`;

export default typeDefs;
