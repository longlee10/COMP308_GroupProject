import { gql } from "@apollo/client";

const CHECKLISTS = gql`
query {
  checklists {
      id
      patientName
      selectedSymptoms
    }
  }
`;

const ADD_CHECKLIST = gql`
 mutation CreateChecklist(
    $patientName: String!,
    $selectedSymptoms: [String!]!
  ) {
    createChecklist(
      patientName: $patientName,
      selectedSymptoms: $selectedSymptoms
    ) {
      id
      patientName
      selectedSymptoms
    }
  }
`;

const GET_CHECKLIST_BY_ID = gql`
  query GetChecklistById($id: ID!) {
  checklist(id: $id) {
    id
    patientName
    selectedSymptoms
  }
}
`;

const UPDATE_CHECKLIST= gql`
  mutation UpdateChecklist($id: ID!, $patientName: String!, $selectedSymptoms: [String!]!) {
  updateChecklist(id: $id, patientName: $patientName, selectedSymptoms: $selectedSymptoms) {
    id
    patientName
    selectedSymptoms
  }
}

`;

export { CHECKLISTS, ADD_CHECKLIST, GET_CHECKLIST_BY_ID, UPDATE_CHECKLIST };
