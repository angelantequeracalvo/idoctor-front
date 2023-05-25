import { Doctor } from "../doctor/doctor";
import { Patient } from "../patient/patient";

export interface Appointment {
    id?: number;
    doctor: Doctor;
    patient: Patient;
    appointmentDate:string;
  }
  