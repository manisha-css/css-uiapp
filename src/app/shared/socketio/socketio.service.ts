import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/internal/Observable';
// import { Observable } from 'rxjs';

@Injectable()
export class SocketIOService {
  url = 'http://localhost:3000';
  socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect('http://localhost:3000');
    this.sendMessage('My message');
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create(observer => {
      this.socket.on('login', data => {
        observer.next(data);
      });
    });
  };
}
