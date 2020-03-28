import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProgressBarService } from './shared/progress-bar.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Cards';

  public readonly loading$: Observable<boolean>;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private progressBar: ProgressBarService
  ) {
    this.loading$ = this.progressBar.isLoading$;
  }

  ngOnInit(): void {
  }

  logOut($event): void {
    $event.preventDefault();

    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');
  }
}
