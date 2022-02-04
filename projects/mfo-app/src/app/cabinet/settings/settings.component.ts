import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../core/services/register.service';
import { AuthService } from '../../core/services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
              private toastr: ToastrService,) {

              }

  ngOnInit(): void {
    this.authService.getUserId(this.authService?.getUser?.username).subscribe(res => {
      this.userId = res.clientsId;
      this.getPersonalData();
    })
  }

  getPersonalData(){
    this.authService.getUserDataById(this.userId).subscribe(res =>{
      if(res.addressInfoDto){
        this.data.addressInfoDto = res.addressInfoDto;
        this.hastData = true;
      }
      if(res.jobDetailsDto){
        this.data.jobDetailsDto = res.jobDetailsDto;
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
      this.authService.updateUser(this.data, this.userId).subscribe(res => {
        this.toastr.success('Настройки профиля', 'Данные сохранены');
      });
    }else{
      this.authService.CreateUserPasport(this.data.jobDetailsDto, this.userId).subscribe(res => {
        this.authService.updateUser(this.data, this.userId).subscribe(res => {
          this.toastr.success('Настройки профиля', 'Данные сохранены');
        });
      });
    }
  }

}
