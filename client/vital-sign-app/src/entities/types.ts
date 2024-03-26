export interface VitalSign {
  id: string;
  temperature: number;
  bloodPressure: string;
  heartRate: number;
  respiratoryRate: number;
}

export interface VitalSignsData {
  vitalSigns: VitalSign[];
}

export interface VitalSignData {
  vitalSign: VitalSign;
}
