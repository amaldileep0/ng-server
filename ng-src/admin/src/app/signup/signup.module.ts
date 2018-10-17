import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from "@angular/forms";
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { MessageModule } from '../shared/modules/message/message.module';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    MessageModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
