import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PageCard } from '../../../api/models/page-card';
import { ProgressBarService } from '../../../shared/progress-bar.service';
import { Pageable } from '../../../api/models/pageable';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractComponent } from '../../../utils/abstract.component';
import { PageEvent } from '@angular/material/paginator';
import { Card } from '../../../api/models';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NotificationService } from '../../../shared/notification.service';
import { ConfirmService } from '../../../shared/confirm.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListComponent extends AbstractComponent implements OnInit, OnDestroy {

  public get page$(): Observable<PageCard> {
    return this.pageCard$.asObservable();
  }

  private pageCard$: Subject<PageCard> = new BehaviorSubject<PageCard>(null);
  private pageable: Pageable;

  public columnsToDisplay = ['id', 'question', 'actions'];
  public expandedElement: Card | null;

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router,
    private progressBar: ProgressBarService,
    private notification: NotificationService,
    private confirm: ConfirmService
  ) {
    super(progressBar);
  }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(
      (params) => {
        this.loadPage(Number(params.get('page')));
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  public onPageEvent($event: PageEvent): void {
    this.router.navigate(['cards', 'page', $event.pageIndex]);
  }

  loadPage(pageIndex: number = 0) {
    this.loading();

    this.subscription = this.crudService.getPage(pageIndex).subscribe(
      (page: PageCard) => {
        this.pageable = page.pageable;
        this.pageCard$.next(page);
        this.loaded();
      }
    );
  }

  async delete($event, cardId: number) {
    $event.preventDefault();
    $event.stopPropagation();

    const isConfirmed = await this.confirm.dialog('Do you wanna delete card?');

    if (isConfirmed) {
      this.loading();

      const removedCard = await this.crudService.deleteCard(cardId);

      this.notification.success(`Card ${removedCard.id} removed.`);

      this.loadPage(this.pageable.pageNumber);
    }
  }
}
