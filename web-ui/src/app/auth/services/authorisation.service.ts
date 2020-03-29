import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserDTO } from '../../api/models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {

  public get loggedIn$(): Observable<boolean> {
    return this._loggedIn$.asObservable();
  }

  private _loggedIn$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  setLoggedIn(status: boolean) {
    this._loggedIn$.next(status);
  }
}
