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
  user:any;

  constructor(private  httpClient:  HttpClient, private router: Router) {}

  login(data: any){
    if(data.username){
      data.username = data.username.toString().replace(/\+/gi, '')
    }
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/auth/signin/`, data);
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
    return this.httpClient.post(`${this.REST_API_SERVER}/password/change/`, data);
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return  token  !==  null;
  }

  get getUser(){
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout(){
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['/']);
  }

}
