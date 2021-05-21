import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Pricing, PricingService } from '../../../core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingPageComponent implements OnInit, OnDestroy {
  private title = 'Amaëlle Leroy - Photographe - Prestations / Tarifs';
  public pricings$: Observable<Pricing[]>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private pricingService: PricingService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'description', content: 'Amaëlle Leroy - Photographe : venez décrouvrir mes prestations et tarifs de mariage, naissance, grosesse, couple et famille'},
    ]);
    this.getPricings();
  }

  private getPricings() {
    this.pricings$ = this.pricingService.getPricings().pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
