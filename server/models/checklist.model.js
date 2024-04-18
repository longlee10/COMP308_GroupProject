import { model, Schema } from "mongoose";

const commonSymptoms = [
  "Fever",
  "Chills",
  "Cough",
  "Shortness of breath",
  "Fatigue",
  "Body aches",
  "Loss of taste",
  "Loss of smell",
  "Sore throat",
  "Congestion",
  "Runny nose",
  "Nausea",
  "Vomiting",
  "Diarrhea",
];

const checklistSchema = new Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    selectedSymptoms: {
      type: [String],
      enum: commonSymptoms,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "checklists",
  }
);

const Checklist = model("Checklist", checklistSchema);

export default Checklist;
