import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule

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
