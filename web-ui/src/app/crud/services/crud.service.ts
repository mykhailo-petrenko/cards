import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CardsControllerService } from '../../api/services';
import { PageCard } from '../../api/models/page-card';
import { Card } from '../../api/models/card';

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

  getCard(cardId: number): Observable<Card> {
    return this.cardsControllerService.getCardUsingGET({
      cardId
    });
  }

  getBlankCard(): Observable<Card> {
    return of({
    } as Card);
  }

  updateCard(card: Card): Observable<Card> {
    if (card.id) {
      return this.cardsControllerService.updateCardUsingPOST({
        cardId: card.id,
        card
      });
    } else {
      return this.cardsControllerService.createCardUsingPOST({
        card
      });
    }
  }

  deleteCard(cardId: number): Promise<Card> {
    return this.cardsControllerService.deleteCardUsingDELETE({ cardId }).toPromise();
  }
}
