import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import * as Instafeed from '../../../../assets/js/instafeed.min.js';

import { Insta, InstaService } from '../../../core';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss']
})
export class InstagramComponent implements OnInit, OnDestroy {
  public insta$: Observable<Insta>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private instaService: InstaService) { }

  ngOnInit(): void {
    this.getInsta();
  }

  private getInsta() {
    this.insta$ = this.instaService.getInsta().pipe(
      tap(insta => {
        const i = new Instafeed({
          accessToken: insta.token,
          resolution: 'thumbnail',
          limit: 14,
          sortBy: 'most-liked'
        });
        i.run();
      }),
      takeUntil(this.unsubscribe$)
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
