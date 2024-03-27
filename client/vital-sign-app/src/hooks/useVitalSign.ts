import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  ADD_VITAL_SIGN,
  UPDATE_VITAL_SIGN,
  GET_VITAL_SIGN_BY_ID,
  VITAL_SIGNS,
} from "../queries/vitalSignQueries";
import { VitalSignData, VitalSignFormData } from "../entities/types";

const useAddVitalSign = () => {
  const [addVitalSign] = useMutation(ADD_VITAL_SIGN);
  const navigate = useNavigate();

  const handleAdd = (formData: VitalSignFormData) => {
    const { temperature, bloodPressure, heartRate, respiratoryRate } = formData;
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
  };

  return handleAdd;
};

const useUpdateVitalSign = () => {
  const [updateVitalSign] = useMutation(UPDATE_VITAL_SIGN);
  const navigate = useNavigate();

  const handleUpdate = (id: String, formData: VitalSignFormData) => {
    const { temperature, bloodPressure, heartRate, respiratoryRate } = formData;
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
