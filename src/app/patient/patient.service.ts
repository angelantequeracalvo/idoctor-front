import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of, tap } from 'rxjs';

import { Patient } from './patient';

@Injectable({ providedIn: 'root' })
export class PatientService {

  private url='http://localhost:8080/api/patient';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.url)
    .pipe(
      tap(_ => this.log('fetched bands')),
      catchError(this.handleError<Patient[]>('findAll', []))
    )
  }

  getPatient(id: string):Observable<any> {
    return this.http.get(this.url+'/'+id);
  }

  savePatient(patient:Patient):Observable<any> {
    return this.http.post(this.url, patient);
  }

  editPatient(id:number, patient: Patient):Observable<any> {
    return this.http.put(this.url+'/'+id, patient);
  }

  deletePatient(id:number):Observable<any> {
    return this.http.delete(this.url+'/'+id);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`HeroService: ${message}`);
  }

}