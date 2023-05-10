import { Component } from '@angular/core';


interface Option{
  id:number;
  name:string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

doctors:Option[]=[
   {id;1,name:'antonio'}
   {id:2, name:'angel'}
  ];


  patients:Option[]=[
    {id;1,name:'antonio'}
    {id:2, name:'angel'}
   ];


  selectedDctorId?:number;
  selectedPatientId?:number;


  title = 'proyect';
}
