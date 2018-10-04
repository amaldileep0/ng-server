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

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DashboardModule,
    LoginModule,
    LogoutModule,
    LayoutModule,
    AppRoutingModule,
    RegisterModule,
    RouterModule.forRoot([])
  ],
  providers: [
    AuthGuard,
    MessageService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true },
    { provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
