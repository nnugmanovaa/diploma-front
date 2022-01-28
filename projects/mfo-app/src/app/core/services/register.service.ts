import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private REST_API_SERVER = environment.API_URL;
  
  user:any;

  constructor(private  httpClient:  HttpClient, private router: Router) {}

  sendOTP(data: any){
    if(data.msisdn){
      data.msisdn = data.msisdn.toString().replace(/\+/gi, '')
    }
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/phone-verification/`, data);
  }

}
