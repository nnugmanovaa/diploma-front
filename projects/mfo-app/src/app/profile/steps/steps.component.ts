import { Component, OnInit } from '@angular/core';
import { StepService } from '../../core/services/step.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { RegisterService } from '../../core/services/register.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
            "region": 0,
            "city": null,
            // "postalCode": null,
            "street": null,
            "house": null,
            "apartment": null,
            "country": "Казахстан",
        },
        "residenceAddress": {
            "district": null,
            "region": 0,
            "city": null,
            // "postalCode": null,
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
        "monthlyIncome": "",
        "additionalMonthlyIncome": "",
        "workExperience": 0,
        "workPhoneNum": null,
        "maritalStatus": null,
        "gender": "",
        "numberOfKids": 0
    },
    "loanAmount": 0,
    "loanPeriod": 0,
    "loanProduct": null,
    "loanMethod": null,
    "preScoreRequestId": null,
  }

  userInfo:any = {
    "addressInfoDto": {
        "region": "",
        "city": "",
        // "postalCode": "",
        "street": "",
        "house": "",
        "apartment": "",
        "periodOfResidence": "",
        "addressIsValid": true
    },
    "jobDetailsDto": {
        "education": "",
        "employment": "",
        "typeOfWork": "",
        "workPosition": "",
        "employer": "",
        "monthlyIncome": "",
        "additionalMonthlyIncome": "",
        "maritalStatus": "",
        "numberOfKids": ""
    },
    "passportInfoDto": {
        "firstName":"",
        "lastName":"",
        "patronymic":"",
        "birthDate":"",
        "nationalIdNumber":"",
        "nationality":"",
        "nationalIdIssuer":"",
        "nationalIdIssueDate":"",
        "nationalIdValidDate":"",
        "isIpdl": true
    }
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

  stroke:any = "stroke-dasharray: 753.9822368615503, 753.9822368615503; stroke-dashoffset: 753.9822368615503;";
  intervalId:any = null;
  loading:boolean = false;
  percent:any = 0;

  resultShow:boolean = false;

  errorResult:boolean = false;
  successResult:boolean = false;
  alternativeResult:boolean = false;
  alternativeChoices:any = null;
  selectedChoice:any = null;
  loanID:any = null;

  showSMSModal:boolean = false;
  code:any = null;
  clientId:any = null;
  hasdata:boolean = false;
  constructor(public stepService:StepService,
              private route: ActivatedRoute,
              private router: Router,
              private registerService:RegisterService,
              public authService:AuthService) {

              }

  ngOnInit(): void {
    this.getLocations();
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

  createRequest(){
    let data = {
      firstName: this.data.personalInfo.firstName,
      iin: this.data.iin,
      lastName: this.data.personalInfo.lastName,
      patronymic: this.data.personalInfo.middleName,
      phone: this.authService.getUser.username,
    }
    this.registerService.getLoanRequestId(data).subscribe(res => {
      this.data.preScoreRequestId = res.requestId
      this.submitAll();
    })
  }

  getPersonalData(){
    this.authService.getUserDataById().subscribe(res =>{
      if(res.addressInfoDto){
        this.userInfo.addressInfoDto = res.addressInfoDto;
        this.data.personalInfo.registrationAddress.region = this.userInfo.addressInfoDto.region;
        this.data.personalInfo.registrationAddress.city = this.userInfo.addressInfoDto.city;
        // this.data.personalInfo.registrationAddress.postalCode = this.userInfo.addressInfoDto.postalCode;
        this.data.personalInfo.registrationAddress.street = this.userInfo.addressInfoDto.street;
        this.data.personalInfo.registrationAddress.house = this.userInfo.addressInfoDto.house;
        this.data.personalInfo.registrationAddress.apartment = this.userInfo.addressInfoDto.apartment;
        this.getDistrictById()
      }
      if(res.jobDetailsDto){
        this.userInfo.jobDetailsDto = res.jobDetailsDto;

        this.data.personalInfo.education = this.userInfo.jobDetailsDto.education;
        this.data.personalInfo.employment = this.userInfo.jobDetailsDto.employment;
        this.data.personalInfo.typeOfWork = this.userInfo.jobDetailsDto.typeOfWork;
        this.data.personalInfo.workPosition = this.userInfo.jobDetailsDto.workPosition;
        this.data.personalInfo.employer = this.userInfo.jobDetailsDto.employer;
        this.data.personalInfo.monthlyIncome = String(this.userInfo.jobDetailsDto.monthlyIncome);
        this.data.personalInfo.additionalMonthlyIncome = String(this.userInfo.jobDetailsDto.additionalMonthlyIncome);
        this.data.personalInfo.maritalStatus = this.userInfo.jobDetailsDto.maritalStatus;
        this.data.personalInfo.numberOfKids = this.userInfo.jobDetailsDto.numberOfKids;
      }
      if(res.passportInfoDto){
        this.userInfo.passportInfoDto = res.passportInfoDto;
        this.data.iin = this.userInfo.passportInfoDto.iin;
        this.data.personalInfo.firstName = this.userInfo.passportInfoDto.firstName;
        this.data.personalInfo.lastName = this.userInfo.passportInfoDto.lastName;
        this.data.personalInfo.middleName = this.userInfo.passportInfoDto.patronymic;
        this.data.personalInfo.birthDate = this.userInfo.passportInfoDto.birthDate;
        this.data.personalInfo.nationalIdDocument.idNumber = this.userInfo.passportInfoDto.nationalIdNumber;
        this.data.personalInfo.nationalIdDocument.nationality = this.userInfo.passportInfoDto.nationality;
        this.data.personalInfo.nationalIdDocument.issuedBy = this.userInfo.passportInfoDto.nationalIdIssuer;
        this.data.personalInfo.nationalIdDocument.issuedDate = this.userInfo.passportInfoDto.nationalIdIssueDate;
        this.data.personalInfo.nationalIdDocument.expireDate = this.userInfo.passportInfoDto.nationalIdValidDate;
      }
    })
  }

  getContract(){
    this.stepService.getContract(this.loanID).subscribe(res => {
      let file = URL.createObjectURL(res);
      window.open(file);
    });
  }

  createNewReq(){
    // console.log(this.selectedChoice)
    this.loanID = this.selectedChoice.orderId;
    this.data.loanAmount = this.selectedChoice.loanAmount;
    this.data.loanPeriod = this.selectedChoice.loanMonthPeriod;
    this.code = null;
    this.resultShow = false;
    this.alternativeResult = false;
    this.sendOTP();
  }

  strokeLoading(){
    this.loading = true;
    let perc = 0;
    this.fillSvg();
    this.intervalId = setInterval(() => {
      this.fillSvg();
    }, 1500);
  }

  fillSvg(){
    if(this.percent > 77){
      this.percent += Math.floor(Math.random() * 2) + 1;
    }else{
      this.percent += Math.floor(Math.random() * 6) + 1;
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
      if (dinfo.iin.charAt(6) == '1' || '3' || '5') {
        this.data.personalInfo.gender = 'male';
      } else {
        this.data.personalInfo.gender = 'female';
      }
      // this.data.personalInfo.gender = dinfo.gender;
      this.data.personalInfo.registrationAddress.street = dinfo?.registrationAddress?.street;
      this.data.personalInfo.registrationAddress.house = dinfo?.registrationAddress?.building;
      this.data.personalInfo.registrationAddress.apartment = dinfo?.registrationAddress?.flat;
      this.fillAddress(dinfo.registrationAddress)
    }
  }

  fillAddress(address:any){
    // console.log(address)
    if(!address){
      return
    }
    let selected = this.districts.filter((x:any)=> x.name_ru?.toLowerCase().includes(address?.district?.toLowerCase()))[0];
    if(selected){
      this.data.personalInfo.registrationAddress.region = selected.code;
      this.data.personalInfo.registrationAddress.city = (address.region?.charAt(0) + address.region?.slice(1).toLowerCase()).replace('р-н','район');
      console.log(this.data.personalInfo.registrationAddress.city)
      this.getDistrictById();
    }
  }

  getLocations(){
    this.stepService.getLocations().subscribe(res => {
      this.districts = res;
      if(!this.data.preScoreRequestId){
        this.getPersonalData();
      }else{
        this.fillData();
      }
    })
  }

  getDistrictById(){
    let code = this.data.personalInfo.registrationAddress.region;
    if(code){
      code = code * 1;
    }
    let d = this.districts.filter((x:any)=> x.code == code)[0];
    if(d){
      this.getCities(d.id);
      this.data.personalInfo.registrationAddress.district = d.name_ru;
    }
  }

  getResDistrictByID(){
    let code = this.data.personalInfo.residenceAddress.region;
    if(code){
      code = code * 1;
    }
    let d = this.districts.filter((x:any)=> x.code == code)[0];
    if(d){
      this.getResCities(d.id)
      this.data.personalInfo.residenceAddress.district = d.name_ru;
    }
  }


  getCities(id:any){
    this.cities = null;
    this.stepService.getCities(id).subscribe(res => {
      this.cities = res;
    })
  }

  getResCities(id:any){
    this.citiesres = null;
    this.stepService.getCities(id).subscribe(res => {
      this.citiesres = res;
    })
  }

  setPasportData(){
    this.step = 2;
    this.createPasportInfo();
  }

  setAdressData(){
    this.step = 3
    this.createAdressInfo();
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
            "backSuccessLink": "https://zaimem.kz/cabinet/cashed-out",
            "backFailureLink": "https://zaimem.kz/cabinet/cashed-out"
          }
          this.stepService.payoutCard(order).subscribe(res => {
            window.open(res.url, "_self")
            this.router.navigate(['/cabinet/cashed-out'])
          })
        })
      })
    }
  }

  finishStep(){
    if(this.data.loanPeriod){
      this.data.loanPeriod = Number(this.data.loanPeriod);
    }
    if(this.data.loanAmount){
      this.data.loanAmount = Number(this.data.loanAmount);
    }
    if(this.data.personalInfo.workExperience){
      this.data.personalInfo.workExperience = Number(this.data.personalInfo.workExperience);
    }
    if(this.data.personalInfo.numberOfKids){
      this.data.personalInfo.numberOfKids = Number(this.data.personalInfo.numberOfKids);
    }
    this.strokeLoading();

    if(this.data.personalInfo.sameAdress){
      this.data.personalInfo.residenceAddress = this.data.personalInfo.registrationAddress
    }

    if(!this.data.preScoreRequestId){
      this.createRequest();
    }else{
      this.submitAll();
    }

    this.createJobInfo()
  }

  submitAll(){
    this.stepService.submitStep(this.data).subscribe(res => {
      clearInterval(this.intervalId);
      if(res?.result == 'APPROVED'){
        this.resultShow = true;
        this.successResult = true;
        this.loanID = res.orderId;
        this.loading = false;
      }else if(res?.result == 'ALTERNATIVE'){
        this.resultShow = true;
        this.alternativeResult = true;
        this.loanID = res.orderId;
        this.loading = false;
        this.alternativeChoices = res.alternativeChoices;
        if(this.alternativeChoices.length == 1){
          this.selectedChoice = this.alternativeChoices[0];
        }
      }else{
        this.resultShow = true;
        this.errorResult = true;
        this.loading = false;
      }

    }, error => {
      this.resultShow = true;
      this.errorResult = true;
      this.loading = false;
      clearInterval(this.intervalId);
    })
  }

  createPasportInfo(){
    this.userInfo.passportInfoDto.iin = this.data.iin;
    this.userInfo.passportInfoDto.firstName = this.data.personalInfo?.firstName;
    this.userInfo.passportInfoDto.lastName = this.data.personalInfo?.lastName;
    this.userInfo.passportInfoDto.patronymic = this.data.personalInfo?.middleName;
    this.userInfo.passportInfoDto.birthDate = this.data.personalInfo?.birthDate;
    this.userInfo.passportInfoDto.nationalIdNumber = this.data.personalInfo?.nationalIdDocument.idNumber;
    this.userInfo.passportInfoDto.nationality = this.data.personalInfo?.nationalIdDocument.nationality;
    this.userInfo.passportInfoDto.nationalIdIssuer = this.data.personalInfo?.nationalIdDocument.issuedBy;
    this.userInfo.passportInfoDto.nationalIdIssueDate = this.data.personalInfo?.nationalIdDocument.issuedDate;
    this.userInfo.passportInfoDto.nationalIdValidDate = this.data.personalInfo?.nationalIdDocument.expireDate;

    this.authService.CreateUserPasport(this.userInfo.passportInfoDto).subscribe(res => {

    });
  }

  createJobInfo(){
    this.userInfo.jobDetailsDto.education = this.data.personalInfo?.education;
    this.userInfo.jobDetailsDto.employment = this.data.personalInfo?.employment;
    this.userInfo.jobDetailsDto.typeOfWork = this.data.personalInfo?.typeOfWork;
    this.userInfo.jobDetailsDto.workPosition = this.data.personalInfo?.workPosition;
    this.userInfo.jobDetailsDto.employer = this.data.personalInfo?.employer;
    this.userInfo.jobDetailsDto.monthlyIncome = this.data.personalInfo?.monthlyIncome;
    this.userInfo.jobDetailsDto.additionalMonthlyIncome = this.data.personalInfo?.additionalMonthlyIncome;
    this.userInfo.jobDetailsDto.maritalStatus = this.data.personalInfo?.maritalStatus;
    this.userInfo.jobDetailsDto.numberOfKids = this.data.personalInfo?.numberOfKids;

    this.authService.CreateUserJobDetails(this.userInfo.jobDetailsDto).subscribe(res => {

    });
  }

  createAdressInfo(){
    this.userInfo.addressInfoDto.region = this.data.personalInfo?.registrationAddress?.region
    this.userInfo.addressInfoDto.city = this.data.personalInfo?.registrationAddress?.city
    // this.userInfo.addressInfoDto.postalCode = this.data.personalInfo?.registrationAddress?.postalCode
    this.userInfo.addressInfoDto.street = this.data.personalInfo?.registrationAddress?.street
    this.userInfo.addressInfoDto.house = this.data.personalInfo?.registrationAddress?.house
    this.userInfo.addressInfoDto.apartment = this.data.personalInfo?.registrationAddress?.apartment
    this.userInfo.addressInfoDto.addressIsValid = true;
    this.authService.CreateUserAdress(this.userInfo.addressInfoDto).subscribe(res => {

    });
  }

  updateUser(){
    if(this.hasdata){
      this.authService.updateUser(this.userInfo).subscribe(res => {

      });
    }
  }

}
