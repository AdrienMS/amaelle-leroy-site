import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';

import { Category, CategoriesService } from '../../../core';

@Component({
  selector: 'app-galleries',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryPageComponent implements OnInit, OnDestroy {
  private title = 'Amaëlle Leroy - Photographe - Galeries';
  public categories$: Observable<Category[]>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private categoryService: CategoriesService, private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'description', content: 'Amaëlle Leroy - Photographe : vous avez envie de découvrir mon travail? Vous découvrirez mes photos de mariages, naissance, grossesse, couple et famille.'},
    ]);
    this.getCategories();
  }

  private getCategories() {
    this.categories$ = this.categoryService.getCategories().pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
