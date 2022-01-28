import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CabinetService } from '../../core/services/cabinet.service';

@Component({
  selector: 'mfo-cashed-out',
  templateUrl: './cashed-out.component.html',
  styleUrls: ['./cashed-out.component.scss']
})
export class CashedOutComponent implements OnInit {

  params:any = {
    endDate:'2021-12-10',
    page:0,
    size:20,
    startDate:'2021-08-10',
    status:'CASHED_OUT_CARD'
  }

  constructor(private cabinet:CabinetService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.cabinet.getOrders(this.params).subscribe(res => {

    })
  }

}
