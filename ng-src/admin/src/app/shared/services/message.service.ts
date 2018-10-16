import { Injectable } from '@angular/core';
import { Observable,Subject} from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable()
export class MessageService {
  
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            if (this.keepAfterNavigationChange) {
                // only keep for a single location change
                this.keepAfterNavigationChange = false;
            } else {
                // clear alert
                this.subject.next();
            }
        }
    });
}
  sendMessage(message :string, type:string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next([{type:type, message:message}]);
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
