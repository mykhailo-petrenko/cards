import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthenticationService } from '../../services/authentication.service';
import { ProgressBarService } from '../../../shared/progress-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public readonly form: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private progressBar: ProgressBarService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false, []]
    });
  }

  authenticate() {
    if (!this.form.valid) {
      return;
    }

    this.progressBar.loading();

    this.authenticationService.logIn({
      email: this.form.value.email,
      password: this.form.value.password,
      rememberMe: this.form.value.rememberMe
    }).then(
      () => {
        this.progressBar.loaded();

        return this.router.navigateByUrl('/');
      },
      (error) => {
        this.snackBar.open(error && error.message, 'ok');
        console.error(error);
        // @TODO: Error notification

        this.progressBar.loaded();
      }
    );
  }
}

