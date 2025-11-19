import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor (
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit () {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulamos un login
    this.authService.login(this.email, this.password).subscribe({
      next: (success) => {
        if (success) {
          this.authService.setAuthenticated(true);
          this.router.navigate(['/appointment']);
        } else {
          this.errorMessage = 'Credenciales incorrectas';
          this.isLoading = false;
        }
      },
      error: () => {
        this.errorMessage = 'Error al iniciar sesión';
        this.isLoading = false;
      }
    });
  }
}
