import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor (@Inject(PLATFORM_ID) private platformId: Object) {
    // Solo acceder a localStorage en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const savedAuth = localStorage.getItem('isAuthenticated');
      if (savedAuth === 'true') {
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  login (email: string, password: string): Observable<boolean> {
    return of(true).pipe(delay(800));
  }

  setAuthenticated (value: boolean): void {
    this.isAuthenticatedSubject.next(value);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isAuthenticated', value.toString());
    }
  }

  logout (): void {
    this.isAuthenticatedSubject.next(false);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isAuthenticated');
    }
  }

  isLoggedIn (): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
