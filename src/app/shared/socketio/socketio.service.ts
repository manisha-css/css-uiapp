import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/internal/Observable';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class SocketIOService {
  socket: SocketIOClient.Socket;

  constructor(private logger: NGXLogger) {
    const socketUrl = environment.SOCKET_URL;
    this.socket = io.connect(socketUrl);
    this.socket.nsp = '/css';
  }

  public disconnect() {
    this.logger.debug('system disconnect');
    this.socket.disconnect();
  }

  public emitMessage(key: string, data: any) {
    this.socket.emit(key, data);
  }

  observeRefreshOnlineUsersListMessages() {
    const observable = new Observable<any>(observer => {
      this.socket.on('refresh-onlineuserslist', () => {
        observer.next();
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
