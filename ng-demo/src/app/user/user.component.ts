import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  users: User[]= [];

  constructor(private userService : UserService) { }

  ngOnDestroy(): void {
    document.body.className = "";
  }
  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = "hold-transition skin-blue sidebar-mini";
    this.loadAllUsers();
  }
  deleteUser(id: number) {
        this.userService.deleteUser(id).pipe(first()).subscribe(() => { 
        this.loadAllUsers(); 
    });
  }
  private loadAllUsers(){
    this.userService.getAllUsers().subscribe(
      (res: any) => {
        this.users = res.body.data.users
        console.log(this.users)
      }
    );
  }
  editUser(user: User) {
      console.log(user)
  }
}
