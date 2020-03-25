import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  private readonly loading$ = new ReplaySubject<boolean>(1);

  public get isLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  constructor() { }

  public loading() {
    this.loading$.next(true);
  }

  public loaded() {
    this.loading$.next(false);
  }
}
