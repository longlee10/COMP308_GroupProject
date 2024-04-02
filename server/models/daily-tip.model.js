import { model, Schema } from "mongoose";

const dailyTipSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "tips",
  }
);

const DailyTip = model("DailyTip", dailyTipSchema);

export default DailyTip;
