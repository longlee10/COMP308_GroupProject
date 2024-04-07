import { gql } from "apollo-server-express";

const typeDefs = gql`
  type VitalSign {
    id: ID
    temperature: Float
    bloodPressure: Float
    heartRate: Float
    respiratoryRate: Float
    oxygenSaturation: Float
    disease: Boolean
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
    predictDisease(
      temperature: Float!
      bloodPressure: Float!
      heartRate: Float!
      respiratoryRate: Float!
      oxygenSaturation: Float!
    ): Boolean
  }
`;

export default typeDefs;
