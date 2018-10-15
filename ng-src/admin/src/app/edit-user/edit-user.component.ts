import { Component, OnInit,OnDestroy } from '@angular/core';
import { UserService } from "../shared/services/user.service";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from "rxjs/operators";
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  animations: [routerTransition()]
})
export class EditUserComponent implements OnInit, OnDestroy {
  
  editForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string;
  
  constructor(  
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

   // convenience getter for easy access to form fields
   get f() { return this.editForm.controls; }

   ngOnDestroy(): void {
    document.body.className = "";
  }
  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/users';

    let userId = localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['users']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id:[],
      email:['', Validators.required],
      firstName:['', Validators.required],
      lastName:['', Validators.required]
    });

    this.userService.getUserById(+userId).subscribe( data => {
      this.editForm.setValue(data.body.data.user);
    });
  }
  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.editForm.invalid) {
        return;
    }
    this.loading = true;
    this.userService.editUser(this.editForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/users']);
                },
                error => {
                   //show error
                    this.loading = false;
                });
  }

}