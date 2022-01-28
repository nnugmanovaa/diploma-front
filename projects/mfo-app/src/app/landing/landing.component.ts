import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'mfo-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  form:any = {
    month: 6,
    price:250000,
    type: 'annuity'
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
    minLimit: 25000,
    ceil: 500000,
    step: 5000,
    showSelectionBar: true,
    showTicks: true,
  }

  constructor(private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
  }

  createRequest(){
    console.log(this.form)
    this.router.navigate(
    ['/profile/register'], 
    {
      // relativeTo: this.route,
      queryParams: this.form
    });
  }

}
