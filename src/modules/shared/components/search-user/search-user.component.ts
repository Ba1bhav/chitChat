import { Component, EventEmitter, Output } from '@angular/core';
import { SharedHttpServiceService } from 'src/services/shared/shared-http-service.service';
import { ChatComponent } from '../chat/chat.component';
import { Router } from '@angular/router';
import { ConnectionStatusService } from 'src/services/shared/connection-status.service';
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent {
  timeoutHandler:any;//for custom Debouncing
  chatRoom:any;
  searchResults:any;
  statusOnline:boolean= false;
  constructor(private signalStatus:ConnectionStatusService,private httpClient:SharedHttpServiceService,private _router:Router){
    signalStatus.status.subscribe((response:any)=>{this.statusOnline=response.status,console.log(response)})
  }
  search(inputData:any){
    if(!inputData.value){
      this.searchResults=[]
    }
    else{
    if(this.statusOnline){
      clearTimeout(this.timeoutHandler)
      this.timeoutHandler=setTimeout(()=>this.searching(inputData),1000)
}
  }
  }
  createChat(userObject:any){
    this.chatRoom=userObject
    console.log(userObject)
  }
  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/login'])
  }
  searching(inputData:any){
    console.log('searching')
    this.httpClient.searchUser(inputData.value).subscribe((response:any)=>{
      this.searchResults=response.data;
      })
  }
}
