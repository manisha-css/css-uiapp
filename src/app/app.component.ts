import { SocketIOService } from './shared/socketio/socketio.service';
import { Component, OnInit } from '@angular/core';
// import * as io from 'socket.io-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  // socket: SocketIOClient.Socket;

  cnt: number;
  title = 'css-uiapp';
  languageList = [
    // <--- add this
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' }
  ];

  constructor(private socketIOService: SocketIOService) {
    console.log(this.socketIOService.url);
    // this.sendMessage();
  }

  ngOnInit() {}
}
