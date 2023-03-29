import { Component } from '@angular/core';
import { HttpServiceService } from 'src/services/auth/http-service.service';
import { Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {
  errorToggle: boolean=false;
  constructor(private httpHandler:HttpServiceService ,private logInForm:FormBuilder,private _router:Router){
  }


logIn() {
  this.httpHandler.logIn(this.loginForm.value)
  .subscribe((response:any)=>
  { console.log('response',response)
    if(response?.data?.token){
    localStorage.setItem('token',response?.data?.token)
    this._router.navigate(['/chats'])
    }
    else{
      console.log('Invalid Credentials')
    }
  },
  )
}
errorToggler(){
  this.errorToggle=true;
  setTimeout(()=>this.errorToggle=false,2000)
}
  loginForm=this.logInForm.group({
  email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
  password:['',[Validators.required,Validators.minLength(8)]],
})
get __loginControls(){
  return this.loginForm?.controls
}
registerUser(){
  this._router.navigate(['/register'])
}
}
