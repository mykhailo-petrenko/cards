import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { LearnService } from '../../services/learn.service';
import { ProgressBarService } from '../../../shared/progress-bar.service';
import { Card } from '../../../api/models/card';
import { AbstractComponent } from '../../../utils/abstract.component';
import { NotificationService } from '../../../shared/notification.service';


@Component({
  selector: 'app-random-card',
  templateUrl: './random-card.component.html',
  styleUrls: ['./random-card.component.scss']
})
export class RandomCardComponent extends AbstractComponent implements OnInit, OnDestroy {

  public isAnswerVisible: boolean;

  private readonly card$: Subject<Card> = new BehaviorSubject<Card>(null);

  constructor(
    private learnService: LearnService,
    private progressBar: ProgressBarService,
    private notification: NotificationService
  ) {
    super(progressBar);
  }

  ngOnInit() {
    this.subscription = this.card$.subscribe(() => {
      this.isAnswerVisible = false;
    });

    this.loadCard();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  showAnswer() {
    this.isAnswerVisible = true;
  }

  showQuestion() {
    this.isAnswerVisible = false;
  }

  nextCard(): void {
    this.loadCard();
  }

  acknowledge(cardId: number): void {
    this.loading();

    this.learnService.acknowledgeCard(cardId).then(
      () => {
        this.loaded();
        this.notification.success(`Card ${cardId} acknowledged!`);
        this.loadCard();
      },
      () => {
        this.loaded();
      }
    );
  }

  private loadCard() {
    this.progressBar.loading();

    this.learnService.getRandomCard().then(
      (card: any) => {
        this.card$.next(card);
        this.progressBar.loaded();
      },
      (error) => {
        this.progressBar.loaded();

        this.notification.success(error.message);
      }
    );
  }
}
