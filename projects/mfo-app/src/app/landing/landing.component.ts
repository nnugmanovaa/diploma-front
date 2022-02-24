import { Component, OnInit } from '@angular/core';
import amplitude from "amplitude-js";

@Component({
  selector: 'mfo-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  time:any = null;
  show:any = {};
  modal:boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.getMainTime();
    amplitude.getInstance().logEvent("viewed landing");
  }

  getMainTime(){
    let oldDateObj = new Date();
    let newDateObj = new Date();
    newDateObj.setTime(oldDateObj.getTime() + (10 * 60 * 1000));
    this.time = ("0" + newDateObj.getHours()).slice(-2) + ':' + ("0" + newDateObj.getMinutes()).slice(-2);
  }
  
  takeLoan() {
    this.modal = true
    let eventProperties = {
      "position": 2
    };
    amplitude.getInstance().logEvent("clicked get loan", eventProperties)
  }

  payLoan() {
    let eventProperties = {
      "position": 1
    };
    amplitude.getInstance().logEvent("clicked pay loan", eventProperties)
  }
}
