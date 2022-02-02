import { Component, OnInit } from '@angular/core';
import { StepService } from '../../core/services/step.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { RegisterService } from '../../core/services/register.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'mfo-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  step:any = 1;
  data = {
    "iin": null,
    "personalInfo": {
        "IPDL": "no",
        "lastName": null,
        "firstName": null,
        "middleName": null,
        "birthDate": null,
        "sameAdress": true,
        "nationalIdDocument": {
            "idNumber": null,
            "nationality": null,
            "issuedBy": null,
            "issuedDate": null,
            "expireDate": null,
        },
        "registrationAddress": {
            "district": null,
            "region": null,
            "city": null,
            "postalCode": null,
            "street": null,
            "house": null,
            "apartment": null,
            "country": "Казахстан",
        },
        "residenceAddress": {
            "district": null,
            "region": null,
            "city": null,
            "postalCode": null,
            "street": null,
            "house": null,
            "apartment": null,
            "country": "Казахстан",
        },
        "education": null,
        "employment": null,
        "typeOfWork": null,
        "workPosition": null,
        "employer": null,
        "monthlyIncome": 0,
        "additionalMonthlyIncome": 0,
        "workExperience": 0,
        "workPhoneNum": null,
        "maritalStatus": null,
        "gender": null,
        "numberOfKids": 0
    },
    "loanAmount": 0,
    "loanPeriod": 0,
    "loanProduct": null,
    "loanMethod": null,
    "preScoreRequestId": null,
  }

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
                    mapToRadix: ['.']
                }
            }
        }
    ]
  };

  districts:any = null;
  cities:any = null;
  citiesres:any = null;

  selectedDistrict:any = null;
  selectedCity:any = null;

  selectedDistrictResidence:any = null;
  selectedCityResidence:any = null;

  stroke:any = "stroke-dasharray: 753.9822368615503, 753.9822368615503; stroke-dashoffset: 753.9822368615503;";
  intervalId:any = null;
  loading:boolean = false;
  percent:any = 0;

  resultShow:boolean = false;
  errorResult:boolean = false;
  successResult:boolean = false;
  loanID:any = null;

  showSMSModal:boolean = false;
  code:any = null;
  constructor(public stepService:StepService,
              private route: ActivatedRoute,
              private router: Router,
              private registerService:RegisterService,
              public authService:AuthService) {

              }

  ngOnInit(): void {
    this.getLocations();
    this.fillData();
    this.route.queryParams.subscribe(queryParams => {
      if(queryParams){
        this.data.loanAmount = queryParams.amount;
        this.data.loanPeriod = queryParams.period;
        this.data.loanMethod = queryParams.type;
        this.data.preScoreRequestId = queryParams.requestId;        
      }
    });
  }

  getAnketa(){
    this.stepService.getAnketa(this.loanID).subscribe(res => {
      let file = URL.createObjectURL(res);
      window.open(file);
    });
  }

  getContract(){
    this.stepService.getContract(this.loanID).subscribe(res => {
      let file = URL.createObjectURL(res);
      window.open(file);
    });
  }

  strokeLoading(){
    this.loading = true;
    let perc = 0;
    this.fillSvg();
    this.intervalId = setInterval(() => {
      this.fillSvg();
    }, 1000);
  }

  fillSvg(){
    if(this.percent > 77){
      this.percent += Math.floor(Math.random() * 2) + 1;
    }else{
      this.percent += Math.floor(Math.random() * 10) + 1;
    }
    if(this.percent > 97){
      clearInterval(this.intervalId);
      this.percent = 97;
    }
    let circumference = 120 * 2 * Math.PI;
    let offset = circumference - this.percent / 100 * circumference;
    this.stroke = `stroke-dasharray: ${circumference}, ${circumference}; stroke-dashoffset: ${offset};`;
  }

  fillData(){
    let info = localStorage.getItem('pinfo');
    if(info){
      let dinfo = JSON.parse(info);
      this.data.iin = dinfo.iin;
      this.data.personalInfo.firstName = dinfo.firstName;
      this.data.personalInfo.lastName = dinfo.lastName;
      this.data.personalInfo.middleName = dinfo.middleName;
      this.data.personalInfo.birthDate = dinfo.dateOfBirth;
      this.data.personalInfo.nationalIdDocument.idNumber = dinfo.nationalIdNumber;
      this.data.personalInfo.nationalIdDocument.nationality = dinfo.nationality;
      this.data.personalInfo.nationalIdDocument.issuedBy = dinfo.nationalIdIssuer;
      this.data.personalInfo.nationalIdDocument.issuedDate = dinfo.nationalIdIssueDate;
      this.data.personalInfo.nationalIdDocument.expireDate = dinfo.nationalIdValidDate;
      this.data.personalInfo.gender = dinfo.gender;

      this.data.personalInfo.registrationAddress.street = dinfo?.registrationAddress?.street;
      this.data.personalInfo.registrationAddress.house = dinfo?.registrationAddress?.building;
      this.data.personalInfo.registrationAddress.apartment = dinfo?.registrationAddress?.flat;
      // this.data.personalInfo.registrationAddress.street = dinfo?.registrationAddress?.street;

    }
  }

  getLocations(){
    this.stepService.getLocations().subscribe(res => {
      this.districts = res;
    })
  }

  setPostalCode(res:boolean = false){
    if(res){
      this.data.personalInfo.residenceAddress.city = this.selectedDistrictResidence.name_ru;
      this.data.personalInfo.residenceAddress.region = this.selectedDistrictResidence.id;
    }else{
      this.data.personalInfo.registrationAddress.city = this.selectedCity.name_ru;
      this.data.personalInfo.registrationAddress.region = this.selectedCity.id;
    }
  }

  getCities(){
    this.cities = null;
    this.data.personalInfo.registrationAddress.district = this.selectedDistrict?.name_ru
    this.stepService.getCities(this.selectedDistrict?.id).subscribe(res => {
      this.cities = res;
    })
  }

  getResCities(){
    this.citiesres = null;
    this.data.personalInfo.residenceAddress.district = this.selectedDistrictResidence?.name_ru
    this.stepService.getCities(this.selectedDistrictResidence?.id).subscribe(res => {
      this.citiesres = res;
    })
  }

  setPasportData(){
    this.step = 2;
  }

  setAdressData(){
    this.step = 3
  }

  sendOTP(){
    this.registerService.sendOTP({msisdn:this.authService?.getUser?.username}).subscribe(res => {
      this.showSMSModal = true;
    })
  }

  sendCode(){
    if(this.code.length == 6 && !this.code.includes('-')){
      let data = {
        code: this.code,
        msisdn: this.authService?.getUser?.username
      }
      this.stepService.changeCardStatus(this.loanID).subscribe(res => {
        this.registerService.checkOTP(data).subscribe(res => {
          let order = {
            orderId: this.loanID,
            "backSuccessLink": "https://angular.kz/#/cabinet/cashed-out",
            "backFailureLink": "https://angular.kz/#/cabinet/cashed-out"
          }
          this.stepService.payoutCard(order).subscribe(res => {
            window.open(res.url)
            this.router.navigate(['/cabinet/cashed-out'])
          })
        })
      })
    }
  }

  finishStep(){
    if(this.data.personalInfo.sameAdress){
      this.data.personalInfo.residenceAddress = this.data.personalInfo.registrationAddress
    }
    if(this.data.loanPeriod){
      this.data.loanPeriod = Number(this.data.loanPeriod);
    }
    if(this.data.loanAmount){
      this.data.loanAmount = Number(this.data.loanAmount);
    }
    if(this.data.personalInfo.monthlyIncome){
      this.data.personalInfo.monthlyIncome = Number(this.data.personalInfo.monthlyIncome);
    }
    if(this.data.personalInfo.additionalMonthlyIncome){
      this.data.personalInfo.additionalMonthlyIncome = Number(this.data.personalInfo.additionalMonthlyIncome);
    }
    if(this.data.personalInfo.workExperience){
      this.data.personalInfo.workExperience = Number(this.data.personalInfo.workExperience);
    }
    if(this.data.personalInfo.numberOfKids){
      this.data.personalInfo.numberOfKids = Number(this.data.personalInfo.numberOfKids);
    }
    this.strokeLoading();
    this.stepService.submitStep(this.data).subscribe(res => {
       this.resultShow = true;
       this.successResult = true;
       this.loanID = res.orderId;
       this.loading = false;
    }, error => {
      this.resultShow = true;
      this.errorResult = true;
      this.loading = false;
    })
  }

}
