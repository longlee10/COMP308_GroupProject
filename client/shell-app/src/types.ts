export interface UserData {
  currentUser: {
    username: string;
    __typename: "User" | "Nurse";
  };
}
