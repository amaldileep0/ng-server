import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserRoutingModule } from './edit-user-routing.module';
import { EditUserComponent } from './edit-user.component';
import { ReactiveFormsModule } from "@angular/forms";
import { PageHeaderModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    EditUserRoutingModule,
    ReactiveFormsModule,
    PageHeaderModule
  ],
  declarations: [EditUserComponent]
})
export class EditUserModule { }
