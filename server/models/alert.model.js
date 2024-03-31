import { model, Schema } from "mongoose";

const alertSchema = new Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    responderName: {
      type: String,
      required: true,
    },
    responderPhone: {
      type: String,
      required: true,
    },
    responderAddress: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "alerts",
  }
);

const Alert = model("Alert", alertSchema);

export default Alert;
