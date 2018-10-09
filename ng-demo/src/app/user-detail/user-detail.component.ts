import { Component, OnInit,OnDestroy } from '@angular/core';
import { UserService } from "../_services/user.service";
import { Router, ActivatedRoute } from '@angular/router';
import { first } from "rxjs/operators";
import { MessageService } from "../_services/message.service";
import { User } from "../_models/user";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User[]= [];
  constructor( 
    private router:Router,
    private userService: UserService
  ) { }

  
  ngOnDestroy(): void {
    document.body.className = "";
  }
  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = "hold-transition skin-blue sidebar-mini";
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
