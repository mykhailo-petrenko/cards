import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { RegistrationControllerService } from '../../../api/services';
import AddUserUsingPOSTParams = RegistrationControllerService.AddUserUsingPOSTParams;
import { ProgressBarService } from '../../../shared/progress-bar.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  public readonly form: FormGroup;

  constructor(
    private registrationController: RegistrationControllerService,
    private fb: FormBuilder,
    private router: Router,
    private progressBar: ProgressBarService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public registration(): void {
    if (!this.form.valid) {
      return;
    }

    this.progressBar.loading();

    this.registrationController.addUserUsingPOST({
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    } as AddUserUsingPOSTParams).toPromise().then(
      (response) => {
        this.progressBar.loaded();

        return this.router.navigateByUrl('/login');
      },
      (error) => {
        this.snackBar.open(error && error.error && error.error.message, 'ok');

        console.error(error);
        // @TODO: Error notification

        this.progressBar.loaded();
      }
    );
  }
}
