import { gql } from "@apollo/client";

const VITAL_SIGNS = gql`
query {
    vitalSigns {
      bloodPressure
      heartRate
      id
      respiratoryRate
      temperature
      oxygenSaturation
      patient {
        username
      }
    }
  }
`;

const ADD_VITAL_SIGN = gql`
 mutation CreateVitalSign($temperature: Float!, $bloodPressure: Float!, $heartRate: Float!, $respiratoryRate: Float!, $oxygenSaturation: Float!) {
    createVitalSign(temperature: $temperature, bloodPressure: $bloodPressure, heartRate: $heartRate, respiratoryRate: $respiratoryRate, oxygenSaturation: $oxygenSaturation) {
      id
      temperature
      bloodPressure
      heartRate
      respiratoryRate
      oxygenSaturation
    }
  }
`;

const GET_VITAL_SIGN_BY_ID = gql`
  query GetVitalSignById($id: ID!) {
  vitalSign(id: $id) {
    bloodPressure
    heartRate
    id
    respiratoryRate
    temperature
    oxygenSaturation
    patient {
      username
    }
  }
}
`;

const UPDATE_VITAL_SIGN = gql`
  mutation UpdateVitalSign($id: ID!, $temperature: Float!, $bloodPressure: Float!, $heartRate: Float!, $respiratoryRate: Float!, $oxygenSaturation: Float!) {
  updateVitalSign(id: $id, temperature: $temperature, bloodPressure: $bloodPressure, heartRate: $heartRate, respiratoryRate: $respiratoryRate, oxygenSaturation: $oxygenSaturation) {
    id
    temperature
    bloodPressure
    heartRate
    respiratoryRate
    oxygenSaturation
  }
}
`;

const PREDICT_DISEASE = gql`
mutation PredictDiseaseFromVitalSigns(
  $id: ID!,
) {
  predictDisease(
    id: $id,
  ) {
    result
    message
  }
}
`;

const DELETE_VITAL_SIGN = gql`
  mutation DeleteVitalSign($id: ID!) {
  deleteVitalSign(id: $id) {
    id
  }
}
`;

export {
  VITAL_SIGNS,
  ADD_VITAL_SIGN,
  GET_VITAL_SIGN_BY_ID,
  UPDATE_VITAL_SIGN,
  PREDICT_DISEASE,
  DELETE_VITAL_SIGN,
};
