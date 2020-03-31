import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmService } from './confirm.service';
import { NotificationService } from './notification.service';
import { ProgressBarService } from './progress-bar.service';
import { MdPipe } from './pipes/md.pipe';
import { MdViewComponent } from './components/md-view/md-view.component';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatToolbarModule,
];

const imports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserModule,
  BrowserAnimationsModule,
  RouterModule,
  ...materialModules,
];

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    MdPipe,
    MdViewComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  imports: [
    ...imports,
  ],
  exports: [
    ...imports,
    MdPipe,
    MdViewComponent,
  ],
  providers: [
    ProgressBarService,
    ConfirmService,
    NotificationService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline'
      }
    }
  ]
})
export class SharedModule { }
