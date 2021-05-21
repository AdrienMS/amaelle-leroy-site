import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap, map } from 'rxjs/operators';

import { CustomComponent, ComponentsService, Gallery, GalleryService } from '../../../core';

@Component({
  selector: 'app-galleries-list',
  templateUrl: './galleries-list.component.html',
  styleUrls: ['./galleries-list.component.scss']
})
export class GalleriesListComponent implements OnInit, OnDestroy {
  public defaultImage = '../../../../assets/images/pixelized.png';
  public components$: Observable<CustomComponent[]>;
  public galleries$: Observable<Gallery[]>;
  private unsubscribe$: Subject<void> = new Subject<void>();
  public path: Params = null;

  constructor(
    private route: ActivatedRoute,
    private componentsService: ComponentsService,
    private galleryService: GalleryService
    ) { }

  ngOnInit(): void {
    this.getUrl();
    this.getComponents();
    this.getGalleries();
  }

  private getUrl() {
    this.path = this.route.snapshot.params;
  }

  private getGalleries() {
    this.galleries$ = this.galleryService.getGalleries().pipe(takeUntil(this.unsubscribe$));
  }

  private getComponents() {
    this.components$ = this.componentsService.getComponents().pipe(
      map(components => {
        const toReturn: Array<CustomComponent> = [];
        components.forEach(component => {
          if (component.type === 'gallery') {
            toReturn.push(component);
          }
        });
        console.log(toReturn);
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
