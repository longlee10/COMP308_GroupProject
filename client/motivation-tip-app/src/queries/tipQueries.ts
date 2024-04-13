import { gql } from "@apollo/client";

const TIPS = gql`
  query {
    dailyTips {
      id
      title
      description
    }
  }
`;

const TIP_BY_ID = gql`
  query DailyTip($id: ID!) {
    dailyTip(id: $id) {
      id
      title
      description
    }
  }
`;

const CREATE_TIP = gql`
  mutation CreateDailyTip($title: String!, $description: String!) {
    createDailyTip(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

const EDIT_TIP = gql`
 mutation UpdateDailyTip($id: ID!, $title: String!, $description: String!) {
  updateDailyTip(id: $id, title: $title, description: $description) {
    id
    title
    description
  }
}
`;

const DELETE_TIP = gql`
  mutation DeleteDailyTip($id: ID!) {
    deleteDailyTip(id: $id) {
      id
    }
  }
`;

export { TIPS, CREATE_TIP, EDIT_TIP, TIP_BY_ID, DELETE_TIP };
