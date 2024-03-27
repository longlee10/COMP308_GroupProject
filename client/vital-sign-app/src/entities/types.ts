import { RefObject } from "react";

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

export interface VitalSignFormData {
  temperature: RefObject<HTMLInputElement>;
  bloodPressure: RefObject<HTMLInputElement>;
  heartRate: RefObject<HTMLInputElement>;
  respiratoryRate: RefObject<HTMLInputElement>;
}
