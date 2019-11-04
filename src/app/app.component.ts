import { SocketIOService } from './shared/socketio/socketio.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  cnt: number;
  title = 'css-uiapp';
  languageList = [{ code: 'en', label: 'English' }, { code: 'fr', label: 'French' }];

  constructor(private socketIOService: SocketIOService) {
    console.log(this.socketIOService.socket.id);
  }

  ngOnInit() {}
}
