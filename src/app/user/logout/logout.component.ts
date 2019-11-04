import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicUserService } from './../basicuser.service';
import { SocketIOService } from 'src/app/shared/socketio/socketio.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private socketIOService: SocketIOService, private basicUserService: BasicUserService) {}

  ngOnInit() {
    this.logout();
  }

  logout() {
    // emit the message to server
    this.socketIOService.emitMessage('logoutsuccess', this.basicUserService.basicuser);
    this.basicUserService.clearLocalCache();
    this.router.navigate(['/user/login']);
  }
}
