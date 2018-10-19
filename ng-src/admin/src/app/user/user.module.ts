import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from "./user.component";
import { DataTableModule } from "angular-6-datatable";
import { PageHeaderModule } from '../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    DataTableModule,
    PageHeaderModule,
    NgbModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
