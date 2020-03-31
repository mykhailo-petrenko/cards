import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegistrationControllerService } from '../../../api/services';
import AddUserUsingPOSTParams = RegistrationControllerService.AddUserUsingPOSTParams;
import { ProgressBarService } from '../../../shared/progress-bar.service';
import { AbstractComponent } from '../../../utils/abstract.component';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends AbstractComponent {
  public readonly form: FormGroup;

  constructor(
    private registrationController: RegistrationControllerService,
    private fb: FormBuilder,
    private router: Router,
    private progressBar: ProgressBarService,
    private notification: NotificationService
  ) {
    super(progressBar);

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.disableFormControlsWhileLoading(this.form);
  }

  public registration(): void {
    if (!this.form.valid) {
      return;
    }

    this.loading();

    this.registrationController.addUserUsingPOST({
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    } as AddUserUsingPOSTParams).toPromise().then(
      () => {
        this.loaded();

        this.notification.success(`Your profile Successfully created! Please Log In!`);

        return this.router.navigateByUrl('/login');
      },
      (error) => {
        this.notification.error(error && error.message);

        console.error(error);
        // @TODO: Error notification

        this.loaded();
      }
    );
  }
}
