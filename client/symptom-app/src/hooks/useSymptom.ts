import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  ADD_CHECKLIST,
  UPDATE_CHECKLIST,
  GET_CHECKLIST_BY_ID,
  CHECKLISTS,
  DELETE_CHECKLIST,
} from "../queries/checklistQueries";
import {
  ChecklistData,
  ChecklistFormData,
  ChecklistsData,
} from "../entities/types";

const useAddSymptom = () => {
  const [addSymptom] = useMutation(ADD_CHECKLIST);
  const navigate = useNavigate();

  const handleAdd = (formData: ChecklistFormData) => {
    const { patientName, selectedSymptoms } = formData;
    addSymptom({
      variables: {
        patientName: patientName,
        selectedSymptoms: selectedSymptoms,
      },
    });

    navigate("/symptom");
  };

  return handleAdd;
};

const useUpdateSymptom = () => {
  const [updateSymptom] = useMutation(UPDATE_CHECKLIST);
  const navigate = useNavigate();

  const handleUpdate = (id: String, formData: ChecklistFormData) => {
    const { patientName, selectedSymptoms } = formData;
    updateSymptom({
      variables: {
        id,
        patientName: patientName,
        selectedSymptoms: selectedSymptoms,
      },
    });

    navigate("/symptom");
  };

  return handleUpdate;
};

const useGetSymptomById = (id: String): ChecklistData | undefined => {
  if (id) {
    const { data } = useQuery<ChecklistData>(GET_CHECKLIST_BY_ID, {
      variables: { id },
    });
    return data;
  }
};

const useGetSymptoms = () => {
  return useQuery<ChecklistsData>(CHECKLISTS);
};

const useDeleteSymptom = () => {
  const [deleteSymptom] = useMutation(DELETE_CHECKLIST);
  const navigate = useNavigate();

  const handleDelete = (id: String) => {
    deleteSymptom({
      variables: {
        id,
      },
    });

    navigate("/symptom");
  };

  return handleDelete;
};

export {
  useAddSymptom,
  useUpdateSymptom,
  useGetSymptomById,
  useGetSymptoms,
  useDeleteSymptom,
};
