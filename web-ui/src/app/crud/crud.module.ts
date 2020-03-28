import { NgModule } from '@angular/core';
import { MatGridListModule, MatPaginatorModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './pages/list/list.component';
import { EditComponent } from './pages/edit/edit.component';
import { CrudService } from './services/crud.service';

@NgModule({
  declarations: [ListComponent, EditComponent],
  imports: [
    SharedModule,
    MatPaginatorModule,
    MatGridListModule,
  ],
  providers: [
    CrudService,
  ]
})
export class CrudModule { }
