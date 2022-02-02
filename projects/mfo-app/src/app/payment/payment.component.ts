import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service'

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
    username:null,
    amount:null,
    message: "Hello"
  }
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn){
      this.payForm.username = this.auth.getUser.username
    }
  }

  payCredit(){
    console.log(this.payForm)
    this.auth.payment(this.payForm).subscribe(res => {
      
    })
  }
}
