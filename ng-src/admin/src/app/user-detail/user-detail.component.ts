import { Component, OnInit} from '@angular/core';
import { UserService } from "../shared/services/user.service";
import { Router, ActivatedRoute } from '@angular/router';
import { first } from "rxjs/operators";
import { User } from "../models/user";
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  animations: [routerTransition()]
})
export class UserDetailComponent implements OnInit {

  user: User[]= [];

  constructor( 
    private router:Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    let userId = localStorage.getItem("viewUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['users']);
      return;
    }
    this.userService.getUserById(+userId).pipe(first()).subscribe((data : any) => {
         this.user = data.body.data.user;
    });
  }

}