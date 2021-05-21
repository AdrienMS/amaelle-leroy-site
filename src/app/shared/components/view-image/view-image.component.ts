import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Image } from '../../../core';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit {
  faChevronLeft = faChevronLeft; faChevronRight = faChevronRight; faTimes = faTimes;

  @Input() image: number;
  @Input() images: Array<Image>;
  @Output() isClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  public onClose() {
    this.isClosed.emit(true);
  }

  public nextImage($event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.image + 1 < this.images.length - 1) {
      this.image += 1;
    } else {
      this.image = 0;
    }
  }

  public previousImage($event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.image - 1 >= 0) {
      this.image -= 1;
    } else {
      this.image = this.images.length - 1;
    }
  }

}
