import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'mfo-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {

  form:any = {
    period: 6,
    amount:250000,
    type: 'ANNUITY_PAYMENTS'
  }
  value: number = 6;
  monthOptions: Options = {
    floor: 0,
    ceil: 12,
    showSelectionBar: true,
    minLimit: 2
  };

  priceOptions:Options = {
    floor: 0,
    minLimit: 50000,
    ceil: 500000,
    step: 5000,
    showSelectionBar: true,
    showTicks: true,
  }
  
  paymentPerMonth:any = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public authService:AuthService) { }

  ngOnInit(): void {
    this.calculateForm();
  }

  calculateForm(){
    this.paymentPerMonth = this.getPayment(this.form.amount, this.form.period, 0.38) 
  }

  getPayment(sum:any, period:any, rate:any) {
    console.log(sum, period)
    var i,
        koef,
        result;
    i = (rate / 12);

    koef = (i * (Math.pow(1 + i, period))) / (Math.pow(1 + i, period) - 1);
    result = sum * koef;
    return result.toFixed();
  };

  createRequest(){
    if(this.authService.isLoggedIn){
      this.router.navigate(
        ['/profile/steps'], 
        {
          queryParams: this.form
        });
    }else{
      this.router.navigate(
        ['/profile/register'], 
        {
          queryParams: this.form
        });
    }
  }


}
