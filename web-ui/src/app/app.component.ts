import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProgressBarService } from './shared/progress-bar.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth/services/authentication.service';
import { Router } from '@angular/router';
import { AuthorisationService } from './auth/services/authorisation.service';
import { UserDTO } from './api/models/user-dto';
import { UserService } from './auth/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Cards';

  public readonly loading$: Observable<boolean>;
  public readonly loggedIn$: Observable<boolean>;
  public readonly user$: Observable<UserDTO>;

  constructor(
    private authenticationService: AuthenticationService,
    private authorisationService: AuthorisationService,
    private userService: UserService,
    private router: Router,
    private progressBar: ProgressBarService
  ) {
    this.loading$ = this.progressBar.isLoading$;

    this.loggedIn$ = this.authorisationService.loggedIn$;
    this.user$ = this.userService.user$;
  }

  ngOnInit(): void {
  }

  logOut($event): void {
    $event.preventDefault();

    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');
  }
}
