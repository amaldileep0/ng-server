import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { User } from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public httpOptions;
  constructor(private http: HttpClient) {
      this.httpOptions = {
          headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'timezone': 'asia/kolkota',
          })
      };
  }
  getAllUsers() {
      return this.http.get<any>(`http://ng-server.api.com/v1/user/get-all-users`, this.httpOptions)
  }
  registerUser(user: User){
    return this.http.post(`http://ng-server.api.com/v1/user/register`, user,this.httpOptions);
  }

}
