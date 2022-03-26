import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'mfo-pdl-form',
  templateUrl: './pdl-form.component.html',
  styleUrls: ['./pdl-form.component.scss']
})
export class PdlFormComponent implements OnInit {

  form: any = {
    period: 20,
    amount: 80000,
    type: 'REPAYMENT_DEBT_INTEREST_END_PERIOD'
  }
  value: number = 20;
  monthOptions: Options = {
    floor: 10,
    ceil: 30,
    showSelectionBar: true,
    minLimit: 0
  };

  priceOptions: Options = {
    floor: 10000,
    minLimit: 10000,
    ceil: 150000,
    step: 5000,
    showSelectionBar: true,
    showTicks: true,
  }

  paymentPerMonth: any = null;

  today = new Date();

  constructor(private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.calculateForm();
  }

  validateTime() {
    if (this.today.getHours() >= 21 || this.today.getHours() <= 8) {
      alert("Сервис недоступен в данный момент, попробуйте ещё раз в 06:00. Спасибо, что используете наш сервис.");
      this.disableButton();
    } else {
      this.createRequest();
    }
  }

  disableButton() {
    (document.getElementById("theButton") as HTMLButtonElement).disabled = true;
  }

  calculateForm() {
    this.paymentPerMonth = this.getPayment(this.form.amount, this.form.period, 0.25)
  }

  // getPayment(sum: any, period: any, rate: any) {
  //   // console.log(sum, period)
  //   var i,
  //     koef,
  //     result;
  //   i = (rate);
  //
  //   koef = (i * (Math.pow(1 + i, period))) / (Math.pow(1 + i, period) - 1);
  //   result = sum * koef;
  //   return result.toFixed();
  // };

  getPayment(sum: any, period: any, rate: any) {
    // console.log(sum, period)
    var i,
      koef,
      result;
    i = (rate);

    koef = 0.0083 * period;
    result = sum * koef;
    return result.toFixed();
  };

  createRequest() {
    if (this.authService.isLoggedIn) {
      if (this.authService.getUser.identificationStatus !== 'FULL_IDENTIFIED') {
        this.router.navigate(
          ['/profile/verilive'],
          {
            queryParams: this.form
          });
      } else {
        this.router.navigate(
          ['/profile/steps'],
          {
            queryParams: this.form
          });
      }
    } else {
      this.router.navigate(
        ['/profile/register'],
        {
          queryParams: this.form
        });
    }
  }

}
