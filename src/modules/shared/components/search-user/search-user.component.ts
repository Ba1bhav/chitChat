import { Component } from '@angular/core';
import { SharedHttpServiceService } from 'src/services/shared/shared-http-service.service';
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent {
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
}
