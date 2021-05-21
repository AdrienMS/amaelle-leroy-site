import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

export class DataPopUp {
  message: string;
  valid: boolean;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  faTimes = faTimes; faCheck = faCheck;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: DataPopUp) {}

  ngOnInit() {}
}
