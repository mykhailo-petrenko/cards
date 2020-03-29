import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject } from 'rxjs';

import { LearnService } from '../../services/learn.service';
import { ProgressBarService } from '../../../shared/progress-bar.service';
import { Card } from '../../../api/models/card';


@Component({
  selector: 'app-random-card',
  templateUrl: './random-card.component.html',
  styleUrls: ['./random-card.component.scss']
})
export class RandomCardComponent implements OnInit {

  private readonly card$: Subject<Card> = new BehaviorSubject<Card>(null);

  constructor(
    private learnService: LearnService,
    private progressBar: ProgressBarService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadCard();
  }

  loadNext(): void {
    this.loadCard();
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

        this.snackBar.open(error.message, 'ok');
      }
    );
  }
}
