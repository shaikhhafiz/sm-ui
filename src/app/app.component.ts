import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "ngx-store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isLoggedIn: boolean = false;

  constructor(private localStorage: LocalStorageService, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn = this.localStorage.get('access_token') != null;
  }

  logout() {
    this.localStorage.clear();
    this.isLoggedIn = this.localStorage.get('access_token') != null;
    this.router.navigate(['login']);
  }
}
