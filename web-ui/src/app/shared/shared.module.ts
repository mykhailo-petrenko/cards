import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProgressBarService } from './progress-bar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule,
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
  declarations: [],
  imports: [
    ...imports,
  ],
  exports: [
    ...imports,
  ],
  providers: [
    ProgressBarService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline'
      }
    }
  ]
})
export class SharedModule { }
