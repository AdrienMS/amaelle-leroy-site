import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { BannerService, LogoService } from '../../../core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {
  public banner$: Observable<string[]>;
  public logo$: Observable<string>;
  private unsubscribe$: Subject<void> = new Subject<void>();
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(
    private bannerService: BannerService,
    private logoService: LogoService
    ) { }

  ngOnInit(): void {
    this.getLogo();
    this.getBanner();
  }

  public getLogo() {
    this.logo$ = this.logoService.getLogo().pipe(takeUntil(this.unsubscribe$));
  }

  public getBanner() {
    this.banner$ = this.bannerService.getBanner().pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
