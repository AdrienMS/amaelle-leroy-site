import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { Pricing, PricingService } from '../../../core';

@Component({
  selector: 'app-single-pricing',
  templateUrl: './single-pricing.component.html',
  styleUrls: ['./single-pricing.component.scss']
})
export class SinglePricingComponent implements OnInit, OnDestroy {
  @Input() categoryIndex: string;
  public pricings$: Observable<Pricing[]>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private pricingService: PricingService) { }

  ngOnInit(): void {
    this.getPricing();
  }

  private getPricing() {
    this.pricings$ = this.pricingService.getPricings().pipe(
      map(pricings => {
        const toReturn: Array<Pricing> = [];
        if (this.categoryIndex !== undefined) {
          pricings.forEach(pricing => {
            if (pricing.galleriesID.includes(parseInt(this.categoryIndex, 10))) {
              toReturn.push(pricing);
            }
          });
        }
        return toReturn;
      }),
      takeUntil(this.unsubscribe$)
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
