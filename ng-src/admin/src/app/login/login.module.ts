import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MessageModule } from '../shared/modules/message/message.module';

@NgModule({
    imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, MessageModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
