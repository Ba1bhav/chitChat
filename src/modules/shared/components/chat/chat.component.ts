import { Component, Input, OnChanges, OnDestroy, SimpleChanges,ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SoketService } from 'src/services/shared/soket.service';
import { SharedHttpServiceService } from 'src/services/shared/shared-http-service.service';
import { url } from 'src/environments/constants';
import { ConnectionStatusService } from 'src/services/shared/connection-status.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnChanges ,OnDestroy{
  urlHandler=URL;
  url=url;
  @Input() chatRoom:any;
  messages:any;
  chatForm:FormGroup;
  fileExists:boolean=true
  fileHandler:any;
  imageExtensions=['jpg','jpeg','gif','png',]
  imageUrl:any=''
constructor(private scroller: ViewportScroller,private elementRef:ElementRef,private signalStatus:ConnectionStatusService,private httpService:SharedHttpServiceService,private formBuilder:FormBuilder,private signalSocket:SoketService, private connectionStatusService:ConnectionStatusService){
  console.log('chat')
  this.signalSocket.startConnection().then((response:any)=>{
    console.log('Connected');
    this.signalStatus.emitConnected()
    this.signalSocket.getChatlist()
    }).catch(()=>{this.signalStatus.emitDisconnected()})
  this.chatForm=formBuilder.group(
    {
      message:['',],
    }
  )
  this.signalSocket.connection.on('ReceiveMessage',(response:any)=>{
  this.messages.push(response?.data)

  })
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
        console.log(this.chatRoom)
  })
  }
}



sendMessage(recieverEmail:string){
  if(this.fileHandler){
    const messageFile=new FormData();
    messageFile.append('File',this.fileHandler)
    console.log('sending',messageFile)
    this.httpService.fileUpload(messageFile,2).subscribe((response:any)=>{
      this.signalSocket.sendMessage(recieverEmail,url+'/'+response?.data,2).then(()=>{
        this.removeFile()
      })

    })
  }
  else{
  this.signalSocket.sendMessage(recieverEmail,this.chatForm?.value?.message,1).then((response:any)=>{
  })
}
  this.chatForm.reset()

}
messageFileUpload(event:any){
  this.fileHandler=event.srcElement.files[0]
  this.fileHandler.isImage=this.imageExtensions.includes(this.fileHandler.type.split('/')[1].toLowerCase())
  let reader = new FileReader();
  reader.readAsDataURL(event?.srcElement?.files[0]);
  reader.onload = (_event) => {
    this.imageUrl = reader.result;
  }

}
removeFile(){
  this.fileHandler=null
}
ngOnDestroy(){
  this.signalSocket.disconnectSocket()
  this.signalSocket.connection.stop()
}
// emitTesting(){
//   this.connectionStatusService.emitConnected();
// }
}
