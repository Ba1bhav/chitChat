import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SoketService } from 'src/services/shared/soket.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnChanges {
  @Input() chatRoom:any;
  messages:any;
  chatForm:FormGroup;
constructor(private formBuilder:FormBuilder,private signalSocket:SoketService){
  this.chatForm=formBuilder.group(
    {
      message:['',Validators.required],
    }
  )
  this.signalSocket.connection.on('RecieveMessage',(response:any)=>{console.log(response)})

}

ngOnChanges(){
  if(this.chatRoom){
      this.signalSocket.createChat(this.chatRoom?.email).then((response:any)=>console.log(response))
      this.signalSocket.loadChatMessages(this.chatRoom?.email,1).then((response:any)=>{
      this.messages=response?.data?.messages;
      // [ { "messageId": "b2be410c-89d3-4010-97b2-78cfc80dc538",
      // "senderEmail": "baibhav@chicmic.com",
      //  "receiverEmail": "tarun.sharma@chicmic.co.in",
      //  "messages": "hello tarun", "messageType": 1,
      //  "timeStamp": "2023-03-29T06:47:08.3831426" } ]

      console.log(this.messages,response?.data?.messages)
  })
  }
}



sendMessage(recieverEmail:string){
  this.signalSocket.sendMessage(recieverEmail,this.chatForm?.value?.message).then((response:any)=>{
    this.messages.push(response?.data)
  })
  this.chatForm.reset()
}

}
