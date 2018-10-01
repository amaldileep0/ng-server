import { Component, OnInit } from '@angular/core';
import { User } from "../../_models/user";
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopnavbarComponent implements OnInit {
 
  currentUser: User;
  constructor() { 
      let rawToken = JSON.parse(localStorage.getItem('currentUser'));
      this.currentUser = helper.decodeToken(rawToken);
  }

  ngOnInit() {
  }

}
