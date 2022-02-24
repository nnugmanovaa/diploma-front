import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service'
import { CabinetService } from '../core/services/cabinet.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import amplitude from 'amplitude-js';

@Component({
  selector: 'mfo-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  priceMask = {
    mask: [
        { mask: '' },
        {
            mask: 'num ₸',
            lazy: false,
            blocks: {
                num: {
                    mask: Number,
                    scale: 2,
                    thousandsSeparator: ' ',
                    radix: ',',
                    mapToRadix: ['.'],
                    max:500000
                }
            }
        }
    ]
  };
  payForm:any = {
    "username": "",
    "amountRemain": "",
    "monthPayment": "",
    "amount": "",
    "clientRef": "",
    "contractDate": "",
    "contractNumber": "",
    "loanRepayType": "PLANNED_REPAYMENT"
  }
  constructor(private auth:AuthService,
              private router: Router,
              private cabinet:CabinetService) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn){
      this.payForm.username = this.auth.getUser.username;
      this.getUserByPhone();
      this.getActiveLoan();
    }
  }

  getUserByPhone(){
    this.auth.getUserId(this.payForm.username).subscribe(res => {
      this.payForm.clientRef = res.iin;
    })
  }

  getActiveLoan(){
    this.cabinet.getSchedule().subscribe(res => {
      this.payForm.contractNumber = res.orderDetailsSchedule?.contract;
      this.payForm.contractDate = res.orderDetailsSchedule?.contractDate;
      this.payForm.monthPayment = res.orderDetailsSchedule?.monthPayment;
      this.payForm.amountRemain = res.orderDetailsSchedule?.amountRemain;
      this.payForm.amount = String(res.orderDetailsSchedule?.monthPayment);
    })
  }

  payCredit(){
    this.auth.payment(this.payForm).subscribe(res => {
      this.router.navigate(['/cabinet']);
    })
  }

  setAmout(){
    if(this.payForm.loanRepayType == 'PLANNED_REPAYMENT'){
      this.payForm.amount = String(this.payForm.monthPayment);
    }else{
      this.payForm.amount = String(this.payForm.amountRemain);
    }
  }
  tryPayLoan() {
    let eventProperties = {
      "amount": this.payForm.amount,
      "contract number": this.payForm.contractNumber,
      "method": this.payForm.loanRepayType
    }
    amplitude.getInstance().logEvent("tried pay loan", eventProperties);    
  }
}
