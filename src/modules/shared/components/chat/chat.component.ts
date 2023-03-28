import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { messages } from '../../../../utils/roomchat';
import { SearchUserComponent } from '../search-user/search-user.component';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages=messages;
  chatForm:FormGroup;
constructor(private formBuilder:FormBuilder){
  this.chatForm=formBuilder.group(
    {
      message:['',Validators.required],
      owner:['baibhav',[]]
    }
  )
}
out(){
  console.log(this.chatForm)
  messages.push(this.chatForm.value)
  this.chatForm.reset()
}
}
