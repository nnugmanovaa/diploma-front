import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CabinetService } from '../../core/services/cabinet.service';
import { StepService } from '../../core/services/step.service';

export enum Status {
  CASH_OUT_CARD_INITIALIZED = 'Обналичивание',
  NEW = "Новый",
  APPROVED = 'Одобрен',
  REJECTED = 'Отказано ',
  CASHED_OUT_WALLET = 'Выдано',
  CASHED_OUT_CARD = 'Выдано на карту',
  CLOSED = 'Закрыто',
  PENDING = 'Погасить',
  PAID = 'Оплачен',
  EXPIRED = 'Просрочено'
}

@Component({
  selector: 'mfo-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})

export class OrderHistoryComponent implements OnInit {
  params:any = {
    startDate:'',
    endDate:'',
    page:0,
    size:6,
    states:'CASHED_OUT_CARD,APPROVED,REJECTED',
    sort: 'orderId,desc'
    // states=CASHED_OUT_CARD,APPROVED,REJECTED&sort=orderId,desc
  }

  infoModal:boolean = false;
  selectedItem:any = null;

  Status:any = Status;

  date:any = null

  list:any = null;
  constructor(private cabinet:CabinetService,
              public stepService:StepService) { }

  ngOnInit(): void {
    let currentDate = new Date()
    let start = new Date();
    start.setMonth(currentDate.getMonth()-12)
    this.params.startDate = start.toISOString().split('T')[0]
    this.params.endDate = currentDate.toISOString().split('T')[0]
    this.getOrders();
  }

  getContract(){
    this.stepService.getContract(this.selectedItem.orderId).subscribe(res => {
      let file = URL.createObjectURL(res);
      window.open(file);
    });
  }

  openOrder(item:any){
    if(item.contractExtRefId){
      this.selectedItem = item;
      this.infoModal = true
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  changePage(page:any,change:boolean = true){
    if(change){
      this.params.page = page;
      this.getOrders();
    }
  }

  getOrders(){
    this.cabinet.getOrders(this.params).subscribe(res => {
      this.list = res;
    })
  }

}
