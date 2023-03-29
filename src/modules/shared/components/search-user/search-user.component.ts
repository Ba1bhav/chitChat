import { Component, EventEmitter, Output } from '@angular/core';
import { SharedHttpServiceService } from 'src/services/shared/shared-http-service.service';
// import { SoketService } from 'src/services/shared/soket.service';
import { ChatComponent } from '../chat/chat.component';
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent {
  chatRoom:any;
  searchResults:any;
  constructor(private httpClient:SharedHttpServiceService){}
  search(inputData:any){
    if(!inputData.value){
      this.searchResults=[]
    }
    else{
    this.httpClient.searchUser(inputData.value).subscribe((response:any)=>{
      this.searchResults=response.data;
    })
  }
  }
  createChat(userObject:any){
    this.chatRoom=userObject
    console.log(userObject)
  }
}
