import { Component, OnInit } from '@angular/core';
import amplitude from 'amplitude-js';

@Component({
  selector: 'mfo-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  modal:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  payLoan() {
    let eventProperties = {
      "position": 2
    };
    amplitude.getInstance().logEvent("clicked pay loan", eventProperties)
  }
}
