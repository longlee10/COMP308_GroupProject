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

const CREATE_TIP = gql`
  mutation CreateDailyTip($title: String!, $description: String!) {
    createDailyTip(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

export { TIPS, CREATE_TIP };
