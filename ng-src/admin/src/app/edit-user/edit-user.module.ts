import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EditUserRoutingModule } from './edit-user-routing.module';
import { EditUserComponent } from './edit-user.component';
import { ReactiveFormsModule } from "@angular/forms";
import { PageHeaderModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    EditUserRoutingModule,
    ReactiveFormsModule,
    PageHeaderModule,
    NgbModule
  ],
  declarations: [EditUserComponent]
})
export class EditUserModule { }
