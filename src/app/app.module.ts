import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDashBoardModule } from './main/dashboard/dashboard.module';
import { AuthdModule } from './auth/auth.module';
import { MainModule } from './main/main.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserDashBoardModule,
    MainModule,
    AuthdModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
