import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { BannerService, LogoService, Banner } from '../../../core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {
  @Input() banner: Banner = null;
  public logo$: Observable<string>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private logoService: LogoService
    ) { }

  ngOnInit(): void {
    this.getLogo();
  }

  public getLogo() {
    this.logo$ = this.logoService.getLogo().pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
