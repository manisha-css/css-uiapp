import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicUserService } from './../basicuser.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private basicUserService: BasicUserService) {}

  ngOnInit() {
    this.logout();
  }

  logout() {
    this.basicUserService.clearLocalCache();
    this.router.navigate(['/user/login']);
  }
}
