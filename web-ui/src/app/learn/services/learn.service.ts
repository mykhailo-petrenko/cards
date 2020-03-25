import { Injectable } from '@angular/core';
import { LearnControllerService } from '../../api/services';
import { Card } from '../../api/models/card';

@Injectable({
  providedIn: 'root'
})
export class LearnService {

  constructor(
    private learnController: LearnControllerService
  ) { }

  public getRandomCard(): Promise<Card> {
    return this.learnController.getRandomCardUsingGET().toPromise();
  }
}
