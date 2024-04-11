export interface Alert {
  id: string;
  patientName: string;
  responderName: string;
  responderPhone: string;
  responderAddress: string;
  message: string;
}

export interface AlertsData {
  alerts: Alert[];
}

export interface AlertData {
  alert: Alert;
}

export interface AlertFormData {
  patientName: string;
  responderName: string;
  responderPhone: string;
  responderAddress: string;
  message: string;
}
