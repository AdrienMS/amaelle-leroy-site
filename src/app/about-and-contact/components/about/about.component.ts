import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/operators';

import { About, AboutService } from '../../../core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  public about$: Observable<About>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
    this.getAbout();
  }

  private getAbout() {
    this.about$ = this.aboutService.getAbout().pipe(
      takeUntil(this.unsubscribe$)
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
