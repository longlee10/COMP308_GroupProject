export interface CHECK_LIST {
  id: string;
  patientName: string;
  selectedSymptoms: string[];
}

export interface CHECK_LISTS_DATA {
  checklists: CHECK_LIST[];
}

export interface CHECK_LIST_DATA {
  checklist: CHECK_LIST;
}
