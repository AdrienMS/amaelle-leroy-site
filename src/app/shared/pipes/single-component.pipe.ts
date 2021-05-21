import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { CustomComponent, ComponentsService } from '../../core';

@Pipe({
  name: 'singleComponent'
})
export class SingleComponentPipe implements PipeTransform, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private componentsService: ComponentsService) {}

  transform(value: number): Observable<CustomComponent> {
    return this.componentsService.getSingleComponent(value).pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
