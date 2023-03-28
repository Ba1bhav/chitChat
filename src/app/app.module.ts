import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from 'src/modules/auth/auth.module';
import { SharedModule } from 'src/modules/shared/shared.module';
import { RequestInterceptorInterceptor } from 'src/services/shared/request-interceptor.interceptor';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:RequestInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
