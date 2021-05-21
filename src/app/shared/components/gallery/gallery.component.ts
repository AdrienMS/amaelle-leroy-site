import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Gallery } from '../../../core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {
  @Input() gallery: Gallery;
  @Input() isPortfolio = false;
  public selectedImage: number = null;

  constructor() { }

  ngOnInit(): void {
  }
}
