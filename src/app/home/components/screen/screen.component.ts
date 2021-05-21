import { Component, OnInit } from '@angular/core';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
  faArrowRight = faArrowRight;
  public isToggled = false;

  constructor() { }

  ngOnInit(): void {
    const screen = JSON.parse(localStorage.getItem('AmelleLeroy-screen'));
    if (screen !== null) {
      if (screen.show === true) {
        if (screen.time + 86400000 > Date.now()) {
          this.isToggled = true;
        }
      }
    }
  }

  public toggle() {
    this.isToggled = !this.isToggled;
    localStorage.setItem('AmelleLeroy-screen', JSON.stringify({show: this.isToggled, time: Date.now()}));
  }

}
