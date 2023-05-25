import { Component } from '@angular/core';
import{FormControl,FormGroup} from "@angular/forms"
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment';
import { Doctor } from '../doctor/doctor';
import { Patient } from '../patient/patient';
import { DatePipe } from '@angular/common';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';



interface Option{
  id:number;
  name:string;
}

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent  {
  appointments: any=[]
  selectedAppointment?: Appointment;
  appointmentId?: number;
  datePicked: any;

  appointmentForm= new FormGroup({
  patient: new FormControl(""),
  doctor: new FormControl(""),
  appointmentDate: new FormControl(""),

  });

  appointmentFormEdit= new FormGroup({
    id:new FormControl(""),
    patient: new FormControl(""),
    doctor: new FormControl(""),
    appointmentDate: new FormControl(""),
  });

  doctors:Option[]=[]
   
 
 
   patients:Option[]=[
     
    ];
 

  constructor(private appointmentService:AppointmentService,private datepipe: DatePipe, private doctorService:DoctorService, private patientService:PatientService){
    
  }

  ngOnInit(): void {
    this.getAppointment();
    this.doctorService.findAll().subscribe(doctors => {this.doctors = doctors})
    this.patientService.findAll().subscribe(patients => {this.patients = patients})
  }

  getAppointment()
  {
    this.appointmentService.findAll().subscribe(
      res=>{
        this.appointments=res;
        console.log(res);
      },
      err=>console.log(err)
    );
  }

  changeAppointment(id: number): void{
    this.appointmentId= id;
    console.log(this.appointmentId);
    }


  addAppointment(): void {
    
    if (!this.appointmentForm.get('doctor')?.value && !this.appointmentForm.get('patient')?.value && !this.appointmentForm.get('appointmentDate')?.value) { return; }
    const appointmentCreate:Appointment ={
      doctor: this.appointmentForm.get('doctor')?.value as unknown as Doctor,
      patient: this.appointmentForm.get('patient')?.value  as unknown as Patient,
      appointmentDate: this.datepipe.transform(this.appointmentForm.get('appointmentDate')?.value as unknown as Date, 'dd/MM/yyyy') ||''
     
    }
     this.appointmentService.saveAppointment(appointmentCreate);
}

  deleteAppointment(appointment:Appointment): void{
    this.appointments = this.appointments.filter((f:Appointment) => f !== appointment);
    this.appointmentService.deleteAppointment(appointment.id as unknown as number).subscribe();
  }


  editAppointment(): void {
    if (!this.appointmentFormEdit.get('doctor')?.value && !this.appointmentFormEdit.get('patient')?.value && !this.appointmentFormEdit.get('appointmentDate')?.value) { return; }
    const id = this.appointmentFormEdit.get('id')?.value as unknown as number;
  const appointmentEdit:Appointment ={
    id,
    doctor: this.appointmentFormEdit.get('doctor')?.value as unknown as Doctor,
    patient: this.appointmentFormEdit.get('patient')?.value  as unknown as Patient,
    appointmentDate: this.datepipe.transform(this.appointmentFormEdit.get('appointmentDate')?.value as unknown as Date, 'dd/MM/yyyy') ||''
    }
    this.appointmentService.editAppointment(id,appointmentEdit)

    .subscribe(Appointment => {
      this.removeElementFromArrayByIndex(Appointment.id);
      this.appointments.push(Appointment);
     });
  }

  isValidEdit(input:string){
    return !this.appointmentFormEdit.get(input)?.valid;
  }
  isValid(input:string){
    return !this.appointmentForm.get(input)?.valid;
  }

  public onDate(event: any): void {
    this.datePicked = event;
    
  }

  onSelect(appointment:Appointment): void {
    this.selectedAppointment = appointment;
    this.appointmentFormEdit.get('id')?.setValue(appointment.id?.toString()||null);
    this.appointmentFormEdit.get('doctor')?.setValue(appointment.doctor?.toString());
    this.appointmentFormEdit.get('patient')?.setValue(appointment.patient?.toString());
    this.appointmentFormEdit.get('appointmentDate')?.setValue(appointment.appointmentDate?.toString());
    this.appointmentFormEdit.updateValueAndValidity();
  }

  private removeElementFromArrayByIndex(index: number) {
    const elementIndex = this.appointments.findIndex((element: any) => element.id === index);
      if (elementIndex > -1) {
        this.appointments.splice(elementIndex, 1);
      }
  }
}