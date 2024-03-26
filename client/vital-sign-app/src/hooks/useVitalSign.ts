import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  ADD_VITAL_SIGN,
  UPDATE_VITAL_SIGN,
  GET_VITAL_SIGN_BY_ID,
  VITAL_SIGNS,
} from "../queries/vitalSignQueries";
import { VitalSignData } from "../entities/types";
import { RefObject } from "react";

const useAddVitalSign = () => {
  const [addVitalSign] = useMutation(ADD_VITAL_SIGN);
  const navigate = useNavigate();

  const handleAdd = (
    temperature: RefObject<HTMLInputElement>,
    bloodPressure: RefObject<HTMLInputElement>,
    heartRate: RefObject<HTMLInputElement>,
    respiratoryRate: RefObject<HTMLInputElement>,
    refetch: any
  ) => {
    addVitalSign({
      variables: {
        temperature: parseFloat(temperature.current!.value),
        bloodPressure: bloodPressure.current!.value,
        heartRate: parseFloat(heartRate.current!.value),
        respiratoryRate: parseFloat(respiratoryRate.current!.value),
      },
    });

    temperature.current!.value = "";
    bloodPressure.current!.value = "";
    heartRate.current!.value = "";
    respiratoryRate.current!.value = "";

    navigate("/");
    refetch();
  };

  return handleAdd;
};

const useUpdateVitalSign = () => {
  const [updateVitalSign] = useMutation(UPDATE_VITAL_SIGN);
  const navigate = useNavigate();

  const handleUpdate = (
    id: String,
    temperature: RefObject<HTMLInputElement>,
    bloodPressure: RefObject<HTMLInputElement>,
    heartRate: RefObject<HTMLInputElement>,
    respiratoryRate: RefObject<HTMLInputElement>
  ) => {
    updateVitalSign({
      variables: {
        id,
        temperature: parseFloat(temperature.current!.value),
        bloodPressure: bloodPressure.current!.value,
        heartRate: parseFloat(heartRate.current!.value),
        respiratoryRate: parseFloat(respiratoryRate.current!.value),
      },
    });

    navigate("/");
  };

  return handleUpdate;
};

const useGetVitalSignById = (id: String): VitalSignData | undefined => {
  if (id) {
    const { data } = useQuery<VitalSignData>(GET_VITAL_SIGN_BY_ID, {
      variables: { id },
    });
    return data;
  }
  return undefined;
};

const useGetVitalSigns = () => {
  return useQuery(VITAL_SIGNS);
};

export {
  useAddVitalSign,
  useUpdateVitalSign,
  useGetVitalSignById,
  useGetVitalSigns,
};
