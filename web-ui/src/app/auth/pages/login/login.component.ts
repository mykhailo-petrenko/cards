import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { ProgressBarService } from '../../../shared/progress-bar.service';
import { AbstractComponent } from '../../../utils/abstract.component';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AbstractComponent {

  public readonly form: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private progressBar: ProgressBarService,
    private notification: NotificationService
  ) {
    super(progressBar);

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false, []]
    });

    this.disableFormControlsWhileLoading(this.form);
  }

  authenticate() {
    if (!this.form.valid) {
      return;
    }

    this.loading();

    this.authenticationService.logIn({
      email: this.form.value.email,
      password: this.form.value.password,
      rememberMe: this.form.value.rememberMe
    }).then(
      () => {
        this.loaded();

        return this.router.navigateByUrl('/');
      },
      (error) => {
        this.notification.error(`Login or Password incorrect :o(`);

        console.error(error);
        // @TODO: Error notification

        this.loaded();
      }
    );
  }
}

