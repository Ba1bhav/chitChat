import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { HttpServiceService } from 'src/services/auth/http-service.service';
import { regData } from 'src/utils/interfaces';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {
  errorToggle:boolean=false;

  constructor(private _router:Router,private httpClient:HttpServiceService,private formsBuilder:FormBuilder){}

  registrationForm=this.formsBuilder.group({
  registrationData:this.formsBuilder.group({
    firstname:['',[Validators.required,Validators.minLength(3)]],
    lastname:['',[Validators.required,Validators.minLength(3)]],
    mobile:[,[Validators.required,Validators.minLength(10)]],
    email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
    password:['',[Validators.required,Validators.minLength(8),Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$')]],
    dateOfBirth:['',[Validators.required,]]
  }),
  confirmations:this.formsBuilder.group({
    confirmPassword:['',[Validators.required,]]
  }),
  ConfirmPassword:this.matchPasswords()

})


  matchPasswords():boolean{
    return this.registrationFormControls?.password?.value !== this.confirmationControls?.confirmPassword?.value
  }
  get confirmationControls(){
    return this.registrationForm?.controls?.confirmations?.controls
  }
  get registrationFormControls(){
    return this.registrationForm?.controls?.registrationData.controls
  }

  errorToggler(){
    this.errorToggle=true;
    setTimeout(()=>this.errorToggle=false,2000)
  }
  signUp(){
    console.log(this.registrationForm.value)
    const Data:regData={} as regData;
    Data['firstName']=this.registrationForm.value?.registrationData?.firstname||''
    Data['lastName']=this.registrationForm.value?.registrationData?.lastname||'';
    Data['email']=this.registrationForm.value?.registrationData?.email||''
    Data['password']=this.registrationForm.value?.registrationData?.password||''
    Data['dateOfBirth']=this.registrationForm.value?.registrationData?.dateOfBirth||''
    Data['phone'] = parseInt(this.registrationForm.value?.registrationData?.mobile!);

    this.httpClient.postRegistrationData(Data).subscribe((response:any)=>{
      console.log(response)
    })
  }
  numberCheck(value:any){
    value.value=value.value.match('[0-9]+')
  }
  loginUser(){
    this._router.navigate(['/login'])
  }
}
