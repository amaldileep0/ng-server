import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from "./user.component";
import { DataTableModule } from "angular-6-datatable";

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    DataTableModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
