import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service';
import {HttpClient} from "@angular/common/http";
import { ChannelLiked } from "../../entity/channelliked";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})



export class ChannelsComponent implements OnInit {
  userService: UserService;
  message = '';
  messages = [];
  channels = [];

  constructor(private chatService: ChatService, userService: UserService, private http: HttpClient) {
    this.userService = userService;
    this.chatService
    .listen('message')
    .subscribe(message => {
      this.messages.push(message);
    })
    this.channels.push(this.http.get('http://localhost:3000/channels/getbyOwnerId/' + this.userService.id));
    console.log('channels' + this.channels);
  }

  fetch_channels() {
    this.http.get('http://localhost:3000/channelsFav/liked/' + this.userService.id)
      .subscribe(
        (res: ChannelLiked) => {
          this.channels.push(res);
          this.channels.shift();
          console.log(this.channels);
        }  // display response data
      );
  }

  ngOnInit(): void {
    this.fetch_channels();
  }

  sendMessage() {
    this.chatService.sendMessage(" - " + this.userService.name + " : " + this.message);
    this.message = '';
  }

}
