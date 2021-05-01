import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {LocalStorageService} from "ngx-store";
import {JwtHelperService as _JwtHelperService} from '@auth0/angular-jwt';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

const JwtHelperService = {
  provide: _JwtHelperService,
  useFactory: () => new _JwtHelperService()
};

interface OAuth2Res {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user_id: string;
}

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  providers: [UserService, JwtHelperService]
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService, private localStorage: LocalStorageService,
              private jwtHelperService: _JwtHelperService, private router: Router,
              private toastr: ToastrService) {}

  ngOnInit() {
  }

  login(){
    this.userService.login(this.user).subscribe(
      res => {
        //TODO show toast message and handle response by respone status
        if(res.access_token){
          this.toastr.success('Login successfully completed', 'Login');
          this.handleRes(res);
        } else {
          this.toastr.error('Login failed', 'Login');
        }
      },
      error => this.toastr.error('Login failed', 'Login')
    );
  }

  //TODO move this to a proper service
  handleRes(res: OAuth2Res){
    if(res.access_token){
      this.router.navigate(['home']);
      this.saveLoginData(res);
      this.saveUserId();
    }
  }

  //TODO move this to a proper service
  saveUserId() {
    const username = this.localStorage.get('user_name');
    this.userService.getUserByUsername(username).subscribe(
      user => this.localStorage.set('user_id', user.id),
      error => console.log(error)
    )
  }

  //TODO move this to a proper service
  saveLoginData(res: OAuth2Res): void {
    this.localStorage.set('access_token', res.access_token);
    this.localStorage.set('refresh_token', res.refresh_token);
    this.localStorage.set('expires_in', res.expires_in);
    this.localStorage.set('user_name', this.jwtHelperService.decodeToken(res.access_token).user_name);
  }

}
