import { useQuery } from "@apollo/client";
import { TIPS } from "./tipQueries";
import { DailyTipsData } from "./types";

const useGetTip = () => {
  return useQuery<DailyTipsData>(TIPS);
};

export { useGetTip };
