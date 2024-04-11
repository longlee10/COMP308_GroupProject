import { useQuery, useMutation } from "@apollo/client";
import { ALERTS, ADD_ALERT } from "../queries/alertQueries";
import { AlertData, AlertsData } from "@/entities/types";

const useGetAlerts = () => {
  return useQuery<AlertsData>(ALERTS);
};

const useAddAlert = () => {
  const [addAlertMutation] = useMutation<AlertData>(ADD_ALERT);

  const addAlert = async (alertData: AlertData) => {
    const { data } = await addAlertMutation({
      variables: alertData,
    });
    return data;
  };

  return addAlert;
};

export { useGetAlerts, useAddAlert };
