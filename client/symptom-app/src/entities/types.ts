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
