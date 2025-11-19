import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';

interface Appointment {
  patientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  hygienist: string;
  notes: string;
}

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent {
  appointment: Appointment = {
    patientName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    hygienist: '',
    notes: ''
  };

  services = [
    { value: 'limpieza', label: 'Limpieza Dental' },
    { value: 'revision', label: 'Revisión General' },
    { value: 'obturacion', label: 'Obturación' },
    { value: 'endodoncia', label: 'Endodoncia' },
    { value: 'implantes', label: 'Implantes Dentales' },
    { value: 'extraccion', label: 'Extracción' },
    { value: 'urgencia', label: 'Urgencia' }
  ];

  hygienists = [
    { value: 'desiree', label: 'Desirée' },
    { value: 'marta', label: 'Marta' }
  ];

  timeSlots = [
    // Horario de mañana: 9:00 a 14:00
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00',
    // Horario de tarde: 17:00 a 20:30
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30'
  ];

  isSubmitting: boolean = false;
  showSuccess: boolean = false;
  errorMessage: string = '';
  toothMood: 'happy' | 'sad' = 'happy';

  constructor (
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit () {
    if (!this.validateForm()) {
      this.toothMood = 'sad';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.toothMood = 'happy';

    this.appointmentService.createAppointment(this.appointment).subscribe({
      next: () => {
        this.showSuccess = true;
        this.isSubmitting = false;
        this.toothMood = 'happy';

        setTimeout(() => {
          this.resetForm();
          this.showSuccess = false;
        }, 3000);
      },
      error: (error) => {
        this.errorMessage = 'Error al crear la cita. Por favor, inténtalo de nuevo.';
        this.isSubmitting = false;
        this.toothMood = 'sad';
      }
    });
  }

  validateForm (): boolean {
    if (!this.appointment.patientName || !this.appointment.email ||
      !this.appointment.phone || !this.appointment.date ||
      !this.appointment.time || !this.appointment.service ||
      !this.appointment.hygienist) {
      this.errorMessage = 'Por favor, completa todos los campos obligatorios';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.appointment.email)) {
      this.errorMessage = 'Por favor, introduce un email válido';
      return false;
    }

    return true;
  }

  resetForm () {
    this.appointment = {
      patientName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      service: '',
      hygienist: '',
      notes: ''
    };
    this.toothMood = 'happy';
  }

  logout () {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Método para cambiar el estado del diente cuando hay errores
  onFieldChange () {
    if (this.errorMessage) {
      this.errorMessage = '';
      this.toothMood = 'happy';
    }
  }
}
