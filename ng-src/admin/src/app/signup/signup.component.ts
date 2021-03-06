import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../shared/services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { MessageService } from "../shared/services/message.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    registerForm: FormGroup;
    submitted: boolean = false;
    returnUrl: string;
    
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {}

     // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password:['', [ Validators.required, Validators.minLength(6)]],
            firstName:['', Validators.required],
            lastName:['', Validators.required],
            confirmPass: ['', Validators.required]
          },{validator: this.checkPasswords});
          // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    }
    checkPasswords(group: FormGroup) {
        // here we have the 'passwords' group
       let pass = group.controls.password.value;
       let confirmPass = group.controls.confirmPass.value;
       return (pass === confirmPass) ? null : { notSame: true }     
    }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.userService.registerUser(this.registerForm.value)
                .pipe(first())
                .subscribe(
                    data => {
                        //show message
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        this.messageService.sendMessage(error,'danger');
                    });
    }
}
