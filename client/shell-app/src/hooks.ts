import { useMutation, useQuery } from "@apollo/client";
import { UserData } from "./types";
import { CURRENT_USER_QUERY, LOGOUT } from "./queries";

const useGetCurrentUser = () => {
  return useQuery<UserData>(CURRENT_USER_QUERY, {
    fetchPolicy: "network-only",
  });
};

const useLogout = () => {
  const [logout] = useMutation(LOGOUT);

  const handleLogout = () => {
    logout();
    // refresh the page
    window.location.reload();
  };

  return handleLogout;
};

export { useGetCurrentUser, useLogout };
