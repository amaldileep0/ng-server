import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { HeaderInterceptor } from './shared/helpers/header.interceptor';
import { ErrorInterceptor } from './shared/helpers/error.interceptor';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmDilogComponent } from "./confirm-dilog/confirm-dilog.component";
import { ConfirmService } from "./shared/services/confirm.service";
import { MessageModule } from "./shared/modules/message/message.module";
import { MessageService } from './shared/services/message.service';

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MessageModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        NgbModule.forRoot(),
        AppRoutingModule
    ],
    declarations: [AppComponent, ConfirmDilogComponent],
    providers: [
        AuthGuard,
        ConfirmService,
        MessageService,
        { provide: HTTP_INTERCEPTORS, useClass:HeaderInterceptor, multi:true },
        { provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}
    ],
    entryComponents: [ ConfirmDilogComponent ],
    bootstrap: [AppComponent]
})
export class AppModule {}
