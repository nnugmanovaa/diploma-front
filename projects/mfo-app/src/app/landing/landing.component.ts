import { Component, OnInit } from '@angular/core';

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
  }

  getMainTime(){
    let oldDateObj = new Date();
    let newDateObj = new Date();
    newDateObj.setTime(oldDateObj.getTime() + (10 * 60 * 1000));
    this.time = ("0" + newDateObj.getHours()).slice(-2) + ':' + ("0" + newDateObj.getMinutes()).slice(-2);
  }
  
}
