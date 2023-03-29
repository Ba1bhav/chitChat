import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from 'src/modules/auth/components/login-user/login-user.component';
import { RegisterUserComponent } from 'src/modules/auth/components/register-user/register-user.component';
import { ChatComponent } from 'src/modules/shared/components/chat/chat.component';
import { SearchUserComponent } from 'src/modules/shared/components/search-user/search-user.component';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { ViewGuard } from 'src/services/shared/view.guard';

const routes: Routes = [
{path:'login',canActivate:[AuthGuard],component:LoginUserComponent},
{path:'register',canActivate:[AuthGuard],component:RegisterUserComponent},
{path:'chats',canActivate:[ViewGuard],canDeactivate:[ViewGuard],component:SearchUserComponent},
{path:'',redirectTo:'chats',pathMatch:'full'},
{path:'**',redirectTo:'chats'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYmFpYmhhdkBjaGljbWljLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkxvZ2luIiwiZXhwIjoxNjgwMTU3MTMyfQ.RaPf-b_FssS8ynjmdvPgc6ayi4SSr0sJWNF9D1wnogYuudoXuWvX7Ea5JaRXxTam1rgaJ4sQdF6ZqX4agORWYw
