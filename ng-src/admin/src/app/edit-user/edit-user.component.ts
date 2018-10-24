import { Component, OnInit,OnDestroy} from '@angular/core';
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
  imageUrl: '';
  selectedFile : File;
  
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
      email: ['', [Validators.required, Validators.email]],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      gender:['',Validators.required],
      address:['',Validators.required],
      age:[],
      image:[],
      dob:[]
    });

    this.userService.getUserById(+userId).subscribe( data => {
      let editUser = data.body.data.user;
      delete editUser.createdAt;
      let rawDate = editUser.dob;
      if (rawDate) {
        let myDate = new Date(rawDate);
        let myDob = {year:myDate.getFullYear(),month:myDate.getMonth(), day:myDate.getDay()}
        editUser.dob= myDob
      }
      this.editForm.setValue(editUser);
    });
  }
  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.editForm.invalid) {
        return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('firstName',this.f.firstName.value)
    formData.append('lastName',this.f.lastName.value)
    formData.append('gender',this.f.gender.value)
    formData.append('image',this.selectedFile,this.selectedFile.name)
    formData.append('address',this.f.address.value)
    formData.append('age',this.f.age.value)
    formData.append('dob',JSON.stringify(this.f.dob.value))
    formData.append('email',this.f.email.value)
    this.userService.editUser(formData,+this.f.id.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/users']);
                },
                error => {
                    this.loading = false;
                });
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      }
      reader.readAsDataURL(this.selectedFile);
    }
  }
}