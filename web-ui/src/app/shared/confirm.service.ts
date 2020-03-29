import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from './components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(
    private matDialog: MatDialog
  ) { }

  public dialog(message, description: string = null): Promise<boolean> {
    const dialogRef = this.matDialog.open(
      ConfirmDialogComponent,
      {
        width: '250px',
        data: {
          message,
          description
        } as ConfirmDialogData
      }
    );

    return dialogRef.afterClosed().toPromise();
  }
}
