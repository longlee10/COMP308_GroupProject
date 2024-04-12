import { useQuery, useMutation } from "@apollo/client";
import { TIPS, CREATE_TIP } from "../queries/tipQueries";
import { DailyTipsData, DailyTipFormData } from "../entities/types";

const useGetTip = () => {
  return useQuery<DailyTipsData>(TIPS);
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

export { useGetTip, useAddTip };
