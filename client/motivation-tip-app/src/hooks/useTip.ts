import { useQuery, useMutation } from "@apollo/client";
import {
  TIPS,
  CREATE_TIP,
  EDIT_TIP,
  TIP_BY_ID,
  DELETE_TIP,
} from "../queries/tipQueries";
import {
  DailyTipsData,
  DailyTipFormData,
  DailyTipData,
} from "../entities/types";

const useGetTip = () => {
  return useQuery<DailyTipsData>(TIPS);
};

const useGetTipById = (id: string) => {
  return useQuery<DailyTipData>(TIP_BY_ID, {
    variables: { id },
  });
};

const useAddTip = () => {
  const [addTipMutation] = useMutation<DailyTipFormData>(CREATE_TIP);

  const addTip = async (tipData: DailyTipFormData) => {
    const { data } = await addTipMutation({
      variables: tipData,
    });
    return data;
  };
  return addTip;
};

const useEditTip = () => {
  const [editTipMutation] = useMutation<DailyTipFormData>(EDIT_TIP);

  const editTip = async (id: string, tipData: DailyTipFormData) => {
    const { data } = await editTipMutation({
      variables: { id, ...tipData },
    });
    return data;
  };
  return editTip;
};

const useDeleteTip = () => {
  const [deleteTipMutation] = useMutation(DELETE_TIP);

  const deleteTip = async (id: string) => {
    const { data } = await deleteTipMutation({
      variables: { id },
    });
    return data;
  };
  return deleteTip;
};

export { useGetTip, useAddTip, useEditTip, useGetTipById, useDeleteTip };
