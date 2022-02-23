import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service'
import { CabinetService } from '../core/services/cabinet.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
      this.payForm.clientRef = this.auth.getUser.iin;
      this.getActiveLoan();
    }
  }

  getActiveLoan(){
    this.cabinet.getSchedule().subscribe(res => {
      this.payForm.contractNumber = res.orderDetailsSchedule?.contract;
      this.payForm.contractDate = res.orderDetailsSchedule?.contractDate;
      this.payForm.monthPayment = res.orderDetailsSchedule?.monthPayment;
      this.payForm.amountRemain = res.orderDetailsSchedule?.amountRemain;
      this.payForm.amount = String(res.orderDetailsSchedule?.monthPayment);
    })

    this.auth.accountLoans({iin: this.payForm.clientRef}).subscribe(res => {

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
}
