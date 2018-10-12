import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { LogoutModule } from "./logout/logout.module";
import { LayoutModule } from './layout/layout.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { MessageService } from './_services/message.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterModule, } from './register/register.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './_services/confirmation-dialoge.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    EditUserComponent,
    UserDetailComponent,
    ConfirmationDialogComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    DashboardModule,
    LoginModule,
    LogoutModule,
    LayoutModule,
    AppRoutingModule,
    RegisterModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([])
  ],
  entryComponents: [ 
    ConfirmationDialogComponent 
  ],
  providers: [
    AuthGuard,
    MessageService,
    AuthenticationService,
    ConfirmationDialogService,
    { provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true },
    { provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true },
  ]
})
export class AppModule { }
