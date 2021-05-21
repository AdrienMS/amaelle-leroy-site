import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IntroductionService } from '../../../core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  public introduction$: Observable<string>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private introductionService: IntroductionService) { }

  ngOnInit(): void {
    this.getIntro();
  }

  private getIntro() {
    this.introduction$ = this.introductionService.getIntroduction().pipe(
      takeUntil(this.unsubscribe$)
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
