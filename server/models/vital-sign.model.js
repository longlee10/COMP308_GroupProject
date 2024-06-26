import { model, Schema } from "mongoose";

const vitalSignSchema = new Schema(
  {
    temperature: {
      type: Number,
      required: true,
    },
    bloodPressure: {
      type: Number,
      required: true,
    },
    heartRate: {
      type: Number,
      required: true,
    },
    respiratoryRate: {
      type: Number,
      required: true,
    },
    oxygenSaturation: {
      type: Number,
      required: true,
    },
    disease: {
      type: Boolean,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "vitalSigns",
  }
);

const VitalSign = model("VitalSign", vitalSignSchema);

export default VitalSign;
