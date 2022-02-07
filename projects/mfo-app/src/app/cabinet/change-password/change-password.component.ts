import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'mfo-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm:any = {
    oldPassword:null,
    newPassword:null,
    password:null
  }
  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth:AuthService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.passwordForm.username = this.auth.getUser?.username;
  }

  submitForm(){
    if(this.passwordForm.newPassword !== this.passwordForm.password){
      this.toastr.error('Пароль не изменён, так как новый пароль повторен неправильно.', 'Ошибка!');
      return;
    }
    this.auth.resetPassword(this.passwordForm).subscribe(res => {
      this.toastr.success('Пароль изменён');
      if(res){
        this.auth.saveUser(res);
        this.toastr.success('Пароль изменён', 'Персональные данные');
        // this.router.navigate(['/cabinet']);
      }
    })
  }

}
