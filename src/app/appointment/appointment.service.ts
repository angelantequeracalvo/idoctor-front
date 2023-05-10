import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of, tap } from 'rxjs';
import{Appointment} from './appointment';

@Injectable({ providedIn: 'root' })
export class AppointmentService {

  private url='http://localhost:8080/api/appointment';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.url)
    .pipe(
      tap(_ => this.log('fetched bands')),
      catchError(this.handleError<Appointment[]>('findAll', []))
    )
  }

  getAppointment(id: string):Observable<any> {
    return this.http.get(this.url+'/'+id);
  }

  saveAppointment(appointment:Appointment):Observable<any> {
    return this.http.post(this.url, appointment);
  }

  editAppointment(id:number, appointment: Appointment):Observable<any> {
    return this.http.put(this.url+'/'+id, appointment);
  }

  deleteAppointment(id:number):Observable<any> {
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