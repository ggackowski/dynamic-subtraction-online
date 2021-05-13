import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-init-user',
  templateUrl: './init-user.component.html',
  styleUrls: ['./init-user.component.scss']
})
export class InitUserComponent implements OnInit {
  public username: string;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public createUser(): void {
    this.firestore.collection('pendingUsers').add({name: this.username}).then((user) => {
      this.userService.setUser({
        id: user.id,
        name: this.username
      });
      this.router.navigate(['games']);
    });
  }

}
