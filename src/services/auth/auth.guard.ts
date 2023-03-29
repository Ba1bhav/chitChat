import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,CanDeactivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router:Router){}
  canActivate()
     {if(localStorage.getItem('token')){
      this._router.navigate(['/chats'])
      return false ;
     }
     else{

      return true
     }
  }
  canDeactivate(){
    if(localStorage.getItem('token')){
      this._router.navigate(['/chats'])
      return false;
     }
     else{
      return true
     }
  }
}
