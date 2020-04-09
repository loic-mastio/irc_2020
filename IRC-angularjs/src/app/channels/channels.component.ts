import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  userService: UserService;
  message = '';
  messages = [];

  constructor(private chatService: ChatService, userService: UserService) { 
    this.userService = userService;
    this.chatService
    .listen('message')
    .subscribe(message => {
      this.messages.push(message);
    })
  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.chatService.sendMessage(" - " + this.userService.name + " : " + this.message);
    this.message = '';
  }

}