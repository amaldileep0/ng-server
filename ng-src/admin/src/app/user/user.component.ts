import { Component, OnInit} from '@angular/core';
import { User } from "../models/user";
import { UserService } from "../shared/services/user.service";
import { first } from 'rxjs/operators';
import { Router } from "@angular/router";
import { routerTransition } from '../router.animations';
import { ConfirmService } from "../shared/services/confirm.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [routerTransition()]
})
export class UserComponent implements OnInit {

  users: User[]= [];

  constructor(
    private userService : UserService,
    private router: Router,
    private confirmService : ConfirmService
  ) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    this.loadAllUsers();
  }
  
  deleteUser(user: User): void {
    this.confirmService.confirm('Please confirm..', 'Do you really want to delete the user... ?')
    .then(
        (confirmed) => {
          if(confirmed === true) {
            this.userService.deleteUser(user.id)
            .subscribe( data => {
              this.users = this.users.filter(u => u !== user);
            })
        }
      }
    )
  }
  private loadAllUsers(){
    this.userService.getAllUsers().subscribe(
      (res: any) => {
        this.users = res.body.data.users
      }
    );
  }
  editUser(user: User): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };
  viewUser(user : User):void {
    localStorage.removeItem("viewUserId");
    localStorage.setItem("viewUserId", user.id.toString());
    this.router.navigate(['view']);
  }
}