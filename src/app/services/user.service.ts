import { Injectable } from '@angular/core';
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User = {id: '', name: ''};

  constructor() { }

  public getUser(): User {
    return this.user;
  }

  public setUser(user: User): void {
    this.user = user;
  }

}
