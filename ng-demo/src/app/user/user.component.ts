import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";
import { first } from 'rxjs/operators';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  users: User[]= [];

  constructor(private userService : UserService, private router: Router) { }

  ngOnDestroy(): void {
    document.body.className = "";
  }
  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = "hold-transition skin-blue sidebar-mini";
    this.loadAllUsers();
  }
  deleteUser(user) {
      this.userService.deleteUser(user.id).pipe(first()).subscribe(data => {
          this.users = this.users.filter(u => u !== user);
        });
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
    this.router.navigate(['user-detail']);
  }
}
