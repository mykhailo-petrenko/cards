import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly snackDefaultOption = {
    duration: 3000,
  };

  constructor(
    private snackBar: MatSnackBar
  ) { }

  public success(message: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, 'ok', this.snackDefaultOption);
  }

  public error(message: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, 'ok', this.snackDefaultOption);
  }
}
