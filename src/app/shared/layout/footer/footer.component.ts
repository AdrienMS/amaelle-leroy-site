import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FooterService } from 'src/app/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  public defaultImage = '../../../../assets/images/footer-pixelized.png';
  public footer$: Observable<string>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private footerService: FooterService,
    ) { }

  ngOnInit(): void {
    this.getFooter();
  }

  public getFooter() {
    this.footer$ = this.footerService.getFooter().pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
