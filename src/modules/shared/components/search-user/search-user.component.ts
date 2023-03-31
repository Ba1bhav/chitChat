import { Component, OnChanges, OnDestroy } from '@angular/core';
import { SharedHttpServiceService } from 'src/services/shared/shared-http-service.service';
import { ChatComponent } from '../chat/chat.component';
import { Router } from '@angular/router';
import { ConnectionStatusService } from 'src/services/shared/connection-status.service';
import { SoketService } from 'src/services/shared/soket.service';
import Swal from 'sweetalert2'
import { url } from 'src/environments/constants';
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnChanges,OnDestroy {
  timeoutHandler:any;//for custom Debouncing
  chatRoom:any;
  chatList:any;
  isChatDestroyed:boolean=false;
  searchResults:any;
  url=url;
  statusOnline:boolean= true;
  noResultsToShowToggle:boolean=false
  constructor(private signalManager:SoketService,private signalStatus:ConnectionStatusService,private httpClient:SharedHttpServiceService,private _router:Router){
    this.httpClient.searchUser('"').subscribe()
    console.log('search')
    console.log(this.chatList)
    this.signalManager.connection.on('ChatList',(response:any)=>{
    this.chatList=response?.data;})

    signalStatus.getStatus().subscribe((response:any)=>{
      this.statusOnline=response.status
      if(!response.status&&!this.isChatDestroyed)
      {
        Swal.fire({
          title:'The Internet?',
          text:'That thing is still around?',
          icon:'warning',
          footer:'Try Reloading If everything is fine',
          showConfirmButton:false,
          backdrop:false,
          allowOutsideClick:false,
          allowEscapeKey:false,
        }
        )
      }
      else{

        //getting Chat List
        console.log(this.chatList)
        this.signalManager.connection.on('ChatList',(response:any)=>{
          this.chatList=response?.data;
          console.log(this.chatList)
    //       dateOfBirth: "1981-01-01T00:00:00"
    //       email: "tarun.sharma2243535@chicmic.co.in"
    //       firstName: "Tarun"
    // ​      gender: 1
    // ​​      isActive: true
    // ​​​      lastName: "Sharma"
    // ​​​      phone: 7814984462
    // ​​​      profilePic: "wwwroot\\Images\\BoyImage_20230330065257363.png"
    // ​​​      userId: "de6b7c73-84cb-4fde-8bd7-0e67ac4fd361

        })
        Swal.close()
      }
    })
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
    this.isChatDestroyed=true
    this._router.navigate(['/login'])
  }
  searching(inputData:any){
    console.log('searching')
    this.httpClient.searchUser(inputData.value).subscribe((response:any)=>{
      console.log(response)
      this.searchResults=response.data;
      })
  }
  noResultsToShowToggler(){
    if(!this.searchResults||this.searchResults.length<1){
    this.noResultsToShowToggle=true;
    setTimeout(()=>this.noResultsToShowToggle=false,2500)
    }
  }
  ngOnChanges() {
    this.signalManager.getChatlist()
    this.signalManager.connection.on('ChatList',(response:any)=>{
     this.chatList=response?.data;})
  }
  ngOnDestroy(){
    // this.signalManager.connection.stop()
  }

}
