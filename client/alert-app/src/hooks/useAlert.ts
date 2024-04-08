import { useQuery } from "@apollo/client";
import { ALERTS } from "../queries/alertQueries";
import { AlertsData } from "@/entities/types";

const useGetAlerts = () => {
  return useQuery<AlertsData>(ALERTS);
};

const useAddAlert = () => {};

export { useGetAlerts, useAddAlert };
