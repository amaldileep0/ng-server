import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable()

export class HeaderInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        let rawToken = JSON.parse(localStorage.getItem('_identity'));
        let currentUser = helper.decodeToken(rawToken);
        if (currentUser) {
            request = request.clone({
                setHeaders: { 
                    token: `${currentUser.token}`,
                    'timezone': 'asia/kolkota'
                }
            });
        }
        return next.handle(request);
    }
}