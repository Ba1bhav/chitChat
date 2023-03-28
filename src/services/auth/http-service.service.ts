import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url,paths } from 'src/environments/constants';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(
    private requestClient:HttpClient
  ) { }
  postRegistrationData(Data:any){
    console.log(Data)
    return this.requestClient.post(url+paths.registration,Data)
  }
  logIn(Data:any){
    return this.requestClient.post(url+paths.logIn,Data)
  }
}
