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

  getActiveLoan() {
    this.auth.accountLoans({iin: this.payForm.clientRef}).subscribe(res => {
      if(res.loans.length){
        this.payForm.contractNumber = res.loans[0].contractNumber;
        this.payForm.contractDate = res.loans[0].contractDate;
        this.payForm.monthPayment = res.loans[0].plannedPaymentAmount;
        this.payForm.amountRemain = res.loans[0].amountOfDebt;
        this.payForm.amount = String(res.loans[0].plannedPaymentAmount);
      }
    })
  }

  payCredit() {
    this.auth.payment(this.payForm).subscribe(res => {
      window.open(res.url, "_self")
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
}
