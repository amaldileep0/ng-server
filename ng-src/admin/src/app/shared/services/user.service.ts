import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { User } from "../../models/user";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }
  getAllUsers() {
      return this.http.get<any>(`http://ng-server.api.com/v1/user/get-all-users`)
  }
  getUserById(id: number) {
    // Add safe, URL encoded search parameter if there is a search term
    const params = id ? { params: new HttpParams().set('id', id.toString()) } : {};
    return this.http.get<any>(`http://ng-server.api.com/v1/user/get-user`, params)
  }
  registerUser(user: User){
    return this.http.post(`http://ng-server.api.com/v1/user/register`, user);
  }
  deleteUser(id: number) {
    const url = `${'http://ng-server.api.com/v1/user/delete'}/${id}`; 
    return this.http.delete(url)
  }
  editUser(formData: any,id: number) {
    return this.http.post(`${'http://ng-server.api.com/v1/user/edit'}/${id}`, formData);
  }
}