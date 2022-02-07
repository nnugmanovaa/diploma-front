import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../core/services/register.service';
import { AuthService } from '../../core/services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StepService } from '../../core/services/step.service';

@Component({
  selector: 'mfo-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  data:any = {
    "addressInfoDto": {
        "region": "",
        "city": "",
        "postalCode": "",
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
        "isIpdl": true,
    }
  }

  cities:any = null;
  districts:any = null;
  selectedCity:any = null;
  selectedDisctirct:any = null;
  userId:any = null;
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
  hastData:boolean = false;
  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private registerService:RegisterService,
              public authService:AuthService,
              private toastr: ToastrService,
              public stepService:StepService,) {

              }

  ngOnInit(): void {
    // this.userId = this.authService.getUser.clientId;
    this.getLocations();
    // if(this.userId){
      this.getPersonalData();
    // }
  }

  getLocations(){
    this.stepService.getLocations().subscribe(res => {
      this.districts = res;
    })
  }

  getDistrictById(){
    let code = this.data.addressInfoDto.region;
    if(code){
      code = code * 1;
    }
    this.selectedDisctirct = this.districts.filter((x:any)=> x.code == code)[0];
    if(this.selectedDisctirct){
      this.getCities(this.selectedDisctirct.id)
    }
  }


  getCities(id:any){
    this.cities = null;
    this.stepService.getCities(id).subscribe(res => {
      this.cities = res;
    })
  }

  getPersonalData(){
    this.authService.getUserDataById().subscribe(res =>{
      if(res.addressInfoDto){
        this.data.addressInfoDto = res.addressInfoDto;
        this.hastData = true;
        if(this.data.addressInfoDto.region){
          this.getDistrictById()
        }
      }
      if(res.jobDetailsDto){
        this.data.jobDetailsDto = res.jobDetailsDto;
        this.data.jobDetailsDto.monthlyIncome = String(res.jobDetailsDto.monthlyIncome);
        this.data.jobDetailsDto.additionalMonthlyIncome = String(res.jobDetailsDto.additionalMonthlyIncome);
        this.hastData = true;
      }
      if(res.passportInfoDto){
        this.data.passportInfoDto = res.passportInfoDto;
        this.hastData = true;
      }
    })
  }

  updateData(){
    if(this.hastData){
      this.authService.updateUser(this.data).subscribe(res => {
        this.toastr.success('Настройки профиля', 'Данные сохранены');
      });
    }else{
      this.authService.CreateUserPasport(this.data.jobDetailsDto).subscribe(res => {
        this.authService.updateUser(this.data).subscribe(res => {
          this.toastr.success('Настройки профиля', 'Данные сохранены');
        });
      });
    }
  }

}
