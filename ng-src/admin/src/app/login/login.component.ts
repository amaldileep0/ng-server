import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../shared/services/authentication.service";
import { first } from 'rxjs/operators';
import { MessageService } from "../shared/services/message.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted: boolean = false;
    returnUrl: string;
    errorArray: Array<any> = [];
  
    constructor(  
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService : AuthenticationService,
      private messageService: MessageService
  ) {
      
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
  
    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        username:['', Validators.required],
        password:['', Validators.required]
      });
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }
    onSubmit() {
      this.submitted = true;
  
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  //fix it to handle array of errors
                  this.messageService.sendMessage(error, 'danger');
              });
  }
  
}
