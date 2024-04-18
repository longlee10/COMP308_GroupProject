import { useQuery, useMutation } from "@apollo/client";
import {
  ALERTS,
  ADD_ALERT,
  DELETE_ALERT,
  ALERT_BY_ID,
  UPDATE_ALERT,
} from "../queries/alertQueries";
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

const useDeleteAlert = () => {
  const [deleteAlertMutation] = useMutation(DELETE_ALERT);

  const deleteAlert = async (id: string) => {
    await deleteAlertMutation({
      variables: { id },
    });
  };

  return deleteAlert;
};

const useGetAlert = (id: string) => {
  if (id) {
    return useQuery(ALERT_BY_ID, {
      variables: { id },
    });
  }
  return { data: undefined };
};

const useUpdateAlert = () => {
  const [updateAlertMutation] = useMutation(UPDATE_ALERT);

  const updateAlert = async (id: String, alertData: AlertFormData) => {
    await updateAlertMutation({
      variables: { id, ...alertData },
    });
  };

  return updateAlert;
};

export {
  useGetAlerts,
  useAddAlert,
  useDeleteAlert,
  useGetAlert,
  useUpdateAlert,
};
