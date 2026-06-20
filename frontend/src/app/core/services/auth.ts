
// ════════════════════════════════════════
// src/app/core/services/auth.service.ts
// ════════════════════════════════════════
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginPayload } from '../models/auth.model';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = environment.apiUrl;

  // Signal réactif — true si connecté
  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  constructor(private http: HttpClient, private router: Router) {}

  login(payload: LoginPayload) {
    return this.http.post<AuthResponse>(`${this.url}/login`, payload).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.isLoggedIn.set(true);
      })
    );
  }

  logout() {
    return this.http.post(`${this.url}/logout`, {}).pipe(
      tap(() => this.clear())
    );
  }

  clear() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn.set(false);
    this.router.navigate(['/admin/login']);
  }

  getUser() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }
}