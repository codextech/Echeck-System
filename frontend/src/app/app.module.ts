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
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { HomeFooterComponent } from './home/home-ui/home-footer/home-footer.component';
import { HomeHeaderComponent } from './home/home-ui/home-header/home-header.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { LandingLayoutComponent } from './layout/landing-layout/landing-layout.component';
import { AdminLayoutModule } from './layout/admin-layout/admin-layout.module';
import { SharedUIModule } from './main/shared-ui/shared-ui.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HomeModule } from './home/home.module';
import { LandingLayoutModule } from './layout/landing-layout/landing-layout.module';
import { NgxUiLoaderConfig, SPINNER, NgxUiLoaderModule } from 'ngx-ui-loader';
import { AuthorizationGuard } from './_guards/authorization.guard';
import { PaginationService } from 'ngx-pagination';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
   maxFilesize: 25,
   acceptedFiles: 'image/*,application/pdf,.psd'
 };

 // reqiur in all app Globally function
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#ffff',
  fgsSize: 50,
  overlayColor: '#285f94',
  fgsType: SPINNER.doubleBounce,
  bgsColor: '#002950', // background
  bgsPosition: 'center-center',
  bgsSize: 50,
  bgsType: SPINNER.circle,
  text: 'Loading...',
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AdminLayoutModule,
    LandingLayoutModule,
    SharedUIModule,
    HomeModule,
    MainModule,
    AuthdModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxSmartModalModule.forRoot(), // for Modal
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      positionClass : 'toast-top-center',
      progressBar: true,
      progressAnimation:	'increasing'
    }), // ToastrModule added
    BsDatepickerModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        blacklistedRoutes: ['localhost:4200/api/auth']
      }
    })

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: DROPZONE_CONFIG, useValue: DEFAULT_DROPZONE_CONFIG},
     UserAuthService,
      AuthGuard,
      AuthorizationGuard,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
