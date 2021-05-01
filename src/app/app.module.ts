import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginComponent} from "./core/components/login/login.component";
import {AppRoutingModule} from "./app.routing";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RegistrationComponent} from "./core/components/registration/registration.component";
import {HomeComponent} from "./core/components/home/home.component";
import {PostCreateComponent} from "./core/components/home/post-create/post-create.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LocalStorageService} from "ngx-store";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ProfileComponent} from "./core/components/profile/profile.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    PostCreateComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
