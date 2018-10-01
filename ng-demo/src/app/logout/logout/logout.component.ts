import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../_services/authentication.service";
import { Router } from "@angular/router";
import { MessageService } from "../../_services/message.service";


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService, private router : Router, private messageService: MessageService) { }
  ngOnInit() {
     this.authenticationService.logout().subscribe(
        data => {
          if(data.success) {
            this.router.navigate(['/login'])
          }  
       },
        error => {
          this.messageService.error(error);
        }
     );
  }
}
