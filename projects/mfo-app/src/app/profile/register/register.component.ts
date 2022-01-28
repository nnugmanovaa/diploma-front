import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterService } from '../../core/services/register.service'
@Component({
  selector: 'mfo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:any = {
    msisdn:null
  }
  constructor(private route: ActivatedRoute,
              private router: Router,
              private registerService:RegisterService) { 

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      console.log(queryParams)
    })
  }

  registerUser(){
    console.log('form')
    this.registerService.sendOTP(this.registerForm).subscribe(res => {

    })
  }

}
