import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from 'src/modules/auth/components/login-user/login-user.component';
import { RegisterUserComponent } from 'src/modules/auth/components/register-user/register-user.component';
import { ChatComponent } from 'src/modules/shared/components/chat/chat.component';

const routes: Routes = [
{path:'register',component:RegisterUserComponent},
{path:'login',component:LoginUserComponent},
{path:'',component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
