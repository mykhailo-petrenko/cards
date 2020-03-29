import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';

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
    MatTableModule,
  ],
  providers: [
    CrudService,
  ]
})
export class CrudModule { }
