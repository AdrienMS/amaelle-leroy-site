import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-element',
  templateUrl: './loading-element.component.html',
  styleUrls: ['./loading-element.component.scss']
})
export class LoadingElementComponent implements OnInit {
  @Input() element: string;
  @Input() width: number;
  @Input() height: number;
  @Input() numberElement: number;
  // tslint:disable-next-line: no-inferrable-types
  @Input() rounded: boolean = false;

  public randomHeights: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
    if (this.element === 'gallery') {
      this.generateRandomHeight();
    }
  }

  private generateRandomHeight() {
    for (let i = 0; i < this.numberElement; i += 1) {
      this.randomHeights.push(Math.floor((Math.random() * 400) + 1) + 260 + 'px');
    }
  }

}
