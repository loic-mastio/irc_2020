export class UserConnected {
  constructor(public id: number,
              public name: string,
              public password: string,
              public photo_url: string,
              public is_disabled: boolean
  ){

  }
}
