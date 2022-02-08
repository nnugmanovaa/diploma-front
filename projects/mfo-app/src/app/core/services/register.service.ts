import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private REST_API_SERVER = environment.API_URL;
  private LOAN_URL = environment.LOAN_URL;
  
  user:any;

  constructor(private  httpClient:  HttpClient, private router: Router) {}

  sendOTP(data: any){
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/v1/phone-verification`, data);
  }

  signUp(data: any){
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/v1/auth/signup`, data);
  }

  checkOTP(data: any){
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/v1/phone-verification/check`, data);
  }

  getConsent(params: any){
    return this.httpClient.get(`${this.REST_API_SERVER}/v1/loan/consent`, {params, responseType: 'blob'});    
  }

  getLoanRequestId(data:any){
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/v1/loan`, data);
  }

  getInfoByIIN(reqid:any){
    return this.httpClient.get(`${this.REST_API_SERVER}/v1/loan/${reqid}/personal-data`);
  }

  sendImage(reqid:any, image:any){
    return this.httpClient.put<any>(`${this.REST_API_SERVER}/v1/loan/${reqid}/match-identity`, image);
  }

  resendImage(reqid:any, image:any){
    return this.httpClient.put<any>(`${this.REST_API_SERVER}/v1/loan/${reqid}/identity/result`, image);
  }

  checkUser(number:any){
    return this.httpClient.get<any>(`${this.LOAN_URL}/public/client/${number}`);
  }
}
