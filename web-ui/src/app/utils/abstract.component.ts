import { OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

import { unsubscribe } from './helper';
import { ProgressBarService } from '../shared/progress-bar.service';
import { AbstractControl } from '@angular/forms';

export abstract class AbstractComponent implements OnDestroy {
  public readonly loading$: Subject<boolean>;

  protected set subscription(value: Subscription) {
    this.subscriptions.push(value);
  }
  private subscriptions: Subscription[] = [];

  protected constructor(
    progressBar: ProgressBarService
  ) {
    this.loading$ = new BehaviorSubject<boolean>(false);
    this.subscription = this.loading$.subscribe((isLoading: boolean) => {

      if (isLoading) {
        progressBar.loading();
      } else {
        progressBar.loaded();
      }

    });
  }

  protected loading() {
    this.loading$.next(true);
  }

  protected loaded() {
    this.loading$.next(false);
  }

  public ngOnDestroy(): void {
    this.unsubscribe();
  }

  protected unsubscribe() {
    unsubscribe(this.subscriptions);
  }

  protected disableFormControlsWhileLoading(form: AbstractControl) {
    this.subscription = this.loading$.subscribe((isLoading: boolean) => {
      if (isLoading) {
        form.disable();
      } else {
        form.enable();
      }
    });
  }
}
