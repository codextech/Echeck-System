import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';

const routes: Routes = [];

@NgModule({
    imports: [
        CommonModule,
        RouterModule

    ],
    declarations: [
      HomeHeaderComponent,
        HomeFooterComponent
    ],
    exports: [
        CommonModule,
        HomeHeaderComponent,
        HomeFooterComponent
    ],

})
export class HomeSharedUIModule { }
