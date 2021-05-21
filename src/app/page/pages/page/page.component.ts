import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { PagesService, Page } from '../../../core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PagePageComponent implements OnInit, OnDestroy {
  public path: Params = null;
  public pages$: Observable<Page[]>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private pagesService: PagesService) { }

  ngOnInit(): void {
    this.getUrl();
    this.getPages();
  }

  private getUrl() {
    this.path = this.route.snapshot.params;
  }

  private getPages() {
    this.pages$ = this.pagesService.getPages().pipe(
      map(pages => {
        console.log(pages);
        return pages;
      }),
      takeUntil(this.unsubscribe$)
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
