import { useQuery, useMutation } from "@apollo/client";
import { ALERTS, ADD_ALERT } from "../queries/alertQueries";
import { AlertFormData, AlertsData } from "@/entities/types";

const useGetAlerts = () => {
  return useQuery<AlertsData>(ALERTS);
};

const useAddAlert = () => {
  const [addAlertMutation] = useMutation<AlertFormData>(ADD_ALERT);

  const addAlert = async (alertData: AlertFormData) => {
    const { data } = await addAlertMutation({
      variables: alertData,
    });
    return data;
  };

  return addAlert;
};

export { useGetAlerts, useAddAlert };
