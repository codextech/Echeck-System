import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthdModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { UserDashBoardModule } from './main/user-dashboard/user-dashboard.module';
import { UserAuthService } from './_services/user-auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { AuthInterceptor } from './auth/auth-interceptor';

// reqiur in all app Globally function
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'http://localhost:3000/api/upload',
   maxFilesize: 50,
   acceptedFiles: 'image/*',
   autoProcessQueue : false,
   addRemoveLinks: true
 };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserDashBoardModule,
    MainModule,
    AuthdModule,
    NgxSmartModalModule.forRoot(), // for Modal
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        blacklistedRoutes: ['localhost:4200/api/auth']
      }
    }),
    DropzoneModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
     UserAuthService,
      AuthGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
