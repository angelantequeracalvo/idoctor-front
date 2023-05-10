import { Component } from '@angular/core';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor';
import{FormControl,FormGroup} from "@angular/forms"




@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent  {
  doctors: any=[]
  selectedDoctor?: Doctor;

  doctorForm= new FormGroup({
  name:new FormControl(""),
  surname: new FormControl(""),
  age: new FormControl(""),

  });

  doctorFormEdit= new FormGroup({
  name:new FormControl(""),
  surname: new FormControl(""),
  age: new FormControl(""),

  });

  constructor(private doctorService:DoctorService){}

  ngOnInit(): void {
    this.getDoctor();
  }

  getDoctor()
  {
    this.doctorService.findAll().subscribe(
      res=>{
        this.doctors=res;
        console.log(res);
      },
      err=>console.log(err)
    );
  }


  addDoctor(name: string, surname: string, age:number): void {
    name = name.trim();
    if (!name && !surname &&  !age) { return; }
    this.doctorService.saveDoctor({ name, surname, age } as Doctor)
    .subscribe({
      next: response => {
        this.doctors.push(response);
      }
    })
    }


  deleteDoctor(doctor:Doctor): void{
    this.doctors = this.doctors.filter((f:Doctor) => f !== doctor);
    this.doctorService.deleteDoctor(doctor.id).subscribe();
  }


  editDoctor (id: number, name: string, surname: string, age:number): void {
    name = name.trim();
    console.log(id);
    if (!name || !surname || !age) { return; }
    this.doctorService.editDoctor(id, {name, surname, age } as Doctor)//
    .subscribe(doctor => {
      this.removeElementFromArrayByIndex(doctor.id);
      this.doctors.push(doctor);
     });
  }

  onSelect(doctor:Doctor): void {
    this.selectedDoctor = doctor;
    this.doctorFormEdit.get('name')?.setValue(doctor.name);
    this.doctorFormEdit.get('surname')?.setValue(doctor.surname);
    this.doctorFormEdit.get('age')?.setValue(doctor.age?.toString());
    this.doctorFormEdit.updateValueAndValidity();
  }

  private removeElementFromArrayByIndex(index: number) {
    const elementIndex = this.doctors.findIndex((element: any) => element.id === index);
      if (elementIndex > -1) {
        this.doctors.splice(elementIndex, 1);
      }
  }
}
// funciones de lista


