import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CardsControllerService } from '../../api/services';
import { PageCard } from '../../api/models/page-card';

@Injectable()
export class CrudService {

  constructor(
    private cardsControllerService: CardsControllerService
  ) { }

  getPage(pageIndex: number = 0): Observable<PageCard> {
    return this.cardsControllerService.getCardsUsingGET({
      pageIndex
    });
  }
}
