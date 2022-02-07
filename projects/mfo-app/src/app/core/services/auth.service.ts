import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private REST_API_SERVER = environment.API_URL;
  private ADMIN_URL = environment.ADMIN_URL;
  private LOAN_URL = environment.LOAN_URL;

  user:any;

  constructor(private  httpClient:  HttpClient, private router: Router) {}

  login(data: any){
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/v1/auth/signin/`, data);
  }

  public saveUser(user:any){
    this.user = user;
    localStorage.setItem('token', this.user.type + ' ' + this.user.token);
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  public resetPassword(data:any){
     return this.httpClient.post(`${this.ADMIN_URL}/users/change-password/`, data);
  }

  public changePassword(data:any){
    return this.httpClient.post(`${this.REST_API_SERVER}/v1/password/change/`, data);
  }

  public payment(data:any){
    return this.httpClient.post<any>(`${this.LOAN_URL}/loans/init-payment`, data);
  }

  public sendSms(data:any){
    return this.httpClient.post(`${this.REST_API_SERVER}/v1/phone-verification`, data);
  }

  public sendSmsCode(data:any){
    return this.httpClient.put(`${this.REST_API_SERVER}/v1/auth/pass-reset`, data);
  }

  public getUserId(phone:any){
    return this.httpClient.get<any>(`${this.LOAN_URL}/clients/${phone}`);
  }

  public CreateUserPasport(data:any){
    var lastN = JSON.stringify(data.lastName);
    localStorage.setItem('name', lastN.substr(1, lastN.length-2)+" "+JSON.stringify(data.firstName)[1]+".");
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/v1/clients/passport-info`, data);
  }

  public CreateUserJobDetails(data:any){
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/v1/clients/job-details`, data);
  }

  public CreateUserAdress(data:any){
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/v1/clients/address-info`, data);
  }

  public getUserDataById(){
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/v1/clients/full-personal-info`);
  }

  public updateUser(data:any){
    return this.httpClient.put<any>(`${this.REST_API_SERVER}/v1/clients/update-personal-info`,data);
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return  token  !==  null;
  }

  get getUser(){
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
  get getUserName(){
    if (localStorage.getItem('name') == null) {
      return false;
    } else {
      return localStorage.getItem('name');
    }
  }
  logout(){
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('pinfo');
      this.router.navigate(['/']);
  }

}
