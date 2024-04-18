export interface VitalSign {
  id: string;
  temperature: number;
  bloodPressure: number;
  heartRate: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  disease: boolean;
  patient: Patient;
}

export interface VitalSignsData {
  vitalSigns: VitalSign[];
}

export interface VitalSignData {
  vitalSign: VitalSign;
}

export interface VitalSignFormData {
  temperature: number;
  bloodPressure: number;
  heartRate: number;
  respiratoryRate: number;
  oxygenSaturation: number;
}

export interface PredictionResult {
  result: boolean;
  message: string;
}

export interface PredictionData {
  predictDisease: PredictionResult;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  phone: string;
  role: "patient" | "nurse";
}
