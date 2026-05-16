import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  loading = signal(false);
  errorMessage = '';
  resetSent = signal(false);
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage = '';
    this.resetSent.set(false);
    setTimeout(() => {
      this.loading.set(false);
      this.router.navigate(['/']);
    }, 800);
  }

  forgotPassword(): void {
    if (!this.email.value || this.email.invalid) {
      this.errorMessage = 'Enter your work email above first.';
      this.email.markAsTouched();
      return;
    }
    this.errorMessage = '';
    this.resetSent.set(true);
    setTimeout(() => this.resetSent.set(false), 4500);
  }
}
