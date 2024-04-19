import { gql } from "@apollo/client";

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser { 
      username
      role 
    }
  }
`;

const LOGOUT = gql`
 mutation {
    signOut
 }
`;

export { CURRENT_USER_QUERY, LOGOUT };
