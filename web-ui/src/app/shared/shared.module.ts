import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatCardModule, MatInputModule, MatProgressBarModule, MatSnackBarModule } from '@angular/material';
import { ProgressBarService } from './progress-bar.service';

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
  ]
})
export class SharedModule { }
