import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnDestroy {
  totalSeconds = 180; // 3 minutos
  remainingSeconds = 180;
  isRunning = false;
  isPaused = false;
  currentTip = '';
  progress = 0;
  private intervalId: any;

  tips = [
    '🦷 ¡Cepilla en círculos suaves!',
    '✨ No olvides la parte de atrás de tus dientes',
    '🎵 ¡Sigue el ritmo de tu canción favorita!',
    '🌟 ¡Llegas a la mitad! ¡Sigue así!',
    '🦷 Cepilla también tu lengua',
    '💪 ¡Estás haciendo un trabajo genial!',
    '😁 No presiones muy fuerte',
    '🌈 Cepilla arriba y abajo suavemente',
    '⭐ ¡Ya casi terminas! ¡Eres increíble!',
    '🎉 ¡Último esfuerzo! ¡Lo estás haciendo perfecto!'
  ];

  constructor (
    private authService: AuthService,
    private router: Router
  ) {
    this.currentTip = this.tips[0];
  }

  startTimer () {
    if (this.isRunning && !this.isPaused) return;

    if (!this.isPaused) {
      this.remainingSeconds = this.totalSeconds;
    }

    this.isRunning = true;
    this.isPaused = false;
    this.updateTip();

    this.intervalId = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.progress = ((this.totalSeconds - this.remainingSeconds) / this.totalSeconds) * 100;

        // Cambiar consejo cada 20 segundos
        if (this.remainingSeconds % 20 === 0) {
          this.updateTip();
        }
      } else {
        this.completeTimer();
      }
    }, 1000);
  }

  pauseTimer () {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.isPaused = true;
      this.isRunning = false;
    }
  }

  resetTimer () {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.remainingSeconds = this.totalSeconds;
    this.isRunning = false;
    this.isPaused = false;
    this.progress = 0;
    this.currentTip = this.tips[0];
  }

  completeTimer () {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.isRunning = false;
    this.isPaused = false;
    this.currentTip = '🎉 ¡Felicidades! ¡Tus dientes están súper limpios! ✨';
  }

  updateTip () {
    const tipIndex = Math.floor((this.totalSeconds - this.remainingSeconds) / 20);
    if (tipIndex < this.tips.length) {
      this.currentTip = this.tips[tipIndex];
    }
  }

  get minutes (): number {
    return Math.floor(this.remainingSeconds / 60);
  }

  get seconds (): number {
    return this.remainingSeconds % 60;
  }

  get formattedTime (): string {
    const mins = this.minutes.toString().padStart(2, '0');
    const secs = this.seconds.toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  logout () {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy () {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
