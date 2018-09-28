import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map} from 'rxjs/operators';
import { HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  public httpOptions;
    constructor(private http: HttpClient) {
        const httpOptions = {
            headers: new HttpHeaders({
            'timeZone': 'asia\kolkota'
            })
        };
    }
    login(username: string, password: string) {
        return this.http.post<any>(`http://ng-server.api.com/v1/account/login`, { username: username, password: password },this.httpOptions)
            .pipe(map((user: any) => {
                // login successful if there's a jwt token in the response
                 if (user &&  user.success) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            })
        );
    }
}
