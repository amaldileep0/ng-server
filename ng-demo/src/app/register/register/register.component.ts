import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from "../../_services/message.service";
import { first } from 'rxjs/operators';
import { UserService } from "../../_services/user.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
   }

   // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  ngOnInit() {
    document.body.className = "hold-transition register-page";
    this.registerForm = this.formBuilder.group({
      email:['', Validators.required],
      password:['', [ Validators.required, Validators.minLength(6)]],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      confirmPass: ['', Validators.required]
    },{validator: this.checkPasswords});
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/register';
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.loading = true;
    this.userService.registerUser(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.messageService.error('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.messageService.error(error);
                    this.loading = false;
                });
}
checkPasswords(group: FormGroup) {
   // here we have the 'passwords' group
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPass.value;
  return (pass === confirmPass) ? null : { notSame: true }     
}

}
