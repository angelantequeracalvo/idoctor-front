import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of, tap } from 'rxjs';

import { Doctor } from './doctor';

@Injectable({ providedIn: 'root' })
export class DoctorService {

  private url='http://localhost:8080/api/doctor';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.url)
    .pipe(
      tap(_ => this.log('fetched bands')),
      catchError(this.handleError<Doctor[]>('findAll', []))
    )
  }

  getDoctor(id: string):Observable<any> {
    return this.http.get(this.url+'/'+id);
  }

  saveDoctor(doctor:Doctor):Observable<any> {
    return this.http.post(this.url, doctor);
  }

  editDoctor(id:number, doctor: Doctor):Observable<any> {
    return this.http.put(this.url+'/'+id, doctor);
  }

  deleteDoctor(id:number):Observable<any> {
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

