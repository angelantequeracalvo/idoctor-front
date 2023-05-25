import { Component } from '@angular/core';
import { Appointment } from '../appointment/appointment';
import { AppointmentService } from '../appointment/appointment.service';
import { Doctor } from '../doctor/doctor';
import { DoctorService } from '../doctor/doctor.service';

@Component({
  selector: 'app-list-appoinment',
  templateUrl: './list-appoinment.component.html',
  styleUrls: ['./list-appoinment.component.css']
})
export class ListAppointmentComponent {

  appointments: Appointment []=[];

  displayedColumns: string[] = ['id', 'doctor', 'patient', 'appointmentDate'];

  doctors: Doctor []= [];

  constructor(private appointmentService:AppointmentService, private doctorService:DoctorService){
  }

  ngOnInit(){
    this.appointmentService.findAll().subscribe(list => {
      this.appointments = list;
      console.log(this.appointments)
    });

    this.doctorService.findAll().subscribe(list => {
      this.doctors= list;
      console.log(this.doctors)
  });

  }
}
