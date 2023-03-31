import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchUserComponent } from './components/search-user/search-user.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    ChatComponent,
    SearchUserComponent
  ],
  imports: [
    CommonModule,
    SweetAlert2Module,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule

  ]
})
export class SharedModule { }
