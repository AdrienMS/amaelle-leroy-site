import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Category, CategoriesService, Image } from '../../../core';
import { PopupComponent } from '../../../shared';

@Component({
  selector: 'app-categories-modify',
  templateUrl: './categories-modify.component.html',
  styleUrls: ['./categories-modify.component.scss']
})
export class CategoriesModifyPageComponent implements OnInit, OnDestroy {
  public categories$: Observable<Category[]>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  public categoriesModify: Array<Category> = [];
  public showSelectedImage = false;
  public single = true;
  private selectedIndex = -1;

  constructor(private categoriesService: CategoriesService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.categories$ = this.categoriesService.getCategories().pipe(
      tap(categories => {
        if (categories !== null) {
          this.categoriesModify = categories;
        }
      }),
      map(categories => {
        if (categories !== null) {
          return categories;
        } else {
          return [];
        }
      }),
      takeUntil(this.unsubscribe$)
    );
  }

  public saveCategories() {
    this.categoriesService.saveCategories(this.categoriesModify).then(
      () => this.openSnackBar('Categories sauvegradées', true),
      (error) => { console.error(error); this.openSnackBar('Une erreur est survenue. Merci de contacter l\'administrateur', false); }
    );
  }

  public addCategory() {
    this.categoriesModify.push(new Category());
  }

  public selectImage(index: number) {
    this.selectedIndex = index;
    this.showSelectedImage = true;
  }

  public stopPropagation($event: Event) {
    $event.stopPropagation();
  }

  public getNewImages(images: Array<Image>) {
    this.categoriesModify[this.selectedIndex].photo = images[0];
  }

  public toggleDisplayScreen() {
    this.showSelectedImage = false;
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
