export interface Checklist {
  id: string;
  patientName: string;
  selectedSymptoms: string[];
}

export interface ChecklistsData {
  checklists: Checklist[];
}

export interface ChecklistData {
  checklist: Checklist;
}

export interface ChecklistFormData {
  patientName: string;
  selectedSymptoms: string[];
}

export const symptoms = [
  {
    id: "Fever",
    label: "Fever",
  },
  {
    id: "Chills",
    label: "Chills",
  },
  {
    id: "Cough",
    label: "Cough",
  },
  {
    id: "Shortness of breath",
    label: "Shortness of breath",
  },
  {
    id: "Fatigue",
    label: "Fatigue",
  },
  {
    id: "Body aches",
    label: "Body aches",
  },
  {
    id: "Loss of taste",
    label: "Loss of taste",
  },
  {
    id: "Loss of smell",
    label: "Loss of smell",
  },
  {
    id: "Sore throat",
    label: "Sore throat",
  },
  {
    id: "Congestion",
    label: "Congestion",
  },
  {
    id: "Runny nose",
    label: "Runny nose",
  },
  {
    id: "Nausea",
    label: "Nausea",
  },
  {
    id: "Vomiting",
    label: "Vomiting",
  },
  {
    id: "Diarrhea",
    label: "Diarrhea",
  },
];
