import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CabinetService {

  private REST_API_SERVER = environment.LOAN_URL;
  
  user:any;

  constructor(private  httpClient:  HttpClient, private router: Router) {}

  getOrders(params: any){
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/orders`, {params});
  }

}
