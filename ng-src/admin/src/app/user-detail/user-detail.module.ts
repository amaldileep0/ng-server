import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailRoutingModule } from './user-detail-routing.module';
import { UserDetailComponent } from './user-detail.component';
import { PageHeaderModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    UserDetailRoutingModule,
    PageHeaderModule
  ],
  declarations: [UserDetailComponent]
})
export class UserDetailModule { }
