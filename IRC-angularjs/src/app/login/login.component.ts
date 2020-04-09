import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserConnected } from "../../entity/user_connected";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  user = new UserConnected(1, 'LOL', 'LOL', 'ezrrezr', false);
  userService: UserService;

  constructor(private http: HttpClient, private router: Router, userService: UserService) { 
    this.userService = userService;
  }

  onSubmit() {
    this.submitted = true;
    //Submitting the form (or model) data to REST endpoint
    // @ts-ignore
    this.http.get('http://localhost:3000/users/connection/' + this.user.name + '/' + this.user.password)
      .subscribe(
        (res: UserConnected) => {
          this.setUserName(res.name);
            this.router.navigate(['/channels']);
        }  // display response data
      );
  }

  ngOnInit(): void {
  }

  setUserName(name: string) {
    this.userService.setName(name);
  }
}
