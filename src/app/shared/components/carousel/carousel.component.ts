import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { Banner } from '../../../core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  /*Font Awesome icons*/
  faChevronLeft = faChevronLeft; faChevronRight = faChevronRight;

  @Input() banner: Banner = null;
  public animationPosition: Array<number> = [];

  private animation = null;
  private timeout = null;

  constructor() { }

  ngOnInit(): void {
    this.startAnimation();
  }

  private startAnimation() {
    this.initPosition();
    if (this.timeout !== null) { clearTimeout(this.timeout); }
    this.animation = setInterval(() => {
      this.slideToRight();
    }, this.banner.options.delay);
  }

  private initPosition() {
    for (let i = 0; i < this.banner.photos.length; i += 1) {
        this.animationPosition.push(i * 100);
    }
  }

  private slideToLeft() {
    for (let i = 0; i < this.animationPosition.length; i += 1) {
      if (this.animationPosition[i] < 300) {
        this.animationPosition[i] = this.animationPosition[i] + 100;
      } else {
        this.animationPosition[i] = -100;
      }
    }
  }

  private slideToRight() {
    for (let i = 0; i < this.animationPosition.length; i += 1) {
      if (this.animationPosition[i] > -100) {
        this.animationPosition[i] = this.animationPosition[i] - 100;
      } else {
        this.animationPosition[i] = 300;
      }
    }
  }

  public clickLeft() {
    if (this.timeout !== null) { clearTimeout(this.timeout); }
    if (this.animation !== null) { clearInterval(this.animation); }
    this.slideToLeft();
    this.timeout = setTimeout(() => {
      this.startAnimation();
    }, 1000);
  }

  public clickRight() {
    if (this.timeout !== null) { clearTimeout(this.timeout); }
    if (this.animation !== null) { clearInterval(this.animation); }
    this.slideToRight();
    this.timeout = setTimeout(() => {
      this.startAnimation();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.animation);
  }

}
