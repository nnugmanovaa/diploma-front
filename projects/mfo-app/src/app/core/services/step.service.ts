import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private REST_API_SERVER = environment.API_URL;
  private LOAN_URL = environment.LOAN_URL;
  user:any;

  constructor(private  httpClient:  HttpClient, private router: Router) {}

  getLocations(id:any = 2){
    return this.httpClient.get(`${this.REST_API_SERVER}/v1/location/level/${id}`);
  }

  getCities(id:any){
    return this.httpClient.get(`${this.REST_API_SERVER}/v1/location/${id}/children`);
  }

  submitStep(data:any){
    return this.httpClient.post<any>(`${this.LOAN_URL}/score/start-loan-process`, data);
  }

  getAnketa(id:any){
    return this.httpClient.get(`${this.LOAN_URL}/orders/loan-debtor-form/${id}`, {responseType: 'blob'});
  }

  getContract(id:any){
    return this.httpClient.get(`${this.LOAN_URL}/orders/${id}/contract`, {responseType: 'blob'});
  }

  payoutCard(data:any){
    return this.httpClient.post<any>(`${this.LOAN_URL}/payout/card`, data);
  }

  changeCardStatus(id:any){
    return this.httpClient.put<any>(`${this.LOAN_URL}/orders/${id}/approve`,{});
  }
}
