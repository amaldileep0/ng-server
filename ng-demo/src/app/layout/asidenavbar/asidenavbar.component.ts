import { Component, OnInit } from '@angular/core';
import { User } from "../../_models/user";
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Component({
  selector: 'app-asidenavbar',
  templateUrl: './asidenavbar.component.html',
  styleUrls: ['./asidenavbar.component.css']
})
export class AsidenavbarComponent implements OnInit {

  currentUser: User;
  constructor() { 
      let rawToken = JSON.parse(localStorage.getItem('currentUser'));
      this.currentUser = helper.decodeToken(rawToken);
  }

  ngOnInit() {
  }

}
