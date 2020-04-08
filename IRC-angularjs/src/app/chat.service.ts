import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private url = 'http://localhost:3000';
  socket: any;

  constructor() {
    this.socket = io(this.url);
  }

  public emit(eventName: string, data:any) {
    this.socket.emit(eventName, data);
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public listen(eventName: string) {
    return new Observable((observer) => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      });
    });
  }
}
