import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from "../../entity/user";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {
  submitted = false;
  user = new User('Loic', 'Patel', 'test2', 'ezrrezr');

  constructor(private http: HttpClient){

  }

  onSubmit() {
    this.submitted = true;
    console.log(this.user);
    //Submitting the form (or model) data to REST endpoint
    this.http.post('http://localhost:3000/users/create', this.user)
      .subscribe(
        (res: User) => {console.log(res.name);}  // display response data
      );
  }
  ngOnInit() {

  }
}
