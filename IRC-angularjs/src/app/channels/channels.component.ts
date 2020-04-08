import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  message = '';
  messages = [];

  constructor(private chatService: ChatService) { 
    this.chatService
    .listen('message')
    .subscribe(message => {
      this.messages.push(message);
    })
  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    //this.messages.push(this.message);
    this.message = '';
  }

}