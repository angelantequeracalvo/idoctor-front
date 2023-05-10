import { Component } from '@angular/core';
import { Patient} from './patient';
import{FormControl,FormGroup} from "@angular/forms"
import { PatientService } from './patient.service';




@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent  {
  patients: any=[]
  selectedPatient?: Patient;

  patientForm= new FormGroup({
  name:new FormControl(""),
  surname: new FormControl(""),
  age: new FormControl(""),
  dni: new FormControl(""),

  });

  patientFormEdit= new FormGroup({
    name:new FormControl(""),
    surname: new FormControl(""),
    age: new FormControl(""),
    dni: new FormControl(""),

  });

  constructor(private patientService:PatientService){}

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient()
  {
    this.patientService.findAll().subscribe(
      res=>{
        this.patients=res;
        console.log(res);
      },
      err=>console.log(err)
    );
  }


  addPatient(name: string, surname: string, age:number, dni:string): void {
    name = name.trim();
    if (!name && !surname &&  !age && !dni) { return; }
    this.patientService.savePatient({ name, surname, age, dni } as Patient)
    .subscribe({
      next: response => {
        this.patients.push(response);
      }
    })
    }


  deletePatient(patient:Patient): void{
    this.patients = this.patients.filter((f:Patient) => f !== patient);
    this.patientService.deletePatient(patient.id).subscribe();
  }


  editPatient(id: number, name: string, surname: string, age:number, dni:string): void {
    name = name.trim();
    console.log(id);
    if (!name || !surname || !age ||!dni) { return; }
    this.patientService.editPatient(id, {name, surname, age, dni } as Patient)//
    .subscribe(patient => {
      this.removeElementFromArrayByIndex(patient.id);
      this.patients.push(patient);
     });
  }

  onSelect(patient:Patient): void {
    this.selectedPatient = patient;
    this.patientFormEdit.get('name')?.setValue(patient.name);
    this.patientFormEdit.get('surname')?.setValue(patient.surname);
    this.patientFormEdit.get('age')?.setValue(patient.age?.toString());
    this.patientFormEdit.get('dni')?.setValue(patient.dni);
    this.patientFormEdit.updateValueAndValidity();
  }

  private removeElementFromArrayByIndex(index: number) {
    const elementIndex = this.patients.findIndex((element: any) => element.id === index);
      if (elementIndex > -1) {
        this.patients.splice(elementIndex, 1);
      }
  }
}