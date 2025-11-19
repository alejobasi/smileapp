import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Appointment {
  patientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointments: Appointment[] = [];

  constructor () { }

  createAppointment (appointment: Appointment): Observable<boolean> {
    // En producción, aquí harías una llamada HTTP a tu backend
    return new Observable(observer => {
      setTimeout(() => {
        this.appointments.push(appointment);
        console.log('Cita creada:', appointment);
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  getAppointments (): Observable<Appointment[]> {
    return of(this.appointments).pipe(delay(500));
  }
}
