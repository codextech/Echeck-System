import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LandingLayoutComponent } from './landing-layout.component';
import { HomeSharedUIModule } from 'src/app/home/home-ui/home -sharedui.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HomeSharedUIModule,
    ],
    declarations: [
      LandingLayoutComponent
    ],

})
export class LandingLayoutModule { }
