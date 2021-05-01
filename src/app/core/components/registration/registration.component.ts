import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
  providers: [UserService]
})
export class RegistrationComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService, private router: Router,
              private toastr: ToastrService) {}

  ngOnInit() {
  }

  register() {
    this.userService.register(this.user).subscribe(
      res => {
        //TODO show toast message and handle response by respone status
        if(res.id){
          this.toastr.success('Registration successfully completed', 'Registration');
          this.handleResponse(res)
        } else {
          this.toastr.error('Registration failed', 'Registration');
        }
      },
      error => this.toastr.error('Registration failed', 'Registration')
    );
  }

  handleResponse(res: User) {
    if(res.username) this.router.navigate(['login']);
  }
}
