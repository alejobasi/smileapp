import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { TimerComponent } from './components/timer/timer.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'appointment', component: AppointmentFormComponent },
  { path: 'timer', component: TimerComponent },
  { path: '**', redirectTo: '/login' }
];
