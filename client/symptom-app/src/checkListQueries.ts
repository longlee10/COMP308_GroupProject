import { gql } from "@apollo/client";

const CHECK_LISTS = gql`
 query {
    checklists {
    id
    patientName
    selectedSymptoms
    }
 }
`;

const ADD_CHECK_LIST = gql`
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

export { CHECK_LISTS, ADD_CHECK_LIST };
