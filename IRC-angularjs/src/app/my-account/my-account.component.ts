import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  userService: UserService;

  constructor(userService: UserService) { 
    this.userService = userService;
  }

  ngOnInit(): void {
  }

}
