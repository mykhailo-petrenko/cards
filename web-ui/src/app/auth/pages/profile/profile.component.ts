import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractComponent } from '../../../utils/abstract.component';
import { ProgressBarService } from '../../../shared/progress-bar.service';
import { NotificationService } from '../../../shared/notification.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { UserDTO } from '../../../api/models/user-dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends AbstractComponent implements OnInit, OnDestroy {

  public user$: Observable<UserDTO>;

  public userInfo: FormGroup;
  public userPassword: FormGroup;

  constructor(
    private userService: UserService,
    private progressBar: ProgressBarService,
    private notification: NotificationService,
    private fb: FormBuilder
  ) {
    super(progressBar);

    this.user$ = this.userService.user$;

    this.userInfo = this.fb.group({
      name: ['', [Validators.required]],
    });

    this.userPassword = this.fb.group({
      password: ['', [Validators.required]]
    });

    this.subscription = this.user$.subscribe((user: UserDTO) => {
      this.userInfo.setValue({
        name: user?.name || ''
      });
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  userInfoSubmit() {
    if (this.userInfo.invalid) {
      return;
    }

    this.loading();

    this.userService.updateUserInfo({
      name: this.userInfo.value.name
    }).then(
      () => {
        this.loaded();
      },
      () => {
        this.loaded();
      }
    )
  }

  cancelUserInfo($event) {
    $event.preventDefault();

    this.userPassword.reset();
  }

  userPasswordSubmit() {
    if (this.userPassword.invalid) {
      return;
    }

    this.loading();

    this.userService.updatePassword(this.userPassword.value.password).then(
      () => {
        this.userPassword.reset();
        this.userPassword.markAsUntouched();
        this.userPassword.clearValidators();
        this.loaded();
      },
      () => {
        this.loaded();
      }
    );
  }

  cancelPassword($event) {
    $event.preventDefault();

    this.userPassword.reset();
  }

}
