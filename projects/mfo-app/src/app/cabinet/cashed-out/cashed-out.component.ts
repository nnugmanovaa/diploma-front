import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CabinetService } from '../../core/services/cabinet.service';

@Component({
  selector: 'mfo-cashed-out',
  templateUrl: './cashed-out.component.html',
  styleUrls: ['./cashed-out.component.scss']
})
export class CashedOutComponent implements OnInit {

  loan:any = null;
  // schedule:any = null;
  // hasSchedule:boolean = false;
  constructor(private cabinet:CabinetService) { }

  ngOnInit(): void {
    // this.getOrders();
    this.getSchedule();
  }

  // getOrders(){
  //   this.cabinet.getActiveOrders({"iin": "910511300038"}).subscribe(res => {
  //     this.loan = res?.loans[0];
  //   })
  // }

  getSchedule(){
    this.cabinet.getSchedule({}).subscribe(res => {
      this.loan = res;
      // this.schedule = res.orderDetailsSchedule
    })
  }

}
