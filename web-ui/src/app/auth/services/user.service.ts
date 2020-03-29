import { Injectable } from '@angular/core';
import { AuthorisationService } from './authorisation.service';
import { UserControllerService } from '../../api/services';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserDTO } from '../../api/models/user-dto';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public get user$(): Observable<UserDTO> {
    return this._user$.asObservable();
  }

  private _user$: Subject<UserDTO> = new BehaviorSubject<UserDTO>(null);

  constructor(
    private authorisationService: AuthorisationService,
    private userControllerService: UserControllerService
  ) {
    this.updateUserInfo().then((isLoggedIn: boolean) => {
      this.authorisationService.setLoggedIn(true);
    });

    this.authorisationService.loggedIn$
      .pipe(
        distinctUntilChanged()
      )
      .subscribe((isLoggedIn: boolean): void => {
        if (isLoggedIn) {
          this.updateUserInfo()
        } else {
          this._user$.next(null);
        }
      });
  }

  private getUserInfo(): Promise<UserDTO> {
    return this.userControllerService.getMyInfoUsingGET().toPromise();
  }

  private updateUserInfo(): Promise<boolean> {
    return this.getUserInfo()
      .then(
        (user: UserDTO) => {
          this._user$.next(user);
          return true;
        },
        () => {
          return false;
        }
      );
  }
}
