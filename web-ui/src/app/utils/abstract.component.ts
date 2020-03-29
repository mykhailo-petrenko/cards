import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { unsubscribe } from './helper';
import { ProgressBarService } from '../shared/progress-bar.service';

export abstract class AbstractComponent {
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

  protected unsubscribe() {
    unsubscribe(this.subscriptions);
  }
}
