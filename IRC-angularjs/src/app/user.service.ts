import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  name: string = 'Anonymous';

  constructor() { }

  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}
