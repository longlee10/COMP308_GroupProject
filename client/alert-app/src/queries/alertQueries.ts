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

const DELETE_ALERT = gql`
  mutation DeleteAlert($id: ID!) {
      deleteAlert(id: $id) {
        id
      }
    }
  `;

const ALERT_BY_ID = gql`
  query Alert($id: ID!) {
    alert(id: $id) {
      id
      patientName
      responderName
      responderPhone
      responderAddress
      message
    }
  }
`;

const UPDATE_ALERT = gql`
  mutation UpdateAlert(
    $id: ID!,
    $patientName: String!,
    $responderName: String!,
    $responderPhone: String!,
    $responderAddress: String!,
    $message: String!
  ) {
    updateAlert(
      id: $id,
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

export { ALERTS, ADD_ALERT, DELETE_ALERT, ALERT_BY_ID, UPDATE_ALERT };
