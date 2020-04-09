import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  name: string = 'Anonymous';
  id: number = 0;

  constructor() { }

  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
  setID(id: number) {
    this.id = id;
  }
}
