import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Card } from '../../../api/models/card';
import { CrudService } from '../../services/crud.service';
import { AbstractComponent } from '../../../utils/abstract.component';
import { ProgressBarService } from '../../../shared/progress-bar.service';
import { CrudCard } from '../../crud.model';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent extends AbstractComponent implements OnInit, OnDestroy {

  public card$: Subject<CrudCard>;

  public form: FormGroup;

  private sourceCard: Card;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private crudService: CrudService,
    private progressBar: ProgressBarService,
    private notification: NotificationService,
    private fb: FormBuilder
  ) {
    super(progressBar);
    this.card$ = new BehaviorSubject<CrudCard>(null);
  }

  ngOnInit() {
    this.form = this.fb.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]]
    });

    this.subscription = this.route.paramMap
      .pipe(
        tap(() => {
          this.loading$.next(true);
        }),
        map((params): number => parseInt(params.get('cardId'), 10) || 0),
        switchMap((cardId) => {
          if (cardId) {
            return this.crudService.getCard(cardId);
          } else {
            return this.crudService.getBlankCard();
          }
        }),
        tap((card: Card) => {
          this.sourceCard = card;
        }),
        map((card: Card): CrudCard => CrudCard.fromDto(card))
      )
      .subscribe(
      (card: CrudCard) => {
        this.card$.next(card);
        this.updateForm(card);
        this.loading$.next(false);
      }
    );
  }

  private updateForm(card: CrudCard) {
    this.form.setValue({
      question: card.question || '',
      answer: card.answer || '',
    });
    this.form.markAsUntouched();
    this.form.clearValidators();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const card = {
      ...this.sourceCard,
      ...this.form.value
    } as Card;

    this.loading$.next(true);

    this.subscription = this.crudService.updateCard(card)
      .subscribe(
        (updatedCard: Card) => {
          this.notification.success('Updated!');
          this.router.navigate(['cards', 'edit', updatedCard.id]);
        },
        (error) => {
          this.notification.error(`Failed to update: ${error}`);
        },
        () => {
          this.loading$.next(false)
        }
      )
  }

  cancel($event) {
    this.goBack($event);
  }

  goBack($event) {
    $event.preventDefault();

    this.location.back();
  }

  delete($event) {
    $event.preventDefault();
    console.log('delete');
  }

}
