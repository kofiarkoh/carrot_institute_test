import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService) {}

  login() {
    this.authService
      .login({
        email: this.loginForm.value.email!!,
        password: this.loginForm.value.password!!,
      })
      .subscribe({
        next(value) {
          console.log(value);
        },
        error(err) {
          console.log(err.error.errors);
        },
        complete() {},
      });
  }
}
