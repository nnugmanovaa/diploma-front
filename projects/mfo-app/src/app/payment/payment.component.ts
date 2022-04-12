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
  payForm: any = {
    "username": "",
    "amountRemain": "",
    "monthPayment": "",
    "amount": "",
    "clientRef": "",
    "contractDate": "",
    "contractNumber": "",
    "loanRepayType": "PLANNED_REPAYMENT"
  }

  orders: String[] = [];
  orderSums: any = []
  loan: any = null;

  constructor(private auth:AuthService,
              private router: Router,
              private cabinet:CabinetService) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn){
      this.payForm.username = this.auth.getUser.username;
      this.payForm.clientRef = this.auth.getUser.iin;
      this.getUserByPhone();
      // this.getActiveLoan();
    }
  }

  getUserByPhone() {
    this.auth.getUserId(this.payForm.username).subscribe(res => {
      this.payForm.clientRef = res.iin;
      this.cabinet.getActiveOrders({ "iin": this.payForm.clientRef }).subscribe(res => {
        this.payForm.contractNumber = res.loans[0].contractNumber;
        for (let i = 0; i < res.loans.length; i++) {
          this.orders.push(res.loans[i].contractNumber)
          this.orderSums.push({"orderId": res.loans[i].contractNumber, "monthPayment": res.loans[i].plannedPaymentAmount, "amountRemain": res.loans[i].amountOfDebt, "contractDate": res.loans[i].contractDate})
        }
      })
    })
  }

  getActiveLoan() {
    this.auth.accountLoans({iin: this.payForm.clientRef}).subscribe(res => {
      for (let i = 0; i < res.loans.length; i++) {
        this.payForm.contractNumber = res.loans[i].contractNumber;
        this.payForm.contractDate = res.loans[i].contractDate;
        this.payForm.monthPayment = res.loans[i].plannedPaymentAmount;
        this.payForm.amountRemain = res.loans[i].amountOfDebt;
        this.payForm.amount = String(res.loans[i].plannedPaymentAmount);
      }
    })
  }

  // getActiveLoan() {
  //   this.cabinet.getSchedule().subscribe(res => {
  //     this.payForm.contractNumber = res.orderDetailsSchedule?.contract;
  //     this.payForm.contractDate = res.orderDetailsSchedule?.contractDate;
  //     this.payForm.monthPayment = res.orderDetailsSchedule?.monthPayment;
  //     this.payForm.amountRemain = res.orderDetailsSchedule?.amountRemain;
  //     this.payForm.amount = String(res.orderDetailsSchedule?.monthPayment);
  //   })
  // }

  payCredit() {
    this.auth.payment(this.payForm).subscribe(res => {
      window.open(res.url, "_self");
      // this.router.navigate(['/cabinet']);
    })
  }

  setAmount() {
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

  handleOrder(order: string) {
    this.payForm.contractNumber = order;
    for (let i = 0; i < this.orderSums.length; i++) {
      if (this.orderSums[i].orderId == order) {
        this.payForm.monthPayment = String(this.orderSums[i].monthPayment);
        this.payForm.amountRemain = String(this.orderSums[i].amountRemain);
        this.payForm.contractDate = this.orderSums[i].contractDate;
        break;
      }
    }
    this.setAmount();
  }
}
