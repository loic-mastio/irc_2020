import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-channel',
  templateUrl: './my-channel.component.html',
  styleUrls: ['./my-channel.component.css']
})

export class MyChannelComponent implements OnInit {
  userService: UserService;

  constructor(userService: UserService) { 
    this.userService = userService;
  }

  ngOnInit(): void {
  }

}
