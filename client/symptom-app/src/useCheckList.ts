import { useQuery } from "@apollo/client";
import { CHECK_LISTS } from "./checkListQueries";
import { CHECK_LISTS_DATA } from "./types";

const useGetCheckList = () => {
  return useQuery<CHECK_LISTS_DATA>(CHECK_LISTS);
};

export { useGetCheckList };
