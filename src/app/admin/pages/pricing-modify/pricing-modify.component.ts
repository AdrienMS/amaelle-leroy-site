import { Component, OnInit, OnDestroy } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupComponent } from '../../../shared';

import { Pricing, PricingService, Category, CategoriesService } from '../../../core';

@Component({
  selector: 'app-pricing-modify',
  templateUrl: './pricing-modify.component.html',
  styleUrls: ['./pricing-modify.component.scss']
})
export class PricingModifyPageComponent implements OnInit, OnDestroy {
  public pricing$: Observable<Pricing[]>;
  public categories$: Observable<Category[]>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  public pricingsModify: Array<Pricing>;

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public newDesc: Array<string> = [];

  constructor(
    private pricingService: PricingService,
    private categoriesService: CategoriesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getPrincings();
  }

  private getCategories() {
    this.categories$ = this.categoriesService.getCategories().pipe(
      takeUntil(this.unsubscribe$)
    );
  }

  private getPrincings() {
    this.pricing$ = this.pricingService.getPricings().pipe(
      tap(pricings => {
        this.pricingsModify = pricings;
        this.pricingsModify.forEach(pricing => {
          this.newDesc.push('');
          if (pricing.items === undefined) {
            pricing.items = [];
          }
          if (pricing.galleriesID === undefined) {
            pricing.galleriesID = [];
          }
        });
      }),
      takeUntil(this.unsubscribe$)
    );
  }

  public savePricings() {
    this.pricingService.savePricings(this.pricingsModify).then(
      () => this.openSnackBar('Pretations sauvegardées', true),
      (error) => {
        console.error(error);
        this.openSnackBar('Une erreur est survenue. Merci de contacter l\'administrateur', false);
      }
    );
  }

  public addPricing() {
    this.pricingsModify.push(new Pricing());
    this.newDesc.push('');
  }

  public add(event: MatChipInputEvent, indexPricing: number): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.pricingsModify[indexPricing].items.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
    this.newDesc[indexPricing] = '';
  }

  public removeGalleryID(indexPricing: number, indexItem: number) {
    this.pricingsModify[indexPricing].galleriesID.splice(indexItem, 1);
  }

  public removeItem(indexPricing: number, indexItem: number) {
    this.pricingsModify[indexPricing].items.splice(indexItem, 1);
  }

  public drop(event: CdkDragDrop<string[]>, indexPicing: number) {
    moveItemInArray(this.pricingsModify[indexPicing].items, event.previousIndex, event.currentIndex);
  }

  public deletePricing(index: number) {
    this.pricingsModify.splice(index, 1);
  }

  private openSnackBar(m: string, v: boolean) {
    this.snackBar.openFromComponent(PopupComponent, {
      data: {message: m, valid: v},
      duration: 5000
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
