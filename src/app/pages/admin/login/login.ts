import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email    = '';
  password = '';
  error    = '';
  loading  = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error   = '';

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: () => {
        this.error   = 'Email ou mot de passe incorrect.';
        this.loading = false;
      }
    });
  }
}