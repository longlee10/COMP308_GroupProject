import { gql } from "@apollo/client";

const ALERTS = gql`
 query {
    alerts {
      id
      patientName
      responderName
      responderPhone
      responderAddress
      message
    }
  }
`;

const ADD_ALERT = gql`
 mutation CreateAlert(
    $patientName: String!,
    $responderName: String!,
    $responderPhone: String!,
    $responderAddress: String!,
    $message: String!
  ) {
    createAlert(
      patientName: $patientName,
      responderName: $responderName,
      responderPhone: $responderPhone,
      responderAddress: $responderAddress,
      message: $message
    ) {
      id
      patientName
      responderName
      responderPhone
      responderAddress
      message
    }
  }
`;

export { ALERTS, ADD_ALERT };
