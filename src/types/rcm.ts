
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  insuranceGroupNumber?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  medicalHistory?: string[];
  allergies?: string[];
  currentMedications?: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  time: string;
  duration: number; // in minutes
  provider: string;
  reasonForVisit: string;
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show";
  notes?: string;
}

export interface InsuranceVerification {
  id: string;
  patientId: string;
  insuranceProvider: string;
  policyNumber: string;
  subscriberName: string;
  subscriberId: string;
  groupNumber?: string;
  coverageStartDate: string;
  coverageEndDate: string;
  status: "active" | "inactive" | "pending" | "expired";
  deductible: number;
  deductibleMet: number;
  copay: number;
  coinsurance: number;
  outOfPocketMax: number;
  outOfPocketMet: number;
  authorizedServices: string[];
  preAuthorizationRequired: boolean;
  notes?: string;
  verifiedBy: string;
  verifiedDate: string;
}

export interface Payment {
  id: string;
  patientId: string;
  appointmentId?: string;
  amount: number;
  paymentType: "copay" | "coinsurance" | "self-pay" | "deductible" | "other";
  paymentMethod: "cash" | "credit_card" | "check" | "electronic" | "other";
  transactionId?: string;
  date: string;
  notes?: string;
  receivedBy: string;
}

export interface MedicalCode {
  code: string;
  description: string;
  type: "ICD-10" | "CPT" | "HCPCS";
  amount?: number;
}

export interface MedicalClaim {
  id: string;
  patientId: string;
  appointmentId: string;
  providerId: string;
  insuranceId: string;
  billingDate: string;
  submissionDate?: string;
  claimNumber?: string;
  diagnosesCodes: string[]; // ICD-10 codes
  procedureCodes: string[]; // CPT codes
  chargeAmount: number;
  status: "draft" | "ready" | "submitted" | "in-process" | "denied" | "partially-paid" | "paid" | "appealed";
  denialReason?: string;
  notes?: string;
}

export interface ClaimPayment {
  id: string;
  claimId: string;
  amount: number;
  paymentDate: string;
  checkNumber?: string;
  insurancePaid: number;
  patientResponsibility: number;
  adjustments: number;
  postingDate: string;
  postedBy: string;
  notes?: string;
}
