import { Injectable } from '@angular/core';
import { AuthorisationService } from './authorisation.service';
import { UserControllerService } from '../../api/services';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserDTO } from '../../api/models/user-dto';
import { distinctUntilChanged, tap } from 'rxjs/operators';

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
    this.loadUserInfo().then((isLoggedIn: boolean) => {
      this.authorisationService.setLoggedIn(isLoggedIn);
    });

    this.authorisationService.loggedIn$
      .pipe(
        distinctUntilChanged()
      )
      .subscribe((isLoggedIn: boolean): void => {
        if (isLoggedIn) {
          this.loadUserInfo();
        } else {
          this._user$.next(null);
        }
      });
  }

  public updateUserInfo(userDTO: UserDTO): Promise<UserDTO> {
    return this.userControllerService.updateMyInfoUsingPOST({
      userDTO
    })
      .pipe(
        tap((user: UserDTO) => {
          this._user$.next(user);
        })
      )
      .toPromise();
  }

  public updatePassword(password: string): Promise<null> {
    return this.userControllerService.updatePasswordUsingPOST({
      passwordDTO: {
        password
      }
    }).toPromise();
  }

  private getUserInfo(): Promise<UserDTO> {
    return this.userControllerService.getMyInfoUsingGET().toPromise();
  }

  private loadUserInfo(): Promise<boolean> {
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
