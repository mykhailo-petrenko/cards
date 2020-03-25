import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RandomCardComponent } from './pages/random-card/random-card.component';

@NgModule({
  declarations: [RandomCardComponent],
  imports: [
    SharedModule,
  ]
})
export class LearnModule { }
