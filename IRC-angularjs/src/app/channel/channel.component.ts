import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateChannel } from '../../entity/createchannels';
import { UserService } from '../user.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  submitted = false;
  channel = new CreateChannel('NomDuchanel', 0, 1, 1);
  userService: UserService;

  constructor(private http: HttpClient, userService: UserService) {
    this.userService = userService;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.channel);
    //Submitting the form (or model) data to REST endpoint
    this.http.post('http://localhost:3000/channels/create', this.channel)
      .subscribe(
        (res: CreateChannel) => {console.log(res.name);}  // display response data
      );
  }
  ngOnInit(): void {
  }

}
