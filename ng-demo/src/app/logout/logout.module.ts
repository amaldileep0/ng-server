import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutRoutingModule } from './logout-routing.module';
import { LogoutComponent } from './logout/logout.component';
import { UtilityModule } from '../utility/utility.module';


@NgModule({
  imports: [
    CommonModule,
    LogoutRoutingModule,
    UtilityModule
  ],
  declarations: [
    LogoutComponent
  ]
})
export class LogoutModule { }
