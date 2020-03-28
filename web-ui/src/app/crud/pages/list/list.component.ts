import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { unsubscribe } from '../../../utils/helper';
import { PageCard } from '../../../api/models/page-card';
import { PageEvent } from '@angular/material';
import { ProgressBarService } from '../../../shared/progress-bar.service';
import { Pageable } from '../../../api/models/pageable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {

  public readonly loading$: Subject<boolean>;
  public get page$(): Observable<PageCard> {
    return this.pageCard$.asObservable();
  }

  private pageCard$: Subject<PageCard> = new BehaviorSubject<PageCard>(null);
  private pageable: Pageable;
  private subscriptions: Subscription[] = [];

  private set subscription(value: Subscription) {
    this.subscriptions.push(value);
  }

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router,
    private progressBar: ProgressBarService
  ) {
    this.loading$ = new BehaviorSubject<boolean>(false);

    this.subscription = this.loading$.subscribe((isLoading: boolean) => {

      if (isLoading) {
        this.progressBar.loading();
      } else {
        this.progressBar.loaded();
      }

    });
  }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(
      (params) => {
        this.loadPage(Number(params.get('page')));
      }
    );
  }

  ngOnDestroy(): void {
    unsubscribe(this.subscriptions);
  }

  public onPageEvent($event: PageEvent): void {
    this.router.navigate(['cards', 'page', $event.pageIndex]);
  }

  loadPage(pageIndex: number = 0) {
    this.loading$.next(true);

    this.subscription = this.crudService.getPage(pageIndex).subscribe(
      (page: PageCard) => {
        this.pageable = page.pageable;
        this.pageCard$.next(page);
        this.loading$.next(false);
      }
    );
  }
}
