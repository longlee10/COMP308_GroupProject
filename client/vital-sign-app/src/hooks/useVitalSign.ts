import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  ADD_VITAL_SIGN,
  UPDATE_VITAL_SIGN,
  GET_VITAL_SIGN_BY_ID,
  VITAL_SIGNS,
  PREDICT_DISEASE,
} from "../queries/vitalSignQueries";
import {
  PredictionData,
  VitalSignData,
  VitalSignFormData,
  VitalSignsData,
} from "../entities/types";

const useAddVitalSign = () => {
  const [addVitalSign] = useMutation(ADD_VITAL_SIGN);
  const navigate = useNavigate();

  const handleAdd = (formData: VitalSignFormData) => {
    const {
      temperature,
      bloodPressure,
      heartRate,
      respiratoryRate,
      oxygenSaturation,
    } = formData;
    addVitalSign({
      variables: {
        temperature: temperature,
        bloodPressure: bloodPressure,
        heartRate: heartRate,
        respiratoryRate: respiratoryRate,
        oxygenSaturation: oxygenSaturation,
      },
    });

    navigate("/vital-sign");
  };

  return handleAdd;
};

const useUpdateVitalSign = () => {
  const [updateVitalSign] = useMutation(UPDATE_VITAL_SIGN);
  const navigate = useNavigate();

  const handleUpdate = (id: String, formData: VitalSignFormData) => {
    const {
      temperature,
      bloodPressure,
      heartRate,
      respiratoryRate,
      oxygenSaturation,
    } = formData;
    updateVitalSign({
      variables: {
        id,
        temperature: temperature,
        bloodPressure: bloodPressure,
        heartRate: heartRate,
        respiratoryRate: respiratoryRate,
        oxygenSaturation: oxygenSaturation,
      },
    });

    navigate("/vital-sign");
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
  return useQuery<VitalSignsData>(VITAL_SIGNS);
};

const usePredictDisease = () => {
  const [predictDisease, { data, loading }] =
    useMutation<PredictionData>(PREDICT_DISEASE);

  const handlePredict = (id: String) => {
    predictDisease({
      variables: {
        id,
      },
    });
  };

  return { handlePredict, data, loading };
};

export {
  useAddVitalSign,
  useUpdateVitalSign,
  useGetVitalSignById,
  useGetVitalSigns,
  usePredictDisease,
};
